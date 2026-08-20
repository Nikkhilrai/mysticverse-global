import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { AwardSubmissionSchema } from "@/lib/validation";
import { notifyAfter, rowsToHtml } from "@/lib/email";
import { after } from "next/server";
import { sendStep } from "@/lib/nurture";

export const runtime = "nodejs";

/*
  Handles both Excellence Awards entry points:
    kind = "NOMINATION"    — nominating a project / person
    kind = "JURY_PARTNER"  — applying to sit on the jury panel
  One table, one admin view, filtered by kind.
*/
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — silently accept bot submissions.
  if (typeof body.hp === "string" && body.hp.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const parsed = AwardSubmissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form and try again." },
      { status: 422 },
    );
  }
  const d = parsed.data;

  // A nomination needs someone to nominate.
  if (d.kind === "NOMINATION" && !d.nomineeName) {
    return NextResponse.json(
      { ok: false, error: "Please tell us who or what you are nominating." },
      { status: 422 },
    );
  }

  const ipAddress =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const userAgent = req.headers.get("user-agent") ?? null;
  let created: { id: string };

  try {
    created = await prisma.awardSubmission.create({
      data: {
        kind: d.kind,
        name: d.name,
        email: d.email,
        phone: d.phone ?? null,
        organisation: d.organisation ?? null,
        role: d.role ?? null,
        country: d.country ?? null,
        category: d.category ?? null,
        nomineeName: d.nomineeName ?? null,
        nomineeOrg: d.nomineeOrg ?? null,
        nomineeWebsite: d.nomineeWebsite ?? null,
        relationship: d.relationship ?? null,
        statement: d.statement ?? null,
        utmSource: d.utmSource ?? null,
        utmMedium: d.utmMedium ?? null,
        utmCampaign: d.utmCampaign ?? null,
        ipAddress,
        userAgent,
      },
    });
  } catch (err) {
    console.error("[award-submission] db write failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  const isNomination = d.kind === "NOMINATION";

  notifyAfter(
    isNomination
      ? `New award nomination — ${d.category ?? "Category unspecified"}`
      : `New jury partner enquiry — ${d.name}`,
    rowsToHtml(
      isNomination ? "New Award Nomination" : "New Jury Partner Enquiry",
      isNomination
        ? [
            ["Award category", d.category],
            ["Nominee", d.nomineeName],
            ["Nominee organisation", d.nomineeOrg],
            ["Nominee website", d.nomineeWebsite],
            ["Relationship", d.relationship],
            ["Statement", d.statement],
            ["—", "—"],
            ["Submitted by", d.name],
            ["Email", d.email],
            ["Phone", d.phone],
            ["Organisation", d.organisation],
            ["Country", d.country],
          ]
        : [
            ["Name", d.name],
            ["Email", d.email],
            ["Phone", d.phone],
            ["Organisation", d.organisation],
            ["Role", d.role],
            ["Country", d.country],
            ["Note", d.statement],
          ],
    ),
  );

  // Welcome email to the lead (step 0), sent after the response.
  after(() =>
    sendStep({
      sequence: "awards",
      step: 0,
      leadId: created.id,
      leadType: "award",
      email: d.email,
      name: d.name,
    }),
  );


  return NextResponse.json({ ok: true });
}

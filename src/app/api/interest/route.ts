import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { InterestSchema } from "@/lib/validation";
import { notifyAfter, rowsToHtml } from "@/lib/email";
import { after } from "next/server";
import { sendStep } from "@/lib/nurture";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (typeof body.hp === "string" && body.hp.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const parsed = InterestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form and try again." },
      { status: 422 },
    );
  }
  const d = parsed.data;

  const ipAddress =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const userAgent = req.headers.get("user-agent") ?? null;
  let created: { id: string };

  try {
    created = await prisma.interestSubmission.create({
      data: {
        name: d.name,
        email: d.email,
        phone: d.phone ?? null,
        country: d.country ?? null,
        passType: d.passType ?? null,
        company: d.company ?? null,
        seats: d.seats ?? null,
        message: d.message ?? null,
        source: d.source ?? "register-page",
        utmSource: d.utmSource ?? null,
        utmMedium: d.utmMedium ?? null,
        utmCampaign: d.utmCampaign ?? null,
        ipAddress,
        userAgent,
      },
    });
  } catch (err) {
    console.error("[interest] db write failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  const SOURCE_LABELS: Record<string, string> = {
    "homepage-popup": "Homepage popup",
    "register-page": "Register page",
    "corporate-page": "Corporate bundles page",
  };
  const sourceLabel = SOURCE_LABELS[d.source ?? "register-page"] ?? d.source ?? "Register page";

  // Seat count leads the subject on bulk enquiries — it's the triage signal.
  const subject = d.seats
    ? `New corporate enquiry — ${d.seats} seats${d.company ? ` · ${d.company}` : ""}`
    : `New delegate interest — ${d.passType ?? "Unspecified"}`;

  notifyAfter(
    subject,
    rowsToHtml(d.seats ? "New Corporate Bundle Enquiry" : "New Delegate Interest", [
      ["Source", sourceLabel],
      ["Name", d.name],
      ["Email", d.email],
      ["Phone", d.phone],
      ["Country", d.country],
      ["Pass type", d.passType],
      ["Company", d.company],
      ["Seats", d.seats ? String(d.seats) : null],
      ["Message", d.message],
    ]),
  );

  // Welcome email to the lead (step 0), sent after the response.
  after(() =>
    sendStep({
      sequence: "delegate",
      step: 0,
      leadId: created.id,
      leadType: "interest",
      email: d.email,
      name: d.name,
    }),
  );


  return NextResponse.json({ ok: true });
}

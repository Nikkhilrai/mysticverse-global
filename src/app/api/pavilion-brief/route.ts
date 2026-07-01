import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { PavilionBriefSchema } from "@/lib/validation";
import { notify, rowsToHtml } from "@/lib/email";

export const runtime = "nodejs";

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

  const parsed = PavilionBriefSchema.safeParse(body);
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

  try {
    await prisma.pavilionBriefRequest.create({
      data: {
        name: d.name,
        email: d.email,
        company: d.company ?? null,
        role: d.role ?? null,
        phone: d.phone ?? null,
        country: d.country ?? null,
        tierInterest: d.tierInterest ?? null,
        message: d.message ?? null,
        ipAddress,
        userAgent,
      },
    });
  } catch (err) {
    console.error("[pavilion-brief] db write failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  await notify(
    `New Pavilion Brief request — ${d.tierInterest ?? "Unspecified"}`,
    rowsToHtml("New Pavilion Brief Request", [
      ["Name", d.name],
      ["Email", d.email],
      ["Company", d.company],
      ["Role", d.role],
      ["Phone", d.phone],
      ["Country", d.country],
      ["Partnership interest", d.tierInterest],
      ["Message", d.message],
    ]),
  );

  return NextResponse.json({ ok: true });
}

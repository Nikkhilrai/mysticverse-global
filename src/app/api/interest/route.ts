import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { InterestSchema } from "@/lib/validation";
import { notify, rowsToHtml } from "@/lib/email";

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

  try {
    await prisma.interestSubmission.create({
      data: {
        name: d.name,
        email: d.email,
        phone: d.phone ?? null,
        country: d.country ?? null,
        passType: d.passType ?? null,
        company: d.company ?? null,
        message: d.message ?? null,
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

  await notify(
    `New delegate interest — ${d.passType ?? "Unspecified"}`,
    rowsToHtml("New Delegate Interest", [
      ["Name", d.name],
      ["Email", d.email],
      ["Phone", d.phone],
      ["Country", d.country],
      ["Pass type", d.passType],
      ["Company", d.company],
      ["Message", d.message],
    ]),
  );

  return NextResponse.json({ ok: true });
}

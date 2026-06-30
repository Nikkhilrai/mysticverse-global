import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ContactSchema } from "@/lib/validation";
import { notify, rowsToHtml } from "@/lib/email";

// Prisma + pg need the Node.js runtime (not edge).
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (typeof body.hp === "string" && body.hp.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const parsed = ContactSchema.safeParse(body);
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
    await prisma.contactSubmission.create({
      data: {
        name: d.name,
        email: d.email,
        phone: d.phone ?? null,
        country: d.country ?? null,
        organisation: d.organisation ?? null,
        enquiryType: d.enquiryType,
        message: d.message,
        ipAddress,
        userAgent,
      },
    });
  } catch (err) {
    console.error("[contact] db write failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  await notify(
    `New contact enquiry — ${d.enquiryType}`,
    rowsToHtml("New Contact Enquiry", [
      ["Name", d.name],
      ["Email", d.email],
      ["Phone", d.phone],
      ["Country", d.country],
      ["Organisation", d.organisation],
      ["Enquiry", d.enquiryType],
      ["Message", d.message],
    ]),
  );

  return NextResponse.json({ ok: true });
}

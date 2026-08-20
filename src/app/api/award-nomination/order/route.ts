import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import { prisma } from "@/lib/db";
import { AwardNominationSchema } from "@/lib/validation";
import { isValidCategoryName, calcNominationFeeMinor } from "@/lib/awardCategories";
import { createOrder, razorpayConfigured, razorpayKeyId } from "@/lib/razorpay";
import { notifyAfter, rowsToHtml } from "@/lib/email";
import { sendStep } from "@/lib/nurture";

export const runtime = "nodejs";

/*
  Step 1 of the nomination flow. Captures the full nomination as PENDING
  before touching Razorpay — the submission is never lost, even if
  payment can't be started. The amount is computed server-side from the
  category count; the client never sends a price.
*/
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — silently accept bot submissions without creating a lead.
  if (typeof body.hp === "string" && body.hp.trim() !== "") {
    return NextResponse.json({ ok: true, bot: true });
  }

  const parsed = AwardNominationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Please check the form and try again." },
      { status: 422 },
    );
  }
  const d = parsed.data;

  const unknownCategory = d.categories.find((c) => !isValidCategoryName(c));
  if (unknownCategory) {
    return NextResponse.json(
      { ok: false, error: `Unknown category: ${unknownCategory}.` },
      { status: 422 },
    );
  }

  const amount = calcNominationFeeMinor(d.categories.length);

  const ipAddress = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const userAgent = req.headers.get("user-agent") ?? null;

  let nomination;
  try {
    nomination = await prisma.awardNomination.create({
      data: {
        nominatorName: d.nominatorName,
        nominatorTitle: d.nominatorTitle ?? null,
        nominatorOrganisation: d.nominatorOrganisation ?? null,
        nominatorEmail: d.nominatorEmail,
        nominatorPhone: d.nominatorPhone ?? null,
        nominatorCountry: d.nominatorCountry ?? null,
        nominationType: d.nominationType,

        nomineeName: d.nomineeName ?? null,
        nomineeTitle: d.nomineeTitle ?? null,
        nomineeEmail: d.nomineeEmail ?? null,
        nomineePhone: d.nomineePhone ?? null,
        nomineeWebsite: d.nomineeWebsite ?? null,
        nomineeLinkedin: d.nomineeLinkedin ?? null,

        categories: d.categories,

        executiveSummary: d.executiveSummary,
        keyAchievements: d.keyAchievements,
        alignmentStatement: d.alignmentStatement,
        documents: d.documents ?? [],
        videoLinks: d.videoLinks ?? [],

        paymentMethodPreference: d.paymentMethodPreference,
        billingName: d.billingName ?? null,
        billingAddressLine1: d.billingAddressLine1 ?? null,
        billingAddressLine2: d.billingAddressLine2 ?? null,
        billingCity: d.billingCity ?? null,
        billingState: d.billingState ?? null,
        billingPostalCode: d.billingPostalCode ?? null,
        billingCountry: d.billingCountry ?? null,
        declarationAccepted: d.declarationAccepted,

        amount,
        currency: "USD",

        utmSource: d.utmSource ?? null,
        utmMedium: d.utmMedium ?? null,
        utmCampaign: d.utmCampaign ?? null,
        ipAddress,
        userAgent,
      },
    });
  } catch (err) {
    console.error("[award-nomination/order] db write failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  notifyAfter(
    `New award nomination — ${d.categories.length} categor${d.categories.length === 1 ? "y" : "ies"} — ${d.nominatorName}`,
    rowsToHtml("New Excellence Awards Nomination", [
      ["Categories", d.categories.join(", ")],
      ["Amount due", `USD ${(amount / 100).toFixed(2)}`],
      ["Nominee", d.nomineeName ?? d.nominatorName],
      ["Nominee website", d.nomineeWebsite],
      ["Nomination type", d.nominationType],
      ["—", "—"],
      ["Submitted by", d.nominatorName],
      ["Email", d.nominatorEmail],
      ["Phone", d.nominatorPhone],
      ["Organisation", d.nominatorOrganisation],
      ["Payment method", d.paymentMethodPreference],
    ]),
  );

  after(() =>
    sendStep({
      sequence: "awards",
      step: 0,
      leadId: nomination.id,
      leadType: "award-nomination",
      email: d.nominatorEmail,
      name: d.nominatorName,
    }),
  );

  // Wire transfer — skip Razorpay entirely, lead is already captured.
  if (d.paymentMethodPreference === "wire") {
    return NextResponse.json({
      ok: true,
      paymentReady: false,
      nominationId: nomination.id,
      amount,
      currency: "USD",
    });
  }

  if (!razorpayConfigured) {
    return NextResponse.json({
      ok: true,
      paymentReady: false,
      nominationId: nomination.id,
      amount,
      currency: "USD",
    });
  }

  try {
    const order = await createOrder({
      amount,
      currency: "USD",
      receipt: nomination.id,
      notes: {
        categories: d.categories.join(", "),
        email: d.nominatorEmail,
        name: d.nominatorName,
      },
    });

    await prisma.awardNomination.update({
      where: { id: nomination.id },
      data: { razorpayOrderId: order.id },
    });

    return NextResponse.json({
      ok: true,
      paymentReady: true,
      nominationId: nomination.id,
      keyId: razorpayKeyId,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      prefill: { name: d.nominatorName, email: d.nominatorEmail, contact: d.nominatorPhone ?? "" },
    });
  } catch (err) {
    console.error("[award-nomination/order] razorpay order failed:", err);
    // Nomination is saved; report that payment couldn't be started right now.
    return NextResponse.json(
      {
        ok: false,
        leadCaptured: true,
        nominationId: nomination.id,
        error:
          "We saved your nomination, but couldn't start payment just now. Our team will reach out to arrange payment.",
      },
      { status: 502 },
    );
  }
}

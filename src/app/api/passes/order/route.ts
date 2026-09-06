import { NextRequest, NextResponse, after } from "next/server";
import { prisma } from "@/lib/db";
import { PassOrderSchema } from "@/lib/validation";
import { getPassById } from "@/lib/passes";
import { createOrder, razorpayConfigured, razorpayKeyId } from "@/lib/razorpay";
import { notifyAfter, rowsToHtml } from "@/lib/email";
import { sendPassConfirmationEmail } from "@/lib/pass-email";
import { normalizeCouponCode, checkCouponEligibility, calcDiscountedAmountMinor } from "@/lib/coupons";
import { redeemCouponUse } from "@/lib/coupon-store";

export const runtime = "nodejs";

/*
  Step 1 of checkout. Captures the lead (always, even if payment is not
  yet configured) and — when Razorpay keys are present — opens a
  Razorpay order the client can pay. The amount is read from the server
  catalogue by passId (and, if a coupon is present, discounted
  server-side from it) — the client never sends a price.
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

  const parsed = PassOrderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check your details and try again." },
      { status: 422 },
    );
  }
  const d = parsed.data;

  const pass = getPassById(d.passId);
  if (!pass) {
    return NextResponse.json({ ok: false, error: "Unknown pass." }, { status: 422 });
  }

  // Re-validate the coupon server-side regardless of what the client's
  // "Apply" step already showed — fails closed (422) rather than
  // silently falling back to full price, since the UI already gates on
  // a successful client-side check before this is ever reached.
  let finalAmountMinor = pass.amountMinor;
  let couponId: string | null = null;
  let couponCode: string | null = null;
  let couponDiscountPct: number | null = null;

  if (d.couponCode) {
    const coupon = await prisma.coupon.findUnique({
      where: { code: normalizeCouponCode(d.couponCode) },
    });
    const check = checkCouponEligibility(coupon, d.passId, new Date());
    if (!check.valid) {
      return NextResponse.json({ ok: false, error: check.reason }, { status: 422 });
    }
    finalAmountMinor = calcDiscountedAmountMinor(pass.amountMinor, check.discountPct);
    couponId = coupon!.id;
    couponCode = coupon!.code;
    couponDiscountPct = check.discountPct;
  }

  const ipAddress =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const userAgent = req.headers.get("user-agent") ?? null;

  // 1) Persist the lead as PENDING before touching the payment gateway.
  let registration;
  try {
    registration = await prisma.passRegistration.create({
      data: {
        name: d.name,
        email: d.email,
        phone: d.phone ?? null,
        country: d.country ?? null,
        company: d.company ?? null,
        passType: pass.name,
        amount: finalAmountMinor,
        currency: pass.currency,
        couponId,
        couponCode,
        couponDiscountPct,
        utmSource: d.utmSource ?? null,
        utmMedium: d.utmMedium ?? null,
        utmCampaign: d.utmCampaign ?? null,
        ipAddress,
        userAgent,
      },
    });
  } catch (err) {
    console.error("[passes/order] db write failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  // Notify the team that a new pass lead came in (before payment).
  notifyAfter(
    `New pass lead — ${pass.name} (${pass.priceLabel})`,
    rowsToHtml("New Pass Registration (lead)", [
      ["Pass", pass.name],
      ["Amount", pass.priceLabel],
      ["Coupon", couponCode ? `${couponCode} (${couponDiscountPct}% off)` : "—"],
      ["Name", d.name],
      ["Email", d.email],
      ["Phone", d.phone],
      ["Country", d.country],
      ["Company", d.company],
      ["Payment", "Pending"],
    ]),
  );

  // 2) A 100%-off coupon: skip Razorpay entirely, confirm immediately.
  // This path never reaches /api/passes/verify, so the coupon is
  // redeemed right here rather than deferred.
  if (finalAmountMinor <= 0) {
    await prisma.passRegistration.update({
      where: { id: registration.id },
      data: { paymentStatus: "PAID", paidAt: new Date() },
    });
    if (couponId) await redeemCouponUse(couponId);

    notifyAfter(
      `✅ Pass PAID (free via coupon) — ${pass.name} · ${d.name}`,
      rowsToHtml("Pass Confirmed — Free via Coupon", [
        ["Pass", pass.name],
        ["Coupon", `${couponCode} (${couponDiscountPct}% off)`],
        ["Name", d.name],
        ["Email", d.email],
      ]),
    );

    // Customer-facing confirmation — distinct from the internal
    // notifyAfter() above, which only reaches the team inbox.
    after(async () => {
      const sent = await sendPassConfirmationEmail({
        email: d.email,
        name: d.name,
        passType: pass.name,
        amountMinor: 0,
        currency: pass.currency,
        registrationId: registration.id,
      });
      if (!sent.ok) {
        console.error(`[passes/order] confirmation email failed for ${registration.id}:`, sent.error);
      }
    });

    return NextResponse.json({
      ok: true,
      paymentReady: false,
      free: true,
      registrationId: registration.id,
    });
  }

  // 3) If Razorpay is not configured yet, we've still captured the lead.
  // This path also never reaches /verify, so redeem the coupon now.
  if (!razorpayConfigured) {
    if (couponId) await redeemCouponUse(couponId);
    return NextResponse.json({
      ok: true,
      paymentReady: false,
      registrationId: registration.id,
    });
  }

  try {
    const order = await createOrder({
      amount: finalAmountMinor,
      currency: pass.currency,
      receipt: registration.id,
      notes: { passType: pass.name, email: d.email, name: d.name, couponCode: couponCode ?? "" },
    });

    await prisma.passRegistration.update({
      where: { id: registration.id },
      data: { razorpayOrderId: order.id },
    });

    return NextResponse.json({
      ok: true,
      paymentReady: true,
      registrationId: registration.id,
      keyId: razorpayKeyId,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      passName: pass.name,
      prefill: { name: d.name, email: d.email, contact: d.phone ?? "" },
    });
  } catch (err) {
    console.error("[passes/order] razorpay order failed:", err);
    // Lead is saved; report that payment couldn't be started right now.
    return NextResponse.json(
      {
        ok: false,
        leadCaptured: true,
        registrationId: registration.id,
        error:
          "We saved your details, but couldn't start payment just now. Our team will reach out to complete your booking.",
      },
      { status: 502 },
    );
  }
}

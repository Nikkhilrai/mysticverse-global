import { NextRequest, NextResponse, after } from "next/server";
import { prisma } from "@/lib/db";
import { PassVerifySchema } from "@/lib/validation";
import { verifyPaymentSignature } from "@/lib/razorpay";
import { notifyAfter, rowsToHtml } from "@/lib/email";
import { sendPassConfirmationEmail } from "@/lib/pass-email";
import { redeemCouponUse } from "@/lib/coupon-store";

export const runtime = "nodejs";

/*
  Step 2 of checkout. The Razorpay Checkout success handler posts the
  order/payment ids and signature here. We recompute the signature
  server-side and only then flip the registration to PAID.
*/
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = PassVerifySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid payment payload." }, { status: 422 });
  }
  const d = parsed.data;

  const registration = await prisma.passRegistration.findUnique({
    where: { id: d.registrationId },
  });
  if (!registration || registration.razorpayOrderId !== d.razorpay_order_id) {
    return NextResponse.json({ ok: false, error: "Order not found." }, { status: 404 });
  }

  const valid = verifyPaymentSignature({
    orderId: d.razorpay_order_id,
    paymentId: d.razorpay_payment_id,
    signature: d.razorpay_signature,
  });

  if (!valid) {
    await prisma.passRegistration.update({
      where: { id: registration.id },
      data: {
        paymentStatus: "FAILED",
        razorpayPaymentId: d.razorpay_payment_id,
      },
    });
    return NextResponse.json({ ok: false, error: "Payment could not be verified." }, { status: 400 });
  }

  await prisma.passRegistration.update({
    where: { id: registration.id },
    data: {
      paymentStatus: "PAID",
      razorpayPaymentId: d.razorpay_payment_id,
      razorpaySignature: d.razorpay_signature,
      paidAt: new Date(),
    },
  });

  // Redeem the coupon only now, on confirmed payment — an abandoned or
  // failed checkout never reaches this point, so it never burns a use.
  if (registration.couponId) {
    const redeemed = await redeemCouponUse(registration.couponId);
    if (!redeemed) {
      console.warn(
        `[passes/verify] coupon ${registration.couponCode} was exhausted after payment for registration ${registration.id} — payment stands, usage count not incremented.`,
      );
    }
  }

  notifyAfter(
    `✅ Pass PAID — ${registration.passType} · ${registration.name}`,
    rowsToHtml("Pass Payment Confirmed", [
      ["Pass", registration.passType],
      ["Name", registration.name],
      ["Email", registration.email],
      ["Phone", registration.phone],
      ["Payment ID", d.razorpay_payment_id],
      ["Order ID", d.razorpay_order_id],
    ]),
  );

  // Customer-facing confirmation — distinct from the internal
  // notifyAfter() above, which only reaches the team inbox.
  after(async () => {
    const sent = await sendPassConfirmationEmail({
      email: registration.email,
      name: registration.name,
      passType: registration.passType,
      amountMinor: registration.amount,
      currency: registration.currency,
      registrationId: registration.id,
    });
    if (!sent.ok) {
      console.error(`[passes/verify] confirmation email failed for ${registration.id}:`, sent.error);
    }
  });

  return NextResponse.json({ ok: true });
}

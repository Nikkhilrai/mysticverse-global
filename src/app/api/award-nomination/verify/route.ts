import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { AwardNominationVerifySchema } from "@/lib/validation";
import { verifyPaymentSignature } from "@/lib/razorpay";
import { notifyAfter, rowsToHtml } from "@/lib/email";

export const runtime = "nodejs";

/*
  Step 2 of the nomination flow. The Razorpay Checkout success handler
  posts the order/payment ids and signature here; we recompute the
  signature server-side and only then flip the nomination to PAID.
*/
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = AwardNominationVerifySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid payment payload." }, { status: 422 });
  }
  const d = parsed.data;

  const nomination = await prisma.awardNomination.findUnique({
    where: { id: d.nominationId },
  });
  if (!nomination || nomination.razorpayOrderId !== d.razorpay_order_id) {
    return NextResponse.json({ ok: false, error: "Order not found." }, { status: 404 });
  }

  const valid = verifyPaymentSignature({
    orderId: d.razorpay_order_id,
    paymentId: d.razorpay_payment_id,
    signature: d.razorpay_signature,
  });

  if (!valid) {
    await prisma.awardNomination.update({
      where: { id: nomination.id },
      data: {
        paymentStatus: "FAILED",
        razorpayPaymentId: d.razorpay_payment_id,
      },
    });
    return NextResponse.json({ ok: false, error: "Payment could not be verified." }, { status: 400 });
  }

  await prisma.awardNomination.update({
    where: { id: nomination.id },
    data: {
      paymentStatus: "PAID",
      razorpayPaymentId: d.razorpay_payment_id,
      razorpaySignature: d.razorpay_signature,
      paidAt: new Date(),
    },
  });

  notifyAfter(
    `✅ Nomination PAID — ${nomination.categories.length} categor${nomination.categories.length === 1 ? "y" : "ies"} · ${nomination.nominatorName}`,
    rowsToHtml("Award Nomination Payment Confirmed", [
      ["Categories", nomination.categories.join(", ")],
      ["Nominator", nomination.nominatorName],
      ["Email", nomination.nominatorEmail],
      ["Amount", `USD ${(nomination.amount / 100).toFixed(2)}`],
      ["Payment ID", d.razorpay_payment_id],
      ["Order ID", d.razorpay_order_id],
    ]),
  );

  return NextResponse.json({ ok: true });
}

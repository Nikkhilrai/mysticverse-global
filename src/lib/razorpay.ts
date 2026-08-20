import crypto from "node:crypto";

/*
  Razorpay integration via the REST API — no SDK dependency.

  Order creation uses HTTP Basic auth (key_id:key_secret). Payment
  verification recomputes the HMAC-SHA256 signature server-side, so a
  client can never mark its own order paid. Amounts are always decided
  server-side (see PASSES) — the client never sends a price.

  Gracefully no-ops when keys are absent: the lead is still captured in
  the DB, and the API surfaces a "payment unavailable" state instead of
  crashing, so the form keeps working before Razorpay is configured.
*/

const KEY_ID = process.env.RAZORPAY_KEY_ID;
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

export const razorpayConfigured = Boolean(KEY_ID && KEY_SECRET);
export const razorpayKeyId = KEY_ID ?? "";

export type RazorpayOrder = {
  id: string;
  amount: number;
  currency: string;
  status: string;
};

/** Create a Razorpay order. Amount is in the minor unit (fils for AED). */
export async function createOrder(params: {
  amount: number;
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}): Promise<RazorpayOrder> {
  if (!razorpayConfigured) {
    throw new Error("razorpay-not-configured");
  }

  const auth = Buffer.from(`${KEY_ID}:${KEY_SECRET}`).toString("base64");
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: params.amount,
      currency: params.currency,
      receipt: params.receipt,
      notes: params.notes ?? {},
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`razorpay-order-failed:${res.status}:${text}`);
  }

  return (await res.json()) as RazorpayOrder;
}

/** Verify a Checkout callback signature: HMAC(order_id|payment_id, secret). */
export function verifyPaymentSignature(params: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  if (!KEY_SECRET) return false;
  const expected = crypto
    .createHmac("sha256", KEY_SECRET)
    .update(`${params.orderId}|${params.paymentId}`)
    .digest("hex");
  // Constant-time compare to avoid leaking via timing.
  const a = Buffer.from(expected);
  const b = Buffer.from(params.signature);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

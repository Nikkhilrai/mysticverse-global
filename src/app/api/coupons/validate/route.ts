import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { CouponValidateSchema } from "@/lib/validation";
import { normalizeCouponCode, checkCouponEligibility } from "@/lib/coupons";

export const runtime = "nodejs";

/*
  Read-only UX-feedback endpoint for the "Apply" button in the pass
  checkout modal. Never mutates usedCount — the order route re-checks
  and redeems independently, so a tampered/replayed client can't force
  a discount this endpoint merely reported as valid.
*/
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = CouponValidateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please enter a coupon code." },
      { status: 422 },
    );
  }
  const d = parsed.data;

  const coupon = await prisma.coupon.findUnique({
    where: { code: normalizeCouponCode(d.code) },
  });

  const check = checkCouponEligibility(coupon, d.passId, new Date());

  if (!check.valid) {
    return NextResponse.json({ ok: true, valid: false, error: check.reason });
  }

  return NextResponse.json({
    ok: true,
    valid: true,
    discountPct: check.discountPct,
    name: check.name,
  });
}

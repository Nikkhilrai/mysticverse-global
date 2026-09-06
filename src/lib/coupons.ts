/*
  Coupon logic — pure helpers shared by the public order flow, the
  validate endpoint, and the client-side checkout modal. Deliberately
  no DB import here (Prisma pulls in `pg`, which breaks the client
  bundle) — the one function that touches the database,
  `redeemCouponUse`, lives in `@/lib/coupon-store` instead.

  `checkCouponEligibility` is the single source of truth for "is this
  coupon usable right now for this pass" — both /api/coupons/validate
  (UX feedback) and /api/passes/order (server-side re-check before
  charging) call this same function, so the two can never drift apart.
*/

export function normalizeCouponCode(raw: string): string {
  return raw.trim().toUpperCase();
}

/** Discounted amount in minor units (fils), floored at 0. */
export function calcDiscountedAmountMinor(baseAmountMinor: number, discountPct: number): number {
  return Math.max(0, Math.round(baseAmountMinor * (1 - discountPct / 100)));
}

export function formatAedMinor(minor: number): string {
  return `AED ${(minor / 100).toLocaleString("en-AE", { minimumFractionDigits: 0 })}`;
}

export function isCouponApplicableToPass(applicablePasses: string | null, passId: string): boolean {
  if (!applicablePasses || !applicablePasses.trim()) return true;
  return applicablePasses
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .includes(passId.toLowerCase());
}

export type CouponRow = {
  id: string;
  code: string;
  name: string;
  discountPct: number;
  validFrom: Date;
  validUntil: Date;
  maxUses: number | null;
  usedCount: number;
  isActive: boolean;
  applicablePasses: string | null;
};

export type CouponEligibility =
  | { valid: true; discountPct: number; name: string }
  | { valid: false; reason: string };

export function checkCouponEligibility(
  coupon: CouponRow | null,
  passId: string,
  now: Date,
): CouponEligibility {
  if (!coupon) return { valid: false, reason: "Invalid coupon code." };
  if (!coupon.isActive) return { valid: false, reason: "This coupon is no longer active." };
  if (now < coupon.validFrom) return { valid: false, reason: "This coupon is not valid yet." };
  if (now > coupon.validUntil) return { valid: false, reason: "This coupon has expired." };
  if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
    return { valid: false, reason: "This coupon has reached its usage limit." };
  }
  if (!isCouponApplicableToPass(coupon.applicablePasses, passId)) {
    return { valid: false, reason: "This coupon is not valid for the selected pass." };
  }
  return { valid: true, discountPct: coupon.discountPct, name: coupon.name };
}

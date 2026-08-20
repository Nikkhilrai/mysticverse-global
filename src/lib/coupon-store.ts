/*
  The one DB-touching piece of coupon logic, kept separate from
  @/lib/coupons so that file can stay pure and safe to import from
  client components (Prisma pulls in `pg`, which breaks the browser
  bundle if this lived alongside the pure helpers).
*/

import { prisma } from "@/lib/db";

/**
 * Atomically increments usedCount iff the coupon is still active and
 * under its cap — a single conditional UPDATE, not a check-then-write,
 * so it can never over-redeem a maxed-out code under concurrent
 * requests. Returns false if the row didn't qualify at the moment of
 * the UPDATE (e.g. exhausted by a concurrent request).
 */
export async function redeemCouponUse(couponId: string): Promise<boolean> {
  const affected = await prisma.$executeRaw`
    UPDATE "Coupon"
    SET "usedCount" = "usedCount" + 1
    WHERE "id" = ${couponId}
      AND "isActive" = true
      AND ("maxUses" IS NULL OR "usedCount" < "maxUses")
  `;
  return affected > 0;
}

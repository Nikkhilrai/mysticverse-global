/*
  The publicly-promoted coupon, read from the real Coupon row rather
  than a hardcoded banner.

  This matters: if the code expires, is deactivated, or hits its usage
  cap, `getFeaturedPromo` returns null and the banner disappears on its
  own. The site can never advertise a code that would fail at checkout.

  Server-only (touches Prisma) — import from Server Components.
*/

import { prisma } from "@/lib/db";

export interface FeaturedPromo {
  code: string;
  discountPct: number;
  /** ISO string — serialisable across the server/client boundary. */
  validUntil: string;
}

export async function getFeaturedPromo(): Promise<FeaturedPromo | null> {
  const now = new Date();

  const coupon = await prisma.coupon.findFirst({
    where: {
      isFeatured: true,
      isActive: true,
      validFrom: { lte: now },
      validUntil: { gte: now },
    },
    orderBy: { discountPct: "desc" },
  });

  if (!coupon) return null;
  // Exhausted codes are excluded here rather than in the query, since
  // Prisma can't compare two columns in a where clause.
  if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) return null;

  return {
    code: coupon.code,
    discountPct: coupon.discountPct,
    validUntil: coupon.validUntil.toISOString(),
  };
}

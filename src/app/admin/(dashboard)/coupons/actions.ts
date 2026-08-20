"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { assertPermission } from "@/lib/auth-server";
import { normalizeCouponCode } from "@/lib/coupons";

export interface CouponInput {
  id?: string;
  code: string;
  name: string;
  discountPct: number;
  validFrom: string; // "YYYY-MM-DD"
  validUntil: string; // "YYYY-MM-DD"
  maxUses: number | null;
  applicablePasses: string | null; // "seeker,mystic" or null
  isActive: boolean;
  isFeatured: boolean;
}

export interface CouponLite {
  id: string;
  code: string;
  name: string;
  discountPct: number;
  validFrom: Date;
  validUntil: Date;
  maxUses: number | null;
  usedCount: number;
  isActive: boolean;
  isFeatured: boolean;
  applicablePasses: string | null;
  createdAt: Date;
}

export async function listCoupons(): Promise<CouponLite[]> {
  await assertPermission("coupons");
  return prisma.coupon.findMany({ orderBy: { createdAt: "desc" } });
}

export async function saveCoupon(input: CouponInput): Promise<CouponLite> {
  await assertPermission("coupons");

  const code = normalizeCouponCode(input.code);
  const name = input.name.trim();
  if (!code) throw new Error("A coupon code is required.");
  if (!name) throw new Error("A display name is required.");
  if (!Number.isFinite(input.discountPct) || input.discountPct < 1 || input.discountPct > 100) {
    throw new Error("Discount must be between 1 and 100%.");
  }

  const validFrom = new Date(input.validFrom);
  // The date picker only gives a date, not a time — parsed alone that's UTC
  // midnight, which would cut a coupon off in the small hours of its expiry
  // date rather than covering the whole day. Anchor it to end-of-day instead.
  const validUntil = new Date(`${input.validUntil}T23:59:59.999Z`);
  if (Number.isNaN(validFrom.getTime()) || Number.isNaN(validUntil.getTime())) {
    throw new Error("Please provide valid dates.");
  }
  if (validUntil <= validFrom) {
    throw new Error("The expiry date must be after the valid-from date.");
  }

  const maxUses = input.maxUses !== null && Number.isFinite(input.maxUses) && input.maxUses > 0 ? Math.floor(input.maxUses) : null;

  const data = {
    code,
    name,
    discountPct: input.discountPct,
    validFrom,
    validUntil,
    maxUses,
    applicablePasses: input.applicablePasses,
    isActive: input.isActive,
    isFeatured: input.isFeatured,
  };

  try {
    const coupon = input.id
      ? await prisma.coupon.update({ where: { id: input.id }, data })
      : await prisma.coupon.create({ data });
    revalidatePath("/admin/coupons");
    revalidatePath("/register");
    return coupon;
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "code" in err && err.code === "P2002") {
      throw new Error("A coupon with this code already exists.");
    }
    throw err;
  }
}

export async function toggleCouponActive(id: string, isActive: boolean): Promise<void> {
  await assertPermission("coupons");
  await prisma.coupon.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/coupons");
  revalidatePath("/register");
}

export async function deleteCoupon(id: string): Promise<void> {
  await assertPermission("coupons");
  await prisma.coupon.delete({ where: { id } });
  revalidatePath("/admin/coupons");
  revalidatePath("/register");
}

/*
  Corporate bundle tiers for bulk delegate pass purchases.

  Prices are derived from the real pass catalogue (src/lib/passes.ts)
  rather than hardcoded, so a change to Seeker/Mystic pricing can never
  leave the corporate page quoting a stale number.

  Bundles are enquiry-based, not self-serve checkout: a bulk purchase in
  this market needs an invoice and a bank transfer, not a personal card.
  The page qualifies the lead (seat count + company) and the team sends
  a formal proposal.
*/

import { PASSES, type PassId } from "./passes";

export interface CorporateTier {
  id: string;
  label: string;
  minSeats: number;
  /** null = no upper bound */
  maxSeats: number | null;
  discountPct: number;
  /** What the buying organisation gets beyond the discount. */
  perks: readonly string[];
  featured?: boolean;
}

export const CORPORATE_TIERS: readonly CorporateTier[] = [
  {
    id: "team",
    label: "Team Rate",
    minSeats: 5,
    maxSeats: null,
    discountPct: 40,
    perks: [
      "Reserved seating block for your team",
      "Single consolidated invoice",
      "One complimentary Mystic Pass upgrade for your CHRO",
      "Your logo on the HR Leaders wall",
      "Post-event wellbeing report to circulate internally",
    ],
    featured: true,
  },
] as const;

export const MIN_BUNDLE_SEATS = 5;

/** Headline team discount, derived from the tier so marketing copy can't drift. */
export const TEAM_DISCOUNT_PCT = CORPORATE_TIERS[0].discountPct;

/** Per-seat price in whole dirhams for a pass at a given discount. */
export function perSeatPrice(passId: PassId, discountPct: number): number {
  const pass = PASSES.find((p) => p.id === passId);
  if (!pass) return 0;
  return Math.round((pass.amountMinor / 100) * (1 - discountPct / 100));
}

/** Full pass price in whole dirhams, for showing the saving. */
export function fullSeatPrice(passId: PassId): number {
  const pass = PASSES.find((p) => p.id === passId);
  return pass ? pass.amountMinor / 100 : 0;
}

export function getTierForSeats(seats: number): CorporateTier | undefined {
  return CORPORATE_TIERS.find(
    (t) => seats >= t.minSeats && (t.maxSeats === null || seats <= t.maxSeats),
  );
}

export function seatRangeLabel(tier: CorporateTier): string {
  return tier.maxSeats === null ? `${tier.minSeats}+ seats` : `${tier.minSeats}–${tier.maxSeats} seats`;
}

export function formatAed(amount: number): string {
  return `AED ${amount.toLocaleString("en-AE")}`;
}

/**
 * Total charge in minor units (fils) for a corporate booking.
 *
 * The authority for corporate pricing: the rate comes from the seat
 * count via CORPORATE_TIERS, never from a coupon code or anything the
 * client sends. Returns null for seat counts below the minimum, so the
 * order route can reject rather than silently charge a wrong amount.
 */
export function corporateAmountMinor(seats: number): number | null {
  if (!Number.isInteger(seats) || seats < MIN_BUNDLE_SEATS) return null;
  const tier = getTierForSeats(seats);
  if (!tier) return null;
  return perSeatPrice("seeker", tier.discountPct) * 100 * seats;
}

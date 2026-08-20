/*
  Pass catalogue — the single source of truth for pricing and copy.

  `amountMinor` is the charge in the currency's smallest unit (fils):
  AED 699 → 69900. The server reads the price from here by pass id, so
  the client can never dictate what it pays. The UI reads the same
  object for display, so price and copy can never drift apart.
*/

export type PassId = "seeker" | "mystic";

export type Pass = {
  id: PassId;
  name: string;
  priceLabel: string; // e.g. "AED 699" — the price actually charged
  /** Pre-discount price, struck through in the UI. Omit when not on offer. */
  originalPriceLabel?: string;
  /** Badge copy for the saving, e.g. "30% off". Shown only with originalPriceLabel. */
  discountLabel?: string;
  amountMinor: number; // charged amount in fils
  currency: "AED";
  tagline: string;
  featured?: boolean;
  inheritsFrom?: PassId; // "Everything in Seeker Pass"
  features: string[];
};

export const PASSES: Pass[] = [
  {
    id: "seeker",
    name: "Seeker Pass",
    priceLabel: "AED 699",
    originalPriceLabel: "AED 999",
    discountLabel: "30% off",
    amountMinor: 69900,
    currency: "AED",
    tagline: "Your full seat in the room — a full day of sessions, people, and ideas.",
    featured: true,
    features: [
      "Access to all conference sessions",
      "Networking access with attendees & speakers",
      "Food & beverages during the event",
      "Gifts from Sponsors",
      "Event participation certificate",
      "Access to recordings & presentations",
    ],
  },
  {
    id: "mystic",
    name: "Mystic Pass",
    priceLabel: "AED 1399",
    originalPriceLabel: "AED 1999",
    discountLabel: "30% off",
    amountMinor: 139900,
    currency: "AED",
    tagline: "Everything in Seeker — plus a year inside the MysticVerse community.",
    inheritsFrom: "seeker",
    features: [
      "Everything in Seeker Pass",
      "Logo inclusion on MysticVerse website",
      "Welcome delegate kit",
      "Gifts from Sponsors",
      "1-year free MysticVerse Membership",
      "Opportunity to publish your insights, expertise, or thought leadership article in the MysticVerse Global Digest",
    ],
  },
];

export function getPassById(id: string): Pass | undefined {
  return PASSES.find((p) => p.id === id);
}

/** Match on the human name too, since that is what we persist/display. */
export function getPassByName(name: string): Pass | undefined {
  return PASSES.find((p) => p.name === name);
}

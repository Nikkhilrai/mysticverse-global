import { THAILAND, THAILAND_PRICES } from "@/components/thailand/thailandData";
import { BANGKOK_PASSES_OPEN, PASSES_OPEN } from "@/lib/site";

/*
  Pass catalogue — the single source of truth for pricing and copy.

  `amountMinor` is the charge in the currency's smallest unit (fils for
  AED, cents for USD): AED 699 → 69900, USD 299 → 29900. The server
  reads the price from here by pass id, so the client can never dictate
  what it pays. The UI reads the same object for display, so price and
  copy can never drift apart.

  Two editions share the one checkout and the one PassRegistration
  table. A pass's `name` is what gets persisted, so every Bangkok name
  carries "· Bangkok 2027" — the admin dashboard tells the editions
  apart by it (see editionOfPassName) without a schema change.
*/

export type Edition = "dubai-2026" | "bangkok-2027";

export const EDITION_LABEL: Record<Edition, string> = {
  "dubai-2026": "Dubai 2026",
  "bangkok-2027": "Bangkok 2027",
};

/** Is checkout open for this edition? Each edition has its own switch. */
export function salesOpen(edition: Edition): boolean {
  return edition === "bangkok-2027" ? BANGKOK_PASSES_OPEN : PASSES_OPEN;
}

export type DubaiPassId = "seeker" | "mystic";
export type BangkokPassId =
  | "bkk-day-one"
  | "bkk-full-summit"
  | "bkk-day-two"
  | "bkk-practitioner"
  | "bkk-corporate"
  | "bkk-investor"
  | "bkk-vip";
export type PassId = DubaiPassId | BangkokPassId;

export type Pass = {
  id: PassId;
  edition: Edition;
  name: string;
  priceLabel: string; // e.g. "AED 699" — the price actually charged
  /** Pre-discount price, struck through in the UI. Omit when not on offer. */
  originalPriceLabel?: string;
  /** Badge copy for the saving, e.g. "30% off". Shown only with originalPriceLabel. */
  discountLabel?: string;
  amountMinor: number; // charged amount in minor units (fils / cents)
  currency: "AED" | "USD";
  /** Delegates covered by one purchase — the Corporate Bundle is 5. */
  seats?: number;
  tagline: string;
  featured?: boolean;
  inheritsFrom?: PassId; // "Everything in Seeker Pass"
  features: string[];
};

/** Dubai 2026 passes (concluded — sales closed via PASSES_OPEN). */
export const PASSES: Pass[] = [
  {
    id: "seeker",
    edition: "dubai-2026",
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
    edition: "dubai-2026",
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

/*
  Bangkok 2027 passes — built from THAILAND_PRICES (the same data the
  /thailand page and the /register cards read), so a price changes in
  one place. Full Summit is sold at its early-bird price; the Standard
  price is unconfirmed (brief §11 #2) and is not on sale.
*/
const BKK_SUFFIX = " · Bangkok 2027";
const THAILAND_PRICES_BRAND = THAILAND.editionName;

export const BANGKOK_PASSES: Pass[] = THAILAND_PRICES.passes.map((p) => {
  const name = p.id === "full-summit" ? "Full Summit — Early Bird" : p.name;
  return {
    id: `bkk-${p.id}` as BangkokPassId,
    edition: "bangkok-2027",
    name: `${name}${BKK_SUFFIX}`,
    priceLabel: `USD ${p.price.toLocaleString("en-US")}`,
    amountMinor: p.price * 100,
    currency: "USD",
    seats: p.id === "corporate" ? 5 : undefined,
    tagline: p.tagline ?? "",
    featured: p.featured,
    features: [...(p.features ?? [])],
  };
});

export const ALL_PASSES: Pass[] = [...PASSES, ...BANGKOK_PASSES];
export const ALL_PASS_IDS = ALL_PASSES.map((p) => p.id) as [PassId, ...PassId[]];

/** The Bangkok checkout pass for a card id ("day-one" → bkk-day-one). */
export function bangkokPass(cardId: string): Pass | undefined {
  return BANGKOK_PASSES.find((p) => p.id === `bkk-${cardId}`);
}

/** Which edition a persisted passType belongs to. Anything not marked
    Bangkok is a Dubai 2026 row (incl. "Seeker Pass · Team (5 seats)"). */
export function editionOfPassName(passType: string): Edition {
  return passType.endsWith(BKK_SUFFIX) ? "bangkok-2027" : "dubai-2026";
}

/** Customer-facing name — the persisted name minus the edition tag. */
export function passDisplayName(pass: Pass): string {
  return pass.name.endsWith(BKK_SUFFIX) ? pass.name.slice(0, -BKK_SUFFIX.length) : pass.name;
}

/** How the checkout and Razorpay describe each edition. */
export const EDITION_CHECKOUT: Record<Edition, { brand: string; when: string; city: string; inclTaxes: boolean }> = {
  "dubai-2026": { brand: "MysticVerse Global 2026", when: "11 September, Dubai", city: "Dubai", inclTaxes: true },
  "bangkok-2027": {
    brand: THAILAND_PRICES_BRAND,
    when: `${THAILAND.dateLabel}, ${THAILAND.city}`,
    city: "Bangkok",
    inclTaxes: false,
  },
};

export function getPassById(id: string): Pass | undefined {
  return ALL_PASSES.find((p) => p.id === id);
}

/** Match on the human name too, since that is what we persist/display. */
export function getPassByName(name: string): Pass | undefined {
  return ALL_PASSES.find((p) => p.name === name);
}

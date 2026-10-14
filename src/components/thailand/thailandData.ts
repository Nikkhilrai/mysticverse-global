/* ══════════════════════════════════════════════════════════════
   Thailand 2027 — MysticVerse Global 2.0, Bangkok edition.
   Single source of truth for the /thailand page: every date, price,
   statistic and source lives here, so the page copy and the Event
   schema can never drift apart.

   Source: "Bangkok Page — Build Brief for the Web Developer", v1.0,
   13 October 2026. Copy rule (brief §12): write like a business
   summit, not a wellness retreat — no "journey / transform / awaken",
   no health claims.

   Open items (brief §11) — deliberately NOT published here:
   venue name, speaker names, masterclass prices, post-event
   programme, hotel partners, gala inclusions, refund policy, and the
   Full Summit — Standard price (held until confirmed).
   ══════════════════════════════════════════════════════════════ */

export const THAILAND = {
  editionName: "MysticVerse Global 2.0",
  editionLabel: "Thailand 2027",
  city: "Bangkok",
  country: "Thailand",
  /** ISO dates for the Event schema. Venue not yet contracted. */
  startDate: "2027-07-01",
  endDate: "2027-07-02",
  dateLabel: "1–2 July 2027",
} as const;

/*
  CTA destinations. Registration is interest-only until the refund
  policy is written (brief §11 #8), so "Register" will open a
  register-interest form; until that section is built these point at
  on-page anchors. Each CTA carries its own analytics tag (brief §10).
*/
export const THAILAND_CTA = {
  register: { label: "Register to attend", href: "#register", track: "register" },
  partner: { label: "Become a partner", href: "#partner", track: "partner" },
} as const;

export const THAILAND_HERO = {
  eyebrow: [`${THAILAND.city}, ${THAILAND.country}`, THAILAND.dateLabel],
  headline: ["One room.", "Three industries.", "One conversation."],
  subhead:
    "MysticVerse Global 2.0 brings longevity science, holistic healing and wellness real estate together in Bangkok — two days of discussion, demonstration and experience, in a single curated room built for people who make decisions.",
} as const;

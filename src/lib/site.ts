/*
  Canonical site constants — used by metadata, sitemap, robots, and the
  Event structured data. Kept in one place so the domain and event facts
  can never drift between them.
*/

export const SITE_URL = "https://mysticverseglobal.com";
export const SITE_NAME = "MysticVerse Global 2026";

/* Event facts — mirrored from the agenda (single day, Dubai). */
export const EVENT = {
  name: "MysticVerse Global 2026",
  /** ISO 8601 with the UAE offset (+04:00). Doors 08:00, close 17:15. */
  startDate: "2026-09-11T08:00:00+04:00",
  endDate: "2026-09-11T17:15:00+04:00",
  venueName: "Taj Jumeirah Lakes Towers",
  addressLocality: "Dubai",
  addressCountry: "AE",
  description:
    "Where Ancient Wisdom Meets Strategic Innovation. One day in Dubai bringing together wellness real estate, workplace wellbeing, longevity science, and contemplative traditions.",
} as const;

/*
  The conference took place on EVENT.startDate and has concluded — flip
  this back to `true` only if a future edition reopens registration of
  interest. Gates the register-interest form, the homepage lead popup,
  and the /api/interest endpoint (belt-and-braces server-side check).
*/
export const INTEREST_OPEN = false;

/*
  Ditto for paid pass sales — Razorpay is live-keyed, so leaving this
  on after the event concluded would keep charging real money for a
  conference that already happened. Gates the /register pass grid and
  corporate-bundle CTA, and — belt-and-braces — /api/passes/order and
  /api/corporate/order server-side. Flip to `true` (and update EVENT
  above) to sell passes for a future edition.
*/
export const PASSES_OPEN = false;

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

/** Short pillar names (brief §3 stat strip) — full cards come in §4. */
export const THAILAND_PILLARS_SHORT = [
  "Longevity",
  "Holistic Wellness",
  "Wellness Real Estate",
] as const;

/*
  Hero background — the Chao Phraya and the Bang Rak skyline at night,
  seen from ICONSIAM. CC0 (public-domain dedication), so no credit line
  is required. Source:
  https://commons.wikimedia.org/wiki/File:Chao_Phraya_et_Bang_Rak_vus_de_l%27Iconsiam.jpg
*/
export const THAILAND_HERO_PHOTO = {
  src: "/images/editions/bangkok-skyline-night.jpg",
  alt: "Bangkok's skyline at night across the Chao Phraya river, with lit river cruise boats",
  width: 2400,
  height: 1800,
} as const;

/*
  Section 2 — "What this is" (brief §3).
  Seating is 150–180, NOT the "400" in the §3 stat table: brief §9 #1
  withdraws every 300+/400+ figure ("publishing 400+ would be a false
  claim"), and §6 caps the room at 150–180.
*/
export const THAILAND_OVERVIEW = {
  eyebrow: "What this is",
  heading: "Two days, three industries, one room.",
  copy: [
    "Most conferences in this sector are either a trade show or a retreat. This is neither. Over two days in Bangkok we put the people who build wellness, the people who practise it and the people who finance it into one room — and give them a programme designed to move from argument to evidence.",
    "Day one is the conversation: keynotes, panels and a live development clinic. Day two is the experience: diagnostics demonstrations, guided practice, and property showcases delegates can walk through and interrogate. You can attend either day. Most people will want both.",
  ],
  stats: [
    { value: "2", count: [2], unit: "days", label: `${THAILAND.dateLabel}, ${THAILAND.city}` },
    { value: "3", count: [3], unit: "pillars", label: THAILAND_PILLARS_SHORT.join(" · ") },
    { value: "150–180", count: [150, 180], unit: "seated", label: "In one hall, capped deliberately" },
    { value: "Global", count: [], unit: "speakers", label: "Leading speakers from the US, Asia, Europe, India and the Gulf" },
  ],
} as const;

/*
  Section 3 — The three pillars (brief §4). Bangkok has three pillars,
  not Dubai's four — the homepage FourPillars data must not be reused.
  `tone` matches each pillar's ring in the Section 2 diagram.
  Topics are the brief's own lists, split into tags.
*/
export const THAILAND_PILLARS = {
  eyebrow: "The three pillars",
  heading: ["Three areas.", "One converging market."],
  copy: "These are not three conferences sharing a venue. They are three budgets, three buyer groups and three supply chains already moving into each other — with almost nowhere to meet. We built the room where they do.",
  cards: [
    {
      key: "longevity",
      tone: "gold",
      title: "Longevity, Biohacking & Future Health",
      lede: "Evidence-based prevention and performance.",
      topics: ["Healthy ageing", "Diagnostics", "Recovery and human performance", "Wellness technology", "Nutrition and lifestyle"],
      zones: ["Longevity Lab"],
      zoneNote: "where delegates see the technology work",
    },
    {
      key: "holistic",
      tone: "violet",
      title: "Holistic Wellness & Healing",
      lede: "The whole person, held to a modern standard.",
      topics: ["Spa and retreat practice", "Meditation and breathwork", "Yoga and Ayurveda", "Energy healing", "Traditional Thai wisdom"],
      zones: ["Wellness Studio", "Energy Temple"],
      zoneNote: "",
    },
    {
      key: "real-estate",
      tone: "fuchsia",
      title: "Wellness Real Estate & Hospitality",
      lede: "Where wellbeing becomes an asset.",
      topics: ["Wellness resorts", "Branded residences", "Healthy-ageing communities", "Hospitality investment", "Wellness architecture"],
      zones: ["Conscious Living Pavilion"],
      zoneNote: "",
    },
  ],
} as const;

/*
  Section 4 — The two days (brief §5). One hall, sequential — no
  parallel tracks (brief §9 #2). Day-two zones carry their pillar's
  `tone` so they tie back to §2 and §3.

  `programmeHref` is null on purpose: the brief's button points at
  /programme, which doesn't exist yet and must be rebuilt as a single
  timeline before it goes live (§9 #2 — "ask before building it").
  Set the URL here and the button appears.
*/
export const THAILAND_DAYS = {
  eyebrow: "The two days",
  heading: ["Day one is the conversation.", "Day two is the experience."],
  copy: "We deliberately split the summit in two. Day one puts the keynotes, panels and the live development clinic on the stage. Day two takes everything off the stage and puts it in your hands — diagnostics demonstrations, guided practice, and property showcases you can walk through and interrogate.",
  days: [
    {
      key: "day-one",
      label: "Day One",
      title: "The Conversation",
      date: "Thursday 1 July 2027",
      shortDate: "Thu 1 Jul",
      mode: "On the stage",
      items: [
        { name: "Opening keynotes" },
        { name: "Panels across all three pillars" },
        { name: "A live development clinic", detail: "Real projects reviewed by operators, architects and investors." },
        { name: "The Awards gala", detail: "In the evening.", highlight: true },
      ],
    },
    {
      key: "day-two",
      label: "Day Two",
      title: "The Experience",
      date: "Friday 2 July 2027",
      shortDate: "Fri 2 Jul",
      mode: "In your hands",
      items: [
        { name: "The Longevity Lab", tone: "gold" },
        { name: "The Wellness Studio and the Energy Temple", tone: "violet" },
        { name: "The Conscious Living Pavilion", tone: "fuchsia" },
        { name: "Paid masterclasses" },
        { name: "A closing plenary", detail: "Stating what the room committed to." },
      ],
    },
  ],
  footnote: "One hall, one programme, run in sequence. Attend either day — most people will want both.",
  programmeLabel: "See the full programme",
  programmeHref: null as string | null,
} as const;

/*
  Section 5 — The room (brief §6). These figures REPLACE the old
  "300+ delegates / 400+ total delegates" numbers, which are withdrawn
  (brief §9 #1). The brief gives the strip as bare figures, so no
  labels are added beneath them.
*/
export const THAILAND_ROOM = {
  eyebrow: "The room",
  heading: "Curated, not collected.",
  copy: "The value of a summit is the quality of the room, not the size of it. We are building one room of 150 to 180 people — clinicians, practitioners, operators, developers and capital — and we cap it there deliberately.",
  who: ["Clinicians", "Practitioners", "Operators", "Developers", "Capital"],
  seats: { base: 150, cap: 180 },
  numbersIntro: "We are also direct about our numbers.",
  commitments: [
    { title: "Hosted, and reported separately", text: "Senior invitees are hosted and reported separately. They are never counted as paying delegates." },
    { title: "Met, not merely admitted", text: "Qualified buyers are met, not merely admitted." },
    { title: "A written report for every partner", text: "Every partner receives a written report of what happened." },
  ],
  stats: [
    { value: "150–180", count: [150, 180], unit: "seated" },
    { value: "30–60", count: [30, 60], unit: "hosted buyers" },
    { value: "14–19", count: [14, 19], unit: "partners" },
    { value: "12–16", count: [12, 16], unit: "exhibitors" },
  ],
} as const;

/*
  Speakers section (placed after §5 The room). Brief §11 #3: no Bangkok
  speakers are confirmed, so the heading says "first wave announced
  shortly", not a blank grid.

  Until Bangkok speakers are confirmed, the section shows the people who
  spoke at MysticVerse Global 2026 in Dubai — clearly labelled as the
  2026 stage, so nothing implies they are on the Bangkok programme.
  Add confirmed Bangkok speakers to `confirmed` (each needs name, title,
  image) and they replace the 2026 speakers automatically.

  Speaker enquiries are a brief §1 secondary goal and get their own
  analytics tag (§10). Until a SPEAKER enquiry type exists (it needs a
  DB enum migration), the CTA opens /contact?topic=speaker, which
  pre-fills the message so these enquiries are recognisable.
*/
export interface ThailandSpeaker {
  name: string;
  title: string;
  image: string;
}

export const THAILAND_SPEAKERS = {
  eyebrow: "Speakers",
  heading: ["First wave", "announced shortly."],
  copy: "Speakers are being confirmed across longevity, holistic wellness and wellness real estate — clinicians, practitioners, operators, developers and capital. Keynote slots are not for sale: every place on the stage is earned.",
  /** Confirmed Bangkok 2027 speakers — empty until announced. */
  confirmed: [] as ThailandSpeaker[],
  pastLabel: "From the 2026 stage · Dubai",
  pastNote: "Until the first wave is announced: the people who took the stage at MysticVerse Global 2026 in Dubai.",
  pastHref: "/conference/speakers",
  cta: {
    title: "Speak in Bangkok",
    text: "Have evidence, a project or a practice the room should hear? Propose a session for MysticVerse Global 2.0.",
    label: "Propose a session",
    href: "/contact?topic=speaker",
    track: "speaker",
  },
} as const;

/*
  Section 6 — Why Bangkok (brief §7). Every card names its source and
  links to it (brief §10 "Footnotes"); all four were checked against
  their sources on 19 October 2026.

  Three deliberate departures from the brief's copy, for accuracy:
  1. "wellness tourism … growing 36.4 per cent a year" → the GWI
     figure is a single year's growth (2023→2024), not an ongoing rate.
  2. "wellness real estate is growing faster still" → dropped: at
     22.9% it grows SLOWER than tourism's 36.4%. The figure is stated
     instead.
  3. "nearly a quarter of Asia's branded residence pipeline sits in
     Thailand" → held back: the brief gives no source for it. Restore
     once a source is supplied.
  No line promises weather (brief §7) — green season is framed as
  commercial terms only.
*/
export const THAILAND_SOURCES = {
  gwi: {
    name: "Global Wellness Institute",
    detail: "“GWI Releases New Data on Thailand's Fast-Growing Wellness Market”, 26 February 2026",
    href: "https://globalwellnessinstitute.org/press-room/press-releases/gwi-releases-new-data-on-thailands-fast-growing-wellness-market/",
  },
  arrivals: {
    name: "Ministry of Tourism and Sports, Thailand",
    detail: "2025 full-year arrivals (32,974,321), released January 2026",
    href: "https://www.bernama.com/en/news.php?id=2509419",
  },
} as const;

export const THAILAND_WHY = {
  eyebrow: "Why Bangkok",
  heading: ["The destination the world", "already travels to for this."],
  copy: [
    "Thailand's wellness economy stands at USD 42.7 billion, and wellness tourism spend reached USD 14 billion after growing 36.4 per cent in a single year. Its wellness real estate sector is growing at 22.9 per cent a year.",
    "Bangkok gives us the airlift, the hotel inventory and the exhibition depth a serious international summit requires — and July, in green season, gives us materially better terms.",
  ],
  stats: [
    { prefix: "USD ", to: 42.7, decimals: 1, suffix: "bn", label: "Thailand's wellness economy, 24th globally", source: "gwi" },
    { prefix: "USD ", to: 14, decimals: 0, suffix: "bn", label: "Wellness tourism spend, +36.4% year on year", source: "gwi" },
    { prefix: "", to: 22.9, decimals: 1, suffix: "%", label: "Growth in wellness real estate, 2023\u2060–\u206024", source: "gwi" },
    { prefix: "", to: 32.97, decimals: 2, suffix: "m", label: "Foreign arrivals in 2025", source: "arrivals" },
  ],
  photo: {
    src: "/images/editions/bangkok-wat-arun-loy-krathong.jpg",
    alt: "Wat Arun lit up at night on the banks of the Chao Phraya river in Bangkok",
    // CC0 (public-domain dedication) — no credit line required.
    sourceUrl: "https://commons.wikimedia.org/wiki/File:An_illuminated_ARUN_WAT_on_the_banks_of_the_Chao_Phraya_river_in_Bangkok_during_the_traditional_Loi_Krathong_festival_on_Nov.11_night..JPG",
  },
  /* Brief's button → /why-thailand, which doesn't exist yet. Set the
     URL and the button appears. */
  moreLabel: "Why Thailand",
  moreHref: null as string | null,
} as const;

/*
  Section 7 — Register and partner (brief §8). "We publish our prices."
  The full rate card lives on /register as pass cards (BangkokPasses);
  the /thailand page shows no prices — its §7 (THAILAND_REGISTER)
  sends visitors to /register to book.

  Open item (brief §11 #2): Full Summit — Standard is USD 299 or 399,
  unconfirmed — `standardPrice: null` renders "to be confirmed". Set
  the number once confirmed.

  Registration is interest-only until the refund and transfer policy
  is written (brief §11 #8): no checkout, and the pass CTAs invite
  interest via /contact for now. Point them at the Bangkok interest
  form once that's wired up.
*/
export const THAILAND_PRICES = {
  principle: "What we do not sell is a keynote slot or an award — editorial content is earned, and judging is independent.",
  /*
    `tier: "core"` passes get full cards on /register; the rest get
    compact cards. Taglines and "what's on" lists only restate the
    brief's own programme copy (§5) — the brief does not define pass
    inclusions, so nothing about what a pass includes is invented, and
    the specialist passes say "inclusions to be announced".
  */
  passes: [
    {
      id: "day-one",
      tier: "core",
      name: "Day 1 — The Conversation",
      note: "Thursday 1 July",
      price: 199,
      tagline: "The keynotes, the panels and the live development clinic — on the stage.",
      features: ["Thursday 1 July 2027", "Opening keynotes", "Panels across all three pillars", "The live development clinic"],
    },
    {
      id: "full-summit",
      tier: "core",
      featured: true,
      name: "Full Summit",
      note: "Both days",
      price: 299,
      priceNote: "Early bird",
      standardPrice: null,
      tag: "Early bird",
      tagline: "Both days in one room — the conversation and the experience.",
      features: ["Both days — 1 & 2 July 2027", "Everything on Day 1 — The Conversation", "Everything on Day 2 — The Experience"],
    },
    {
      id: "day-two",
      tier: "core",
      name: "Day 2 — The Experience",
      note: "Friday 2 July",
      price: 179,
      tagline: "Diagnostics, guided practice and property showcases — in your hands.",
      features: ["Friday 2 July 2027", "The Longevity Lab", "The Wellness Studio and the Energy Temple", "The Conscious Living Pavilion"],
    },
    { id: "practitioner", tier: "more", name: "Practitioner Pass", price: 449 },
    { id: "corporate", tier: "more", name: "Corporate Bundle", note: "5 delegates", price: 1200 },
    { id: "investor", tier: "more", name: "Investor & Developer Pass", price: 1200 },
    { id: "vip", tier: "more", name: "VIP / Inner Circle", price: 899 },
  ] as ReadonlyArray<{
    id: string;
    tier: "core" | "more";
    featured?: boolean;
    name: string;
    note?: string;
    price: number;
    priceNote?: string;
    /** Full Summit — Standard: null until confirmed (brief §11 #2). */
    standardPrice?: number | null;
    tag?: string;
    tagline?: string;
    features?: readonly string[];
  }>,
  footnote: "All prices per delegate, excluding travel and accommodation. Shown in USD with a THB equivalent at checkout.",
  interestHref: "/contact",
} as const;

/*
  Section 7 — Book your pass (brief §8, reworked on request): no prices
  on /thailand; a booking panel sends visitors to /register, where
  every pass and price is published. `id="register"` and
  `id="partner"` remain the hero buttons' targets.
*/
export const THAILAND_REGISTER = {
  eyebrow: "Passes",
  heading: ["Book your pass.", "Take your seat in the room."],
  copy: "Day passes, the full summit and specialist passes for investors, practitioners, teams and the inner circle. We publish our prices — every pass and every price is on the register page, before the first conversation.",
  cta: { label: "View passes & book", href: "/register", track: "register" },
  ticket: {
    kicker: "Admit one",
    title: THAILAND.editionName,
    place: `${THAILAND.city}, ${THAILAND.country}`,
    date: THAILAND.dateLabel,
    line: "Two days · Three pillars · One room",
  },
  partner: {
    kicker: "Partner",
    title: "Sponsorship & exhibition",
    text: "Booths and most partnership tiers are on the published rate card.",
    label: "Sponsorship & exhibition",
    href: "/sponsor",
    track: "sponsor",
  },
} as const;

/*
  Card / page photo — Wat Arun at night over the Chao Phraya, Bangkok.
  Licence is CC BY-SA 4.0, which requires attribution. NOTE: the
  credit is currently NOT displayed anywhere (removed on request) —
  either render THAILAND_PHOTO_CREDIT again, or replace the photo
  with a CC0 / public-domain / owned image.
*/
export const THAILAND_PHOTO = {
  src: "/images/editions/bangkok-wat-arun.jpg",
  alt: "Wat Arun, the Temple of Dawn, lit at night across the Chao Phraya river in Bangkok",
  width: 1400,
  height: 875,
} as const;

export const THAILAND_PHOTO_CREDIT = {
  author: "Preecha.MJ",
  license: "CC BY-SA 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Wat_arun_at_night_in_Bangkok,_Thailand.jpg",
} as const;

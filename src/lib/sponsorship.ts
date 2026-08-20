/*
  Sponsorship catalogue — single source of truth for the /sponsor page.

  NOTE ON PRICING: investment figures are deliberately omitted for now —
  the published numbers are being revised. Every tier and add-on renders
  as "Investment on request" until real figures land here. When they do,
  add `price` to these objects and surface it in the UI; nothing else
  needs to change.
*/

export type TierGroup = "headline" | "pillar" | "growth";

export type Tier = {
  id: string;
  name: string;
  group: TierGroup;
  slots: number;
  builtFor: string;
  /** One-sentence positioning shown at the top of the deep-dive. */
  positioning: string;
  /** Deep-dive benefit paragraphs — PLACEHOLDER COPY, pending the deck. */
  thoughtLeadership: string;
  exhibition: string;
  vipMedia: string;
  branding: string;
  /** Shown on every tier below the top one. */
  inherits?: boolean;
};

export const TIERS: readonly Tier[] = [
  {
    id: "celestial-title",
    name: "Celestial Title Sponsor",
    group: "headline",
    slots: 1,
    builtFor:
      "Single title partner. Headline billing across the platform and ownership of the Awards.",
    positioning:
      "The single title partner of MysticVerse Global 2026. For the brand that intends to own the conscious luxury conversation outright.",
    thoughtLeadership:
      "Headline billing across the entire platform — your name sits alongside ours in the event lockup, on the main stage, and in every announcement. A keynote address on the main stage, a seat on the Cross-Pillar Synthesis Panel, and editorial input into the programme as it is built.",
    exhibition:
      "Premium placement on the exhibition floor with the largest activation footprint available, positioned at the entrance to the Conscious Living Pavilion. Full creative control of the space, including bespoke build, scenting, and hosted hospitality.",
    vipMedia:
      "Ownership of the MysticVerse Global Excellence Awards — presenting the flagship Celestial Impact Award on stage. Priority access to the HNI lounge and the Wellness Investor Circle, delegate passes for your senior team, and first refusal on the following edition.",
    branding:
      "Logo lockup on the venue façade, main stage, delegate kit, and all pre- and post-event communications. Twelve months of editorial association across the MysticVerse Digest, website, and social channels.",
  },
  {
    id: "conscious-luxury-living",
    name: "Conscious Luxury Living Partner",
    group: "headline",
    slots: 1,
    builtFor:
      "Title of the Conscious Living Pavilion. Real estate or luxury retail.",
    positioning:
      "Title of the Conscious Living Pavilion. For wellness real estate developers and luxury retail houses.",
    thoughtLeadership:
      "Title billing on the Conscious Living Pavilion — the flagship commercial zone where wellness real estate and luxury retail meet one buyer. A speaking slot on the Sacred Architecture & Spatial Tech panel, and a named role in the Pavilion programme.",
    exhibition:
      "The anchor activation inside the Pavilion — a walkthrough villa mock-up, biophilic installation, or curated retail environment built to your specification. Your brand owns the space, the scent, and the silence for the full day.",
    vipMedia:
      "Host status at the Sunset Networking finale, held off-site at a single luxury property. Curated introductions to HNI delegates and investor-circle members, plus a full delegate allocation for your sales team.",
    branding:
      "Pavilion entrance signage, wayfinding, and Pavilion-specific collateral. Featured placement in the Conscious Luxury Briefing and a dedicated editorial feature in the MysticVerse Digest.",
    inherits: true,
  },
  {
    id: "pillar-workplace",
    name: "Pillar Partner — Workplace Wellness",
    group: "pillar",
    slots: 1,
    builtFor: "Title of the HR track and CHRO roundtable.",
    positioning:
      "Title of the Workplace Wellness pillar. For corporate wellness platforms, EAPs, HR-tech, and leadership development providers.",
    thoughtLeadership:
      "Title billing on the HR track and the closed-door CHRO roundtable. A speaking slot on the From Burnout to Resilience panel, and the opportunity to shape the roundtable agenda alongside our programme team.",
    exhibition:
      "A dedicated activation space positioned within the workplace wellbeing zone, sized for demonstrations, consultations, and hosted conversations with senior HR decision-makers.",
    vipMedia:
      "Direct access to the CHRO roundtable delegate list, hosted introductions, and delegate passes for your commercial team. Priority consideration for the Workplace Well-being Champion award category.",
    branding:
      "Track-level branding across signage, session slides, and the agenda. Editorial association across the HR Leaders Hub and the MysticVerse Digest.",
    inherits: true,
  },
  {
    id: "pillar-longevity",
    name: "Pillar Partner — Personal Mastery & Longevity",
    group: "pillar",
    slots: 1,
    builtFor: "Title of the Longevity Lab.",
    positioning:
      "Title of the Longevity Lab. For longevity clinics, biomarker platforms, and human-optimisation innovators.",
    thoughtLeadership:
      "Title billing on the Longevity Lab and a speaking slot on The Longevity Frontier panel. Editorial input into the Lab's demonstration programme and the technologies featured within it.",
    exhibition:
      "The Longevity Lab itself — a hands-on demonstration environment for diagnostics, protocols, and human-optimisation technology, built around your platform.",
    vipMedia:
      "Curated introductions to HNI delegates and the Wellness Investor Circle. Delegate passes for your clinical and commercial teams, and priority consideration for the Longevity Retreat of the Year category.",
    branding:
      "Longevity Lab signage and wayfinding, session branding, and editorial association across the MysticVerse Digest and website.",
    inherits: true,
  },
  {
    id: "pillar-wisdom",
    name: "Pillar Partner — Wisdom & Modern Science",
    group: "pillar",
    slots: 1,
    builtFor: "Title of the Wisdom Theatre programme.",
    positioning:
      "Title of the Wisdom Theatre programme. For platforms translating contemplative traditions for modern audiences.",
    thoughtLeadership:
      "Title billing on the Wisdom Theatre programme, including the Interactive Mystic Sessions and the Holistic Wellness through Ancient Wisdom expert session. Editorial input into the speaker lineup.",
    exhibition:
      "The Wisdom Theatre space — a contemplative environment for sessions, demonstrations, and guided practice, designed in partnership with your team.",
    vipMedia:
      "Introductions to practitioners, teachers, and platform partners across the delegate base. Delegate passes for your team and priority consideration for the Wisdom Voice of the Year category.",
    branding:
      "Theatre signage, programme branding, and editorial association across the MysticVerse Digest and social channels.",
    inherits: true,
  },
  {
    id: "visionary",
    name: "Visionary Sponsor",
    group: "growth",
    slots: 4,
    builtFor:
      "Innovator tier for changemakers, conscious entrepreneurs, global wellness brands.",
    positioning:
      "The innovator tier. For changemakers, conscious entrepreneurs, and global wellness brands scaling into the region.",
    thoughtLeadership:
      "A panel seat on a session aligned to your category, plus the option to add a Featured Mystic Session as a solo speaking slot. Inclusion in the speaker directory and pre-event promotion.",
    exhibition:
      "A prominent exhibition footprint with the flexibility to run product demonstrations, consultations, or sampling throughout the day.",
    vipMedia:
      "Delegate passes for your team, access to networking sessions and the exhibition reception, and inclusion in the post-event delegate report.",
    branding:
      "Logo placement across event signage, the website partner wall, and delegate collateral. Editorial mention in the MysticVerse Digest.",
    inherits: true,
  },
  {
    id: "mystic",
    name: "Mystic Sponsor",
    group: "growth",
    slots: 6,
    builtFor:
      "Visionary tier for emerging leaders. Optional Pavilion footprint.",
    positioning:
      "For emerging leaders building credibility in the conscious luxury economy. Optional Pavilion footprint.",
    thoughtLeadership:
      "Inclusion in the speaker directory with the option to be considered for panel participation, and the ability to add a Featured Mystic Session as a paid enhancement.",
    exhibition:
      "A standard exhibition booth, with the option to upgrade to a footprint inside the Conscious Living Pavilion subject to availability.",
    vipMedia:
      "Delegate passes for your team and full access to networking sessions across the day.",
    branding:
      "Logo placement on the partner wall, website, and shared event collateral.",
    inherits: true,
  },
  {
    id: "sage",
    name: "Sage Sponsor",
    group: "growth",
    slots: 10,
    builtFor: "Community tier for rooted brands, coaches, conscious educators.",
    positioning:
      "The community tier. For rooted brands, coaches, and conscious educators building presence.",
    thoughtLeadership:
      "Listing in the partner directory and inclusion in pre-event partner promotion across our channels.",
    exhibition:
      "A compact exhibition presence suited to conversations, sampling, and one-to-one consultations.",
    vipMedia:
      "Delegate passes and access to the networking programme across the day.",
    branding: "Logo placement on the partner wall and website partner listing.",
    inherits: true,
  },
  {
    id: "healer",
    name: "Healer Sponsor",
    group: "growth",
    slots: 12,
    builtFor:
      "Entry tier for conscious brands, practitioners, early collaborators.",
    positioning:
      "The entry tier. For conscious brands, practitioners, and early collaborators joining the platform.",
    thoughtLeadership:
      "Listing in the partner directory and inclusion in the collective partner announcement.",
    exhibition:
      "A shared or compact exhibition presence, ideal for practitioners and early-stage brands meeting the audience for the first time.",
    vipMedia: "Delegate passes and access to the networking programme.",
    branding: "Logo placement on the website partner listing.",
    inherits: true,
  },
];

/* Booth-only options — no sponsorship benefits attached. */
export const BOOTHS = [
  { name: "Pavilion Real Estate Booth", slots: 10 },
  { name: "Wellness Brand Booth", slots: 20 },
  { name: "Boutique / Startup Booth", slots: 8 },
] as const;

/* Standalone activations, addable to any tier. */
export type Addon = { name: string; desc: string; slots: number };

export const ADDONS: readonly Addon[] = [
  {
    name: "Featured Mystic Session",
    desc: "A 30-minute solo speaking slot on the programme.",
    slots: 4,
  },
  {
    name: "Branded Networking Break",
    desc: "A named coffee or tea break with signage and social reels.",
    slots: 4,
  },
  {
    name: "Delegate Gifting Slot",
    desc: "Your branded item placed in every welcome kit.",
    slots: 6,
  },
  {
    name: "Pre-Event Webinar Sponsorship",
    desc: "Three webinars run ahead of the event, sponsored by your brand.",
    slots: 3,
  },
  {
    name: "MysticVerse Digest Advertorial",
    desc: "A full-page editorial placement in the Digest magazine.",
    slots: 6,
  },
];

/* The three audience-segmented decks. */
export const DECKS = [
  {
    id: "conscious-luxury-living",
    name: "Conscious Luxury Living Deck",
    audience:
      "For developers, branded residences, luxury retail, design houses, hospitality, and tourism boards.",
  },
  {
    id: "workplace-wellness-hr",
    name: "Workplace Wellness & HR Deck",
    audience:
      "For corporate wellness platforms, EAPs, HR-tech, insurance, and leadership development providers.",
  },
  {
    id: "longevity-lifestyle",
    name: "Longevity & Lifestyle Deck",
    audience:
      "For longevity clinics, wellness-tech hardware brands, luxury hospitality, and conscious lifestyle FMCG.",
  },
] as const;

export type DeckId = (typeof DECKS)[number]["id"];

export function getDeckById(id: string) {
  return DECKS.find((d) => d.id === id);
}

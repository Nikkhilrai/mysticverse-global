/* ══════════════════════════════════════════════════════════════
   Awardees — MysticVerse Global Excellence Awards 2026
   Presented on the main stage, 11 September 2026, Dubai.

   Source: "AWARDEE – MVG 2026" felicitation list. Portraits are
   resolved from the speaker roster (speakersData.ts) by
   `speakerSlug`, so a photo only ever lives in one place. Honourees
   with no portrait on file fall back to a monogram medallion —
   add `speakerSlug` (or extend this with an `image`) once a photo
   is supplied.
   ══════════════════════════════════════════════════════════════ */

import { SPEAKERS } from "@/components/speakers/speakersData";

export const AWARD_YEAR = "2026";

export interface Awardee {
  slug: string;
  name: string;
  /** Felicitation title, without the year (rendered separately). */
  award: string;
  /** Recognition focus — what the honour celebrates. */
  focus: string;
  /** Slug in speakersData.ts — resolves the portrait. */
  speakerSlug?: string;
  /** Monogram shown when there is no portrait. */
  initials: string;
}

export const AWARDEES: readonly Awardee[] = [
  {
    slug: "elie-abirached",
    name: "Dr. Elie Abirached",
    award: "Biohacking Innovation of the Year",
    focus: "Biohacking, recovery, human optimisation & performance",
    speakerSlug: "elie-abirached",
    initials: "EA",
  },
  {
    slug: "zita-desmet",
    name: "Zita Desmet",
    award: "Business Coach of the Year",
    focus: "Conscious beauty, skin longevity & wellness entrepreneurship",
    speakerSlug: "zita-desmet",
    initials: "ZD",
  },
  {
    slug: "balambika",
    name: "Dr. K. S. Balambika",
    award: "Wisdom Voice of the Year",
    focus: "Educational philosophy & modern wisdom",
    speakerSlug: "balambika",
    initials: "KB",
  },
  {
    slug: "peenesh-sanghvi",
    name: "Peenesh Sanghvi",
    award: "Mysticism Visionary of the Year",
    focus: "Spiritual practice, meditation, fitness & holistic wellbeing",
    speakerSlug: "peenesh-sanghvi",
    initials: "PS",
  },
  {
    slug: "shridhar-sampath",
    name: "Shridhar Sampath",
    award: "Conscious Leadership Award",
    focus: "Executive coaching, leadership & corporate transformation",
    speakerSlug: "shridhar-sampath",
    initials: "SS",
  },
  {
    slug: "elias-hanna",
    name: "Elias Hanna",
    award: "Preventative Health Innovation Award",
    focus: "Unified Integrative Medicine & preventative wellness",
    speakerSlug: "elias-hanna",
    initials: "EH",
  },
  {
    slug: "yash-moradiya",
    name: "Yash Moradiya",
    award: "Human Performance Coach of the Year",
    focus: "Yoga, physical mastery, performance & inspirational leadership",
    speakerSlug: "yash-moradiya",
    initials: "YM",
  },
  {
    slug: "chahna-soni",
    name: "Chahna Soni",
    award: "Beauty & Aesthetic Wellness Influence of the Year",
    focus: "Beauty · Aesthetic Wellness · Health · Skincare · Conscious Living",
    initials: "CS",
  },
  {
    slug: "manoyaa",
    name: "MANOYAA",
    award: "Mind Body Integration Platform of the Year",
    focus: "Mind-Body Wellness · Holistic Healing · Conscious Living",
    initials: "M",
  },
  {
    slug: "renata-nasalyova",
    name: "Renàtà Nàsalyovà",
    award: "Energy Healing Practitioner of the Year",
    focus: "Energy Healing, Reiki, Seichem, Holistic Practice",
    initials: "RN",
  },
] as const;

/** The honouree's portrait, taken from the speaker roster (if they have one). */
export function awardeePortrait(a: Awardee): string | undefined {
  if (!a.speakerSlug) return undefined;
  return SPEAKERS.find((s) => s.slug === a.speakerSlug)?.image;
}

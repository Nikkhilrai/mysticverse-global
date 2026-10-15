/* ══════════════════════════════════════════════════════════════
   Press release — MysticVerse Global Conference & Exhibition 2026
   Source: "Post Event Report on MysticVerse Global Conference and
   Exhibition 2026" (MantraNex Vista Pvt. Ltd). Copy is kept faithful
   to the report — no quotes or figures that aren't in it.

   Photos are from the event album (galleryData.ts), chosen to match
   each session. Awardees come from awardeesData.ts so names,
   titles and portraits only ever live in one place.
   ══════════════════════════════════════════════════════════════ */

import { GALLERY_PHOTOS, type GalleryPhoto } from "@/components/gallery/galleryData";

function photo(id: string): GalleryPhoto {
  const p = GALLERY_PHOTOS.find((g) => g.id === id);
  if (!p) throw new Error(`Press release: unknown gallery photo "${id}"`);
  return p;
}

export interface PressPhoto {
  photo: GalleryPhoto;
  alt: string;
}

export const RELEASE = {
  kicker: "Press Release",
  dateline: "Dubai, UAE",
  title: "MysticVerse Global Conference & Exhibition 2026 concludes in Dubai",
  standfirst:
    "The inaugural summit brought global executives, clinicians and wellness innovators together at Taj Jumeirah Lakes Towers — a high-level convergence of conscious living, modern science and enterprise strategy.",
  hero: {
    photo: photo("g-020"),
    alt: "Speakers and honourees of MysticVerse Global 2026 on stage in Dubai, holding their awards",
  },
} as const;

export const FACTS = [
  { label: "Date", value: "11 September 2026" },
  { label: "Venue", value: "Taj Jumeirah Lakes Towers, Dubai" },
  { label: "Organiser", value: "MantraNex Vista Pvt. Ltd" },
  { label: "Programme", value: "4 pillars · 10 awards" },
] as const;

export const LEAD =
  "The inaugural MysticVerse Global Conference and Exhibition concluded successfully on September 11, 2026, at Taj Jumeirah Lakes Towers, Dubai. Organized by MantraNex Vista Pvt. Ltd under the leadership of co-founders Pallavi Sharma and Abhishek Gourav, the summit established a high-level convergence of conscious living, modern science, and enterprise strategy.";

export const ADVISORY_BOARD = [
  "Master Vani Kabir",
  "Raghvendra Verma",
  "Dr. K. S. Balambika",
  "Peenesh Sanghvi",
  "Savita Malik",
] as const;

export const PARTNERS = [
  "Manoyaa Alchemy",
  "OUNA Cosmetics",
  "Renophase",
  "KNeer",
  "SOMA Breathwork",
  "SackBerry Media",
] as const;

export const OPENING = {
  text: "The day opened with a mindful networking hour, acoustic healing, an Aura Cleansing Ceremony, and a ceremonial lamp-lighting led by Co-Founder & Director Pallavi Sharma. The conference agenda was structured across four distinct pillars designed to translate wellness insights into measurable outcomes.",
  photos: [
    { photo: photo("g-110"), alt: "The ceremonial lamp-lighting that opened MysticVerse Global 2026" },
    { photo: photo("g-097"), alt: "Guests lighting the ceremonial lamp at the start of the day" },
  ] satisfies PressPhoto[],
};

export const PILLARS = [
  "Conscious Luxury Living",
  "Workplace Wellness and Human Capital",
  "Personal Mastery and Longevity",
  "Wisdom and Modern Science",
] as const;

export interface Session {
  title: string;
  text: string;
  photos: PressPhoto[];
}

export const SESSIONS: readonly Session[] = [
  {
    title: "Timeless Wisdom and Corporate Wellbeing",
    text: "The opening intellectual discourse established wellbeing as a core strategic lever for modern leadership and institutional flourishing. Dr. K. S. Balambika (Principal, B.S.S. B.Ed Training College) delivered an insightful session highlighting how spirituality serves as a foundational key to personal and professional success. This was immediately complemented by corporate wellbeing leader Reema Akhtar (Director People & Program, SeerSolutionz) and corporate wellness expert Neelam Harjani (Founder, Inspire Wellness Dubai), who introduced frameworks on embedding holistic health, preventative vitality, and emotional discipline into organizational culture.",
    photos: [
      { photo: photo("g-103"), alt: "Dr. K. S. Balambika speaking on spirituality as the key to success" },
      { photo: photo("g-095"), alt: "Neelam Harjani speaking on corporate wellness" },
    ],
  },
  {
    title: "Workplace Stress to Resilience",
    text: "Transitioning deeper into workplace dynamics, Dr. K. S. Balambika moderated an in-depth panel discussion featuring Neelam Harjani and Reema Akhtar. The panel focused on shifting from superficial workplace perks to structural employee wellbeing, translating behavioural psychology into leadership development, and building psychological safety across cross-functional teams to curb burnout and operational fatigue.",
    photos: [
      { photo: photo("g-086"), alt: "The workplace wellbeing panel on stage" },
    ],
  },
  {
    title: "Personal Mastery and Somatic Coherence",
    text: "Igor Sivov explored authentic resource states, visibility, and professional presence. Savita Malik and Kavita Shajit (Co-Founders, Manoyaa / Manoyaa Alchemy) conducted a collaborative duo session on somatic release, nervous system alignment, and natural vitality restoration.",
    photos: [
      { photo: photo("g-053"), alt: "Igor Sivov on stage" },
      { photo: photo("g-107"), alt: "Savita Malik and Kavita Shajit of Manoyaa during their duo session" },
    ],
  },
  {
    title: "The Longevity Frontier",
    text: "Moderated by Elias Hanna (Unified Integrative Medicine), this panel brought together Dr. Elie Abirached (CEO, Restore Fitness & Limitless Human), Dr. Saúl Vargas (NADclinic Group), and Zita Desmet, Business Coach of the Year 2026 & Founder, Ouna Cosmetics (Conscious beauty, skin longevity & wellness entrepreneurship) to explore functional cellular care, precision peptides, and biohacking protocols.",
    photos: [
      { photo: photo("g-123"), alt: "Elias Hanna moderating the longevity panel" },
    ],
  },
  {
    title: "Movement, Breathwork, and Cellular Longevity",
    text: "Afternoon sessions featured Zita Desmet on mitochondrial health and skin longevity, followed by a chair yoga mobility reset by 10-time Guinness World Record holder Yash Moradiya. Lisa Moley conducted a guided SOMA Breathwork journey using immersive headsets.",
    photos: [
      { photo: photo("g-074"), alt: "Zita Desmet on mitochondrial health and skin longevity" },
      { photo: photo("g-070"), alt: "Yash Moradiya leading the chair yoga mobility reset" },
      { photo: photo("g-083"), alt: "Lisa Moley's SOMA Breathwork session" },
    ],
  },
  {
    title: "Holistic Fitness and Leadership Resonance",
    text: "Peenesh Sanghvi moderated a panel on mind-body fitness with Yogacharya Subhendu, Suha Hamad (Founder, Reikilates), and Matteo Minero (Co-Founder & Co-CEO, Traininpink). The speaking program closed with Shridhar Sampath and Rajani Shridhar demonstrating soundscapes and music therapy for executive calm and stress de-escalation.",
    photos: [
      { photo: photo("g-033"), alt: "The holistic fitness panel moderated by Peenesh Sanghvi" },
      { photo: photo("g-068"), alt: "Shridhar Sampath on music therapy for executive calm" },
    ],
  },
];

export const AWARDS_INTRO =
  "The summit culminated in the presentation of the MysticVerse Global Excellence Awards, celebrating transformative leaders and organizations setting benchmarks across healthcare, mindfulness, aesthetics, and enterprise wellbeing.";

export const AWARDS_PHOTO: PressPhoto = {
  photo: photo("g-005"),
  alt: "The MysticVerse Global Excellence Awards 2026 trophies",
};

export const CLOSING =
  "The conference established a strong benchmark for forward-looking industry forums, successfully demonstrating how timeless traditional practices and advanced scientific principles can align to elevate modern corporate and personal living.";

/** Closing photo strip — links through to the full gallery. */
export const MOMENTS: readonly PressPhoto[] = [
  { photo: photo("g-127"), alt: "Delegates and speakers gathered for the group photograph" },
  { photo: photo("g-102"), alt: "The audience in the ballroom" },
  { photo: photo("g-091"), alt: "Delegates on their feet during Igor Sivov's session" },
  { photo: photo("g-124"), alt: "Conversations between sessions" },
  { photo: photo("g-076"), alt: "A delegate during the SOMA Breathwork journey" },
  { photo: photo("g-010"), alt: "An award presented on the main stage" },
];

export const MEDIA_CONTACT = "contact@mysticverseglobal.com";

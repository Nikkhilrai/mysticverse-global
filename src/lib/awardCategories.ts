/*
  MysticVerse Global Excellence Awards 2026 — category catalogue.

  Single source of truth for pricing and category copy, mirroring
  src/lib/passes.ts: the server reads the fee from here by count, the
  client reads the same object for display, so price and copy can
  never drift apart. `categories` on AwardNomination stores the exact
  `name` string from this list (denormalized, same convention as
  PassRegistration.passType / AwardSubmission.category).
*/

export const NOMINATION_FEE_USD = 499;
export const NOMINATION_FEE_MINOR = 49900; // cents
export const MAX_CATEGORIES_PER_NOMINATION = 3;

export type PillarId =
  | "conscious-luxury-living"
  | "workplace-wellness-human-capital"
  | "personal-mastery-longevity"
  | "ancient-wisdom-energy-consciousness";

export interface Pillar {
  id: PillarId;
  name: string;
  focus: string;
}

export interface AwardCategory {
  id: string;
  name: string;
  description: string;
  pillarId: PillarId;
}

export const PILLARS: readonly Pillar[] = [
  {
    id: "conscious-luxury-living",
    name: "Conscious Luxury Living",
    focus: "Wellness real estate, branded communities, biophilic architecture, and premium lifestyle infrastructure.",
  },
  {
    id: "workplace-wellness-human-capital",
    name: "Workplace Wellness & Human Capital",
    focus: "Enterprise resilience, burnout prevention, executive health, and progressive leadership strategy.",
  },
  {
    id: "personal-mastery-longevity",
    name: "Personal Mastery & Longevity",
    focus: "Biohacking, longevity science, performance optimization, and evidence-based healthspan extension.",
  },
  {
    id: "ancient-wisdom-energy-consciousness",
    name: "Ancient Wisdom, Energy Healing & Consciousness",
    focus: "Energy healing, sound therapy, consciousness research, breathwork, and ancient traditions.",
  },
] as const;

export const AWARD_CATEGORIES: readonly AwardCategory[] = [
  // ── Pillar 1: Conscious Luxury Living ──────────────────────
  {
    id: "conscious-living-project-of-the-year",
    name: "Conscious Living Project of the Year",
    description: "Awarded to a landmark wellness real estate development redefining sustainable living.",
    pillarId: "conscious-luxury-living",
  },
  {
    id: "conscious-architecture-biophilic-design-award",
    name: "Conscious Architecture & Biophilic Design Award",
    description: "Awarded to a design studio or architect leading human-centric and biophilic environments.",
    pillarId: "conscious-luxury-living",
  },
  {
    id: "wellness-hospitality-operator-of-the-year",
    name: "Wellness Hospitality Operator of the Year",
    description: "Recognising luxury retreats, resorts, and branded residences delivering holistic guest well-being.",
    pillarId: "conscious-luxury-living",
  },
  {
    id: "regenerative-urban-development-award",
    name: "Regenerative Urban Development Award",
    description: "For master-planned communities integrating ecological restoration with residential luxury.",
    pillarId: "conscious-luxury-living",
  },
  {
    id: "eco-luxury-interior-design-studio-of-the-year",
    name: "Eco-Luxury Interior Design Studio of the Year",
    description: "Honouring interior designs using sustainable, non-toxic, and energy-harmonising materials.",
    pillarId: "conscious-luxury-living",
  },
  {
    id: "sustainable-luxury-resort-of-the-year",
    name: "Sustainable Luxury Resort of the Year",
    description: "Recognizing high-end eco-resorts balancing luxury guest experiences with zero-carbon footprints.",
    pillarId: "conscious-luxury-living",
  },
  {
    id: "conscious-real-estate-developer-of-the-year",
    name: "Conscious Real Estate Developer of the Year",
    description: "For real estate firms leading the integration of wellness technologies into residential developments.",
    pillarId: "conscious-luxury-living",
  },
  {
    id: "innovative-biophilic-infrastructure-award",
    name: "Innovative Biophilic Infrastructure Award",
    description: "Awarding smart building projects that successfully integrate living ecosystems and natural elements.",
    pillarId: "conscious-luxury-living",
  },
  {
    id: "retreat-center-of-the-year",
    name: "Retreat Center of the Year",
    description: "Recognizing dedicated sanctuaries offering transformational and restorative physical experiences.",
    pillarId: "conscious-luxury-living",
  },
  {
    id: "conscious-community-masterplan-award",
    name: "Conscious Community Masterplan Award",
    description: "Awarding multi-use developments designed specifically around collective well-being and community connection.",
    pillarId: "conscious-luxury-living",
  },

  // ── Pillar 2: Workplace Wellness & Human Capital ───────────
  {
    id: "hr-wellness-initiative-of-the-year",
    name: "HR Wellness Initiative of the Year",
    description: "Awarded to an enterprise workplace wellbeing programme with proven organizational outcomes.",
    pillarId: "workplace-wellness-human-capital",
  },
  {
    id: "chro-of-the-year",
    name: "Chief Human Resources Officer (CHRO) of the Year",
    description: "Recognising a CHRO pioneering human-centric workplace culture and mental health strategy.",
    pillarId: "workplace-wellness-human-capital",
  },
  {
    id: "enterprise-mental-health-leadership-award",
    name: "Enterprise Mental Health Leadership Award",
    description: "Awarded to organizations setting corporate standards in psychological safety and employee well-being.",
    pillarId: "workplace-wellness-human-capital",
  },
  {
    id: "corporate-burnout-prevention-program-of-the-year",
    name: "Corporate Burnout Prevention Program of the Year",
    description: "For impactful initiatives actively mitigating executive stress and workforce fatigue.",
    pillarId: "workplace-wellness-human-capital",
  },
  {
    id: "conscious-leadership-excellence-award",
    name: "Conscious Leadership Excellence Award",
    description: "Recognising C-Suite executives who lead with empathy, ethical integrity, and mindfulness.",
    pillarId: "workplace-wellness-human-capital",
  },
  {
    id: "workplace-health-tech-platform-of-the-year",
    name: "Workplace Health Tech Platform of the Year",
    description: "Awarding digital applications and tools improving employee mental and physical well-being.",
    pillarId: "workplace-wellness-human-capital",
  },
  {
    id: "organizational-resilience-excellence-award",
    name: "Organizational Resilience Excellence Award",
    description: "For companies demonstrating outstanding adaptability and employee care during high-stress transitions.",
    pillarId: "workplace-wellness-human-capital",
  },
  {
    id: "workplace-wellness-innovation-award",
    name: "Workplace Wellness Innovation Award",
    description: "Recognizing novel approaches to physical, nutritional, or mental health within corporate office environments.",
    pillarId: "workplace-wellness-human-capital",
  },
  {
    id: "diversity-equity-wellbeing-integration-award",
    name: "Diversity, Equity, and Well-being Integration Award",
    description: "For programs seamlessly linking corporate diversity with overall workforce health.",
    pillarId: "workplace-wellness-human-capital",
  },
  {
    id: "executive-coaching-program-of-the-year",
    name: "Executive Coaching Program of the Year",
    description: "Awarding transformational coaching programs designed for executive leaders and C-level decision-makers.",
    pillarId: "workplace-wellness-human-capital",
  },

  // ── Pillar 3: Personal Mastery & Longevity ─────────────────
  {
    id: "longevity-innovator-of-the-year",
    name: "Longevity Innovator of the Year",
    description: "Awarded to a pioneer, residence, or technology platform advancing longevity science.",
    pillarId: "personal-mastery-longevity",
  },
  {
    id: "biohacking-innovation-of-the-year",
    name: "Biohacking Innovation of the Year",
    description: "Honouring technological breakthroughs designed to measure and optimize human biological performance.",
    pillarId: "personal-mastery-longevity",
  },
  {
    id: "healthspan-tech-platform-of-the-year",
    name: "Healthspan Tech Platform of the Year",
    description: "Recognizing digital health solutions, AI tools, and platforms focused on cellular and biological aging.",
    pillarId: "personal-mastery-longevity",
  },
  {
    id: "longevity-center-clinic-of-the-year",
    name: "Longevity Center & Clinic of the Year",
    description: "Awarding medical wellness centers providing evidence-based anti-aging and preventative medicine.",
    pillarId: "personal-mastery-longevity",
  },
  {
    id: "human-performance-coach-of-the-year",
    name: "Human Performance Coach of the Year",
    description: "For exceptional practitioners guiding individuals toward peak physical and mental performance.",
    pillarId: "personal-mastery-longevity",
  },
  {
    id: "preventative-health-innovation-award",
    name: "Preventative Health Innovation Award",
    description: "Recognizing diagnostics, early detection tools, and preventative health protocols.",
    pillarId: "personal-mastery-longevity",
  },
  {
    id: "conscious-brand-of-the-year",
    name: "Conscious Brand of the Year",
    description: "Awarded to a luxury retail, consumer, or health brand setting new standards in conscious commerce.",
    pillarId: "personal-mastery-longevity",
  },
  {
    id: "personal-transformation-platform-of-the-year",
    name: "Personal Transformation Platform of the Year",
    description: "Honouring digital ecosystems and apps that enable structured self-mastery and growth.",
    pillarId: "personal-mastery-longevity",
  },
  {
    id: "nutraceutical-cellular-health-brand-of-the-year",
    name: "Nutraceutical & Cellular Health Brand of the Year",
    description: "For brands producing high-purity, science-backed nutritional and longevity formulations.",
    pillarId: "personal-mastery-longevity",
  },
  {
    id: "bio-harmonizing-technology-award",
    name: "Bio-Harmonizing Technology Award",
    description: "Recognizing devices and tech designed to optimize sleep, recovery, and human energy systems.",
    pillarId: "personal-mastery-longevity",
  },

  // ── Pillar 4: Ancient Wisdom, Energy Healing & Consciousness ─
  {
    id: "wisdom-voice-of-the-year",
    name: "Wisdom Voice of the Year",
    description: "Awarded to a teacher, author, or platform translating ancient traditions for modern global audiences.",
    pillarId: "ancient-wisdom-energy-consciousness",
  },
  {
    id: "energy-healing-practitioner-of-the-year",
    name: "Energy Healing Practitioner of the Year",
    description: "Recognising outstanding mastery and impact in energetic, subtle-body, and biofield therapies.",
    pillarId: "ancient-wisdom-energy-consciousness",
  },
  {
    id: "sound-vibrational-therapy-pioneer-award",
    name: "Sound & Vibrational Therapy Pioneer Award",
    description: "Awarded to practitioners or creators utilizing frequency and sound for cellular and mental healing.",
    pillarId: "ancient-wisdom-energy-consciousness",
  },
  {
    id: "consciousness-research-excellence-award",
    name: "Consciousness Research Excellence Award",
    description: "Honouring researchers, institutions, or authors bridging modern science with quantum and conscious perspectives.",
    pillarId: "ancient-wisdom-energy-consciousness",
  },
  {
    id: "transformational-breathwork-meditation-platform",
    name: "Transformational Breathwork & Meditation Platform",
    description: "For leading facilitators and platforms guiding large-scale breathwork and contemplative practices.",
    pillarId: "ancient-wisdom-energy-consciousness",
  },
  {
    id: "vedic-sciences-integration-award",
    name: "Vedic Sciences Integration Award",
    description: "Recognising authentic applications of Ayurveda, Vastu, or Vedic philosophy in modern life.",
    pillarId: "ancient-wisdom-energy-consciousness",
  },
  {
    id: "holistic-healing-sanctuary-of-the-year",
    name: "Holistic Healing Sanctuary of the Year",
    description: "Awarding physical locations dedicated to deep energetic restoration and holistic therapies.",
    pillarId: "ancient-wisdom-energy-consciousness",
  },
  {
    id: "mind-body-integration-platform-award",
    name: "Mind-Body Integration Platform Award",
    description: "For methods, books, or courses uniting physical health with mental and spiritual expansion.",
    pillarId: "ancient-wisdom-energy-consciousness",
  },
  {
    id: "sacred-arts-cultural-preservation-award",
    name: "Sacred Arts & Cultural Preservation Award",
    description: "Honouring individuals or projects preserving and reviving traditional indigenous wisdom and healing arts.",
    pillarId: "ancient-wisdom-energy-consciousness",
  },
  {
    id: "spiritual-fitness-nutrition-ayurveda-practitioner",
    name: "Spiritual, Fitness, Nutrition & Ayurveda Practitioner",
    description: "Recognising practitioners integrating spiritual practice, fitness, nutrition, and Ayurvedic wisdom into holistic personal wellness.",
    pillarId: "ancient-wisdom-energy-consciousness",
  },
  {
    id: "global-impact-flagship-honor",
    name: "Global Impact Flagship Honor",
    description: "Crossing all four pillars, awarded to an individual or organization creating profound worldwide transformational change.",
    pillarId: "ancient-wisdom-energy-consciousness",
  },
  {
    id: "content-creator-health-beauty-wellness",
    name: "Content Creator – Health, Beauty & Wellness",
    description: "Recognising creators building trusted audiences and shaping public conversation around health, beauty, and wellness.",
    pillarId: "ancient-wisdom-energy-consciousness",
  },
] as const;

export function getCategoriesByPillar(pillarId: PillarId): AwardCategory[] {
  return AWARD_CATEGORIES.filter((c) => c.pillarId === pillarId);
}

export function getCategoryByName(name: string): AwardCategory | undefined {
  return AWARD_CATEGORIES.find((c) => c.name === name);
}

export function isValidCategoryName(name: string): boolean {
  return AWARD_CATEGORIES.some((c) => c.name === name);
}

export function calcNominationFeeMinor(categoryCount: number): number {
  return categoryCount * NOMINATION_FEE_MINOR;
}

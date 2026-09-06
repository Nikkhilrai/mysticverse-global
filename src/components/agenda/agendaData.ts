/* ══════════════════════════════════════════════════════════════
   Agenda data — MysticVerse Global Conference 2026
   One day, Dubai. Canonical date: 11 September 2026.
   Venue: Taj Jumeirah Lakes Towers, Dubai.

   kind:
     "feature" — keynotes & the Excellence Awards (highlighted)
     "main"    — panels / solo & duo sessions / mystic sessions
     "break"   — registration, meals, tea, short pauses, closings

   `section` marks the first session of a programme block; the
   schedule renders a heading above it.
   ══════════════════════════════════════════════════════════════ */

export type SessionKind = "feature" | "main" | "break";

export interface SessionSpeaker {
  name: string;
  role?: string;
  /** Matches a slug in speakersData.ts — resolves the speaker's photo. */
  slug?: string;
}

export interface Session {
  time: string;
  tag: string;
  title: string;
  kind: SessionKind;
  desc?: string;
  points?: readonly string[];
  speakers?: readonly SessionSpeaker[];
  /** Block heading rendered above this session. */
  section?: string;
}

export const CONFERENCE_DATE = "11 September 2026";
export const CONFERENCE_VENUE = "Taj Jumeirah Lakes Towers, Dubai";
export const CONFERENCE_THEME =
  "Where Ancient Wisdom Meets Strategic Innovation";
export const CONFERENCE_THEME_SUB =
  "Redefining how we live, work, and thrive.";
export const CONFERENCE_FOCUS =
  "Real Estate Wellness · Workplace Wellbeing (HR Lens) · Wellness Retreats & Longevity Science";

export const SESSIONS: readonly Session[] = [
  {
    section: "Morning Session — Grounding & The Workplace Revolution (HR Perspective)",
    time: "8:00 AM – 9:00 AM",
    tag: "Registration & Networking",
    title: "Registration & Mindful Connections",
    kind: "break",
    desc: "A quiet, grounding moment to arrive, featuring a welcome tea, acoustic healing music, and a signature Aura Cleansing Ceremony to set a mindful intention. Followed by five minutes of opening remarks.",
    speakers: [{ name: "Organiser / Co-Founder & Director" }],
  },
  {
    time: "9:00 AM – 9:15 AM",
    tag: "Ceremony",
    title: "Organizer's Welcome & Lamp-Lighting Ceremony",
    kind: "break",
    desc: "Setting the stage for a transformative day where ancient wisdom officially meets modern strategy.",
  },
  {
    time: "9:15 AM – 9:40 AM",
    tag: "Keynote Address",
    title: "Timeless Wisdom for Modern Flourishing",
    kind: "feature",
    desc: '"Wellbeing as Strategy: The Convergence of Longevity, Sacred Spaces, and Human Success." Challenging the notion of wellness as an "escape" and framing it as a fundamental driver of corporate productivity, luxury living, and global lifestyle aspirations.',
    speakers: [{ name: "A global wellness officer, major corporation" }],
  },
  {
    time: "9:30 AM – 9:45 AM",
    tag: "Solo Session",
    title: "The Art of Being Visible",
    kind: "main",
    speakers: [
      {
        name: "Igor Sivov",
        role: "Master of Resource State · Master of Psychoanalysis",
        slug: "igor-sivov",
      },
    ],
  },
  {
    time: "9:45 AM – 10:25 AM",
    tag: "Panel Discussion",
    title: "From Burnout to Resilience: Transforming Workplace Stress into Personal Resilience Through Daily Habit Mastery and Emotional Discipline",
    kind: "main",
    desc: "Focus (HR Lens): Transitioning from superficial perks to structural workplace wellness.",
    points: [
      "Adapting foundational academic resilience methodologies and stress-mitigation protocols into scalable employee wellbeing initiatives that prevent burnout and institutional fatigue",
      "Applying behavioral and organizational psychology principles to leadership development, ensuring managers build psychological safety and empathetic communication pathways across cross-functional teams",
      "Embedding holistic mindfulness and preventive health practices directly into daily operational workflows, backed by measurable metrics linking employee wellbeing to sustained organizational performance",
    ],
    speakers: [
      {
        name: "Dr. K. S. Balambika",
        role: "Principal, B.S.S. B.Ed Training College, Kerala",
        slug: "balambika",
      },
      {
        name: "Neelam Harjani",
        role: "Corporate Wellness Expert · Founder, Inspire Wellness Dubai",
        slug: "neelam-harjani",
      },
      {
        name: "Dalida Jaafar",
        role: "Organizational Psychologist · Leadership Development Trainer",
        slug: "dalida-jaafar",
      },
    ],
  },
  {
    time: "10:25 AM – 10:55 AM",
    tag: "Prana Boost",
    title: "Morning Rejuvenation Break & High Tea",
    kind: "break",
    desc: "Networking, body resets, and an organic herbal and brew bar.",
  },
  {
    time: "11:15 AM – 11:55 AM",
    tag: "Panel Discussion",
    title: "Sacred Architecture & Spatial Tech: Redefining Real Estate Wellness",
    kind: "main",
    desc: "Focus (Real Estate Lens): How wellness is transforming luxury living and shaping investment in premium residential portfolios.",
    points: [
      "Integrating ancient spatial sciences — Vaastu and Feng Shui — with smart-home and environmental technologies",
      "Designing residences, master-planned wellness communities, and offices for circadian alignment, air quality, and emotional clarity",
      'Creating "sacred spaces" within high-pressure urban environments to ease digital overload',
    ],
  },
  {
    section: "Mid-Day Session — Spatial Harmony & Longevity",
    time: "12:00 PM – 12:15 PM",
    tag: "Solo Session",
    title: "Restoring Internal Coherence Through Somatic Release & Nervous System Alignment",
    kind: "main",
    desc: "Attendees will understand how the body stores stress and how gentle modalities foster recovery without force — gaining practical breathwork, somatic tools, and systemic insights to restore daily vitality naturally.",
    speakers: [
      {
        name: "Savita Malik",
        role: "Co-Founder, Manoyaa",
        slug: "savita-malik",
      },
    ],
  },
  {
    time: "12:15 PM – 1:15 PM",
    tag: "Lunch Break",
    title: "Networking & Lunch Break",
    kind: "break",
    desc: "Networking, connection, and lunch.",
  },
  {
    time: "1:15 PM – 2:00 PM",
    tag: "Panel Discussion",
    title: "The Longevity Frontier: Sustaining Lifelong Health by Integrating Functional Longevity Science with Daily Cellular Care",
    kind: "main",
    desc: "Focus (Retreats & Longevity Lens): The evolution of wellness tourism from temporary getaways to hyper-personalised, scientific lifespans.",
    points: [
      "Harmonizing whole-body systems by aligning cellular health with Unified Integrative Medicine",
      "Maximizing daily cellular recovery by implementing strategic biohacking tools for sustainable healthspan",
      "Targeting cellular longevity pathways through precision peptides and functional performance protocols",
      "Bridging ancient Eastern wisdom and modern cellular biology for lasting systemic longevity",
      "Sustaining everyday vitality by translating functional longevity science into grounded wellness routines",
    ],
    speakers: [
      {
        name: "Elias Hanna",
        role: "Certified Practitioner, Unified Integrative Medicine",
        slug: "elias-hanna",
      },
      {
        name: "Dr. Elie Abirached",
        role: "Biohacking & Recovery Strategist & CEO, Restore Fitness & Limitless Human",
        slug: "elie-abirached",
      },
      {
        name: "Dr. Saúl Vargas",
        role: "Performance Doctor · Peptide & Longevity Advisor, NADclinic Group",
        slug: "saul-vargas",
      },
      {
        name: "Dr. Rajarajachozhan Ramachandran",
        role: "Integrative Clinical Experience · Longevity & Functional Wellness Leader · Integrative Eastern Wellness",
        slug: "raja-ramachandran",
      },
      {
        name: "Zita Desmet",
        role: "Integrative Clinical Experience · Longevity & Functional Wellness Leader · Integrative Eastern Wellness",
        slug: "zita-desmet",
      },
    ],
  },
  {
    time: "2:00 PM – 2:25 PM",
    tag: "Solo Session",
    title: "The Business of Skin-Longevity",
    kind: "main",
    speakers: [
      {
        name: "Zita Desmet",
        role: "Co-Founder, OUNA Cosmetics",
        slug: "zita-desmet",
      },
    ],
  },
  {
    section: "Evening Session — Convergence & Celebration",
    time: "2:25 PM – 3:05 PM",
    tag: "Cross-Pillar Synthesis Panel",
    title: "The Multidimensional Life: How HR, Real Estate, and Retreats Shape the Future of Living",
    kind: "main",
    desc: "A collaborative discussion featuring real estate developers, HR executives, and longevity retreat curators.",
    points: [
      "How corporate packages are expanding to offer executive-level longevity retreats as retention benefits",
      "Designing residential environments that sustain the physical benefits gained from wellness retreats",
      "Actionable tools for high-performing leaders to integrate wellness habits into demanding lifestyles",
      "The role of hospitality and spa across the wellness ecosystem",
    ],
  },
  {
    time: "3:05 PM – 3:35 PM",
    tag: "Tea & Coffee",
    title: "Afternoon Energy Break & Networking High Tea",
    kind: "break",
    desc: "Networking and hands-on exploration at the Spatial Tech & Holistic Healing Solutions exhibition booths.",
  },
  {
    time: "3:35 PM – 4:15 PM",
    tag: "Panel Discussion",
    title: "Yoga & Other Forms of Mind and Physical Fitness for Holistic Well-Being",
    kind: "main",
    desc: "A dual exploration of yoga's therapeutic power and the wider science of mind-body fitness for high-performing lives.",
    points: [
      "Yoga — preventive and therapeutic health benefits",
      "Yoga — mindfulness, breath control, and emotional balance",
      "Yoga — enhancing focus and stress resilience",
      "Mind & body — the science-backed connection between mind and body",
      "Mind & body — strength, mobility, recovery, and endurance",
      "Mind & body — sustaining performance in high-pressure roles",
    ],
    speakers: [
      {
        name: "Yogacharya Subhendu",
        role: "World-Renowned Yoga Master · Fifth-Generation Yogi",
        slug: "yogacharya-subhendu",
      },
      {
        name: "Peenesh Sanghvi",
        role: "Inspirational & Motivational Speaker · Spiritual Practitioner",
        slug: "peenesh-sanghvi",
      },
      {
        name: "Suha Hamad",
        role: "Wellness Coach · Founder, Reikilates",
        slug: "suha-hamad",
      },
    ],
  },
  {
    time: "4:15 PM – 4:45 PM",
    tag: "Duo Session",
    title: "Music Therapy & Calm Coach Session",
    kind: "main",
    desc: "Harmonizing leadership resilience and mental well-being through music therapy and executive coaching.",
    points: [
      "Neurological calming and stress de-escalation",
      "Executive poise and mindset under pressure",
      "Therapeutic soundscapes for cognitive restoration",
      "Integrated self-regulation practices",
    ],
    speakers: [
      {
        name: "Shridhar Sampath",
        role: "Executive Coach · Corporate Educator · Motivational Speaker",
        slug: "shridhar-sampath",
      },
      {
        name: "Rajani Shridhar",
        role: "Musician & Music Therapist",
        slug: "rajani-shridhar",
      },
    ],
  },
  {
    time: "4:45 PM – 5:00 PM",
    tag: "Chair Yoga",
    title: "Guided Chair Yoga",
    kind: "break",
  },
  {
    time: "5:00 PM – 5:30 PM",
    tag: "Ceremony",
    title: "MysticVerse Global Excellence Awards",
    kind: "feature",
    desc: "Honoring visionary changemakers and brands across three curated categories.",
    points: [
      "Workplace Well-being Champion (HR)",
      "Innovative Wellness Architecture & Real Estate",
      "Pioneering Longevity Retreat of the Year",
    ],
  },
  {
    time: "5:30 PM – 5:40 PM",
    tag: "Closing",
    title: "Closing Ceremony & Vote of Thanks",
    kind: "break",
    desc: "Reflections on wrapping up the day.",
  },
] as const;

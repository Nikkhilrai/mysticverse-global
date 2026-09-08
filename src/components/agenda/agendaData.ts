/* ══════════════════════════════════════════════════════════════
   Agenda data — MysticVerse Global Conference 2026
   One day, Dubai. Canonical date: 11 September 2026.
   Venue: Taj Jumeirah Lakes Towers, Dubai.

   Source: "Final Website Agenda" — program flow synchronized to
   close at 5:30 PM. Speakers marked TBC in the source are omitted
   here rather than shown as a raw placeholder.

   kind:
     "feature" — keynotes & the Excellence Awards (highlighted)
     "main"    — panels / solo & duo sessions
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
  /** Direct photo path — for hosts/organisers who aren't in the conference speaker roster. */
  image?: string;
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

const IMG = "/images/speakers";

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
    section: "Morning — Arrival, Opening & Visibility",
    time: "8:00 AM – 9:00 AM",
    tag: "Registration & Networking",
    title: "Registration & Mindful Connections",
    kind: "break",
    desc: "Registration, welcome tea, acoustic healing music, and a signature Aura Cleansing Ceremony to help attendees arrive, connect, and set a mindful intention.",
  },
  {
    time: "9:00 AM – 9:15 AM",
    tag: "Ceremony",
    title: "Organizer's Welcome & Lamp-Lighting Ceremony",
    kind: "break",
    desc: "Setting the stage for a transformative day where ancient wisdom officially meets modern strategy.",
    speakers: [
      {
        name: "Pallavi Sharma",
        role: "Co-Founder, MysticVerse Global",
        image: `${IMG}/pallavi-sharma.jpeg`,
      },
    ],
  },
  {
    time: "9:15 AM – 9:40 AM",
    tag: "Keynote Address",
    title: "Timeless Wisdom for Modern Flourishing",
    kind: "feature",
    desc: "Wellbeing as strategy: the convergence of longevity, sacred spaces, and human success — framing wellness as a driver of corporate productivity, luxury living, and global lifestyle aspirations.",
    speakers: [{ name: "Speaker to be confirmed — Global Wellness Officer" }],
  },
  {
    time: "9:40 AM – 10:30 AM",
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
      {
        name: "Suha Hamad",
        role: "Wellness Coach · Founder, Reikilates",
        slug: "suha-hamad",
      },
    ],
  },
  {
    time: "10:30 AM – 11:00 AM",
    tag: "Solo Session",
    title: "The Art of Being Visible",
    kind: "main",
    desc: "A focused session on presence, visibility, and bringing one's authentic resource state into professional and personal life.",
    speakers: [
      {
        name: "Igor Sivov",
        role: "Master of Resource State · Master of Psychoanalysis",
        slug: "igor-sivov",
      },
    ],
  },
  {
    time: "11:00 AM – 11:30 AM",
    tag: "Morning Tea Break",
    title: "Networking, Body Reset & Organic Herbal Brew Bar",
    kind: "break",
    desc: "A restorative networking interval with organic herbal brews, body-reset practices, and a curated exhibition visit.",
  },
  {
    section: "Late Morning — Somatic Wellbeing & Longevity",
    time: "11:30 AM – 11:55 AM",
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
    time: "11:55 AM – 12:45 PM",
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
    time: "12:45 PM – 1:35 PM",
    tag: "Lunch Break",
    title: "Networking Lunch & Exhibition Visit",
    kind: "break",
    desc: "A lunch interval for nourishment, connectivity, and informal conversations across workplace wellbeing, real estate, retreats, and longevity science.",
  },
  {
    section: "Afternoon — Future of Living & Mind-Body Performance",
    time: "1:35 PM – 2:10 PM",
    tag: "Cross-Pillar Synthesis Panel",
    title: "The Multidimensional Life: How HR, Real Estate, Retreats & Hospitality Shape the Future of Living",
    kind: "main",
    desc: "A collaborative discussion featuring HR, real estate, retreat, and hospitality perspectives on the future of living.",
    points: [
      "How corporate packages are expanding to offer executive-level longevity retreats as retention benefits",
      "Designing residential environments that sustain the physical benefits gained from wellness retreats",
      "Actionable tools for high-performing leaders to integrate wellness habits into demanding lifestyles",
      "The role of spa and hospitality in shaping the future of living",
    ],
  },
  {
    time: "2:10 PM – 2:30 PM",
    tag: "Solo Session",
    title: "Mitochondrial Health: The Future of Skin Longevity",
    kind: "main",
    desc: "Exploring mitochondrial health as a foundation for skin longevity, vitality, and next-generation beauty and wellness approaches.",
    speakers: [
      {
        name: "Zita Desmet",
        role: "Co-Founder, OUNA Cosmetics",
        slug: "zita-desmet",
      },
    ],
  },
  {
    time: "2:30 PM – 2:50 PM",
    tag: "Chair Yoga",
    title: "Chair Yoga: Reset, Release & Re-energise",
    kind: "main",
    desc: "A short, accessible movement reset designed to restore posture, mobility, breath awareness, and focus before the afternoon sessions.",
    speakers: [
      {
        name: "Yash Moradiya",
        role: "Yoga Teacher & Inspirational Speaker · 10-Time Guinness World Record Holder",
        slug: "yash-moradiya",
      },
    ],
  },
  {
    time: "2:50 PM – 3:15 PM",
    tag: "Wellness Networking Experience & High Tea",
    title: "Curated Exhibition Visit & Cross-Pillar Networking",
    kind: "break",
    desc: "A dedicated experience zone to explore wellness solutions, spatial technology, holistic healing, and longevity offerings while connecting with speakers, partners, and fellow delegates.",
  },
  {
    time: "3:15 PM – 4:00 PM",
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
    time: "4:00 PM – 4:40 PM",
    tag: "Duo Session",
    title: "Music Therapy & Calm Coaching for Leadership Resilience",
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
    section: "Closing — Recognition & Reflection",
    time: "4:40 PM – 5:10 PM",
    tag: "Awards Ceremony",
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
    time: "5:10 PM – 5:30 PM",
    tag: "Closing",
    title: "Reflections, Closing Remarks & Vote of Thanks",
    kind: "break",
    desc: "A concise closing reflection to synthesise the day's insights, acknowledge contributors, and formally conclude MysticVerse Global 2026.",
  },
] as const;

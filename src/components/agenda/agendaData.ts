/* ══════════════════════════════════════════════════════════════
   Agenda data — MysticVerse Global Conference 2026
   One day, Dubai. Canonical date: 11 September 2026.
   Venue: Taj Jumeirah Lakes Towers, Dubai.

   kind:
     "feature" — keynotes & the Excellence Awards (highlighted)
     "main"    — panels / mystic sessions / case studies (full cards)
     "break"   — registration, meals, tea, short pauses, closings
   ══════════════════════════════════════════════════════════════ */

export type SessionKind = "feature" | "main" | "break";

export interface Session {
  time: string;
  tag: string;
  title: string;
  kind: SessionKind;
  desc?: string;
  points?: readonly string[];
  speaker?: string;
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
    time: "8:00 AM – 9:00 AM",
    tag: "Registration & Networking",
    title: "Registration & Mindful Connections",
    kind: "break",
    desc: "A quiet, grounding moment to arrive, featuring a welcome tea, acoustic healing music, and a signature Aura Cleansing Ceremony to set a mindful intention. Followed by five minutes of opening remarks.",
    speaker: "Organiser / Co-Founder & Director",
  },
  {
    time: "9:00 AM – 9:15 AM",
    tag: "Ceremony",
    title: "Organizer's Welcome & Lamp-Lighting Ceremony",
    kind: "break",
    desc: "Setting the stage for a transformative day where ancient wisdom officially meets modern strategy.",
  },
  {
    time: "9:15 AM – 9:45 AM",
    tag: "Keynote Address",
    title: "Timeless Wisdom for Modern Flourishing",
    kind: "feature",
    desc: '"Wellbeing as Strategy: The Convergence of Longevity, Sacred Spaces, and Human Success." Challenging the notion of wellness as an "escape" and framing it as a fundamental driver of corporate productivity, luxury living, and global lifestyle aspirations.',
    speaker: "A global wellness officer, major corporation",
  },
  {
    time: "9:45 AM – 10:25 AM",
    tag: "Panel Discussion",
    title: "From Burnout to Resilience: Redefining Workplace Wellbeing & Corporate HR Strategy",
    kind: "main",
    desc: "Focus (HR Lens): Transitioning from superficial perks to structural workplace wellness.",
    points: [
      "Treating employee burnout as a critical organizational risk",
      "Designing roles, workflows, and hybrid-work policies that promote physiological and psychological safety",
      "Building organizational resilience through HR capacity planning, mindful leadership, and emotional intelligence metrics",
    ],
  },
  {
    time: "10:25 AM – 10:55 AM",
    tag: "Prana Boost",
    title: "Morning Rejuvenation Break",
    kind: "break",
    desc: "Breathwork, body resets, and an organic herbal tea and brew bar.",
  },
  {
    time: "11:15 AM – 11:55 AM",
    tag: "Panel Discussion",
    title: "Sacred Architecture & Spatial Tech: Redefining Real Estate Wellness",
    kind: "main",
    desc: "Focus (Real Estate Lens): How wellness is transforming luxury living and shaping investment in the homes of high-net-worth individuals.",
    points: [
      "Integrating ancient spatial sciences — Vaastu and Feng Shui — with smart-home and environmental technologies",
      "Designing residences, master-planned wellness communities, and offices for circadian alignment, air quality, and emotional clarity",
      'Creating "sacred spaces" within high-pressure urban environments to ease digital overload',
    ],
  },
  {
    time: "12:00 PM – 12:15 PM",
    tag: "Mystic Moments",
    title: "Micro-Rituals for Daily Presence",
    kind: "break",
    desc: "A rapid somatic de-stressing session to build immediate emotional resilience and mental clarity.",
  },
  {
    time: "12:15 PM – 1:15 PM",
    tag: "Lunch Break",
    title: "Networking & Lunch Break",
    kind: "break",
    desc: "Networking, connection, and lunch.",
  },
  {
    time: "1:15 PM – 1:55 PM",
    tag: "Panel Discussion",
    title: "The Longevity Frontier: Bridging Ancient Retreat Wisdom with Preventative Science",
    kind: "main",
    desc: "Focus (Retreats & Longevity Lens): The evolution of wellness tourism from temporary getaways to hyper-personalised, scientific lifespans.",
    points: [
      "How premium wellness retreats are incorporating cellular science, bio-hacking, and neuro-resilience into their programming",
      "Combining ancient healing systems — Ayurveda, pranic healing, herbalism — with modern preventative medicine to delay biological ageing",
      "The business of longevity: high-end wellness travel that drives lasting lifestyle transformation",
    ],
  },
  {
    time: "1:55 PM – 2:25 PM",
    tag: "Interactive Mystic Session",
    title: "Chakra Balancing & Bio-Harmonizing",
    kind: "main",
    desc: "A hands-on immersive experience bridging traditional energy healing, sound therapy, and neuro-wellness technology.",
  },
  {
    time: "2:25 PM – 3:05 PM",
    tag: "Cross-Pillar Synthesis Panel",
    title: "The Multidimensional Life: How HR, Real Estate, and Retreats Shape the Future of Living",
    kind: "main",
    desc: "A collaborative discussion featuring real estate developers, HR executives, and longevity retreat curators.",
    points: [
      "How corporate packages are expanding to offer executive-level longevity retreats as retention benefits",
      "Designing residential environments that sustain the physical benefits gained from wellness retreats",
      "Actionable tools for high-performing leaders to integrate wellness habits into demanding lifestyles",
    ],
  },
  {
    time: "3:05 PM – 3:35 PM",
    tag: "Tea & Coffee",
    title: "Afternoon Energy Break",
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
  },
  {
    time: "4:15 PM – 4:30 PM",
    tag: "Solo Session",
    title: "Holistic Wellness through Ancient Wisdom",
    kind: "main",
    desc: "An expert-led session.",
  },
  {
    time: "4:30 PM – 5:00 PM",
    tag: "Awards",
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
    time: "5:00 PM – 5:15 PM",
    tag: "Closing",
    title: "Closing Ceremony & Vote of Thanks",
    kind: "break",
    desc: "Reflections on wrapping up for the day.",
  },
] as const;

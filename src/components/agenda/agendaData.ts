/* ══════════════════════════════════════════════════════════════
   Agenda data — MysticVerse Global Conference 2026
   Two days, Dubai. Canonical dates: 10 & 11 September 2026.

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
}

export interface AgendaDay {
  n: string;
  date: string;
  theme: string;
  sessions: readonly Session[];
}

export const DAYS: readonly AgendaDay[] = [
  {
    n: "Day 1",
    date: "10 September 2026",
    theme: "Ancient Wisdom & Holistic Wellness",
    sessions: [
      {
        time: "08:00 AM – 09:00 AM",
        tag: "Opening",
        title: "Registration & Aura Cleansing Ceremony",
        kind: "break",
        desc: "An immersive opening with energy rituals, grounding music, and intention-setting practices led by spiritual elders and sound therapists.",
      },
      {
        time: "09:00 AM – 09:40 AM",
        tag: "Keynote",
        title: "Timeless Wisdom for Modern Flourishing",
        kind: "feature",
        desc: "Explore how ancient traditions like Vedic philosophy and Taoist teachings offer practical tools for emotional, mental, and spiritual harmony.",
        points: [
          "Daily life applications of ancient spiritual principles",
          "Redefining well-being through timeless wisdom",
          "Scientific validation of spiritual disciplines",
          "Cultivating inner clarity and outer balance",
        ],
      },
      {
        time: "09:40 AM – 10:30 AM",
        tag: "Panel",
        title: "Navigating Life's Path – Astrology & Numerology Today",
        kind: "main",
        desc: "Learn how astrological charts and numerological codes continue to inform personal alignment, timing, and life decisions.",
        points: [
          "Birth chart analysis and life-path indicators",
          "Using planetary periods to make confident decisions",
          "Numerology in relationships, careers, and health",
          "Case studies on practical transformations",
        ],
      },
      {
        time: "10:30 AM – 10:55 AM",
        tag: "Break",
        title: "Prana Boost: Morning Tea, Breathwork & Body Reset",
        kind: "break",
        desc: "A revitalizing break combining conscious breathing techniques with energizing herbal teas.",
      },
      {
        time: "10:55 AM – 11:25 AM",
        tag: "Mystic Session",
        title: "Transforming the Mind – Spiritual Psychology in Action",
        kind: "main",
        desc: "A hands-on experience blending modern psychological tools with spiritual insight for emotional regulation and mindset healing.",
        points: [
          "NLP and somatic techniques for belief reprogramming",
          "Guided breathwork and inner-child visualization",
          "Identifying emotional triggers and redirecting patterns",
          "Gentle trauma release via body awareness",
        ],
      },
      {
        time: "11:25 AM – 12:10 PM",
        tag: "Panel",
        title: "Vastu Shastra – Designing Sacred and Balanced Spaces",
        kind: "main",
        desc: "Explore the Vedic science of architecture and energy alignment to enhance health, relationships, and productivity.",
        points: [
          "Core Vastu principles for homes, offices, and healing spaces",
          "Common errors and how to correct them",
          "Using direction and placement to elevate energy flow",
          "Modern integrations with architecture and real estate",
        ],
      },
      {
        time: "12:10 PM – 12:20 PM",
        tag: "Pause",
        title: "Mystic Moments: Mindfulness in Minutes",
        kind: "break",
        desc: "A brief guided practice with breath and silence to center attendees before lunch.",
      },
      {
        time: "12:20 PM – 01:20 PM",
        tag: "Lunch",
        title: "Ayurvedic Nourishment – Conscious Lunch Experience",
        kind: "break",
        desc: "Mindful dining with traditional Ayurvedic principles and seasonal ingredients.",
      },
      {
        time: "01:20 PM – 02:10 PM",
        tag: "Panel",
        title: "Healing Energies – Reiki, Pranic Healing & Beyond",
        kind: "main",
        desc: "Understand how energy healing methods are transforming lives and integrating with mainstream wellness.",
        points: [
          "Overview of life-force energy and chakra healing",
          "Demonstrations of hand techniques and distance healing",
          "Ethics and lineage in healing practices",
          "Healing trauma, illness, and emotional fatigue",
        ],
      },
      {
        time: "02:10 PM – 02:55 PM",
        tag: "Panel",
        title: "Yoga & the Mind-Body Connection",
        kind: "main",
        desc: "Discover how yoga extends beyond movement into mental, emotional, and cellular healing.",
        points: [
          "Yoga therapy for anxiety, stress, and burnout",
          "Role of pranayama and mudras in mental clarity",
          "Integrating yoga into clinical or coaching practices",
          "Exploring the five koshas and inner alignment",
        ],
      },
      {
        time: "02:55 PM – 03:25 PM",
        tag: "Break",
        title: "Chai & Chakra – Afternoon Energy Break",
        kind: "break",
        desc: "Rejuvenating tea ceremony with energy work and gentle movement.",
      },
      {
        time: "03:25 PM – 03:55 PM",
        tag: "Mystic Session",
        title: "Guided Visualization & Group Meditation",
        kind: "main",
        desc: "A shared meditative journey to activate intuition and dissolve inner resistance.",
        points: [
          "Chakra-aligned visual journey",
          "Mantra and frequency immersion",
          "Group intention setting for healing",
          "Emotional cleansing through imagery",
        ],
      },
      {
        time: "03:55 PM – 04:40 PM",
        tag: "Panel",
        title: "Ancient Practices, Modern Lives",
        kind: "main",
        desc: "A discussion on daily rituals, practices, and routines rooted in tradition and adapted for modern well-being.",
        points: [
          "Full-moon and seasonal rituals",
          "Creating sacred space in modern homes",
          "Technology boundaries and energetic hygiene",
          "How to build mindful habits without complexity",
        ],
      },
      {
        time: "04:40 PM – 05:00 PM",
        tag: "Closing",
        title: "Day 1 Closing Reflections",
        kind: "break",
        desc: "Integration and gratitude circle to close the first day's journey.",
      },
    ],
  },
  {
    n: "Day 2",
    date: "11 September 2026",
    theme: "Spiritual Science & Modern Well-being",
    sessions: [
      {
        time: "08:00 AM – 09:00 AM",
        tag: "Welcome",
        title: "Check-in & Conscious Conversations",
        kind: "break",
        desc: "Connect with attendees through curated small circles over herbal tea, journaling prompts, and light breathwork.",
      },
      {
        time: "09:00 AM – 09:40 AM",
        tag: "Keynote",
        title: "Integrating Ancient Practices in Modern Mental Health",
        kind: "feature",
        desc: "Explore how spiritual disciplines like meditation, mantra, and ritual are reshaping the mental health landscape.",
        points: [
          "The rise of spiritual psychology",
          "Mindfulness-based stress reduction in clinical settings",
          "Energetic self-care for therapists and coaches",
          "Bridging therapy and transformation",
        ],
      },
      {
        time: "09:40 AM – 10:30 AM",
        tag: "Panel",
        title: "Mindfulness in Clinical Psychology",
        kind: "main",
        desc: "Professionals discuss where therapy meets tradition for a new generation of healing.",
        points: [
          "Trauma-sensitive mindfulness",
          "Meditation as a clinical intervention",
          "Emotional regulation through somatic practices",
          "The intersection of science and spirituality",
        ],
      },
      {
        time: "10:30 AM – 10:55 AM",
        tag: "Break",
        title: "Morning Reset: Mindfulness & Herbal Brew",
        kind: "break",
        desc: "Centering practice with medicinal herbs and breath awareness.",
      },
      {
        time: "10:55 AM – 11:25 AM",
        tag: "Case Study",
        title: "Holistic Wellness Success Stories",
        kind: "main",
        desc: "Real-world results from schools, corporates, and hospitals integrating spiritual wellness.",
        points: [
          "Meditation in education",
          "Energy work in post-surgical recovery",
          "Employee well-being frameworks",
          "Measurable benefits of alternative wellness",
        ],
      },
      {
        time: "11:25 AM – 12:10 PM",
        tag: "Panel",
        title: "Traditional Healing Meets Modern Medicine",
        kind: "main",
        desc: "Ayurveda, naturopathy, and energy science in partnership with conventional healthcare.",
        points: [
          "Herbal protocols for chronic illness",
          "Eastern tools in palliative care",
          "Collaborating with hospitals and clinicians",
          "Regulation, safety, and global case studies",
        ],
      },
      {
        time: "12:10 PM – 12:20 PM",
        tag: "Pause",
        title: "Mystic Moments: Emotional Clarity in Ten Minutes",
        kind: "break",
        desc: "Quick centering practice for emotional balance and mental clarity.",
      },
      {
        time: "12:20 PM – 01:20 PM",
        tag: "Lunch",
        title: "Global Wellness Cuisine – Lunch Break",
        kind: "break",
        desc: "International plant-based cuisine celebrating diverse healing traditions.",
      },
      {
        time: "01:20 PM – 02:10 PM",
        tag: "Panel",
        title: "Future of Wellness Retreats – Strategy, Guest Experience & Business Growth",
        kind: "main",
        desc: "A deep-dive panel exploring retreat design, guest experience models, and sustainable business strategies for high-impact wellness retreats.",
        points: [
          "Designing immersive retreat journeys",
          "Guest experience and hospitality best practices",
          "Monetization & sustainable growth models",
          "Case studies from successful retreat operators",
        ],
      },
      {
        time: "02:10 PM – 02:55 PM",
        tag: "Panel",
        title: "Mentally Healthy Workplaces",
        kind: "main",
        desc: "A look at conscious leadership, stress management, and energy wellness at work.",
        points: [
          "Workplace rituals for emotional clarity",
          "Meditation for leaders and teams",
          "Setting boundaries with energetic intention",
          "Building value-aligned team culture",
        ],
      },
      {
        time: "02:55 PM – 03:25 PM",
        tag: "Break",
        title: "Yoga Stretch & Herbal Tea Break",
        kind: "break",
        desc: "Gentle movement and relaxation with healing teas.",
      },
      {
        time: "03:25 PM – 03:50 PM",
        tag: "Panel",
        title: "Emerging Trends in Holistic Wellness",
        kind: "main",
        desc: "What's next in healing, spirituality, and wellness innovation.",
        points: [
          "Wearables and AI in emotional intelligence",
          "Virtual retreats and immersive experiences",
          "Psychedelic therapy and consciousness tech",
          "Wellness tourism and eco-healing spaces",
        ],
      },
      {
        time: "03:50 PM – 05:20 PM",
        tag: "Awards",
        title: "MysticVerse Global Excellence Awards 2026",
        kind: "feature",
        desc: "Celebrating exceptional healers, thought leaders, and transformative businesses.",
        points: [
          "Spiritual Entrepreneur of the Year",
          "Global Mystic Leader Award",
          "Conscious Innovation in Wellness Tech",
          "Lifetime Contribution to Holistic Healing",
        ],
      },
      {
        time: "05:20 PM – 05:45 PM",
        tag: "Closing",
        title: "Closing Ceremony & Collective Intentions",
        kind: "break",
        desc: "A heart-centered closing with blessings, gratitude circle, and shared affirmations to carry forward.",
      },
    ],
  },
] as const;

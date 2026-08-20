/*
  Advisory Board — MysticVerse Global 2026.

  Photos: Balambika, Vani Kabir, and Peenesh Sanghvi reuse their existing
  conference-speaker portraits (public/images/speakers/), since they are
  also speaking. Savita Malik and Raghvendra Verma have dedicated advisory
  portraits (public/images/advisory/) supplied separately. Where no photo
  or bio is available, `image`/`bio` are left undefined and the profile
  falls back to an initials avatar — no placeholder/stock photos, no
  fabricated biographical claims.
*/

const SPEAKER_IMG = "/images/speakers";
const ADVISORY_IMG = "/images/advisory";

export interface Advisor {
  slug: string;
  name: string;
  role: string;
  image?: string;
  /** CSS object-position for the portrait crop. Defaults to centered. */
  imagePosition?: string;
  /** Bio paragraphs, rendered in order. Omit entirely if no bio is available yet. */
  bio?: readonly string[];
  contacts?: { email?: string; phone?: string };
}

export const ADVISORS: readonly Advisor[] = [
  {
    slug: "vani-kabir",
    name: "Master Vani Kabir",
    role: "Global Healing & Manifestation Master · Founder of Evrenroo™",
    image: `${SPEAKER_IMG}/vani-kabir.avif`,
    bio: [
      "Master Vani Kabir is a globally celebrated Healing and Manifestation Master, and the visionary Founder of Evrenroo™ — a sacred system of remembrance that unites ancient wisdom, ancestral healing, and quantum manifestation.",
      "With over 50,000+ readings and 12,000+ deep healings conducted across the world, her work has transformed lives in India, Dubai, and the Netherlands, where she continues to guide individuals, leaders, and corporations toward energetic clarity and emotional mastery.",
      "Known as a Karmic and Ancestral Healer, Master Vani helps clients decode repeating patterns, release generational blockages, and activate their higher purpose.",
      "Her teachings bridge science, spirituality, and light coding, making her one of the most sought-after spiritual mentors of the modern era. Recipient of multiple awards and global recognition, Master Vani Kabir's mission is to awaken the world to its divine remembrance — one soul at a time.",
    ],
  },
  {
    slug: "raghvendra-verma",
    name: "Raghvendra Verma",
    role: "Executive Legal Advisor | Partner, AMADI | Chairman, ICSI Middle East DIFC NPIO Dubai",
    image: `${ADVISORY_IMG}/raghvendra-verma.png`,
    imagePosition: "78% center",
    bio: [
      "A distinguished legal executive and corporate strategist with over 25 years of unparalleled expertise across the Middle East, Africa, and Asia-Pacific. Based in Dubai, he serves as a Board Member and Chairman of the ICSI Middle East DIFC NPIO Dubai, and is a GRC, M&A, and privacy expert and author. He has a proven track record steering global legal operations, executing complex cross-border M&A, and establishing robust corporate governance frameworks, working closely with corporate boards and promoters to drive compliant, high-stakes global expansion.",
      "He currently serves as Partner at AMADI, a leading legal and corporate advisory firm in the UAE and Africa. His achievements include directing seamless acquisitions across jurisdictions including Egypt, South Africa, Dubai, Cyprus, Mauritius, Kenya, Nigeria, Tanzania, and Mozambique, and delivering legal and strategic oversight across the IT/ITES, BPO, healthcare, telecommunications infrastructure, mining, and customer services sectors. His competencies span board and shareholder relations, corporate restructuring, cross-border acquisitions, licensing, joint ventures, due diligence, corporate governance, risk management, cybersecurity, privacy and data protection, commercial contracting, litigation, and employment law.",
      "He is a member of the Chartered Institute for Securities & Investment (CISI) and a Certified CIPP/E of the IAPP, a law graduate and distinguished member of the ICSI, and Editor of Corporate Governance Magazine. His accolades include the Champion of Governance Award (Kenya), recognition among the 50 Best Legal Falcons, Best In-House Legal Team (Middle East), and the 50 Best Corporate Governance Professional and Global Achiever Awards. He is also a mental well-being advocate, organising stress-elimination courses under the Art of Living initiative across India, the UAE, and Africa, and leads community service and food distribution initiatives for underprivileged communities in Kenya and Nigeria.",
    ],
  },
  {
    slug: "balambika",
    name: "Dr. K. S. Balambika",
    role: "Principal, B.S.S. B.Ed Training College, Kerala",
    image: `${SPEAKER_IMG}/balambika.avif`,
    bio: [
      "Dr. K. S. Balambika is the Principal of B.S.S. B.Ed Training College, Kerala, and a respected voice in teacher education with over two decades of experience. She holds advanced degrees including MA, MBA, MSW, and PhD, reflecting her lifelong commitment to learning and leadership.",
      "Author of “Educational Philosophy of the Bhagavad Gita”, Dr. Balambika is known for bridging timeless wisdom with modern education. Her work earned her the title of Best Principal of the Year 2023, recognizing her dedication to shaping future educators.",
      "As an international speaker, she has presented in Singapore, Switzerland, Spain, and Italy, sharing insights that inspire both educators and communities. She is also widely recognized as a motivational speaker, happiness counsellor, and devotional singer, bringing a rare blend of knowledge, inspiration, and spirituality to her audiences.",
      "With her holistic approach, Dr. Balambika continues to guide people towards growth, resilience, and meaningful learning.",
    ],
  },
  {
    slug: "peenesh-sanghvi",
    name: "Peenesh Sanghvi",
    role: "Inspirational & Motivational Speaker · Meditator · Spiritual Practitioner",
    image: `${SPEAKER_IMG}/peenesh-sanghvi.avif`,
    bio: [
      "Peenesh is a management consultant specializing in strategy and finance, with a deep passion for meditation. He is a world record holder as the 1st and only Indian to drive from Dubai to India by road.",
      "In his recent podcasts on YouTube, “The Unstoppable Himalayan Guy” and “Road-trip from Dubai to India”, he shares how taking a Leap of Faith helped him navigate life-threatening situations — whether deep in the forests of the Himalayas or in the rugged terrain of Baluchistan.",
      "His spiritual journey began after an encounter with a mysterious monk in the Aravali mountains, who taught him how to control his heartbeat, due to which he trekked the Kanchenjunga Mountain — the world's 3rd highest — despite a family history of heart conditions and asthma.",
      "Recounting his meeting with a man who never existed, he feels he didn't choose spirituality — Spirituality Chose Him. He has transformed Pain into Power and Failure into Resilience, and holds sacred space for inner healing, because unhealed emotional wounds transcend lifetimes, resurfacing again until completely healed.",
    ],
    contacts: { email: "peenesh@yahoo.com", phone: "+971 50 3898 544" },
  },
  {
    slug: "savita-malik",
    name: "Savita Malik",
    role: "Co-founder, Manoyaa | Certified Craniosacral & Fascial Release Practitioner | Breathwork Facilitator | Nervous System Regulation Practitioner | Astrowellness Guide",
    image: `${ADVISORY_IMG}/savita-malik.png`,
    bio: [
      "Savita Malik is the Co-founder of Manoyaa, a holistic wellness platform focused on helping individuals cultivate greater balance, resilience, and self-awareness through integrative wellness practices.",
      "A certified Craniosacral Therapy (CST) and Fascial Release Practitioner, Savita has conducted 700+ wellness sessions and brings over three years of hands-on experience supporting individuals through stress, emotional overwhelm, life transitions, and the need for deeper relaxation and reconnection with the body.",
      "Her approach integrates CST, Fascial Release, Breathwork, and nervous system regulation, creating a gentle and personalised space for individuals to slow down, become more aware of their body's signals, and develop practical tools for everyday well-being.",
      "Savita has also facilitated wellness sessions and corporate workshops in India and the UAE, working with both individuals and professional communities.",
      "With a long-standing interest in personal insight and holistic self-awareness, she brings together traditional wisdom and contemporary wellness perspectives in an accessible and grounded way.",
      "Through Manoyaa, Savita's mission is to make wellness practical and meaningful—helping people move from simply managing stress to developing greater awareness, resilience, and connection with themselves.",
    ],
  },
] as const;

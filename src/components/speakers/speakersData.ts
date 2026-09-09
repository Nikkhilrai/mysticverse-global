/* ══════════════════════════════════════════════════════════════
   Speakers — MysticVerse Global Conference 2026
   Each speaker: portrait, name, role, bio paragraphs, and optional
   publications / contacts / links.
   ══════════════════════════════════════════════════════════════ */

export interface SpeakerLink {
  label: string;
  href: string;
}

export interface Speaker {
  slug: string;
  name: string;
  title: string;
  image: string;
  bio: readonly string[];
  publications?: readonly string[];
  contacts?: { email?: string; phone?: string };
  links?: readonly SpeakerLink[];
}

const IMG = "/images/speakers";

export const SPEAKERS: readonly Speaker[] = [
  {
    slug: "elie-abirached",
    name: "Dr. Elie Abirached",
    title: "Biohacking & Recovery Strategist & CEO, Restore Fitness & Limitless Human",
    image: `${IMG}/elie-abirached.jpeg`,
    bio: [
      `Dr. Elie Abirached is a Biohacking & Recovery Strategist and CEO of Restore Fitness & Limitless Human, working at the intersection of performance science and recovery to help people optimize how their bodies function, heal, and adapt.`,
      `Through Restore Fitness & Limitless Human, he brings a systems-based approach to biohacking — combining recovery protocols, physical performance strategy, and modern wellness technology to help clients build resilience and extend their physical and mental capacity.`,
    ],
  },
  {
    slug: "zita-desmet",
    name: "Zita Desmet",
    title: "Founder, OUNA Cosmetics · Business & Growth Coach",
    image: `${IMG}/zita-desmet.avif`,
    bio: [
      `Zita builds businesses that heal, inside and out.`,
      `She runs OUNA Cosmetics, a distribution channel that supports professionals in the Middle East with skin-longevity–focused solutions, while guiding clinic owners and practitioners to choose brands that align with their mission on a deeper level.`,
      `Her transformation began in the darkest chapter of severe anxiety and depression, where she released her old self and rebuilt through devotion, discipline, and nature's laws. That same path led her to entrepreneurship, online coaching, and becoming a professional freestyle snowboarder.`,
      `Today, she helps professionals grow clinics and practices, elevate outcomes, and reconnect with themselves through skin-longevity solutions and brands that truly work. She firmly believes that business and spirituality go hand in hand.`,
    ],
    links: [
      { label: "OUNA Cosmetics", href: "https://www.ounacosmetics.com" },
      { label: "Renophase", href: "https://www.renophase.ae" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/zitatalksgrowth/" },
    ],
  },
  {
    slug: "igor-sivov",
    name: "Igor Sivov",
    title: "International Speaker · Podcast Host · Business Coach · Founder, PPO Awakening · Master of Psychoanalysis · Author",
    image: `${IMG}/igor-sivov.jpg`,
    bio: [
      `Igor Sivov is an International Speaker, Podcast Host, and Business Coach whose mission is to help people become the most empowered version of themselves — in life, in business, and in mind.`,
      `He works at the intersection of psychology, mindset, and practical transformation — speaking on international stages, guiding parents toward a more conscious relationship with their children, and leading breathwork sessions that unlock deep inner states, all designed to help people access what is already within them.`,
      `He is the author of "Non-Harmers", a bestselling guide to happy, conscious parenting that has reached thousands of families worldwide, and the creator of the Masterful Manifestation workshop, built on the principle that what remains unseen within yourself cannot yet be reflected back to you by the world. He is also the founder of PPO Awakening, a community for people committed to deep personal growth and collective awakening.`,
      `A Certified Breathwork Trainer and Master of Resource State, Igor is trained in using the power of breath and in creating and anchoring peak mental and emotional states on demand. His coaching is grounded in a rigorous psychological foundation, holding a Master's Degree in Psychoanalysis.`,
      `He works with individuals, parents, entrepreneurs, and leaders who feel there is more to unlock, and who are ready to do the inner work required to get there.`,
    ],
  },
  {
    slug: "balambika",
    name: "Dr. K. S. Balambika",
    title: "Principal, B.S.S. B.Ed Training College, Kerala",
    image: `${IMG}/balambika.avif`,
    bio: [
      `Dr. K. S. Balambika is the Principal of B.S.S. B.Ed Training College, Kerala, and a respected voice in teacher education with over two decades of experience. She holds advanced degrees including MA, MBA, MSW, and PhD, reflecting her lifelong commitment to learning and leadership.`,
      `Author of "Educational Philosophy of the Bhagavad Gita", Dr. Balambika is known for bridging timeless wisdom with modern education. Her work earned her the title of Best Principal of the Year 2023, recognizing her dedication to shaping future educators.`,
      `As an international speaker, she has presented in Singapore, Switzerland, Spain, and Italy, sharing insights that inspire both educators and communities. She is also widely recognized as a motivational speaker, happiness counsellor, and devotional singer, bringing a rare blend of knowledge, inspiration, and spirituality to her audiences.`,
      `With her holistic approach, Dr. Balambika continues to guide people towards growth, resilience, and meaningful learning.`,
    ],
  },
  {
    slug: "peenesh-sanghvi",
    name: "Peenesh Sanghvi",
    title: "Inspirational & Motivational Speaker · Meditator · Spiritual Practitioner",
    image: `${IMG}/peenesh-sanghvi.avif`,
    bio: [
      `Peenesh is a management consultant specializing in strategy and finance, with a deep passion for meditation. He is a world record holder as the 1st and only Indian to drive from Dubai to India by road.`,
      `In his recent podcasts on YouTube, "The Unstoppable Himalayan Guy" and "Road-trip from Dubai to India", he shares how taking a Leap of Faith helped him navigate life-threatening situations — whether deep in the forests of the Himalayas or in the rugged terrain of Baluchistan.`,
      `His spiritual journey began after an encounter with a mysterious monk in the Aravali mountains, who taught him how to control his heartbeat, due to which he trekked the Kanchenjunga Mountain — the world's 3rd highest — despite a family history of heart conditions and asthma.`,
      `Recounting his meeting with a man who never existed, he feels he didn't choose spirituality — Spirituality Chose Him. He has transformed Pain into Power and Failure into Resilience, and holds sacred space for inner healing, because unhealed emotional wounds transcend lifetimes, resurfacing again until completely healed.`,
    ],
    contacts: { email: "peenesh@yahoo.com", phone: "+971 50 3898 544" },
  },
  {
    slug: "shridhar-sampath",
    name: "Shridhar Sampath",
    title: "Executive Coach · Corporate Educator · Motivational Speaker",
    image: `${IMG}/shridhar-sampath.avif`,
    bio: [
      `Shridhar Sampath is a Coach to C-Suite executives managing over $300 Billion in market capitalization. He educates senior executives on Business Acumen, Leadership, Strategy and Finance.`,
      `As a Motivational Speaker, he motivates senior executives on related topics and inspires them to seize the mantle and build a future worth emulating.`,
    ],
  },
  {
    slug: "elias-hanna",
    name: "Elias Hanna",
    title: "Certified Practitioner in Unified Integrative Medicine",
    image: `${IMG}/elias-hanna.avif`,
    bio: [
      `Elias Hanna is a certified practitioner of Unified Integrative Medicine, trained in the groundbreaking methods developed by Dr. Nader Butto. Specializing in holistic healing, Elias integrates techniques such as the Energy Washout, Trans Temporal Regression Technique (TTRT), and Fast Elaborative Emotional Liberation (FEEL) to help patients restore balance between their body, soul, and spirit.`,
      `In addition to these healing modalities, Elias offers an in-depth analysis of the human code, providing insights into a patient's character and mood. He also tailors nutrition and exercise recommendations based on this analysis to enhance vital energy and overall well-being. His compassionate and personalized approach guides patients on a transformative journey toward healing, balance, and vitality.`,
    ],
  },
  {
    slug: "rajani-shridhar",
    name: "Rajani Shridhar",
    title: "Musician & Music Therapist · Speaker · Educator · Composer · HICAT Practitioner",
    image: `${IMG}/rajani-shridhar.avif`,
    bio: [
      `Rajani Shridhar, Co-founder of Motivaluate, is a Certified facilitator of The Leadership Challenge, Gold Medalist Event Management Diploma holder and Cambridge Certified English Language Teacher to Adults.`,
      `She actively engages in youth and women's leadership initiatives. She frequently speaks about the intersections of music, life, and leadership, and has coached women and young mothers in effective communication and self-expression.`,
    ],
  },
  {
    slug: "suha-hamad",
    name: "Suha Hamad",
    title: "Wellness Coach · Founder of Reikilates",
    image: `${IMG}/suha-hamad.avif`,
    bio: [
      `Suha is an Internationally Accredited Holistic Therapist & Trainer focused on Empowering Mind, Body & Soul. She is a reputable Reiki Therapist, Pilates Instructor & Personal Trainer.`,
      `She became known for her energy reading gift, making therapy sessions powerful and unique to client's specific needs; her sessions start with energy reading, chakra balancing and recharging, incorporating movement & deep breathing. Clients feel energized, more relaxed with improved focus & elevated mood.`,
      `Suha was working 2 jobs, and hardly had enough "me" time, that's when she developed a compact workout session that involved Pilates movement with energy healing, naming it "Reikilates"; it transformed her life and her body, and she is now eager to share it with the rest of the world through social media, group and individual classes.`,
      `To simplify the practice and help busy people achieve their goals faster, Suha created Reikilates Intuitive Pilates deck, a short personalized workout that can balance mind, body & soul at once.`,
      `She expanded her empire to launch Reikilates Wellness Training, where she offers her globally accredited course Heal Yourself Simplified, teaching individuals to read energy and balance their energy through The Tool Kit to empower their mind, body & soul.`,
      `Suha is keen on expanding her practice to a global reach; believing that we can all heal within by harmonizing the power of our mind, body & soul connectivity.`,
    ],
  },
  {
    slug: "dalida-jaafar",
    name: "Dalida Jaafar",
    title: "Organizational Psychologist · Leadership Development Trainer · Executive Coach",
    image: `${IMG}/dalida-jaafar.avif`,
    bio: [
      `An Organizational Psychologist and Leadership Coach specializing in leadership development, workplace culture, and high-performance coaching. With a background in organizational psychology, behavioral science, and evidence-based coaching, she works with leaders, teams, and entrepreneurs to strengthen communication, decision-making, confidence, and execution.`,
      `Experienced in delivering leadership training and consulting across the U.S. and UAE, she designs practical, results-driven programs that integrate assessments, coaching, and real-world application. Her work combines leadership psychology, change management, and performance habits, with a strong focus on sustainable growth, team effectiveness, and leader well-being.`,
    ],
  },
  {
    slug: "neelam-harjani",
    name: "Neelam Harjani",
    title: "Corporate Wellness Expert · Founder, Inspire Wellness Dubai",
    image: `${IMG}/neelam-harjani.avif`,
    bio: [
      `Neelam Harjani is recognized as a pioneer of corporate wellness throughout Asia and the Middle East. Harvard Medical School educated in wellness coaching, she provides an antidote for busy lifestyles through personalized programs of lifestyle medicine.`,
      `Recognized as a Top Corporate Wellness Partner at Employee Wellbeing Summit 2025 Dubai, Global Women of Influence 2024 by Global Publishing House, titled Leading Corporate Wellness Ambassador in 2021 by Liv Media, and by the Hong Kong SAR Government who awarded her representation on the Diversity List 2020 to counsel government statutory and advisory bodies in wellness, female empowerment, and multicultural inclusion.`,
      `Her vision to bring out the best in people's work and life is anchored in science and pragmatic techniques to enhance mood, resilience, and efficacy. Her 20 years of experience in holistic healing coupled with her degree in Management from the London School of Economics power a proprietary system, aimed at releasing chronic stress, that has been well received by busy executives and high-performing corporations in finance, legal and insurance industries.`,
      `Previously an investment banker, she connects with her audiences from a place of authenticity, sharing her own stories of breakdown. Her personal healing journey makes her a recognized speaker in high-stress environments, as she demonstrates clear takeaways to manage mental health reinforced by the latest research — taking a preventative approach from the dangers of our frenetic modern-day lifestyles.`,
      `As a mother of 2 children, she also works with international schools offering parents and youth programs to actualize meaningful connections, healthy boundaries with screentime, and freedom from judgement and perfectionism. Her journey and mindfulness techniques have been published in Tatler, Vogue, SCMP and Asian Entrepreneur.`,
    ],
    contacts: { email: "neelam@inspire-wellness.com" },
    links: [
      { label: "Website", href: "https://www.inspire-wellness.com" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/neelam-harjani/" },
    ],
  },
  {
    slug: "savita-malik",
    name: "Savita Malik",
    title: "Co-founder, Manoyaa · Certified Craniosacral & Fascial Release Practitioner · Breathwork Facilitator · Nervous System Regulation Practitioner · Astrowellness Guide",
    image: `${IMG}/savita-malik.png`,
    bio: [
      `Savita Malik is the Co-founder of Manoyaa, a holistic wellness platform focused on helping individuals cultivate greater balance, resilience, and self-awareness through integrative wellness practices.`,
      `A certified Craniosacral Therapy (CST) and Fascial Release Practitioner, Savita has conducted 700+ wellness sessions and brings over three years of hands-on experience supporting individuals through stress, emotional overwhelm, life transitions, and the need for deeper relaxation and reconnection with the body.`,
      `Her approach integrates CST, Fascial Release, Breathwork, and nervous system regulation, creating a gentle and personalised space for individuals to slow down, become more aware of their body's signals, and develop practical tools for everyday well-being.`,
      `Savita has also facilitated wellness sessions and corporate workshops in India and the UAE, working with both individuals and professional communities.`,
      `With a long-standing interest in personal insight and holistic self-awareness, she brings together traditional wisdom and contemporary wellness perspectives in an accessible and grounded way.`,
      `Through Manoyaa, Savita's mission is to make wellness practical and meaningful—helping people move from simply managing stress to developing greater awareness, resilience, and connection with themselves.`,
    ],
  },
  {
    slug: "yogacharya-subhendu",
    name: "Yogacharya Subhendu",
    title: "World-Renowned Yoga Master · Wellness Visionary · Fifth-Generation Yogi",
    image: `${IMG}/yogacharya-subhendu.avif`,
    bio: [
      `Some wisdom is inherited. Some is earned. Yogacharya Subhendu carries both.`,
      `Born into a fifth-generation lineage of traditional yogis, his path was rooted in the ancient before the modern world could interrupt it. Today, he stands as one of the most recognized yoga masters globally — having taught across 35 countries, built a thriving wellness community in Dubai, and forged over 50 corporate collaborations across the UAE.`,
      `A Life Member of the Indian Yoga Association, he seamlessly weaves Classical Yoga, Ayurveda, Vedic Meditation, and modern science — grounded in human anatomy, psychology, and behavioral research — into transformative lived experience. Executives, athletes, doctors, pilots, celebrities, and leaders across the world have learned from him, and risen differently.`,
      `Guided by Vasudhaiva Kutumbakam — the world is one family — Yogacharya Subhendu's mission is singular: to unite humanity through awareness, compassion, and the timeless science of yoga.`,
    ],
  },
  {
    slug: "saul-vargas",
    name: "Dr. Saúl Vargas",
    title: "Performance Doctor · Peptide & Longevity Advisor, NADclinic Group",
    image: `${IMG}/saul-vargas.jpg`,
    bio: [
      `Dr. Saúl Vargas is a Hematologist and Longevity & Performance Medicine specialist with over 15 years of clinical experience. His expertise spans clinical hematology, regenerative and cellular medicine, peptide therapy, advanced biomarker evaluation, and health optimization.`,
      `He currently works as a Performance Doctor and Peptide & Longevity Advisor at NADclinic Group in Dubai, combining clinical expertise with strategic healthcare development. He also holds a Master's degree in Artificial Intelligence in Healthcare and postgraduate training in Peptide Therapeutics, with a strong focus on integrating advanced medical technologies into personalized longevity and healthspan strategies.`,
    ],
  },
  {
    slug: "yash-moradiya",
    name: "Yash Moradiya",
    title: "Yoga Teacher & Inspirational Speaker · 10-Time Guinness World Record Holder",
    image: `${IMG}/yash-moradiya.jpeg`,
    bio: [
      `Yash Moradiya is an Indian yoga teacher, inspirational speaker, and 10-time Guinness World Record holder based in Dubai, UAE. Beginning his journey at age 7, Yash has dedicated his life to helping people unlock their true potential through yoga.`,
      `With a presence spanning global stages, international retreats, an online community of over a million yoga enthusiasts, viral content, and impactful public speaking, master classes, and workshops across the globe, he has transformed countless lives and continues to make yoga not just a practice, but a lifestyle movement.`,
    ],
  },
  {
    slug: "matteo-minero",
    name: "Matteo Minero",
    title: "Co-Founder & Co-CEO, Traininpink",
    image: `${IMG}/matteo-minero.jpeg`,
    bio: [
      `Matteo Minero is the Co-Founder and Co-CEO of Traininpink, the female fitness app built around Pilates Linfodrenante®, the world's first method combining Pilates with lymphatic drainage. Headquartered in Dubai with a team of 30, Traininpink is Italy's #1 female fitness app by revenue, with more than 300,000 women trained, around 45,000 paying subscribers and 10M USD in annual recurring revenue, fully bootstrapped and profitable.`,
      `A former M&A and capital markets lawyer, Matteo spent ten years at global leading law firms, such as DLA Piper, advising companies including Ferrari, Luxottica and Technogym, before leaving law to build Traininpink with his wife and co-founder, Carlotta Gagna, creator of the method. His perspective bridges two worlds: the science-backed connection between movement, recovery and the body, and the reality of sustaining performance in high-pressure roles — a transition he has lived first-hand, from billable hours to building one of Europe's fastest-growing wellness companies.`,
    ],
  },
  {
    slug: "lisa-moley",
    name: "Lisa Moley",
    title: "Transformational SOMA Breath® Coach, representing SOMA Breath",
    image: `${IMG}/lisa-moley.jpg`,
    bio: [
      `Lisa Moley is an Irish-born Transformational SOMA Breath® coach who has called Dubai home for the past 10 years.`,
      `After years in senior leadership, Lisa knows first-hand what it takes to operate in high-pressure, high-performance environments. From the outside, she looked successful, happy and driven. Behind the scenes, however, chronic stress was taking a serious toll on her body, eventually leading to insomnia and autoimmune conditions.`,
      `After struggling to find lasting solutions through conventional approaches, Lisa turned inward and discovered the transformative power of conscious breathing. Within one month, she experienced a profound shift in her health, sleep, energy and overall wellbeing.`,
      `That transformation with SOMA Breath became her mission: helping high-performing individuals learn how to regulate their nervous system, manage stress and perform at their best without sacrificing their health.`,
      `Today, Lisa works with corporates, business leaders and teams through SOMA Breath®, 1:1 coaching, group experiences and private events. She is also featured on the global SOMA Breath platform and hosts transformational experiences internationally.`,
    ],
    links: [
      { label: "Instagram · @breathewithlisadubai", href: "https://www.instagram.com/breathewithlisadubai" },
    ],
  },
] as const;

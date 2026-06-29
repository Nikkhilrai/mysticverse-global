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
    slug: "vani-kabir",
    name: "Master Vani Kabir",
    title: "Global Healing & Manifestation Master · Founder of Evrenroo™",
    image: `${IMG}/vani-kabir.avif`,
    bio: [
      `Master Vani Kabir is a globally celebrated Healing and Manifestation Master, and the visionary Founder of Evrenroo™ — a sacred system of remembrance that unites ancient wisdom, ancestral healing, and quantum manifestation.`,
      `With over 50,000+ readings and 12,000+ deep healings conducted across the world, her work has transformed lives in India, Dubai, and the Netherlands, where she continues to guide individuals, leaders, and corporations toward energetic clarity and emotional mastery.`,
      `Known as a Karmic and Ancestral Healer, Master Vani helps clients decode repeating patterns, release generational blockages, and activate their higher purpose.`,
      `Her teachings bridge science, spirituality, and light coding, making her one of the most sought-after spiritual mentors of the modern era. Recipient of multiple awards and global recognition, Master Vani Kabir's mission is to awaken the world to its divine remembrance — one soul at a time.`,
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
    slug: "yanal-salam",
    name: "Dr. Yanal Salam",
    title: "Consultant in Internal Medicine & Head of Department, Emirates Hospital – Jumeirah (Dubai)",
    image: `${IMG}/yanal-salam.avif`,
    bio: [
      `Dr. Yanal Salam is a distinguished Internal Medicine Consultant and the Head of the Department at Emirates Hospital – Jumeirah. With a strong commitment to integrative and patient-centred care, he advocates for a holistic approach that blends modern medicine with lifestyle, nutrition, and wellness principles.`,
      `Dr. Salam is also the President of the Royal College of Physicians (RCP) Updates in Medicine Conference – Middle East and the Pharmacy Academy Congress, leading regional initiatives that bridge conventional and holistic practices. His passion lies in promoting preventive medicine, metabolic health, and wellbeing through education, innovation, and multidisciplinary collaboration.`,
    ],
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
    slug: "lakshmi-ambady",
    name: "Lakshmi Ambady",
    title: "Graphic Designer · Digital Artist · Poet · Founder, Layasthana",
    image: `${IMG}/lakshmi-ambady.avif`,
    bio: [
      `A former Biomedical Engineer and Business Analyst at Accenture, Lakshmi transitioned into a full-time artist and designer, crafting a unique space where Indian aesthetics, spirituality, and contemporary art intersect.`,
      `Her work is deeply influenced by Indic philosophy, yoga, and intuitive artistic exploration, often beginning with random brushstrokes that evolve into evocative forms. A published poet and author of "Moon, Snakes, Love," Lakshmi extends her creative vision beyond personal expression, educating aspiring artists through workshops and online tutorials.`,
      `With a strong social media presence (100K+ followers on Instagram) and viral reach, Lakshmi's art resonates with audiences drawn to Indian heritage, sarees, jewelry, mythology, and mindfulness. Layasthana embodies this essence, offering artworks, prints, and immersive experiences that celebrate both tradition and spontaneity.`,
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
    slug: "rajesh-mohandas",
    name: "Rajesh Mohandas",
    title: "Vice President — Automation and Applied AI, Thomson Reuters",
    image: `${IMG}/rajesh-mohandas.avif`,
    bio: [
      `With 24+ years of global leadership, Rajesh specializes in architecting enterprise-wide transformations that fuse AI, automation, and strategic execution. His journey spans Fortune 500s and high-growth disruptors, where he has consistently delivered exponential revenue growth, operational excellence, and customer-centric innovation.`,
      `As Vice President of AI & Automation, he has built global Centres of Excellence, designed GRC-aligned delivery frameworks, and led multi-million-dollar global scale-ups. From mobilizing pipelines to growing revenues, he has driven outcomes others deemed unachievable.`,
      `His expertise spans CRM consulting, shared services strategy, M&A integration, and GenAI deployment — transforming fragmented operations into high-velocity growth engines. He has owned $60M+ P&Ls, advised CXOs, and helped position India as a strategic growth hub on the world stage.`,
      `Armed with an Engineering degree, Law credentials, and a Six Sigma Black Belt, he brings a rare blend of technical depth, legal acumen, and operational rigor. Whether in boardrooms, war rooms, or transformation trenches, he leads with clarity, empathy, and a "make it happen" mindset.`,
    ],
  },
  {
    slug: "vyara-tosheva",
    name: "Vyara Tosheva",
    title: "Empowering Entrepreneurs, Business Leaders & Owners in Wellness and Hospitality",
    image: `${IMG}/vyara-tosheva.avif`,
    bio: [
      `With over two decades of professional experience spanning hospitality, leisure, wellness, and spa management, Vyara Tosheva stands out as a leading expert dedicated to transforming the wellness and hospitality industries. Armed with a Bachelor's degree in Tourism and a Master's in Psychology and Sociology, Vyara has continuously built her expertise through internationally accredited certifications in Hospitality and Spa Management, Ayurveda, Fitness and Wellness Coaching, and Psychology.`,
      `In 2024, she elevated her credentials by earning an MBA and becoming an internationally certified NLP Business Master Coach, further sharpening her skills in coaching and consultancy for entrepreneurs, business leaders, and owners in the wellness field.`,
      `Vyara has spearheaded the pre-opening and operational management of several holistic wellness clinics and luxury spas across the UAE, the GCC, and Europe. Her ability to blend wellness innovation with strategic hospitality leadership has cemented her reputation in dynamic and multicultural business environments.`,
      `An internationally published author, Vyara has penned Implementing Wellness in Hotels and Spas and co-authored business and entrepreneurship books such as Who Moved My Heels (2020) and Dubai Business Leaders (2023). Her thought leadership extends to award-winning content featured in global well-being and lifestyle magazines, as well as podcasts that inspire audiences in the UAE and beyond.`,
      `A multi-award-winning professional recognized for her contributions to luxury spa and hospitality excellence, Vyara brings a unique perspective to entrepreneurial ventures. Her mission is to empower busy female executives, business leaders, and owners in the wellness field to establish and scale their ventures.`,
      `Vyara envisions a future where bespoke wellness sanctuaries flourish worldwide — spaces designed to provide premium, customized experiences that align with the evolving needs of modern consumers. Whether guiding startups or enhancing established ventures, Vyara Tosheva is the catalyst for those looking to merge hospitality with wellness in a way that redefines industry standards.`,
    ],
    publications: [
      "Implementing DIY Wellness in Hotels and Spas",
      "Dubai Business Leaders",
      "Who Moved My Heels?",
      "Implementing Wellness in Hotels and Spas (by Vybewoman)",
      "Creating Your Wellness Home",
      "Don't worry about the trivial things",
      "Wellness, a key driver of UAE's growing tourism industry",
      "The Retreat Palm Dubai MGallery by Sofitel — A&E Reviews",
      "Dubai: The Wellness Tourism Haven for Today's Health-Conscious Traveller",
      "Dubai: Wellness tourism haven for health-conscious travellers globally",
    ],
  },
  {
    slug: "raja-ramachandran",
    name: "Dr. Rajarajachozhan Ramachandran",
    title: "A Holistic Visionary · Naturopathy Practitioner, Royal Mansour Tamuda Bay",
    image: `${IMG}/raja-ramachandran.avif`,
    bio: [
      `From his early days in India, Dr. Raja found his calling in the transformative power of wellness. For over 22 years, he has dedicated his life to understanding how holistic healthcare can tangibly improve lives. Now the Naturopathy Practitioner at Royal Mansour Tamuda Bay, Dr. Raja brings a wealth of global experience to Morocco, having previously led wellness teams in India, Sri Lanka, UAE and Thailand.`,
      `Dr. Raja's approach is unique: he seamlessly blends the rigorous standards of a clinician with the warmth of high-end hospitality. He is a strong advocate for the "gut-brain" connection, focusing on microbiome balance and positive energy as the pillars of disease prevention and management.`,
      `An alumnus of Tamil Nadu Dr. MGR Medical University (2004), Dr. Raja combines his academic background in Naturopathy and Ayurveda with skilled, hands-on therapies. Whether developing a longevity roadmap or performing an Acupuncture or Chi Nei Tsang treatment, his goal remains the same: to empower guests on their journey to optimal health.`,
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
    slug: "neerja-handa",
    name: "Neerja Handa",
    title: "Clinical Hypnotherapist & Soul Group Constellations Facilitator",
    image: `${IMG}/neerja-handa.avif`,
    bio: [
      `Ms. Neerja Handa's inspiring journey began with over 25 years in the garment industry, where she focused on enhancing physical beauty in India and abroad. However, a profound inner calling led her to transition from beautifying the body to healing the mind and soul. Her remarkable efforts in saving thousands from suicide earned her a nomination for the prestigious Padma Shri award in 2023, along with recognition from the Government of India for her outstanding contributions to mental health and holistic healing.`,
      `A certified practitioner and trainer in Clinical Hypnotherapy, Soul Group Constellations, and Transpersonal Regression Therapy with the Tasso Institute, Netherlands, Ms. Handa has conducted over 247 workshops and trained more than 1,100 Clinical Hypnotherapists across India and Dubai, leaving a lasting impact on the professional growth of therapists and healers.`,
      `She currently serves as Senior Therapist and Trainer at Illuminations in Dubai, continuing to touch lives globally, while leading her India-based organization, Healing Hands by Neerja Handa. Through this organization, she focuses on healing clients using the power of the subconscious mind and provides professional training to psychologists, counselors, and therapists.`,
      `Ms. Handa's passion for blending spirituality with science is reflected in her self-empowerment programs, including Inner Child Self-Work, Spiritual Mentoring, Soul Awakening, Spiritual Parenting, and Money Manifestation Workshops. She also facilitates the globally popular WOW (Words of Wisdom) program every month, which draws widespread international participation.`,
      `A true pioneer in her field, Ms. Handa is also the founder of two highly regarded professional courses: The Spirit of Supporting Chakras and the Facilitators Training Program for Soul Group Constellation. Her holistic and compassionate approach continues to inspire profound transformations, setting new standards of excellence across Europe, the Middle East, and beyond.`,
    ],
    contacts: { email: "neerjahanda@yahoo.co.in", phone: "+91 98111 57333" },
    links: [
      { label: "Website", href: "https://www.neerjahanda.com" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/neerja-handa-62b9396/" },
      { label: "Instagram", href: "https://instagram.com/neerja_handa" },
      { label: "Facebook", href: "https://www.facebook.com/NeerjaHandaNewDelhi" },
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
] as const;

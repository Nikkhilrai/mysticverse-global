"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./JournalPreview.module.css";

/* ═══════════════════════════════════════════════════════════
   ⚠  PLACEHOLDER ARTICLES — titles, excerpts, and images are
      editorial stand-ins. Replace with real published content
      before launch. Image src should point to real article
      photography — minimum 1200px wide, 3:2 crop.

   Placeholder images: /images/hero-a.jpg and /images/hero-b.jpg
   Replace with: /images/journal/[article-slug].jpg
   ═══════════════════════════════════════════════════════════ */

const ARTICLES = [
  {
    category: "Wisdom & Modern Science",
    title:    "What the Vedas Knew About the Nervous System",
    excerpt:  "Ancient contemplative traditions mapped states of consciousness that neuroscience is only now beginning to verify. A conversation between a Vedic scholar and a clinical researcher — and the surprising ground they share.",
    href:     "/journal/vedas-nervous-system", /* FUTURE PAGE */
    image:    "/images/hero-a.jpg",
  },
  {
    category: "Longevity",
    title:    "Biological Age Is Not Your Destiny",
    excerpt:  "The emerging science of epigenetic clocks suggests that how we age is more choice than genetics. Three longevity practitioners on the interventions changing how their clients think about time.",
    href:     "/journal/biological-age", /* FUTURE PAGE */
    image:    "/images/hero-b.jpg",
  },
  {
    category: "Workplace Wellbeing",
    title:    "The Boardroom Has a Body",
    excerpt:  "When a CHRO introduced somatic practices into leadership development, the results were not what anyone expected. On the quiet revolution happening inside organisations that lead with presence.",
    href:     "/journal/boardroom-body", /* FUTURE PAGE */
    image:    "/images/hero-a.jpg",
  },
] as const;

export default function JournalPreview() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); io.disconnect(); }
      },
      { threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.section}${visible ? ` ${styles.visible}` : ""}`}
      aria-label="From The Journal — editorial preview"
    >
      <div className={styles.inner}>

        {/* Eyebrow */}
        <div className={styles.eyebrowWrap}>
          <p className={styles.eyebrow}>From The Journal</p>
        </div>

        {/* Headline */}
        <h2 className={styles.headline}>Wisdom, Distilled.</h2>

        {/*
          Bridging sentence — the one moment of Voice B on the homepage.
          Cormorant italic shifts register from commercial (Voice A) to
          reflective (Voice B) before the reader enters the articles.
        */}
        <p className={styles.bridge}>
          Not all of it belongs on a stage.<br />
          Some arrives quietly, on the page.
        </p>

        {/* 3-column article grid */}
        <div className={styles.grid}>
          {ARTICLES.map((article) => (
            <a
              key={article.title}
              href={article.href}
              className={styles.card}
            >
              <div className={styles.imageWrap}>
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(min-width: 900px) 30vw, (min-width: 640px) 45vw, 90vw"
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.cardBody}>
                <p className={styles.category}>{article.category}</p>
                <h3 className={styles.title}>{article.title}</h3>
                <p className={styles.excerpt}>{article.excerpt}</p>
                <span className={styles.readMore}>
                  Read more
                  <span className={styles.arrow} aria-hidden="true">&ensp;→</span>
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Closing link */}
        <div className={styles.allArticlesWrap}>
          <a href="/journal" className={styles.allArticles}> {/* FUTURE PAGE */}
            View all articles
            <span className={styles.arrow} aria-hidden="true">&ensp;→</span>
          </a>
        </div>

      </div>
    </section>
  );
}

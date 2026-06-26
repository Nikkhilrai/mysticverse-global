"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./JournalPreview.module.css";

/* ═══════════════════════════════════════════════════════════
   ⚠  PLACEHOLDER ARTICLES — titles and excerpts are editorial
      stand-ins. Replace with real published content before launch.
   ═══════════════════════════════════════════════════════════ */
const ARTICLES = [
  {
    category: "Wisdom & Modern Science",
    title: "What the Vedas Knew About the Nervous System",
    excerpt:
      "Ancient contemplative traditions mapped states of consciousness that neuroscience is only now beginning to verify. A conversation between a Vedic scholar and a clinical researcher — and the surprising ground they share.",
    readTime: "8 min read",
    href: "/journal/vedas-nervous-system",
  },
  {
    category: "Longevity",
    title: "Biological Age Is Not Your Destiny",
    excerpt:
      "The emerging science of epigenetic clocks suggests how we age is more choice than genetics.",
    readTime: "6 min read",
    href: "/journal/biological-age",
  },
  {
    category: "Workplace Wellbeing",
    title: "The Boardroom Has a Body",
    excerpt:
      "When a CHRO introduced somatic practices into leadership development, the results surprised everyone.",
    readTime: "5 min read",
    href: "/journal/boardroom-body",
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
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const [featured, ...rest] = ARTICLES;

  return (
    <section
      ref={ref}
      className={`${styles.section}${visible ? ` ${styles.visible}` : ""}`}
      aria-label="From The Journal — editorial preview"
    >
      <div className={styles.inner}>

        {/* ── Header ────────────────────────────────────────── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.eyebrowWrap}>
              <p className={styles.eyebrow}>From The Journal</p>
            </div>
            <h2 className={styles.headline}>
              Wisdom, <span className="gradientText">Distilled.</span>
            </h2>
            <p className={styles.bridge}>
              Not all of it belongs on a stage. Some arrives quietly, on the page.
            </p>
          </div>
          <a href="/journal" className={styles.viewAllTop}>
            View all articles
            <span className={styles.arrow} aria-hidden="true">→</span>
          </a>
        </div>

        {/* ── Featured + list ───────────────────────────────── */}
        <div className={styles.layout}>

          {/* Featured */}
          <a href={featured.href} className={styles.featured}>
            <div className={styles.featuredGlow} aria-hidden="true" />
            <span className={styles.featuredBadge}>Featured</span>
            <span className={styles.cat}>{featured.category}</span>
            <h3 className={styles.featuredTitle}>{featured.title}</h3>
            <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
            <div className={styles.featuredFoot}>
              <span className={styles.readTime}>{featured.readTime}</span>
              <span className={styles.readMore}>
                Read article
                <span className={styles.arrow} aria-hidden="true">→</span>
              </span>
            </div>
          </a>

          {/* List */}
          <div className={styles.list}>
            {rest.map((a) => (
              <a key={a.title} href={a.href} className={styles.row}>
                <span className={styles.rowCat}>{a.category}</span>
                <h4 className={styles.rowTitle}>{a.title}</h4>
                <p className={styles.rowExcerpt}>{a.excerpt}</p>
                <div className={styles.rowFoot}>
                  <span className={styles.rowTime}>{a.readTime}</span>
                  <span className={styles.arrow} aria-hidden="true">→</span>
                </div>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

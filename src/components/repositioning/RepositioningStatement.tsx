"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./RepositioningStatement.module.css";

/* Audience segments — rendered as chips, not prose. */
const AUDIENCE = [
  "HNIs & Family Principals",
  "Real Estate Decision-Makers",
  "CHROs & HR Leaders",
  "Longevity Entrepreneurs",
  "Wellness Brand Founders",
  "Investors & Family Offices",
  "Practitioners & Researchers",
] as const;

export default function RepositioningStatement() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.section}${visible ? ` ${styles.visible}` : ""}`}
      aria-label="Conference positioning statement"
    >
      <div className={styles.inner}>

        {/* ── Eyebrow with flanking rules ──────────────────── */}
        <div className={styles.eyebrowRow}>
          <span className={styles.eyebrowRule} aria-hidden="true" />
          <p className={styles.eyebrow}>The Premise</p>
          <span className={styles.eyebrowRule} aria-hidden="true" />
        </div>

        {/* ── Contrarian lead-in ───────────────────────────── */}
        <p className={styles.lead}>More Than a Wellness Conference.</p>

        {/* ── Oversized manifesto ──────────────────────────── */}
        <h2 className={styles.manifesto}>
          The Global Platform for
          <br />
          <span className="gradientText">Conscious Living.</span>
        </h2>

        {/* ── Supporting statement ─────────────────────────── */}
        <p className={styles.statement}>
          Connecting visionary leaders across wellness, wellness real estate,
          workplace wellbeing, longevity, luxury lifestyle, hospitality and
          human transformation.
        </p>

        {/* ── Audience chips ───────────────────────────────── */}
        <div className={styles.audienceBlock}>
          <p className={styles.audienceLabel}>Designed for the people who matter to it</p>
          <ul className={styles.tags}>
            {AUDIENCE.map((segment) => (
              <li key={segment} className={styles.tag}>{segment}</li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./WhoIsInTheRoom.module.css";

const SEGMENTS = [
  {
    number:     "01",
    range:      "60 – 80",
    title:      "HNIs & Family Principals",
    descriptor: "Personal wealth actively directed toward wellness real estate, longevity programmes, and consciousness-led lifestyle infrastructure.",
  },
  {
    number:     "02",
    range:      "80 – 120",
    title:      "Wellness Real Estate Decision-Makers",
    descriptor: "Senior principals behind the next generation of wellness residences, biophilic hotels, and regenerative resorts.",
  },
  {
    number:     "03",
    range:      "100 – 140",
    title:      "CHROs & Senior HR Leaders",
    descriptor: "Executives holding corporate wellness budgets and steering human capital strategy in organisations of 500+.",
  },
  {
    number:     "04",
    range:      "100 – 140",
    title:      "Conscious Entrepreneurs & Brand Founders",
    descriptor: "Founders scaling in the conscious luxury space, and the family offices and growth funds backing them.",
  },
  {
    number:     "05",
    range:      "30 – 50",
    title:      "Investors & Capital Allocators",
    descriptor: "Capital actively searching for the next category-defining wellness investment — real estate, brand, or science.",
  },
  {
    number:     "06",
    range:      "80 – 120",
    title:      "Wellness Practitioners & Senior Healers",
    descriptor: "The wisdom keepers and master practitioners whose clinical and contemplative depth anchors the conference's credibility.",
  },
] as const;

export default function WhoIsInTheRoom() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); io.disconnect(); }
      },
      { threshold: 0.06 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.section}${visible ? ` ${styles.visible}` : ""}`}
      aria-label="Conference audience — who attends MysticVerse Global"
    >
      <div className={styles.inner}>

        {/* ── Header split ─────────────────────────────────── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.eyebrowWrap}>
              <p className={styles.eyebrow}>The Room</p>
            </div>
            <h2 className={styles.headline}>
              Who You Meet,<br />Not How Many.
            </h2>
          </div>
          <div className={styles.headerRight}>
            <p className={styles.intro}>
              We cap attendance at 500 seats because the value of
              MysticVerse is the calibration of the room, not its
              volume. Every person in the room was invited because of
              what they build, hold, or influence.
            </p>
            <a href="/delegate-profile" className={styles.cta}>
              View the full delegate profile
              <span className={styles.ctaArrow} aria-hidden="true">&ensp;→</span>
            </a>
          </div>
        </div>

        {/* ── Roster ───────────────────────────────────────── */}
        <div className={styles.roster} role="list">
          {SEGMENTS.map((seg) => (
            <div key={seg.number} className={styles.row} role="listitem">
              <span className={styles.rowIndex} aria-hidden="true">
                {seg.number}
              </span>
              <div className={styles.rowBody}>
                <h3 className={styles.rowTitle}>{seg.title}</h3>
                <p className={styles.rowDescriptor}>{seg.descriptor}</p>
              </div>
              <div className={styles.rowMeta}>
                <span className={styles.rowRange}>{seg.range}</span>
                <span className={styles.rowLabel}>delegates</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./WhoIsInTheRoom.module.css";

const SEGMENTS = [
  {
    number: "01",
    range: "60–80",
    title: "HNIs & Family Principals",
    descriptor: "Personal wealth directed toward wellness real estate, longevity programmes, and consciousness-led lifestyle infrastructure.",
  },
  {
    number: "02",
    range: "80–120",
    title: "Wellness Real Estate Decision-Makers",
    descriptor: "Senior principals behind the next generation of wellness residences, biophilic hotels, and regenerative resorts.",
  },
  {
    number: "03",
    range: "100–140",
    title: "CHROs & Senior HR Leaders",
    descriptor: "Executives holding corporate wellness budgets and steering human capital strategy in organisations of 500+.",
  },
  {
    number: "04",
    range: "100–140",
    title: "Conscious Entrepreneurs & Founders",
    descriptor: "Founders scaling in the conscious luxury space, and the family offices and growth funds backing them.",
  },
  {
    number: "05",
    range: "30–50",
    title: "Investors & Capital Allocators",
    descriptor: "Capital searching for the next category-defining wellness investment — real estate, brand, or science.",
  },
  {
    number: "06",
    range: "80–120",
    title: "Practitioners & Senior Healers",
    descriptor: "The wisdom keepers and master practitioners whose depth anchors the conference's credibility.",
  },
] as const;

/* Count-up numeral — animates once in view. */
function CountUp({ to, suffix, start }: { to: number; suffix: string; start: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(to); return; }
    const DUR = 1300;
    let raf = 0; let startT: number | null = null;
    const tick = (t: number) => {
      if (startT === null) startT = t;
      const p = Math.min((t - startT) / DUR, 1);
      setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick); else setN(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to]);
  return <>{`${n}${suffix}`}</>;
}

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
      { threshold: 0.12 },
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

        {/* ── Header ────────────────────────────────────────── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.eyebrowWrap}>
              <p className={styles.eyebrow}>The Room</p>
            </div>
            <h2 className={styles.headline}>
              Who You Meet,<br />
              <span className="gradientText">Not How Many.</span>
            </h2>
          </div>

          <div className={styles.headerRight}>
            <p className={styles.intro}>
              We cap the room because the value of MysticVerse is its calibration,
              not its volume. Every seat is allocated to someone who builds, holds,
              or directs capital in the conscious economy.
            </p>
            <div className={styles.statRow}>
              <div className={styles.stat}>
                <span className={styles.statValue}><CountUp to={500} suffix="" start={visible} /></span>
                <span className={styles.statLabel}>Seats, capped</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}><CountUp to={40} suffix="+" start={visible} /></span>
                <span className={styles.statLabel}>Countries</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>6</span>
                <span className={styles.statLabel}>Audience cohorts</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Cohort grid ───────────────────────────────────── */}
        <div className={styles.grid}>
          {SEGMENTS.map((s) => (
            <article key={s.number} className={styles.tile}>
              <span className={styles.watermark} aria-hidden="true">{s.number}</span>
              <div className={styles.tileTop}>
                <span className={styles.tileIndex}>{s.number}</span>
                <span className={styles.tileRangePill}>{s.range} delegates</span>
              </div>
              <span className={styles.tileRule} aria-hidden="true" />
              <h3 className={styles.tileTitle}>{s.title}</h3>
              <p className={styles.tileDesc}>{s.descriptor}</p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

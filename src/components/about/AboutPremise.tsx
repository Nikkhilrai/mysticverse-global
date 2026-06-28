"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AboutPremise.module.css";

/* Pulled-out figures that anchor the narrative. */
const FIGURES = [
  { value: "$548B", label: "Wellness real estate today", note: "Global Wellness Institute" },
  { value: "$1.1T", label: "Projected by 2029", note: "Global Wellness Institute" },
  { value: "~7×", label: "UAE residential wellness by 2027", note: "Forecast growth" },
] as const;

export default function AboutPremise() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); io.disconnect(); }
      },
      { threshold: 0.14 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.section}${visible ? ` ${styles.visible}` : ""}`}
      aria-label="The premise"
    >
      <div className={styles.inner}>

        {/* ── Narrative column ──────────────────────────────── */}
        <div className={styles.narrative}>
          <div className={styles.eyebrowWrap}>
            <span className={styles.eyebrowRule} aria-hidden="true" />
            <p className={styles.eyebrow}>The Premise</p>
          </div>

          <p className={styles.lead}>
            For two decades, the global wellness conversation lived in retreats.
            Today it lives in residential plans, board rooms, billion-dollar real
            estate launches, longevity clinics, and family office portfolios.
          </p>

          <p className={styles.body}>
            The Global Wellness Institute now sizes wellness real estate alone at
            USD 548 billion, projected to cross USD 1.1 trillion by 2029. The
            UAE&rsquo;s residential wellness segment is forecast to grow roughly
            seven-fold by 2027.
          </p>

          <p className={styles.body}>
            The buyers of these residences, the founders of these brands, and the
            leaders building wellbeing into the workforce are not in the same room
            often enough. MysticVerse Global was built to convene them — with the
            intellectual depth of an ancient wisdom platform and the commercial
            seriousness of a luxury industry forum.
          </p>
        </div>

        {/* ── Figure strip ──────────────────────────────────── */}
        <aside className={styles.figures} aria-label="Market figures">
          {FIGURES.map((f) => (
            <div key={f.value} className={styles.figure}>
              <span className={styles.figureValue}>{f.value}</span>
              <span className={styles.figureLabel}>{f.label}</span>
              <span className={styles.figureNote}>{f.note}</span>
            </div>
          ))}
        </aside>

      </div>
    </section>
  );
}

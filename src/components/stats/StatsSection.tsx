"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./StatsSection.module.css";

/* ═══════════════════════════════════════════════════════════
   The $6.3T market figure reflects the Global Wellness Institute's
   most recent economy monitor; the remaining three are MysticVerse
   Global 2026 event figures. No source line is shown — per the
   approved copy, the descriptors carry the context.
   ═══════════════════════════════════════════════════════════ */

const DURATION_MS = 600;
const STAGGER_MS  =  80;

interface StatDef {
  readonly accentChar:     string;  // gradient-clipped accent glyph
  readonly accentIsPrefix: boolean; // true = before digits, false = after
  readonly countTo:        number;
  readonly decimals:       number;
  readonly numericSuffix:  string;  // scale indicator, e.g. "T+"
  readonly label:          string;
  readonly descriptor:     string;
}

const STATS: readonly StatDef[] = [
  {
    accentChar:     "$",
    accentIsPrefix: true,
    countTo:        6.3,
    decimals:       1,
    numericSuffix:  "T+",
    label:          "Global Wellness Economy",
    descriptor:     "One of the world's fastest-growing industries, driving innovation across health, wellbeing, longevity and conscious living.",
  },
  {
    accentChar:     "+",
    accentIsPrefix: false,
    countTo:        15,
    decimals:       0,
    numericSuffix:  "",
    label:          "Wellness Sectors",
    descriptor:     "Bringing together wellness, longevity, wellness real estate, workplace wellbeing, luxury hospitality, holistic healing, wellness tourism, beauty, fitness and conscious leadership.",
  },
  {
    accentChar:     "+",
    accentIsPrefix: false,
    countTo:        300,
    decimals:       0,
    numericSuffix:  "",
    label:          "Curated Delegates",
    descriptor:     "Global leaders, practitioners, researchers, investors, HR professionals and wellness innovators.",
  },
  {
    accentChar:     "+",
    accentIsPrefix: false,
    countTo:        20,
    decimals:       0,
    numericSuffix:  "",
    label:          "Countries Represented",
    descriptor:     "A diverse international community united to shape the future of wellbeing, human transformation and conscious living.",
  },
] as const;

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

/* ── Individual stat block ───────────────────────────────── */
function StatBlock({
  stat,
  index,
  active,
  reducedMotion,
}: {
  stat:         StatDef;
  index:        number;
  active:       boolean;
  reducedMotion: boolean;
}) {
  const [count, setCount] = useState(reducedMotion ? stat.countTo : 0);

  useEffect(() => {
    if (!active) return;
    if (reducedMotion) {
      setCount(stat.countTo);
      return;
    }

    const delay = index * STAGGER_MS;
    let startTime: number | null = null;
    let rafId: number;

    const tick = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed  = timestamp - startTime - delay;

      if (elapsed < 0) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min(elapsed / DURATION_MS, 1);
      const eased    = easeOutCubic(progress);
      const raw      = stat.countTo * eased;

      setCount(
        stat.decimals > 0
          ? parseFloat(raw.toFixed(stat.decimals))
          : Math.floor(raw),
      );

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setCount(stat.countTo);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [active, stat, index, reducedMotion]);

  const formatted =
    stat.decimals > 0
      ? count.toFixed(stat.decimals)
      : String(Math.floor(count));

  /* Accessible static value — always shows the final number.
     The animated visual is aria-hidden so screen readers never
     hear the intermediate counter states. */
  const accessibleValue = [
    stat.accentIsPrefix  ? stat.accentChar : "",
    stat.countTo.toFixed(stat.decimals),
    stat.numericSuffix,
    !stat.accentIsPrefix ? stat.accentChar : "",
  ].join("").trim();

  return (
    <div className={styles.statBlock}>
      {/* Static accessible value — visually hidden */}
      <span className={styles.srOnly}>{accessibleValue}</span>

      {/* Visual animated counter — aria-hidden prevents SR chaos during count */}
      <p className={styles.number} aria-hidden="true">
        {stat.accentIsPrefix && (
          <span className={styles.accent}>{stat.accentChar}</span>
        )}
        <span className={styles.digits}>{formatted}</span>
        {stat.numericSuffix && (
          <span className={styles.digits}>{stat.numericSuffix}</span>
        )}
        {!stat.accentIsPrefix && (
          <span className={styles.accent}>{stat.accentChar}</span>
        )}
      </p>

      <p className={styles.label}>{stat.label}</p>
      <p className={styles.descriptor}>{stat.descriptor}</p>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────── */
export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active,         setActive]        = useState(false);
  const [reducedMotion,  setReducedMotion] = useState(false);

  /* Detect prefers-reduced-motion once on mount (client-only) */
  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  /* Fire counters once when 15% of the section is in view */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="Wellness economy statistics"
    >
      <div className={styles.inner}>

        {/* Eyebrow — contextualises without competing with the numbers */}
        <div className={styles.eyebrowWrap}>
          <p className={styles.eyebrow}>The Global Wellness Economy</p>
        </div>

        {/* 4-stat grid */}
        <div className={styles.grid}>
          {STATS.map((stat, i) => (
            <StatBlock
              key={stat.label}
              stat={stat}
              index={i}
              active={active}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

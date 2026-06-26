"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./StatsSection.module.css";

/* ═══════════════════════════════════════════════════════════
   ⚠  PLACEHOLDER DATA — ALL FOUR FIGURES REQUIRE INDEPENDENT
      SOURCE VERIFICATION BEFORE THIS GOES LIVE. NOT FINAL COPY.

   $5.6T  GWI 2022 market estimate. The headline figure shifts
          between GWI report editions depending on which sub-sectors
          are included. Pull the exact number and year directly from
          the 2023 Wellness Economy Monitor PDF before publishing.
          Do not rely on secondary citations.

   6×     "Average return per $1 invested" is the most widely
          quoted workplace wellness ROI multiplier, but the
          specific study and methodology behind this figure vary
          across secondary sources. Harvard Business Review cites
          several analyses, not one canonical number. Requires
          independent primary-source verification.

   16%    GWI wellness real estate CAGR. Confirm the exact
          percentage and the precise survey period from the GWI
          dataset. CAGR figures are projection-dependent.

   500+   THIS IS A PROJECTION / TARGET — not a confirmed booking
          figure. The source line says "MysticVerse Global 2026
          projections" but the stat reads as a commitment to
          external visitors. Review with the team before going live.
          Consider rewording the stat or the source line if the
          number is not yet secured. See also: user note on this
          point in the session brief.
   ═══════════════════════════════════════════════════════════ */

const DURATION_MS = 600;
const STAGGER_MS  =  80;

interface StatDef {
  readonly accentChar:     string;  // renders in Brass
  readonly accentIsPrefix: boolean; // true = before digits, false = after
  readonly countTo:        number;
  readonly decimals:       number;
  readonly numericSuffix:  string;  // Canvas A scale indicator, e.g. "T"
  readonly label:          string;
  readonly descriptor:     string;
  readonly source:         string;
}

const STATS: readonly StatDef[] = [
  {
    accentChar:     "$",
    accentIsPrefix: true,
    countTo:        5.6,
    decimals:       1,
    numericSuffix:  "T",
    label:          "Global Wellness Economy",
    descriptor:     "Total market value, 2022 estimate",
    source:         "Global Wellness Institute, 2023 Wellness Economy Monitor",
  },
  {
    accentChar:     "×",
    accentIsPrefix: false,
    countTo:        6,
    decimals:       0,
    numericSuffix:  "",
    label:          "ROI on Workplace Wellness",
    descriptor:     "Average return per $1 invested",
    source:         "Harvard Business Review / WHO meta-analysis",
  },
  {
    accentChar:     "%",
    accentIsPrefix: false,
    countTo:        16,
    decimals:       0,
    numericSuffix:  "",
    label:          "Wellness Real Estate CAGR",
    descriptor:     "Fastest-growing real estate class globally",
    source:         "Global Wellness Institute, Wellness Real Estate Report 2023",
  },
  {
    accentChar:     "+",
    accentIsPrefix: false,
    countTo:        500,
    decimals:       0,
    numericSuffix:  "",
    label:          "Delegates Expected",
    descriptor:     "Senior decision-makers across 40+ countries",
    source:         "MysticVerse Global 2026 projections",
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
      <p className={styles.source}>{stat.source}</p>
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
          <p className={styles.eyebrow}>The Wellness Economy</p>
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

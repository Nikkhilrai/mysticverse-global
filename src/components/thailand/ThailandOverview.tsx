"use client";

import { useInView } from "./useInView";
import ThailandStatStrip from "./ThailandStatStrip";
import { THAILAND_OVERVIEW, THAILAND_PILLARS_SHORT } from "./thailandData";
import styles from "./ThailandOverview.module.css";
import MaskLines from "./MaskLines";

/*
  Section 2 — What this is (brief §3).
  Copy on the left; on the right three rings — one per pillar — drift
  together and overlap into "one room" as the section scrolls in.
  Below, the four-item stat strip counts up.
*/

/* Ring centres once converged (an equilateral triangle about the
   middle), and how far each starts out along the same direction. */
const RINGS = [
  { cx: 200, cy: 140, from: [0, -70], label: [THAILAND_PILLARS_SHORT[0]], lx: 200, ly: 84, tone: "gold" },
  { cx: 148, cy: 230, from: [-62, 36], label: ["Holistic", "Wellness"], lx: 106, ly: 280, tone: "violet" },
  { cx: 252, cy: 230, from: [62, 36], label: ["Wellness", "Real Estate"], lx: 294, ly: 280, tone: "fuchsia" },
] as const;

function Convergence() {
  return (
    <svg className={styles.venn} viewBox="0 0 400 400" role="img" aria-label="Longevity, holistic wellness and wellness real estate, overlapping in one room">
      <defs>
        <radialGradient id="ovCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5C45A" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#F5C45A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {RINGS.map((r, i) => (
        <g
          key={r.tone}
          className={`${styles.ring} ${styles[r.tone]}`}
          style={{ "--fx": `${r.from[0]}px`, "--fy": `${r.from[1]}px`, "--i": i } as React.CSSProperties}
        >
          <circle cx={r.cx} cy={r.cy} r="108" className={styles.ringFill} />
          <circle cx={r.cx} cy={r.cy} r="108" className={styles.ringLine} pathLength={1} />
          <text x={r.lx} y={r.ly} className={styles.ringLabel} textAnchor="middle">
            {r.label.map((l, j) => (
              <tspan key={l} x={r.lx} dy={j === 0 ? 0 : 17}>{l}</tspan>
            ))}
          </text>
        </g>
      ))}

      <g className={styles.core}>
        <circle cx="200" cy="200" r="46" fill="url(#ovCore)" />
        <circle cx="200" cy="200" r="4" className={styles.coreDot} />
        <text x="200" y="224" textAnchor="middle" className={styles.coreLabel}>One room</text>
      </g>
    </svg>
  );
}

export default function ThailandOverview() {
  const [ref, inView] = useInView<HTMLElement>();

  const { eyebrow, heading, copy, stats } = THAILAND_OVERVIEW;

  return (
    <section
      id="overview"
      ref={ref}
      className={`${styles.section}${inView ? ` ${styles.in}` : ""}`}
      aria-labelledby="thailand-overview-title"
    >
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span className={styles.rule} aria-hidden="true" />
            {eyebrow}
          </p>
          <h2 id="thailand-overview-title" className={styles.title}>
            <MaskLines lines={[{ text: heading }]} />
          </h2>
          <p className={styles.lede}>{copy[0]}</p>
          <p className={styles.body}>{copy[1]}</p>
        </div>

        <div className={styles.visual}>
          <Convergence />
        </div>
      </div>

      <ThailandStatStrip stats={stats} run={inView} className={styles.stats} />
    </section>
  );
}

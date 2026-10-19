"use client";

import { useEffect, useState } from "react";
import styles from "./ThailandStatStrip.module.css";

/*
  The Thailand page's stat strip (brief §10: "reuse the stat strip").
  Each figure counts up from zero once `run` turns true; ranges such
  as 150–180 count both ends. Used by §2 (What this is) and §5 (The
  room).
*/

export interface StripStat {
  /** Final figure as published, e.g. "150–180" or "Global". */
  value: string;
  /** Numbers to count up to — empty for a non-numeric value. */
  count: readonly number[];
  unit: string;
  label?: string;
}

const COUNT_MS = 1400;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** Counts each number in `to` up from zero once `run` turns true. */
function useCountUp(to: readonly number[], run: boolean) {
  const [vals, setVals] = useState<number[]>(() => to.map(() => 0));
  useEffect(() => {
    if (!run || to.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVals([...to]);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / COUNT_MS);
      setVals(to.map((n) => Math.round(n * easeOut(t))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return vals;
}

function Stat({ stat, run, index }: { stat: StripStat; run: boolean; index: number }) {
  const vals = useCountUp(stat.count, run);
  return (
    <li className={styles.stat} style={{ "--i": index } as React.CSSProperties}>
      {/* Screen readers get the final figure, not the ticking one. */}
      <span className={styles.srOnly}>{stat.value} {stat.unit}</span>
      <span className={styles.statValue} aria-hidden="true">
        <span className="gradientTextInk">
          {stat.count.length ? vals.join("–") : stat.value}
        </span>
        <span className={styles.statUnit}>{stat.unit}</span>
      </span>
      {stat.label && <span className={styles.statLabel}>{stat.label}</span>}
    </li>
  );
}

export default function ThailandStatStrip({
  stats,
  run,
  className,
}: {
  stats: readonly StripStat[];
  run: boolean;
  className?: string;
}) {
  return (
    <ul className={`${styles.stats}${run ? ` ${styles.in}` : ""}${className ? ` ${className}` : ""}`}>
      {stats.map((s, i) => (
        <Stat key={s.unit} stat={s} run={run} index={i} />
      ))}
    </ul>
  );
}

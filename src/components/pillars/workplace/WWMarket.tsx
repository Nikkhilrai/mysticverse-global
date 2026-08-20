"use client";

import { useEffect, useRef, useState } from "react";
import { STATS, StatBlock } from "@/components/stats/StatsSection";
import styles from "./WWMarket.module.css";

/*
  Deliberately reuses the homepage's STATS + StatBlock — the same
  four data points, not a re-derived set — so the figures can never
  drift apart between the main stage and this pillar. Only the
  framing is re-contextualised for a CHRO / enterprise audience.
*/
export default function WWMarket() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = ref.current;
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
      ref={ref}
      className={`${styles.section}${active ? ` ${styles.in}` : ""}`}
      aria-labelledby="ww-market-heading"
    >
      <div className={styles.inner}>
        <header className={styles.head}>
          <div className={styles.overlineWrap}>
            <span className={styles.overlineRule} aria-hidden="true" />
            <p className={styles.overline}>The Business Case</p>
          </div>
          <h2 id="ww-market-heading" className={styles.heading}>
            The market in numbers.
          </h2>
          <p className={styles.deck}>
            The same figures from our main stage — reframed for the
            boardroom conversation this pillar exists to start.
          </p>
        </header>

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

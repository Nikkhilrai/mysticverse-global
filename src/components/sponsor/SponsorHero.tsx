"use client";

import { useEffect, useState } from "react";
import styles from "./SponsorHero.module.css";

export default function SponsorHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-label="Sponsor MysticVerse Global"
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={`${styles.grain} noise`} aria-hidden="true" />

      <span className={styles.cornerTL} aria-hidden="true" />
      <span className={styles.cornerBR} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.overlineWrap}>
          <span className={styles.overlineRule} aria-hidden="true" />
          <p className={styles.overline}>Partner With Us · Dubai 2026</p>
        </div>

        <h1 className={styles.headline}>
          <span className={styles.line}>
            <span className={styles.lineInner}>Partner with the platform</span>
          </span>
          <span className={styles.line}>
            <span className={styles.lineInner}>building the</span>
          </span>
          <span className={styles.line}>
            <span className={`${styles.lineInner} gradientText`}>
              conscious luxury economy.
            </span>
          </span>
        </h1>

        <span className={styles.measure} aria-hidden="true" />

        <p className={styles.sub}>
          Curated access to HNIs, real estate decision-makers, CHROs, longevity
          entrepreneurs, and investors. One day of measurable presence; twelve
          months of editorial association.
        </p>

        <div className={styles.ctaRow}>
          <button
            type="button"
            className={styles.ctaPrimary}
            onClick={() => scrollTo("request-deck")}
          >
            Request the deck
            <span className={styles.arrow} aria-hidden="true">→</span>
          </button>
          <button
            type="button"
            className={styles.ctaGhost}
            onClick={() => scrollTo("tiers")}
          >
            See the nine tiers
            <span className={styles.arrow} aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

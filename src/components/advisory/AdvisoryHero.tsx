"use client";

import { useEffect, useState } from "react";
import styles from "./AdvisoryHero.module.css";

export default function AdvisoryHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-label="Advisory Board"
    >
      <div className={styles.glow} aria-hidden="true" />
      <p className={styles.watermark} aria-hidden="true">Advisory</p>

      <div className={styles.inner}>
        <div className={styles.overlineWrap}>
          <span className={styles.overlineRule} aria-hidden="true" />
          <p className={styles.overline}>MysticVerse Global 2026</p>
        </div>

        <h1 className={styles.headline}>
          The counsel behind{" "}
          <span className="gradientText">conscious luxury.</span>
        </h1>

        <p className={styles.sub}>
          Educators, healers, and legal counsel guiding MysticVerse Global's
          direction — the board that shapes the platform behind the stage.
        </p>
      </div>
    </section>
  );
}

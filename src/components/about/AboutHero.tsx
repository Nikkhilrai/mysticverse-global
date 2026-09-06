"use client";

import { useEffect, useState } from "react";
import styles from "./AboutHero.module.css";

export default function AboutHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-label="About the platform"
    >
      <div className={styles.inner}>

        {/* ── Text column ───────────────────────────────────── */}
        <div className={styles.text}>
          <div className={styles.overlineWrap}>
            <span className={styles.overlineRule} aria-hidden="true" />
            <p className={styles.overline}>About the Platform</p>
          </div>

          <h1 className={styles.headline}>
            We curate the room where{" "}
            <span className="gradientText">conscious wealth</span>, ancient
            wisdom, and the future of living meet.
          </h1>

          <p className={styles.sub}>
            MysticVerse Global is the platform on which the conscious luxury
            economy is becoming visible — across real estate, retail, workplace
            wellbeing, and human longevity.
          </p>
        </div>

      </div>
    </section>
  );
}

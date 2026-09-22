"use client";

import { useEffect, useState } from "react";
import styles from "./GalleryHero.module.css";

export default function GalleryHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-label="Event gallery"
    >
      <div className={styles.glow} aria-hidden="true" />
      <p className={styles.watermark} aria-hidden="true">Gallery</p>

      <div className={styles.inner}>
        <div className={styles.overlineWrap}>
          <span className={styles.overlineRule} aria-hidden="true" />
          <p className={styles.overline}>Dubai 2026 · Concluded</p>
        </div>

        <h1 className={styles.headline}>
          Event <span className="gradientText">Glimpse</span>
        </h1>
      </div>
    </section>
  );
}

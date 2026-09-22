"use client";

import { useEffect, useState } from "react";
import styles from "./GalleryHero.module.css";
import { GALLERY_PHOTOS } from "./galleryData";

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
          The room,{" "}
          <span className="gradientText">as it happened.</span>
        </h1>

        <p className={styles.sub}>
          {GALLERY_PHOTOS.length} moments from 11 September — the sessions, the
          conversations, and the people who filled the room.
        </p>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./PavilionHero.module.css";

export default function PavilionHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-label="The Conscious Living Pavilion"
    >
      {/* Cinematic full-bleed image */}
      <Image
        src="/images/pavilion/pavilion-a.jpg"
        alt="Inside the Conscious Living Pavilion — biophilic architecture and light."
        fill
        priority
        sizes="100vw"
        className={styles.bg}
      />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={`${styles.grain} noise`} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.overlineWrap}>
          <span className={styles.overlineRule} aria-hidden="true" />
          <p className={styles.overline}>The Flagship Zone of MysticVerse Global 2026</p>
        </div>

        <h1 className={styles.headline}>
          The Conscious<br />
          <span className="gradientText">Living Pavilion.</span>
        </h1>

        <p className={styles.sub}>
          Five hundred square metres where wellness real estate and luxury retail
          share a room — because they share a buyer.
        </p>
      </div>

      <span className={styles.scrollCue} aria-hidden="true">
        <span className={styles.scrollLine} />
      </span>
    </section>
  );
}

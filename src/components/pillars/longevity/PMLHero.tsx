"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./PMLHero.module.css";

export default function PMLHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-label="Personal Mastery & Longevity"
    >
      <Image
        src="/images/four-pillars/pillar-longevity.jpg"
        alt="A misty forest trail at dawn, a figure walking ahead — the path of sustained vitality."
        fill
        priority
        sizes="100vw"
        className={styles.bg}
      />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={`${styles.grain} noise`} aria-hidden="true" />

      <span className={styles.cornerTL} aria-hidden="true" />
      <span className={styles.cornerBR} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.overlineWrap}>
          <span className={styles.overlineRule} aria-hidden="true" />
          <p className={styles.overline}>Pillar Three · Longevity</p>
        </div>

        <h1 className={styles.headline}>
          <span className={styles.line}>
            <span className={styles.lineInner}>Healthspan is the</span>
          </span>
          <span className={styles.line}>
            <span className={`${styles.lineInner} gradientText`}>new metric of success.</span>
          </span>
        </h1>

        <span className={styles.measure} aria-hidden="true" />

        <p className={styles.sub}>
          Longevity science, biological-age optimisation, functional medicine,
          and intentional living are converging into one movement — for high
          performers and biological-age investors alike.
        </p>
      </div>

      <span className={styles.scrollCue} aria-hidden="true">
        <span className={styles.scrollLine} />
      </span>
    </section>
  );
}

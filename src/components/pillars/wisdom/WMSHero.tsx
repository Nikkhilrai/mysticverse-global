"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./WMSHero.module.css";

export default function WMSHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-label="Wisdom & Modern Science"
    >
      <Image
        src="/images/four-pillars/pillar-wisdom.jpg"
        alt="Two incense cones on dark stone, one alight — a wisp of smoke rising against near-black."
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
          <p className={styles.overline}>Pillar Four · The Intellectual Soul</p>
        </div>

        <h1 className={styles.headline}>
          <span className={styles.line}>
            <span className={styles.lineInner}>Ancient wisdom.</span>
          </span>
          <span className={styles.line}>
            <span className={`${styles.lineInner} gradientText`}>Modern standards.</span>
          </span>
        </h1>

        <span className={styles.measure} aria-hidden="true" />

        <p className={styles.sub}>
          Vedic traditions, contemplative philosophy, and traditional health
          systems are most powerful when paired with neuroscience, clinical
          psychology, and integrative biology.
        </p>
      </div>

      <span className={styles.scrollCue} aria-hidden="true">
        <span className={styles.scrollLine} />
      </span>
    </section>
  );
}

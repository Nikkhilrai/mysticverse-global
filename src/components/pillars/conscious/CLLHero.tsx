"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./CLLHero.module.css";

export default function CLLHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-label="Conscious Luxury Living"
    >
      <Image
        src="/images/four-pillars/conscious-luxury-living.jpg"
        alt="A contemporary wellness villa at dusk — open architecture meeting a reflecting pool."
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
          <p className={styles.overline}>Pillar One · The Flagship</p>
        </div>

        <h1 className={styles.headline}>
          <span className={styles.line}>
            <span className={styles.lineInner}>The future of luxury</span>
          </span>
          <span className={styles.line}>
            <span className={`${styles.lineInner} gradientText`}>is conscious.</span>
          </span>
        </h1>

        <span className={styles.measure} aria-hidden="true" />

        <p className={styles.sub}>
          Wellness residences. Branded communities. Spiritual retail. The audience
          that buys a USD&nbsp;12&nbsp;million villa and a USD&nbsp;12,000 crystal
          believes both are part of the same life.
        </p>
      </div>

      <span className={styles.scrollCue} aria-hidden="true">
        <span className={styles.scrollLine} />
      </span>
    </section>
  );
}

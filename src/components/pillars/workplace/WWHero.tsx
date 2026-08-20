"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./WWHero.module.css";

export default function WWHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-label="Workplace Wellness & Human Capital"
    >
      <Image
        src="/images/four-pillars/pillar-workplace.jpg"
        alt="A senior leadership team in a calm, light-filled boardroom."
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
          <p className={styles.overline}>Pillar Two · Human Capital</p>
        </div>

        <h1 className={styles.headline}>
          <span className={styles.line}>
            <span className={styles.lineInner}>Wellbeing is a</span>
          </span>
          <span className={styles.line}>
            <span className={`${styles.lineInner} gradientText`}>board-level discipline.</span>
          </span>
        </h1>

        <span className={styles.measure} aria-hidden="true" />

        <p className={styles.sub}>
          Burnout is an enterprise risk — it shows up in retention, culture, and
          long-term performance. Attrition and disengagement now move the
          needle on enterprise valuation itself.
        </p>
      </div>

      <span className={styles.scrollCue} aria-hidden="true">
        <span className={styles.scrollLine} />
      </span>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./WhyDubaiHero.module.css";

export default function WhyDubaiHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-label="Why Dubai 2026"
    >
      <Image
        src="/images/editions/dubai-night-3.jpg"
        alt="Downtown Dubai at night — the Burj Khalifa above the skyline."
        fill
        priority
        sizes="100vw"
        className={styles.bg}
      />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={`${styles.grain} noise`} aria-hidden="true" />

      {/* Architectural framing — "by design" */}
      <span className={styles.cornerTL} aria-hidden="true" />
      <span className={styles.cornerBR} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.overlineWrap}>
          <span className={styles.overlineRule} aria-hidden="true" />
          <p className={styles.overline}>The Host City · September 2026</p>
        </div>

        <h1 className={styles.headline}>
          <span className={styles.line}>
            <span className={styles.lineInner}>Dubai.</span>
          </span>
          <span className={styles.line}>
            <span className={`${styles.lineInner} gradientText`}>By design.</span>
          </span>
        </h1>

        <span className={styles.measure} aria-hidden="true" />

        <p className={styles.sub}>
          The geographic centre of the wellness real estate boom. Three hours
          from a third of the world&apos;s HNIs. Built for premium gatherings.
        </p>
      </div>

      <span className={styles.scrollCue} aria-hidden="true">
        <span className={styles.scrollLine} />
      </span>
    </section>
  );
}

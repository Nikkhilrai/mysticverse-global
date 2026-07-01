"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PavilionIntro.module.css";

export default function PavilionIntro() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); io.disconnect(); }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.section}${visible ? ` ${styles.visible}` : ""}`}
      aria-label="The Pavilion, in one paragraph"
    >
      <div className={styles.plan} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <span className={styles.watermark} aria-hidden="true">Pavilion</span>

      <div className={styles.inner}>
        {/* Technical rail — architectural annotation */}
        <aside className={styles.rail}>
          <span className={styles.area}>500&nbsp;m²</span>
          <span className={styles.areaNote}>Built for two days only</span>
          <span className={styles.compass} aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="26" stroke="rgba(245,196,90,0.35)" strokeWidth="1" />
              <path className={styles.compassTicks} d="M32 8v14M32 42v14M8 32h14M42 32h14" stroke="rgba(245,196,90,0.4)" strokeWidth="1" />
              <circle className={styles.compassDot} cx="32" cy="32" r="3" fill="#F5C45A" />
            </svg>
            <span className={styles.compassN}>N</span>
          </span>
        </aside>

        {/* Annotated narrative */}
        <div className={styles.copy}>
          <p className={styles.body}>
            Imagine an HNI walking through a{" "}
            <em className={styles.place}>biophilic atrium</em> that was
            constructed for two days only. A{" "}
            <em className={styles.place}>villa walkthrough</em> on her left,
            designed by a Dubai architect whose last project sold out at{" "}
            <span className={styles.figure}>AED&nbsp;35M</span>. A{" "}
            <em className={styles.place}>rare crystal house</em> on her right,
            with a Himalayan tourmaline priced at{" "}
            <span className={styles.figure}>USD&nbsp;18,000</span>. A{" "}
            <em className={styles.place}>meditation garden</em> behind her,
            sponsored by a wellness branded-residence operator. A{" "}
            <em className={styles.place}>circadian-lighting laboratory</em> three
            steps ahead. A <em className={styles.place}>stage</em> at the centre.
          </p>
          <p className={styles.closer}>
            This is the Pavilion.
            <span className={styles.closerArrow} aria-hidden="true" />
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./PavilionSunset.module.css";

export default function PavilionSunset() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-labelledby="pavilion-sunset-heading"
    >
      {/* Dusk sky + setting sun */}
      <div className={styles.sun} aria-hidden="true" />
      <div className={styles.horizon} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.overlineWrap}>
          <span className={styles.overlineRule} aria-hidden="true" />
          <p className={styles.overline}>The Day 1 Finale</p>
          <span className={styles.overlineRule} aria-hidden="true" />
        </div>

        <h2 id="pavilion-sunset-heading" className={styles.heading}>
          Sunset Networking.
        </h2>

        <p className={styles.body}>
          After Day 1 closes on the main stage,{" "}
          <strong className={styles.em}>eighty guests</strong> move to a single
          luxury property within{" "}
          <strong className={styles.em}>thirty minutes</strong> of the venue.
          The property hosts. The Pavilion partners curate. The conversation
          continues across the sunset.
        </p>

        <p className={styles.meta}>
          By invitation only. Hosted by a luxury real estate or hospitality
          partner each edition.
        </p>

        <Link href="/contact" className={styles.cta}>
          Apply for an invitation
          <span className={styles.ctaArrow} aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

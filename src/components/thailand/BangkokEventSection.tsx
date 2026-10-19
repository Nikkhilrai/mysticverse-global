"use client";

import { useEffect, useRef, useState } from "react";
import BangkokEventCard from "./BangkokEventCard";
import { THAILAND } from "./thailandData";
import styles from "./BangkokEventSection.module.css";

/*
  Homepage section directly below the hero, announcing the Bangkok
  2027 edition while the full /thailand page is built.

  Left: short copy + one CTA. Right: the compact event card. Plain
  dark background — no decorative effects. The copy fades up once
  the section scrolls into view.
*/
export default function BangkokEventSection() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.section}${inView ? ` ${styles.in}` : ""}`}
      aria-labelledby="bangkok-next-title"
    >
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span className={styles.rule} aria-hidden="true" />
            The Global Series · Second Edition
          </p>

          <h2 id="bangkok-next-title" className={styles.title}>
            Next stop, <span className="gradientText">{THAILAND.city}.</span>
          </h2>

          <p className={styles.lede}>
            {THAILAND.editionName} — two days in {THAILAND.city} bringing
            longevity, holistic wellness and wellness real estate into one
            curated room.
          </p>

          <ul className={styles.facts}>
            <li>
              <span className={styles.factLabel}>When</span>
              {THAILAND.dateLabel}
            </li>
            <li>
              <span className={styles.factLabel}>Where</span>
              {THAILAND.city}, {THAILAND.country}
            </li>
            <li>
              <span className={styles.factLabel}>Format</span>
              2 days · 3 pillars
            </li>
          </ul>

          <a href="/thailand" className={styles.cta}>
            Explore the summit
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </a>
        </div>

        <div className={styles.cardCol}>
          <BangkokEventCard active={inView} />
        </div>
      </div>
    </section>
  );
}

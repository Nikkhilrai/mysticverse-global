"use client";

import { useEffect, useRef, useState } from "react";
import BangkokEventCard from "./BangkokEventCard";
import { THAILAND, THAILAND_PHOTO_CREDIT } from "./thailandData";
import styles from "./BangkokEventSection.module.css";

/*
  Homepage section directly below the hero, announcing the Bangkok
  2027 edition while the full /thailand page is built.

  Left: short copy + one CTA. Right: the compact event card floating
  on a "stage" of orbiting rings and a slow aurora — the same
  composition as the event cards on the LexTalk World homepage.
  Everything starts when the section scrolls into view.
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
      <div className={styles.glow} aria-hidden="true" />

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

          <a href="/contact" className={styles.cta}>
            Register your interest
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </a>
        </div>

        <div className={styles.stage}>
          <span className={styles.aurora} aria-hidden="true" />
          <span className={`${styles.ring} ${styles.ringOuter}`} aria-hidden="true">
            <span className={styles.orbit} />
          </span>
          <span className={`${styles.ring} ${styles.ringInner}`} aria-hidden="true">
            <span className={`${styles.orbit} ${styles.orbitViolet}`} />
          </span>
          <span className={`${styles.particle} ${styles.p1}`} aria-hidden="true" />
          <span className={`${styles.particle} ${styles.p2}`} aria-hidden="true" />
          <span className={`${styles.particle} ${styles.p3}`} aria-hidden="true" />

          <div className={styles.cardWrap}>
            <BangkokEventCard active={inView} />
          </div>

          <p className={styles.credit}>
            Photo:{" "}
            <a href={THAILAND_PHOTO_CREDIT.sourceUrl} target="_blank" rel="noopener noreferrer">
              {THAILAND_PHOTO_CREDIT.author}
            </a>
            {" · "}
            <a href={THAILAND_PHOTO_CREDIT.licenseUrl} target="_blank" rel="noopener noreferrer">
              {THAILAND_PHOTO_CREDIT.license}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

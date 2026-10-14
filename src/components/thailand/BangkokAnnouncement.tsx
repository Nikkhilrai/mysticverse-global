"use client";

import { useEffect, useRef, useState } from "react";
import BangkokSkyline from "./BangkokSkyline";
import { THAILAND, THAILAND_PILLARS_SHORT } from "./thailandData";
import styles from "./BangkokAnnouncement.module.css";

/*
  Homepage "next edition" card for Bangkok 2027.

  Shown while the full /thailand page is still being built, so it
  deliberately links to Contact rather than to the unfinished page —
  swap `href` to "/thailand" at launch.

  The skyline and the days-to-go counter start when the card scrolls
  into view (the skyline is mounted then, so its draw animation runs
  in front of the visitor rather than off-screen on page load).
*/

/* Doors open 1 July 2027, Bangkok time (UTC+7). */
const OPENS_AT = Date.UTC(2027, 6, 1, 1, 0, 0); // 08:00 ICT

function daysToGo(now: number): number {
  return Math.max(0, Math.ceil((OPENS_AT - now) / 86_400_000));
}

export default function BangkokAnnouncement() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [days, setDays] = useState<number | null>(null);

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
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Count up to the real number once visible. */
  useEffect(() => {
    if (!inView) return;
    const target = daysToGo(Date.now());
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDays(target);
      return;
    }
    const start = performance.now();
    const DURATION = 1400;
    let frame = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION);
      setDays(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView]);

  return (
    <section
      ref={ref}
      className={`${styles.section}${inView ? ` ${styles.in}` : ""}`}
      aria-labelledby="bangkok-announce-title"
    >
      <div className={styles.card}>
        <div className={styles.glow} aria-hidden="true" />

        <div className={styles.body}>
          <p className={styles.eyebrow}>
            <span className={styles.pulse} aria-hidden="true" />
            Next edition · Now announced
          </p>

          <h2 id="bangkok-announce-title" className={styles.title}>
            {THAILAND.editionName} comes to{" "}
            <span className="gradientText">{THAILAND.city}.</span>
          </h2>

          <p className={styles.date}>
            {THAILAND.dateLabel}
            <span className={styles.sep} aria-hidden="true" />
            {THAILAND.city}, {THAILAND.country}
          </p>

          <p className={styles.copy}>
            A two-day international summit bringing longevity, holistic
            wellness and wellness real estate into one room.
          </p>

          <ul className={styles.pillars} aria-label="Pillars">
            {THAILAND_PILLARS_SHORT.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>

          <a href="/contact" className={styles.cta}>
            Register your interest
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </a>
        </div>

        <div className={styles.countdown} aria-live="off">
          <span className={styles.days}>{days ?? "—"}</span>
          <span className={styles.daysLabel}>days to go</span>
        </div>

        <div className={styles.skyline}>{inView && <BangkokSkyline />}</div>
      </div>
    </section>
  );
}

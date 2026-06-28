"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AboutPrinciples.module.css";

const PRINCIPLES = [
  {
    n: "01",
    title: "Curated, not crowded.",
    body: "We cap attendance because the value of MysticVerse is who is in the room, not how many.",
  },
  {
    n: "02",
    title: "Commercial without compromise.",
    body: "Wellness has earned the right to be a serious industry. We treat it as one — without sacrificing its soul.",
  },
  {
    n: "03",
    title: "Wisdom held to modern standards.",
    body: "Ancient traditions deserve intellectual seriousness. Not mysticism for marketing. Not science as the only arbiter.",
  },
  {
    n: "04",
    title: "Year-round, not 48 hours.",
    body: "The conference is the catalyst. The Briefing, the Digest, the Podcast, and the Awards keep the conversation alive across twelve months.",
  },
  {
    n: "05",
    title: "Beauty as a precondition.",
    body: "Premium audiences read the room before the agenda. We design every room to be worth the time of the person inside it.",
  },
] as const;

export default function AboutPrinciples() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  /* Pin-scroll only on wider screens with motion allowed. */
  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* Map scroll position within the tall track to an active principle. */
  useEffect(() => {
    if (!pinned) return;
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = track.getBoundingClientRect();
        const total = track.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
        const p = total > 0 ? scrolled / total : 0;
        setProgress(p);
        const idx = Math.min(
          PRINCIPLES.length - 1,
          Math.floor(p * PRINCIPLES.length),
        );
        setActive(idx);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pinned]);

  return (
    <section className={styles.section} aria-label="Our principles">
      {pinned ? (
        /* ── Pinned-scroll experience (desktop) ──────────────── */
        <div className={styles.track} ref={trackRef}>
          <div className={styles.stage}>
            <div className={styles.stageInner}>

              {/* Progress rail */}
              <div className={styles.rail} aria-hidden="true">
                <p className={styles.railLabel}>Our Principles</p>
                <ul className={styles.railList}>
                  {PRINCIPLES.map((p, i) => (
                    <li
                      key={p.n}
                      className={`${styles.railItem}${i === active ? ` ${styles.railItemActive}` : ""}`}
                    >
                      <span className={styles.railNum}>{p.n}</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.railTrack}>
                  <span
                    className={styles.railFill}
                    style={{ transform: `scaleY(${progress})` }}
                  />
                </div>
              </div>

              {/* Crossfading principle stack */}
              <div className={styles.stack}>
                <p className={styles.kicker}>
                  Five principles that guide every room we build
                </p>
                <div className={styles.frame}>
                  {PRINCIPLES.map((p, i) => (
                    <div
                      key={p.n}
                      className={`${styles.principle}${i === active ? ` ${styles.principleActive}` : ""}`}
                      aria-hidden={i !== active}
                    >
                      <span className={styles.ghost}>{p.n}</span>
                      <h3 className={styles.title}>{p.title}</h3>
                      <p className={styles.body}>{p.body}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      ) : (
        /* ── Stacked fallback (mobile / reduced motion) ──────── */
        <div className={styles.stackedWrap}>
          <p className={styles.kicker}>
            Five principles that guide every room we build
          </p>
          <ul className={styles.cards}>
            {PRINCIPLES.map((p) => (
              <li key={p.n} className={styles.card}>
                <span className={styles.cardNum}>{p.n}</span>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardBody}>{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

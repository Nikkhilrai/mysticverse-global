"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AboutVisionMission.module.css";

const CARDS = [
  {
    key: "vision",
    label: "Our Vision",
    body: "To become the most credible and magnetic platform on which the conscious luxury economy is built — where developers, leaders, investors, and wisdom carriers shape the future of how we live, lead, and grow.",
  },
  {
    key: "mission",
    label: "Our Mission",
    body: "We design immersive forums, year-long editorial, and curated rooms that turn the wellness economy into measurable commercial outcomes — without sacrificing the depth, dignity, and contemplative grounding that gave wellness its meaning in the first place.",
  },
] as const;

export default function AboutVisionMission() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); io.disconnect(); }
      },
      { threshold: 0.18 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.section}${visible ? ` ${styles.visible}` : ""}`}
      aria-label="Vision and mission"
    >
      <div className={styles.inner}>
        <div className={styles.grid}>
          {CARDS.map((c) => (
            <article key={c.key} className={styles.card}>
              <span className={styles.accent} aria-hidden="true" />
              <div className={styles.cardHead}>
                <span className={styles.cardDot} aria-hidden="true" />
                <h2 className={styles.cardLabel}>{c.label}</h2>
              </div>
              <p className={styles.cardBody}>{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

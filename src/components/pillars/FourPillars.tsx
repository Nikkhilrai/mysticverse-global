"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./FourPillars.module.css";

const PILLARS = [
  {
    index: "01",
    tag: "Flagship Pillar",
    name: "Conscious Luxury Living",
    body: "Wellness residences, branded communities, biophilic architecture, and premium retail at the intersection of design and conscious living. The headline commercial vertical.",
    image: "/images/four-pillars/pillar-living.jpg",
    href: "/pillars/conscious-luxury-living",
  },
  {
    index: "02",
    tag: "Human Capital",
    name: "Workplace Wellness & Human Capital",
    body: "Burnout as enterprise risk. Wellbeing as a board-level concern — built for CHROs, CPOs, and senior HR leaders steering human capital strategy.",
    image: "/images/four-pillars/pillar-workplace.jpg",
    href: "/pillars/workplace-wellness",
  },
  {
    index: "03",
    tag: "Longevity",
    name: "Personal Mastery & Longevity",
    body: "Where longevity science, contemplative practice, and human optimisation converge — for high-performers, HNIs, and biological-age investors.",
    image: "/images/four-pillars/pillar-longevity.jpg",
    href: "/pillars/personal-mastery-longevity",
  },
  {
    index: "04",
    tag: "Wisdom & Science",
    name: "Wisdom & Modern Science",
    body: "Ancient wisdom held to modern intellectual standards — Vedic sciences, contemplative traditions, and the neuroscience of practice in dialogue.",
    image: "/images/four-pillars/pillar-wisdom.jpg",
    href: "/pillars/wisdom-modern-science",
  },
] as const;

export default function FourPillars() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); io.disconnect(); }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.section}${visible ? ` ${styles.visible}` : ""}`}
      aria-label="MysticVerse Global — The Four Pillars"
    >
      <div className={styles.inner}>

        {/* ── Header ────────────────────────────────────────── */}
        <div className={styles.header}>
          <div className={styles.headerText}>
            <div className={styles.eyebrowWrap}>
              <p className={styles.eyebrow}>The Programme</p>
            </div>
            <h2 className={styles.headline}>
              Four Pillars.<br />
              <span className="gradientText">One Curated Audience.</span>
            </h2>
          </div>
          <p className={styles.subCopy}>
            Each pillar speaks to a distinct audience and unlocks a distinct
            commercial vertical. All four converge on the main stage.
          </p>
        </div>

        <div className={styles.headerDivider} aria-hidden="true" />

        {/* ── Interactive split showcase ────────────────────── */}
        <div className={styles.showcase}>

          {/* Visual — single image that swaps with the active pillar */}
          <div className={styles.visual}>
            {PILLARS.map((p, i) => (
              <div
                key={p.index}
                className={`${styles.visualLayer}${i === active ? ` ${styles.visualActive}` : ""}`}
                aria-hidden={i !== active}
              >
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className={styles.visualImg}
                />
                <div className={styles.visualGrad} aria-hidden="true" />
                <div className={styles.visualMeta}>
                  <span className={styles.visualIndex}>{p.index} / 04</span>
                  <span className={styles.visualTag}>{p.tag}</span>
                </div>
              </div>
            ))}
          </div>

          {/* List — numbered rows; active one expands with detail */}
          <div className={styles.list}>
            {PILLARS.map((p, i) => (
              <div
                key={p.index}
                className={`${styles.row}${i === active ? ` ${styles.rowActive}` : ""}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <div className={styles.rowHead}>
                  <span className={styles.rowIndex}>{p.index}</span>
                  <h3 className={styles.rowTitle}>{p.name}</h3>
                </div>
                <div className={styles.rowDetail}>
                  <p className={styles.rowBody}>{p.body}</p>
                  <a href={p.href} className={styles.rowLink}>
                    Explore the Pillar
                    <span className={styles.arrow} aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

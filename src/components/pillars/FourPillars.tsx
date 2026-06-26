"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./FourPillars.module.css";

const PILLARS = [
  {
    index: "01",
    tag: "Flagship Pillar",
    name: "Conscious Luxury Living",
    body: "Wellness residences, branded communities, biophilic architecture, luxury retreats, and premium branded retail at the intersection of design and conscious living. The headline commercial pillar. Home of the Conscious Living Pavilion.",
    image: "/images/Four%20Pillars/Conscious%20Luxury%20Living.png",
    href: "/pillars/conscious-luxury-living",
  },
  {
    index: "02",
    tag: null,
    name: "Workplace Wellness & Human Capital",
    body: "Burnout as enterprise risk. Wellbeing as a board-level concern. The pillar built for CHROs, CPOs, and senior HR leaders — with CPE-aligned programming and a dedicated HR Leaders Hub.",
    image: "/images/Four%20Pillars/Workplace%20Wellness.png",
    href: "/pillars/workplace-wellness",
  },
  {
    index: "03",
    tag: null,
    name: "Personal Mastery & Longevity",
    body: "Where longevity science, contemplative practice, and human optimisation converge. For high-performers, HNIs, and the new generation of biological-age investors.",
    image: "/images/Four%20Pillars/Personal%20Mastery%20%26%20Longevity.png",
    href: "/pillars/personal-mastery-longevity",
  },
  {
    index: "04",
    tag: null,
    name: "Wisdom & Modern Science",
    body: "Ancient wisdom held to modern intellectual standards. Vedic sciences, contemplative traditions, neuroscience of practice, and the dialogues between them.",
    image: "/images/Four%20Pillars/Wisdom%20%26%20Modern%20Science.png",
    href: "/pillars/wisdom-modern-science",
  },
] as const;

export default function FourPillars() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); io.disconnect(); }
      },
      { threshold: 0.06 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const [featured, ...rest] = PILLARS;

  return (
    <section
      ref={ref}
      className={`${styles.section}${visible ? ` ${styles.visible}` : ""}`}
      aria-label="MysticVerse Global — The Four Pillars"
    >

      {/* ── Section header ──────────────────────────────────── */}
      <div className={styles.headerWrap}>
        <div className={styles.eyebrowWrap}>
          <p className={styles.eyebrow}>The Programme</p>
        </div>
        <h2 className={styles.headline}>
          Four Pillars.<br />One Curated Audience.
        </h2>
        <p className={styles.subCopy}>
          Each pillar speaks to a distinct audience and unlocks a distinct
          commercial vertical. All four converge on the main stage.
        </p>
      </div>

      {/* ── Header / featured divider ────────────────────────── */}
      <div className={styles.headerDivider} aria-hidden="true" />

      {/* ── Featured Pillar 01 ──────────────────────────────── */}
      <a href={featured.href} className={styles.featured}>

        {/* Full-bleed background image */}
        <Image
          src={featured.image}
          alt={featured.name}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          sizes="100vw"
        />

        {/* Left-weighted dark overlay — text legibility */}
        <div className={styles.featuredOverlay} aria-hidden="true" />

        {/* Text floats on top */}
        <div className={styles.featuredText}>
          <div className={styles.featuredIndexRow}>
            <span className={styles.featuredIndex}>{featured.index}</span>
            <span className={styles.indexRule} aria-hidden="true" />
          </div>
          <span className={styles.featuredTag}>{featured.tag}</span>
          <h2 className={styles.featuredTitle}>{featured.name}</h2>
          <p className={styles.featuredBody}>{featured.body}</p>
          <span className={styles.cta}>
            Explore the Pillar
            <span className={styles.ctaArrow} aria-hidden="true">&ensp;→</span>
          </span>
        </div>

      </a>

      {/* ── Divider ─────────────────────────────────────────── */}
      <div className={styles.subDivider} aria-hidden="true" />

      {/* ── Sub-pillars 02–04 ───────────────────────────────── */}
      <div className={styles.subGrid}>
        {rest.map((pillar) => (
          <a key={pillar.index} href={pillar.href} className={styles.subCard}>

            {/* Full-bleed background image */}
            <Image
              src={pillar.image}
              alt={pillar.name}
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              sizes="(max-width: 640px) 100vw, 33vw"
            />

            {/* Overlay */}
            <div className={styles.subOverlay} aria-hidden="true" />

            {/* Text over image */}
            <div className={styles.subCardContent}>
              <div className={styles.subIndexRow}>
                <span className={styles.subIndex}>{pillar.index}</span>
                <span className={styles.indexRule} aria-hidden="true" />
              </div>
              <h3 className={styles.subTitle}>{pillar.name}</h3>
              <p className={styles.subBody}>{pillar.body}</p>
              <span className={styles.cta}>
                Explore the Pillar
                <span className={styles.ctaArrow} aria-hidden="true">&ensp;→</span>
              </span>
            </div>

          </a>
        ))}
      </div>

    </section>
  );
}

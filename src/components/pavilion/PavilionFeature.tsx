"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./PavilionFeature.module.css";

/* The eight curated exhibit categories shown inside the Pavilion. */
const EXPERIENCES = [
  "Wellness Real Estate",
  "Luxury Wellness Brands",
  "Cosmic Art Gallery",
  "Healing & Energy Experiences",
  "Conscious Living Innovations",
  "Luxury Hospitality & Retreats",
  "Wellness Tourism",
  "Curated Networking",
] as const;

export default function PavilionFeature() {
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
      aria-label="The Conscious Living Pavilion"
    >
      {/* Full-bleed cinematic image */}
      <Image
        src="/images/pavilion/pavilion-a.jpg"
        alt="Biophilic architectural interior — the Conscious Living Pavilion."
        fill
        sizes="100vw"
        className={styles.bg}
      />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={`${styles.grain} noise`} aria-hidden="true" />

      {/* Two floating frosted-glass panels: narrative (left) + experiences (right) */}
      <div className={styles.inner}>

        {/* ── Narrative panel ─────────────────────────────── */}
        <div className={styles.panel}>
          <div className={styles.eyebrowWrap}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            <p className={styles.eyebrow}>The Flagship Zone</p>
          </div>

          <h2 className={styles.headline}>
            The Conscious<br />
            <span className="gradientText">Living Pavilion.</span>
          </h2>

          <p className={styles.subCopy}>
            An immersive showcase celebrating wellness, wellness real estate,
            cosmic art, holistic healing, luxury lifestyle and conscious
            innovation.
          </p>

          <p className={styles.body}>
            Meet visionary architects, wellness pioneers, cosmic artists, energy
            healers, luxury brands and destination partners through curated
            exhibits, experiential installations and transformative interactions.
          </p>

          <a href="/pavilion" className={styles.cta}>
            Step Inside the Pavilion
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </a>
        </div>

        {/* ── Featured Experiences panel ──────────────────── */}
        <div className={styles.experiences}>
          <p className={styles.expLabel}>
            <span className={styles.expLabelDot} aria-hidden="true" />
            Featured Experiences
          </p>
          <ul className={styles.expList}>
            {EXPERIENCES.map((name, i) => (
              <li key={name} className={styles.expItem}>
                <span className={styles.expIndex}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.expName}>{name}</span>
                <span className={styles.expArrow} aria-hidden="true">→</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./ConfirmedPartners.module.css";

const REST = [
  { name: "Manoyaa Alchemy",     src: "/images/partners/Manoyaa-Alchemy.avif",          tierLabel: "Prominent Exhibitor" },
  { name: "Ouna Cosmetics",      src: "/images/partners/Ouna Cosmetics.avif",           tierLabel: "Luxury Skincare" },
  { name: "Renophase",           src: "/images/partners/Renophase.png",                 tierLabel: "Luxury Skincare" },
  { name: "StackBerry Media",    src: "/images/partners/stackberry-media.avif",          tierLabel: "Media Partner" },
  { name: "KNeer",               src: "/images/partners/KNeer_Logo.avif",               tierLabel: "Supporting Partner" },
  { name: "SOMA Breath",         src: "/images/partners/soma.jpeg",                     tierLabel: "Breathwork Partner" },
  { name: "Taj",                 src: "/images/partners/taj.jpg",                       tierLabel: "Venue Partner" },
] as const;

export default function ConfirmedPartners() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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
      aria-label="Confirmed partners and sponsors"
    >
      <div className={styles.inner}>

        {/* ── Header ────────────────────────────────────────── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.eyebrowWrap}>
              <p className={styles.eyebrow}>Partners &amp; Collaborators</p>
            </div>
            <h2 className={styles.headline}>Already In The Room.</h2>
          </div>
          <p className={styles.intro}>
            A curated network of brands and institutions already committed to
            MysticVerse Global 2026. Further partners confirmed weekly.
          </p>
        </div>

        {/* ── Partner grid (hairline table) ─────────────────── */}
        <div className={styles.grid}>
          {REST.map((p) => (
            <div key={p.name} className={styles.cell}>
              <div className={styles.logoWrap}>
                <Image
                  src={p.src}
                  alt={`${p.name} — MysticVerse Global 2026`}
                  fill
                  sizes="(min-width: 760px) 40vw, 65vw"
                  className={styles.logoImg}
                />
              </div>
              <span className={styles.tier}>{p.tierLabel}</span>
            </div>
          ))}

          {/* Blank cells padding out the final row — the grid paints the
              hairlines via its own background, so an unfilled slot would
              otherwise read as a grey block. */}
          {Array.from({ length: (3 - (REST.length % 3)) % 3 }).map((_, i) => (
            <div key={`filler-${i}`} className={styles.cellFiller} aria-hidden="true" />
          ))}
        </div>

        {/* ── CTAs ──────────────────────────────────────────── */}
        <div className={styles.ctaRow}>
          <a href="/sponsor" className={styles.ctaOutlined}>
            See all confirmed partners
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </a>
          <a href="/sponsor" className={styles.ctaFilled}>
            Become a partner
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}

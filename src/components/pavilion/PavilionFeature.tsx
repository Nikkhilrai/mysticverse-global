"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./PavilionFeature.module.css";

const STATS = [
  { value: "500 sqm", label: "Zone Footprint" },
  { value: "20+",     label: "Curated Brands" },
  { value: "HNI-First", label: "Audience Profile" },
] as const;

export default function PavilionFeature() {
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
      { threshold: 0.06 },
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
      <div className={styles.inner}>

        {/* ── Image panel (left, full-bleed) ───────────────── */}
        <div className={styles.imageColumn}>
          <Image
            src="/images/sections/Conscious Living Pavilion.png"
            alt="The Conscious Living Pavilion — biophilic interior at MysticVerse Global 2026."
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            sizes="(max-width: 900px) 100vw, 58vw"
          />
          <div className={styles.imageOverlay} aria-hidden="true" />
        </div>

        {/* ── Text panel (right) ───────────────────────────── */}
        <div className={styles.textColumn}>

          <div className={styles.eyebrowWrap}>
            <p className={styles.eyebrow}>The Flagship Zone</p>
          </div>

          <h2 className={styles.headline}>
            The Conscious<br />Living Pavilion.
          </h2>

          <p className={styles.subCopy}>
            Where wellness real estate and luxury retail share the same
            room — because they speak to the same buyer.
          </p>

          <span className={styles.dividerRule} aria-hidden="true" />

          <p className={styles.body}>
            Five hundred square metres at the heart of the venue. Walkthrough
            mock-ups of branded wellness residences. Biophilic and
            circadian-lighting installations co-built with developers and design
            houses. Rare crystal and ceremonial jewellery houses placed beside
            the architects shaping the next decade of conscious communities. The
            Pavilion is not a booth row. It is a curated experience designed for
            the discerning eye of an HNI who will spend USD&nbsp;12&nbsp;million
            on a wellness villa and USD&nbsp;12,000 on a Himalayan crystal in the
            same week — and considers neither extravagant.
          </p>

          {/* Stats row */}
          <div className={styles.stats} aria-label="Pavilion at a glance">
            {STATS.map((s, i) => (
              <div key={s.label} className={styles.statBlock}>
                {i > 0 && <span className={styles.statDivider} aria-hidden="true" />}
                <div className={styles.stat}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              </div>
            ))}
          </div>

          <a href="/pavilion" className={styles.cta}>
            Step Inside the Pavilion
            <span className={styles.ctaArrow} aria-hidden="true">&ensp;→</span>
          </a>

        </div>


      </div>
    </section>
  );
}

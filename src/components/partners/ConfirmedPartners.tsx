"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./ConfirmedPartners.module.css";

const ANCHOR = {
  name:      "Evrenroo",
  src:       "/images/Confirmed Partners/Evrenroo.avif",
  tierLabel: "Anchor Partner",
};

const REST = [
  { name: "Manoyaa Alchemy",     src: "/images/Confirmed Partners/Manoyaa-Alchemy.avif",          tierLabel: "Prominent Exhibitor"  },
  { name: "Cosmicx Healing Art", src: "/images/Confirmed Partners/Cosmicx-healing-Art-Logo.avif", tierLabel: "Prominent Exhibitor"  },
  { name: "Ouna Cosmetics",      src: "/images/Confirmed Partners/Ouna Cosmetics.avif",           tierLabel: "Luxury Skincare"      },
  { name: "Renophase",           src: "/images/Confirmed Partners/Renophase.png",                 tierLabel: "Luxury Skincare"      },
  { name: "StackBerry Media",    src: "/images/Confirmed Partners/stackberry-media.avif",          tierLabel: "Media Partner"        },
  { name: "KNeer",               src: "/images/Confirmed Partners/KNeer_Logo.avif",               tierLabel: "Supporting Partner"   },
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
      { threshold: 0.1 },
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

        {/* ── Header ───────────────────────────────────────── */}
        <div className={styles.header}>
          <div>
            <div className={styles.eyebrowWrap}>
              <p className={styles.eyebrow}>Partners &amp; Collaborators</p>
            </div>
            <h2 className={styles.headline}>Already In The Room.</h2>
          </div>
          <p className={styles.subText}>
            A curated network of brands and institutions committed to
            MysticVerse Global 2026. Further partners confirmed weekly.
          </p>
        </div>

        <div className={styles.divider} aria-hidden="true" />

        {/* ── Anchor partner ───────────────────────────────── */}
        <div className={styles.anchorTier}>
          <p className={styles.tierLabel}>{ANCHOR.tierLabel}</p>
          <div className={styles.anchorLogoWrap}>
            <Image
              src={ANCHOR.src}
              alt={`${ANCHOR.name} — Anchor Partner, MysticVerse Global 2026`}
              fill
              sizes="(min-width: 900px) 25vw, 60vw"
              className={styles.logoImage}
            />
          </div>
        </div>

        {/* ── Supporting partners ───────────────────────────── */}
        <div className={styles.partnerTier}>
          <p className={styles.partnerTierLabel}>Supporting Partners</p>
          <div className={styles.logoGrid}>
            {REST.map((p) => (
              <div key={p.name} className={styles.logoItem}>
                <div className={styles.logoWrap}>
                  <Image
                    src={p.src}
                    alt={`${p.name} — MysticVerse Global 2026`}
                    fill
                    sizes="(min-width: 640px) 14vw, 28vw"
                    className={styles.logoImage}
                  />
                </div>
                <p className={styles.logoLabel}>{p.tierLabel}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTAs ─────────────────────────────────────────── */}
        <div className={styles.ctaRow}>
          <a href="/partners" className={styles.ctaOutlined}>
            See all confirmed partners
            <span className={styles.ctaArrow} aria-hidden="true">&ensp;→</span>
          </a>
          <a href="/partner-with-us" className={styles.ctaFilled}>
            Become a partner
            <span className={styles.ctaArrow} aria-hidden="true">&ensp;→</span>
          </a>
        </div>

      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./PavilionPartner.module.css";
import PavilionBriefModal from "./PavilionBriefModal";

type Tier = {
  label: string;
  name: string;
  desc: string;
  note: string | null;
  featured?: boolean;
};

// Pricing intentionally omitted — tiers not finalised.
const TIERS: Tier[] = [
  {
    label: "Title Partner",
    name: "Conscious Luxury Living Partner",
    desc: "Title of the entire Pavilion. Twelve months of editorial association.",
    note: "Limited to one brand",
    featured: true,
  },
  {
    label: "Real Estate",
    name: "Pavilion Real Estate Booth",
    desc: "Curated villa walkthrough placement + Pavilion stage pitch slot.",
    note: "Ten available",
  },
  {
    label: "Mystic Tier",
    name: "Pavilion Retail Curation",
    desc: "Curated retail placement for rare crystal, ceremonial jewellery, sacred fragrance, and wellness home brands.",
    note: null,
  },
  {
    label: "Pillar Tier",
    name: "Sustainable Living Partner",
    desc: "Sponsors the biophilic installation and the eco-architecture panel. For green developers and ESG-aligned brands.",
    note: null,
  },
];

export default function PavilionPartner() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);

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
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-labelledby="pavilion-partner-heading"
    >
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.head}>
          <div className={styles.overlineWrap}>
            <span className={styles.overlineRule} aria-hidden="true" />
            <p className={styles.overline}>Partnership</p>
          </div>
          <h2 id="pavilion-partner-heading" className={styles.heading}>
            Become a Pavilion <span className="gradientText">partner.</span>
          </h2>
          <p className={styles.sub}>
            Take the title, a booth, a curation, or a pillar of the flagship
            floor — four ways to own a share of the room.
          </p>
        </header>

        <ul className={styles.grid}>
          {TIERS.map((t, i) => (
            <li
              key={t.name}
              className={`${styles.card}${t.featured ? ` ${styles.featured}` : ""}`}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className={styles.edge} aria-hidden="true" />
              <div className={styles.cardTop}>
                <span
                  className={`${styles.chip}${t.featured ? ` ${styles.chipFeatured}` : ""}`}
                >
                  {t.label}
                </span>
                <span className={styles.index} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className={styles.name}>{t.name}</h3>
              <p className={styles.desc}>{t.desc}</p>

              <div className={styles.cardFoot}>
                {t.note ? (
                  <span className={styles.note}>
                    <span className={styles.dot} aria-hidden="true" />
                    {t.note}
                  </span>
                ) : (
                  <span className={styles.noteMuted}>By application</span>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.ctas}>
          <button
            type="button"
            className={styles.ctaPrimary}
            onClick={() => setBriefOpen(true)}
          >
            Request the Pavilion Brief
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </button>
          <Link href="/contact" className={styles.ctaSecondary}>
            Speak with our team
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <PavilionBriefModal open={briefOpen} onClose={() => setBriefOpen(false)} />
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AwardsCategories.module.css";

/* Seven category awards; the eighth — Global Impact Flagship Honor — is
   the flagship and is given its own treatment below the ledger. Names
   and descriptions are verbatim from the 41-category catalogue in
   src/lib/awardCategories.ts, so every "Nominate for this award" link
   below pre-selects correctly on /nomination-form. This is a teaser of
   the full 41 — see that page for the complete list. */
const CATEGORIES = [
  {
    no: "01",
    name: "Conscious Living Project of the Year",
    desc: "Awarded to a landmark wellness real estate development redefining sustainable living.",
  },
  {
    no: "02",
    name: "HR Wellness Initiative of the Year",
    desc: "Awarded to an enterprise workplace wellbeing programme with proven organizational outcomes.",
  },
  {
    no: "03",
    name: "Longevity Innovator of the Year",
    desc: "Awarded to a pioneer, residence, or technology platform advancing longevity science.",
  },
  {
    no: "04",
    name: "Conscious Brand of the Year",
    desc: "Awarded to a luxury retail, consumer, or health brand setting new standards in conscious commerce.",
  },
  {
    no: "05",
    name: "Wisdom Voice of the Year",
    desc: "Awarded to a teacher, author, or platform translating ancient traditions for modern global audiences.",
  },
  {
    no: "06",
    name: "Conscious Architecture & Biophilic Design Award",
    desc: "Awarded to a design studio or architect leading human-centric and biophilic environments.",
  },
  {
    no: "07",
    name: "Wellness Hospitality Operator of the Year",
    desc: "Recognising luxury retreats, resorts, and branded residences delivering holistic guest well-being.",
  },
];

export default function AwardsCategories() {
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
      { threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="categories"
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-labelledby="awards-categories-heading"
    >
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.head}>
          <div className={styles.overlineWrap}>
            <span className={styles.overlineRule} aria-hidden="true" />
            <p className={styles.overline}>Eight Honours</p>
          </div>
          <h2 id="awards-categories-heading" className={styles.heading}>
            The categories.
          </h2>
          <p className={styles.deck}>
            Seven category awards across the four pillars — and one flagship
            honour that crosses all of them.
          </p>
        </header>

        {/* ── The ledger ──────────────────────────────────── */}
        <ol className={styles.ledger}>
          {CATEGORIES.map((c, i) => (
            <li
              key={c.no}
              className={styles.item}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className={styles.no} aria-hidden="true">{c.no}</span>
              <div className={styles.itemBody}>
                <h3 className={styles.name}>{c.name}</h3>
                <p className={styles.desc}>{c.desc}</p>
                <a
                  href={`/nomination-form?category=${encodeURIComponent(c.name)}`}
                  className={styles.itemCta}
                >
                  Nominate for this award
                  <span className={styles.arrow} aria-hidden="true">→</span>
                </a>
              </div>
            </li>
          ))}
        </ol>

        {/* ── The flagship ────────────────────────────────── */}
        <article className={styles.flagship}>
          <span className={styles.flagshipBadge}>The Flagship Award</span>

          <div className={styles.flagshipGrid}>
            <div className={styles.celestial} aria-hidden="true">
              <svg viewBox="0 0 200 200" fill="none">
                <circle className={styles.ring} cx="100" cy="100" r="86" stroke="url(#awCel)" strokeWidth="1" opacity="0.24" />
                <circle className={styles.ring} cx="100" cy="100" r="66" stroke="url(#awCel)" strokeWidth="1" opacity="0.34" />
                <circle className={styles.ring} cx="100" cy="100" r="46" stroke="url(#awCel)" strokeWidth="1" opacity="0.5" />
                <path
                  className={styles.celStar}
                  d="M100 46 L108 88 L150 80 L114 100 L150 120 L108 112 L100 154 L92 112 L50 120 L86 100 L50 80 L92 88 Z"
                  fill="url(#awCel)"
                />
                {/* orbiting marks */}
                <circle cx="100" cy="14" r="2.5" fill="#F5C45A" />
                <circle cx="186" cy="100" r="2" fill="#C77DFF" />
                <circle cx="100" cy="186" r="2" fill="#7C5CFF" />
                <circle cx="14" cy="100" r="2" fill="#F5C45A" opacity="0.7" />
                <defs>
                  <linearGradient id="awCel" x1="0" y1="0" x2="200" y2="200">
                    <stop offset="0%" stopColor="#F5C45A" />
                    <stop offset="50%" stopColor="#C77DFF" />
                    <stop offset="100%" stopColor="#7C5CFF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className={styles.flagshipCopy}>
              <span className={styles.flagshipNo} aria-hidden="true">08</span>
              <h3 className={styles.flagshipName}>Global Impact Flagship Honor</h3>
              <p className={styles.flagshipDesc}>
                Crossing all four pillars, awarded to an individual or organization
                creating profound worldwide transformational change.
              </p>
              <a
                href={`/nomination-form?category=${encodeURIComponent("Global Impact Flagship Honor")}`}
                className={styles.itemCta}
              >
                Nominate for this award
                <span className={styles.arrow} aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </article>

        {/* ── CTAs ────────────────────────────────────────── */}
        <div className={styles.ctaRow}>
          <a href="/nomination-form" className={styles.ctaPrimary}>
            Nominate a project
            <span className={styles.arrow} aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

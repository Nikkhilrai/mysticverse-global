"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./WhyDubaiMarket.module.css";

const PROJECTS = [
  { name: "Akala Residences", meta: "Arada · DIFC" },
  { name: "Keturah Resort", meta: "WELL-certified by Delos · The Creek" },
  { name: "Sobha Hartland", meta: "Sobha" },
  { name: "Sobha Elwood", meta: "Sobha" },
  { name: "The Sustainable City", meta: "Diamond Developers" },
  { name: "The Wilds", meta: "Aldar" },
  { name: "Tilal Al Ghaf", meta: "Majid Al Futtaim" },
  { name: "EYWA Dubai", meta: "Dubai" },
];

export default function WhyDubaiMarket() {
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
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-labelledby="why-market-heading"
    >
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.head}>
          <div className={styles.overlineWrap}>
            <span className={styles.overlineRule} aria-hidden="true" />
            <p className={styles.overline}>The Region&apos;s Story</p>
          </div>
          <h2 id="why-market-heading" className={styles.heading}>
            Why this story has to be{" "}
            <span className="gradientText">told here.</span>
          </h2>
        </header>

        {/* Macro growth stat */}
        <div className={styles.stat}>
          <div className={styles.figFrom}>
            <span className={styles.figYear}>2024</span>
            <span className={styles.figVal}>
              <span className={styles.cur}>AED</span> 503M
            </span>
          </div>

          <div className={styles.rise} aria-hidden="true">
            <span className={styles.riseBadge}>≈ 7× in 3 years</span>
            <svg viewBox="0 0 160 60" className={styles.riseSvg} preserveAspectRatio="none">
              <path className={styles.riseLine} d="M4 54 L156 8" fill="none" />
              <path className={styles.riseHead} d="M156 8 l-13 1.5 M156 8 l-4 12.5" fill="none" />
            </svg>
          </div>

          <div className={styles.figTo}>
            <span className={styles.figYear}>2027 · projected</span>
            <span className={`${styles.figVal} ${styles.figValTo}`}>
              <span className={styles.cur}>AED</span>{" "}
              <span className="gradientText">31B</span>
            </span>
          </div>
        </div>

        <p className={styles.policy}>
          A roughly seven-fold expansion in three years. The country&apos;s{" "}
          <strong className={styles.policyStrong}>Wellbeing 2031</strong> agenda
          has elevated wellness from amenity to policy.
        </p>

        {/* Named developments */}
        <div className={styles.develop}>
          <span className={styles.developLabel}>
            Taking shape on the ground — named developments
          </span>
          <ul className={styles.projects}>
            {PROJECTS.map((p, i) => (
              <li
                key={p.name}
                className={styles.project}
                style={{ "--i": i } as React.CSSProperties}
              >
                <span className={styles.mark} aria-hidden="true" />
                <div className={styles.projectBody}>
                  <span className={styles.projectName}>{p.name}</span>
                  <span className={styles.projectMeta}>{p.meta}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Ras Al Khaimah stat */}
        <div className={styles.rak}>
          <span className={styles.rakBar} aria-hidden="true" />
          <p className={styles.rakText}>
            <span className={styles.rakPlace}>Ras Al Khaimah</span> has emerged
            in parallel —{" "}
            <span className={styles.rakVal}>AED 15B+</span> in transactions in
            2024 alone.
          </p>
        </div>

        {/* Closer + CTA */}
        <div className={styles.closer}>
          <p className={styles.closerText}>
            MysticVerse Global 2026 is the platform on which these developers,
            their architects, and their buyers will be{" "}
            <span className={styles.emph}>in the same room.</span>
          </p>
          <Link href="/journal" className={styles.cta}>
            Read the Conscious Luxury Briefing
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

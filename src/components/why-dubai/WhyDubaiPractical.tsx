"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./WhyDubaiPractical.module.css";

type Card = {
  icon: React.ReactNode;
  kicker: string;
  title: string;
  points: string[];
};

const CARDS: Card[] = [
  {
    kicker: "Where to stay",
    title: "Partner hotels, minutes away",
    points: [
      "A curated set of partner hotels within 15 minutes of the venue — four- and five-star houses across Downtown, DIFC and the Creek.",
      "Preferential delegate rates, released with your registration.",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 18v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
        <path d="M3 12V7m18 5V7" />
        <path d="M7 12v-1a1 1 0 0 1 1-1h3v3" />
        <path d="M3 18v2m18-2v2" />
      </svg>
    ),
  },
  {
    kicker: "Visas & entry",
    title: "A straightforward welcome",
    points: [
      "Many nationalities enter on a visa-on-arrival; others apply online in a few days.",
      "We issue official invitation letters for delegates who need them.",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <circle cx="12" cy="10" r="3" />
        <path d="M9 16.5h6" />
      </svg>
    ),
  },
  {
    kicker: "Getting here",
    title: "The world's easiest hop",
    points: [
      "Dubai International (DXB) is 20–30 minutes from the venue, with direct flights from 200+ cities.",
      "Metro, taxi and chauffeur on tap; curated transfers for VIP guests.",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M22 3 2 10.5l6.5 2.5L11 20l3-4.5L21 4z" />
        <path d="M8.5 13 21 4" />
      </svg>
    ),
  },
];

export default function WhyDubaiPractical() {
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
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-labelledby="why-practical-heading"
    >
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.head}>
          <div className={styles.overlineWrap}>
            <span className={styles.overlineRule} aria-hidden="true" />
            <p className={styles.overline}>The Practical Part</p>
          </div>
          <h2 id="why-practical-heading" className={styles.heading}>
            Getting <span className="gradientTextInk">here.</span>
          </h2>
          <p className={styles.sub}>
            Everything a delegate or a VIP guest needs to arrive without a
            second thought.
          </p>
        </header>

        <ul className={styles.grid}>
          {CARDS.map((card, i) => (
            <li
              key={card.kicker}
              className={styles.card}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className={styles.edge} aria-hidden="true" />
              <span className={styles.icon}>{card.icon}</span>
              <span className={styles.kicker}>{card.kicker}</span>
              <h3 className={styles.title}>{card.title}</h3>
              <ul className={styles.points}>
                {card.points.map((p, j) => (
                  <li key={j} className={styles.point}>{p}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className={styles.foot}>
          <p className={styles.footNote}>
            A full logistics pack — hotels, transfers and visa support —
            follows your registration.
          </p>
          <Link href="/contact" className={styles.cta}>
            Talk to our team
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

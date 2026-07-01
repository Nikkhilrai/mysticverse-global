"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./PavilionPrivate.module.css";

type Room = {
  index: string;
  kicker: string;
  title: string;
  desc: string;
  meta: string;
  cta: string;
  href: string;
};

// NOTE: HNI Lounge & Investor Circle get their own sub-pages in Phase 2;
// for now they route to /contact. Sunset links to the finale on this page.
const ROOMS: Room[] = [
  {
    index: "I",
    kicker: "Private Lounge",
    title: "HNI Lounge",
    desc: "A quiet floor above the noise — where collectors, principals and family offices meet developers and curators, away from the crowd.",
    meta: "By invitation",
    cta: "Request access",
    href: "/contact",
  },
  {
    index: "II",
    kicker: "Capital Circle",
    title: "Wellness Investor Circle",
    desc: "A closed room for the capital behind conscious living — funds, family offices and operators shaping the next wave of wellness real estate.",
    meta: "Members & invited guests",
    cta: "Request access",
    href: "/contact",
  },
  {
    index: "III",
    kicker: "Off-site Finale",
    title: "Sunset Networking",
    desc: "When Day 1 closes, eighty guests continue the conversation at a single luxury property as the sun goes down.",
    meta: "Day 1, at dusk",
    cta: "See the finale",
    href: "#pavilion-sunset-heading",
  },
];

export default function PavilionPrivate() {
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
      aria-labelledby="pavilion-private-heading"
    >
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.head}>
          <div className={styles.overlineWrap}>
            <span className={styles.overlineRule} aria-hidden="true" />
            <p className={styles.overline}>By Invitation</p>
          </div>
          <h2 id="pavilion-private-heading" className={styles.heading}>
            Three rooms within the{" "}
            <span className="gradientText">room.</span>
          </h2>
          <p className={styles.sub}>
            Beyond the open floor, the Pavilion holds three private layers — for
            the people the whole room is built around.
          </p>
        </header>

        <ul className={styles.grid}>
          {ROOMS.map((room, i) => (
            <li
              key={room.title}
              className={styles.item}
              style={{ "--i": i } as React.CSSProperties}
            >
              <Link href={room.href} className={styles.card}>
                <span className={styles.edge} aria-hidden="true" />
                <div className={styles.cardTop}>
                  <span className={styles.kicker}>{room.kicker}</span>
                  <span className={styles.index} aria-hidden="true">
                    {room.index}
                  </span>
                </div>
                <h3 className={styles.title}>{room.title}</h3>
                <p className={styles.desc}>{room.desc}</p>
                <div className={styles.cardFoot}>
                  <span className={styles.meta}>{room.meta}</span>
                  <span className={styles.cta}>
                    {room.cta}
                    <span className={styles.ctaArrow} aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

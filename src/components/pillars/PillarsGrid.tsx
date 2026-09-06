"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./PillarsGrid.module.css";

const PILLARS = [
  {
    index: "01",
    tag: "Flagship Pillar",
    name: "Conscious Luxury Living",
    body: "Wellness residences, branded communities, biophilic architecture, and premium retail at the intersection of design and conscious living. The headline commercial vertical.",
    image: "/images/four-pillars/conscious-luxury-living.jpg",
    href: "/pillars/conscious-luxury-living",
  },
  {
    index: "02",
    tag: "Human Capital",
    name: "Workplace Wellness & Human Capital",
    body: "Burnout as enterprise risk. Wellbeing as a board-level concern — built for CHROs, CPOs, and senior HR leaders steering human capital strategy.",
    image: "/images/four-pillars/pillar-workplace.jpg",
    href: "/pillars/workplace-wellness",
  },
  {
    index: "03",
    tag: "Longevity",
    name: "Personal Mastery & Longevity",
    body: "Where longevity science, contemplative practice, and human optimisation converge — for high-performers, private wealth, and biological-age investors.",
    image: "/images/four-pillars/pillar-longevity.jpg",
    href: "/pillars/personal-mastery-longevity",
  },
  {
    index: "04",
    tag: "Wisdom & Science",
    name: "Wisdom & Modern Science",
    body: "Ancient wisdom held to modern intellectual standards — Vedic sciences, contemplative traditions, and the neuroscience of practice in dialogue.",
    image: "/images/four-pillars/pillar-wisdom.jpg",
    href: "/pillars/wisdom-modern-science",
  },
] as const;

export default function PillarsGrid() {
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
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-labelledby="pillars-grid-heading"
    >
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 id="pillars-grid-heading" className={styles.introLead}>
            We organised the platform this way for a reason.
          </h2>
          <p className={styles.introBody}>
            A CHRO and a wellness real estate developer cannot share an agenda{" "}
            <span className={styles.emphMuted}>by accident</span> — but they can
            share an audience <span className={styles.emph}>by design</span>.
            Each pillar is a track, a sponsorship category, an editorial
            commitment, and a physical zone inside the venue.
          </p>
        </div>

        <ul className={styles.grid}>
          {PILLARS.map((p, i) => (
            <li
              key={p.index}
              className={styles.card}
              style={{ "--i": i } as React.CSSProperties}
            >
              <Link href={p.href} className={styles.cardLink}>
                <div className={styles.media}>
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 900px) 100vw, 46vw"
                    className={styles.img}
                  />
                  <span className={styles.grade} aria-hidden="true" />
                  <span className={styles.metaTop}>
                    <span className={styles.index}>{p.index} / 04</span>
                    <span className={styles.tag}>{p.tag}</span>
                  </span>
                </div>

                <div className={styles.body}>
                  <h3 className={styles.name}>{p.name}</h3>
                  <p className={styles.desc}>{p.body}</p>
                  <span className={styles.link}>
                    Explore the Pillar
                    <span className={styles.arrow} aria-hidden="true">→</span>
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

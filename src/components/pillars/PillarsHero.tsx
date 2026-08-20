"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./PillarsHero.module.css";

const STRIPS = [
  { img: "/images/four-pillars/conscious-luxury-living.jpg", no: "01", name: "Conscious Luxury Living" },
  { img: "/images/four-pillars/pillar-workplace.jpg", no: "02", name: "Workplace Wellness" },
  { img: "/images/four-pillars/pillar-longevity.jpg", no: "03", name: "Personal Mastery & Longevity" },
  { img: "/images/four-pillars/pillar-wisdom.jpg", no: "04", name: "Wisdom & Modern Science" },
];

export default function PillarsHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-label="The Four Pillars"
    >
      <div className={styles.strips} aria-hidden="true">
        {STRIPS.map((s, i) => (
          <div
            key={s.no}
            className={styles.strip}
            style={{ "--i": i } as React.CSSProperties}
          >
            <span className={styles.stripInner}>
              <Image
                src={s.img}
                alt=""
                fill
                priority={i < 2}
                sizes="(max-width: 900px) 50vw, 25vw"
                className={styles.stripImg}
              />
            </span>
          </div>
        ))}
      </div>

      <div className={styles.overlay} aria-hidden="true" />
      <div className={`${styles.grain} noise`} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.overlineWrap}>
          <span className={styles.overlineRule} aria-hidden="true" />
          <p className={styles.overline}>The Programme</p>
        </div>
        <h1 className={styles.headline}>
          Four pillars.<br />
          <span className="gradientText">One curated audience.</span>
        </h1>
        <p className={styles.sub}>
          MysticVerse Global is built as four parallel conversations under one
          roof. Each opens to its own audience. All four meet on the main stage.
        </p>
      </div>

      <div className={styles.legend} aria-hidden="true">
        {STRIPS.map((s) => (
          <span key={s.no} className={styles.legendItem}>
            <span className={styles.legendNo}>{s.no}</span>
            {s.name}
          </span>
        ))}
      </div>
    </section>
  );
}

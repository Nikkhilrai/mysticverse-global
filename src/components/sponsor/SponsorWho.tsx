"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SponsorWho.module.css";

const SECTORS = [
  "Wellness real estate developers",
  "Branded residence operators",
  "Corporate wellness platforms",
  "Longevity clinics",
  "Luxury retail houses",
  "Hospitality groups",
  "Tourism boards",
  "Wellness-tech innovators",
];

export default function SponsorWho() {
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
      aria-labelledby="sponsor-who-heading"
    >
      <div className={styles.inner}>
        <div className={styles.overlineWrap}>
          <span className={styles.overlineRule} aria-hidden="true" />
          <p className={styles.overline}>Who sponsors MysticVerse</p>
        </div>

        <h2 id="sponsor-who-heading" className={styles.lead}>
          Sponsorship at MysticVerse Global is not a logo placement. It is a{" "}
          <span className={styles.emph}>positioning decision</span> — to
          associate your brand with the platform on which the conscious luxury
          economy is becoming visible.
        </h2>

        <div className={styles.sectors}>
          <p className={styles.sectorsLabel}>Our sponsors include</p>
          <ul className={styles.sectorList}>
            {SECTORS.map((s, i) => (
              <li
                key={s}
                className={styles.sector}
                style={{ "--i": i } as React.CSSProperties}
              >
                <span className={styles.sectorMark} aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

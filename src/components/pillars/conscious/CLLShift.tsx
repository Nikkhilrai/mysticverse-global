"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CLLShift.module.css";

const NEW_TERMS = [
  "wellness living",
  "conscious community",
  "biophilic design",
  "longevity",
  "emotional wellbeing",
];

const CONVENES = [
  {
    no: "01",
    text: "The developers building the next decade of wellness residences",
  },
  { no: "02", text: "The design houses and architects shaping them" },
  {
    no: "03",
    text: "The luxury retail and ceremonial brands that furnish them",
  },
  { no: "04", text: "The private wealth choosing them" },
];

export default function CLLShift() {
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
      aria-labelledby="cll-shift-heading"
    >
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.overlineWrap}>
          <span className={styles.overlineRule} aria-hidden="true" />
          <p className={styles.overline}>The Shift</p>
        </div>

        <h2 id="cll-shift-heading" className={styles.lead}>
          Premium real estate is no longer sold in{" "}
          <span className={styles.old}>square feet</span>,{" "}
          <span className={styles.old}>towers</span>, or{" "}
          <span className={styles.old}>amenities</span>. It is sold in{" "}
          {NEW_TERMS.map((t, i) => (
            <span key={t}>
              <span
                className={styles.newTerm}
                style={{ "--i": i } as React.CSSProperties}
              >
                {t}
              </span>
              {i < NEW_TERMS.length - 1
                ? i === NEW_TERMS.length - 2
                  ? ", and "
                  : ", "
                : "."}
            </span>
          ))}
        </h2>

        <p className={styles.sub}>
          The buyer wants a home that recovers them — and the objects, rituals,
          and surroundings that match.
        </p>

        <div className={styles.convene}>
          <p className={styles.conveneLabel}>
            <span className={styles.pillarName}>Conscious Luxury Living</span> is
            the MysticVerse pillar built around this shift. It convenes:
          </p>
          <ul className={styles.conveneList}>
            {CONVENES.map((c, i) => (
              <li
                key={c.no}
                className={styles.conveneItem}
                style={{ "--i": i } as React.CSSProperties}
              >
                <span className={styles.conveneNo}>{c.no}</span>
                <span className={styles.conveneText}>{c.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

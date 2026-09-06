"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PMLShift.module.css";

const OLD_TERMS = ["hours slept", "willpower", "hustle"];

const NEW_TERMS = [
  "biomarkers",
  "healthspan",
  "recovery science",
  "nervous system regulation",
  "biological age",
];

const CONVENES = [
  { no: "01", text: "The longevity clinic leaders and biomarker scientists" },
  { no: "02", text: "The integrative and functional-medicine physicians" },
  { no: "03", text: "The contemplative teachers training focus under pressure" },
  { no: "04", text: "The high performers and biological-age investors funding what's next" },
];

export default function PMLShift() {
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
      aria-labelledby="pml-shift-heading"
    >
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.overlineWrap}>
          <span className={styles.overlineRule} aria-hidden="true" />
          <p className={styles.overline}>The Shift</p>
        </div>

        <h2 id="pml-shift-heading" className={styles.lead}>
          Personal performance is no longer measured in{" "}
          {OLD_TERMS.map((t, i) => (
            <span key={t}>
              <span className={styles.old}>{t}</span>
              {i < OLD_TERMS.length - 1 ? ", " : ""}
            </span>
          ))}
          . It is measured in{" "}
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
          The high performer no longer optimises by instinct — they optimise
          by data, protocol, and evidence.
        </p>

        <div className={styles.convene}>
          <p className={styles.conveneLabel}>
            <span className={styles.pillarName}>Personal Mastery & Longevity</span>{" "}
            is the MysticVerse pillar built around this shift. It convenes:
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

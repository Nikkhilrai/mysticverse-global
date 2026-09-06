"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./WMSShift.module.css";

const OLD_TERMS = ["faith", "folklore", "anecdote"];

const NEW_TERMS = [
  "neuroscience",
  "clinical psychology",
  "integrative biology",
  "practitioner standards",
  "structured frameworks",
];

const CONVENES = [
  { no: "01", text: "The traditional lineage holders carrying centuries of practice" },
  { no: "02", text: "The neuroscientists studying what that practice does to the brain" },
  { no: "03", text: "The scholars translating tradition into structured frameworks" },
  { no: "04", text: "The credentialed practitioners meeting rigorous professional standards" },
];

export default function WMSShift() {
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
      aria-labelledby="wms-shift-heading"
    >
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.overlineWrap}>
          <span className={styles.overlineRule} aria-hidden="true" />
          <p className={styles.overline}>The Shift</p>
        </div>

        <h2 id="wms-shift-heading" className={styles.lead}>
          Ancient wisdom is no longer taken on{" "}
          {OLD_TERMS.map((t, i) => (
            <span key={t}>
              <span className={styles.old}>{t}</span>
              {i < OLD_TERMS.length - 1 ? ", " : ""}
            </span>
          ))}
          . It is examined through{" "}
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
          The lineage holder and the neuroscientist are no longer separate
          conversations — they now share a single standard of rigor.
        </p>

        <div className={styles.convene}>
          <p className={styles.conveneLabel}>
            <span className={styles.pillarName}>Wisdom & Modern Science</span>{" "}
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

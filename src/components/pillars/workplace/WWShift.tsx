"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./WWShift.module.css";

const OLD_TERMS = ["yoga sessions", "wellness Fridays", "perks"];

const NEW_TERMS = [
  "enterprise risk",
  "retention economics",
  "workforce policy",
  "leadership resilience",
  "boardroom authority",
];

const CONVENES = [
  { no: "01", text: "The CHROs and Chief People Officers writing the policy" },
  { no: "02", text: "The vetted wellbeing and human-capital solution providers" },
  { no: "03", text: "The resilience coaches and workplace-leadership trainers" },
  { no: "04", text: "The enterprise decision-makers evaluating what's next" },
];

export default function WWShift() {
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
      aria-labelledby="ww-shift-heading"
    >
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.overlineWrap}>
          <span className={styles.overlineRule} aria-hidden="true" />
          <p className={styles.overline}>The Shift</p>
        </div>

        <h2 id="ww-shift-heading" className={styles.lead}>
          Employee wellbeing is no longer measured in{" "}
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
          The board wants proof that wellbeing returns value — not another
          perk line item.
        </p>

        <div className={styles.convene}>
          <p className={styles.conveneLabel}>
            <span className={styles.pillarName}>Workplace Wellness & Human Capital</span>{" "}
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

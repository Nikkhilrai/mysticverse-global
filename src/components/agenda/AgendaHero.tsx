"use client";

import { useEffect, useState } from "react";
import styles from "./AgendaHero.module.css";
import { DAYS } from "./agendaData";

/* Split "10 September 2026" → { num: "10", rest: "September 2026" } */
function splitDate(date: string) {
  const [num, ...rest] = date.split(" ");
  return { num, rest: rest.join(" ") };
}

export default function AgendaHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-label="Conference agenda"
    >
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.overlineWrap}>
          <span className={styles.rule} aria-hidden="true" />
          <p className={styles.overline}>The Agenda · Dubai 2026</p>
          <span className={styles.rule} aria-hidden="true" />
        </div>

        <h1 className={styles.headline}>
          MysticVerse Global<br />
          <span className="gradientText">Conference 2026.</span>
        </h1>

        <p className={styles.sub}>
          Where Ancient Wisdom Meets Modern Innovation.
        </p>

        {/* ── Two-day diptych — the distinctive "program" element ── */}
        <div className={styles.diptych}>
          {DAYS.map((d, i) => {
            const { num, rest } = splitDate(d.date);
            return (
              <div key={d.n} className={styles.dayCard}>
                <div className={styles.dayTop}>
                  <span className={styles.dayNum}>{num}</span>
                  <span className={styles.dayMonth}>
                    {rest}
                    <span className={styles.dayOrdinal}>{d.n}</span>
                  </span>
                </div>
                <p className={styles.dayTheme}>{d.theme}</p>
              </div>
            );
          })}
          <span className={styles.divider} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

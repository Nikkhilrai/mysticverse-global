"use client";

import { useEffect, useState } from "react";
import styles from "./AgendaHero.module.css";
import {
  CONFERENCE_DATE,
  CONFERENCE_VENUE,
  CONFERENCE_THEME,
  CONFERENCE_THEME_SUB,
  CONFERENCE_FOCUS,
} from "./agendaData";

/* Split "11 September 2026" → { num: "11", rest: "September 2026" } */
function splitDate(date: string) {
  const [num, ...rest] = date.split(" ");
  return { num, rest: rest.join(" ") };
}

export default function AgendaHero() {
  const [visible, setVisible] = useState(false);
  const { num, rest } = splitDate(CONFERENCE_DATE);

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
          <span className="gradientTextInk">Conference 2026.</span>
        </h1>

        <p className={styles.sub}>{CONFERENCE_THEME}. {CONFERENCE_THEME_SUB}</p>

        {/* ── One-day date card ────────────────────────────── */}
        <div className={styles.dateCard}>
          <div className={styles.dateTop}>
            <span className={styles.dateNum}>{num}</span>
            <span className={styles.dateMonth}>{rest}</span>
          </div>
          <span className={styles.dateVenue}>{CONFERENCE_VENUE}</span>
          <span className={styles.dateFocus}>{CONFERENCE_FOCUS}</span>
        </div>
      </div>
    </section>
  );
}

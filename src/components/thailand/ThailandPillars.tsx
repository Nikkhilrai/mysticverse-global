"use client";

import { useInView } from "./useInView";
import { THAILAND_PILLARS } from "./thailandData";
import styles from "./ThailandPillars.module.css";
import MaskLines from "./MaskLines";

/*
  Section 3 — The three pillars (brief §4).
  Three cards, each in the colour of its ring from Section 2. The
  line icons draw in and the cards rise in sequence as the section
  scrolls into view. Cards stack on small screens (brief §10).
*/

type Key = (typeof THAILAND_PILLARS.cards)[number]["key"];

/* Line icons — every path uses pathLength=1 so CSS can draw it in. */
function Icon({ name }: { name: Key }) {
  const common = { pathLength: 1, className: styles.iconLine } as const;
  return (
    <svg className={styles.icon} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {name === "longevity" && (
        <>
          <circle cx="24" cy="24" r="20" {...common} />
          <path d="M8 25h8l3.5-7 5.5 15 4.5-11 2.5 3H40" {...common} />
        </>
      )}
      {name === "holistic" && (
        <>
          <circle cx="24" cy="24" r="20" {...common} />
          <circle cx="24" cy="24" r="13" {...common} />
          <circle cx="24" cy="24" r="6" {...common} />
        </>
      )}
      {name === "real-estate" && (
        <>
          <path d="M5 41h38" {...common} />
          <path d="M10 41V19l12-9 12 9v22" {...common} />
          <path d="M34 41V26h7v15" {...common} />
          <path d="M16 24h4M24 24h4M16 31h4M24 31h4" {...common} />
        </>
      )}
    </svg>
  );
}

export default function ThailandPillars() {
  const [ref, inView] = useInView<HTMLElement>(0.15);
  const { eyebrow, heading, copy, cards } = THAILAND_PILLARS;

  return (
    <section
      id="pillars"
      ref={ref}
      className={`${styles.section}${inView ? ` ${styles.in}` : ""}`}
      aria-labelledby="thailand-pillars-title"
    >
      <div className={styles.inner}>
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>
              <span className={styles.rule} aria-hidden="true" />
              {eyebrow}
            </p>
            <h2 id="thailand-pillars-title" className={styles.title}>
              <MaskLines lines={[{ text: heading[0] }, { text: heading[1], tone: "ink" }]} />
            </h2>
          </div>
          <p className={styles.copy}>{copy}</p>
        </header>

        <ol className={styles.grid}>
          {cards.map((c, i) => (
            <li
              key={c.key}
              className={`${styles.card} ${styles[c.tone]}`}
              style={{ "--i": i } as React.CSSProperties}
            >
              <div className={styles.cardTop}>
                <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                <Icon name={c.key} />
              </div>

              <h3 className={styles.cardTitle}>{c.title}</h3>
              <p className={styles.lede}>{c.lede}</p>

              <ul className={styles.topics} aria-label={`${c.title} — topics`}>
                {c.topics.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>

              <div className={styles.home}>
                <span className={styles.homeLabel}>Home to</span>
                <span className={styles.zones}>
                  {c.zones.map((z, j) => (
                    <span key={z}>
                      {j > 0 && <span className={styles.amp}> &amp; </span>}
                      <span className={styles.zone}>the {z}</span>
                    </span>
                  ))}
                </span>
                {c.zoneNote && <span className={styles.zoneNote}>{c.zoneNote}</span>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

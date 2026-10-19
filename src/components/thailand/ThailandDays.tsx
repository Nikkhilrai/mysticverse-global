"use client";

import { useInView } from "./useInView";
import { THAILAND_DAYS } from "./thailandData";
import styles from "./ThailandDays.module.css";
import MaskLines from "./MaskLines";

/*
  Section 4 — The two days (brief §5).
  A timeline rule draws across between the two dates, then each day's
  card rises beneath its date and its items tick in one by one.
  Day-two zones carry their pillar colour from §2/§3. On small screens
  the timeline hides and the cards stack, each keeping its own date.
*/
export default function ThailandDays() {
  const [ref, inView] = useInView<HTMLElement>(0.15);
  const { eyebrow, heading, copy, days, footnote, programmeLabel, programmeHref } = THAILAND_DAYS;

  return (
    <section
      id="two-days"
      ref={ref}
      className={`${styles.section}${inView ? ` ${styles.in}` : ""}`}
      aria-labelledby="thailand-days-title"
    >
      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.eyebrow}>
            <span className={styles.rule} aria-hidden="true" />
            {eyebrow}
            <span className={styles.rule} aria-hidden="true" />
          </p>
          <h2 id="thailand-days-title" className={styles.title}>
            <MaskLines lines={[{ text: heading[0] }, { text: heading[1], tone: "ink" }]} />
          </h2>
          <p className={styles.copy}>{copy}</p>
        </header>

        {/* Decorative timeline across the two dates (desktop) */}
        <div className={styles.timeline} aria-hidden="true">
          <span className={styles.track} />
          {days.map((d) => (
            <span key={d.key} className={styles.node}>
              <span className={styles.dot} />
              <span className={styles.nodeDate}>{d.shortDate}</span>
            </span>
          ))}
        </div>

        <div className={styles.days}>
          {days.map((d, i) => (
            <article
              key={d.key}
              className={`${styles.day} ${styles[d.key === "day-one" ? "one" : "two"]}`}
              style={{ "--d": i } as React.CSSProperties}
              aria-labelledby={`${d.key}-title`}
            >
              <div className={styles.dayHead}>
                <p className={styles.dayLabel}>
                  {d.label}
                  <span className={styles.mode}>{d.mode}</span>
                </p>
                <h3 id={`${d.key}-title`} className={styles.dayTitle}>{d.title}</h3>
                <p className={styles.dayDate}>
                  <time dateTime={i === 0 ? "2027-07-01" : "2027-07-02"}>{d.date}</time>
                </p>
                <span className={styles.bigNum} aria-hidden="true">0{i + 1}</span>
              </div>

              <ol className={styles.items}>
                {d.items.map((item, j) => (
                  <li
                    key={item.name}
                    className={`${styles.item}${"highlight" in item && item.highlight ? ` ${styles.highlight}` : ""}`}
                    style={{ "--j": j } as React.CSSProperties}
                  >
                    <span
                      className={`${styles.marker}${"tone" in item ? ` ${styles[item.tone]}` : ""}`}
                      aria-hidden="true"
                    >
                      {"highlight" in item && item.highlight ? "✦" : ""}
                    </span>
                    <span className={styles.itemText}>
                      <span className={styles.itemName}>{item.name}</span>
                      {"detail" in item && <span className={styles.itemDetail}>{item.detail}</span>}
                    </span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>

        <div className={styles.foot}>
          <p className={styles.footnote}>{footnote}</p>
          {programmeHref ? (
            <a href={programmeHref} className={styles.cta}>
              {programmeLabel} <span aria-hidden="true">→</span>
            </a>
          ) : (
            <span className={styles.soon}>Full programme — announced soon</span>
          )}
        </div>
      </div>
    </section>
  );
}

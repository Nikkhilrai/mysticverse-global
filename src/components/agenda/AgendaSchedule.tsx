"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AgendaSchedule.module.css";
import { DAYS, type Session } from "./agendaData";

function SessionRow({ s }: { s: Session }) {
  return (
    <article
      data-row
      className={`${styles.row} ${styles[s.kind]}`}
    >
      <div className={styles.timeCol}>
        <span className={styles.time}>{s.time}</span>
      </div>

      <div className={styles.rail} aria-hidden="true">
        <span className={styles.node} />
      </div>

      <div className={styles.content}>
        <div className={styles.head}>
          <span className={styles.tag}>{s.tag}</span>
        </div>
        <h3 className={styles.title}>{s.title}</h3>
        {s.desc && <p className={styles.desc}>{s.desc}</p>}
        {s.points && (
          <ul className={styles.points}>
            {s.points.map((p) => (
              <li key={p} className={styles.point}>
                <span className={styles.pointMark} aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

export default function AgendaSchedule() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  /* Reveal rows as they scroll into view (one observer, re-run per day). */
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const rows = Array.from(
      list.querySelectorAll<HTMLElement>("[data-row]"),
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      rows.forEach((r) => r.classList.add(styles.rowIn));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.rowIn);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, [active]);

  const day = DAYS[active];

  return (
    <section className={styles.section} aria-label="Agenda schedule">
      <div className={styles.inner}>

        {/* ── Day toggle ────────────────────────────────────── */}
        <div className={styles.toggle} role="tablist" aria-label="Select a day">
          {DAYS.map((d, i) => (
            <button
              key={d.n}
              role="tab"
              type="button"
              aria-selected={i === active}
              className={`${styles.tab}${i === active ? ` ${styles.tabActive}` : ""}`}
              onClick={() => setActive(i)}
            >
              <span className={styles.tabDay}>{d.n}</span>
              <span className={styles.tabTheme}>{d.theme}</span>
            </button>
          ))}
        </div>

        {/* ── Active day header ─────────────────────────────── */}
        <div key={`head-${active}`} className={styles.dayHead}>
          <span className={styles.dayDate}>{day.date}</span>
          <h2 className={styles.dayTheme}>{day.theme}</h2>
        </div>

        {/* ── Timeline ──────────────────────────────────────── */}
        <div key={`list-${active}`} ref={listRef} className={styles.list}>
          {day.sessions.map((s) => (
            <SessionRow key={s.title} s={s} />
          ))}
        </div>

      </div>
    </section>
  );
}

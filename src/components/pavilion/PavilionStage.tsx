"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PavilionStage.module.css";

type Session = { no: string; title: string; tag: string | null };
type Day = { label: string; date: string; sessions: Session[] };

const DAYS: Day[] = [
  {
    label: "Day 01",
    date: "10 Sep 2026",
    sessions: [
      { no: "01", title: "Wellness Residences: From Concept to Sell-Out", tag: null },
      { no: "02", title: "Designing Homes for Conscious Living", tag: "Architects' Forum" },
      { no: "03", title: "Inside the Longevity Residence", tag: null },
    ],
  },
  {
    label: "Day 02",
    date: "11 Sep 2026",
    sessions: [
      { no: "01", title: "The Rise of Wellness Real Estate", tag: "Investor Briefing" },
      { no: "02", title: "The Future of Retreat-Style Communities", tag: null },
      { no: "03", title: "Luxury Beyond Materialism", tag: "Cross-Pillar" },
    ],
  },
];

export default function PavilionStage() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [day, setDay] = useState(0);

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
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const active = DAYS[day];

  return (
    <section
      ref={ref}
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-labelledby="pavilion-stage-heading"
    >
      <div className={styles.spot} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Left — context + day toggle */}
        <div className={styles.aside}>
          <div className={styles.overlineWrap}>
            <span className={styles.overlineRule} aria-hidden="true" />
            <p className={styles.overline}>Programming</p>
          </div>

          <h2 id="pavilion-stage-heading" className={styles.heading}>
            The Pavilion <span className="gradientText">Stage.</span>
          </h2>

          <p className={styles.sub}>
            Its own programme of panels, forums and briefings — six sessions
            across two days.
          </p>

          <div className={styles.toggle} role="group" aria-label="Choose a day">
            {DAYS.map((d, i) => (
              <button
                key={d.label}
                type="button"
                className={`${styles.toggleBtn}${i === day ? ` ${styles.toggleOn}` : ""}`}
                aria-pressed={i === day}
                onClick={() => setDay(i)}
              >
                <span className={styles.toggleLabel}>{d.label}</span>
                <span className={styles.toggleDate}>{d.date}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right — the night's lineup */}
        <div className={styles.bill}>
          <ol key={day} className={styles.list} aria-live="polite">
            {active.sessions.map((s, i) => (
              <li
                key={s.no}
                className={styles.session}
                style={{ "--i": i } as React.CSSProperties}
              >
                <span className={styles.no} aria-hidden="true">
                  {s.no}
                </span>
                <div className={styles.body}>
                  <h3 className={styles.title}>{s.title}</h3>
                  {s.tag && <span className={styles.tag}>{s.tag}</span>}
                </div>
                <span className={styles.marker} aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

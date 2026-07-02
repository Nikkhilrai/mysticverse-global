"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./WhyDubaiSeptember.module.css";

type Stop = {
  date: string;
  label: string;
  sub: string;
  star?: boolean;
};

const STOPS: Stop[] = [
  { date: "Early September", label: "Markets & term resume", sub: "Europe · India · GCC" },
  { date: "10–11 September", label: "MysticVerse Global", sub: "The conscious luxury conversation", star: true },
  { date: "Two weeks later", label: "Cityscape Global", sub: "The conventional one" },
];

export default function WhyDubaiSeptember() {
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
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-labelledby="why-september-heading"
    >
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.dateBlock}>
            <div className={styles.overlineWrap}>
              <span className={styles.overlineRule} aria-hidden="true" />
              <p className={styles.overline}>Why this week</p>
            </div>
            <p id="why-september-heading" className={styles.date}>
              10 <span className={styles.amp}>&amp;</span> 11
            </p>
            <p className={styles.month}>September 2026</p>
          </div>

          <p className={styles.lede}>
            September is the most strategic week of the year for this audience.
            The European and Indian markets are back from summer. The GCC
            academic year has resumed. Cityscape Global — the region&apos;s
            flagship real estate exhibition — sits two weeks later, and many of
            our developer guests are already in Dubai to prepare for it.
          </p>
        </div>

        {/* Strategic-window schedule */}
        <ol className={styles.schedule}>
          {STOPS.map((s, i) => (
            <li
              key={s.label}
              className={`${styles.col}${s.star ? ` ${styles.starCol}` : ""}`}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className={styles.colTop}>
                {s.star ? (
                  <span className={styles.tag}>The moment</span>
                ) : (
                  <span className={styles.colStep}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
                <span className={styles.colDate}>{s.date}</span>
              </span>
              <span className={styles.colLabel}>{s.label}</span>
              <span className={styles.colSub}>{s.sub}</span>
            </li>
          ))}
        </ol>

        <p className={styles.closer}>
          We deliberately chose to begin the conscious luxury conversation{" "}
          <span className={styles.emph}>before</span> Cityscape begins the
          conventional one.
        </p>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./WWCategories.module.css";

const CATEGORIES = [
  {
    no: "01",
    name: "Enterprise Risk & Retention",
    body: "Quantifying the organisational cost of burnout, mental health absence, and key-role attrition.",
  },
  {
    no: "02",
    name: "Leadership Resilience",
    body: "Stress-regulation frameworks and mental focus strategies for high-pressure executive decision-making.",
  },
  {
    no: "03",
    name: "Workforce Policy & Architecture",
    body: "Physical office environments, hybrid work policies, and modern benefits infrastructure.",
  },
  {
    no: "04",
    name: "Neuro-Wellness at Work",
    body: "Circadian workplace design, nervous system regulation, and health monitoring applied to institutional settings.",
  },
  {
    no: "05",
    name: "Conscious Leadership",
    body: "Developing emotional intelligence alongside automated tools and digital workflows.",
  },
];

export default function WWCategories() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(0);

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
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-labelledby="ww-categories-heading"
    >
      <div className={styles.inner}>
        <header className={styles.head}>
          <div className={styles.overlineWrap}>
            <span className={styles.overlineRule} aria-hidden="true" />
            <p className={styles.overline}>The Framework · Five Focus Areas</p>
          </div>
          <h2 id="ww-categories-heading" className={styles.heading}>
            What sits inside this pillar.
          </h2>
          <p className={styles.deck}>
            Five areas of practice — each a working session, a peer
            roundtable, and a case study on the agenda.
          </p>
        </header>

        <ul className={styles.list}>
          {CATEGORIES.map((c, i) => {
            const isOpen = open === i;
            return (
              <li
                key={c.no}
                className={`${styles.item}${isOpen ? ` ${styles.itemOpen}` : ""}`}
                style={{ "--i": i } as React.CSSProperties}
              >
                <button
                  type="button"
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className={styles.no}>{c.no}</span>
                  <span className={styles.name}>{c.name}</span>
                  <span className={styles.toggle} aria-hidden="true">
                    <span className={styles.toggleBar} />
                    <span
                      className={`${styles.toggleBar} ${styles.toggleBarV}`}
                    />
                  </span>
                </button>
                <div className={styles.panel} aria-hidden={!isOpen}>
                  <div className={styles.panelInner}>
                    <p className={styles.body}>{c.body}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

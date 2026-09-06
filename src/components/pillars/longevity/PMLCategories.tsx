"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PMLCategories.module.css";

const CATEGORIES = [
  {
    no: "01",
    name: "Longevity Residences",
    body: "Living environments engineered with continuous biomarker tracking, advanced filtration, and preventative health systems.",
  },
  {
    no: "02",
    name: "Nervous System Optimisation",
    body: "Evidence-based methodologies for optimising sleep quality, recovery rates, and stress regulation.",
  },
  {
    no: "03",
    name: "Functional & Integrative Medicine",
    body: "Personalised metabolic, hormonal, and microbiome strategies designed to extend human healthspan.",
  },
  {
    no: "04",
    name: "Contemplative Mastery",
    body: "Mental focus disciplines and contemplative practices taught by experienced teachers to sustain peak performance under pressure.",
  },
  {
    no: "05",
    name: "Conscious Health Technology",
    body: "Non-invasive health monitoring tools, bio-optimisation hardware, and neuro-wellness devices built for daily application.",
  },
];

export default function PMLCategories() {
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
      aria-labelledby="pml-categories-heading"
    >
      <div className={styles.inner}>
        <header className={styles.head}>
          <div className={styles.overlineWrap}>
            <span className={styles.overlineRule} aria-hidden="true" />
            <p className={styles.overline}>The Framework · Five Focus Areas</p>
          </div>
          <h2 id="pml-categories-heading" className={styles.heading}>
            What sits inside this pillar.
          </h2>
          <p className={styles.deck}>
            Five areas of practice — each a clinical briefing, a protocol
            walkthrough, and a case study on the agenda.
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

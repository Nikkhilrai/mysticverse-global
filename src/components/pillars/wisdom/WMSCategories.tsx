"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./WMSCategories.module.css";

const CATEGORIES = [
  {
    no: "01",
    name: "Vedic & Contemplative Traditions",
    body: "Timeless systems of Ayurveda, yoga, and contemplative philosophy, presented by experienced lineage carriers.",
  },
  {
    no: "02",
    name: "Neuroscience of Practice",
    body: "Clinical research on the neurological, physiological, and cognitive impacts of long-term mental focus practices.",
  },
  {
    no: "03",
    name: "Intuitive Sciences",
    body: "Traditional observational systems evaluated through rigorous practitioner standards and structured frameworks.",
  },
  {
    no: "04",
    name: "Somatic & Acoustic Applications",
    body: "The study of movement, sound, and frequency on nervous system balance and physical wellbeing.",
  },
  {
    no: "05",
    name: "Artisanal & Ceremonial Objects",
    body: "The lineage, design, and provenance of refined tools, scents, and objects that support daily intentional routines.",
  },
];

export default function WMSCategories() {
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
      aria-labelledby="wms-categories-heading"
    >
      <div className={styles.inner}>
        <header className={styles.head}>
          <div className={styles.overlineWrap}>
            <span className={styles.overlineRule} aria-hidden="true" />
            <p className={styles.overline}>The Framework · Five Focus Areas</p>
          </div>
          <h2 id="wms-categories-heading" className={styles.heading}>
            What sits inside this pillar.
          </h2>
          <p className={styles.deck}>
            Five areas of enquiry — each a scholarly session, a practitioner
            demonstration, and a case study on the agenda.
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

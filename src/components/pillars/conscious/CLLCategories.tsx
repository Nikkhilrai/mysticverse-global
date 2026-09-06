"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CLLCategories.module.css";

const CATEGORIES = [
  {
    no: "01",
    name: "Wellness Residences & Branded Communities",
    body: "Developers, master-planned communities, branded residences — from UAE to Bali, Goa to Portugal.",
  },
  {
    no: "02",
    name: "Biophilic & Human-Centric Architecture",
    body: "Design studios, WELL-certified projects, circadian-lighting and indoor-air innovators, conscious construction.",
  },
  {
    no: "03",
    name: "Luxury Wellness Tourism & Retreats",
    body: "Branded retreats, destination spas, tourism boards positioning their geographies as wellness destinations.",
  },
  {
    no: "04",
    name: "Luxury Spiritual & Wellness Retail",
    body: "Rare crystals, ceremonial jewellery, sacred fragrance, mindful home design and wellness home technology — the objects that mark a conscious home.",
  },
  {
    no: "05",
    name: "Longevity Living & Conscious Communities",
    body: "Longevity residences (biomarker-tracked living), spiritual towns and conscious community projects, eco-luxury townships.",
  },
];

export default function CLLCategories() {
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
      aria-labelledby="cll-categories-heading"
    >
      <div className={styles.inner}>
        <header className={styles.head}>
          <div className={styles.overlineWrap}>
            <span className={styles.overlineRule} aria-hidden="true" />
            <p className={styles.overline}>The Portfolio · Five Categories</p>
          </div>
          <h2 id="cll-categories-heading" className={styles.heading}>
            What sits inside this pillar.
          </h2>
          <p className={styles.deck}>
            Five categories of buyer, builder, and brand — each a track, a
            sponsorship lane, and a zone on the floor.
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

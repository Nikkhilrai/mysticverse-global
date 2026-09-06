"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CLLColocated.module.css";

const PAIRS = [
  {
    estate: {
      role: "The buyer",
      text: "buying a wellness villa",
    },
    retail: {
      role: "is the same buyer",
      text: "buying a USD 18,000 piece of ceremonial jewellery on the way out of the meditation room.",
    },
  },
  {
    estate: {
      role: "The architect",
      text: "designing a biophilic atrium",
    },
    retail: {
      role: "is",
      text: "sourcing the rare crystal that anchors it.",
    },
  },
  {
    estate: {
      role: "The branded residence operator",
      text: "curating the space",
    },
    retail: {
      role: "is",
      text: "curating the in-room scent, the wellness wardrobe, the bedside objects.",
    },
  },
];

export default function CLLColocated() {
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
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-labelledby="cll-colocated-heading"
    >
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.head}>
          <div className={styles.overlineWrap}>
            <span className={styles.overlineRule} aria-hidden="true" />
            <p className={styles.overline}>Co-located, by design</p>
          </div>
          <h2 id="cll-colocated-heading" className={styles.heading}>
            We placed real estate and luxury retail in the same room.{" "}
            <span className={styles.headingMuted}>Here is why.</span>
          </h2>
        </header>

        <div className={styles.legend} aria-hidden="true">
          <span className={styles.legendReal}>Real Estate</span>
          <span className={styles.legendEq}>the same person</span>
          <span className={styles.legendRetail}>Luxury Retail</span>
        </div>

        <ul className={styles.pairs}>
          {PAIRS.map((p, i) => (
            <li
              key={i}
              className={styles.pair}
              style={{ "--i": i } as React.CSSProperties}
            >
              <div className={`${styles.side} ${styles.estate}`}>
                <span className={styles.role}>{p.estate.role}</span>
                <span className={styles.text}>{p.estate.text}</span>
              </div>

              <div className={styles.link} aria-hidden="true">
                <span className={styles.linkLine} />
                <span className={styles.eq}>=</span>
                <span className={styles.linkLine} />
              </div>

              <div className={`${styles.side} ${styles.retail}`}>
                <span className={styles.role}>{p.retail.role}</span>
                <span className={styles.text}>{p.retail.text}</span>
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.close}>
          <p className={styles.pull}>
            Conscious luxury is not a category. It is a way of treating life.
          </p>
          <p className={styles.resolve}>
            MysticVerse Global makes that explicit by placing both industries
            inside one zone — the{" "}
            <span className={styles.inlineLink}>
              Conscious Living Pavilion
            </span>{" "}
            — so the developer walks the buyer past the crystal house, and the
            crystal house sells beside the villa walkthrough.
          </p>
        </div>
      </div>
    </section>
  );
}

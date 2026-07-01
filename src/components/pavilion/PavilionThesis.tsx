"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PavilionThesis.module.css";

export default function PavilionThesis() {
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
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-labelledby="pavilion-thesis-heading"
    >
      <div className={styles.inner}>
        <header className={styles.head}>
          <div className={styles.overlineWrap}>
            <span className={styles.overlineRule} aria-hidden="true" />
            <p className={styles.overline}>The Pavilion Logic</p>
          </div>

          <h2 id="pavilion-thesis-heading" className={styles.headline}>
            One audience.{" "}
            <span className={styles.roomEm}>One room.</span>
          </h2>

          <p className={styles.dek}>
            Why we placed real estate and luxury retail together.
          </p>
        </header>

        {/* Convergence diagram — two streams resolve into one buyer */}
        <div className={styles.diagram} aria-hidden="true">
          <svg viewBox="0 0 800 210" className={styles.svg} role="img">
            <text x="150" y="26" className={styles.labelL}>
              REAL ESTATE
            </text>
            <text x="650" y="26" className={styles.labelR}>
              LUXURY RETAIL
            </text>

            <path
              className={styles.lineL}
              d="M150 46 C150 118 300 108 400 142"
              fill="none"
            />
            <path
              className={styles.lineR}
              d="M650 46 C650 118 500 108 400 142"
              fill="none"
            />
            <path
              className={styles.lineMerge}
              d="M400 142 L400 178"
              fill="none"
            />

            <circle className={styles.nodeHalo} cx="400" cy="142" r="9" fill="none" />
            <circle className={styles.node} cx="400" cy="142" r="5" />

            <text x="400" y="200" className={styles.labelOne}>
              ONE BUYER
            </text>
          </svg>
        </div>

        <div className={styles.cols}>
          <div className={styles.col}>
            <span className={styles.microEyebrow}>The Pattern</span>
            <p className={styles.body}>
              Conscious luxury is not a category. It is a way of treating life.
              The HNI who buys a wellness residence in Dubai is the HNI who buys
              a <strong className={styles.figure}>USD&nbsp;12,000</strong> piece
              of ceremonial jewellery on the way home. The architect designing
              the biophilic atrium is choosing the rare crystal that anchors it.
              The branded residence operator is curating the in-room scent, the
              wellness wardrobe, the bedside objects.
            </p>
          </div>

          <span className={styles.seam} aria-hidden="true" />

          <div className={styles.col}>
            <span className={styles.microEyebrow}>The Decision</span>
            <p className={styles.body}>
              We placed both inside the Pavilion deliberately. The retailer
              benefits from the foot traffic of an HNI walking a developer&apos;s
              showcase. The developer benefits from the tactile, beautiful
              surrounding to walk a buyer through. Both audiences benefit from
              being treated as one.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

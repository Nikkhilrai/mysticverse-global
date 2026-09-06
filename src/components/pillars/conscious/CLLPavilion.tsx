"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./CLLPavilion.module.css";

const FEATURES = [
  "Walkthrough villa mock-ups",
  "Biophilic installations",
  "A meditation garden",
  "A circadian-lighting laboratory",
  "Rare crystal houses & ceremonial jewellery curators",
  "Sunset networking off-site — hosted by a single luxury property",
];

export default function CLLPavilion() {
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
      id="cll-pavilion"
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-labelledby="cll-pavilion-heading"
    >
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.media}>
          <div className={styles.frame}>
            <Image
              src="/images/pavilion/pavilion-a.jpg"
              alt="Inside the Conscious Living Pavilion — the architectural showcase floor."
              fill
              sizes="(max-width: 900px) 100vw, 46vw"
              className={styles.img}
            />
            <span className={styles.grade} aria-hidden="true" />
            <div className={styles.stat}>
              <span className={styles.statNumber}>500</span>
              <span className={styles.statUnit}>m² of showcase floor</span>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.overlineWrap}>
            <span className={styles.overlineRule} aria-hidden="true" />
            <p className={styles.overline}>The Physical Home</p>
          </div>
          <h2 id="cll-pavilion-heading" className={styles.heading}>
            The Conscious Living Pavilion.
          </h2>

          <ul className={styles.features}>
            {FEATURES.map((f, i) => (
              <li
                key={f}
                className={styles.feature}
                style={{ "--i": i } as React.CSSProperties}
              >
                {f}
              </li>
            ))}
          </ul>

          <p className={styles.pull}>
            Step inside before booking and you will understand the pillar.
          </p>

          <Link href="/pavilion" className={styles.cta}>
            Step inside the Pavilion
            <span className={styles.arrow} aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

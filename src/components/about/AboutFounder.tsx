"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AboutFounder.module.css";

/*
  PORTRAIT — placeholder until a real photograph of the founder is
  supplied. When the image arrives, drop it at
  /images/about/pallavi-sharma.jpg and replace the .portraitFrame
  inner block with a <next/image fill> (the frame sizing is ready).
*/

export default function AboutFounder() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); io.disconnect(); }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.section}${visible ? ` ${styles.visible}` : ""}`}
      aria-label="A note from the founder"
    >
      <div className={styles.inner}>

        {/* ── Portrait (placeholder) ────────────────────────── */}
        <figure className={styles.portrait}>
          <div className={styles.portraitFrame}>
            <div className={styles.portraitPlaceholder} aria-hidden="true">
              <span className={styles.monogram}>PS</span>
              <span className={styles.placeholderNote}>Portrait</span>
            </div>
          </div>
          <figcaption className={styles.caption}>
            <span className={styles.captionName}>Pallavi Sharma</span>
            <span className={styles.captionRole}>Co-Founder</span>
          </figcaption>
        </figure>

        {/* ── Quote ─────────────────────────────────────────── */}
        <div className={styles.quoteWrap}>
          <div className={styles.eyebrowWrap}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            <p className={styles.eyebrow}>A Note from the Founder</p>
          </div>

          <span className={styles.mark} aria-hidden="true">&ldquo;</span>

          <blockquote className={styles.quote}>
            MysticVerse Global is where healers and seekers unite with the
            leaders shaping how we will <span className="gradientText">live, lead, and age</span>{" "}
            — to bridge mysticism, psychology, spiritual science, and wellness
            for the next decade of human growth.
          </blockquote>

          <p className={styles.attribution}>
            <span className={styles.attrName}>Pallavi Sharma</span>
            <span className={styles.attrRole}>Co-Founder, MysticVerse Global</span>
          </p>
        </div>

      </div>
    </section>
  );
}

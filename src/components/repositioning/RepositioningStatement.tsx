"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./RepositioningStatement.module.css";

export default function RepositioningStatement() {
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
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.section}${visible ? ` ${styles.visible}` : ""}`}
      aria-label="Conference positioning statement"
    >
      <div className={styles.inner}>

        {/* ── Left: eyebrow + display statement ──────────── */}
        <div className={styles.left}>
          <div className={styles.eyebrowWrap}>
            <p className={styles.eyebrow}>The Premise</p>
          </div>

          <p className={styles.pullQuote}>
            Not a wellness conference.<br />A commercial platform.
          </p>
        </div>

        {/* ── Brass vertical divider ──────────────────────── */}
        <div className={styles.divider} aria-hidden="true" />

        {/* ── Right: body + roll-call ─────────────────────── */}
        <div className={styles.right}>
          <p className={styles.statement}>
            MysticVerse Global is the platform where conscious luxury living,
            workplace wellbeing, and human performance are turned into a
            12-month commercial conversation — anchored to two days in Dubai,
            the geographic centre of a USD&nbsp;1.1&nbsp;trillion wellness
            real estate economy.
          </p>

          <span className={styles.rule} aria-hidden="true" />

          <p className={styles.rollCall}>
            Designed for the people who matter to it: HNIs, real estate
            decision&#8209;makers, CHROs and senior HR leaders, longevity
            entrepreneurs, wellness brand founders, investors, and the
            practitioners and researchers whose work the world&rsquo;s most
            discerning capital is now tracking.
          </p>
        </div>

      </div>
    </section>
  );
}

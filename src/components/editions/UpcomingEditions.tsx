"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./UpcomingEditions.module.css";

export default function UpcomingEditions() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); io.disconnect(); }
      },
      { threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.section}${visible ? ` ${styles.visible}` : ""}`}
      aria-label="MysticVerse Global — The Global Series"
    >
      <div className={styles.inner}>

        {/* Section header */}
        <div className={styles.eyebrowWrap}>
          <p className={styles.eyebrow}>The Global Series</p>
        </div>
        <h2 className={styles.headline}>The World Is The Venue.</h2>

        {/* ── Dubai 2026 — flagship editorial block ──────────────── */}
        <div className={styles.dubaiBlock}>

          {/* Image column */}
          <div className={styles.dubaiImageWrap}>
            {/*
              PLACEHOLDER — replace with commissioned venue/event photography.
              Target: warm architectural interior, amber-dusk lighting, Dubai scale.
              Minimum 1400px wide, 3:2 or taller crop preferred.
            */}
            <Image
              src="/images/hero section  /Conscious Luxury.png"
              alt="Dubai — editorial placeholder; final photography to reflect the MysticVerse Global 2026 venue"
              fill
              sizes="(min-width: 768px) 55vw, 100vw"
              className={styles.dubaiImage}
            />
            <div className={styles.dubaiOverlay} aria-hidden="true" />
          </div>

          {/* Copy column */}
          <div className={styles.dubaiCopy}>
            <p className={styles.editionEyebrow}>Flagship Edition</p>

            <h3 className={styles.dubaiHeading}>Dubai 2026</h3>

            <p className={styles.dubaiMeta}>
              10 &amp; 11 September&ensp;&middot;&ensp;Dubai
            </p>

            <p className={styles.dubaiBody}>
              The inaugural edition. Two days where the builders, investors, and
              practitioners shaping the conscious luxury economy — and the people
              buying into it — share the same room.
            </p>

            <a
              href="#register"
              className={styles.ctaFilled}
              aria-label="Reserve your seat at MysticVerse Global 2026, Dubai"
            >
              Reserve Your Seat
              <span className={styles.ctaArrow} aria-hidden="true">&ensp;→</span>
            </a>
          </div>

        </div>

        {/* ── Bangkok 2027 — thin ribbon teaser ──────────────────── */}
        {/*
          Intentionally narrow — the height contrast with the Dubai block
          above is the only hierarchy signal needed. Do not expand this
          ribbon until Bangkok dates and venue are confirmed.
        */}
        <div className={styles.bangkokRibbon} aria-label="Coming next — Bangkok 2027">
          <p className={styles.bangkokLabel}>
            Coming Next&ensp;&middot;&ensp;Bangkok&ensp;&middot;&ensp;2027
          </p>
          <p className={styles.bangkokTagline}>
            The series continues. Be first to know.
          </p>
          <a
            href="/notify"  /* FUTURE PAGE — email capture for Bangkok */
            className={styles.notifyLink}
          >
            Notify Me
            <span className={styles.notifyArrow} aria-hidden="true">&ensp;→</span>
          </a>
        </div>

      </div>
    </section>
  );
}

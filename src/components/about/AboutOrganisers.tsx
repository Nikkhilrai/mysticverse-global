"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AboutOrganisers.module.css";

/* NOTE: confirm the MantraNex Vista LinkedIn company URL before launch. */
const LINKEDIN_URL = "https://www.linkedin.com/company/mantranex-vista";

export default function AboutOrganisers() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); io.disconnect(); }
      },
      { threshold: 0.16 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.section}${visible ? ` ${styles.visible}` : ""}`}
      aria-label="The organisers — MantraNex Vista"
    >
      <div className={styles.inner}>

        <div className={styles.lead}>
          <div className={styles.eyebrowWrap}>
            <span className={styles.eyebrowRule} aria-hidden="true" />
            <p className={styles.eyebrow}>The Organisers</p>
          </div>
          <h2 className={styles.headline}>
            Built by{" "}
            <span className="gradientText">MantraNex&nbsp;Vista.</span>
          </h2>
        </div>

        <div className={styles.copy}>
          <p className={styles.body}>
            MysticVerse Global is curated by MantraNex Vista Pvt. Ltd., a Gurgaon
            and Dubai-based platform building the meeting points between conscious
            luxury, wellness real estate, and human flourishing. Our team brings
            deep operating experience across global events, premium brand
            strategy, and the wellness economy.
          </p>
          <p className={styles.body}>
            From Dubai we anchor the Middle East edition; from Gurgaon we curate
            the Indian and South Asian network; from late 2026 we extend the
            platform into Bangkok and beyond.
          </p>

          <a
            href={LINKEDIN_URL}
            className={styles.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.linkedinIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor" focusable="false">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </span>
            MantraNex Vista on LinkedIn
            <span className={styles.linkedinArrow} aria-hidden="true">→</span>
          </a>

          <div className={styles.meta}>
            <div className={styles.metaBlock}>
              <p className={styles.metaLabel}>Locations</p>
              <p className={styles.metaValue}>Gurgaon, India&ensp;·&ensp;Dubai, UAE</p>
            </div>
            <div className={styles.metaBlock}>
              <p className={styles.metaLabel}>Contact</p>
              <p className={styles.metaValue}>
                <a className={styles.metaLink} href="mailto:contact@mysticverseglobal.com">
                  contact@mysticverseglobal.com
                </a>
                <span className={styles.metaSep} aria-hidden="true">·</span>
                <a className={styles.metaLink} href="tel:+919211611150">
                  +91&nbsp;9211611150
                </a>
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "./MagazineCollection.module.css";

/* The flipbook is heavy (pdfjs) — load it only when a magazine opens. */
const MagazineReader = dynamic(() => import("./MagazineReader"), {
  ssr: false,
});

const MAGAZINE = {
  title: "The MysticVerse Digest",
  tagline: "Where Ancient Wisdom Meets Modern Innovation",
  cadence: "Quarterly",
  issue: "Issue 01",
  date: "February 2026",
  description:
    "A quarterly magazine exploring the intersection of mysticism, psychology, wellness, and technology. Features emerging voices, wellness experiences, and practical pathways to conscious living.",
  url: "/documents/Final-MysticVerse-Maganzine-Feb2026.pdf",
  cover: "/images/magazine/digest-cover.jpg",
};

export default function MagazineCollection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-label="MysticVerse Magazine Collection"
    >
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        {/* ── Header ───────────────────────────────────────── */}
        <div className={styles.header}>
          <div className={styles.overlineWrap}>
            <span className={styles.overlineRule} aria-hidden="true" />
            <p className={styles.overline}>The Reading Room</p>
          </div>
          <h1 className={styles.headline}>
            MysticVerse <span className="gradientText">Magazine Collection.</span>
          </h1>
          <p className={styles.sub}>
            Explore our curated collection of digital magazines covering
            consciousness, wellness, spirituality, and transformative living.
          </p>
        </div>

        {/* ── Magazine card ────────────────────────────────── */}
        <article className={styles.card}>
          {/* Cover */}
          <button
            type="button"
            className={styles.cover}
            onClick={() => setOpen(true)}
            aria-label={`Open ${MAGAZINE.title}`}
          >
            <Image
              src={MAGAZINE.cover}
              alt={`${MAGAZINE.title} — ${MAGAZINE.issue} cover`}
              fill
              sizes="(max-width: 760px) 80vw, 320px"
              className={styles.coverImg}
              priority
            />
            <span className={styles.coverShade} aria-hidden="true" />
            <span className={styles.coverFlip} aria-hidden="true">
              <span className={styles.coverFlipIcon}>❧</span>
              Flip to read
            </span>
            <span className={styles.coverSpine} aria-hidden="true" />
          </button>

          {/* Details */}
          <div className={styles.details}>
            <div className={styles.metaRow}>
              <span className={styles.metaPill}>{MAGAZINE.cadence}</span>
              <span className={styles.metaPill}>{MAGAZINE.issue}</span>
              <span className={styles.metaPill}>{MAGAZINE.date}</span>
            </div>

            <h2 className={styles.cardTitle}>{MAGAZINE.title}</h2>
            <p className={styles.cardTagline}>{MAGAZINE.tagline}</p>
            <p className={styles.cardDesc}>{MAGAZINE.description}</p>

            <button
              type="button"
              className={styles.cta}
              onClick={() => setOpen(true)}
            >
              Read Now
              <span className={styles.ctaArrow} aria-hidden="true">→</span>
            </button>
          </div>
        </article>
      </div>

      {open && (
        <MagazineReader
          url={MAGAZINE.url}
          title={MAGAZINE.title}
          onClose={() => setOpen(false)}
        />
      )}
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./AwardsHero.module.css";
import { AWARDEES, awardeePortrait } from "./awardeesData";

const COUNT_WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
const countWord = (n: number) => COUNT_WORDS[n] ?? String(n);

/* Portraits already on the speaker page, one per honouree who has
   one — reused (never duplicated on disk) as the hero's backdrop. */
const PORTRAITS = AWARDEES.map(awardeePortrait).filter((src): src is string => Boolean(src));

/* Two rows drifting in opposite directions. Each row is the list
   twice so the -50% translate loops seamlessly. */
const ROW_A = [...PORTRAITS, ...PORTRAITS];
const ROW_B = [...PORTRAITS.slice(3), ...PORTRAITS.slice(0, 3)];
const ROW_B_LOOP = [...ROW_B, ...ROW_B];

export default function AwardsHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-label="The MysticVerse Global Excellence Awardees"
    >
      {/* Backdrop — the awardees' own portraits, dimmed to a mood */}
      <div className={styles.mosaic} aria-hidden="true">
        <div className={styles.mosaicRow}>
          <div className={styles.track}>
            {ROW_A.map((src, i) => (
              <span key={`a-${i}`} className={styles.tile}>
                <Image src={src} alt="" fill sizes="220px" className={styles.tileImg} />
              </span>
            ))}
          </div>
        </div>
        <div className={styles.mosaicRow}>
          <div className={`${styles.track} ${styles.trackReverse}`}>
            {ROW_B_LOOP.map((src, i) => (
              <span key={`b-${i}`} className={styles.tile}>
                <Image src={src} alt="" fill sizes="220px" className={styles.tileImg} />
              </span>
            ))}
          </div>
        </div>
        <div className={styles.veil} />
      </div>

      {/* Ceremony lighting — a gold spotlight over obsidian */}
      <div className={styles.spotlight} aria-hidden="true" />
      <div className={styles.beam} aria-hidden="true" />
      <div className={`${styles.grain} noise`} aria-hidden="true" />

      <span className={styles.cornerTL} aria-hidden="true" />
      <span className={styles.cornerBR} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.overlineWrap}>
          <span className={styles.overlineRule} aria-hidden="true" />
          <p className={styles.overline}>The Excellence Awards · Dubai 2026</p>
          <span className={styles.overlineRule} aria-hidden="true" />
        </div>

        {/* Laurel-framed emblem */}
        <div className={styles.emblem} aria-hidden="true">
          <svg viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="44" stroke="url(#awGold)" strokeWidth="1" opacity="0.5" />
            <circle cx="60" cy="60" r="34" stroke="url(#awGold)" strokeWidth="1" opacity="0.28" />
            <path
              className={styles.star}
              d="M60 32 L64.5 53 L82 46.5 L69 60 L82 73.5 L64.5 67 L60 88 L55.5 67 L38 73.5 L51 60 L38 46.5 L55.5 53 Z"
              fill="url(#awGold)"
            />
            <defs>
              <linearGradient id="awGold" x1="0" y1="0" x2="120" y2="120">
                <stop offset="0%" stopColor="#F5C45A" />
                <stop offset="50%" stopColor="#C77DFF" />
                <stop offset="100%" stopColor="#7C5CFF" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h1 className={styles.headline}>
          <span className={styles.line}>
            <span className={styles.lineInner}>The MysticVerse Global</span>
          </span>
          <span className={styles.line}>
            <span className={`${styles.lineInner} gradientText`}>Excellence Awardees.</span>
          </span>
        </h1>

        <span className={styles.measure} aria-hidden="true" />

        <p className={styles.sub}>
          {countWord(AWARDEES.length)} honours presented on the main stage as the
          conference closed — recognising the practitioners, leaders, and
          platforms shaping conscious living.
        </p>

        <p className={styles.meta}>11 September 2026 · Taj Jumeirah Lakes Towers, Dubai</p>

        <a href="#awardees" className={styles.cue}>
          Meet the awardees
          <span className={styles.cueArrow} aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}

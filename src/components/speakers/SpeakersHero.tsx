"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./SpeakersHero.module.css";
import { SPEAKERS } from "./speakersData";

const PREVIEW = SPEAKERS.slice(0, 6);

export default function SpeakersHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-label="Conference speakers"
    >
      <div className={styles.glow} aria-hidden="true" />
      <p className={styles.watermark} aria-hidden="true">Speakers</p>

      <div className={styles.inner}>
        <div className={styles.overlineWrap}>
          <span className={styles.overlineRule} aria-hidden="true" />
          <p className={styles.overline}>Conference Faculty · Dubai 2026</p>
        </div>

        <h1 className={styles.headline}>
          The voices shaping{" "}
          <span className="gradientText">conscious living.</span>
        </h1>

        <p className={styles.sub}>
          Healers, founders, physicians, artists, and yogis — convening to bridge
          ancient wisdom and modern innovation across two days in Dubai.
        </p>

        {/* Overlapping portrait stack — a premium preview of the faculty */}
        <div className={styles.faculty}>
          <div className={styles.avatars}>
            {PREVIEW.map((s, i) => (
              <span
                key={s.slug}
                className={styles.avatar}
                style={{ zIndex: PREVIEW.length - i }}
              >
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  sizes="48px"
                  className={styles.avatarImg}
                />
              </span>
            ))}
          </div>
          <p className={styles.facultyNote}>
            <span className={styles.facultyCount}>{SPEAKERS.length} luminaries</span>
            <span className={styles.facultyMeta}>and counting — meet the full faculty below</span>
          </p>
        </div>
      </div>
    </section>
  );
}

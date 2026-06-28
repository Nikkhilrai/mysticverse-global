"use client";

import Image from "next/image";
import styles from "./HeroSection.module.css";

interface HeroSectionProps {
  imageSrc?: string;
  imageAlt?: string;
}

export default function HeroSection({
  imageSrc = "/images/hero/dubai-night-1.jpg",
  imageAlt = "Dubai skyline at night with the Burj Khalifa — MysticVerse Global 2026.",
}: HeroSectionProps) {
  return (
    <section className={styles.hero} aria-label="MysticVerse Global 2026 hero">

      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className={styles.heroImage}
        sizes="100vw"
      />

      <div className={styles.overlay} aria-hidden="true" />
      <div className={`${styles.grain} noise`} aria-hidden="true" />

      {/* All content visible above the fold — left-aligned, bottom-anchored */}
      <div className={styles.aboveFold}>
        <div className={styles.textBlock}>

          <p className={styles.microcopy}>
            <span className={styles.microcopyInitial}>M</span>ysticVerse&nbsp;Global&nbsp;2026&ensp;&middot;&ensp;10&nbsp;&amp;&nbsp;11&nbsp;September&ensp;&middot;&ensp;Dubai
          </p>

          <h1 className={styles.headline}>
            Where <span className="gradientText">Conscious&nbsp;Luxury</span> Meets<br />Inner Mastery.
          </h1>

          <p className={styles.subHeadline}>
            Two days in Dubai. Four pillars. One curated room where wellness
            real estate, workplace wellbeing, longevity, and ancient wisdom
            converge — and the people building the conscious luxury economy
            meet the people buying into it.
          </p>

          <div className={styles.ctaRow}>
            <a
              href="#register"
              className={styles.ctaPrimary}
              aria-label="Reserve your seat at MysticVerse Global 2026"
            >
              Reserve Your Seat
              <span className={styles.ctaArrow} aria-hidden="true">→</span>
            </a>
            <a
              href="#programme"
              className={styles.ctaSecondary}
              aria-label="Explore the MysticVerse Global 2026 programme"
            >
              Explore The Programme
            </a>
          </div>

        </div>
      </div>

      {/* Scroll cue — animated brass gradient line */}
      <div className={styles.scrollCue} aria-hidden="true">
        <span className={styles.scrollLine} />
      </div>

    </section>
  );
}

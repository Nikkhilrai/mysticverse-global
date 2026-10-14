import BangkokSkyline from "./BangkokSkyline";
import { THAILAND_CTA, THAILAND_HERO } from "./thailandData";
import styles from "./ThailandHero.module.css";

/*
  Section 1 — Hero (brief §2).
  Bangkok night: an indigo sky, a temple-gold moon glow, and the
  skyline drawing itself along the river. The headline rises line by
  line; the whole composition is CSS-animated on load, so this stays
  a server component.
*/
export default function ThailandHero() {
  const { eyebrow, headline, subhead } = THAILAND_HERO;

  return (
    <section className={styles.hero} aria-labelledby="thailand-hero-title">
      <div className={styles.sky} aria-hidden="true" />
      <div className={styles.stars} aria-hidden="true" />
      <div className={styles.moon} aria-hidden="true" />

      <div className={styles.content}>
        <p className={styles.eyebrow}>
          <span>{eyebrow[0]}</span>
          <span className={styles.diamond} aria-hidden="true" />
          <span>{eyebrow[1]}</span>
        </p>

        <h1 id="thailand-hero-title" className={styles.headline}>
          {headline.map((line, i) => (
            <span key={line} className={styles.line}>
              <span
                className={`${styles.lineInner}${i === headline.length - 1 ? " gradientText" : ""}`}
                style={{ animationDelay: `${0.35 + i * 0.16}s` }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p className={styles.subhead}>{subhead}</p>

        <div className={styles.ctaRow}>
          <a
            href={THAILAND_CTA.register.href}
            className={styles.ctaPrimary}
            data-track={THAILAND_CTA.register.track}
          >
            {THAILAND_CTA.register.label}
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </a>
          <a
            href={THAILAND_CTA.partner.href}
            className={styles.ctaGhost}
            data-track={THAILAND_CTA.partner.track}
          >
            {THAILAND_CTA.partner.label}
          </a>
        </div>
      </div>

      <div className={styles.skyline}>
        <BangkokSkyline />
      </div>

      <a href="#overview" className={styles.scrollCue} aria-label="Scroll to the next section">
        <span className={styles.scrollLine} aria-hidden="true" />
      </a>
    </section>
  );
}

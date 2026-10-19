import Image from "next/image";
import { THAILAND_CTA, THAILAND_HERO, THAILAND_HERO_PHOTO } from "./thailandData";
import styles from "./ThailandHero.module.css";

/* Rising lanterns — a nod to Loy Krathong over the Chao Phraya. Fixed
   values (not Math.random) so server and client markup match. Each:
   left %, size px, rise duration s, start delay s, sway px. */
const LANTERNS: [number, number, number, number, number][] = [
  [6, 10, 19, 0.5, 18], [14, 6, 23, 6, -14], [22, 12, 21, 11, 22],
  [31, 7, 25, 3, -18], [39, 9, 20, 14, 16], [47, 5, 27, 8, -12],
  [56, 11, 22, 1.5, 20], [63, 6, 24, 12, -16], [71, 9, 19, 5, 14],
  [79, 7, 26, 16, -20], [86, 12, 21, 9, 18], [93, 6, 23, 2.5, -14],
];

/*
  Section 1 — Hero (brief §2).
  A real photograph of Bangkok at night under a dark treatment, with
  glowing lanterns drifting up over the river. The photo settles in
  with a slow zoom and the headline rises line by line; it's all
  CSS-animated, so this stays a server component.
*/
type HeroCta = { label: string; href: string; track: string };

/*
  Defaults are the /thailand page's. The homepage reuses this hero with
  its own buttons (to /register and /thailand), a "Next edition" kicker,
  and a scroll cue pointing at the Dubai 2026 past-edition section.
*/
export default function ThailandHero({
  kicker,
  primary = THAILAND_CTA.register,
  secondary = THAILAND_CTA.partner,
  scrollTo = "#overview",
}: {
  kicker?: string;
  primary?: HeroCta;
  secondary?: HeroCta;
  scrollTo?: string;
} = {}) {
  const { eyebrow, headline, subhead } = THAILAND_HERO;

  return (
    <section className={styles.hero} aria-labelledby="thailand-hero-title">
      <div className={styles.photoWrap}>
        <Image
          src={THAILAND_HERO_PHOTO.src}
          alt={THAILAND_HERO_PHOTO.alt}
          fill
          priority
          sizes="100vw"
          className={styles.photo}
        />
      </div>
      <div className={styles.shade} aria-hidden="true" />
      <div className={styles.lanterns} aria-hidden="true">
        {LANTERNS.map(([left, size, dur, delay, sway], i) => (
          <span
            key={i}
            className={styles.lantern}
            style={{
              left: `${left}%`,
              width: size,
              height: size * 1.3,
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
              "--sway": `${sway}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className={styles.content}>
        {kicker && (
          <p className={styles.kicker}>
            <span className={styles.kickerDot} aria-hidden="true" />
            {kicker}
          </p>
        )}
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
            href={primary.href}
            className={styles.ctaPrimary}
            data-track={primary.track}
          >
            {primary.label}
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </a>
          <a
            href={secondary.href}
            className={styles.ctaGhost}
            data-track={secondary.track}
          >
            {secondary.label}
          </a>
        </div>
      </div>

      <a href={scrollTo} className={styles.scrollCue} aria-label="Scroll to the next section">
        <span className={styles.scrollLine} aria-hidden="true" />
      </a>
    </section>
  );
}

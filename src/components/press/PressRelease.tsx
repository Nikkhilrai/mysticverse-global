import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "./RevealOnScroll";
import {
  ADVISORY_BOARD,
  AWARDS_INTRO,
  AWARDS_PHOTO,
  CLOSING,
  FACTS,
  LEAD,
  MEDIA_CONTACT,
  MOMENTS,
  OPENING,
  PARTNERS,
  PILLARS,
  RELEASE,
  SESSIONS,
  type PressPhoto,
} from "./pressReleaseData";
import { AWARDEES, AWARD_YEAR, awardeePortrait } from "@/components/awards/awardeesData";
import { THAILAND } from "@/components/thailand/thailandData";
import styles from "./PressRelease.module.css";

/*
  Press release — MysticVerse Global Conference & Exhibition 2026.

  Dark photo masthead → fact card bridging into a light editorial
  body → sessions set beside their own photographs (alternating
  sides) → a dark awards band with every honouree → closing line,
  a strip of moments linking to the gallery, and media contacts.
*/

const pad = (n: number) => String(n + 1).padStart(2, "0");

function Figure({ p, sizes, className }: { p: PressPhoto; sizes: string; className?: string }) {
  return (
    <figure className={`${styles.figure}${className ? ` ${className}` : ""}`}>
      <Image
        src={p.photo.url}
        alt={p.alt}
        fill
        sizes={sizes}
        className={styles.img}
      />
    </figure>
  );
}

export default function PressRelease() {
  return (
    <main className={styles.page}>
      <RevealOnScroll inClass={styles.in}>
        {/* ── Masthead ─────────────────────────────────────── */}
        <header className={styles.hero}>
          <Image
            src={RELEASE.hero.photo.url}
            alt={RELEASE.hero.alt}
            fill
            priority
            sizes="100vw"
            className={styles.heroImg}
          />
          <div className={styles.heroShade} aria-hidden="true" />

          <div className={styles.heroInner}>
            <p className={styles.kicker}>
              <span className={styles.kickerRule} aria-hidden="true" />
              {RELEASE.kicker} · For immediate release
              <span className={styles.kickerRule} aria-hidden="true" />
            </p>
            <h1 className={styles.title}>{RELEASE.title}</h1>
            <p className={styles.standfirst}>{RELEASE.standfirst}</p>
          </div>
        </header>

        {/* ── Fact card ─────────────────────────────────────── */}
        <dl className={styles.facts} data-reveal>
          {FACTS.map((f) => (
            <div key={f.label} className={styles.fact}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>

        {/* ── Lead ──────────────────────────────────────────── */}
        <div className={styles.column}>
          <p className={styles.lead} data-reveal>
            <strong className={styles.dateline}>{RELEASE.dateline} —</strong> {LEAD}
          </p>

          <div className={styles.credits} data-reveal>
            <div>
              <h2 className={styles.creditsLabel}>Advisory Board</h2>
              <ul className={styles.chips}>
                {ADVISORY_BOARD.map((n) => <li key={n}>{n}</li>)}
              </ul>
            </div>
            <div>
              <h2 className={styles.creditsLabel}>Partners &amp; Exhibitors</h2>
              <ul className={styles.chips}>
                {PARTNERS.map((n) => <li key={n}>{n}</li>)}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Executive summary ────────────────────────────── */}
        <section className={styles.block} aria-labelledby="pr-summary">
          <div className={styles.column}>
            <p className={styles.sectionKicker} data-reveal>01 · The Day</p>
            <h2 id="pr-summary" className={styles.h2} data-reveal>
              Executive Summary and <span className="gradientTextInk">Core Focus Areas</span>
            </h2>
            <p className={styles.para} data-reveal>{OPENING.text}</p>
          </div>

          <div className={styles.openingPhotos} data-reveal>
            {OPENING.photos.map((p, i) => (
              <Figure
                key={p.photo.id}
                p={p}
                sizes={i === 0 ? "(max-width: 760px) 100vw, 640px" : "(max-width: 760px) 100vw, 420px"}
              />
            ))}
          </div>

          <ol className={styles.pillars}>
            {PILLARS.map((p, i) => (
              <li
                key={p}
                className={styles.pillar}
                data-reveal
                style={{ "--i": i } as React.CSSProperties}
              >
                <span className={styles.pillarNum}>{pad(i)}</span>
                <span className={styles.pillarName}>{p}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Sessions ─────────────────────────────────────── */}
        <section className={styles.block} aria-labelledby="pr-sessions">
          <div className={styles.column}>
            <p className={styles.sectionKicker} data-reveal>02 · On Stage</p>
            <h2 id="pr-sessions" className={styles.h2} data-reveal>
              Key Sessions and <span className="gradientTextInk">Speaker Contributions</span>
            </h2>
          </div>

          <div className={styles.sessions}>
            {SESSIONS.map((s, i) => (
              <article key={s.title} className={styles.session} data-reveal>
                <div className={styles.sessionCopy}>
                  <span className={styles.sessionNum} aria-hidden="true">{pad(i)}</span>
                  <h3 className={styles.h3}>{s.title}</h3>
                  <p className={styles.para}>{s.text}</p>
                </div>
                <div className={styles.media} data-count={s.photos.length}>
                  {s.photos.map((p, j) => (
                    <Figure
                      key={p.photo.id}
                      p={p}
                      sizes={j === 0 ? "(max-width: 900px) 100vw, 600px" : "(max-width: 900px) 50vw, 300px"}
                    />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Awards ───────────────────────────────────────── */}
        <section className={styles.awards} aria-labelledby="pr-awards">
          <div className={styles.awardsGlow} aria-hidden="true" />
          <div className={styles.awardsInner}>
            <p className={`${styles.sectionKicker} ${styles.onDark}`} data-reveal>03 · The Honours</p>
            <h2 id="pr-awards" className={`${styles.h2} ${styles.h2Dark}`} data-reveal>
              MysticVerse Excellence <span className="gradientText">Awards {AWARD_YEAR}</span>
            </h2>
            <p className={styles.awardsIntro} data-reveal>{AWARDS_INTRO}</p>

            <Figure
              p={AWARDS_PHOTO}
              sizes="(max-width: 1200px) 100vw, 1100px"
              className={styles.trophies}
            />

            <ul className={styles.awardees}>
              {AWARDEES.map((a, i) => {
                const src = awardeePortrait(a);
                const isLogo = !!a.image?.includes("/partners/");
                return (
                  <li
                    key={a.slug}
                    className={styles.awardee}
                    data-reveal
                    style={{ "--i": i % 5 } as React.CSSProperties}
                  >
                    <span className={`${styles.ring}${isLogo ? ` ${styles.ringLogo}` : ""}`}>
                      {src ? (
                        <Image
                          src={src}
                          alt={a.name}
                          fill
                          sizes="104px"
                          className={isLogo ? styles.logo : styles.portrait}
                        />
                      ) : (
                        <span className={styles.monogram} aria-hidden="true">{a.initials}</span>
                      )}
                    </span>
                    <span className={styles.awardName}>{a.award} {AWARD_YEAR}</span>
                    <span className={styles.awardeeName}>{a.name}</span>
                    <span className={styles.awardFocus}>{a.focus}</span>
                  </li>
                );
              })}
            </ul>

            <Link href="/awards" className={styles.ghostBtn}>
              Meet the awardees <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        {/* ── Closing ──────────────────────────────────────── */}
        <section className={styles.closing} aria-label="Closing">
          <p className={styles.closingText} data-reveal>{CLOSING}</p>
          <p className={styles.endMark} aria-hidden="true">###</p>

          <div className={styles.momentsHead} data-reveal>
            <h2 className={styles.momentsTitle}>Moments from the day</h2>
            <Link href="/gallery" className={styles.textLink}>
              View the full gallery <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className={styles.moments}>
            {MOMENTS.map((p, i) => (
              <Link
                key={p.photo.id}
                href="/gallery"
                className={styles.moment}
                data-reveal
                style={{ "--i": i % 3 } as React.CSSProperties}
                aria-label={`${p.alt} — open the gallery`}
              >
                <Figure p={p} sizes="(max-width: 760px) 50vw, 380px" />
              </Link>
            ))}
          </div>

          <div className={styles.contact} data-reveal>
            <div className={styles.contactCard}>
              <h2 className={styles.contactLabel}>Media enquiries</h2>
              <a href={`mailto:${MEDIA_CONTACT}`} className={styles.contactValue}>
                {MEDIA_CONTACT}
              </a>
              <p className={styles.contactNote}>
                Issued by MantraNex Vista Pvt. Ltd, organiser of MysticVerse Global.
              </p>
            </div>
            <Link href="/contact" className={`${styles.contactCard} ${styles.nextCard}`}>
              <h2 className={styles.contactLabel}>Next edition</h2>
              <span className={styles.contactValue}>
                {THAILAND.city}, {THAILAND.country}
              </span>
              <p className={styles.contactNote}>
                {THAILAND.editionName} · {THAILAND.dateLabel} — register your interest →
              </p>
            </Link>
          </div>
        </section>
      </RevealOnScroll>
    </main>
  );
}

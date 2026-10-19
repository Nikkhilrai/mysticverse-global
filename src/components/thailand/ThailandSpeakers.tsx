"use client";

import Image from "next/image";
import { useInView } from "./useInView";
import { THAILAND_SPEAKERS, type ThailandSpeaker } from "./thailandData";
import { SPEAKERS } from "@/components/speakers/speakersData";
import styles from "./ThailandSpeakers.module.css";
import MaskLines from "./MaskLines";

/*
  Speakers — "first wave announced shortly" (brief §11 #3).

  Until Bangkok speakers are confirmed (THAILAND_SPEAKERS.confirmed is
  empty), two slow, opposing marquee rows show the speakers from
  MysticVerse Global 2026 in Dubai — labelled "From the 2026 stage ·
  Dubai" so nobody reads them as the Bangkok line-up. Once `confirmed`
  has entries, a static grid of the Bangkok speakers replaces them.
  Then the speaker-enquiry CTA (tagged `speaker`, brief §10).
*/

/** The role line, trimmed to its first clause so cards stay compact. */
const shortRole = (title: string) => title.split(/ · |, (?=[A-Z])/)[0];

function SpeakerCard({ s, href }: { s: ThailandSpeaker; href?: string }) {
  const body = (
    <>
      <span className={styles.frame}>
        <span className={styles.frameInner}>
          <Image src={s.image} alt={s.name} fill sizes="150px" className={styles.photo} />
        </span>
      </span>
      <span className={styles.name}>{s.name}</span>
      <span className={styles.role}>{shortRole(s.title)}</span>
    </>
  );
  return href ? (
    <a href={href} className={styles.card}>{body}</a>
  ) : (
    <div className={styles.card}>{body}</div>
  );
}

function MarqueeRow({ list, reverse, href }: { list: ThailandSpeaker[]; reverse?: boolean; href: string }) {
  return (
    <div className={styles.row}>
      <div className={`${styles.track}${reverse ? ` ${styles.reverse}` : ""}`}>
        {/* The list twice, so the loop is seamless; the copy is hidden
            from assistive tech and the tab order. */}
        {[0, 1].map((copy) => (
          <ul key={copy} className={styles.set} aria-hidden={copy === 1 || undefined}>
            {list.map((s) => (
              <li key={s.name} inert={copy === 1 || undefined}>
                <SpeakerCard s={s} href={href} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default function ThailandSpeakers() {
  const [ref, inView] = useInView<HTMLElement>(0.12);
  const { eyebrow, heading, copy, confirmed, pastLabel, pastNote, pastHref, cta } = THAILAND_SPEAKERS;

  const past: ThailandSpeaker[] = SPEAKERS.map(({ name, title, image }) => ({ name, title, image }));
  const half = Math.ceil(past.length / 2);

  return (
    <section
      id="speakers"
      ref={ref}
      className={`${styles.section}${inView ? ` ${styles.in}` : ""}`}
      aria-labelledby="thailand-speakers-title"
    >
      <div className={styles.inner}>
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>
              <span className={styles.rule} aria-hidden="true" />
              {eyebrow}
            </p>
            <h2 id="thailand-speakers-title" className={styles.title}>
              <MaskLines lines={[{ text: heading[0] }, { text: heading[1], tone: "ink" }]} />
            </h2>
          </div>
          <p className={styles.copy}>{copy}</p>
        </header>
      </div>

      {confirmed.length > 0 ? (
        <div className={styles.inner}>
          <ul className={styles.grid} aria-label="Confirmed speakers">
            {confirmed.map((s) => (
              <li key={s.name}>
                <SpeakerCard s={s} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className={styles.past}>
          <div className={styles.inner}>
            <p className={styles.pastHead}>
              <span className={styles.pastTag}>{pastLabel}</span>
              <span className={styles.pastNote}>{pastNote}</span>
            </p>
          </div>
          <div className={styles.marquee} role="region" aria-label={pastLabel}>
            <MarqueeRow list={past.slice(0, half)} href={pastHref} />
            <MarqueeRow list={past.slice(half)} href={pastHref} reverse />
          </div>
        </div>
      )}

      <div className={styles.inner}>
        <div className={styles.cta}>
          <div>
            <h3 className={styles.ctaTitle}>{cta.title}</h3>
            <p className={styles.ctaText}>{cta.text}</p>
          </div>
          <a href={cta.href} className={styles.ctaBtn} data-track={cta.track}>
            {cta.label}
            <span className={styles.arrow} aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

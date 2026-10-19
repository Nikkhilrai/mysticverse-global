"use client";

import Image from "next/image";
import { useInView } from "@/components/thailand/useInView";
import { GALLERY_PHOTOS } from "@/components/gallery/galleryData";
import { SPEAKERS } from "@/components/speakers/speakersData";
import { AWARDEES } from "@/components/awards/awardeesData";
import styles from "./PastEditionDubai.module.css";

/*
  Homepage — "Past edition: Dubai 2026", directly below the Bangkok
  hero. Bangkok leads the homepage; the concluded Dubai edition is
  recapped here with event photos, its numbers (counted from the
  speaker and awardee data, so they never drift) and links to the
  gallery, press release, awards and speakers.
*/

const photo = (id: string) => GALLERY_PHOTOS.find((p) => p.id === id)!;
const PHOTOS = [
  { p: photo("g-020"), alt: "Speakers and honourees on stage at MysticVerse Global 2026, Dubai" },
  { p: photo("g-110"), alt: "The ceremonial lamp-lighting that opened the day" },
  { p: photo("g-089"), alt: "A panel on stage at MysticVerse Global 2026" },
];

const FACTS = [
  { value: "1", label: "day" },
  { value: "4", label: "pillars" },
  { value: String(SPEAKERS.length), label: "speakers" },
  { value: String(AWARDEES.length), label: "awards" },
];

const LINKS = [
  { label: "Event glimpse", href: "/gallery" },
  { label: "Press release", href: "/media/press-release" },
  { label: "Excellence Awards", href: "/awards" },
  { label: "Speakers", href: "/conference/speakers" },
];

export default function PastEditionDubai() {
  const [ref, inView] = useInView<HTMLElement>(0.15);

  return (
    <section
      id="past-edition"
      ref={ref}
      className={`${styles.section}${inView ? ` ${styles.in}` : ""}`}
      aria-labelledby="past-edition-title"
    >
      <div className={styles.inner}>
        <div className={styles.mosaic}>
          {PHOTOS.map(({ p, alt }, i) => (
            <figure key={p.id} className={`${styles.shot} ${styles[`shot${i}`]}`}>
              <Image
                src={p.url}
                alt={alt}
                fill
                sizes={i === 0 ? "(max-width: 900px) 100vw, 560px" : "(max-width: 900px) 50vw, 270px"}
                className={styles.img}
              />
              {i === 0 && <span className={styles.badge}>Concluded · 11 Sep 2026</span>}
            </figure>
          ))}
        </div>

        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span className={styles.rule} aria-hidden="true" />
            Past edition
          </p>
          <h2 id="past-edition-title" className={styles.title}>
            <span className="gradientText">Dubai</span> 2026
          </h2>
          <p className={styles.meta}>
            MysticVerse Global 2026 · 11 September 2026 · Taj Jumeirah Lakes Towers, Dubai
          </p>
          <p className={styles.text}>
            The inaugural edition brought global executives, clinicians and
            wellness innovators into one room — a convergence of conscious
            living, modern science and enterprise strategy, closing with the
            MysticVerse Global Excellence Awards.
          </p>

          <ul className={styles.facts}>
            {FACTS.map((f) => (
              <li key={f.label}>
                <span className={styles.factValue}>{f.value}</span>
                <span className={styles.factLabel}>{f.label}</span>
              </li>
            ))}
          </ul>

          <ul className={styles.links}>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={styles.link}>
                  {l.label} <span className={styles.arrow} aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

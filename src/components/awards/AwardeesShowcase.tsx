"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "./AwardeesShowcase.module.css";
import { AWARDEES, AWARD_YEAR, awardeePortrait } from "./awardeesData";

const pad = (n: number) => String(n + 1).padStart(2, "0");

export default function AwardeesShowcase() {
  const gridRef = useRef<HTMLDivElement>(null);

  /* Reveal cards as they scroll into view. */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>("[data-card]"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cards.forEach((c) => c.classList.add(styles.in));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.in);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section id="awardees" className={styles.section} aria-labelledby="awardees-heading">
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.head}>
          <div className={styles.overlineWrap}>
            <span className={styles.overlineRule} aria-hidden="true" />
            <p className={styles.overline}>The Honourees · {AWARD_YEAR}</p>
            <span className={styles.overlineRule} aria-hidden="true" />
          </div>
          <h2 id="awardees-heading" className={styles.heading}>
            Honoured on the <span className="gradientText">main stage.</span>
          </h2>
        </header>

        <div ref={gridRef} className={styles.grid}>
          {AWARDEES.map((a, i) => {
            const src = awardeePortrait(a);
            return (
              <article
                key={a.slug}
                data-card
                className={styles.card}
                style={{ "--i": i } as React.CSSProperties}
              >
                <span className={styles.index} aria-hidden="true">{pad(i)}</span>

                <div className={styles.frame}>
                  <div className={styles.frameInner}>
                    {src ? (
                      <Image
                        src={src}
                        alt={`${a.name} — ${a.award} ${AWARD_YEAR}`}
                        fill
                        sizes="(max-width: 640px) 112px, 200px"
                        className={styles.portrait}
                      />
                    ) : (
                      <span className={styles.monogram} aria-hidden="true">
                        {a.initials}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.body}>
                  <p className={styles.eyebrow}>
                    <span className={styles.star} aria-hidden="true">✦</span>
                    Awardee · {AWARD_YEAR}
                  </p>
                  <h3 className={styles.award}>
                    <span className="gradientText">{a.award}</span>
                  </h3>
                  <p className={styles.name}>{a.name}</p>
                  <p className={styles.focus}>{a.focus}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className={styles.closing}>
          <span className={styles.closingMark} aria-hidden="true">✦</span>
          <h2 className={styles.closingTitle}>Congratulations to every honouree.</h2>
          <p className={styles.closingText}>
            Thank you to everyone who filled the room in Dubai on 11 September.
          </p>
          <div className={styles.actions}>
            <Link href="/gallery" className={styles.primary}>
              View event gallery <span aria-hidden="true">→</span>
            </Link>
            <Link href="/conference/speakers" className={styles.secondary}>
              Meet the speakers
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

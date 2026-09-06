"use client";

import { useEffect, useRef, useState } from "react";
import { DECKS } from "@/lib/sponsorship";
import DeckRequestModal from "./DeckRequestModal";
import styles from "./SponsorDecks.module.css";

export default function SponsorDecks() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [deckId, setDeckId] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="request-deck"
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-labelledby="sponsor-decks-heading"
    >
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.head}>
          <div className={styles.overlineWrap}>
            <span className={styles.overlineRule} aria-hidden="true" />
            <p className={styles.overline}>Request the deck</p>
            <span className={styles.overlineRule} aria-hidden="true" />
          </div>
          <h2 id="sponsor-decks-heading" className={styles.heading}>
            Three decks. Each tailored to your audience.
          </h2>
        </header>

        <ul className={styles.grid}>
          {DECKS.map((d, i) => (
            <li
              key={d.id}
              className={styles.card}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className={styles.cardNo} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.cardName}>{d.name}</h3>
              <p className={styles.cardAudience}>{d.audience}</p>
              <button
                type="button"
                className={styles.cardCta}
                onClick={() => setDeckId(d.id)}
              >
                Request the deck
                <span className={styles.arrow} aria-hidden="true">→</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <DeckRequestModal deckId={deckId} onClose={() => setDeckId(null)} />
    </section>
  );
}

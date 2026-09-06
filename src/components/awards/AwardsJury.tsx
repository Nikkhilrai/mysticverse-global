"use client";

import { useEffect, useRef, useState } from "react";
import AwardSubmissionModal, { type AwardModalMode } from "./AwardSubmissionModal";
import styles from "./AwardsJury.module.css";

/*
  Placeholder section — deliberately states only what is settled
  (the shape of the panel and the stages of the process). No juror
  names, no dates: those are announced as the panel is confirmed.
*/
const BLOCKS = [
  {
    no: "01",
    label: "The Panel",
    title: "Global and regional jurors",
    body: "The panel pairs three to four global jurors with three to four regional jurors, so every entry is read both against an international benchmark and against the market it was built in.",
    status: "Panel being confirmed",
  },
  {
    no: "02",
    label: "The Timeline",
    title: "Submission to ceremony",
    body: "Nominations open, entries are shortlisted by the panel, finalists are notified ahead of the conference, and winners are announced live on the main stage in Dubai.",
    status: "Dates to be announced",
  },
  {
    no: "03",
    label: "The Criteria",
    title: "How entries are judged",
    body: "Entries are evaluated on demonstrable outcomes rather than intent — the measurable difference the work made, the rigour behind it, and how credibly it advances conscious luxury as a standard.",
    status: "Full criteria to be published",
  },
];

export default function AwardsJury() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<AwardModalMode | null>(null);

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
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="jury"
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-labelledby="awards-jury-heading"
    >
      <div className={styles.inner}>
        <header className={styles.head}>
          <div className={styles.overlineWrap}>
            <span className={styles.overlineRule} aria-hidden="true" />
            <p className={styles.overline}>Jury &amp; Process</p>
          </div>
          <h2 id="awards-jury-heading" className={styles.heading}>
            How the awards are decided.
          </h2>
          <p className={styles.deck}>
            The jury panel is being assembled now. Here is the shape of the
            process — names, dates, and the full criteria follow as each is
            confirmed.
          </p>
        </header>

        <ul className={styles.grid}>
          {BLOCKS.map((b, i) => (
            <li
              key={b.no}
              className={styles.card}
              style={{ "--i": i } as React.CSSProperties}
            >
              <div className={styles.cardTop}>
                <span className={styles.cardNo}>{b.no}</span>
                <span className={styles.cardLabel}>{b.label}</span>
              </div>
              <h3 className={styles.cardTitle}>{b.title}</h3>
              <p className={styles.cardBody}>{b.body}</p>
              <span className={styles.status}>
                <span className={styles.statusDot} aria-hidden="true" />
                {b.status}
              </span>
            </li>
          ))}
        </ul>

        <div className={styles.closer}>
          <p className={styles.closerText}>
            Interested in sitting on the panel, or putting a project forward?
          </p>
          <div className={styles.closerActions}>
            <button
              type="button"
              className={styles.closerLink}
              onClick={() => setMode("JURY_PARTNER")}
            >
              Join the jury
              <span className={styles.arrow} aria-hidden="true">→</span>
            </button>
            <a href="/nomination-form" className={styles.closerLink}>
              Nominate a project
              <span className={styles.arrow} aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      <AwardSubmissionModal mode={mode} onClose={() => setMode(null)} />
    </section>
  );
}

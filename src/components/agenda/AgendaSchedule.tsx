"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef } from "react";
import styles from "./AgendaSchedule.module.css";
import {
  SESSIONS,
  CONFERENCE_DATE,
  CONFERENCE_THEME,
  type Session,
  type SessionSpeaker,
} from "./agendaData";
import { SPEAKERS } from "@/components/speakers/speakersData";

/** Resolves a speaker's photo — a direct image path, or their MysticVerse speaker profile, if any. */
function speakerImage(sp: SessionSpeaker): string | undefined {
  if (sp.image) return sp.image;
  if (!sp.slug) return undefined;
  return SPEAKERS.find((s) => s.slug === sp.slug)?.image;
}

function SessionRow({ s }: { s: Session }) {
  return (
    <article
      data-row
      className={`${styles.row} ${styles[s.kind]}`}
    >
      <div className={styles.timeCol}>
        <span className={styles.time}>{s.time}</span>
      </div>

      <div className={styles.rail} aria-hidden="true">
        <span className={styles.node} />
      </div>

      <div className={styles.content}>
        <div className={styles.head}>
          <span className={styles.tag}>{s.tag}</span>
        </div>
        <h3 className={styles.title}>{s.title}</h3>
        {s.desc && <p className={styles.desc}>{s.desc}</p>}
        {s.speakers && (
          <ul className={styles.speakers}>
            {s.speakers.map((sp) => {
              const img = speakerImage(sp);
              return (
                <li key={sp.name} className={styles.speakerItem}>
                  {img ? (
                    <Image
                      src={img}
                      alt={sp.name}
                      width={40}
                      height={40}
                      className={styles.speakerAvatar}
                    />
                  ) : (
                    <span className={styles.speakerAvatarFallback} aria-hidden="true" />
                  )}
                  <span className={styles.speakerText}>
                    <span className={styles.speakerName}>{sp.name}</span>
                    {sp.role && <span className={styles.speakerRole}>{sp.role}</span>}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
        {s.points && (
          <ul className={styles.points}>
            {s.points.map((p) => (
              <li key={p} className={styles.point}>
                <span className={styles.pointMark} aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

export default function AgendaSchedule() {
  const listRef = useRef<HTMLDivElement>(null);

  /* Reveal rows as they scroll into view. */
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const rows = Array.from(
      list.querySelectorAll<HTMLElement>("[data-row]"),
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      rows.forEach((r) => r.classList.add(styles.rowIn));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.rowIn);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.section} aria-label="Agenda schedule">
      <div className={styles.inner}>

        {/* ── Day header ─────────────────────────────────────── */}
        <div className={styles.dayHead}>
          <span className={styles.dayDate}>{CONFERENCE_DATE}</span>
          <h2 className={styles.dayTheme}>{CONFERENCE_THEME}</h2>
        </div>

        {/* ── Timeline ──────────────────────────────────────── */}
        <div ref={listRef} className={styles.list}>
          {SESSIONS.map((s) => (
            <Fragment key={s.title}>
              {s.section && (
                <h3 data-row className={styles.sectionHead}>
                  {s.section}
                </h3>
              )}
              <SessionRow s={s} />
            </Fragment>
          ))}
        </div>

      </div>
    </section>
  );
}

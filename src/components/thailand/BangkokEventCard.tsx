"use client";

import { useEffect, useState } from "react";
import BangkokSkyline from "./BangkokSkyline";
import { THAILAND } from "./thailandData";
import styles from "./BangkokEventCard.module.css";

/*
  Compact "next edition" card for the homepage hero — same idea as the
  floating event cards on the LexTalk World hero.

  ≥1180px: a portrait card floating in the hero's empty right side,
           with the skyline line art as its picture.
  <1180px: a slim one-line card under the hero CTAs.

  Links to /contact until /thailand launches — then change `href`.
*/

/* Doors open 1 July 2027, 08:00 Bangkok time (UTC+7). */
const OPENS_AT = Date.UTC(2027, 6, 1, 1, 0, 0);

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 1 1 13 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

export default function BangkokEventCard() {
  // Computed after mount so server and client markup always match.
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    setDays(Math.max(0, Math.ceil((OPENS_AT - Date.now()) / 86_400_000)));
  }, []);

  return (
    <a
      href="/contact"
      className={styles.card}
      aria-label={`Next edition: ${THAILAND.editionName}, ${THAILAND.city}, ${THAILAND.country}, ${THAILAND.dateLabel}. Register your interest.`}
    >
      <span className={styles.ring} aria-hidden="true" />

      <span className={styles.top}>
        <span className={styles.chip}>
          <span className={styles.pulse} aria-hidden="true" />
          Next edition
        </span>
        {days !== null && <span className={styles.days}>{days} days</span>}
      </span>

      <span className={styles.art} aria-hidden="true">
        <BangkokSkyline />
      </span>

      <span className={styles.info}>
        <span className={styles.date}>
          <CalendarIcon />
          {THAILAND.dateLabel}
        </span>
        <span className={styles.city}>{THAILAND.city}</span>
        <span className={styles.place}>
          <PinIcon />
          {THAILAND.country} · {THAILAND.editionName}
        </span>
        <span className={styles.cta}>
          Register interest <span className={styles.arrow}>→</span>
        </span>
      </span>

      <span className={styles.shimmer} aria-hidden="true" />
    </a>
  );
}

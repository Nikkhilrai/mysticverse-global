"use client";

import { useInView } from "./useInView";
import ThailandStatStrip from "./ThailandStatStrip";
import { THAILAND_ROOM } from "./thailandData";
import styles from "./ThailandRoom.module.css";
import MaskLines from "./MaskLines";

/*
  Section 5 — The room (brief §6).
  A seating plan: rows of seats arcing round a stage. The first 150
  fill in from the front; the last 30 stay as outlines up to a dashed
  cap line — one room, capped deliberately at 180. Then the shared
  stat strip and the three commitments about how numbers are reported.
*/

/* ── Seat geometry (deterministic, rounded so server and client
      markup always match) ──────────────────────────────────── */
const CX = 300;
const CY = 312;
const ROWS = 9;
const R0 = 80;
const ROW_STEP = 24;
const SPREAD = 0.2; // radians trimmed off each end of the half-circle

const GOLD = [183, 134, 43];
const FUCHSIA = [168, 85, 216];
const VIOLET = [91, 63, 217];

function mix(a: number[], b: number[], t: number) {
  return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",")})`;
}
/** Gold on the left, through fuchsia, to violet on the right. */
function tone(t: number) {
  return t < 0.5 ? mix(GOLD, FUCHSIA, t * 2) : mix(FUCHSIA, VIOLET, (t - 0.5) * 2);
}

interface Seat { x: number; y: number; fill: string; cap: boolean; i: number }

function buildSeats(total: number, base: number): Seat[] {
  const radii = Array.from({ length: ROWS }, (_, k) => R0 + k * ROW_STEP);
  const sum = radii.reduce((a, r) => a + r, 0);
  const counts = radii.map((r) => Math.round((total * r) / sum));
  counts[ROWS - 1] += total - counts.reduce((a, c) => a + c, 0);

  const seats: Seat[] = [];
  radii.forEach((r, k) => {
    const n = counts[k];
    for (let j = 0; j < n; j++) {
      const t = n === 1 ? 0.5 : j / (n - 1);
      const a = Math.PI + SPREAD + t * (Math.PI - 2 * SPREAD);
      const i = seats.length;
      seats.push({
        x: Math.round((CX + r * Math.cos(a)) * 10) / 10,
        y: Math.round((CY + r * Math.sin(a)) * 10) / 10,
        fill: tone(t),
        cap: i >= base,
        i,
      });
    }
  });
  return seats;
}

const { base, cap } = THAILAND_ROOM.seats;
const SEATS = buildSeats(cap, base);
const CAP_R = R0 + ROWS * ROW_STEP - 6;

function SeatPlan() {
  const a0 = Math.PI + SPREAD - 0.06;
  const a1 = 2 * Math.PI - SPREAD + 0.06;
  const p = (a: number) => `${(CX + CAP_R * Math.cos(a)).toFixed(1)} ${(CY + CAP_R * Math.sin(a)).toFixed(1)}`;

  return (
    <svg
      className={styles.plan}
      viewBox="0 0 600 330"
      role="img"
      aria-label={`Seating plan: one room of ${base} to ${cap} seats around a single stage, capped at ${cap}.`}
    >
      {/* Cap line beyond the back row */}
      <path d={`M ${p(a0)} A ${CAP_R} ${CAP_R} 0 0 1 ${p(a1)}`} className={styles.capLine} pathLength={1} />
      <text x={CX} y={CY - CAP_R - 10} textAnchor="middle" className={styles.capText}>
        Capped at {cap}
      </text>

      {SEATS.map((s) => (
        <circle
          key={s.i}
          cx={s.x}
          cy={s.y}
          r="6"
          className={s.cap ? styles.seatCap : styles.seat}
          style={{ "--k": s.i, fill: s.cap ? undefined : s.fill } as React.CSSProperties}
        />
      ))}

      {/* Stage */}
      <path d={`M ${CX - 50} ${CY} A 50 50 0 0 1 ${CX + 50} ${CY} Z`} className={styles.stage} />
      <text x={CX} y={CY - 14} textAnchor="middle" className={styles.stageText}>Stage</text>
    </svg>
  );
}

export default function ThailandRoom() {
  const [ref, inView] = useInView<HTMLElement>(0.15);
  const { eyebrow, heading, copy, who, numbersIntro, commitments, stats } = THAILAND_ROOM;
  const [headA, headB] = heading.split(", ");

  return (
    <section
      id="the-room"
      ref={ref}
      className={`${styles.section}${inView ? ` ${styles.in}` : ""}`}
      aria-labelledby="thailand-room-title"
    >
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>
              <span className={styles.rule} aria-hidden="true" />
              {eyebrow}
            </p>
            <h2 id="thailand-room-title" className={styles.title}>
              <MaskLines lines={[{ text: `${headA},` }, { text: headB, tone: "ink" }]} />
            </h2>
            <p className={styles.lede}>{copy}</p>
            <ul className={styles.who} aria-label="Who is in the room">
              {who.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>

          <figure className={styles.visual}>
            <SeatPlan />
            <figcaption className={styles.legend}>
              <span><i className={styles.keyFill} aria-hidden="true" /> {base} seats</span>
              <span><i className={styles.keyCap} aria-hidden="true" /> Up to {cap} — and no further</span>
            </figcaption>
          </figure>
        </div>

        <ThailandStatStrip stats={stats} run={inView} className={styles.stats} />

        <div className={styles.numbers}>
          <h3 className={styles.numbersTitle}>{numbersIntro}</h3>
          <ul className={styles.commitments}>
            {commitments.map((c, i) => (
              <li key={c.title} className={styles.commitment} style={{ "--i": i } as React.CSSProperties}>
                <span className={styles.check} aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none">
                    <path d="M5 10.5l3.2 3.2L15 7" pathLength={1} />
                  </svg>
                </span>
                <span className={styles.commitTitle}>{c.title}</span>
                <span className={styles.commitText}>{c.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

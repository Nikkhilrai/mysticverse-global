"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./WhyDubaiReasons.module.css";

const HOTELS = [
  "Aman",
  "Bulgari",
  "Cheval Blanc",
  "One&Only",
  "Mandarin Oriental",
  "Six Senses",
  "Deira",
];

export default function WhyDubaiReasons() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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
      { threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-labelledby="why-dubai-reasons-heading"
    >
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.head}>
          <div className={styles.overlineWrap}>
            <span className={styles.overlineRule} aria-hidden="true" />
            <p className={styles.overline}>Why Dubai</p>
          </div>
          <h2 id="why-dubai-reasons-heading" className={styles.heading}>
            Three <span className="gradientText">reasons.</span>
          </h2>
          <p className={styles.sub}>
            Connectivity, hospitality, and a meeting of worlds.
          </p>
        </header>

        {/* ── Reason 01 — A Global Hub ── */}
        <article className={styles.row}>
          <div className={`${styles.visual} ${styles.mapVisual}`}>
            <ConnectivityDiagram />
          </div>
          <div className={styles.copy}>
            <span className={styles.tag}>
              <span className={styles.tagNo}>01</span> A Global Hub
            </span>
            <h3 className={styles.kicker}>
              Three hours from a third of the world.
            </h3>
            <p className={styles.statement}>
              Direct flights from more than 200 cities. A six-hour journey from
              London, Mumbai, Singapore, or Cape Town. There is no easier global
              meeting point.
            </p>
          </div>
        </article>

        {/* ── Reason 02 — Hospitality ── */}
        <article className={`${styles.row} ${styles.flip}`}>
          <div className={styles.visual}>
            <div className={styles.hospitality}>
              <img
                className={styles.hotelImg}
                src="/images/why-dubai/hospitality.jpg"
                alt="A five-star Dubai hotel suite with a sculptural gold headboard and crisp white linens."
                loading="lazy"
              />
              <span className={styles.hotelGrade} aria-hidden="true" />
              <span className={styles.hotelStat}>
                <span className={styles.hotelStatValue}>5★</span>
                room nights / km²
                <span className={styles.hotelStatRank}>No. 1 in the world</span>
              </span>
              <div className={styles.marquee} aria-hidden="true">
                <div className={`${styles.mTrack} ${styles.mLeft}`}>
                  {[...HOTELS, ...HOTELS].map((h, i) => (
                    <span key={`a${i}`} className={styles.mItem}>{h}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.copy}>
            <span className={styles.tag}>
              <span className={styles.tagNo}>02</span> World-Class Hospitality &amp; Wellness
            </span>
            <h3 className={styles.kicker}>
              The best rooms in the world, next door.
            </h3>
            <p className={styles.statement}>
              More five-star room nights per square kilometre than any other city
              in the world. Aman, Bulgari, Cheval Blanc, One&amp;Only, Mandarin
              Oriental, Six Senses — all in residence within 30 minutes of the
              venue.
            </p>
          </div>
        </article>

        {/* ── Reason 03 — Crossroads ── */}
        <article className={styles.row}>
          <div className={styles.visual}>
            <CrossroadsDiagram />
          </div>
          <div className={styles.copy}>
            <span className={styles.tag}>
              <span className={styles.tagNo}>03</span> The Crossroads of East &amp; West
            </span>
            <h3 className={styles.kicker}>
              Where two traditions meet.
            </h3>
            <p className={styles.statement}>
              Vedic wisdom and Sufi tradition. Western longevity science and
              Asian contemplative practice. Dubai sits at the intersection. So
              does MysticVerse.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

/* ── Connectivity arc-map (real world map) ────────────────── */
function ConnectivityDiagram() {
  // Coordinates in the world-map SVG's own viewBox space, taken from
  // each country's real position (getBBox on ISO-coded paths).
  const dxb = { x: 534, y: 467 };
  const cities = [
    { label: "London", x: 403, y: 375, lx: 403, ly: 361, anchor: "middle" },
    { label: "Mumbai", x: 579, y: 478, lx: 591, ly: 481, anchor: "start" },
    { label: "Singapore", x: 659, y: 527, lx: 649, ly: 523, anchor: "end" },
    { label: "Cape Town", x: 449, y: 619, lx: 449, ly: 638, anchor: "middle" },
  ] as const;

  return (
    <>
      {/* Fuse the country polygons into one seamless landmass — no internal
          political borders are drawn, so no nation (India included) is ever
          shown with an incorrect boundary. */}
      <svg className={styles.defs} aria-hidden="true" focusable="false">
        <filter id="dubaiLandMerge">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.7" result="b" />
          <feColorMatrix
            in="b"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -8"
          />
        </filter>
      </svg>
      <div className={styles.mapMerge} aria-hidden="true">
        <div className={styles.mapBase} />
      </div>
      <svg
        className={styles.mapSvg}
        viewBox="30.767 241.591 784.077 458.627"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Direct flight connections from Dubai to London, Mumbai, Singapore and Cape Town"
      >
        {/* flight arcs */}
        {cities.map((c, i) => {
          const mx = (dxb.x + c.x) / 2 + (c.y - dxb.y) * 0.2;
          const my = (dxb.y + c.y) / 2 - (c.x - dxb.x) * 0.2;
          return (
            <path
              key={`arc-${c.label}`}
              className={styles.arc}
              style={{ "--d": `${300 + i * 180}ms` } as React.CSSProperties}
              d={`M${dxb.x} ${dxb.y} Q${mx} ${my} ${c.x} ${c.y}`}
              fill="none"
            />
          );
        })}

        {/* city endpoints + labels */}
        {cities.map((c, i) => (
          <g
            key={c.label}
            className={styles.endpoint}
            style={{ "--d": `${760 + i * 170}ms` } as React.CSSProperties}
          >
            <circle cx={c.x} cy={c.y} r="6" className={styles.endpointDot} />
            <text x={c.lx} y={c.ly} className={styles.endpointLabel} textAnchor={c.anchor}>
              {c.label}
            </text>
          </g>
        ))}

        {/* Dubai core */}
        <circle className={styles.coreHalo} cx={dxb.x} cy={dxb.y} r="14" />
        <circle className={styles.core} cx={dxb.x} cy={dxb.y} r="8" />
        <text x={dxb.x} y={dxb.y - 16} className={styles.coreLabel} textAnchor="middle">
          DUBAI
        </text>
      </svg>

      <span className={styles.mapBadge}>200+ cities · one hop</span>
    </>
  );
}

/* ── Crossroads — real contemplative image ────────────────── */
function CrossroadsDiagram() {
  return (
    <>
      <img
        className={styles.crossImg}
        src="/images/why-dubai/traditions.jpg"
        alt="A figure meditating in lotus at golden hour — contemplative practice."
        loading="lazy"
      />
      <span className={styles.crossGrade} aria-hidden="true" />
      <span className={styles.crossTag}>
        East <span className={styles.crossTagArrow} aria-hidden="true">⟷</span> West
      </span>
      <span className={styles.crossCaption}>
        Vedic&nbsp;·&nbsp;Sufi&nbsp;·&nbsp;Longevity&nbsp;·&nbsp;Contemplative
      </span>
    </>
  );
}

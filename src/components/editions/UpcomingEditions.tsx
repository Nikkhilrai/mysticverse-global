"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./UpcomingEditions.module.css";

const EDITIONS = [
  {
    year: "2026",
    city: "Dubai",
    tag: "Inaugural Edition",
    status: "Now Open",
    kind: "live" as const,
    meta: "10 & 11 September · Dubai, UAE",
    copy: "Two days where the builders, investors, and practitioners shaping the conscious luxury economy — and the people buying into it — share the same room.",
    image: "/images/editions/dubai-night-3.jpg",
    action: { label: "Reserve Your Seat", href: "#register" },
  },
  {
    year: "2027",
    city: "Bangkok",
    tag: "Second Edition",
    status: "Coming Next",
    kind: "next" as const,
    meta: "Dates & venue to be confirmed",
    copy: "The series continues into Asia. Be first to know when dates and venue are announced.",
    image: null,
    action: { label: "Notify Me", href: "/notify" },
  },
  {
    year: "2028",
    city: "To Be Revealed",
    tag: "Third Edition",
    status: "On The Horizon",
    kind: "future" as const,
    meta: "Host city under consideration",
    copy: "The platform expands. The next host city will be announced in due course.",
    image: null,
    action: null,
  },
] as const;

export default function UpcomingEditions() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); io.disconnect(); }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.section}${visible ? ` ${styles.visible}` : ""}`}
      aria-label="MysticVerse Global — The Global Series"
    >
      <div className={styles.inner}>

        {/* ── Header ────────────────────────────────────────── */}
        <div className={styles.header}>
          <div className={styles.eyebrowWrap}>
            <p className={styles.eyebrow}>The Global Series</p>
          </div>
          <h2 className={styles.headline}>
            The World Is <span className="gradientText">The Venue.</span>
          </h2>
          <p className={styles.sub}>
            One platform, travelling the world's capitals of conscious capital.
            Here is where the series goes next.
          </p>
        </div>

        {/* ── Roadmap ───────────────────────────────────────── */}
        <div className={styles.track}>
          {EDITIONS.map((e) => (
            <article key={e.year} className={`${styles.edition} ${styles[e.kind]}`}>

              {/* Timeline rail */}
              <div className={styles.rail} aria-hidden="true">
                <span className={styles.node} />
                <span className={styles.railLine} />
              </div>

              <div className={styles.head}>
                <span className={styles.year}>{e.year}</span>
                <span className={styles.statusPill}>
                  {e.kind === "live" && <span className={styles.statusDot} aria-hidden="true" />}
                  {e.status}
                </span>
              </div>

              {e.image && (
                <div className={styles.banner}>
                  <Image
                    src={e.image}
                    alt={`${e.city} — MysticVerse Global ${e.year}`}
                    fill
                    sizes="(max-width: 900px) 100vw, 45vw"
                    className={styles.bannerImg}
                  />
                  <div className={styles.bannerGrad} aria-hidden="true" />
                </div>
              )}

              <span className={styles.tag}>{e.tag}</span>
              <h3 className={styles.city}>{e.city}</h3>
              <p className={styles.meta}>{e.meta}</p>
              <p className={styles.copy}>{e.copy}</p>

              {e.action ? (
                <a
                  href={e.action.href}
                  className={e.kind === "live" ? styles.actionPrimary : styles.actionGhost}
                >
                  {e.action.label}
                  <span className={styles.arrow} aria-hidden="true">→</span>
                </a>
              ) : (
                <span className={styles.actionFuture}>Announcement to follow</span>
              )}

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

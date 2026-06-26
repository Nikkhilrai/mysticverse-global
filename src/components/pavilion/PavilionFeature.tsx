"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./PavilionFeature.module.css";

type Stat =
  | { kind: "num"; to: number; suffix: string; label: string }
  | { kind: "text"; text: string; label: string };

const STATS: Stat[] = [
  { kind: "num", to: 500, suffix: " sqm", label: "Zone Footprint" },
  { kind: "num", to: 20, suffix: "+", label: "Curated Brands" },
  { kind: "text", text: "HNI-First", label: "Audience Profile" },
];

const HOTSPOTS = [
  {
    top: "20%", left: "30%",
    tag: "Installations",
    title: "Biophilic Installations",
    desc: "Circadian-lit, plant-integrated environments co-built with developers and design houses.",
  },
  {
    top: "31%", left: "60%",
    tag: "Real Estate",
    title: "Branded Wellness Residences",
    desc: "Walkthrough mock-ups of branded residences from the developers defining the category.",
  },
  {
    top: "22%", left: "83%",
    tag: "Longevity",
    title: "Longevity Clinics",
    desc: "Biological-age testing, regenerative protocols, and performance-medicine partners.",
  },
  {
    top: "60%", left: "80%",
    tag: "Luxury Retail",
    title: "Crystal & Jewellery Houses",
    desc: "Rare crystal and ceremonial jewellery houses beside the architects of conscious living.",
  },
] as const;

/* Count-up numeral — animates once the section is in view. */
function CountUp({ to, suffix, start }: { to: number; suffix: string; start: boolean }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    const DURATION = 1100;
    const DELAY = 720; // start after the stats row has animated in
    let raf = 0;
    let startT: number | null = null;

    const tick = (t: number) => {
      if (startT === null) startT = t;
      const elapsed = t - startT - DELAY;
      if (elapsed < 0) { raf = requestAnimationFrame(tick); return; }
      const p = Math.min(elapsed / DURATION, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setN(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to]);

  return <>{`${n}${suffix}`}</>;
}

export default function PavilionFeature() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [pinned, setPinned] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); io.disconnect(); }
      },
      { threshold: 0.18 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);


  return (
    <section
      ref={ref}
      className={`${styles.section}${visible ? ` ${styles.visible}` : ""}`}
      aria-label="The Conscious Living Pavilion"
      onClick={() => setPinned(null)}
    >
      {/* Full-bleed cinematic image */}
      <Image
        src="/images/pavilion/pavilion-a.jpg"
        alt="Biophilic architectural interior — the Conscious Living Pavilion."
        fill
        sizes="100vw"
        className={styles.bg}
      />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={`${styles.grain} noise`} aria-hidden="true" />

      {/* Interactive hotspots — hover/focus to reveal what's in the zone */}
      <div className={styles.hotspots}>
        {HOTSPOTS.map((h, i) => (
          <button
            key={h.title}
            type="button"
            className={`${styles.hotspot}${pinned === i ? ` ${styles.pinned}` : ""}`}
            style={{ top: h.top, left: h.left }}
            aria-label={`${h.title} — ${h.desc}`}
            aria-pressed={pinned === i}
            onClick={(e) => {
              e.stopPropagation();
              setPinned((p) => (p === i ? null : i));
            }}
          >
            <span className={styles.hotspotStem} aria-hidden="true" />
            <span className={styles.hotspotDot} aria-hidden="true" />
            <span className={styles.hotspotCard}>
              <span className={styles.hotspotTag}>{h.tag}</span>
              <span className={styles.hotspotTitle}>{h.title}</span>
              <span className={styles.hotspotDesc}>{h.desc}</span>
            </span>
          </button>
        ))}
      </div>

      {/* Floating frosted-glass panel */}
      <div className={styles.inner}>
        <div className={styles.panel}>

          <div className={styles.eyebrowWrap}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            <p className={styles.eyebrow}>The Flagship Zone</p>
          </div>

          <h2 className={styles.headline}>
            The Conscious<br />
            <span className="gradientText">Living Pavilion.</span>
          </h2>

          <p className={styles.subCopy}>
            Where wellness real estate and luxury retail share the same room —
            because they speak to the same buyer.
          </p>

          <p className={styles.body}>
            Five hundred square metres at the heart of the venue: walkthrough
            mock-ups of branded wellness residences, biophilic installations, and
            rare crystal houses placed beside the architects shaping the next
            decade of conscious communities.
          </p>

          <div className={styles.stats} aria-label="Pavilion at a glance">
            {STATS.map((s) => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statValue}>
                  {s.kind === "num"
                    ? <CountUp to={s.to} suffix={s.suffix} start={visible} />
                    : s.text}
                </span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>

          <a href="/pavilion" className={styles.cta}>
            Step Inside the Pavilion
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </a>

        </div>
      </div>
    </section>
  );
}

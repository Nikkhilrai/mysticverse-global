"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./PavilionZones.module.css";

type Zone = {
  no: string;
  title: string;
  desc: string;
  image: string;
  alt: string;
};

const ZONES: Zone[] = [
  {
    no: "01",
    title: "Villa Walkthroughs",
    desc: "VR/360 and physical mock-ups of branded wellness residences and architect-led projects.",
    image: "/images/pavilion/zones/zone1.jpg",
    alt: "A branded wellness residence — architect-led villa interior.",
  },
  {
    no: "02",
    title: "The Biophilic Installation",
    desc: "A centrepiece curated by a leading design house. Living material, water, light, scent.",
    image: "/images/pavilion/zones/zone2.jpg",
    alt: "A living wall of ferns — biophilic material, deep green.",
  },
  {
    no: "03",
    title: "The Meditation Garden",
    desc: "Sponsored by a single developer for the two days. The brand owns the space, the smell, the silence.",
    image: "/images/pavilion/zones/zone3.jpg",
    alt: "A Japanese dry garden — raked gravel in concentric circles.",
  },
  {
    no: "04",
    title: "Luxury Retail Curation",
    desc: "Rare crystals, ceremonial jewellery, sacred fragrance, wellness home technology — placed in dialogue with the architectural showcases.",
    image: "/images/pavilion/zones/zone4.jpg",
    alt: "Ceremonial jewellery and rare stones on display.",
  },
  {
    no: "05",
    title: "The Pavilion Stage",
    desc: "Its own programme of panels and briefings — investor briefings, architect forums, retail conversations.",
    image: "/images/pavilion/zones/zone5.jpg",
    alt: "An audience at a briefing on the Pavilion stage.",
  },
  {
    no: "06",
    title: "Wellness Tourism & Retreat Curators",
    desc: "Destination boards and luxury retreat operators, with rolling visual content.",
    image: "/images/pavilion/zones/zone6.jpg",
    alt: "A luxury wellness retreat — infinity pool over water.",
  },
];

export default function PavilionZones() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);

  // Reveal-in for the heading block
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Scroll-driven horizontal walk (desktop / motion-ok only)
  useEffect(() => {
    const track = trackRef.current;
    const sticky = stickyRef.current;
    const rail = railRef.current;
    const fill = fillRef.current;
    if (!track || !sticky || !rail || !fill) return;

    const mqSmall = window.matchMedia("(max-width: 860px)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let travel = 0;
    let raf = 0;
    let lastActive = -1;

    const isVertical = () => mqSmall.matches || mqMotion.matches;

    const layout = () => {
      if (isVertical()) {
        track.style.height = "";
        rail.style.transform = "";
        fill.style.transform = "scaleX(0)";
        travel = 0;
        return;
      }
      travel = Math.max(0, rail.scrollWidth - sticky.clientWidth);
      track.style.height = `${window.innerHeight + travel}px`;
      render();
    };

    const render = () => {
      raf = 0;
      if (isVertical() || travel <= 0) return;
      const rect = track.getBoundingClientRect();
      const total = track.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      rail.style.transform = `translate3d(${-(p * travel)}px, 0, 0)`;
      fill.style.transform = `scaleX(${p})`;
      const idx = Math.round(p * (ZONES.length - 1));
      if (idx !== lastActive) {
        lastActive = idx;
        setActive(idx);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    layout();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", layout);
    mqSmall.addEventListener("change", layout);
    mqMotion.addEventListener("change", layout);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", layout);
      mqSmall.removeEventListener("change", layout);
      mqMotion.removeEventListener("change", layout);
    };
  }, []);

  return (
    <section
      ref={trackRef}
      className={`${styles.track}${inView ? ` ${styles.in}` : ""}`}
      aria-labelledby="pavilion-zones-heading"
    >
      <div ref={stickyRef} className={styles.sticky}>
        <div className={styles.glow} aria-hidden="true" />

        {/* Persistent top bar — context + live counter */}
        <div className={styles.topbar}>
          <div className={styles.heif}>
            <div className={styles.overlineWrap}>
              <span className={styles.overlineRule} aria-hidden="true" />
              <p className={styles.overline}>Inside the Pavilion</p>
            </div>
            <h2 id="pavilion-zones-heading" className={styles.heading}>
              Six experience <span className="gradientText">zones.</span>
            </h2>
          </div>
          <div className={styles.counter} aria-hidden="true">
            <span className={styles.counterNow}>
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className={styles.counterSep}>/</span>
            <span className={styles.counterAll}>
              {String(ZONES.length).padStart(2, "0")}
            </span>
            <span className={styles.walkHint}>Scroll to walk the floor</span>
          </div>
        </div>

        {/* The rail — slides horizontally with scroll */}
        <div className={styles.railWrap}>
          <ol ref={railRef} className={styles.rail}>
            {ZONES.map((zone, i) => (
              <li
                key={zone.no}
                className={`${styles.panel}${i === active ? ` ${styles.active}` : ""}`}
              >
                <div className={styles.plate}>
                  <Image
                    src={zone.image}
                    alt={zone.alt}
                    fill
                    sizes="(max-width: 860px) 100vw, 46vw"
                    className={styles.img}
                  />
                  <span className={styles.plateGrade} aria-hidden="true" />
                  <span className={styles.bracket} aria-hidden="true" />
                </div>

                <div className={styles.copy}>
                  <span className={styles.ghost} aria-hidden="true">
                    {zone.no}
                  </span>
                  <span className={styles.kicker}>Zone {zone.no}</span>
                  <h3 className={styles.name}>{zone.title}</h3>
                  <p className={styles.desc}>{zone.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Progress rail */}
        <div className={styles.progress} aria-hidden="true">
          <span ref={fillRef} className={styles.progressFill} />
        </div>
      </div>
    </section>
  );
}

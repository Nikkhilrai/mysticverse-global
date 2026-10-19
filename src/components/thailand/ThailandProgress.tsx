"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ThailandProgress.module.css";

/*
  Page-level motion for /thailand:
  • a thin gold→violet scroll-progress bar along the top edge;
  • a section guide on the right (desktop) — one dot per section, the
    current one lit and labelled; click to glide there;
  • smooth scrolling for in-page links (hero CTAs → #register etc.)
    while this page is open — skipped for reduced-motion users.
*/

const SECTIONS = [
  { id: "top", label: "Bangkok 2027" },
  { id: "overview", label: "What this is" },
  { id: "pillars", label: "Three pillars" },
  { id: "two-days", label: "Two days" },
  { id: "the-room", label: "The room" },
  { id: "speakers", label: "Speakers" },
  { id: "why-bangkok", label: "Why Bangkok" },
  { id: "register", label: "Book your pass" },
] as const;

export default function ThailandProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string>("top");

  // Progress bar — written straight to the DOM, once per frame.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Which section is in the middle of the viewport.
  useEffect(() => {
    const els = SECTIONS.map((s) =>
      s.id === "top" ? document.querySelector("main section") : document.getElementById(s.id),
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = els.indexOf(e.target as Element);
          if (i >= 0) setActive(SECTIONS[i].id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // Smooth in-page scrolling while on this page.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "smooth";
    return () => { html.style.scrollBehavior = prev; };
  }, []);

  const go = (id: string) => {
    if (id === "top") window.scrollTo({ top: 0 });
    else document.getElementById(id)?.scrollIntoView();
  };

  return (
    <>
      <div className={styles.progress} aria-hidden="true">
        <div ref={barRef} className={styles.bar} />
      </div>

      <nav className={styles.guide} aria-label="Page sections">
        <ol>
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                className={`${styles.dot}${active === s.id ? ` ${styles.active}` : ""}`}
                onClick={() => go(s.id)}
                aria-current={active === s.id ? "true" : undefined}
              >
                <span className={styles.label}>{s.label}</span>
                <span className={styles.pip} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

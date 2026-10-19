"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useInView } from "./useInView";
import { THAILAND_SOURCES, THAILAND_WHY } from "./thailandData";
import styles from "./ThailandWhy.module.css";
import MaskLines from "./MaskLines";

/*
  Section 6 — Why Bangkok (brief §7).
  A tall night photograph of Wat Arun beside the copy and four stat
  cards that count up. Every card names its source and links out to
  it (brief §10: "every statistic needs its source visible on the
  page").
*/

const COUNT_MS = 1500;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function useCount(to: number, run: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setV(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / COUNT_MS);
      setV(to * easeOut(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return v;
}

function StatCard({
  stat,
  run,
  index,
}: {
  stat: (typeof THAILAND_WHY.stats)[number];
  run: boolean;
  index: number;
}) {
  const v = useCount(stat.to, run);
  const final = `${stat.prefix}${stat.to.toFixed(stat.decimals)}${stat.suffix}`;
  const src = THAILAND_SOURCES[stat.source];

  return (
    <li className={styles.stat} style={{ "--i": index } as React.CSSProperties}>
      <span className={styles.srOnly}>{final}</span>
      <span className={styles.figure} aria-hidden="true">
        {stat.prefix && <span className={styles.prefix}>{stat.prefix.trim()}</span>}
        <span className="gradientTextInk">
          {v.toFixed(stat.decimals)}
          {stat.suffix}
        </span>
      </span>
      <span className={styles.label}>{stat.label}</span>
      <a href={src.href} target="_blank" rel="noopener noreferrer" className={styles.source}>
        Source: {src.name}
        <span className={styles.ext} aria-hidden="true">↗</span>
      </a>
    </li>
  );
}

export default function ThailandWhy() {
  const [ref, inView] = useInView<HTMLElement>(0.12);
  const { eyebrow, heading, copy, stats, photo, moreLabel, moreHref } = THAILAND_WHY;

  return (
    <section
      id="why-bangkok"
      ref={ref}
      className={`${styles.section}${inView ? ` ${styles.in}` : ""}`}
      aria-labelledby="thailand-why-title"
    >
      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.eyebrow}>
            <span className={styles.rule} aria-hidden="true" />
            {eyebrow}
          </p>
          <h2 id="thailand-why-title" className={styles.title}>
            <MaskLines lines={[{ text: heading[0] }, { text: heading[1], tone: "ink" }]} />
          </h2>
        </header>

        <div className={styles.grid}>
          <figure className={styles.photo}>
            <div className={styles.photoFrame}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 960px) 100vw, 460px"
                className={styles.photoImg}
              />
            </div>
          </figure>

          <div className={styles.body}>
            {copy.map((p) => (
              <p key={p.slice(0, 24)} className={styles.para}>{p}</p>
            ))}

            <ul className={styles.stats}>
              {stats.map((s, i) => (
                <StatCard key={s.label} stat={s} run={inView} index={i} />
              ))}
            </ul>

            {moreHref && (
              <a href={moreHref} className={styles.cta}>
                {moreLabel} <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

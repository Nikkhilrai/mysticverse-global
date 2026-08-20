"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./JournalPreview.module.css";

export interface PreviewArticle {
  title: string;
  excerpt: string;
  coverImage: string | null;
  author: string | null;
  publishedAt: Date | null;
  href: string;
}

function fmt(d: Date | null) {
  if (!d) return "";
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(d);
}

function meta(a: PreviewArticle) {
  const parts = [a.author, fmt(a.publishedAt)].filter(Boolean);
  return parts.join(" · ");
}

export default function JournalPreviewClient({ articles }: { articles: PreviewArticle[] }) {
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

  const [featured, ...rest] = articles;

  return (
    <section
      ref={ref}
      className={`${styles.section}${visible ? ` ${styles.visible}` : ""}`}
      aria-label="From The Blog"
    >
      <div className={styles.inner}>

        {/* ── Header ────────────────────────────────────────── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.eyebrowWrap}>
              <p className={styles.eyebrow}>From The Blog</p>
            </div>
            <h2 className={styles.headline}>
              Wisdom, <span className="gradientTextInk">Distilled.</span>
            </h2>
            <p className={styles.bridge}>
              Not all of it belongs on a stage. Some arrives quietly, on the page.
            </p>
          </div>
          <a href="/journal" className={styles.viewAllTop}>
            View all articles
            <span className={styles.arrow} aria-hidden="true">→</span>
          </a>
        </div>

        {/* ── Featured + list ───────────────────────────────── */}
        <div className={styles.layout}>

          {/* Featured — full-bleed cover, magazine treatment */}
          <a href={featured.href} className={styles.featured}>
            {featured.coverImage && (
              <Image
                src={featured.coverImage}
                alt={featured.title}
                fill
                sizes="(max-width: 900px) 100vw, 56vw"
                className={styles.featuredImg}
              />
            )}
            <span className={styles.featuredScrim} aria-hidden="true" />
            <span className={styles.featuredBadge}>Latest</span>

            <div className={styles.featuredContent}>
              <h3 className={styles.featuredTitle}>{featured.title}</h3>
              {featured.excerpt && <p className={styles.featuredExcerpt}>{featured.excerpt}</p>}
              <div className={styles.featuredFoot}>
                <span className={styles.metaText}>{meta(featured)}</span>
                <span className={styles.readMore}>
                  Read article
                  <span className={styles.arrow} aria-hidden="true">→</span>
                </span>
              </div>
            </div>
          </a>

          {/* List — compact cover cards */}
          {rest.length > 0 && (
            <div className={styles.list}>
              {rest.map((a) => (
                <a key={a.href} href={a.href} className={styles.row}>
                  <div className={styles.rowMedia}>
                    {a.coverImage ? (
                      <Image
                        src={a.coverImage}
                        alt={a.title}
                        fill
                        sizes="(max-width: 900px) 100vw, 22vw"
                        className={styles.rowImg}
                      />
                    ) : (
                      <div className={styles.rowMediaFallback} aria-hidden="true" />
                    )}
                  </div>
                  <div className={styles.rowBody}>
                    <h4 className={styles.rowTitle}>{a.title}</h4>
                    <div className={styles.rowFoot}>
                      <span className={styles.metaTextSmall}>{meta(a)}</span>
                      <span className={styles.arrow} aria-hidden="true">→</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

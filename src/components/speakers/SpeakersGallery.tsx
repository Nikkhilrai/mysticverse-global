"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import styles from "./SpeakersGallery.module.css";
import { SPEAKERS } from "./speakersData";

const pad = (n: number) => String(n + 1).padStart(2, "0");

export default function SpeakersGallery() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const go = useCallback(
    (dir: number) =>
      setActive((cur) =>
        cur === null ? cur : (cur + dir + SPEAKERS.length) % SPEAKERS.length,
      ),
    [],
  );

  /* Body scroll lock + keyboard nav while a profile is open */
  useEffect(() => {
    if (active === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, go]);

  const s = active === null ? null : SPEAKERS[active];

  return (
    <section className={styles.section} aria-label="Speaker gallery">
      <div className={styles.inner}>
        <ul className={styles.grid}>
          {SPEAKERS.map((sp, i) => (
            <li key={sp.slug}>
              <button
                type="button"
                className={styles.card}
                onClick={() => setActive(i)}
                aria-label={`View profile — ${sp.name}`}
              >
                <span className={styles.portrait}>
                  <Image
                    src={sp.image}
                    alt={sp.name}
                    fill
                    sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 320px"
                    className={styles.portraitImg}
                  />
                  <span className={styles.scrim} aria-hidden="true" />
                  <span className={styles.view}>
                    View Profile <span aria-hidden="true">→</span>
                  </span>
                </span>
                <span className={styles.meta}>
                  <span className={styles.name}>{sp.name}</span>
                  <span className={styles.role}>{sp.title}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Detail overlay ──────────────────────────────────── */}
      {s && active !== null && (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={s.name}>
          <div className={styles.backdrop} onClick={close} />

          <div className={styles.panel}>
            <button type="button" className={styles.close} onClick={close} aria-label="Close profile">
              <span aria-hidden="true">✕</span>
            </button>

            <div className={styles.panelScroll}>
              <div className={styles.panelGrid}>
                {/* Portrait */}
                <div className={styles.detailMedia}>
                  <div className={styles.detailPortrait}>
                    <Image
                      src={s.image}
                      alt={s.name}
                      fill
                      sizes="(max-width: 880px) 90vw, 360px"
                      className={styles.detailImg}
                    />
                  </div>
                  <span className={styles.detailIndex}>
                    {pad(active)} <span className={styles.detailIndexSep}>/</span> {pad(SPEAKERS.length - 1)}
                  </span>
                </div>

                {/* Content */}
                <div className={styles.detailContent}>
                  <p className={styles.detailEyebrow}>Speaker</p>
                  <h2 className={styles.detailName}>{s.name}</h2>
                  <p className={styles.detailRole}>{s.title}</p>

                  <div className={styles.detailBio}>
                    {s.bio.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>

                  {s.publications && s.publications.length > 0 && (
                    <div className={styles.block}>
                      <p className={styles.blockLabel}>Selected Publications</p>
                      <ul className={styles.pubs}>
                        {s.publications.map((p) => (
                          <li key={p} className={styles.pub}>
                            <span className={styles.pubMark} aria-hidden="true" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {(s.contacts || s.links) && (
                    <div className={styles.block}>
                      <p className={styles.blockLabel}>Connect</p>
                      <div className={styles.connect}>
                        {s.contacts?.email && (
                          <a className={styles.chip} href={`mailto:${s.contacts.email}`}>
                            {s.contacts.email}
                          </a>
                        )}
                        {s.contacts?.phone && (
                          <a className={styles.chip} href={`tel:${s.contacts.phone.replace(/\s+/g, "")}`}>
                            {s.contacts.phone}
                          </a>
                        )}
                        {s.links?.map((l) => (
                          <a
                            key={l.href}
                            className={styles.chip}
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {l.label}
                            <span className={styles.chipArrow} aria-hidden="true">↗</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Prev / next */}
            <div className={styles.detailNav}>
              <button type="button" className={styles.navBtn} onClick={() => go(-1)}>
                <span aria-hidden="true">←</span> Previous
              </button>
              <span className={styles.navCount}>
                {pad(active)} <span className={styles.navSep}>/</span> {pad(SPEAKERS.length - 1)}
              </span>
              <button type="button" className={styles.navBtn} onClick={() => go(1)}>
                Next <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

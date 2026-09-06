"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ADVISORS } from "@/lib/advisoryData";
import styles from "./AdvisoryGrid.module.css";

const pad = (n: number) => String(n + 1).padStart(2, "0");

function roleParts(role: string): string[] {
  return role
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function AdvisoryGrid() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const go = useCallback(
    (dir: number) =>
      setActive((cur) =>
        cur === null ? cur : (cur + dir + ADVISORS.length) % ADVISORS.length,
      ),
    [],
  );

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

  const a = active === null ? null : ADVISORS[active];

  return (
    <section className={styles.section} aria-label="Advisory board members">
      <div className={styles.inner}>
        <ul className={styles.grid}>
          {ADVISORS.map((adv, i) => (
            <li key={adv.slug}>
              <button
                type="button"
                className={styles.card}
                onClick={() => setActive(i)}
                aria-label={`View profile — ${adv.name}`}
              >
                <span className={styles.portrait}>
                  {adv.image ? (
                    <Image
                      src={adv.image}
                      alt={adv.name}
                      fill
                      sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 320px"
                      className={styles.portraitImg}
                      style={adv.imagePosition ? { objectPosition: adv.imagePosition } : undefined}
                    />
                  ) : (
                    <span className={styles.portraitFallback} aria-hidden="true">
                      {adv.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <span className={styles.scrim} aria-hidden="true" />
                  <span className={styles.view}>
                    View Profile <span aria-hidden="true">→</span>
                  </span>
                </span>
                <span className={styles.meta}>
                  <span className={styles.name}>{adv.name}</span>
                  <span className={styles.role}>{roleParts(adv.role).join(" · ")}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Detail overlay — light panel, opens on click ───────── */}
      {a && active !== null && (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={a.name}>
          <div className={styles.backdrop} onClick={close} />

          <div className={styles.panel}>
            <button type="button" className={styles.close} onClick={close} aria-label="Close profile">
              <span aria-hidden="true">✕</span>
            </button>

            <div className={styles.panelScroll}>
              <div className={styles.panelGrid}>
                <div className={styles.detailMedia}>
                  <div className={styles.detailPortrait}>
                    {a.image ? (
                      <Image
                        src={a.image}
                        alt={a.name}
                        fill
                        sizes="(max-width: 880px) 90vw, 360px"
                        className={styles.detailImg}
                        style={a.imagePosition ? { objectPosition: a.imagePosition } : undefined}
                      />
                    ) : (
                      <span className={styles.detailPortraitFallback} aria-hidden="true">
                        {a.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className={styles.detailIndex}>
                    {pad(active)} <span className={styles.detailIndexSep}>/</span> {pad(ADVISORS.length - 1)}
                  </span>
                </div>

                <div className={styles.detailContent}>
                  <p className={styles.detailEyebrow}>Advisory Board</p>
                  <h2 className={styles.detailName}>{a.name}</h2>
                  <p className={styles.detailRole}>{roleParts(a.role).join(" · ")}</p>

                  {a.bio ? (
                    <div className={styles.detailBio}>
                      {a.bio.map((p, j) => (
                        <p key={j}>{p}</p>
                      ))}
                    </div>
                  ) : (
                    <p className={styles.detailBioPending}>Full biography coming soon.</p>
                  )}

                  {a.contacts && (a.contacts.email || a.contacts.phone) && (
                    <div className={styles.connectBlock}>
                      <p className={styles.connectLabel}>Connect</p>
                      <div className={styles.connect}>
                        {a.contacts.email && (
                          <a className={styles.chip} href={`mailto:${a.contacts.email}`}>
                            {a.contacts.email}
                          </a>
                        )}
                        {a.contacts.phone && (
                          <a className={styles.chip} href={`tel:${a.contacts.phone.replace(/\s+/g, "")}`}>
                            {a.contacts.phone}
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.detailNav}>
              <button type="button" className={styles.navBtn} onClick={() => go(-1)}>
                <span aria-hidden="true">←</span> Previous
              </button>
              <span className={styles.navCount}>
                {pad(active)} <span className={styles.navSep}>/</span> {pad(ADVISORS.length - 1)}
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

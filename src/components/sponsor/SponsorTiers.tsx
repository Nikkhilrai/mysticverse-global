"use client";

import { useEffect, useRef, useState } from "react";
import { TIERS, BOOTHS, type Tier } from "@/lib/sponsorship";
import DeckRequestModal from "./DeckRequestModal";
import styles from "./SponsorTiers.module.css";

const GROUP_LABELS: Record<Tier["group"], string> = {
  headline: "Headline partnerships",
  pillar: "Pillar partnerships",
  growth: "Growth tiers",
};

const GROUP_ORDER: Tier["group"][] = ["headline", "pillar", "growth"];

export default function SponsorTiers() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState(TIERS[0].id);
  const [briefTier, setBriefTier] = useState<string | null>(null);

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
      { threshold: 0.06 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const active = TIERS.find((t) => t.id === activeId) ?? TIERS[0];

  return (
    <section
      ref={ref}
      id="tiers"
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-labelledby="sponsor-tiers-heading"
    >
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.head}>
          <div className={styles.overlineWrap}>
            <span className={styles.overlineRule} aria-hidden="true" />
            <p className={styles.overline}>The Sponsorship Journey</p>
          </div>
          <h2 id="sponsor-tiers-heading" className={styles.heading}>
            Nine tiers, calibrated to ambition, category, and audience.
          </h2>
          <p className={styles.deck}>
            Choose a tier to see exactly what it includes. Every tier below the
            first carries the benefits of the one before it.
          </p>
        </header>

        <div className={styles.layout}>
          {/* ── The ladder (sticky selector) ─────────────── */}
          <nav className={styles.ladder} aria-label="Sponsorship tiers">
            {GROUP_ORDER.map((group) => (
              <div key={group} className={styles.group}>
                <p className={styles.groupLabel}>{GROUP_LABELS[group]}</p>
                <ul className={styles.tierList}>
                  {TIERS.filter((t) => t.group === group).map((t) => {
                    const on = t.id === activeId;
                    return (
                      <li key={t.id}>
                        <button
                          type="button"
                          className={`${styles.tierBtn}${on ? ` ${styles.tierBtnOn}` : ""}`}
                          onClick={() => setActiveId(t.id)}
                          aria-current={on ? "true" : undefined}
                        >
                          <span className={styles.tierName}>{t.name}</span>
                          <span className={styles.tierSlots}>
                            {t.slots} {t.slots === 1 ? "slot" : "slots"}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            <div className={styles.booths}>
              <p className={styles.groupLabel}>Booth-only options</p>
              <ul className={styles.boothList}>
                {BOOTHS.map((b) => (
                  <li key={b.name} className={styles.booth}>
                    <span>{b.name}</span>
                    <span className={styles.boothSlots}>{b.slots} slots</span>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* ── The deep-dive panel ──────────────────────── */}
          <div className={styles.panel} key={active.id}>
            <div className={styles.panelHead}>
              <h3 className={styles.panelName}>{active.name}</h3>
              <span className={styles.investment}>Investment on request</span>
            </div>

            <p className={styles.positioning}>{active.positioning}</p>

            <dl className={styles.benefits}>
              <div className={styles.benefit}>
                <dt className={styles.benefitLabel}>Thought leadership</dt>
                <dd className={styles.benefitBody}>{active.thoughtLeadership}</dd>
              </div>
              <div className={styles.benefit}>
                <dt className={styles.benefitLabel}>Exhibition &amp; activation</dt>
                <dd className={styles.benefitBody}>{active.exhibition}</dd>
              </div>
              <div className={styles.benefit}>
                <dt className={styles.benefitLabel}>VIP access &amp; media</dt>
                <dd className={styles.benefitBody}>{active.vipMedia}</dd>
              </div>
              <div className={styles.benefit}>
                <dt className={styles.benefitLabel}>Premium branding</dt>
                <dd className={styles.benefitBody}>{active.branding}</dd>
              </div>
            </dl>

            {active.inherits && (
              <p className={styles.inherits}>
                <span className={styles.inheritsMark} aria-hidden="true">★</span>
                Includes all benefits from previous tiers plus these exclusive
                enhancements.
              </p>
            )}

            <button
              type="button"
              className={styles.panelCta}
              onClick={() => setBriefTier(active.name)}
            >
              Request the {active.name} brief
              <span className={styles.arrow} aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>

      <DeckRequestModal
        deckId={briefTier ? "tier-brief" : null}
        tierName={briefTier ?? undefined}
        onClose={() => setBriefTier(null)}
      />
    </section>
  );
}

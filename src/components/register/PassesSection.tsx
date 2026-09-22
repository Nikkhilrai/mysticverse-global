"use client";

import { useEffect, useRef, useState } from "react";
import { PASSES, type Pass } from "@/lib/passes";
import PassCheckoutModal from "./PassCheckoutModal";
import styles from "./PassesSection.module.css";
import { PASSES_OPEN } from "@/lib/site";

/* The promo banner (PromoBanner.tsx) used to sit above the pass grid and
   advertise the live coupon code publicly. Coupons are now shared privately
   instead, so the banner is not rendered — the code itself still works, via
   the field in PassCheckoutModal. The component and getFeaturedPromo() are
   left in place so the banner can be switched back on if that changes. */

export default function PassesSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<Pass | null>(null);

  const openPass = (pass: Pass) => {
    setActive(pass);
  };

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
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="passes"
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-labelledby="passes-heading"
    >
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.head}>
          <div className={styles.overlineWrap}>
            <span className={styles.overlineRule} aria-hidden="true" />
            <p className={styles.overline}>
              {PASSES_OPEN ? "Passes · Dubai 2026" : "Dubai 2026 · Concluded"}
            </p>
          </div>
          <h2 id="passes-heading" className={styles.heading}>
            {PASSES_OPEN ? "Choose your pass." : "Passes are closed."}
          </h2>
          <p className={styles.deck}>
            {PASSES_OPEN
              ? "Two ways into the room on 11 September. Reserve in minutes — secure checkout, instant confirmation."
              : "MysticVerse Global 2026 has concluded, so pass sales are now closed."}
          </p>
        </header>

        {!PASSES_OPEN ? (
          <div className={styles.closedPanel}>
            <span className={styles.closedMark} aria-hidden="true">✓</span>
            <p className={styles.closedTitle}>Thank you for a memorable day.</p>
            <p className={styles.closedText}>
              Missed it? Browse the{" "}
              <a href="/gallery" className={styles.noteLink}>event gallery</a> or
              catch up on the{" "}
              <a href="/agenda" className={styles.noteLink}>full agenda</a>.
            </p>
          </div>
        ) : (
        <>
        <div className={styles.grid}>
          {PASSES.map((pass, i) => (
            <article
              key={pass.id}
              className={`${styles.card}${pass.featured ? ` ${styles.featured}` : ""}`}
              style={{ "--i": i } as React.CSSProperties}
            >
              {pass.featured && <span className={styles.badge}>Best value</span>}

              <div className={styles.cardHead}>
                <h3 className={styles.name}>{pass.name}</h3>
                <p className={styles.tagline}>{pass.tagline}</p>
              </div>

              <div className={styles.priceBlock}>
                <div className={styles.priceRow}>
                  <span className={styles.price}>{pass.priceLabel}</span>
                  {pass.originalPriceLabel && (
                    <s
                      className={styles.priceWas}
                      aria-label={`Was ${pass.originalPriceLabel}`}
                    >
                      {pass.originalPriceLabel}
                    </s>
                  )}
                </div>
                <div className={styles.priceMetaRow}>
                  <span className={styles.priceMeta}>per delegate</span>
                  {pass.originalPriceLabel && pass.discountLabel && (
                    <span className={styles.discountTag}>{pass.discountLabel}</span>
                  )}
                </div>
              </div>

              <ul className={styles.features}>
                {pass.features.map((f, fi) => {
                  const inherit = fi === 0 && pass.inheritsFrom;
                  return (
                    <li
                      key={f}
                      className={`${styles.feature}${inherit ? ` ${styles.featureInherit}` : ""}`}
                    >
                      <span className={styles.check} aria-hidden="true">
                        {inherit ? "★" : "✓"}
                      </span>
                      <span>{f}</span>
                    </li>
                  );
                })}
              </ul>

              <button
                type="button"
                className={`${styles.cta}${pass.featured ? ` ${styles.ctaFeatured}` : ""}`}
                onClick={() => openPass(pass)}
              >
                Get the {pass.name}
                <span className={styles.arrow} aria-hidden="true">→</span>
              </button>
            </article>
          ))}
        </div>

        <p className={styles.note}>
          Prices in AED, inclusive of applicable taxes. Group or corporate
          bookings?{" "}
          <a href="/contact" className={styles.noteLink}>
            Talk to our team →
          </a>
        </p>
        </>
        )}
      </div>

      <PassCheckoutModal pass={active} onClose={() => setActive(null)} />
    </section>
  );
}

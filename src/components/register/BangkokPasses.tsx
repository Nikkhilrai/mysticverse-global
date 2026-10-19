"use client";

import { useEffect, useRef, useState } from "react";
import { THAILAND, THAILAND_PRICES } from "@/components/thailand/thailandData";
import { bangkokPass, salesOpen, type Pass } from "@/lib/passes";
import PassCheckoutModal from "./PassCheckoutModal";
import styles from "./BangkokPasses.module.css";

/*
  Bangkok 2027 pass cards for /register — the Dubai 2026 card layout
  (PassesSection), on the site's light canvas, with Bangkok's data.

  Checkout is the same Razorpay flow as Dubai (PassCheckoutModal →
  /api/passes/order → /verify → PassRegistration, shown in the admin
  "Pass registrations" page), switched by BANGKOK_PASSES_OPEN in
  lib/site.ts. While that is false, every CTA registers interest
  instead. The Dubai checkout (PASSES_OPEN) stays closed either way.
*/

const OPEN = salesOpen("bangkok-2027");

const usd = (n: number) => `USD ${n.toLocaleString("en-US")}`;

export default function BangkokPasses() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<Pass | null>(null);

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

  const { passes, footnote, principle, interestHref } = THAILAND_PRICES;
  const core = passes.filter((p) => p.tier === "core");
  const more = passes.filter((p) => p.tier === "more");

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
            <p className={styles.overline}>Passes · {THAILAND.editionLabel}</p>
            <span className={styles.overlineRule} aria-hidden="true" />
          </div>
          <h1 id="passes-heading" className={styles.heading}>
            Choose your pass.
          </h1>
          <p className={styles.deck}>
            {THAILAND.editionName} — {THAILAND.city}, {THAILAND.dateLabel}. Every
            price published, per delegate, in USD.
          </p>
        </header>

        {/* ── Core passes ─────────────────────────────── */}
        <div className={styles.grid}>
          {core.map((pass, i) => (
            <article
              key={pass.id}
              className={`${styles.card}${pass.featured ? ` ${styles.featured}` : ""}`}
              style={{ "--i": i } as React.CSSProperties}
            >
              {pass.featured && <span className={styles.badge}>Both days</span>}

              <div className={styles.cardHead}>
                <h2 className={styles.name}>{pass.name}</h2>
                {pass.tagline && <p className={styles.tagline}>{pass.tagline}</p>}
              </div>

              <div className={styles.priceBlock}>
                <div className={styles.priceRow}>
                  <span className={styles.price}>{usd(pass.price)}</span>
                </div>
                <div className={styles.priceMetaRow}>
                  <span className={styles.priceMeta}>per delegate</span>
                  {pass.tag && <span className={styles.discountTag}>{pass.tag}</span>}
                </div>
                {"standardPrice" in pass && (
                  <span className={styles.standard}>
                    Standard price:{" "}
                    {pass.standardPrice == null ? <em>to be confirmed</em> : usd(pass.standardPrice)}
                  </span>
                )}
              </div>

              <ul className={styles.features}>
                {pass.features?.map((f, fi) => (
                  <li
                    key={f}
                    className={`${styles.feature}${fi === 0 ? ` ${styles.featureInherit}` : ""}`}
                  >
                    <span className={styles.check} aria-hidden="true">{fi === 0 ? "★" : "✓"}</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {OPEN ? (
                <button
                  type="button"
                  className={`${styles.cta}${pass.featured ? ` ${styles.ctaFeatured}` : ""}`}
                  data-track="register"
                  onClick={() => setActive(bangkokPass(pass.id) ?? null)}
                >
                  Book this pass
                  <span className={styles.arrow} aria-hidden="true">→</span>
                </button>
              ) : (
                <a
                  href={interestHref}
                  className={`${styles.cta}${pass.featured ? ` ${styles.ctaFeatured}` : ""}`}
                  data-track="register"
                >
                  Register interest
                  <span className={styles.arrow} aria-hidden="true">→</span>
                </a>
              )}
            </article>
          ))}
        </div>

        {/* ── More ways in ────────────────────────────── */}
        <div className={styles.more}>
          <h2 className={styles.moreTitle}>More ways in</h2>
          <div className={styles.moreGrid}>
            {more.map((pass, i) => (
              <article
                key={pass.id}
                className={`${styles.card} ${styles.small}`}
                style={{ "--i": i + core.length } as React.CSSProperties}
              >
                <h3 className={styles.smallName}>{pass.name}</h3>
                <span className={styles.smallMeta}>
                  {pass.note ?? "Per delegate"}
                </span>
                <span className={styles.smallPrice}>{usd(pass.price)}</span>
                <span className={styles.smallTbc}>Inclusions to be announced</span>
                {OPEN ? (
                  <button
                    type="button"
                    className={styles.smallCta}
                    data-track="register"
                    onClick={() => setActive(bangkokPass(pass.id) ?? null)}
                  >
                    Book this pass <span className={styles.arrow} aria-hidden="true">→</span>
                  </button>
                ) : (
                  <a href={interestHref} className={styles.smallCta} data-track="register">
                    Register interest <span className={styles.arrow} aria-hidden="true">→</span>
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>

        <p className={styles.note}>
          {footnote}{" "}
          {OPEN ? "Secure checkout by Razorpay." : "Registration opens shortly — register your interest now."}
          <br />
          <span className={styles.principle}>{principle}</span>
        </p>
      </div>

      <PassCheckoutModal pass={active} onClose={() => setActive(null)} />
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { THAILAND, THAILAND_PRICES } from "@/components/thailand/thailandData";
import { bangkokPass, salesOpen, type Pass } from "@/lib/passes";
import PassCheckoutModal from "./PassCheckoutModal";
import base from "./PassesSection.module.css";
import styles from "./BangkokPasses.module.css";

/*
  Bangkok 2027 pass cards for /register — the same card design as the
  Dubai 2026 passes (PassesSection), with Bangkok's data.

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
      className={`${base.section}${visible ? ` ${base.in}` : ""}`}
      aria-labelledby="passes-heading"
    >
      <div className={base.glow} aria-hidden="true" />

      <div className={`${base.inner} ${styles.inner}`}>
        <header className={base.head}>
          <div className={base.overlineWrap}>
            <span className={base.overlineRule} aria-hidden="true" />
            <p className={base.overline}>Passes · {THAILAND.editionLabel}</p>
            <span className={base.overlineRule} aria-hidden="true" />
          </div>
          <h1 id="passes-heading" className={base.heading}>
            Choose your pass.
          </h1>
          <p className={base.deck}>
            {THAILAND.editionName} — {THAILAND.city}, {THAILAND.dateLabel}. Every
            price published, per delegate, in USD.
          </p>
        </header>

        {/* ── Core passes ─────────────────────────────── */}
        <div className={`${base.grid} ${styles.grid3}`}>
          {core.map((pass, i) => (
            <article
              key={pass.id}
              className={`${base.card}${pass.featured ? ` ${base.featured}` : ""}`}
              style={{ "--i": i } as React.CSSProperties}
            >
              {pass.featured && <span className={base.badge}>Both days</span>}

              <div className={base.cardHead}>
                <h2 className={`${base.name} ${styles.name}`}>{pass.name}</h2>
                {pass.tagline && <p className={base.tagline}>{pass.tagline}</p>}
              </div>

              <div className={base.priceBlock}>
                <div className={base.priceRow}>
                  <span className={base.price}>{usd(pass.price)}</span>
                </div>
                <div className={base.priceMetaRow}>
                  <span className={base.priceMeta}>per delegate</span>
                  {pass.tag && <span className={base.discountTag}>{pass.tag}</span>}
                </div>
                {"standardPrice" in pass && (
                  <span className={styles.standard}>
                    Standard price:{" "}
                    {pass.standardPrice == null ? <em>to be confirmed</em> : usd(pass.standardPrice)}
                  </span>
                )}
              </div>

              <ul className={base.features}>
                {pass.features?.map((f, fi) => (
                  <li
                    key={f}
                    className={`${base.feature}${fi === 0 ? ` ${base.featureInherit}` : ""}`}
                  >
                    <span className={base.check} aria-hidden="true">{fi === 0 ? "★" : "✓"}</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {OPEN ? (
                <button
                  type="button"
                  className={`${base.cta}${pass.featured ? ` ${base.ctaFeatured}` : ""}`}
                  data-track="register"
                  onClick={() => setActive(bangkokPass(pass.id) ?? null)}
                >
                  Book this pass
                  <span className={base.arrow} aria-hidden="true">→</span>
                </button>
              ) : (
                <a
                  href={interestHref}
                  className={`${base.cta}${pass.featured ? ` ${base.ctaFeatured}` : ""}`}
                  data-track="register"
                >
                  Register interest
                  <span className={base.arrow} aria-hidden="true">→</span>
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
                className={`${base.card} ${styles.small}`}
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
                    Book this pass <span className={base.arrow} aria-hidden="true">→</span>
                  </button>
                ) : (
                  <a href={interestHref} className={styles.smallCta} data-track="register">
                    Register interest <span className={base.arrow} aria-hidden="true">→</span>
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>

        <p className={base.note}>
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

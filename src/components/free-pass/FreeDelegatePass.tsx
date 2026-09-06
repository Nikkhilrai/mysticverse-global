"use client";

import { useEffect, useState } from "react";
import styles from "./FreeDelegatePass.module.css";
import { getUtm } from "@/lib/utm";
import { EVENT } from "@/lib/site";

// The 100%-off coupon that powers this page — applied silently server-side,
// never shown to the visitor. Restricted to the Seeker pass (see the
// coupon's applicablePasses) so the Mystic Pass's paid membership perks
// stay paid-only. Managed like any other coupon at /admin/coupons.
const FREE_PASS_COUPON = "FREEDELEGATE2026";
const PASS_ID = "seeker";

const EVENT_DATE_LABEL = new Date(EVENT.startDate).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const STATS = [
  { label: "Date", value: EVENT_DATE_LABEL },
  { label: "Venue", value: `${EVENT.venueName}, ${EVENT.addressLocality}` },
  { label: "Format", value: "One Day" },
] as const;

export default function FreeDelegatePass() {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "", company: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registrationId, setRegistrationId] = useState<string | null>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/passes/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...getUtm(),
          passId: PASS_ID,
          couponCode: FREE_PASS_COUPON,
          name: form.name,
          email: form.email,
          phone: form.phone,
          country: form.country,
          company: form.company,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      setRegistrationId(data.registrationId);
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  };

  const reference = registrationId ? `MVG-${registrationId.slice(-8).toUpperCase()}` : null;

  return (
    <section className={`${styles.section}${mounted ? ` ${styles.in}` : ""}`} aria-label="Free delegate pass">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>

        {/* ── Left: event info ─────────────────────────────── */}
        <div className={styles.info}>
          <div className={styles.overlineWrap}>
            <span className={styles.overlineRule} aria-hidden="true" />
            <p className={styles.overline}>Complimentary Access</p>
          </div>
          <h1 className={styles.headline}>
            Claim your<br />
            <span className="gradientText">free delegate pass.</span>
          </h1>
          <p className={styles.sub}>
            A limited number of complimentary Seeker Passes to MysticVerse
            Global 2026 — the full day of sessions, people, and ideas, on us.
          </p>

          <div className={styles.statGrid}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.statTile}>
                <p className={styles.statLabel}>{s.label}</p>
                <p className={styles.statValue}>{s.value}</p>
              </div>
            ))}
          </div>

          <div className={styles.includes}>
            <p className={styles.includesLabel}>What&apos;s included</p>
            <ul className={styles.includesList}>
              <li>Access to all conference sessions</li>
              <li>Networking access with attendees &amp; speakers</li>
              <li>Food &amp; beverages during the event</li>
              <li>Event participation certificate</li>
            </ul>
          </div>
        </div>

        {/* ── Right: form / confirmation panel ────────────────── */}
        <div className={styles.panel}>
          <div className={styles.panelGlow} aria-hidden="true" />

          {reference ? (
            <div className={styles.success}>
              <span className={styles.successMark} aria-hidden="true">✓</span>
              <h2 className={styles.successTitle}>You&apos;re in.</h2>
              <p className={styles.successText}>
                A confirmation email has been sent to{" "}
                <strong className={styles.successEmail}>{form.email}</strong>{" "}
                with your pass details.
              </p>
              <div className={styles.refBox}>
                <p className={styles.refLabel}>Confirmation Reference</p>
                <p className={styles.refValue}>{reference}</p>
              </div>
              <div className={styles.successMeta}>
                <div>
                  <p className={styles.successMetaLabel}>Date</p>
                  <p className={styles.successMetaValue}>{EVENT_DATE_LABEL}</p>
                </div>
                <div>
                  <p className={styles.successMetaLabel}>Venue</p>
                  <p className={styles.successMetaValue}>{EVENT.venueName}</p>
                </div>
              </div>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <p className={styles.formHead}>Complete your registration</p>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="fp-name">Name</label>
                  <input className={styles.input} id="fp-name" name="name" type="text" required placeholder="Your name" value={form.name} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="fp-email">Email</label>
                  <input className={styles.input} id="fp-email" name="email" type="email" required placeholder="you@company.com" value={form.email} onChange={handleChange} />
                </div>
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="fp-phone">Contact number</label>
                  <input className={styles.input} id="fp-phone" name="phone" type="tel" placeholder="+971 00 000 0000" value={form.phone} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="fp-country">Country</label>
                  <input className={styles.input} id="fp-country" name="country" type="text" placeholder="Country" value={form.country} onChange={handleChange} />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="fp-company">
                  Organisation <span className={styles.optional}>(optional)</span>
                </label>
                <input className={styles.input} id="fp-company" name="company" type="text" placeholder="Company / organisation" value={form.company} onChange={handleChange} />
              </div>

              {error && <p className={styles.formError} role="alert">{error}</p>}

              <button type="submit" className={styles.submit} disabled={submitting}>
                {submitting ? "Registering…" : "Claim Free Pass"}
                {!submitting && <span className={styles.arrow} aria-hidden="true">→</span>}
              </button>

              <p className={styles.formNote}>
                No payment required. A confirmation email is sent immediately after registration.
              </p>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import styles from "./InterestForm.module.css";

const PASS_TYPES = [
  "Delegate",
  "HNI Pass",
  "Corporate Bundle",
  "Wellness Investor Circle",
] as const;

export default function InterestForm() {
  const [mounted, setMounted] = useState(false);
  const [passType, setPassType] = useState<string>("Delegate");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      country: fd.get("country"),
      company: fd.get("company"),
      passType,
      message: fd.get("message"),
      hp: fd.get("hp"),
    };
    try {
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <section className={`${styles.section}${mounted ? ` ${styles.in}` : ""}`} aria-label="Register interest">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>

        <div className={styles.head}>
          <div className={styles.overlineWrap}>
            <span className={styles.overlineRule} aria-hidden="true" />
            <p className={styles.overline}>Register Interest · Dubai 2026</p>
          </div>
          <h1 className={styles.headline}>
            Reserve your place<br />
            <span className="gradientText">in the room.</span>
          </h1>
          <p className={styles.sub}>
            Tell us a little about you and the pass you have in mind. Our team
            will be in touch with availability and next steps.
          </p>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelGlow} aria-hidden="true" />

          {submitted ? (
            <div className={styles.success}>
              <span className={styles.successMark} aria-hidden="true">✓</span>
              <h2 className={styles.successTitle}>Interest received.</h2>
              <p className={styles.successText}>
                Thank you — our team will reach out within two business days with
                availability and next steps.
              </p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="text"
                name="hp"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
              />

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="name">Name</label>
                  <input className={styles.input} id="name" name="name" type="text" required placeholder="Your name" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="email">Email</label>
                  <input className={styles.input} id="email" name="email" type="email" required placeholder="you@company.com" />
                </div>
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="phone">Contact number</label>
                  <input className={styles.input} id="phone" name="phone" type="tel" placeholder="+91 00000 00000" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="country">Country</label>
                  <input className={styles.input} id="country" name="country" type="text" placeholder="Country" />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="company">Organisation</label>
                <input className={styles.input} id="company" name="company" type="text" placeholder="Company / fund" />
              </div>

              <div className={styles.field}>
                <span className={styles.label}>Pass of interest</span>
                <div className={styles.chips}>
                  {PASS_TYPES.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`${styles.chip}${passType === opt ? ` ${styles.chipActive}` : ""}`}
                      onClick={() => setPassType(opt)}
                      aria-pressed={passType === opt}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="message">Anything we should know? <span className={styles.optional}>(optional)</span></label>
                <textarea className={styles.textarea} id="message" name="message" rows={3} placeholder="Group size, accessibility needs, questions…" />
              </div>

              {error && <p className={styles.formError} role="alert">{error}</p>}

              <button type="submit" className={styles.submit} disabled={submitting}>
                {submitting ? "Sending…" : "Register Interest"}
                {!submitting && <span className={styles.arrow} aria-hidden="true">→</span>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

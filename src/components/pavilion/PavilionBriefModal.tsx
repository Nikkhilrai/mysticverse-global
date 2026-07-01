"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./PavilionBriefModal.module.css";

const TIERS = [
  "Title Partner",
  "Real Estate Booth",
  "Retail Curation",
  "Sustainable Living",
  "Undecided",
] as const;

export default function PavilionBriefModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [tier, setTier] = useState<string>("Undecided");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => setMounted(true), []);

  // Reset to a fresh form each time the modal opens.
  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setError(null);
      setSubmitting(false);
      setTier("Undecided");
    }
  }, [open]);

  // Scroll lock, focus management, Esc + focus trap.
  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), 40);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      window.clearTimeout(focusTimer);
      restoreRef.current?.focus?.();
    };
  }, [open, onClose]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      company: fd.get("company"),
      role: fd.get("role"),
      phone: fd.get("phone"),
      country: fd.get("country"),
      tierInterest: tier,
      message: fd.get("message"),
      hp: fd.get("hp"),
    };
    try {
      const res = await fetch("/api/pavilion-brief", {
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

  if (!mounted || !open) return null;

  return createPortal(
    <div className={styles.overlay} onMouseDown={onClose}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pavilion-brief-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {submitted ? (
          <div className={styles.success}>
            <span className={styles.successMark} aria-hidden="true">✓</span>
            <h2 className={styles.successTitle}>Request received.</h2>
            <p className={styles.successText}>
              Thank you — we&apos;ll send the Pavilion Brief and follow up within
              two business days.
            </p>
            <button type="button" className={styles.successBtn} onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className={styles.head}>
              <p className={styles.eyebrow}>Partnership</p>
              <h2 id="pavilion-brief-title" className={styles.title}>
                Request the Pavilion Brief
              </h2>
              <p className={styles.sub}>
                Tell us a little about your brand. We&apos;ll send the full
                Pavilion Brief and partnership options.
              </p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="text"
                name="hp"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className={styles.hp}
              />

              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="pb-name">Name</label>
                  <input ref={firstFieldRef} className={styles.input} id="pb-name" name="name" type="text" required placeholder="Your name" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="pb-email">Work email</label>
                  <input className={styles.input} id="pb-email" name="email" type="email" required placeholder="you@brand.com" />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="pb-company">Company / brand</label>
                  <input className={styles.input} id="pb-company" name="company" type="text" placeholder="Company or brand" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="pb-role">Role <span className={styles.optional}>(optional)</span></label>
                  <input className={styles.input} id="pb-role" name="role" type="text" placeholder="Your title" />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="pb-phone">Phone <span className={styles.optional}>(optional)</span></label>
                  <input className={styles.input} id="pb-phone" name="phone" type="tel" placeholder="+971 00 000 0000" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="pb-country">Country <span className={styles.optional}>(optional)</span></label>
                  <input className={styles.input} id="pb-country" name="country" type="text" placeholder="Country" />
                </div>
              </div>

              <div className={styles.field}>
                <span className={styles.label}>Partnership interest</span>
                <div className={styles.chips}>
                  {TIERS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`${styles.chip}${tier === opt ? ` ${styles.chipActive}` : ""}`}
                      onClick={() => setTier(opt)}
                      aria-pressed={tier === opt}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="pb-message">Anything we should know? <span className={styles.optional}>(optional)</span></label>
                <textarea className={styles.textarea} id="pb-message" name="message" rows={3} placeholder="Goals, timelines, questions…" />
              </div>

              {error && <p className={styles.formError} role="alert">{error}</p>}

              <button type="submit" className={styles.submit} disabled={submitting}>
                {submitting ? "Sending…" : "Send request"}
                {!submitting && <span className={styles.arrow} aria-hidden="true">→</span>}
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./LeadPopup.module.css";
import { getUtm } from "@/lib/utm";
import { INTEREST_OPEN } from "@/lib/site";

/*
  Timed lead-capture popup for the homepage.

  Opens on whichever comes first: DELAY_MS of dwell time, or the reader
  passing SCROLL_TRIGGER of the page. Deliberately conservative about
  re-showing:
    • submitted  → never shown again
    • dismissed  → suppressed for SNOOZE_DAYS
  Both flags live in localStorage, so this is per-browser.
*/
const DELAY_MS = 12_000;
const SCROLL_TRIGGER = 0.3;
const SNOOZE_DAYS = 7;

const KEY_DONE = "mvg_lead_submitted";
const KEY_SNOOZE = "mvg_lead_snoozed_until";

function shouldSuppress(): boolean {
  try {
    if (localStorage.getItem(KEY_DONE) === "1") return true;
    const until = Number(localStorage.getItem(KEY_SNOOZE) ?? 0);
    return Number.isFinite(until) && Date.now() < until;
  } catch {
    // localStorage unavailable (private mode) — show, but don't crash.
    return false;
  }
}

export default function LeadPopup() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const firedRef = useRef(false);

  useEffect(() => setMounted(true), []);

  /* ── Trigger: dwell time OR scroll depth, whichever first ── */
  useEffect(() => {
    if (!mounted || !INTEREST_OPEN || shouldSuppress()) return;

    const fire = () => {
      if (firedRef.current) return;
      firedRef.current = true;
      setOpen(true);
    };

    const timer = window.setTimeout(fire, DELAY_MS);

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= SCROLL_TRIGGER) fire();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [mounted]);

  const close = useCallback(() => {
    setOpen(false);
    // Only snooze on a genuine dismissal — a submit sets KEY_DONE instead.
    try {
      if (localStorage.getItem(KEY_DONE) !== "1") {
        localStorage.setItem(
          KEY_SNOOZE,
          String(Date.now() + SNOOZE_DAYS * 24 * 60 * 60 * 1000),
        );
      }
    } catch {
      /* ignore */
    }
  }, []);

  /* ── Scroll lock, focus trap, Esc ────────────────────────── */
  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), 60);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const f = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (f.length === 0) return;
      const first = f[0];
      const last = f[f.length - 1];
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
  }, [open, close]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);

    const payload = {
      ...getUtm(),
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      source: "homepage-popup",
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
      try {
        localStorage.setItem(KEY_DONE, "1");
      } catch {
        /* ignore */
      }
      setSubmitted(true);
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  };

  if (!mounted || !open) return null;

  return createPortal(
    <div className={styles.overlay} onMouseDown={close}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-popup-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.close} onClick={close} aria-label="Close">
          ✕
        </button>

        {submitted ? (
          <div className={styles.success}>
            <span className={styles.successMark} aria-hidden="true">✓</span>
            <h2 className={styles.successTitle}>You&apos;re on the list.</h2>
            <p className={styles.successText}>
              Thank you — our team will be in touch with pass availability and
              next steps.
            </p>
            <button type="button" className={styles.successBtn} onClick={close}>
              Continue browsing
            </button>
          </div>
        ) : (
          <>
            <div className={styles.head}>
              <p className={styles.eyebrow}>11 September 2026 · Dubai</p>
              <h2 id="lead-popup-title" className={styles.title}>
                Reserve your place <span className="gradientText">in the room.</span>
              </h2>
              <p className={styles.sub}>
                Seats are capped. Leave your details and our team will be in
                touch with pass availability.
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

              <div className={styles.field}>
                <label className={styles.label} htmlFor="lp-name">Name</label>
                <input ref={firstFieldRef} className={styles.input} id="lp-name" name="name" type="text" required placeholder="Your name" />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="lp-email">Email</label>
                <input className={styles.input} id="lp-email" name="email" type="email" required placeholder="you@company.com" />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="lp-phone">Contact number</label>
                <input className={styles.input} id="lp-phone" name="phone" type="tel" required placeholder="+971 00 000 0000" />
              </div>

              {error && <p className={styles.formError} role="alert">{error}</p>}

              <button type="submit" className={styles.submit} disabled={submitting}>
                {submitting ? "Sending…" : "Reserve my place"}
                {!submitting && <span className={styles.arrow} aria-hidden="true">→</span>}
              </button>

              <button type="button" className={styles.dismiss} onClick={close}>
                No thanks
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}

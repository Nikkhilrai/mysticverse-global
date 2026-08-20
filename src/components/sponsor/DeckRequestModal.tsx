"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getDeckById } from "@/lib/sponsorship";
import styles from "./DeckRequestModal.module.css";
import { getUtm } from "@/lib/utm";

/*
  Serves both entry points:
    deckId = one of the three audience decks  → "Request the deck"
    deckId = "tier-brief" (+ tierName)        → "Request the <tier> brief"
*/
export default function DeckRequestModal({
  deckId,
  tierName,
  onClose,
}: {
  deckId: string | null;
  tierName?: string;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const open = deckId !== null;
  const isTierBrief = deckId === "tier-brief";
  const deck = deckId && !isTierBrief ? getDeckById(deckId) : undefined;

  const title = isTierBrief
    ? `Request the ${tierName} brief`
    : `Request the ${deck?.name ?? "deck"}`;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setError(null);
      setSubmitting(false);
    }
  }, [open, deckId, tierName]);

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
      ...getUtm(),
      deckId,
      deckName: isTierBrief ? `${tierName} brief` : (deck?.name ?? "Deck"),
      tierName: isTierBrief ? tierName : undefined,
      name: fd.get("name"),
      email: fd.get("email"),
      organisation: fd.get("organisation"),
      role: fd.get("role"),
      country: fd.get("country"),
      note: fd.get("note"),
      hp: fd.get("hp"),
    };

    try {
      const res = await fetch("/api/deck-request", {
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
        aria-labelledby="deck-modal-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
          ✕
        </button>

        {submitted ? (
          <div className={styles.success}>
            <span className={styles.successMark} aria-hidden="true">✓</span>
            <h2 className={styles.successTitle}>Request received.</h2>
            <p className={styles.successText}>
              Thank you — our partnerships team will send{" "}
              {isTierBrief ? "the brief" : "the deck"} and follow up within two
              business days.
            </p>
            <button type="button" className={styles.successBtn} onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className={styles.head}>
              <p className={styles.eyebrow}>Partnerships · Dubai 2026</p>
              <h2 id="deck-modal-title" className={styles.title}>{title}</h2>
              <p className={styles.sub}>
                {isTierBrief
                  ? "Tell us a little about your brand and we'll send the full tier brief, including current investment levels."
                  : (deck?.audience ??
                    "Tell us a little about your brand and we'll send the deck.")}
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
                  <label className={styles.label} htmlFor="dk-name">Name</label>
                  <input ref={firstFieldRef} className={styles.input} id="dk-name" name="name" type="text" required placeholder="Your name" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="dk-email">Work email</label>
                  <input className={styles.input} id="dk-email" name="email" type="email" required placeholder="you@brand.com" />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="dk-organisation">Organisation</label>
                  <input className={styles.input} id="dk-organisation" name="organisation" type="text" placeholder="Company / brand" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="dk-role">Role</label>
                  <input className={styles.input} id="dk-role" name="role" type="text" placeholder="Your title" />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="dk-country">
                  Country <span className={styles.optional}>(optional)</span>
                </label>
                <input className={styles.input} id="dk-country" name="country" type="text" placeholder="Country" />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="dk-note">
                  Brief note <span className={styles.optional}>(optional)</span>
                </label>
                <textarea className={styles.textarea} id="dk-note" name="note" rows={3} placeholder="What are you hoping to achieve as a partner?" />
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

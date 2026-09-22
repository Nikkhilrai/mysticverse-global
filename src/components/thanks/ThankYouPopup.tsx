"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ThankYouPopup.module.css";

/*
  Post-event thank-you popup.

  The conference has concluded — this replaces the old lead-capture
  popup with a one-time, purely informational moment: thank visitors,
  point them at the photo gallery, done. Shown once per browser
  (localStorage), auto-opens shortly after the page settles.
*/
const OPEN_DELAY_MS = 1_400;
const KEY_SEEN = "mvg_thankyou_seen";

function hasBeenSeen(): boolean {
  try {
    return localStorage.getItem(KEY_SEEN) === "1";
  } catch {
    return false;
  }
}

export default function ThankYouPopup() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || hasBeenSeen()) return;
    const timer = window.setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [mounted]);

  const close = useCallback(() => {
    setOpen(false);
    try {
      localStorage.setItem(KEY_SEEN, "1");
    } catch {
      /* ignore */
    }
  }, []);

  /* ── Scroll lock, focus trap, Esc ────────────────────────── */
  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(
      () => dialogRef.current?.querySelector<HTMLElement>(".js-autofocus")?.focus(),
      60,
    );

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const f = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
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

  if (!mounted || !open) return null;

  return createPortal(
    <div className={styles.overlay} onMouseDown={close}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="thankyou-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.close} onClick={close} aria-label="Close">
          ✕
        </button>

        <div className={styles.badgeWrap} aria-hidden="true">
          <span className={styles.sparkle} />
          <span className={styles.sparkle} />
          <span className={styles.sparkle} />
          <span className={styles.sparkle} />
          <span className={styles.sparkle} />
          <span className={styles.ring} />
          <span className={styles.badge}>
            <svg viewBox="0 0 64 64" width="34" height="34" fill="none">
              <path
                className={styles.check}
                d="M18 33 L28 43 L46 21"
                stroke="#0B0B12"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        <p className={styles.eyebrow}>11 September 2026 · Dubai</p>
        <h2 id="thankyou-title" className={styles.title}>
          Thank you.
        </h2>
        <p className={styles.sub}>
          MysticVerse Global 2026 has concluded. Thank you for being part of the
          room — for the conversations, the connections, and the energy you
          brought to the day.
        </p>

        <div className={styles.actions}>
          <Link href="/gallery" className={`${styles.primary} js-autofocus`} onClick={close}>
            View Event Gallery
            <span className={styles.arrow} aria-hidden="true">→</span>
          </Link>
          <button type="button" className={styles.secondary} onClick={close}>
            Continue browsing
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

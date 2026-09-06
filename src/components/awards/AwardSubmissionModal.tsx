"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./AwardSubmissionModal.module.css";
import { getUtm } from "@/lib/utm";

export type AwardModalMode = "NOMINATION" | "JURY_PARTNER";

export const AWARD_CATEGORIES = [
  "Conscious Living Project of the Year",
  "HR Wellness Initiative of the Year",
  "Longevity Innovator of the Year",
  "Conscious Brand of the Year",
  "Wisdom Voice of the Year",
  "Conscious Architecture Award",
  "Wellness Hospitality Award",
  "The Celestial Impact Award",
] as const;

const RELATIONSHIPS = [
  "Self-nomination",
  "Colleague",
  "Client or partner",
  "Industry peer",
  "Other",
] as const;

export default function AwardSubmissionModal({
  mode,
  presetCategory,
  onClose,
}: {
  mode: AwardModalMode | null;
  presetCategory?: string;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [category, setCategory] = useState<string>(AWARD_CATEGORIES[0]);
  const [relationship, setRelationship] = useState<string>("Self-nomination");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const open = mode !== null;
  const isNomination = mode === "NOMINATION";

  useEffect(() => setMounted(true), []);

  // Reset to a fresh form each time the modal opens.
  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setError(null);
      setSubmitting(false);
      setCategory(presetCategory ?? AWARD_CATEGORIES[0]);
      setRelationship("Self-nomination");
    }
  }, [open, mode, presetCategory]);

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
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
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
      kind: mode,
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      organisation: fd.get("organisation"),
      role: fd.get("role"),
      country: fd.get("country"),
      ...(isNomination
        ? {
            category,
            relationship,
            nomineeName: fd.get("nomineeName"),
            nomineeOrg: fd.get("nomineeOrg"),
            nomineeWebsite: fd.get("nomineeWebsite"),
            statement: fd.get("statement"),
          }
        : { statement: fd.get("statement") }),
      hp: fd.get("hp"),
    };

    try {
      const res = await fetch("/api/award-submission", {
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
        aria-labelledby="award-modal-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
          ✕
        </button>

        {submitted ? (
          <div className={styles.success}>
            <span className={styles.successMark} aria-hidden="true">✓</span>
            <h2 className={styles.successTitle}>
              {isNomination ? "Nomination received." : "Enquiry received."}
            </h2>
            <p className={styles.successText}>
              {isNomination
                ? "Thank you — your nomination is with our team. We'll be in touch as the jury panel reviews entries."
                : "Thank you — we'll be in touch about joining the jury panel."}
            </p>
            <button type="button" className={styles.successBtn} onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className={styles.head}>
              <p className={styles.eyebrow}>Excellence Awards 2026</p>
              <h2 id="award-modal-title" className={styles.title}>
                {isNomination ? "Nominate a project" : "Become a jury partner"}
              </h2>
              <p className={styles.sub}>
                {isNomination
                  ? "Put a project, brand, or leader forward for an award. Entries are read by the jury panel against the published criteria."
                  : "Tell us about yourself and your field. We'll be in touch about a place on the panel."}
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

              {/* ── Nomination-only: who is being nominated ── */}
              {isNomination && (
                <fieldset className={styles.fieldset}>
                  <legend className={styles.legend}>The nomination</legend>

                  <div className={styles.field}>
                    <span className={styles.label}>Award category</span>
                    <div className={styles.chips}>
                      {AWARD_CATEGORIES.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          className={`${styles.chip}${category === opt ? ` ${styles.chipActive}` : ""}`}
                          onClick={() => setCategory(opt)}
                          aria-pressed={category === opt}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="aw-nomineeName">
                        Project, brand, or person
                      </label>
                      <input
                        ref={firstFieldRef}
                        className={styles.input}
                        id="aw-nomineeName"
                        name="nomineeName"
                        type="text"
                        required
                        placeholder="Who or what are you nominating?"
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="aw-nomineeOrg">
                        Their organisation <span className={styles.optional}>(optional)</span>
                      </label>
                      <input className={styles.input} id="aw-nomineeOrg" name="nomineeOrg" type="text" placeholder="Company / developer / studio" />
                    </div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="aw-nomineeWebsite">
                        Website or link <span className={styles.optional}>(optional)</span>
                      </label>
                      <input className={styles.input} id="aw-nomineeWebsite" name="nomineeWebsite" type="text" placeholder="https://" />
                    </div>
                    <div className={styles.field}>
                      <span className={styles.label}>Your relationship</span>
                      <select
                        className={styles.select}
                        value={relationship}
                        onChange={(e) => setRelationship(e.target.value)}
                        aria-label="Your relationship to the nominee"
                      >
                        {RELATIONSHIPS.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="aw-statement">
                      Why does this deserve the award?
                    </label>
                    <textarea
                      className={styles.textarea}
                      id="aw-statement"
                      name="statement"
                      rows={4}
                      required
                      placeholder="Outcomes, evidence, and what makes this work a new standard…"
                    />
                  </div>
                </fieldset>
              )}

              {/* ── About the submitter ── */}
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>
                  {isNomination ? "About you" : "Your details"}
                </legend>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="aw-name">Name</label>
                    <input
                      ref={isNomination ? undefined : firstFieldRef}
                      className={styles.input}
                      id="aw-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="aw-email">Email</label>
                    <input className={styles.input} id="aw-email" name="email" type="email" required placeholder="you@company.com" />
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="aw-organisation">
                      Organisation <span className={styles.optional}>(optional)</span>
                    </label>
                    <input className={styles.input} id="aw-organisation" name="organisation" type="text" placeholder="Company / fund" />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="aw-role">
                      Role <span className={styles.optional}>(optional)</span>
                    </label>
                    <input className={styles.input} id="aw-role" name="role" type="text" placeholder="Your title" />
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="aw-phone">
                      Phone <span className={styles.optional}>(optional)</span>
                    </label>
                    <input className={styles.input} id="aw-phone" name="phone" type="tel" placeholder="+971 00 000 0000" />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="aw-country">
                      Country <span className={styles.optional}>(optional)</span>
                    </label>
                    <input className={styles.input} id="aw-country" name="country" type="text" placeholder="Country" />
                  </div>
                </div>

                {!isNomination && (
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="aw-jury-note">
                      Your field & experience <span className={styles.optional}>(optional)</span>
                    </label>
                    <textarea
                      className={styles.textarea}
                      id="aw-jury-note"
                      name="statement"
                      rows={3}
                      placeholder="Your area of expertise, and why you'd like to judge…"
                    />
                  </div>
                )}
              </fieldset>

              {error && <p className={styles.formError} role="alert">{error}</p>}

              <button type="submit" className={styles.submit} disabled={submitting}>
                {submitting
                  ? "Sending…"
                  : isNomination
                    ? "Submit nomination"
                    : "Send enquiry"}
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

"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Pass } from "@/lib/passes";
import styles from "./PassCheckoutModal.module.css";
import { getUtm } from "@/lib/utm";
import { calcDiscountedAmountMinor, formatAedMinor } from "@/lib/coupons";

const RAZORPAY_SRC = "https://checkout.razorpay.com/v1/checkout.js";

type RazorpaySuccess = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  order_id: string;
  prefill?: { name?: string; email?: string; contact?: string };
  notes?: Record<string, string>;
  theme?: { color?: string };
  handler: (res: RazorpaySuccess) => void;
  modal?: { ondismiss?: () => void };
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${RAZORPAY_SRC}"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      return;
    }
    const s = document.createElement("script");
    s.src = RAZORPAY_SRC;
    s.async = true;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

type Phase = "form" | "processing" | "paid" | "leadOnly";

export default function PassCheckoutModal({
  pass,
  onClose,
  presetCouponCode,
}: {
  pass: Pass | null;
  onClose: () => void;
  /** Code carried in from the promo banner — applied automatically on open. */
  presetCouponCode?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<Phase>("form");
  const [error, setError] = useState<string | null>(null);

  const [couponInput, setCouponInput] = useState("");
  const [couponApplied, setCouponApplied] = useState<{ code: string; discountPct: number; name: string } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const open = pass !== null;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) {
      setPhase("form");
      setError(null);
      setCouponInput("");
      setCouponApplied(null);
      setCouponError(null);
    }
  }, [open, pass]);

  /* Arriving from the promo banner: seed and validate the code so the
     discount is already applied when the modal opens. Declared after the
     reset effect above so it isn't cleared by it. */
  useEffect(() => {
    if (!open || !presetCouponCode || !pass) return;
    setCouponInput(presetCouponCode);
    void applyCoupon(presetCouponCode);
    // applyCoupon is recreated each render; re-running on its identity
    // would loop. The inputs that matter are in the dep list.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, presetCouponCode, pass?.id]);

  const applyCoupon = async (codeArg?: string) => {
    const code = (codeArg ?? couponInput).trim();
    if (!pass || !code) return;
    setCouponLoading(true);
    setCouponError(null);
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, passId: pass.id }),
      });
      const data = await res.json().catch(() => ({}));
      if (data.valid) {
        setCouponApplied({ code: code.toUpperCase(), discountPct: data.discountPct, name: data.name });
        setCouponError(null);
      } else {
        setCouponError(data.error ?? "Couldn't apply this code.");
      }
    } catch {
      setCouponError("Network error. Please try again.");
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setCouponApplied(null);
    setCouponError(null);
    setCouponInput("");
  };

  const discountedAmountMinor = pass && couponApplied
    ? calcDiscountedAmountMinor(pass.amountMinor, couponApplied.discountPct)
    : (pass?.amountMinor ?? 0);
  const payLabel = pass ? (couponApplied ? formatAedMinor(discountedAmountMinor) : pass.priceLabel) : "";

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
    if (!pass) return;
    setError(null);
    setPhase("processing");

    const fd = new FormData(e.currentTarget);
    if (typeof fd.get("hp") === "string" && (fd.get("hp") as string).trim() !== "") {
      // bot — pretend success, do nothing
      setPhase("leadOnly");
      return;
    }

    const payload = {
      ...getUtm(),
      passId: pass.id,
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      country: fd.get("country"),
      company: fd.get("company"),
      couponCode: couponApplied?.code,
    };

    let data: Record<string, unknown> = {};
    try {
      const res = await fetch("/api/passes/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        // Lead may still have been captured (e.g. Razorpay hiccup).
        if (data.leadCaptured) {
          setPhase("leadOnly");
          return;
        }
        setError((data.error as string) ?? "Something went wrong. Please try again.");
        setPhase("form");
        return;
      }
    } catch {
      setError("Network error. Please try again.");
      setPhase("form");
      return;
    }

    // 100%-off coupon — confirmed immediately, no payment step at all.
    if (data.free) {
      setPhase("paid");
      return;
    }

    // Payment not configured yet — lead captured, thank them.
    if (!data.paymentReady) {
      setPhase("leadOnly");
      return;
    }

    const ok = await loadRazorpay();
    if (!ok || !window.Razorpay) {
      setPhase("leadOnly");
      return;
    }

    const registrationId = data.registrationId as string;
    const prefill = (data.prefill as RazorpayOptions["prefill"]) ?? {};

    const rzp = new window.Razorpay({
      key: data.keyId as string,
      amount: data.amount as number,
      currency: data.currency as string,
      name: "MysticVerse Global 2026",
      description: `${data.passName as string} · 11 September, Dubai`,
      order_id: data.orderId as string,
      prefill,
      theme: { color: "#7C5CFF" },
      handler: async (resp) => {
        try {
          const vr = await fetch("/api/passes/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ registrationId, ...resp }),
          });
          const vd = await vr.json().catch(() => ({}));
          if (vr.ok && vd.ok) {
            setPhase("paid");
          } else {
            setError(
              (vd.error as string) ??
                "We received your payment but couldn't confirm it. Our team will verify and reach out.",
            );
            setPhase("form");
          }
        } catch {
          setError(
            "Payment went through but confirmation failed. Our team will reach out shortly.",
          );
          setPhase("form");
        }
      },
      modal: {
        ondismiss: () => {
          // Payment window closed without paying — lead is still saved.
          setPhase("form");
        },
      },
    });
    rzp.open();
  };

  if (!mounted || !open || !pass) return null;

  return createPortal(
    <div className={styles.overlay} onMouseDown={onClose}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pass-checkout-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
          ✕
        </button>

        {phase === "paid" ? (
          <div className={styles.success}>
            <span className={styles.successMark} aria-hidden="true">✓</span>
            <h2 className={styles.successTitle}>You&apos;re in.</h2>
            <p className={styles.successText}>
              Your {pass.name} is confirmed. A receipt and your event details are
              on their way to your inbox. We can&apos;t wait to see you in Dubai.
            </p>
            <button type="button" className={styles.successBtn} onClick={onClose}>
              Done
            </button>
          </div>
        ) : phase === "leadOnly" ? (
          <div className={styles.success}>
            <span className={styles.successMark} aria-hidden="true">✓</span>
            <h2 className={styles.successTitle}>Details received.</h2>
            <p className={styles.successText}>
              Thank you — we&apos;ve saved your interest in the {pass.name}. Our
              team will reach out shortly to complete your booking and payment.
            </p>
            <button type="button" className={styles.successBtn} onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className={styles.head}>
              <p className={styles.eyebrow}>Checkout · {pass.name}</p>
              <h2 id="pass-checkout-title" className={styles.title}>
                Reserve your {pass.name}
              </h2>
              <div className={styles.priceRow}>
                <span className={styles.price}>{payLabel}</span>
                {couponApplied && <s className={styles.priceWas}>{pass.priceLabel}</s>}
                <span className={styles.priceMeta}>per delegate · incl. taxes</span>
              </div>
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
                  <label className={styles.label} htmlFor="pc-name">Full name</label>
                  <input ref={firstFieldRef} className={styles.input} id="pc-name" name="name" type="text" required placeholder="Your name" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="pc-email">Email</label>
                  <input className={styles.input} id="pc-email" name="email" type="email" required placeholder="you@company.com" />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="pc-phone">Contact number</label>
                  <input className={styles.input} id="pc-phone" name="phone" type="tel" required placeholder="+971 00 000 0000" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="pc-country">Country</label>
                  <input className={styles.input} id="pc-country" name="country" type="text" placeholder="Country" />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="pc-company">Organisation <span className={styles.optional}>(optional)</span></label>
                <input className={styles.input} id="pc-company" name="company" type="text" placeholder="Company / fund" />
              </div>

              <div className={styles.couponBox}>
                {couponApplied ? (
                  <div className={styles.couponChip}>
                    <span className={styles.couponChipText}>
                      <span className={styles.couponChipCode}>{couponApplied.code}</span> applied
                      {" "}— {couponApplied.discountPct}% off
                    </span>
                    <button type="button" className={styles.couponRemove} onClick={removeCoupon}>
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <div className={styles.couponRow}>
                      <input
                        className={styles.couponInput}
                        type="text"
                        placeholder="Have a coupon code?"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            applyCoupon();
                          }
                        }}
                      />
                      <button
                        type="button"
                        className={styles.couponApplyBtn}
                        onClick={() => applyCoupon()}
                        disabled={couponLoading || !couponInput.trim()}
                      >
                        {couponLoading ? "Checking…" : "Apply"}
                      </button>
                    </div>
                    {couponError && <p className={styles.couponError}>{couponError}</p>}
                  </>
                )}
              </div>

              {error && <p className={styles.formError} role="alert">{error}</p>}

              <button type="submit" className={styles.submit} disabled={phase === "processing"}>
                {phase === "processing" ? "Starting secure checkout…" : `Pay ${payLabel}`}
                {phase !== "processing" && <span className={styles.arrow} aria-hidden="true">→</span>}
              </button>

              <p className={styles.secure}>
                <span aria-hidden="true">🔒</span> Payments secured by Razorpay.
                Your details are saved the moment you continue.
              </p>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}

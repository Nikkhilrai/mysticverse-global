"use client";

import { useState } from "react";
import { getUtm } from "@/lib/utm";
import {
  getTierForSeats,
  perSeatPrice,
  fullSeatPrice,
  formatAed,
  MIN_BUNDLE_SEATS,
} from "@/lib/corporate";
import styles from "./CorporatePage.module.css";

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
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${RAZORPAY_SRC}"]`);
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

type Phase = "form" | "processing" | "paid" | "enquiry";

export default function CorporateForm() {
  const [seats, setSeats] = useState(MIN_BUNDLE_SEATS);
  const [phase, setPhase] = useState<Phase>("form");
  const [error, setError] = useState<string | null>(null);

  const tier = getTierForSeats(seats);
  const full = fullSeatPrice("seeker");
  const perSeat = tier ? perSeatPrice("seeker", tier.discountPct) : full;
  const total = seats * perSeat;
  const saving = seats * full - total;
  const bump = (delta: number) =>
    setSeats((s) => Math.max(MIN_BUNDLE_SEATS, Math.min(10000, s + delta)));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const fd = new FormData(e.currentTarget);
    if (typeof fd.get("hp") === "string" && (fd.get("hp") as string).trim() !== "") {
      setPhase("enquiry");
      return;
    }

    const base = {
      ...getUtm(),
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      company: fd.get("company"),
      message: fd.get("message"),
    };

    setPhase("processing");

    // Server prices the booking from the seat count.
    let data: Record<string, unknown> = {};
    try {
      const res = await fetch("/api/corporate/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...base, seats }),
      });
      data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        if (data.leadCaptured) {
          setPhase("enquiry");
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

    if (!data.paymentReady) {
      setPhase("enquiry");
      return;
    }

    const ok = await loadRazorpay();
    if (!ok || !window.Razorpay) {
      setPhase("enquiry");
      return;
    }

    const registrationId = data.registrationId as string;
    const rzp = new window.Razorpay({
      key: data.keyId as string,
      amount: data.amount as number,
      currency: data.currency as string,
      name: "MysticVerse Global 2026",
      description: `Team booking · ${seats} seats · 11 September, Dubai`,
      order_id: data.orderId as string,
      prefill: (data.prefill as RazorpayOptions["prefill"]) ?? {},
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
          setError("Payment went through but confirmation failed. Our team will reach out shortly.");
          setPhase("form");
        }
      },
      modal: { ondismiss: () => setPhase("form") },
    });
    rzp.open();
  };

  if (phase === "paid") {
    return (
      <div className={styles.success}>
        <span className={styles.successMark} aria-hidden="true">✓</span>
        <h2 className={styles.successTitle}>Your team is booked.</h2>
        <p className={styles.successText}>
          {seats} seats confirmed for 11 September. A receipt and your delegate details
          are on their way to your inbox — we&apos;ll follow up shortly to collect the
          names for each seat.
        </p>
      </div>
    );
  }

  if (phase === "enquiry") {
    return (
      <div className={styles.success}>
        <span className={styles.successMark} aria-hidden="true">✓</span>
        <h2 className={styles.successTitle}>Enquiry received.</h2>
        <p className={styles.successText}>
          Thank you — our team will send your proposal and invoice details shortly,
          usually within one working day.
        </p>
      </div>
    );
  }

  const busy = phase === "processing";

  return (
    <div className={styles.checkout} id="enquire">
      {/* ── Details ─────────────────────────────────────── */}
      <div className={styles.checkoutMain}>
        <div className={styles.sectionHead}>
          <p className={styles.sectionEyebrow}>Book your team</p>
          <h2 className={styles.sectionTitle}>Reserve your seats</h2>
          <p className={styles.sectionSub}>
            Secure checkout, instant confirmation. Your seats are held the moment
            payment clears.
          </p>
        </div>

        <form onSubmit={handleSubmit} id="corporate-form">
          <input type="text" name="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" className={styles.hp} />

          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="co-name">Full name</label>
              <input className={styles.input} id="co-name" name="name" type="text" required placeholder="Your name" />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="co-email">Work email</label>
              <input className={styles.input} id="co-email" name="email" type="email" required placeholder="you@company.com" />
            </div>
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="co-company">Company</label>
              <input className={styles.input} id="co-company" name="company" type="text" required placeholder="Company name" />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="co-phone">Phone / WhatsApp</label>
              <input className={styles.input} id="co-phone" name="phone" type="tel" placeholder="+971 00 000 0000" />
            </div>
          </div>

          {/* Seat stepper */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="co-seats">Number of seats</label>
            <div className={styles.stepper}>
              <button
                type="button"
                className={styles.stepBtn}
                onClick={() => bump(-1)}
                aria-label="Remove a seat"
                disabled={seats <= MIN_BUNDLE_SEATS}
              >
                −
              </button>
              <input
                className={styles.stepInput}
                id="co-seats"
                name="seats"
                type="number"
                min={MIN_BUNDLE_SEATS}
                max={10000}
                required
                value={seats}
                onChange={(e) =>
                  setSeats(Math.max(MIN_BUNDLE_SEATS, Number(e.target.value) || MIN_BUNDLE_SEATS))
                }
              />
              <button type="button" className={styles.stepBtn} onClick={() => bump(1)} aria-label="Add a seat">
                +
              </button>
            </div>
            <p className={styles.stepHint}>Team rate applies from {MIN_BUNDLE_SEATS} seats.</p>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="co-message">
              Anything else? <span className={styles.optional}>(optional)</span>
            </label>
            <textarea
              className={styles.textarea}
              id="co-message"
              name="message"
              placeholder="Team or department, PO number, invoicing requirements…"
            />
          </div>
        </form>
      </div>

      {/* ── Order summary ───────────────────────────────── */}
      <aside className={styles.summary}>
        <p className={styles.summaryTitle}>Order summary</p>

        <div className={styles.summaryRow}>
          <span>Seeker Pass × {seats}</span>
          <span>{formatAed(seats * full)}</span>
        </div>

        {tier && (
          <div className={`${styles.summaryRow} ${styles.summaryDiscount}`}>
            <span>Team rate ({tier.discountPct}% off)</span>
            <span>−{formatAed(saving)}</span>
          </div>
        )}

        <div className={styles.summaryRow}>
          <span>Per seat</span>
          <span>{formatAed(perSeat)}</span>
        </div>

        <div className={styles.summaryTotal}>
          <span>Total</span>
          <span className={styles.summaryTotalValue}>{formatAed(total)}</span>
        </div>
        <p className={styles.summaryMeta}>Incl. taxes · billed once</p>


        {error && <p className={styles.error} role="alert">{error}</p>}

        <button type="submit" form="corporate-form" className={styles.submit} disabled={busy}>
          {busy ? "Processing…" : `Pay ${formatAed(total)}`}
        </button>

        <p className={styles.secure}>
          🔒 Payments secured by Razorpay. Your details are saved the moment you continue.
        </p>
      </aside>
    </div>
  );
}

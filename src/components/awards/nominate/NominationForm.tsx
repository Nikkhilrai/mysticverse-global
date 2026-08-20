"use client";

import { useEffect, useState } from "react";
import { getUtm } from "@/lib/utm";
import { getCategoryByName, MAX_CATEGORIES_PER_NOMINATION } from "@/lib/awardCategories";
import type { UploadedDocument } from "@/lib/nomination-upload";
import { EMPTY_FORM, type NominationFormData } from "./types";
import NominationIntro from "./NominationIntro";
import NominatorFields from "./NominatorFields";
import NomineeFields from "./NomineeFields";
import CategoryPicker from "./CategoryPicker";
import PitchFields from "./PitchFields";
import PaymentSection from "./PaymentSection";
import styles from "./NominationForm.module.css";

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

type Phase = "editing" | "processing" | "paid" | "leadOnly";

export default function NominationForm() {
  const [form, setForm] = useState<NominationFormData>(EMPTY_FORM);
  const [sameAsNominator, setSameAsNominator] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [videoLinks, setVideoLinks] = useState<string[]>([]);
  const [phase, setPhase] = useState<Phase>("editing");
  const [error, setError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  const update = (patch: Partial<NominationFormData>) => setForm((f) => ({ ...f, ...patch }));

  const toggleCategory = (name: string) =>
    setCategories((prev) => {
      if (prev.includes(name)) return prev.filter((c) => c !== name);
      if (prev.length >= MAX_CATEGORIES_PER_NOMINATION) return prev;
      return [...prev, name];
    });

  // Pre-select the category passed via ?category= from /awards, if it's real.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("category");
    if (requested && getCategoryByName(requested)) {
      setCategories([requested]);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (honeypot.trim() !== "") {
      setPhase("leadOnly");
      return;
    }
    if (categories.length === 0) {
      setError("Please select at least one award category.");
      return;
    }
    if (!form.declarationAccepted) {
      setError("Please confirm the declaration to submit.");
      return;
    }

    setPhase("processing");

    const payload = {
      ...getUtm(),
      ...form,
      nomineeName: sameAsNominator ? form.nominatorName : form.nomineeName,
      nomineeEmail: sameAsNominator ? form.nominatorEmail : form.nomineeEmail,
      nomineePhone: sameAsNominator ? form.nominatorPhone : form.nomineePhone,
      categories,
      documents,
      videoLinks: videoLinks.filter((l) => l.trim() !== ""),
    };

    let data: Record<string, unknown> = {};
    try {
      const res = await fetch("/api/award-nomination/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        if (data.leadCaptured) {
          setPhase("leadOnly");
          return;
        }
        setError((data.error as string) ?? "Something went wrong. Please try again.");
        setPhase("editing");
        return;
      }
    } catch {
      setError("Network error. Please try again.");
      setPhase("editing");
      return;
    }

    if (!data.paymentReady) {
      setPhase("leadOnly");
      return;
    }

    const ok = await loadRazorpay();
    if (!ok || !window.Razorpay) {
      setPhase("leadOnly");
      return;
    }

    const nominationId = data.nominationId as string;
    const prefill = (data.prefill as RazorpayOptions["prefill"]) ?? {};

    const rzp = new window.Razorpay({
      key: data.keyId as string,
      amount: data.amount as number,
      currency: data.currency as string,
      name: "MysticVerse Global Excellence Awards 2026",
      description: `${categories.length} categor${categories.length === 1 ? "y" : "ies"} nomination`,
      order_id: data.orderId as string,
      prefill,
      theme: { color: "#7C5CFF" },
      handler: async (resp) => {
        try {
          const vr = await fetch("/api/award-nomination/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nominationId, ...resp }),
          });
          const vd = await vr.json().catch(() => ({}));
          if (vr.ok && vd.ok) {
            setPhase("paid");
          } else {
            setError((vd.error as string) ?? "We received your payment but couldn't confirm it. Our team will verify and reach out.");
            setPhase("editing");
          }
        } catch {
          setError("Payment went through but confirmation failed. Our team will reach out shortly.");
          setPhase("editing");
        }
      },
      modal: {
        ondismiss: () => setPhase("editing"),
      },
    });
    rzp.open();
  };

  if (phase === "paid") {
    return (
      <>
        <NominationIntro />
        <section className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.success}>
              <span className={styles.successMark} aria-hidden="true">✓</span>
              <h2 className={styles.successTitle}>Nomination submitted.</h2>
              <p className={styles.successText}>
                Thank you — your nomination and payment are confirmed. Our advisory board and
                jury will review your submission, and we'll be in touch with next steps ahead
                of the ceremony on 11 September 2026.
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (phase === "leadOnly") {
    return (
      <>
        <NominationIntro />
        <section className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.success}>
              <span className={styles.successMark} aria-hidden="true">✓</span>
              <h2 className={styles.successTitle}>Nomination received.</h2>
              <p className={styles.successText}>
                Thank you — we've saved your nomination. Our team will reach out shortly to
                arrange payment and confirm your entry.
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <NominationIntro />
      <section className={styles.section}>
        <div className={styles.inner}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />

            <NominatorFields value={form} onChange={update} />
            <NomineeFields
              value={form}
              onChange={update}
              sameAsNominator={sameAsNominator}
              onSameAsNominatorChange={setSameAsNominator}
            />
            <CategoryPicker selected={categories} onToggle={toggleCategory} />

            <PitchFields
              value={form}
              onChange={update}
              onDocumentsChange={setDocuments}
              videoLinks={videoLinks}
              onVideoLinksChange={setVideoLinks}
            />

            {error && <p className={styles.error} role="alert">{error}</p>}

            <PaymentSection
              value={form}
              onChange={update}
              categoryCount={categories.length}
              submitting={phase === "processing"}
            />
          </form>
        </div>
      </section>
    </>
  );
}

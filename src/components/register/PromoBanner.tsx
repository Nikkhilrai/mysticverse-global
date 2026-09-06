"use client";

import { useEffect, useState } from "react";
import type { FeaturedPromo } from "@/lib/promo";
import styles from "./PromoBanner.module.css";

type Remaining = { days: number; hours: number; minutes: number; seconds: number } | null;

function remainingFrom(deadline: number): Remaining {
  const diff = deadline - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function PromoBanner({
  promo,
  onApply,
}: {
  promo: FeaturedPromo;
  onApply?: (code: string) => void;
}) {
  const deadline = new Date(promo.validUntil).getTime();

  // Rendered only after mount: the countdown depends on the client clock,
  // so server-rendering it would guarantee a hydration mismatch.
  const [remaining, setRemaining] = useState<Remaining>(null);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
    setRemaining(remainingFrom(deadline));
    const id = window.setInterval(() => setRemaining(remainingFrom(deadline)), 1000);
    return () => window.clearInterval(id);
  }, [deadline]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(promo.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the code is on screen to type manually */
    }
  };

  // Deadline passed while the page was open: hide rather than show "expired".
  if (mounted && !remaining) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.left}>
        <span className={styles.flag}>Limited time</span>
        <p className={styles.headline}>
          Use code{" "}
          <button
            type="button"
            className={styles.code}
            onClick={copy}
            aria-label={`Copy coupon code ${promo.code}`}
            title="Click to copy"
          >
            {promo.code}
            <span className={styles.copyHint}>{copied ? "Copied" : "Copy"}</span>
          </button>{" "}
          for <strong>{promo.discountPct}% off</strong> any pass.
        </p>
      </div>

      <div className={styles.right}>
        {remaining ? (
          <div className={styles.countdown} aria-label="Time remaining on this offer">
            <span className={styles.countLabel}>Offer ends in</span>
            <span className={styles.clock}>
              <span className={styles.unit}>
                <span className={styles.num}>{remaining.days}</span>
                <span className={styles.unitLabel}>d</span>
              </span>
              <span className={styles.sep}>:</span>
              <span className={styles.unit}>
                <span className={styles.num}>{pad(remaining.hours)}</span>
                <span className={styles.unitLabel}>h</span>
              </span>
              <span className={styles.sep}>:</span>
              <span className={styles.unit}>
                <span className={styles.num}>{pad(remaining.minutes)}</span>
                <span className={styles.unitLabel}>m</span>
              </span>
              <span className={styles.sep}>:</span>
              <span className={styles.unit}>
                <span className={styles.num}>{pad(remaining.seconds)}</span>
                <span className={styles.unitLabel}>s</span>
              </span>
            </span>
          </div>
        ) : (
          /* Pre-hydration placeholder — reserves the space so the banner
             doesn't jump when the countdown appears. */
          <div className={styles.countdown} aria-hidden="true">
            <span className={styles.countLabel}>Offer ends soon</span>
          </div>
        )}

        {onApply && (
          <button type="button" className={styles.applyBtn} onClick={() => onApply(promo.code)}>
            Claim {promo.discountPct}% off
            <span aria-hidden="true">→</span>
          </button>
        )}
      </div>
    </div>
  );
}

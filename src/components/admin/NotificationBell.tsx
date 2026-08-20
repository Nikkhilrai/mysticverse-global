"use client";

import { useEffect, useRef, useState } from "react";
import type { AdminNotifications } from "@/lib/notifications";
import styles from "./NotificationBell.module.css";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(
    new Date(iso),
  );
}

export default function NotificationBell({
  notifications,
}: {
  notifications: AdminNotifications;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Relative timestamps depend on the client clock, so hold them back
  // until after hydration rather than shipping a mismatched server value.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const { total, recent } = notifications;

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        type="button"
        className={`${styles.bell}${total > 0 ? ` ${styles.bellActive}` : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={total > 0 ? `${total} new submissions` : "Notifications"}
        aria-expanded={open}
      >
        <span className={styles.bellIcon} aria-hidden="true">🔔</span>
        <span className={styles.bellLabel}>
          {total > 0 ? `${total} new` : "No new activity"}
        </span>
        {total > 0 && <span className={styles.dot} aria-hidden="true" />}
      </button>

      {open && (
        <div className={styles.panel} role="dialog" aria-label="Recent activity">
          <div className={styles.panelHead}>
            <span className={styles.panelTitle}>Needs attention</span>
            {total > 0 && <span className={styles.panelCount}>{total}</span>}
          </div>

          {recent.length === 0 ? (
            <p className={styles.empty}>
              Nothing new. Submissions appear here until you mark them Read.
            </p>
          ) : (
            <ul className={styles.list}>
              {recent.map((n) => (
                <li key={`${n.resource}-${n.id}`}>
                  <a className={styles.item} href={n.href}>
                    <span className={styles.itemTop}>
                      <span className={styles.itemSection}>{n.section}</span>
                      <span className={styles.itemTime}>
                        {mounted ? timeAgo(n.createdAt) : ""}
                      </span>
                    </span>
                    <span className={styles.itemTitle}>{n.title}</span>
                    <span className={styles.itemDetail}>{n.detail}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}

          <p className={styles.footnote}>
            Items clear once you mark them Read in their section.
          </p>
        </div>
      )}
    </div>
  );
}

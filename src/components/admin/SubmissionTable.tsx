"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import styles from "./panel.module.css";

type Status = "NEW" | "READ" | "ARCHIVED";
type Row = { id: string; status: string; [k: string]: string };
type Col = { key: string; label: string };

const STATUSES: Status[] = ["NEW", "READ", "ARCHIVED"];

export default function SubmissionTable({
  rows,
  columns,
  detail,
  exportHref,
  onSetStatus,
  onDelete,
}: {
  rows: Row[];
  columns: Col[];
  detail: Col[];
  exportHref: string;
  onSetStatus: (id: string, status: Status) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const statusClass = (s: string) =>
    s === "NEW" ? styles.badgeNew : s === "READ" ? styles.badgeRead : styles.badgeArchived;

  const run = (fn: () => Promise<void>) =>
    startTransition(async () => {
      await fn();
      router.refresh();
    });

  return (
    <div>
      <div className={styles.toolbar}>
        <span className={styles.count}>{rows.length} total</span>
        {rows.length > 0 && (
          <a className={styles.exportBtn} href={exportHref}>Export CSV</a>
        )}
      </div>

      <div className={styles.tableWrap}>
        {rows.length === 0 ? (
          <p className={styles.empty}>No submissions yet.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                {columns.map((c) => (
                  <th key={c.key} className={styles.th}>{c.label}</th>
                ))}
                <th className={styles.th}>Status</th>
                <th className={styles.th} aria-label="Expand" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const open = openId === row.id;
                return (
                  <FragmentRow key={row.id}>
                    <tr
                      className={`${styles.tr} ${styles.clickable}`}
                      onClick={() => setOpenId(open ? null : row.id)}
                    >
                      {columns.map((c, i) => (
                        <td
                          key={c.key}
                          className={`${styles.td} ${i === 0 ? styles.tdStrong : styles.tdMuted}`}
                        >
                          {row[c.key]}
                        </td>
                      ))}
                      <td className={styles.td}>
                        <span className={`${styles.badge} ${statusClass(row.status)}`}>{row.status}</span>
                      </td>
                      <td className={`${styles.td} ${styles.chevronCell}`}>
                        <span className={`${styles.chevron}${open ? ` ${styles.chevronOpen}` : ""}`} aria-hidden="true">▾</span>
                      </td>
                    </tr>
                    {open && (
                      <tr className={styles.detailRow}>
                        <td className={styles.detailCell} colSpan={columns.length + 2}>
                          <div className={styles.detailGrid}>
                            {detail.map((d) => (
                              <div key={d.key} className={styles.detailItem}>
                                <span className={styles.detailLabel}>{d.label}</span>
                                <span className={styles.detailValue}>{row[d.key]}</span>
                              </div>
                            ))}
                          </div>
                          <div className={styles.actionRow}>
                            <div className={styles.statusBtns}>
                              {STATUSES.map((s) => (
                                <button
                                  key={s}
                                  type="button"
                                  disabled={pending || row.status === s}
                                  className={`${styles.statusBtn}${row.status === s ? ` ${styles.statusBtnActive}` : ""}`}
                                  onClick={() => run(() => onSetStatus(row.id, s))}
                                >
                                  {s.charAt(0) + s.slice(1).toLowerCase()}
                                </button>
                              ))}
                            </div>
                            <button
                              type="button"
                              disabled={pending}
                              className={styles.deleteBtn}
                              onClick={() => {
                                if (confirm("Delete this submission permanently?")) {
                                  run(() => onDelete(row.id));
                                }
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </FragmentRow>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function FragmentRow({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

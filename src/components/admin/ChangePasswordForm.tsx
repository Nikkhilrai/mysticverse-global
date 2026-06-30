"use client";

import { useState } from "react";
import { changePassword } from "@/app/admin/(dashboard)/settings/actions";
import styles from "./PostForm.module.css";

export default function ChangePasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (next !== confirm) {
      setError("New passwords don't match.");
      return;
    }
    setBusy(true);
    const res = await changePassword(current, next);
    setBusy(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    setDone(true);
    setCurrent("");
    setNext("");
    setConfirm("");
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 420 }}>
      <label className={styles.label} htmlFor="cur">Current password</label>
      <input id="cur" className={styles.input} type="password" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} required />

      <label className={styles.label} htmlFor="new">New password</label>
      <input id="new" className={styles.input} type="password" autoComplete="new-password" value={next} onChange={(e) => setNext(e.target.value)} required />

      <label className={styles.label} htmlFor="conf">Confirm new password</label>
      <input id="conf" className={styles.input} type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />

      {error && <p className={styles.error}>{error}</p>}
      {done && <p style={{ color: "#7bd88f", fontSize: "0.8125rem", marginTop: "0.75rem" }}>Password updated.</p>}

      <div style={{ marginTop: "1.25rem" }}>
        <button type="submit" className={styles.publishBtn} disabled={busy} style={{ minWidth: 160 }}>
          {busy ? "Updating…" : "Update password"}
        </button>
      </div>
    </form>
  );
}

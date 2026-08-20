"use client";

import { useState } from "react";
import { RESOURCES } from "@/lib/permissions";
import { saveUser, deleteUser, type TeamUserLite, type TeamUserInput } from "@/app/admin/(dashboard)/team/actions";
import styles from "./TeamManager.module.css";

type FormState = {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "EDITOR";
  permissions: string[];
};

const EMPTY: FormState = { name: "", email: "", password: "", role: "EDITOR", permissions: [] };

function fmt(d: Date) {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(d));
}

export default function TeamManager({
  initialUsers,
  currentUserId,
}: {
  initialUsers: TeamUserLite[];
  currentUserId: string;
}) {
  const [users, setUsers] = useState<TeamUserLite[]>(initialUsers);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startEdit = (u: TeamUserLite) => {
    setEditingId(u.id);
    setForm({
      name: u.name ?? "",
      email: u.email,
      password: "",
      role: u.role === "ADMIN" ? "ADMIN" : "EDITOR",
      permissions: u.permissions,
    });
    setError(null);
  };

  const startNew = () => {
    setEditingId(null);
    setForm(EMPTY);
    setError(null);
  };

  const togglePermission = (key: string) => {
    setForm((f) => ({
      ...f,
      permissions: f.permissions.includes(key)
        ? f.permissions.filter((p) => p !== key)
        : [...f.permissions, key],
    }));
  };

  const save = async () => {
    setError(null);
    setSaving(true);
    try {
      const input: TeamUserInput = {
        id: editingId ?? undefined,
        name: form.name,
        email: form.email,
        password: form.password || undefined,
        role: form.role,
        permissions: form.permissions,
      };
      const saved = await saveUser(input);
      setUsers((prev) => {
        const lite: TeamUserLite = {
          id: saved.id,
          name: saved.name,
          email: saved.email,
          role: saved.role,
          permissions: saved.permissions,
          createdAt: saved.createdAt,
        };
        return editingId
          ? prev.map((u) => (u.id === editingId ? lite : u))
          : [...prev, lite];
      });
      startNew();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't save this account.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (u: TeamUserLite) => {
    if (!confirm(`Remove ${u.name ?? u.email}'s access? This can't be undone.`)) return;
    setError(null);
    try {
      await deleteUser(u.id);
      setUsers((prev) => prev.filter((x) => x.id !== u.id));
      if (editingId === u.id) startNew();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't remove this account.");
    }
  };

  return (
    <div className={styles.layout}>
      {/* ── Existing accounts ────────────────────────────── */}
      <div className={styles.list}>
        {users.map((u) => (
          <div key={u.id} className={`${styles.row}${editingId === u.id ? ` ${styles.rowActive}` : ""}`}>
            <button type="button" className={styles.rowMain} onClick={() => startEdit(u)}>
              <span className={styles.rowTop}>
                <span className={styles.rowName}>{u.name ?? "Unnamed"}</span>
                <span className={`${styles.roleBadge}${u.role === "ADMIN" ? ` ${styles.roleAdmin}` : ""}`}>
                  {u.role === "ADMIN" ? "Admin" : "Editor"}
                </span>
              </span>
              <span className={styles.rowEmail}>{u.email}</span>
              {u.role === "EDITOR" && (
                <span className={styles.rowScope}>
                  {u.permissions.length === 0
                    ? "No sections granted yet"
                    : u.permissions
                        .map((p) => RESOURCES.find((r) => r.key === p)?.label ?? p)
                        .join(" · ")}
                </span>
              )}
              <span className={styles.rowDate}>Added {fmt(u.createdAt)}</span>
            </button>
            {u.id !== currentUserId && (
              <button type="button" className={styles.rowDelete} onClick={() => remove(u)}>
                Remove
              </button>
            )}
          </div>
        ))}

        <button type="button" className={styles.addBtn} onClick={startNew}>
          + New admin
        </button>
      </div>

      {/* ── Create / edit form ───────────────────────────── */}
      <div className={styles.form}>
        <span className={styles.formLabel}>{editingId ? "Edit account" : "New admin account"}</span>

        <label className={styles.label} htmlFor="tm-name">Name</label>
        <input id="tm-name" className={styles.input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" />

        <label className={styles.label} htmlFor="tm-email">Email</label>
        <input id="tm-email" className={styles.input} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="name@mysticverseglobal.com" />

        <label className={styles.label} htmlFor="tm-password">
          {editingId ? "New password" : "Password"}
          {editingId && <span className={styles.optional}> (leave blank to keep current)</span>}
        </label>
        <input
          id="tm-password"
          className={styles.input}
          type="password"
          autoComplete="new-password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder={editingId ? "••••••••" : "At least 8 characters"}
        />

        <label className={styles.label}>Role</label>
        <div className={styles.roleToggle}>
          <button
            type="button"
            className={`${styles.roleBtn}${form.role === "EDITOR" ? ` ${styles.roleBtnOn}` : ""}`}
            onClick={() => setForm({ ...form, role: "EDITOR" })}
          >
            Editor — limited to chosen sections
          </button>
          <button
            type="button"
            className={`${styles.roleBtn}${form.role === "ADMIN" ? ` ${styles.roleBtnOn}` : ""}`}
            onClick={() => setForm({ ...form, role: "ADMIN" })}
          >
            Admin — full access
          </button>
        </div>

        {form.role === "EDITOR" && (
          <>
            <label className={styles.label}>Sections this account can access</label>
            <div className={styles.permGrid}>
              {RESOURCES.map((r) => (
                <label key={r.key} className={styles.permCheck}>
                  <input
                    type="checkbox"
                    checked={form.permissions.includes(r.key)}
                    onChange={() => togglePermission(r.key)}
                  />
                  {r.label}
                </label>
              ))}
            </div>
          </>
        )}

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.formActions}>
          {editingId && (
            <button type="button" className={styles.cancelBtn} onClick={startNew}>Cancel edit</button>
          )}
          <button type="button" className={styles.saveBtn} onClick={save} disabled={saving}>
            {saving ? "Saving…" : editingId ? "Update account" : "Create account"}
          </button>
        </div>
      </div>
    </div>
  );
}

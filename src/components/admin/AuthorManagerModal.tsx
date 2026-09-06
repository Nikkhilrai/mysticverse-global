"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { saveAuthor, deleteAuthor, type AuthorInput } from "@/app/admin/(dashboard)/posts/author-actions";
import { pickAndUpload } from "@/lib/admin-upload";
import styles from "./AuthorManagerModal.module.css";

export interface AuthorLite {
  id: string;
  name: string;
  role: string | null;
  image: string | null;
  bio: string | null;
  email: string | null;
  linkedin: string | null;
  twitter: string | null;
  website: string | null;
}

const EMPTY: AuthorInput = {
  name: "",
  role: "",
  image: "",
  bio: "",
  email: "",
  linkedin: "",
  twitter: "",
  website: "",
};

export default function AuthorManagerModal({
  open,
  authors,
  onChange,
  onClose,
}: {
  open: boolean;
  authors: AuthorLite[];
  onChange: (authors: AuthorLite[]) => void;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<AuthorInput>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) {
      setEditingId(null);
      setForm(EMPTY);
      setError(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  const startEdit = (a: AuthorLite) => {
    setEditingId(a.id);
    setForm({
      name: a.name,
      role: a.role ?? "",
      image: a.image ?? "",
      bio: a.bio ?? "",
      email: a.email ?? "",
      linkedin: a.linkedin ?? "",
      twitter: a.twitter ?? "",
      website: a.website ?? "",
    });
  };

  const startNew = () => {
    setEditingId(null);
    setForm(EMPTY);
  };

  const save = async () => {
    setError(null);
    if (!form.name.trim()) {
      setError("A name is required.");
      return;
    }
    setSaving(true);
    try {
      const saved = await saveAuthor({ ...form, id: editingId ?? undefined });
      const lite: AuthorLite = {
        id: saved.id,
        name: saved.name,
        role: saved.role,
        image: saved.image,
        bio: saved.bio,
        email: saved.email,
        linkedin: saved.linkedin,
        twitter: saved.twitter,
        website: saved.website,
      };
      const next = editingId
        ? authors.map((a) => (a.id === editingId ? lite : a))
        : [...authors, lite].sort((a, b) => a.name.localeCompare(b.name));
      onChange(next);
      startNew();
    } catch {
      setError(editingId ? "Couldn't update author." : "Couldn't add author — the name may already exist.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this author? Posts using them will keep their content but lose the byline.")) return;
    await deleteAuthor(id);
    onChange(authors.filter((a) => a.id !== id));
    if (editingId === id) startNew();
  };

  const setImage = async () => {
    setUploading(true);
    const url = await pickAndUpload();
    if (url) setForm((f) => ({ ...f, image: url }));
    setUploading(false);
  };

  return createPortal(
    <div className={styles.overlay} onMouseDown={onClose}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="author-modal-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close">✕</button>
        <h2 id="author-modal-title" className={styles.title}>Manage authors</h2>
        <p className={styles.sub}>
          Author profiles are reusable — edit one here and every post using them updates too.
        </p>

        <div className={styles.body}>
          {/* ── Existing authors ─────────────────────────── */}
          <div className={styles.list}>
            {authors.length === 0 && <p className={styles.empty}>No authors yet.</p>}
            {authors.map((a) => (
              <div key={a.id} className={`${styles.row}${editingId === a.id ? ` ${styles.rowActive}` : ""}`}>
                <button type="button" className={styles.rowMain} onClick={() => startEdit(a)}>
                  {a.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className={styles.avatar} src={a.image} alt="" />
                  ) : (
                    <span className={styles.avatarFallback}>{a.name.charAt(0).toUpperCase()}</span>
                  )}
                  <span className={styles.rowText}>
                    <span className={styles.rowName}>{a.name}</span>
                    {a.role && <span className={styles.rowRole}>{a.role}</span>}
                  </span>
                </button>
                <button type="button" className={styles.rowDelete} onClick={() => remove(a.id)} aria-label={`Delete ${a.name}`}>
                  Delete
                </button>
              </div>
            ))}
            <button type="button" className={styles.addBtn} onClick={startNew}>
              + New author
            </button>
          </div>

          {/* ── Add / edit form ──────────────────────────── */}
          <div className={styles.form}>
            <span className={styles.formLabel}>{editingId ? "Edit author" : "New author"}</span>

            <label className={styles.label} htmlFor="au-name">Name</label>
            <input
              id="au-name"
              className={styles.input}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Full name"
            />

            <label className={styles.label} htmlFor="au-role">Role</label>
            <input
              id="au-role"
              className={styles.input}
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              placeholder="e.g. Editor, Founder, Guest Contributor"
            />

            <label className={styles.label}>Photo</label>
            <div className={styles.photoRow}>
              {form.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className={styles.photoPreview} src={form.image} alt="" />
              ) : (
                <span className={styles.photoEmpty}>No photo</span>
              )}
              <button type="button" className={styles.smallBtn} onClick={setImage} disabled={uploading}>
                {uploading ? "Uploading…" : "Upload"}
              </button>
              {form.image && (
                <button type="button" className={styles.smallBtn} onClick={() => setForm({ ...form, image: "" })}>
                  Remove
                </button>
              )}
            </div>
            <input
              className={styles.input}
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="…or paste image URL"
            />

            <label className={styles.label} htmlFor="au-bio">Bio</label>
            <textarea
              id="au-bio"
              className={styles.textarea}
              rows={3}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              placeholder="A sentence or two shown under the byline"
            />

            <div className={styles.grid2}>
              <div>
                <label className={styles.label} htmlFor="au-email">Email</label>
                <input id="au-email" className={styles.input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="name@mysticverseglobal.com" />
              </div>
              <div>
                <label className={styles.label} htmlFor="au-linkedin">LinkedIn</label>
                <input id="au-linkedin" className={styles.input} value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} placeholder="https://linkedin.com/in/…" />
              </div>
              <div>
                <label className={styles.label} htmlFor="au-twitter">Twitter / X</label>
                <input id="au-twitter" className={styles.input} value={form.twitter} onChange={(e) => setForm({ ...form, twitter: e.target.value })} placeholder="https://x.com/…" />
              </div>
              <div>
                <label className={styles.label} htmlFor="au-website">Website</label>
                <input id="au-website" className={styles.input} value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} placeholder="https://…" />
              </div>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.formActions}>
              {editingId && (
                <button type="button" className={styles.cancelBtn} onClick={startNew}>Cancel edit</button>
              )}
              <button type="button" className={styles.saveBtn} onClick={save} disabled={saving}>
                {saving ? "Saving…" : editingId ? "Update author" : "Add author"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

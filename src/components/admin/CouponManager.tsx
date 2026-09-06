"use client";

import { useState } from "react";
import {
  saveCoupon,
  deleteCoupon,
  toggleCouponActive,
  type CouponLite,
  type CouponInput,
} from "@/app/admin/(dashboard)/coupons/actions";
import styles from "./CouponManager.module.css";

type FormState = {
  code: string;
  name: string;
  discountPct: string;
  validFrom: string;
  validUntil: string;
  maxUses: string;
  seeker: boolean;
  mystic: boolean;
  isActive: boolean;
  isFeatured: boolean;
};

function toDateInput(d: Date): string {
  return new Date(d).toISOString().slice(0, 10);
}

const todayStr = () => toDateInput(new Date());
const inMonthStr = () => {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  return toDateInput(d);
};

const EMPTY: FormState = {
  code: "",
  name: "",
  discountPct: "",
  validFrom: todayStr(),
  validUntil: inMonthStr(),
  maxUses: "",
  seeker: true,
  mystic: true,
  isActive: true,
  isFeatured: false,
};

function statusOf(c: CouponLite): { label: string; cls: string } {
  if (!c.isActive) return { label: "Inactive", cls: styles.statusInactive };
  if (new Date(c.validUntil) < new Date()) return { label: "Expired", cls: styles.statusExpired };
  if (c.maxUses !== null && c.usedCount >= c.maxUses) return { label: "Exhausted", cls: styles.statusExhausted };
  return { label: "Active", cls: styles.statusActive };
}

export default function CouponManager({ initialCoupons }: { initialCoupons: CouponLite[] }) {
  const [coupons, setCoupons] = useState<CouponLite[]>(initialCoupons);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startEdit = (c: CouponLite) => {
    setEditingId(c.id);
    const applicable = c.applicablePasses?.split(",").map((s) => s.trim()) ?? [];
    setForm({
      code: c.code,
      name: c.name,
      discountPct: String(c.discountPct),
      validFrom: toDateInput(c.validFrom),
      validUntil: toDateInput(c.validUntil),
      maxUses: c.maxUses !== null ? String(c.maxUses) : "",
      seeker: applicable.length === 0 || applicable.includes("seeker"),
      mystic: applicable.length === 0 || applicable.includes("mystic"),
      isActive: c.isActive,
      isFeatured: c.isFeatured,
    });
    setError(null);
  };

  const startNew = () => {
    setEditingId(null);
    setForm(EMPTY);
    setError(null);
  };

  const save = async () => {
    setError(null);
    setSaving(true);
    try {
      const passes: string[] = [];
      if (form.seeker) passes.push("seeker");
      if (form.mystic) passes.push("mystic");
      const applicablePasses = passes.length === 0 || passes.length === 2 ? null : passes.join(",");

      const input: CouponInput = {
        id: editingId ?? undefined,
        code: form.code,
        name: form.name,
        discountPct: Number(form.discountPct),
        validFrom: form.validFrom,
        validUntil: form.validUntil,
        maxUses: form.maxUses.trim() ? Number(form.maxUses) : null,
        applicablePasses,
        isActive: form.isActive,
        isFeatured: form.isFeatured,
      };
      const saved = await saveCoupon(input);
      setCoupons((prev) =>
        editingId ? prev.map((c) => (c.id === editingId ? saved : c)) : [saved, ...prev],
      );
      startNew();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't save this coupon.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (c: CouponLite) => {
    if (!confirm(`Delete coupon "${c.code}"? This can't be undone.`)) return;
    setError(null);
    try {
      await deleteCoupon(c.id);
      setCoupons((prev) => prev.filter((x) => x.id !== c.id));
      if (editingId === c.id) startNew();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't delete this coupon.");
    }
  };

  const toggleActive = async (c: CouponLite) => {
    setError(null);
    try {
      await toggleCouponActive(c.id, !c.isActive);
      setCoupons((prev) => prev.map((x) => (x.id === c.id ? { ...x, isActive: !x.isActive } : x)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't update this coupon.");
    }
  };

  return (
    <div className={styles.layout}>
      {/* ── Existing coupons ─────────────────────────────── */}
      <div className={styles.list}>
        {coupons.map((c) => {
          const status = statusOf(c);
          return (
            <div key={c.id} className={`${styles.row}${editingId === c.id ? ` ${styles.rowActive}` : ""}`}>
              <button type="button" className={styles.rowMain} onClick={() => startEdit(c)}>
                <span className={styles.rowTop}>
                  <span className={styles.rowCode}>{c.code}</span>
                  <span className={`${styles.statusBadge} ${status.cls}`}>{status.label}</span>
                </span>
                <span className={styles.rowName}>{c.name} — {c.discountPct}% off</span>
                <span className={styles.rowMeta}>
                  Used {c.usedCount}{c.maxUses !== null ? ` / ${c.maxUses}` : " (unlimited)"} · until {toDateInput(c.validUntil)}
                </span>
              </button>
              <button type="button" className={styles.rowDelete} onClick={() => toggleActive(c)}>
                {c.isActive ? "Deactivate" : "Activate"}
              </button>
              <button type="button" className={styles.rowDelete} onClick={() => remove(c)}>
                Delete
              </button>
            </div>
          );
        })}

        <button type="button" className={styles.addBtn} onClick={startNew}>
          + New coupon
        </button>
      </div>

      {/* ── Create / edit form ───────────────────────────── */}
      <div className={styles.form}>
        <span className={styles.formLabel}>{editingId ? "Edit coupon" : "New coupon"}</span>

        <label className={styles.label} htmlFor="cp-code">Coupon code</label>
        <input id="cp-code" className={styles.input} value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} placeholder="LAUNCH20" />

        <label className={styles.label} htmlFor="cp-name">Display name</label>
        <input id="cp-name" className={styles.input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Launch Week Discount" />

        <label className={styles.label} htmlFor="cp-discount">Discount %</label>
        <input id="cp-discount" className={styles.input} type="number" min={1} max={100} value={form.discountPct} onChange={(e) => setForm({ ...form, discountPct: e.target.value })} placeholder="20" />

        <div className={styles.fieldRow}>
          <div>
            <label className={styles.label} htmlFor="cp-from">Valid from</label>
            <input id="cp-from" className={styles.input} type="date" value={form.validFrom} onChange={(e) => setForm({ ...form, validFrom: e.target.value })} />
          </div>
          <div>
            <label className={styles.label} htmlFor="cp-until">Expires</label>
            <input id="cp-until" className={styles.input} type="date" value={form.validUntil} onChange={(e) => setForm({ ...form, validUntil: e.target.value })} />
          </div>
        </div>

        <label className={styles.label} htmlFor="cp-max">
          Max uses <span className={styles.optional}>(blank = unlimited)</span>
        </label>
        <input id="cp-max" className={styles.input} type="number" min={1} value={form.maxUses} onChange={(e) => setForm({ ...form, maxUses: e.target.value })} placeholder="Unlimited" />

        <label className={styles.label}>Applicable passes</label>
        <div className={styles.passGrid}>
          <label className={styles.passCheck}>
            <input type="checkbox" checked={form.seeker} onChange={(e) => setForm({ ...form, seeker: e.target.checked })} />
            Seeker Pass
          </label>
          <label className={styles.passCheck}>
            <input type="checkbox" checked={form.mystic} onChange={(e) => setForm({ ...form, mystic: e.target.checked })} />
            Mystic Pass
          </label>
        </div>
        <p className={styles.hint}>Leave both checked for "any pass."</p>

        <label className={styles.toggleRow}>
          <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
          Active
        </label>

        <label className={styles.toggleRow}>
          <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
          Promote on the website
        </label>
        <p className={styles.hint}>
          Shows this code publicly on the passes page with a countdown. Leave off for
          codes you only share by email or message.
        </p>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.formActions}>
          {editingId && (
            <button type="button" className={styles.cancelBtn} onClick={startNew}>Cancel edit</button>
          )}
          <button type="button" className={styles.saveBtn} onClick={save} disabled={saving}>
            {saving ? "Saving…" : editingId ? "Update coupon" : "Create coupon"}
          </button>
        </div>
      </div>
    </div>
  );
}

import { prisma } from "@/lib/db";
import { requirePermission } from "@/lib/auth-server";
import styles from "@/components/admin/panel.module.css";
import SubmissionTable from "@/components/admin/SubmissionTable";
import { setPassStatus, deletePass } from "./actions";
import { EDITION_LABEL, editionOfPassName, type Edition } from "@/lib/passes";

export const dynamic = "force-dynamic";

function fmt(d: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

function money(minor: number, currency: string) {
  return `${currency} ${(minor / 100).toLocaleString("en-US", {
    minimumFractionDigits: 0,
  })}`;
}

export default async function PassesPage() {
  await requirePermission("passes");
  const list = await prisma.passRegistration.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Revenue per edition, each in its own currency (Dubai AED, Bangkok
  // USD) — never summed across currencies. One row can be a team
  // booking, so seats — not row count — is the real figure.
  const paid = list.filter((r) => r.paymentStatus === "PAID");
  const byEdition = new Map<Edition, { seats: number; totals: Map<string, number> }>();
  for (const r of paid) {
    const ed = editionOfPassName(r.passType);
    const e = byEdition.get(ed) ?? { seats: 0, totals: new Map() };
    e.seats += r.seats;
    e.totals.set(r.currency, (e.totals.get(r.currency) ?? 0) + r.amount);
    byEdition.set(ed, e);
  }
  const editionOrder: Edition[] = ["bangkok-2027", "dubai-2026"];

  const rows = list.map((r) => ({
    id: r.id,
    status: r.status,
    name: r.name,
    email: r.email,
    event: EDITION_LABEL[editionOfPassName(r.passType)],
    pass: r.passType,
    seats: r.seats > 1 ? `${r.seats} seats` : "1",
    amount: money(r.amount, r.currency),
    payment: r.paymentStatus,
    campaign: [r.utmSource, r.utmMedium, r.utmCampaign].filter(Boolean).join(" / ") || "Direct",
    received: fmt(r.createdAt),
    phone: r.phone ?? "—",
    country: r.country ?? "—",
    company: r.company ?? "—",
    paidAt: r.paidAt ? fmt(r.paidAt) : "—",
    paymentId: r.razorpayPaymentId ?? "—",
    orderId: r.razorpayOrderId ?? "—",
    coupon: r.couponCode ? `${r.couponCode} (${r.couponDiscountPct}% off)` : "—",
  }));

  return (
    <div>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Submissions</p>
        <h1 className={styles.h1}>Pass registrations</h1>
        <p className={styles.sub}>
          Delegate pass leads and payments from the Register and Corporate pages.
        </p>
        <p className={styles.sub}>
          {editionOrder.map((ed) => {
            const e = byEdition.get(ed);
            return (
              <span key={ed} style={{ display: "block" }}>
                {EDITION_LABEL[ed]} — paid:{" "}
                <strong>
                  {e && e.totals.size
                    ? [...e.totals].map(([cur, amt]) => money(amt, cur)).join(" + ")
                    : "—"}
                </strong>{" "}
                across <strong>{e?.seats ?? 0}</strong> seat{e?.seats === 1 ? "" : "s"}.
              </span>
            );
          })}
        </p>
      </header>

      <SubmissionTable
        rows={rows}
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "event", label: "Event" },
          { key: "pass", label: "Pass" },
          { key: "seats", label: "Seats" },
          { key: "amount", label: "Amount" },
          { key: "payment", label: "Payment" },
          { key: "received", label: "Received" },
        ]}
        detail={[
          { key: "campaign", label: "Campaign / source" },
          { key: "phone", label: "Phone" },
          { key: "country", label: "Country" },
          { key: "company", label: "Organisation" },
          { key: "paidAt", label: "Paid at" },
          { key: "paymentId", label: "Razorpay payment ID" },
          { key: "orderId", label: "Razorpay order ID" },
          { key: "coupon", label: "Coupon used" },
        ]}
        exportHref="/api/admin/passes/export"
        onSetStatus={setPassStatus}
        onDelete={deletePass}
      />
    </div>
  );
}

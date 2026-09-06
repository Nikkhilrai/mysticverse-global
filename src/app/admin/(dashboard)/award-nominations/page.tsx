import { prisma } from "@/lib/db";
import { requirePermission } from "@/lib/auth-server";
import styles from "@/components/admin/panel.module.css";
import SubmissionTable from "@/components/admin/SubmissionTable";
import { setAwardNominationStatus, deleteAwardNomination } from "./actions";

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
  return `${currency} ${(minor / 100).toLocaleString("en-US", { minimumFractionDigits: 0 })}`;
}

interface DocumentEntry {
  url: string;
  name?: string;
  sizeBytes?: number;
  format?: string;
}

function formatDocuments(json: unknown): string {
  if (!Array.isArray(json) || json.length === 0) return "—";
  return (json as DocumentEntry[])
    .map((d) => `${d.name ?? "file"} (${d.url})`)
    .join(" | ");
}

export default async function AwardNominationsPage() {
  await requirePermission("award-nominations");
  const list = await prisma.awardNomination.findMany({
    orderBy: { createdAt: "desc" },
  });

  const paidTotal = list
    .filter((r) => r.paymentStatus === "PAID")
    .reduce((sum, r) => sum + r.amount, 0);

  const rows = list.map((r) => ({
    id: r.id,
    status: r.status,
    nominator: r.nominatorName,
    email: r.nominatorEmail,
    categories: r.categories.join(", ") || "—",
    amount: money(r.amount, r.currency),
    payment: r.paymentStatus,
    received: fmt(r.createdAt),
    campaign: [r.utmSource, r.utmMedium, r.utmCampaign].filter(Boolean).join(" / ") || "Direct",
    nominationType: r.nominationType,
    nominatorTitle: r.nominatorTitle ?? "—",
    nominatorOrganisation: r.nominatorOrganisation ?? "—",
    nominatorPhone: r.nominatorPhone ?? "—",
    nominatorCountry: r.nominatorCountry ?? "—",
    nomineeName: r.nomineeName ?? "—",
    nomineeTitle: r.nomineeTitle ?? "—",
    nomineeEmail: r.nomineeEmail ?? "—",
    nomineePhone: r.nomineePhone ?? "—",
    nomineeWebsite: r.nomineeWebsite ?? "—",
    nomineeLinkedin: r.nomineeLinkedin ?? "—",
    executiveSummary: r.executiveSummary,
    keyAchievements: r.keyAchievements,
    alignmentStatement: r.alignmentStatement,
    documents: formatDocuments(r.documents),
    videoLinks: r.videoLinks.join(", ") || "—",
    paymentMethod: r.paymentMethodPreference,
    billing: [r.billingName, r.billingAddressLine1, r.billingCity, r.billingCountry].filter(Boolean).join(", ") || "—",
    paidAt: r.paidAt ? fmt(r.paidAt) : "—",
    paymentId: r.razorpayPaymentId ?? "—",
    orderId: r.razorpayOrderId ?? "—",
  }));

  return (
    <div>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Submissions</p>
        <h1 className={styles.h1}>Award Applications</h1>
        <p className={styles.sub}>
          Excellence Awards nominations from the official nomination form. Paid revenue
          to date: <strong>{money(paidTotal, "USD")}</strong>.
        </p>
      </header>

      <SubmissionTable
        rows={rows}
        columns={[
          { key: "nominator", label: "Nominator" },
          { key: "email", label: "Email" },
          { key: "categories", label: "Categories" },
          { key: "amount", label: "Amount" },
          { key: "payment", label: "Payment" },
          { key: "received", label: "Received" },
        ]}
        detail={[
          { key: "campaign", label: "Campaign / source" },
          { key: "nominationType", label: "Nomination type" },
          { key: "nominatorTitle", label: "Nominator title" },
          { key: "nominatorOrganisation", label: "Nominator organisation" },
          { key: "nominatorPhone", label: "Nominator phone" },
          { key: "nominatorCountry", label: "Nominator country" },
          { key: "nomineeName", label: "Nominee" },
          { key: "nomineeTitle", label: "Nominee title" },
          { key: "nomineeEmail", label: "Nominee email" },
          { key: "nomineePhone", label: "Nominee phone" },
          { key: "nomineeWebsite", label: "Nominee website" },
          { key: "nomineeLinkedin", label: "Nominee LinkedIn" },
          { key: "executiveSummary", label: "Executive summary" },
          { key: "keyAchievements", label: "Key achievements" },
          { key: "alignmentStatement", label: "Alignment statement" },
          { key: "documents", label: "Documents" },
          { key: "videoLinks", label: "Video links" },
          { key: "paymentMethod", label: "Payment method" },
          { key: "billing", label: "Billing address" },
          { key: "paidAt", label: "Paid at" },
          { key: "paymentId", label: "Razorpay payment ID" },
          { key: "orderId", label: "Razorpay order ID" },
        ]}
        exportHref="/api/admin/award-nominations/export"
        extraExports={[
          { label: "Export PDF", href: "/api/admin/award-nominations/pdf" },
        ]}
        rowLinks={[
          { label: "Download PDF", href: "/api/admin/award-nominations/pdf?id={id}" },
        ]}
        onSetStatus={setAwardNominationStatus}
        onDelete={deleteAwardNomination}
      />
    </div>
  );
}

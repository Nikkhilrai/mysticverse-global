import { prisma } from "@/lib/db";
import { requirePermission } from "@/lib/auth-server";
import styles from "@/components/admin/panel.module.css";
import SubmissionTable from "@/components/admin/SubmissionTable";
import { setAwardStatus, deleteAward } from "./actions";

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

export default async function NominationsPage() {
  await requirePermission("nominations");
  const list = await prisma.awardSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  const nominations = list.filter((r) => r.kind === "NOMINATION").length;
  const juryEnquiries = list.length - nominations;

  const rows = list.map((r) => ({
    id: r.id,
    status: r.status,
    type: r.kind === "NOMINATION" ? "Nomination" : "Jury partner",
    nominee: r.nomineeName ?? "—",
    category: r.category ?? "—",
    name: r.name,
    email: r.email,
    campaign: [r.utmSource, r.utmMedium, r.utmCampaign].filter(Boolean).join(" / ") || "Direct",
    received: fmt(r.createdAt),
    nomineeOrg: r.nomineeOrg ?? "—",
    nomineeWebsite: r.nomineeWebsite ?? "—",
    relationship: r.relationship ?? "—",
    statement: r.statement ?? "—",
    phone: r.phone ?? "—",
    organisation: r.organisation ?? "—",
    role: r.role ?? "—",
    country: r.country ?? "—",
  }));

  return (
    <div>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Submissions</p>
        <h1 className={styles.h1}>Excellence Awards</h1>
        <p className={styles.sub}>
          Nominations and jury-partner enquiries from the Awards page.{" "}
          <strong>{nominations}</strong> nomination{nominations === 1 ? "" : "s"} ·{" "}
          <strong>{juryEnquiries}</strong> jury enquir
          {juryEnquiries === 1 ? "y" : "ies"}.
        </p>
      </header>

      <SubmissionTable
        rows={rows}
        columns={[
          { key: "type", label: "Type" },
          { key: "nominee", label: "Nominee" },
          { key: "category", label: "Category" },
          { key: "name", label: "Submitted by" },
          { key: "email", label: "Email" },
          { key: "received", label: "Received" },
        ]}
        detail={[
          { key: "campaign", label: "Campaign / source" },
          { key: "statement", label: "Statement" },
          { key: "nomineeOrg", label: "Nominee organisation" },
          { key: "nomineeWebsite", label: "Nominee website" },
          { key: "relationship", label: "Relationship" },
          { key: "phone", label: "Phone" },
          { key: "organisation", label: "Submitter organisation" },
          { key: "role", label: "Submitter role" },
          { key: "country", label: "Country" },
        ]}
        exportHref="/api/admin/nominations/export"
        onSetStatus={setAwardStatus}
        onDelete={deleteAward}
      />
    </div>
  );
}

import { prisma } from "@/lib/db";
import { requirePermission } from "@/lib/auth-server";
import styles from "@/components/admin/panel.module.css";
import SubmissionTable from "@/components/admin/SubmissionTable";
import { setInterestStatus, deleteInterest } from "./actions";

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

export default async function InterestPage() {
  await requirePermission("interest");
  const list = await prisma.interestSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  const popupLeads = list.filter((i) => i.source === "homepage-popup").length;

  const SOURCE_LABELS: Record<string, string> = {
    "homepage-popup": "Homepage popup",
    "register-page": "Register page",
    "corporate-page": "Corporate page",
  };

  const rows = list.map((i) => ({
    id: i.id,
    status: i.status,
    name: i.name,
    email: i.email,
    source: SOURCE_LABELS[i.source ?? "register-page"] ?? i.source ?? "Register page",
    pass: i.passType ?? "—",
    seats: i.seats ? String(i.seats) : "—",
    company: i.company ?? "—",
    campaign: [i.utmSource, i.utmMedium, i.utmCampaign].filter(Boolean).join(" / ") || "Direct",
    received: fmt(i.createdAt),
    phone: i.phone ?? "—",
    country: i.country ?? "—",
    message: i.message ?? "—",
  }));

  return (
    <div>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Submissions</p>
        <h1 className={styles.h1}>Delegate interest</h1>
        <p className={styles.sub}>
          Registrations of interest from the /register form and the homepage
          popup. <strong>{popupLeads}</strong> from the popup.
        </p>
      </header>

      <SubmissionTable
        rows={rows}
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "source", label: "Source" },
          { key: "pass", label: "Pass" },
          { key: "seats", label: "Seats" },
          { key: "company", label: "Organisation" },
          { key: "received", label: "Received" },
        ]}
        detail={[
          { key: "campaign", label: "Campaign / source" },
          { key: "phone", label: "Phone" },
          { key: "country", label: "Country" },
          { key: "message", label: "Message" },
        ]}
        exportHref="/api/admin/interest/export"
        onSetStatus={setInterestStatus}
        onDelete={deleteInterest}
      />
    </div>
  );
}

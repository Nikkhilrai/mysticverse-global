import { prisma } from "@/lib/db";
import styles from "@/components/admin/panel.module.css";
import SubmissionTable from "@/components/admin/SubmissionTable";
import { setPavilionBriefStatus, deletePavilionBrief } from "./actions";

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

export default async function PavilionBriefPage() {
  const list = await prisma.pavilionBriefRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  const rows = list.map((r) => ({
    id: r.id,
    status: r.status,
    name: r.name,
    email: r.email,
    company: r.company ?? "—",
    tier: r.tierInterest ?? "—",
    received: fmt(r.createdAt),
    role: r.role ?? "—",
    phone: r.phone ?? "—",
    country: r.country ?? "—",
    message: r.message ?? "—",
  }));

  return (
    <div>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Submissions</p>
        <h1 className={styles.h1}>Pavilion Brief requests</h1>
        <p className={styles.sub}>
          Partner enquiries from the “Request the Pavilion Brief” form on the
          Pavilion page.
        </p>
      </header>

      <SubmissionTable
        rows={rows}
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "company", label: "Company" },
          { key: "tier", label: "Interest" },
          { key: "received", label: "Received" },
        ]}
        detail={[
          { key: "role", label: "Role" },
          { key: "phone", label: "Phone" },
          { key: "country", label: "Country" },
          { key: "message", label: "Message" },
        ]}
        exportHref="/api/admin/pavilion-brief/export"
        onSetStatus={setPavilionBriefStatus}
        onDelete={deletePavilionBrief}
      />
    </div>
  );
}

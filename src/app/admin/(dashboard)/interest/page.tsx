import { prisma } from "@/lib/db";
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
  const list = await prisma.interestSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  const rows = list.map((i) => ({
    id: i.id,
    status: i.status,
    name: i.name,
    email: i.email,
    pass: i.passType ?? "—",
    company: i.company ?? "—",
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
        <p className={styles.sub}>Registrations of interest from the /register form.</p>
      </header>

      <SubmissionTable
        rows={rows}
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "pass", label: "Pass" },
          { key: "company", label: "Organisation" },
          { key: "received", label: "Received" },
        ]}
        detail={[
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

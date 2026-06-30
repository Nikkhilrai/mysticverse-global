import { prisma } from "@/lib/db";
import styles from "@/components/admin/panel.module.css";
import SubmissionTable from "@/components/admin/SubmissionTable";
import { setContactStatus, deleteContact } from "./actions";

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

export default async function ContactPage() {
  const list = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  const rows = list.map((c) => ({
    id: c.id,
    status: c.status,
    name: c.name,
    email: c.email,
    enquiry: c.enquiryType,
    received: fmt(c.createdAt),
    phone: c.phone ?? "—",
    country: c.country ?? "—",
    organisation: c.organisation ?? "—",
    message: c.message,
  }));

  return (
    <div>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Submissions</p>
        <h1 className={styles.h1}>Contact enquiries</h1>
        <p className={styles.sub}>Messages sent through the site contact form.</p>
      </header>

      <SubmissionTable
        rows={rows}
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "enquiry", label: "Enquiry" },
          { key: "received", label: "Received" },
        ]}
        detail={[
          { key: "phone", label: "Phone" },
          { key: "country", label: "Country" },
          { key: "organisation", label: "Organisation" },
          { key: "message", label: "Message" },
        ]}
        exportHref="/api/admin/contact/export"
        onSetStatus={setContactStatus}
        onDelete={deleteContact}
      />
    </div>
  );
}

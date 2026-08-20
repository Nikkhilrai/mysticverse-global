import { prisma } from "@/lib/db";
import { requirePermission } from "@/lib/auth-server";
import styles from "@/components/admin/panel.module.css";
import SubmissionTable from "@/components/admin/SubmissionTable";
import { setDeckStatus, deleteDeckRequest } from "./actions";

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

export default async function DecksPage() {
  await requirePermission("decks");
  const list = await prisma.deckRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Lead segmentation by which deck was requested.
  const bySegment = list.reduce<Record<string, number>>((acc, r) => {
    acc[r.deckId] = (acc[r.deckId] ?? 0) + 1;
    return acc;
  }, {});

  const rows = list.map((r) => ({
    id: r.id,
    status: r.status,
    requested: r.tierName ?? r.deckName,
    segment: r.deckId,
    name: r.name,
    email: r.email,
    organisation: r.organisation ?? "—",
    campaign: [r.utmSource, r.utmMedium, r.utmCampaign].filter(Boolean).join(" / ") || "Direct",
    received: fmt(r.createdAt),
    role: r.role ?? "—",
    country: r.country ?? "—",
    note: r.note ?? "—",
  }));

  return (
    <div>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Submissions</p>
        <h1 className={styles.h1}>Sponsorship deck requests</h1>
        <p className={styles.sub}>
          Deck and tier-brief requests from the Sponsor page, segmented by
          audience.{" "}
          {Object.entries(bySegment)
            .map(([k, v]) => `${k}: ${v}`)
            .join(" · ") || "No requests yet."}
        </p>
      </header>

      <SubmissionTable
        rows={rows}
        columns={[
          { key: "requested", label: "Requested" },
          { key: "segment", label: "Segment" },
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "organisation", label: "Organisation" },
          { key: "received", label: "Received" },
        ]}
        detail={[
          { key: "campaign", label: "Campaign / source" },
          { key: "role", label: "Role" },
          { key: "country", label: "Country" },
          { key: "note", label: "Note" },
        ]}
        exportHref="/api/admin/decks/export"
        onSetStatus={setDeckStatus}
        onDelete={deleteDeckRequest}
      />
    </div>
  );
}

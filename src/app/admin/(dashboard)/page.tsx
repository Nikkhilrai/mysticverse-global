import { prisma } from "@/lib/db";
import styles from "@/components/admin/panel.module.css";

export const dynamic = "force-dynamic";

function fmtDate(d: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export default async function DashboardHome() {
  const [
    contactTotal,
    contactNew,
    interestTotal,
    interestNew,
    briefTotal,
    briefNew,
    postsTotal,
    postsPublished,
    recentContacts,
    recentInterest,
    recentBriefs,
  ] = await Promise.all([
    prisma.contactSubmission.count(),
    prisma.contactSubmission.count({ where: { status: "NEW" } }),
    prisma.interestSubmission.count(),
    prisma.interestSubmission.count({ where: { status: "NEW" } }),
    prisma.pavilionBriefRequest.count(),
    prisma.pavilionBriefRequest.count({ where: { status: "NEW" } }),
    prisma.post.count(),
    prisma.post.count({ where: { status: "PUBLISHED" } }),
    prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.interestSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.pavilionBriefRequest.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const recent = [
    ...recentContacts.map((c) => ({
      kind: "Contact" as const,
      name: c.name,
      detail: c.enquiryType,
      status: c.status,
      createdAt: c.createdAt,
      href: "/admin/contact",
    })),
    ...recentInterest.map((i) => ({
      kind: "Interest" as const,
      name: i.name,
      detail: i.passType ?? "—",
      status: i.status,
      createdAt: i.createdAt,
      href: "/admin/interest",
    })),
    ...recentBriefs.map((b) => ({
      kind: "Pavilion Brief" as const,
      name: b.name,
      detail: b.tierInterest ?? "—",
      status: b.status,
      createdAt: b.createdAt,
      href: "/admin/pavilion-brief",
    })),
  ]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 8);

  const statusClass = (s: string) =>
    s === "NEW" ? styles.badgeNew : s === "READ" ? styles.badgeRead : styles.badgeArchived;

  return (
    <div>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Dashboard</p>
        <h1 className={styles.h1}>Overview</h1>
      </header>

      <div className={styles.statGrid}>
        <a className={styles.statCard} href="/admin/contact">
          <div className={styles.statTop}>
            <span className={styles.statValue}>{contactTotal}</span>
            {contactNew > 0 && <span className={styles.newBadge}>{contactNew} new</span>}
          </div>
          <span className={styles.statLabel}>Contact enquiries</span>
        </a>

        <a className={styles.statCard} href="/admin/interest">
          <div className={styles.statTop}>
            <span className={styles.statValue}>{interestTotal}</span>
            {interestNew > 0 && <span className={styles.newBadge}>{interestNew} new</span>}
          </div>
          <span className={styles.statLabel}>Delegate interest</span>
        </a>

        <a className={styles.statCard} href="/admin/pavilion-brief">
          <div className={styles.statTop}>
            <span className={styles.statValue}>{briefTotal}</span>
            {briefNew > 0 && <span className={styles.newBadge}>{briefNew} new</span>}
          </div>
          <span className={styles.statLabel}>Pavilion Brief requests</span>
        </a>

        <a className={styles.statCard} href="/admin/posts">
          <div className={styles.statTop}>
            <span className={styles.statValue}>{postsTotal}</span>
          </div>
          <span className={styles.statLabel}>Blog posts ({postsPublished} live)</span>
        </a>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Latest submissions</h2>
        <div className={styles.tableWrap}>
          {recent.length === 0 ? (
            <p className={styles.empty}>No submissions yet.</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Type</th>
                  <th className={styles.th}>Name</th>
                  <th className={styles.th}>Detail</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Received</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((r, i) => (
                  <tr key={i} className={styles.tr}>
                    <td className={styles.td}>
                      <a className={styles.link} href={r.href}>{r.kind}</a>
                    </td>
                    <td className={`${styles.td} ${styles.tdStrong}`}>{r.name}</td>
                    <td className={`${styles.td} ${styles.tdMuted}`}>{r.detail}</td>
                    <td className={styles.td}>
                      <span className={`${styles.badge} ${statusClass(r.status)}`}>{r.status}</span>
                    </td>
                    <td className={`${styles.td} ${styles.tdMuted}`}>{fmtDate(r.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}

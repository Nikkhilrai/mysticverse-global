import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth-server";
import { can } from "@/lib/permissions";
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
  const session = await requireSession();

  const showPasses = can(session, "passes");
  const showNominations = can(session, "nominations");
  const showDecks = can(session, "decks");
  const showContact = can(session, "contact");
  const showInterest = can(session, "interest");
  const showBrief = can(session, "pavilion-brief");
  const showPosts = can(session, "posts");

  const [
    passesTotal,
    passesPaid,
    passesRevenueAgg,
    contactTotal,
    contactNew,
    interestTotal,
    interestNew,
    briefTotal,
    briefNew,
    postsTotal,
    postsPublished,
    awardsTotal,
    awardsNew,
    recentAwards,
    decksTotal,
    decksNew,
    recentDecks,
    recentPasses,
    recentContacts,
    recentInterest,
    recentBriefs,
  ] = await Promise.all([
    showPasses ? prisma.passRegistration.count() : Promise.resolve(0),
    showPasses ? prisma.passRegistration.count({ where: { paymentStatus: "PAID" } }) : Promise.resolve(0),
    showPasses
      ? prisma.passRegistration.aggregate({ _sum: { amount: true }, where: { paymentStatus: "PAID" } })
      : Promise.resolve({ _sum: { amount: null as number | null } }),
    showContact ? prisma.contactSubmission.count() : Promise.resolve(0),
    showContact ? prisma.contactSubmission.count({ where: { status: "NEW" } }) : Promise.resolve(0),
    showInterest ? prisma.interestSubmission.count() : Promise.resolve(0),
    showInterest ? prisma.interestSubmission.count({ where: { status: "NEW" } }) : Promise.resolve(0),
    showBrief ? prisma.pavilionBriefRequest.count() : Promise.resolve(0),
    showBrief ? prisma.pavilionBriefRequest.count({ where: { status: "NEW" } }) : Promise.resolve(0),
    showPosts ? prisma.post.count() : Promise.resolve(0),
    showPosts ? prisma.post.count({ where: { status: "PUBLISHED" } }) : Promise.resolve(0),
    showNominations ? prisma.awardSubmission.count() : Promise.resolve(0),
    showNominations ? prisma.awardSubmission.count({ where: { status: "NEW" } }) : Promise.resolve(0),
    showNominations
      ? prisma.awardSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 5 })
      : Promise.resolve([]),
    showDecks ? prisma.deckRequest.count() : Promise.resolve(0),
    showDecks ? prisma.deckRequest.count({ where: { status: "NEW" } }) : Promise.resolve(0),
    showDecks ? prisma.deckRequest.findMany({ orderBy: { createdAt: "desc" }, take: 5 }) : Promise.resolve([]),
    showPasses ? prisma.passRegistration.findMany({ orderBy: { createdAt: "desc" }, take: 5 }) : Promise.resolve([]),
    showContact ? prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 5 }) : Promise.resolve([]),
    showInterest ? prisma.interestSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 5 }) : Promise.resolve([]),
    showBrief ? prisma.pavilionBriefRequest.findMany({ orderBy: { createdAt: "desc" }, take: 5 }) : Promise.resolve([]),
  ]);

  const paidRevenue = passesRevenueAgg._sum.amount ?? 0;

  const recent = [
    ...recentDecks.map((d) => ({
      kind: "Deck" as const,
      name: d.name,
      detail: d.tierName ?? d.deckName,
      status: d.status,
      createdAt: d.createdAt,
      href: "/admin/decks",
    })),
    ...recentAwards.map((a) => ({
      kind: "Awards" as const,
      name: a.name,
      detail:
        a.kind === "NOMINATION"
          ? `Nomination · ${a.nomineeName ?? "—"}`
          : "Jury partner enquiry",
      status: a.status,
      createdAt: a.createdAt,
      href: "/admin/nominations",
    })),
    ...recentPasses.map((p) => ({
      kind: "Pass" as const,
      name: p.name,
      detail: `${p.passType} · ${p.paymentStatus}`,
      status: p.status,
      createdAt: p.createdAt,
      href: "/admin/passes",
    })),
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
        {showPasses && (
          <a className={styles.statCard} href="/admin/passes">
            <div className={styles.statTop}>
              <span className={styles.statValue}>{passesTotal}</span>
              {passesPaid > 0 && <span className={styles.newBadge}>{passesPaid} paid</span>}
            </div>
            <span className={styles.statLabel}>
              Pass registrations · AED {(paidRevenue / 100).toLocaleString("en-AE")}
            </span>
          </a>
        )}

        {showDecks && (
          <a className={styles.statCard} href="/admin/decks">
            <div className={styles.statTop}>
              <span className={styles.statValue}>{decksTotal}</span>
              {decksNew > 0 && <span className={styles.newBadge}>{decksNew} new</span>}
            </div>
            <span className={styles.statLabel}>Deck requests</span>
          </a>
        )}

        {showNominations && (
          <a className={styles.statCard} href="/admin/nominations">
            <div className={styles.statTop}>
              <span className={styles.statValue}>{awardsTotal}</span>
              {awardsNew > 0 && <span className={styles.newBadge}>{awardsNew} new</span>}
            </div>
            <span className={styles.statLabel}>Award submissions</span>
          </a>
        )}

        {showContact && (
          <a className={styles.statCard} href="/admin/contact">
            <div className={styles.statTop}>
              <span className={styles.statValue}>{contactTotal}</span>
              {contactNew > 0 && <span className={styles.newBadge}>{contactNew} new</span>}
            </div>
            <span className={styles.statLabel}>Contact enquiries</span>
          </a>
        )}

        {showInterest && (
          <a className={styles.statCard} href="/admin/interest">
            <div className={styles.statTop}>
              <span className={styles.statValue}>{interestTotal}</span>
              {interestNew > 0 && <span className={styles.newBadge}>{interestNew} new</span>}
            </div>
            <span className={styles.statLabel}>Delegate interest</span>
          </a>
        )}

        {showBrief && (
          <a className={styles.statCard} href="/admin/pavilion-brief">
            <div className={styles.statTop}>
              <span className={styles.statValue}>{briefTotal}</span>
              {briefNew > 0 && <span className={styles.newBadge}>{briefNew} new</span>}
            </div>
            <span className={styles.statLabel}>Pavilion Brief requests</span>
          </a>
        )}

        {showPosts && (
          <a className={styles.statCard} href="/admin/posts">
            <div className={styles.statTop}>
              <span className={styles.statValue}>{postsTotal}</span>
            </div>
            <span className={styles.statLabel}>Blog posts ({postsPublished} live)</span>
          </a>
        )}
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

import { prisma } from "@/lib/db";
import styles from "@/components/admin/panel.module.css";
import { requirePermission } from "@/lib/auth-server";

export const dynamic = "force-dynamic";

function fmt(d: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

export default async function PostsPage() {
  await requirePermission("posts");
  const posts = await prisma.post.findMany({
    orderBy: { updatedAt: "desc" },
    include: { blogAuthor: true },
  });

  return (
    <div>
      <div className={styles.headerRow}>
        <div>
          <p className={styles.eyebrow}>Content</p>
          <h1 className={styles.h1}>Blog posts</h1>
        </div>
        <a className={styles.primaryBtn} href="/admin/posts/new">+ New post</a>
      </div>

      <div className={styles.tableWrap}>
        {posts.length === 0 ? (
          <p className={styles.empty}>No posts yet. Create your first story.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Title</th>
                <th className={styles.th}>Author</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Published</th>
                <th className={styles.th}>Updated</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className={styles.tr}>
                  <td className={`${styles.td} ${styles.tdStrong}`}>
                    <a className={styles.rowLink} href={`/admin/posts/${p.id}`}>{p.title}</a>
                  </td>
                  <td className={`${styles.td} ${styles.tdMuted}`}>{p.blogAuthor?.name ?? "—"}</td>
                  <td className={styles.td}>
                    <span className={`${styles.badge} ${p.status === "PUBLISHED" ? styles.badgePublished : styles.badgeDraft}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className={`${styles.td} ${styles.tdMuted}`}>
                    {p.publishedAt ? fmt(p.publishedAt) : "—"}
                  </td>
                  <td className={`${styles.td} ${styles.tdMuted}`}>{fmt(p.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

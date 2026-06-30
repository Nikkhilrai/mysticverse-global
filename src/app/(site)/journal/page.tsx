import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import styles from "./journal.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Journal | MysticVerse Global 2026",
  description:
    "Essays and dispatches on conscious luxury, wellness real estate, longevity, and human flourishing from MysticVerse Global.",
};

function fmt(d: Date | null) {
  if (!d) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export default async function JournalPage() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <main className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.eyebrow}>The Journal</p>
          <h1 className={styles.h1}>Conscious living, in writing.</h1>
          <p className={styles.sub}>
            Essays and dispatches on conscious luxury, wellness real estate,
            longevity, and human flourishing.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className={styles.empty}>No articles published yet — check back soon.</p>
        ) : (
          <div className={styles.grid}>
            {posts.map((p) => (
              <a key={p.id} href={`/journal/${p.slug}`} className={styles.card}>
                <div className={styles.cover}>
                  {p.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className={styles.coverImg} src={p.coverImage} alt={p.title} />
                  ) : (
                    <div className={styles.coverFallback} aria-hidden="true" />
                  )}
                </div>
                <div className={styles.body}>
                  <span className={styles.meta}>{fmt(p.publishedAt)}</span>
                  <h2 className={styles.cardTitle}>{p.title}</h2>
                  {p.excerpt && <p className={styles.excerpt}>{p.excerpt}</p>}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

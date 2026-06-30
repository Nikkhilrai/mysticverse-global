import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import styles from "./article.module.css";

export const dynamic = "force-dynamic";

function fmt(d: Date | null) {
  if (!d) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post || post.status !== "PUBLISHED") return { title: "Journal | MysticVerse Global" };
  return {
    title: `${post.title} | MysticVerse Global`,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: "article",
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post || post.status !== "PUBLISHED") notFound();

  return (
    <main className={styles.section}>
      <article className={styles.inner}>
        <a href="/journal" className={styles.back}>← The Journal</a>
        <p className={styles.meta}>{fmt(post.publishedAt)}</p>
        <h1 className={styles.title}>{post.title}</h1>

        {post.tags.length > 0 && (
          <div className={styles.tags}>
            {post.tags.map((t) => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
        )}

        {post.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={styles.cover} src={post.coverImage} alt={post.title} />
        )}

        <div
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}

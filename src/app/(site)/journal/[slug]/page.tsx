import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { SITE_URL } from "@/lib/site";
import AuthorByline from "@/components/journal/AuthorByline";
import ShareArticle from "@/components/journal/ShareArticle";
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
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { blogAuthor: true },
  });
  if (!post || post.status !== "PUBLISHED") return { title: "Blog | MysticVerse Global" };
  return {
    title: `${post.title} | MysticVerse Global`,
    description: post.excerpt ?? undefined,
    keywords: post.tags.length > 0 ? post.tags : undefined,
    authors: post.blogAuthor ? [{ name: post.blogAuthor.name }] : undefined,
    alternates: { canonical: `/journal/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: "article",
      authors: post.blogAuthor ? [post.blogAuthor.name] : undefined,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
      tags: post.tags.length > 0 ? post.tags : undefined,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { blogAuthor: true },
  });
  if (!post || post.status !== "PUBLISHED") notFound();

  const related = await prisma.post.findMany({
    where: { status: "PUBLISHED", slug: { not: slug } },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  return (
    <main className={styles.section}>
      <div className={styles.inner}>
        <a href="/journal" className={styles.back}>← Back to Blog</a>

        <article className={styles.frame}>
          <div className={styles.headWrap}>
            <p className={styles.meta}>
              {post.blogAuthor ? `By ${post.blogAuthor.name} · ` : ""}
              {fmt(post.publishedAt)}
            </p>
            <h1 className={styles.title}>{post.title}</h1>
          </div>

          {post.coverImage && (
            <div className={styles.cover}>
              <Image
                className={styles.coverImg}
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 800px) 100vw, 800px"
              />
            </div>
          )}

          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <ShareArticle url={`${SITE_URL}/journal/${post.slug}`} title={post.title} />

          {post.blogAuthor && <AuthorByline author={post.blogAuthor} />}
        </article>

        {related.length > 0 && (
          <section className={styles.related}>
            <p className={styles.relatedLabel}>Related Articles</p>
            <div className={styles.relatedGrid}>
              {related.map((r) => (
                <a key={r.id} href={`/journal/${r.slug}`} className={styles.relatedCard}>
                  <div className={styles.relatedCover}>
                    {r.coverImage ? (
                      <Image
                        className={styles.relatedCoverImg}
                        src={r.coverImage}
                        alt={r.title}
                        fill
                        sizes="(max-width: 720px) 100vw, 33vw"
                      />
                    ) : (
                      <div className={styles.relatedCoverFallback} aria-hidden="true" />
                    )}
                  </div>
                  <div className={styles.relatedBody}>
                    <p className={styles.relatedMeta}>{fmt(r.publishedAt)}</p>
                    <h3 className={styles.relatedTitle}>{r.title}</h3>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { SITE_URL } from "@/lib/site";
import { normalizeArticleHtml, readingMinutes } from "@/lib/articleHtml";
import AuthorByline from "@/components/journal/AuthorByline";
import ShareArticle from "@/components/journal/ShareArticle";
import ReadingProgress from "@/components/journal/ReadingProgress";
import CoverImage from "@/components/journal/CoverImage";
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

  const author = post.blogAuthor;
  const minutes = readingMinutes(post.content);

  return (
    <main className={styles.page}>
      <ReadingProgress targetId="article-body" />
      <div className={styles.glow} aria-hidden="true" />

      {/* ── Masthead ───────────────────────────────────────── */}
      <header className={styles.hero}>
        <a href="/journal" className={styles.back}>
          <span aria-hidden="true">←</span> Back to Blog
        </a>

        <div className={styles.kicker}>
          <span className={styles.kickerRule} aria-hidden="true" />
          <span>The Blog</span>
          <span className={styles.kickerRule} aria-hidden="true" />
        </div>

        <h1 className={styles.title}>{post.title}</h1>

        {post.excerpt && <p className={styles.dek}>{post.excerpt}</p>}

        <div className={styles.byline}>
          {author &&
            (author.image ? (
              <span className={styles.avatar}>
                <Image src={author.image} alt="" fill sizes="44px" className={styles.avatarImg} />
              </span>
            ) : (
              <span className={styles.avatarFallback} aria-hidden="true">
                {author.name.charAt(0).toUpperCase()}
              </span>
            ))}
          <div className={styles.bylineText}>
            {author && (
              <p className={styles.bylineName}>
                {author.name}
                {author.role && <span className={styles.bylineRole}> · {author.role}</span>}
              </p>
            )}
            <p className={styles.bylineMeta}>
              <time dateTime={post.publishedAt?.toISOString()}>{fmt(post.publishedAt)}</time>
              <span className={styles.dot} aria-hidden="true">·</span>
              {minutes} min read
            </p>
          </div>
        </div>
      </header>

      {post.coverImage && (
        <figure className={styles.cover}>
          <CoverImage
            src={post.coverImage}
            alt={post.title}
            priority
            sizes="(max-width: 1180px) 100vw, 1120px"
          />
        </figure>
      )}

      {/* ── Body ───────────────────────────────────────────── */}
      <article id="article-body" className={styles.article}>
        <div
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: normalizeArticleHtml(post.content) }}
        />

        <p className={styles.endmark} aria-hidden="true">✦ ✦ ✦</p>

        <ShareArticle url={`${SITE_URL}/journal/${post.slug}`} title={post.title} />

        {author && <AuthorByline author={author} />}
      </article>

      {/* ── Related ────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className={styles.related} aria-labelledby="related-heading">
          <div className={styles.relatedHead}>
            <span className={styles.kickerRule} aria-hidden="true" />
            <h2 id="related-heading" className={styles.relatedLabel}>Continue reading</h2>
            <span className={styles.kickerRule} aria-hidden="true" />
          </div>
          <div className={styles.relatedGrid}>
            {related.map((r) => (
              <a key={r.id} href={`/journal/${r.slug}`} className={styles.relatedCard}>
                <div className={styles.relatedCover}>
                  {r.coverImage ? (
                    <Image
                      className={styles.relatedCoverImg}
                      src={r.coverImage}
                      alt=""
                      fill
                      sizes="(max-width: 720px) 100vw, 360px"
                    />
                  ) : (
                    <div className={styles.relatedCoverFallback} aria-hidden="true" />
                  )}
                </div>
                <div className={styles.relatedBody}>
                  <p className={styles.relatedMeta}>
                    {fmt(r.publishedAt)} · {readingMinutes(r.content)} min read
                  </p>
                  <h3 className={styles.relatedTitle}>{r.title}</h3>
                  <span className={styles.relatedCta}>
                    Read article <span aria-hidden="true">→</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

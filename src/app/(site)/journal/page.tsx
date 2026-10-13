import type { Metadata } from "next";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { readingMinutes } from "@/lib/articleHtml";
import CoverImage from "@/components/journal/CoverImage";
import { isPressRelease } from "@/lib/postTags";
import styles from "./journal.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: "/journal" },
  title: "Blog | MysticVerse Global 2026",
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

  const [featured, ...rest] = posts;

  return (
    <main className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.head}>
          <div className={styles.eyebrowWrap}>
            <span className={styles.eyebrowRule} aria-hidden="true" />
            <p className={styles.eyebrow}>The Blog</p>
          </div>
          <h1 className={styles.h1}>
            Conscious living,{" "}
            <span className={`gradientTextInk ${styles.nowrap}`}>in writing.</span>
          </h1>
          <p className={styles.sub}>
            Essays and dispatches on conscious luxury, wellness real estate,
            longevity, and human flourishing.
          </p>
        </header>

        {!featured ? (
          <p className={styles.empty}>No articles published yet — check back soon.</p>
        ) : (
          <>
            {/* ── Latest article, given the stage ──────────── */}
            <a href={`/journal/${featured.slug}`} className={styles.featured}>
              <div className={styles.featuredCover}>
                {featured.coverImage ? (
                  <CoverImage
                    src={featured.coverImage}
                    alt=""
                    priority
                    sizes="(max-width: 900px) 100vw, 640px"
                    imageClassName={styles.featuredImg}
                  />
                ) : (
                  <div className={styles.coverFallback} aria-hidden="true" />
                )}
              </div>
              <div className={styles.featuredBody}>
                <span className={styles.badge}>Latest</span>
                <span className={styles.meta}>
                  {isPressRelease(featured.tags) && "Press Release · "}
                  {fmt(featured.publishedAt)} · {readingMinutes(featured.content)} min read
                </span>
                <h2 className={styles.featuredTitle}>{featured.title}</h2>
                {featured.excerpt && <p className={styles.featuredExcerpt}>{featured.excerpt}</p>}
                <span className={styles.cta}>
                  Read the article <span aria-hidden="true">→</span>
                </span>
              </div>
            </a>

            {rest.length > 0 && (
              <div className={styles.grid}>
                {rest.map((p) => (
                  <a key={p.id} href={`/journal/${p.slug}`} className={styles.card}>
                    <div className={styles.cover}>
                      {p.coverImage ? (
                        <Image
                          className={styles.coverImg}
                          src={p.coverImage}
                          alt=""
                          fill
                          sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        />
                      ) : (
                        <div className={styles.coverFallback} aria-hidden="true" />
                      )}
                    </div>
                    <div className={styles.body}>
                      <span className={styles.meta}>
                        {isPressRelease(p.tags) && "Press Release · "}
                        {fmt(p.publishedAt)} · {readingMinutes(p.content)} min read
                      </span>
                      <h2 className={styles.cardTitle}>{p.title}</h2>
                      {p.excerpt && <p className={styles.excerpt}>{p.excerpt}</p>}
                      <span className={styles.cta}>
                        Read <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

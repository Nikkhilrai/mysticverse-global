import { prisma } from "@/lib/db";
import JournalPreviewClient from "./JournalPreviewClient";

export default async function JournalPreview() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: 3,
    include: { blogAuthor: true },
  });

  if (posts.length === 0) return null;

  const articles = posts.map((p) => ({
    title: p.title,
    excerpt: p.excerpt ?? "",
    coverImage: p.coverImage,
    author: p.blogAuthor?.name ?? null,
    publishedAt: p.publishedAt,
    href: `/journal/${p.slug}`,
  }));

  return <JournalPreviewClient articles={articles} />;
}

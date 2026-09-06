import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import styles from "@/components/admin/panel.module.css";
import PostForm from "@/components/admin/PostForm";
import { requirePermission } from "@/lib/auth-server";
import { listAuthors } from "../author-actions";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requirePermission("posts");
  const { id } = await params;
  const [post, authors] = await Promise.all([
    prisma.post.findUnique({ where: { id } }),
    listAuthors(),
  ]);
  if (!post) notFound();

  return (
    <div>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Content · Editing</p>
        <h1 className={styles.h1}>Edit post</h1>
      </header>
      <PostForm
        authors={authors}
        initial={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? "",
          content: post.content,
          coverImage: post.coverImage ?? "",
          tags: post.tags,
          status: post.status,
          blogAuthorId: post.blogAuthorId ?? "",
          publishedAt: post.publishedAt ? post.publishedAt.toISOString().slice(0, 10) : "",
        }}
      />
    </div>
  );
}

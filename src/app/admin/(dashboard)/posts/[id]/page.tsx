import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import styles from "@/components/admin/panel.module.css";
import PostForm from "@/components/admin/PostForm";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Content · Editing</p>
        <h1 className={styles.h1}>Edit post</h1>
      </header>
      <PostForm
        initial={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? "",
          content: post.content,
          coverImage: post.coverImage ?? "",
          tags: post.tags,
          status: post.status,
        }}
      />
    </div>
  );
}

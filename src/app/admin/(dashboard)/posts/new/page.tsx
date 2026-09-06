import styles from "@/components/admin/panel.module.css";
import PostForm from "@/components/admin/PostForm";
import { requirePermission } from "@/lib/auth-server";
import { listAuthors } from "../author-actions";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  await requirePermission("posts");
  const authors = await listAuthors();

  return (
    <div>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Content</p>
        <h1 className={styles.h1}>New post</h1>
      </header>
      <PostForm
        authors={authors}
        initial={{
          title: "",
          slug: "",
          excerpt: "",
          content: "",
          coverImage: "",
          tags: [],
          status: "DRAFT",
          blogAuthorId: "",
        }}
      />
    </div>
  );
}

import styles from "@/components/admin/panel.module.css";
import PostForm from "@/components/admin/PostForm";

export const dynamic = "force-dynamic";

export default function NewPostPage() {
  return (
    <div>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Content</p>
        <h1 className={styles.h1}>New post</h1>
      </header>
      <PostForm
        initial={{
          title: "",
          slug: "",
          excerpt: "",
          content: "",
          coverImage: "",
          tags: [],
          status: "DRAFT",
        }}
      />
    </div>
  );
}

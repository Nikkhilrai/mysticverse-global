"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "./RichTextEditor";
import { savePost, deletePost, type PostInput } from "@/app/admin/(dashboard)/posts/actions";
import styles from "./PostForm.module.css";

interface Initial {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  status: "DRAFT" | "PUBLISHED";
}

/* Opens a file picker, uploads to /api/admin/upload, returns the URL. */
async function pickAndUpload(): Promise<string | null> {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return resolve(null);
      const fd = new FormData();
      fd.append("file", file);
      try {
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          alert(data.error ?? "Upload failed.");
          return resolve(null);
        }
        resolve(data.url as string);
      } catch {
        alert("Upload failed.");
        resolve(null);
      }
    };
    input.click();
  });
}

export default function PostForm({ initial }: { initial: Initial }) {
  const router = useRouter();
  const [title, setTitle] = useState(initial.title);
  const [slug, setSlug] = useState(initial.slug);
  const [slugEdited, setSlugEdited] = useState(Boolean(initial.slug));
  const [excerpt, setExcerpt] = useState(initial.excerpt);
  const [content, setContent] = useState(initial.content);
  const [coverImage, setCoverImage] = useState(initial.coverImage);
  const [tags, setTags] = useState(initial.tags.join(", "));
  const [saving, setSaving] = useState<"" | "draft" | "publish">("");
  const [error, setError] = useState<string | null>(null);

  const onTitle = (v: string) => {
    setTitle(v);
    if (!slugEdited) {
      setSlug(
        v.toLowerCase().trim().replace(/['"]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80),
      );
    }
  };

  const submit = async (status: "DRAFT" | "PUBLISHED") => {
    setError(null);
    if (!title.trim()) {
      setError("A title is required.");
      return;
    }
    setSaving(status === "PUBLISHED" ? "publish" : "draft");
    const input: PostInput = {
      id: initial.id,
      title,
      slug,
      excerpt,
      content,
      coverImage,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      status,
    };
    try {
      await savePost(input);
      router.push("/admin/posts");
      router.refresh();
    } catch {
      setError("Couldn't save. Please try again.");
      setSaving("");
    }
  };

  const remove = async () => {
    if (!initial.id) return;
    if (!confirm("Delete this post permanently?")) return;
    await deletePost(initial.id);
    router.push("/admin/posts");
    router.refresh();
  };

  const setCover = async () => {
    const url = await pickAndUpload();
    if (url) setCoverImage(url);
  };

  return (
    <div className={styles.layout}>
      <div className={styles.main}>
        <input
          className={styles.titleInput}
          value={title}
          onChange={(e) => onTitle(e.target.value)}
          placeholder="Post title"
        />
        <RichTextEditor value={content} onChange={setContent} onUpload={pickAndUpload} />
      </div>

      <aside className={styles.side}>
        <div className={styles.panel}>
          <div className={styles.actionsTop}>
            <button type="button" className={styles.draftBtn} onClick={() => submit("DRAFT")} disabled={Boolean(saving)}>
              {saving === "draft" ? "Saving…" : "Save draft"}
            </button>
            <button type="button" className={styles.publishBtn} onClick={() => submit("PUBLISHED")} disabled={Boolean(saving)}>
              {saving === "publish" ? "Publishing…" : initial.status === "PUBLISHED" ? "Update" : "Publish"}
            </button>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          {initial.id && (
            <button type="button" className={styles.deleteLink} onClick={remove}>Delete post</button>
          )}
        </div>

        <div className={styles.panel}>
          <label className={styles.label} htmlFor="slug">Slug</label>
          <input id="slug" className={styles.input} value={slug} onChange={(e) => { setSlug(e.target.value); setSlugEdited(true); }} placeholder="post-url-slug" />
          <p className={styles.hint}>/journal/{slug || "…"}</p>

          <label className={styles.label} htmlFor="excerpt">Excerpt</label>
          <textarea id="excerpt" className={styles.textarea} rows={3} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short summary shown in listings" />

          <label className={styles.label} htmlFor="tags">Tags</label>
          <input id="tags" className={styles.input} value={tags} onChange={(e) => setTags(e.target.value)} placeholder="wellness, longevity" />

          <label className={styles.label}>Cover image</label>
          {coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className={styles.cover} src={coverImage} alt="Cover" />
          ) : (
            <div className={styles.coverEmpty}>No cover</div>
          )}
          <div className={styles.coverActions}>
            <button type="button" className={styles.smallBtn} onClick={setCover}>Upload</button>
            {coverImage && <button type="button" className={styles.smallBtn} onClick={() => setCoverImage("")}>Remove</button>}
          </div>
          <input className={styles.input} value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="…or paste image URL" />
        </div>
      </aside>
    </div>
  );
}

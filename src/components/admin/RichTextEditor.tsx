"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useState } from "react";
import styles from "./RichTextEditor.module.css";

function Toolbar({ editor, onUpload }: { editor: Editor; onUpload?: () => Promise<string | null> }) {
  const [, force] = useState(0);
  useEffect(() => {
    const cb = () => force((x) => x + 1);
    editor.on("transaction", cb);
    editor.on("selectionUpdate", cb);
    return () => {
      editor.off("transaction", cb);
      editor.off("selectionUpdate", cb);
    };
  }, [editor]);

  const btn = (active: boolean) => `${styles.tBtn}${active ? ` ${styles.tActive}` : ""}`;

  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addImage = async () => {
    let url: string | null = null;
    if (onUpload) {
      url = await onUpload();
    }
    if (!url) {
      url = window.prompt("Image URL", "https://");
    }
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className={styles.toolbar}>
      <button type="button" className={btn(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold"><b>B</b></button>
      <button type="button" className={btn(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic"><i>I</i></button>
      <button type="button" className={btn(editor.isActive("underline"))} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline"><u>U</u></button>
      <span className={styles.sep} />
      <button type="button" className={btn(editor.isActive("heading", { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="Heading 2">H2</button>
      <button type="button" className={btn(editor.isActive("heading", { level: 3 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} title="Heading 3">H3</button>
      <span className={styles.sep} />
      <button type="button" className={btn(editor.isActive("bulletList"))} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet list">• List</button>
      <button type="button" className={btn(editor.isActive("orderedList"))} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered list">1. List</button>
      <button type="button" className={btn(editor.isActive("blockquote"))} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Quote">&ldquo; &rdquo;</button>
      <span className={styles.sep} />
      <button type="button" className={btn(editor.isActive("link"))} onClick={setLink} title="Link">Link</button>
      <button type="button" className={styles.tBtn} onClick={addImage} title="Image">Image</button>
      <span className={styles.sep} />
      <button type="button" className={styles.tBtn} onClick={() => editor.chain().focus().undo().run()} title="Undo">↶</button>
      <button type="button" className={styles.tBtn} onClick={() => editor.chain().focus().redo().run()} title="Redo">↷</button>
    </div>
  );
}

export default function RichTextEditor({
  value,
  onChange,
  onUpload,
}: {
  value: string;
  onChange: (html: string) => void;
  onUpload?: () => Promise<string | null>;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: {
          openOnClick: false,
          HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
        },
      }),
      Image,
      Placeholder.configure({ placeholder: "Write your story…" }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: { attributes: { class: styles.editor } },
  });

  if (!editor) return <div className={styles.loading}>Loading editor…</div>;

  return (
    <div className={styles.wrap}>
      <Toolbar editor={editor} onUpload={onUpload} />
      <EditorContent editor={editor} />
    </div>
  );
}

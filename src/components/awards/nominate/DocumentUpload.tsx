"use client";

import { useRef, useState } from "react";
import { uploadNominationDocument, type UploadedDocument } from "@/lib/nomination-upload";
import styles from "./NominationForm.module.css";

interface FileRow {
  key: string;
  name: string;
  status: "uploading" | "done" | "error";
  error?: string;
  document?: UploadedDocument;
}

export default function DocumentUpload({
  onChange,
}: {
  onChange: (documents: UploadedDocument[]) => void;
}) {
  const [rows, setRows] = useState<FileRow[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const syncDocuments = (next: FileRow[]) => {
    onChange(next.filter((r) => r.status === "done" && r.document).map((r) => r.document!));
  };

  const handleFiles = async (files: FileList) => {
    const newRows: FileRow[] = Array.from(files).map((f) => ({
      key: `${f.name}-${f.size}-${Date.now()}-${Math.random()}`,
      name: f.name,
      status: "uploading",
    }));
    setRows((prev) => [...prev, ...newRows]);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const row = newRows[i];
      const result = await uploadNominationDocument(file);
      setRows((prev) => {
        const next = prev.map((r) =>
          r.key === row.key
            ? result.ok
              ? { ...r, status: "done" as const, document: result.document }
              : { ...r, status: "error" as const, error: result.error }
            : r,
        );
        syncDocuments(next);
        return next;
      });
    }
  };

  const remove = (key: string) => {
    setRows((prev) => {
      const next = prev.filter((r) => r.key !== key);
      syncDocuments(next);
      return next;
    });
  };

  return (
    <div className={styles.field}>
      <label className={styles.label}>
        Supporting Documentation <span className={styles.optional}>(PDF, DOCX, PPTX — up to 25MB each, optional)</span>
      </label>

      <div
        className={styles.dropZone}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }}
      >
        <span className={styles.dropZoneLabel}>Click to attach files</span>
        <span className={styles.dropZoneHint}>Presentation decks, brochures, corporate profiles, research papers, press coverage</span>
      </div>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.ppt,.pptx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) handleFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {rows.length > 0 && (
        <div className={styles.fileList}>
          {rows.map((r) => (
            <div key={r.key} className={`${styles.fileItem}${r.status === "error" ? ` ${styles.fileItemError}` : ""}`}>
              <span className={styles.fileName}>
                {r.name} — {r.status === "uploading" ? "Uploading…" : r.status === "error" ? r.error : "Uploaded"}
              </span>
              <button type="button" className={styles.fileRemove} onClick={() => remove(r.key)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

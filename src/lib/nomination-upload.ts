/*
  Uploads a nomination supporting document straight from the browser to
  Cloudinary, bypassing our own serverless functions entirely (Vercel
  Functions cap request bodies at 4.5MB — well under the 25MB limit
  here). We only ever mint a signature server-side; the file bytes
  travel browser → Cloudinary directly.
*/

const MAX_SIZE = 25 * 1024 * 1024; // 25MB
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
  "application/msword", // legacy .doc
  "application/vnd.ms-powerpoint", // legacy .ppt
]);

export interface UploadedDocument {
  url: string;
  name: string;
  sizeBytes: number;
  format: string;
}

export type UploadResult =
  | { ok: true; document: UploadedDocument }
  | { ok: false; error: string };

export async function uploadNominationDocument(file: File): Promise<UploadResult> {
  if (!ALLOWED_TYPES.has(file.type)) {
    return { ok: false, error: "Only PDF, DOC, DOCX, PPT, or PPTX files are allowed." };
  }
  if (file.size > MAX_SIZE) {
    return { ok: false, error: "File must be 25MB or under." };
  }

  const sigRes = await fetch("/api/award-nomination/upload-signature", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename: file.name, contentType: file.type, sizeBytes: file.size }),
  });
  const sig = await sigRes.json().catch(() => ({}));
  if (!sigRes.ok || !sig.ok) {
    return { ok: false, error: sig.error ?? "Couldn't prepare the upload. Please try again." };
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", sig.apiKey);
  formData.append("timestamp", String(sig.timestamp));
  formData.append("signature", sig.signature);
  formData.append("upload_preset", sig.uploadPreset);
  formData.append("folder", sig.folder);

  try {
    const uploadRes = await fetch(sig.uploadUrl, { method: "POST", body: formData });
    const result = await uploadRes.json().catch(() => ({}));
    if (!uploadRes.ok || !result.secure_url) {
      return { ok: false, error: "Upload failed. Please try again." };
    }
    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
    return {
      ok: true,
      document: {
        url: result.secure_url,
        name: file.name,
        sizeBytes: file.size,
        format: String(result.format || extension || "file").slice(0, 20),
      },
    };
  } catch {
    return { ok: false, error: "Upload failed. Please check your connection and try again." };
  }
}

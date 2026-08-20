/** Opens a file picker, uploads to /api/admin/upload, returns the URL. */
export async function pickAndUpload(): Promise<string | null> {
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

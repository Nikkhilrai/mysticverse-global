import { put } from "@vercel/blob";
import { getSession } from "@/lib/auth-server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!(await getSession())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json(
      { error: "Image upload isn't configured yet (missing BLOB_READ_WRITE_TOKEN). Paste an image URL instead." },
      { status: 400 },
    );
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "No file provided." }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return Response.json({ error: "Only image files are allowed." }, { status: 400 });
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-");
  const blob = await put(`blog/${Date.now()}-${safeName}`, file, {
    access: "public",
  });
  return Response.json({ url: blob.url });
}

import { v2 as cloudinary } from "cloudinary";
import { getSession } from "@/lib/auth-server";
import { can } from "@/lib/permissions";

export const runtime = "nodejs";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  // Blog cover images + author photos — the only current uploaders.
  if (!can(session, "posts")) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return Response.json(
      { error: "Image upload isn't configured yet (missing Cloudinary credentials). Paste an image URL instead." },
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
  if (file.size > MAX_SIZE) {
    return Response.json({ error: "File too large. Maximum size: 5MB." }, { status: 400 });
  }

  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const dataUri = `data:${file.type};base64,${buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "mysticverse/blog",
      resource_type: "image",
      // Auto-optimize once at upload time: right format (WebP/AVIF where
      // supported) and quality for the source, rather than shipping the
      // original file weight to every visitor.
      transformation: [{ quality: "auto:good" }, { fetch_format: "auto" }],
    });

    return Response.json({ url: result.secure_url });
  } catch (err) {
    console.error("[upload] Cloudinary upload failed:", err);
    return Response.json({ error: "Upload failed. Please try again." }, { status: 500 });
  }
}

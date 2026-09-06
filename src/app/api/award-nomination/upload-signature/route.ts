import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { AwardNominationUploadSignatureSchema } from "@/lib/validation";

export const runtime = "nodejs";

const UPLOAD_PRESET = "mvg_nomination_docs";
const FOLDER = "mysticverse/nominations";

/*
  Mints a short-lived signature so the browser can upload supporting
  documents straight to Cloudinary — never through this (or any) of our
  own serverless functions. Vercel Functions cap request bodies at
  4.5MB, well under the 25MB nomination-document limit, so proxying
  file bytes through a route here would silently fail for any real
  pitch deck. This route only ever handles a few hundred bytes of JSON.
*/
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = AwardNominationUploadSignatureSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid file." },
      { status: 422 },
    );
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { ok: false, configured: false, error: "File upload isn't configured yet. You can add links to your materials instead." },
      { status: 400 },
    );
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, upload_preset: UPLOAD_PRESET, folder: FOLDER },
    apiSecret,
  );

  return NextResponse.json({
    ok: true,
    cloudName,
    apiKey,
    timestamp,
    signature,
    uploadPreset: UPLOAD_PRESET,
    folder: FOLDER,
    uploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
  });
}

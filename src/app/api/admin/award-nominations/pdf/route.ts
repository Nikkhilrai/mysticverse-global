import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth-server";
import { can } from "@/lib/permissions";
import { buildNominationsPdf, type NominationForPdf } from "@/lib/nomination-pdf";

export const runtime = "nodejs";

/** Filename-safe slug for the Content-Disposition header. */
function slug(s: string): string {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "application"
  );
}

/*
  Award application PDFs — same auth pattern as the CSV export.
  `?id=` returns a single application's dossier; without it, every
  application is rendered one per page.
*/
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });
  if (!can(session, "award-nominations")) return new Response("Forbidden", { status: 403 });

  const id = req.nextUrl.searchParams.get("id");

  const rows = id
    ? await prisma.awardNomination.findMany({ where: { id } })
    : await prisma.awardNomination.findMany({ orderBy: { createdAt: "desc" } });

  if (id && rows.length === 0) {
    return new Response("Not found", { status: 404 });
  }

  const pdf = await buildNominationsPdf(rows as unknown as NominationForPdf[]);

  const filename =
    id && rows[0]
      ? `award-application-${slug(rows[0].nomineeName || rows[0].nominatorName)}.pdf`
      : "award-applications.pdf";

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

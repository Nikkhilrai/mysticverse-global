import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth-server";
import { can } from "@/lib/permissions";
import { toCsv } from "@/lib/csv";

export const runtime = "nodejs";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (!can(session, "interest")) {
    return new Response("Forbidden", { status: 403 });
  }
  const rows = await prisma.interestSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });
  const SOURCE_LABELS: Record<string, string> = {
    "homepage-popup": "Homepage popup",
    "register-page": "Register page",
    "corporate-page": "Corporate page",
  };
  const csv = toCsv(
    ["Date", "Source", "Name", "Email", "Phone", "Country", "Pass type", "Seats", "Company", "Status", "Message", "UTM Source", "UTM Medium", "UTM Campaign",],
    rows.map((r) => [
      r.createdAt,
      SOURCE_LABELS[r.source ?? "register-page"] ?? r.source ?? "Register page",
      r.name,
      r.email,
      r.phone,
      r.country,
      r.passType,
      r.seats,
      r.company,
      r.status,
      r.message,
      r.utmSource,
      r.utmMedium,
      r.utmCampaign,
    ]),
  );
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="delegate-interest.csv"`,
    },
  });
}

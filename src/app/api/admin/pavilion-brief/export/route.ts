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
  if (!can(session, "pavilion-brief")) {
    return new Response("Forbidden", { status: 403 });
  }
  const rows = await prisma.pavilionBriefRequest.findMany({
    orderBy: { createdAt: "desc" },
  });
  const csv = toCsv(
    ["Date", "Name", "Email", "Company", "Role", "Phone", "Country", "Interest", "Status", "Message", "UTM Source", "UTM Medium", "UTM Campaign",],
    rows.map((r) => [
      r.createdAt,
      r.name,
      r.email,
      r.company,
      r.role,
      r.phone,
      r.country,
      r.tierInterest,
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
      "Content-Disposition": `attachment; filename="pavilion-brief-requests.csv"`,
    },
  });
}

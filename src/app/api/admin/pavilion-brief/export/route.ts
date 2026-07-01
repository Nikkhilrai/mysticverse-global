import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth-server";
import { toCsv } from "@/lib/csv";

export const runtime = "nodejs";

export async function GET() {
  if (!(await getSession())) {
    return new Response("Unauthorized", { status: 401 });
  }
  const rows = await prisma.pavilionBriefRequest.findMany({
    orderBy: { createdAt: "desc" },
  });
  const csv = toCsv(
    ["Date", "Name", "Email", "Company", "Role", "Phone", "Country", "Interest", "Status", "Message"],
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
    ]),
  );
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="pavilion-brief-requests.csv"`,
    },
  });
}

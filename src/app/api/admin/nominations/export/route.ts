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
  if (!can(session, "nominations")) {
    return new Response("Forbidden", { status: 403 });
  }
  const rows = await prisma.awardSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });
  const csv = toCsv(
    [
      "Date",
      "Type",
      "Award Category",
      "Nominee",
      "Nominee Organisation",
      "Nominee Website",
      "Relationship",
      "Statement",
      "Submitted By",
      "Email",
      "Phone",
      "Organisation",
      "Role",
      "Country",
      "Status",
     "UTM Source", "UTM Medium", "UTM Campaign",],
    rows.map((r) => [
      r.createdAt,
      r.kind === "NOMINATION" ? "Nomination" : "Jury partner",
      r.category,
      r.nomineeName,
      r.nomineeOrg,
      r.nomineeWebsite,
      r.relationship,
      r.statement,
      r.name,
      r.email,
      r.phone,
      r.organisation,
      r.role,
      r.country,
      r.status,
      r.utmSource,
      r.utmMedium,
      r.utmCampaign,
    ]),
  );
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="award-submissions.csv"`,
    },
  });
}

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
  if (!can(session, "contact")) {
    return new Response("Forbidden", { status: 403 });
  }
  const rows = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });
  const csv = toCsv(
    ["Date", "Name", "Email", "Phone", "Country", "Organisation", "Enquiry", "Status", "Message", "UTM Source", "UTM Medium", "UTM Campaign",],
    rows.map((r) => [
      r.createdAt,
      r.name,
      r.email,
      r.phone,
      r.country,
      r.organisation,
      r.enquiryType,
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
      "Content-Disposition": `attachment; filename="contact-submissions.csv"`,
    },
  });
}

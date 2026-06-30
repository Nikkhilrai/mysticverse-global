import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth-server";
import { toCsv } from "@/lib/csv";

export const runtime = "nodejs";

export async function GET() {
  if (!(await getSession())) {
    return new Response("Unauthorized", { status: 401 });
  }
  const rows = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });
  const csv = toCsv(
    ["Date", "Name", "Email", "Phone", "Country", "Organisation", "Enquiry", "Status", "Message"],
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
    ]),
  );
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="contact-submissions.csv"`,
    },
  });
}

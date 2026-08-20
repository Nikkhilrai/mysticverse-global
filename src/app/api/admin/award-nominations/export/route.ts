import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth-server";
import { can } from "@/lib/permissions";
import { toCsv } from "@/lib/csv";

export const runtime = "nodejs";

interface DocumentEntry {
  url: string;
  name?: string;
}

function formatDocuments(json: unknown): string {
  if (!Array.isArray(json) || json.length === 0) return "";
  return (json as DocumentEntry[]).map((d) => `${d.name ?? "file"} (${d.url})`).join(" | ");
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (!can(session, "award-nominations")) {
    return new Response("Forbidden", { status: 403 });
  }
  const rows = await prisma.awardNomination.findMany({
    orderBy: { createdAt: "desc" },
  });
  const csv = toCsv(
    [
      "Date",
      "Nominator",
      "Nominator Email",
      "Nominator Phone",
      "Nominator Organisation",
      "Nomination Type",
      "Categories",
      "Nominee",
      "Nominee Email",
      "Nominee Website",
      "Amount",
      "Currency",
      "Payment",
      "Payment Method",
      "Paid At",
      "Razorpay Payment ID",
      "Razorpay Order ID",
      "Documents",
      "Video Links",
      "Lead Status",
      "UTM Source",
      "UTM Medium",
      "UTM Campaign",
    ],
    rows.map((r) => [
      r.createdAt,
      r.nominatorName,
      r.nominatorEmail,
      r.nominatorPhone,
      r.nominatorOrganisation,
      r.nominationType,
      r.categories.join("; "),
      r.nomineeName,
      r.nomineeEmail,
      r.nomineeWebsite,
      (r.amount / 100).toString(),
      r.currency,
      r.paymentStatus,
      r.paymentMethodPreference,
      r.paidAt,
      r.razorpayPaymentId,
      r.razorpayOrderId,
      formatDocuments(r.documents),
      r.videoLinks.join("; "),
      r.status,
      r.utmSource,
      r.utmMedium,
      r.utmCampaign,
    ]),
  );
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="award-nominations.csv"`,
    },
  });
}

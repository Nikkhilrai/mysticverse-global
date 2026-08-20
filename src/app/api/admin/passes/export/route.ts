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
  if (!can(session, "passes")) {
    return new Response("Forbidden", { status: 403 });
  }
  const rows = await prisma.passRegistration.findMany({
    orderBy: { createdAt: "desc" },
  });
  const csv = toCsv(
    [
      "Date",
      "Name",
      "Email",
      "Phone",
      "Country",
      "Organisation",
      "Pass",
      "Seats",
      "Amount",
      "Currency",
      "Payment",
      "Paid At",
      "Razorpay Payment ID",
      "Razorpay Order ID",
      "Lead Status",
     "UTM Source", "UTM Medium", "UTM Campaign", "Coupon Code", "Coupon Discount %",],
    rows.map((r) => [
      r.createdAt,
      r.name,
      r.email,
      r.phone,
      r.country,
      r.company,
      r.passType,
      r.seats,
      (r.amount / 100).toString(),
      r.currency,
      r.paymentStatus,
      r.paidAt,
      r.razorpayPaymentId,
      r.razorpayOrderId,
      r.status,
      r.utmSource,
      r.utmMedium,
      r.utmCampaign,
      r.couponCode,
      r.couponDiscountPct,
    ]),
  );
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="pass-registrations.csv"`,
    },
  });
}

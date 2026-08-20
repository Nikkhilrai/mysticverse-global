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
  if (!can(session, "decks")) {
    return new Response("Forbidden", { status: 403 });
  }
  const rows = await prisma.deckRequest.findMany({
    orderBy: { createdAt: "desc" },
  });
  const csv = toCsv(
    [
      "Date",
      "Requested",
      "Segment",
      "Tier",
      "Name",
      "Email",
      "Organisation",
      "Role",
      "Country",
      "Note",
      "Status",
     "UTM Source", "UTM Medium", "UTM Campaign",],
    rows.map((r) => [
      r.createdAt,
      r.tierName ?? r.deckName,
      r.deckId,
      r.tierName,
      r.name,
      r.email,
      r.organisation,
      r.role,
      r.country,
      r.note,
      r.status,
      r.utmSource,
      r.utmMedium,
      r.utmCampaign,
    ]),
  );
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="deck-requests.csv"`,
    },
  });
}

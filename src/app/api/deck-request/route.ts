import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { DeckRequestSchema } from "@/lib/validation";
import { notifyAfter, rowsToHtml } from "@/lib/email";
import { after } from "next/server";
import { sendStep } from "@/lib/nurture";

export const runtime = "nodejs";

/*
  Sponsorship deck + tier-brief requests from /sponsor.

  `deckId` segments the lead by audience — the three audience decks
  ("conscious-luxury-living" | "workplace-wellness-hr" |
  "longevity-lifestyle") or "tier-brief" when the request came from a
  specific tier panel (in which case `tierName` carries the tier).

  NOTE: the deck PDFs are not attached yet — no files exist to send.
  The lead is captured and the team notified; attach the PDFs to the
  confirmation email once the decks are supplied.
*/
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — silently accept bot submissions.
  if (typeof body.hp === "string" && body.hp.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const parsed = DeckRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form and try again." },
      { status: 422 },
    );
  }
  const d = parsed.data;

  const ipAddress =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const userAgent = req.headers.get("user-agent") ?? null;
  let created: { id: string };

  try {
    created = await prisma.deckRequest.create({
      data: {
        deckId: d.deckId,
        deckName: d.deckName,
        tierName: d.tierName ?? null,
        name: d.name,
        email: d.email,
        organisation: d.organisation ?? null,
        role: d.role ?? null,
        country: d.country ?? null,
        note: d.note ?? null,
        utmSource: d.utmSource ?? null,
        utmMedium: d.utmMedium ?? null,
        utmCampaign: d.utmCampaign ?? null,
        ipAddress,
        userAgent,
      },
    });
  } catch (err) {
    console.error("[deck-request] db write failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  notifyAfter(
    d.tierName
      ? `Tier brief requested — ${d.tierName}`
      : `Sponsorship deck requested — ${d.deckName}`,
    rowsToHtml(
      d.tierName ? "Tier Brief Request" : "Sponsorship Deck Request",
      [
        ["Requested", d.tierName ?? d.deckName],
        ["Segment", d.deckId],
        ["Name", d.name],
        ["Email", d.email],
        ["Organisation", d.organisation],
        ["Role", d.role],
        ["Country", d.country],
        ["Note", d.note],
      ],
    ),
  );

  // Welcome email to the lead (step 0), sent after the response.
  after(() =>
    sendStep({
      sequence: "sponsor",
      step: 0,
      leadId: created.id,
      leadType: "deck",
      email: d.email,
      name: d.name,
    }),
  );


  return NextResponse.json({ ok: true });
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendStep } from "@/lib/nurture";
import { SEQUENCES, type SequenceId } from "@/lib/sequences";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/*
  Daily nurture runner (Vercel Cron, see vercel.json).

  For each sequence, finds leads whose createdAt is older than the step's
  `afterDays` and sends any step they haven't received. `sendStep` is
  idempotent, so a double-fired cron is harmless.

  Auth: Vercel Cron sends `Authorization: Bearer $CRON_SECRET`. Requests
  without it are rejected so the endpoint can't be triggered publicly.
*/
function authorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

/** Leads older than `days`, capped so one run can't blow the time limit. */
function cutoff(days: number): Date {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

const TAKE = 200;

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const tally = { sent: 0, skipped: 0, failed: 0 };

  const run = async (
    sequence: SequenceId,
    leadType: string,
    load: (before: Date) => Promise<Array<{ id: string; email: string; name: string }>>,
  ) => {
    for (const def of SEQUENCES[sequence]) {
      if (def.afterDays === 0) continue; // step 0 is sent inline on submit
      const leads = await load(cutoff(def.afterDays));
      for (const lead of leads) {
        const r = await sendStep({
          sequence,
          step: def.step,
          leadId: lead.id,
          leadType,
          email: lead.email,
          name: lead.name,
        });
        tally[r] += 1;
      }
    }
  };

  try {
    await run("delegate", "interest", (before) =>
      prisma.interestSubmission.findMany({
        where: { createdAt: { lte: before } },
        select: { id: true, email: true, name: true },
        orderBy: { createdAt: "desc" },
        take: TAKE,
      }),
    );

    await run("sponsor", "deck", (before) =>
      prisma.deckRequest.findMany({
        where: { createdAt: { lte: before } },
        select: { id: true, email: true, name: true },
        orderBy: { createdAt: "desc" },
        take: TAKE,
      }),
    );

    await run("awards", "award", (before) =>
      prisma.awardSubmission.findMany({
        where: { createdAt: { lte: before } },
        select: { id: true, email: true, name: true },
        orderBy: { createdAt: "desc" },
        take: TAKE,
      }),
    );
  } catch (err) {
    console.error("[cron/nurture] failed:", err);
    return NextResponse.json(
      { ok: false, error: "Nurture run failed", tally },
      { status: 500 },
    );
  }

  console.log("[cron/nurture]", tally);
  return NextResponse.json({ ok: true, ...tally });
}

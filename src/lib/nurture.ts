import crypto from "node:crypto";
import { prisma } from "@/lib/db";
import { sendMail } from "@/lib/email";
import { SITE_URL } from "@/lib/site";
import {
  SEQUENCES,
  renderEmail,
  firstName,
  type SequenceId,
} from "@/lib/sequences";

/*
  Nurture delivery.

  Guarantees:
    • never sends to an unsubscribed address
    • never sends the same (lead, sequence, step) twice — enforced by a
      DB unique constraint, so concurrent cron runs are safe too
    • a send failure is recorded, not silently swallowed
*/

const SECRET = process.env.AUTH_SECRET ?? "";

/** Signed token so one recipient cannot unsubscribe another. */
export function unsubToken(email: string): string {
  return crypto
    .createHmac("sha256", SECRET)
    .update(email.toLowerCase())
    .digest("hex")
    .slice(0, 32);
}

export function verifyUnsubToken(email: string, token: string): boolean {
  const expected = unsubToken(email);
  const a = Buffer.from(expected);
  const b = Buffer.from(token);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function unsubUrl(email: string): string {
  const q = new URLSearchParams({ e: email, t: unsubToken(email) });
  return `${SITE_URL}/unsubscribe?${q.toString()}`;
}

export async function isUnsubscribed(email: string): Promise<boolean> {
  const hit = await prisma.emailUnsubscribe.findUnique({
    where: { email: email.toLowerCase() },
  });
  return hit !== null;
}

/**
 * Send one step of a sequence to one lead.
 * Returns "sent" | "skipped" (already sent / unsubscribed) | "failed".
 */
export async function sendStep(params: {
  sequence: SequenceId;
  step: number;
  leadId: string;
  leadType: string;
  email: string;
  name: string;
}): Promise<"sent" | "skipped" | "failed"> {
  const { sequence, step, leadId, leadType, email, name } = params;

  const def = SEQUENCES[sequence]?.find((s) => s.step === step);
  if (!def) return "skipped";

  if (await isUnsubscribed(email)) return "skipped";

  // Claim the slot first. If the unique constraint trips, another run
  // already has it — bail out rather than send twice.
  try {
    await prisma.emailSend.create({
      data: { email, sequence, step, leadId, leadType, subject: def.subject },
    });
  } catch {
    return "skipped";
  }

  const html = renderEmail(def.body(firstName(name)), unsubUrl(email));
  const result = await sendMail({ to: email, subject: def.subject, html });

  if (!result.ok) {
    await prisma.emailSend.updateMany({
      where: { leadId, sequence, step },
      data: { ok: false, error: result.error?.slice(0, 400) ?? "unknown" },
    });
    return "failed";
  }

  return "sent";
}

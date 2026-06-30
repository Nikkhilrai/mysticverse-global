import { Resend } from "resend";

/*
  Notification email on new submissions. Gracefully no-ops when
  RESEND_API_KEY is absent, so forms still persist to the DB before
  email is configured. Set NOTIFY_FROM (a verified Resend sender) and
  NOTIFY_TO once the key is added.
*/

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const FROM = process.env.NOTIFY_FROM ?? "MysticVerse Global <onboarding@resend.dev>";
const TO = process.env.NOTIFY_TO ?? "contact@mysticverseglobal.com";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function rowsToHtml(title: string, rows: Array<[string, string | undefined | null]>) {
  const cells = rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#8a8a93;font:600 12px sans-serif;text-transform:uppercase;letter-spacing:.06em;vertical-align:top">${escapeHtml(
          k,
        )}</td><td style="padding:6px 0;color:#1a1a22;font:400 14px/1.5 sans-serif">${escapeHtml(
          String(v),
        ).replace(/\n/g, "<br/>")}</td></tr>`,
    )
    .join("");
  return `<div style="max-width:560px;margin:0 auto"><h2 style="font:600 18px sans-serif;color:#0B0B12">${escapeHtml(
    title,
  )}</h2><table style="border-collapse:collapse;width:100%">${cells}</table></div>`;
}

export async function notify(subject: string, html: string): Promise<void> {
  if (!resend) {
    console.log(`[email] RESEND_API_KEY not set — skipping notification: ${subject}`);
    return;
  }
  try {
    await resend.emails.send({ from: FROM, to: TO, subject, html });
  } catch (err) {
    console.error("[email] failed to send notification:", err);
  }
}

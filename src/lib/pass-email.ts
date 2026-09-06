import { sendMail, escapeHtml } from "@/lib/email";
import { SITE_URL, EVENT } from "@/lib/site";

/*
  Customer-facing pass confirmation — sent on confirmed registration
  (free-via-coupon in /api/passes/order, or paid in /api/passes/verify).

  Distinct from notify()/notifyAfter(), which only reach the internal
  team inbox. This is the actual receipt the attendee sees, so failures
  are reported (not swallowed) — the caller decides what to do about it,
  same reasoning as sendMail() itself.

  Light body on a table layout (not the site's dark "Obsidian & Gold"
  chrome) — a full-dark card reads poorly across email clients and was
  the wrong call for a receipt. Only the header/footer bands stay dark,
  bookending a white body, matching how transactional mail is done for
  MysticVerse's sibling conference brand.
*/

const EVENT_DATE_LABEL = new Date(EVENT.startDate).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function passReference(registrationId: string): string {
  return `MVG-${registrationId.slice(-8).toUpperCase()}`;
}

export async function sendPassConfirmationEmail(params: {
  email: string;
  name: string;
  passType: string;
  amountMinor: number;
  currency: string;
  registrationId: string;
}): Promise<{ ok: boolean; error?: string }> {
  const firstName = escapeHtml(params.name.trim().split(/\s+/)[0] || params.name);
  const reference = passReference(params.registrationId);
  const amountLabel =
    params.amountMinor > 0
      ? `${params.currency} ${(params.amountMinor / 100).toLocaleString("en-AE")}`
      : "Complimentary";

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F6F5F2;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F6F5F2;padding:40px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <!-- Header -->
      <tr><td style="background:#0B0B12;border-radius:12px 12px 0 0;padding:36px 40px;text-align:center;">
        <p style="margin:0 0 4px;color:#F5C45A;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">MysticVerse Global 2026</p>
        <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;">You&rsquo;re Confirmed ✓</h1>
        <p style="margin:10px 0 0;color:#A8A6B4;font-size:13px;">${EVENT_DATE_LABEL} &middot; ${escapeHtml(EVENT.venueName)}, ${escapeHtml(EVENT.addressLocality)}</p>
      </td></tr>

      <!-- Gold/violet gradient bar -->
      <tr><td style="height:3px;background:linear-gradient(90deg,#F5C45A,#C77DFF,#7C5CFF);"></td></tr>

      <!-- Body -->
      <tr><td style="background:#ffffff;padding:40px;border:1px solid #EAE8E3;border-top:none;">

        <p style="margin:0 0 8px;color:#14141F;font-size:17px;font-weight:600;">Hi ${firstName},</p>
        <p style="margin:0 0 24px;color:#5A5866;font-size:15px;line-height:1.8;">
          You&rsquo;re confirmed for <strong style="color:#14141F;">${escapeHtml(params.passType)}</strong> at <strong style="color:#14141F;">MysticVerse Global 2026</strong>.
        </p>

        <!-- Registration details -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#F9F8F5;border:1px solid #EAE8E3;border-radius:10px;margin-bottom:28px;">
          <tr><td style="padding:20px 24px;">
            <p style="margin:0 0 14px;color:#8A8896;font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">Registration Details</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:7px 0;color:#8A8896;font-size:13px;width:140px;border-bottom:1px solid #EFEDE8;">Date</td>
                <td style="padding:7px 0;color:#14141F;font-size:13px;font-weight:600;border-bottom:1px solid #EFEDE8;text-align:right;">${EVENT_DATE_LABEL}</td>
              </tr>
              <tr>
                <td style="padding:7px 0;color:#8A8896;font-size:13px;border-bottom:1px solid #EFEDE8;">Venue</td>
                <td style="padding:7px 0;color:#14141F;font-size:13px;font-weight:600;border-bottom:1px solid #EFEDE8;text-align:right;">${escapeHtml(EVENT.venueName)}, ${escapeHtml(EVENT.addressLocality)}</td>
              </tr>
              <tr>
                <td style="padding:7px 0;color:#8A8896;font-size:13px;border-bottom:1px solid #EFEDE8;">Pass Type</td>
                <td style="padding:7px 0;color:#B7862B;font-size:13px;font-weight:700;border-bottom:1px solid #EFEDE8;text-align:right;">${escapeHtml(params.passType)}</td>
              </tr>
              <tr>
                <td style="padding:7px 0;color:#8A8896;font-size:13px;border-bottom:1px solid #EFEDE8;">Amount</td>
                <td style="padding:7px 0;color:#14141F;font-size:13px;font-weight:600;border-bottom:1px solid #EFEDE8;text-align:right;">${amountLabel}</td>
              </tr>
              <tr>
                <td style="padding:7px 0;color:#8A8896;font-size:13px;">Confirmation Reference</td>
                <td style="padding:7px 0;color:#14141F;font-size:13px;font-weight:700;font-family:monospace;letter-spacing:0.05em;text-align:right;">${reference}</td>
              </tr>
            </table>
          </td></tr>
        </table>

        <p style="margin:0 0 32px;color:#5A5866;font-size:13px;line-height:1.7;">
          Keep this email or your reference code for check-in on the day.
        </p>

        <!-- CTA -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:0 8px 0 0;" width="50%">
              <a href="${SITE_URL}/agenda"
                 target="_blank"
                 style="display:block;text-align:center;background:#0B0B12;color:#ffffff;padding:13px 16px;border-radius:10px;text-decoration:none;font-weight:600;font-size:13px;">
                See the Agenda
              </a>
            </td>
            <td style="padding:0 0 0 8px;" width="50%">
              <a href="${SITE_URL}"
                 target="_blank"
                 style="display:block;text-align:center;background:#F9F8F5;border:1px solid #EAE8E3;color:#14141F;padding:13px 16px;border-radius:10px;text-decoration:none;font-weight:600;font-size:13px;">
                Visit the Website
              </a>
            </td>
          </tr>
        </table>
      </td></tr>

      <!-- Footer -->
      <tr><td style="background:#0B0B12;border-radius:0 0 12px 12px;padding:24px 40px;text-align:center;">
        <p style="margin:0 0 4px;color:#8C8A98;font-size:11px;">MysticVerse Global &middot; Gurgaon, India &amp; Dubai, UAE</p>
        <a href="${SITE_URL}" style="color:#F5C45A;font-size:12px;text-decoration:none;">mysticverseglobal.com</a>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;

  return sendMail({
    to: params.email,
    subject: `You're confirmed — MysticVerse Global 2026 (${reference})`,
    html,
  });
}

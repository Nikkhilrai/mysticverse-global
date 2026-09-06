import { SITE_URL, EVENT } from "@/lib/site";

/*
  Nurture sequences.

  Three audiences, each with a welcome (step 0, sent immediately on
  submission) and timed follow-ups sent by the daily cron. `afterDays`
  is measured from the lead's createdAt.

  Every nurture email carries an unsubscribe link — these go to people
  who gave us their address on a form, but they are still marketing, so
  a one-click opt-out is non-negotiable.
*/

export type SequenceId = "delegate" | "sponsor" | "awards";

export type StepDef = {
  step: number;
  afterDays: number; // 0 = send immediately on submission
  subject: string;
  /** Body builder — receives the lead's first name. */
  body: (firstName: string) => string;
};

const EVENT_LINE = "11 September 2026 · Taj Jumeirah Lakes Towers, Dubai";

/* ── Shared shell ────────────────────────────────────────── */
function shell(inner: string, unsubUrl: string): string {
  return `
<div style="margin:0;padding:32px 16px;background:#0B0B12;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <div style="max-width:560px;margin:0 auto;background:#12121C;border:1px solid rgba(245,196,90,0.22);border-radius:18px;overflow:hidden">
    <div style="padding:28px 32px;border-bottom:1px solid rgba(255,255,255,0.07)">
      <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#F5C45A;font-weight:700">MysticVerse Global 2026</div>
      <div style="font-size:12px;color:#8C8A98;margin-top:6px">${EVENT_LINE}</div>
    </div>
    <div style="padding:32px;color:#DAD8E2;font-size:15px;line-height:1.7">
      ${inner}
    </div>
    <div style="padding:20px 32px;border-top:1px solid rgba(255,255,255,0.07);font-size:11px;line-height:1.6;color:#6E6C7C">
      MysticVerse Global · Gurgaon, India &amp; Dubai, UAE<br/>
      You are receiving this because you enquired at
      <a href="${SITE_URL}" style="color:#8C8A98">mysticverseglobal.com</a>.
      <a href="${unsubUrl}" style="color:#8C8A98;text-decoration:underline">Unsubscribe</a>
    </div>
  </div>
</div>`.trim();
}

function button(label: string, href: string): string {
  return `<a href="${href}" style="display:inline-block;padding:13px 26px;border-radius:999px;background:linear-gradient(120deg,#F5C45A,#C77DFF,#7C5CFF);color:#0B0B12;font-weight:700;font-size:14px;text-decoration:none">${label} →</a>`;
}

export function renderEmail(inner: string, unsubUrl: string): string {
  return shell(inner, unsubUrl);
}

/* ── Delegate sequence ───────────────────────────────────── */
const DELEGATE: StepDef[] = [
  {
    step: 0,
    afterDays: 0,
    subject: "Your place at MysticVerse Global 2026",
    body: (n) => `
      <p style="margin:0 0 16px">Hi ${n},</p>
      <p style="margin:0 0 16px">Thank you for registering your interest. You are now on the list for
      <strong style="color:#F4F2F7">MysticVerse Global 2026</strong> — one day in Dubai where wellness real
      estate, workplace wellbeing, longevity science, and contemplative traditions meet in one room.</p>
      <p style="margin:0 0 24px">Our team will be in touch with pass availability. In the meantime, the full
      programme is live:</p>
      <p style="margin:0 0 24px">${button("See the agenda", `${SITE_URL}/agenda`)}</p>
      <p style="margin:0;color:#8C8A98;font-size:13px">Seats are capped deliberately — the value of the room
      is its calibration, not its volume.</p>`,
  },
  {
    step: 1,
    afterDays: 2,
    subject: "Why one room, four pillars",
    body: (n) => `
      <p style="margin:0 0 16px">Hi ${n},</p>
      <p style="margin:0 0 16px">A quick note on why MysticVerse is built the way it is.</p>
      <p style="margin:0 0 16px">Most conferences separate their audiences. We deliberately don't. A CHRO and
      a wellness real estate developer cannot share an agenda by accident — but they can share an audience by
      design. That is the whole thesis.</p>
      <p style="margin:0 0 24px">Four parallel conversations, one curated room:</p>
      <p style="margin:0 0 24px">${button("Explore the four pillars", `${SITE_URL}/pillars`)}</p>`,
  },
  {
    step: 2,
    afterDays: 5,
    subject: "Passes for 11 September",
    body: (n) => `
      <p style="margin:0 0 16px">Hi ${n},</p>
      <p style="margin:0 0 16px">If you are planning to join us in Dubai on 11 September, this is the simplest
      way to secure your seat.</p>
      <p style="margin:0 0 8px"><strong style="color:#F4F2F7">Seeker Pass — AED 699</strong>
      <span style="color:#8C8A98;font-size:14px;text-decoration:line-through">AED 999</span><br/>
      <span style="color:#A9A6B8;font-size:14px">Full access to all sessions, networking, food &amp; beverages,
      certificate, and recordings.</span></p>
      <p style="margin:0 0 24px"><strong style="color:#F4F2F7">Mystic Pass — AED 1399</strong>
      <span style="color:#8C8A98;font-size:14px;text-decoration:line-through">AED 1999</span><br/>
      <span style="color:#A9A6B8;font-size:14px">Everything in Seeker, plus website logo inclusion, welcome
      delegate kit, a year of MysticVerse membership, and the opportunity to publish a thought leadership
      article in the MysticVerse Global Digest.</span></p>
      <p style="margin:0 0 24px">${button("Book your pass", `${SITE_URL}/register`)}</p>`,
  },
];

/* ── Sponsor sequence ────────────────────────────────────── */
const SPONSOR: StepDef[] = [
  {
    step: 0,
    afterDays: 0,
    subject: "Your MysticVerse Global partnership enquiry",
    body: (n) => `
      <p style="margin:0 0 16px">Hi ${n},</p>
      <p style="margin:0 0 16px">Thank you for requesting the partnership deck. Our team is preparing it and
      will be in touch within two business days with the material and current investment levels.</p>
      <p style="margin:0 0 16px">In the meantime, the nine-tier structure and what sits inside each is on the
      site:</p>
      <p style="margin:0 0 24px">${button("Review the tiers", `${SITE_URL}/sponsor#tiers`)}</p>
      <p style="margin:0;color:#8C8A98;font-size:13px">Sponsorship here is a positioning decision, not a logo
      placement — happy to talk it through properly.</p>`,
  },
  {
    step: 1,
    afterDays: 3,
    subject: "Who is actually in the room",
    body: (n) => `
      <p style="margin:0 0 16px">Hi ${n},</p>
      <p style="margin:0 0 16px">The question we get asked most: who will I actually meet?</p>
      <p style="margin:0 0 16px">MysticVerse convenes wellness real estate developers, branded residence
      operators, CHROs and senior HR leaders, longevity clinicians and entrepreneurs, luxury retail houses,
      hospitality groups, and the private wealth and investors buying into all of it — capped deliberately so the room
      stays calibrated.</p>
      <p style="margin:0 0 24px">${button("See why Dubai, and why now", `${SITE_URL}/why-dubai-2026`)}</p>`,
  },
  {
    step: 2,
    afterDays: 7,
    subject: "Shall we find fifteen minutes?",
    body: (n) => `
      <p style="margin:0 0 16px">Hi ${n},</p>
      <p style="margin:0 0 16px">Rather than send more material, it is usually faster to talk. Fifteen minutes
      is normally enough to work out whether there is a fit, and which tier makes sense for what you are trying
      to achieve.</p>
      <p style="margin:0 0 24px">${button("Talk to our team", `${SITE_URL}/contact`)}</p>
      <p style="margin:0;color:#8C8A98;font-size:13px">Several tiers are single-slot, so they close early.</p>`,
  },
];

/* ── Awards sequence ─────────────────────────────────────── */
const AWARDS: StepDef[] = [
  {
    step: 0,
    afterDays: 0,
    subject: "Your MysticVerse Excellence Awards submission",
    body: (n) => `
      <p style="margin:0 0 16px">Hi ${n},</p>
      <p style="margin:0 0 16px">Thank you — your submission for the
      <strong style="color:#F4F2F7">MysticVerse Global Excellence Awards</strong> has been received.</p>
      <p style="margin:0 0 16px">Entries are read by the jury panel against the published criteria. We will be
      in touch as the panel is confirmed and shortlisting begins. Winners are announced live on the main stage
      in Dubai on 11 September.</p>
      <p style="margin:0 0 24px">${button("View the categories", `${SITE_URL}/awards`)}</p>`,
  },
  {
    step: 1,
    afterDays: 4,
    subject: "Be in the room when the awards are announced",
    body: (n) => `
      <p style="margin:0 0 16px">Hi ${n},</p>
      <p style="margin:0 0 16px">A note worth mentioning: the Excellence Awards are presented on the main stage
      as the conference closes — and attendance is not automatic with a submission.</p>
      <p style="margin:0 0 24px">If you would like to be there when the categories are announced, a delegate
      pass secures your seat:</p>
      <p style="margin:0 0 24px">${button("Book your pass", `${SITE_URL}/register`)}</p>`,
  },
];

export const SEQUENCES: Record<SequenceId, StepDef[]> = {
  delegate: DELEGATE,
  sponsor: SPONSOR,
  awards: AWARDS,
};

/** First name only — "Nikhil Rai" → "Nikhil". Falls back gracefully. */
export function firstName(full: string): string {
  const n = full.trim().split(/\s+/)[0];
  return n && n.length <= 40 ? n : "there";
}

export { EVENT };

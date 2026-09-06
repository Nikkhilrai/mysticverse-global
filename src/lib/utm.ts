/*
  First-touch UTM attribution.

  Captured once on the visitor's first landing and held in sessionStorage,
  so a lead that arrives via a LinkedIn ad but submits three pages later
  is still credited to LinkedIn. First-touch (not last) is deliberate:
  we want to know which campaign *found* the person.

  Client-side only — safe to call from any "use client" component.
*/

const KEY = "mvg_utm";

export type Utm = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

/** Read UTM params off the current URL, if any are present. */
function fromLocation(): Utm | null {
  if (typeof window === "undefined") return null;
  const q = new URLSearchParams(window.location.search);
  const source = q.get("utm_source") ?? undefined;
  const medium = q.get("utm_medium") ?? undefined;
  const campaign = q.get("utm_campaign") ?? undefined;
  if (!source && !medium && !campaign) return null;
  return {
    utmSource: source?.slice(0, 80),
    utmMedium: medium?.slice(0, 80),
    utmCampaign: campaign?.slice(0, 120),
  };
}

/**
 * Store the landing UTMs if this is the first page of the session.
 * Call once, high in the tree.
 */
export function captureUtm(): void {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(KEY)) return; // first touch wins
    const utm = fromLocation();
    if (utm) sessionStorage.setItem(KEY, JSON.stringify(utm));
  } catch {
    /* storage unavailable — attribution is best-effort, never fatal */
  }
}

/** Read the stored attribution to attach to a form payload. */
export function getUtm(): Utm {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Utm;
    // Not stored yet (e.g. capture ran after this form mounted) — read live.
    return fromLocation() ?? {};
  } catch {
    return {};
  }
}

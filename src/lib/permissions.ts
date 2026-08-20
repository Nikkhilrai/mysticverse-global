/*
  Admin section permissions.

  ADMIN role always has full access — `permissions` is only consulted
  for EDITOR accounts, and only gates the sections below. "Settings"
  (change my own password) and the dashboard shell are never gated:
  every signed-in user can see their own account page.
*/

export const RESOURCES = [
  { key: "posts", label: "Blog posts", href: "/admin/posts" },
  { key: "passes", label: "Pass registrations", href: "/admin/passes" },
  { key: "coupons", label: "Coupons", href: "/admin/coupons" },
  { key: "nominations", label: "Excellence Awards", href: "/admin/nominations" },
  { key: "award-nominations", label: "Award Applications", href: "/admin/award-nominations" },
  { key: "decks", label: "Deck requests", href: "/admin/decks" },
  { key: "contact", label: "Contact enquiries", href: "/admin/contact" },
  { key: "interest", label: "Delegate interest", href: "/admin/interest" },
  { key: "pavilion-brief", label: "Pavilion Brief", href: "/admin/pavilion-brief" },
] as const;

export type ResourceKey = (typeof RESOURCES)[number]["key"];

export function isResourceKey(v: string): v is ResourceKey {
  return RESOURCES.some((r) => r.key === v);
}

/** Minimal shape needed to decide access — matches SessionPayload. */
export interface AccessSubject {
  role?: string;
  permissions?: string[];
}

export function can(subject: AccessSubject | null | undefined, resource: ResourceKey): boolean {
  if (!subject) return false;
  if (subject.role === "ADMIN") return true;
  return Boolean(subject.permissions?.includes(resource));
}

/** Path prefix → resource, for middleware/route-level checks. */
export function resourceForPath(pathname: string): ResourceKey | null {
  for (const r of RESOURCES) {
    if (pathname === r.href || pathname.startsWith(`${r.href}/`)) return r.key;
  }
  return null;
}

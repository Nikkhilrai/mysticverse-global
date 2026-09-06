import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySession, type SessionPayload } from "@/lib/session";
import { can, type ResourceKey } from "@/lib/permissions";

/* Server-side helpers for reading the admin session in RSC / layouts. */

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySession(token);
}

export async function requireSession(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

/** For RSC pages: redirects to login (no session) or the dashboard (no permission). */
export async function requirePermission(resource: ResourceKey): Promise<SessionPayload> {
  const session = await requireSession();
  if (!can(session, resource)) redirect("/admin");
  return session;
}

/** For server actions: throws instead of redirecting (actions can't redirect mid-mutation). */
export async function assertPermission(resource: ResourceKey): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  if (!can(session, resource)) throw new Error("Forbidden");
  return session;
}

/** Admin-only helper — for account/team management, never permission-gated. */
export async function requireAdmin(): Promise<SessionPayload> {
  const session = await requireSession();
  if (session.role !== "ADMIN") redirect("/admin");
  return session;
}

/** Same as requireAdmin, but throws (for server actions, which can't redirect). */
export async function assertAdmin(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  if (session.role !== "ADMIN") throw new Error("Forbidden — admin only.");
  return session;
}

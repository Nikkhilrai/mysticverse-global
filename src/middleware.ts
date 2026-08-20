import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/session";
import { can, resourceForPath } from "@/lib/permissions";

/*
  Protects everything under /admin except the login page, and — for
  EDITOR accounts — redirects away from sections outside their granted
  permissions. This is a UX convenience (don't render a page they'll
  just bounce off); the real enforcement lives in each server action
  and export route via assertPermission(), since a redirect here can't
  stop a direct POST to those endpoints.
*/
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLogin = pathname === "/admin/login";

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySession(token) : null;

  if (!session && !isLogin) {
    const url = new URL("/admin/login", req.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }
  if (session && isLogin) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (session && session.role !== "ADMIN") {
    const resource = resourceForPath(pathname);
    if (resource && !can(session, resource)) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

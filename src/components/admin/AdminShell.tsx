"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { RESOURCES, can, type ResourceKey } from "@/lib/permissions";
import type { AdminNotifications } from "@/lib/notifications";
import NotificationBell from "./NotificationBell";
import styles from "./AdminShell.module.css";

type NavItem = { label: string; href: string; resource?: ResourceKey };

const NAV: readonly NavItem[] = [
  { label: "Dashboard", href: "/admin" },
  ...RESOURCES.map((r) => ({ label: r.label, href: r.href, resource: r.key })),
  { label: "Settings", href: "/admin/settings" },
];

export default function AdminShell({
  user,
  notifications,
  children,
}: {
  user: { name?: string | null; email: string; role: string; permissions: string[] };
  notifications: AdminNotifications;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const signOut = async () => {
    setSigningOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.brandDot} aria-hidden="true" />
          <span className={styles.brandText}>MysticVerse</span>
        </div>

        <NotificationBell notifications={notifications} />

        <nav className={styles.nav}>
          {NAV.filter((item) => !item.resource || can(user, item.resource)).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`${styles.navLink}${isActive(item.href) ? ` ${styles.navActive}` : ""}`}
            >
              <span>{item.label}</span>
              {item.resource && notifications.counts[item.resource] ? (
                <span className={styles.navBadge}>{notifications.counts[item.resource]}</span>
              ) : null}
            </a>
          ))}
          {user.role === "ADMIN" && (
            <a
              href="/admin/team"
              className={`${styles.navLink}${isActive("/admin/team") ? ` ${styles.navActive}` : ""}`}
            >
              Team
            </a>
          )}
        </nav>

        <div className={styles.footer}>
          <div className={styles.user}>
            <span className={styles.userName}>{user.name ?? "Admin"}</span>
            <span className={styles.userEmail}>{user.email}</span>
          </div>
          <button className={styles.signout} onClick={signOut} disabled={signingOut} type="button">
            {signingOut ? "Signing out…" : "Sign out"}
          </button>
          <a href="/" className={styles.viewSite}>View site ↗</a>
        </div>
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  );
}

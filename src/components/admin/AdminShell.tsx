"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./AdminShell.module.css";

const NAV = [
  { label: "Dashboard", href: "/admin" },
  { label: "Contact enquiries", href: "/admin/contact" },
  { label: "Delegate interest", href: "/admin/interest" },
  { label: "Blog posts", href: "/admin/posts" },
  { label: "Settings", href: "/admin/settings" },
] as const;

export default function AdminShell({
  user,
  children,
}: {
  user: { name?: string | null; email: string };
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

        <nav className={styles.nav}>
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`${styles.navLink}${isActive(item.href) ? ` ${styles.navActive}` : ""}`}
            >
              {item.label}
            </a>
          ))}
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

import { requireSession } from "@/lib/auth-server";
import { getAdminNotifications } from "@/lib/notifications";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = {
  title: "Admin | MysticVerse Global",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireSession();
  const notifications = await getAdminNotifications(session);

  return (
    <AdminShell
      notifications={notifications}
      user={{
        name: session.name,
        email: session.email,
        role: session.role,
        permissions: session.permissions ?? [],
      }}
    >
      {children}
    </AdminShell>
  );
}

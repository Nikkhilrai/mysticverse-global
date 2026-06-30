import { requireSession } from "@/lib/auth-server";
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
  return (
    <AdminShell user={{ name: session.name, email: session.email }}>
      {children}
    </AdminShell>
  );
}

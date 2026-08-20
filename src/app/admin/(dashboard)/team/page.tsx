import { requireAdmin } from "@/lib/auth-server";
import { listUsers } from "./actions";
import TeamManager from "@/components/admin/TeamManager";
import styles from "@/components/admin/panel.module.css";

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const session = await requireAdmin();
  const users = await listUsers();

  return (
    <div>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Account</p>
        <h1 className={styles.h1}>Team</h1>
        <p className={styles.sub}>
          Create admin accounts and control which sections each one can access.
        </p>
      </header>
      <TeamManager initialUsers={users} currentUserId={session.uid} />
    </div>
  );
}

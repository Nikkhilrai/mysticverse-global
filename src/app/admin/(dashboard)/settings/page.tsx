import styles from "@/components/admin/panel.module.css";
import ChangePasswordForm from "@/components/admin/ChangePasswordForm";

export const dynamic = "force-dynamic";

export default function SettingsPage() {
  return (
    <div>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Account</p>
        <h1 className={styles.h1}>Settings</h1>
        <p className={styles.sub}>Change your admin password.</p>
      </header>
      <ChangePasswordForm />
    </div>
  );
}

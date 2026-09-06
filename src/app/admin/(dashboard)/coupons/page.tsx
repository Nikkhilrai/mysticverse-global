import { requirePermission } from "@/lib/auth-server";
import { listCoupons } from "./actions";
import CouponManager from "@/components/admin/CouponManager";
import styles from "@/components/admin/panel.module.css";

export const dynamic = "force-dynamic";

export default async function CouponsPage() {
  await requirePermission("coupons");
  const coupons = await listCoupons();

  return (
    <div>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Register</p>
        <h1 className={styles.h1}>Coupons</h1>
        <p className={styles.sub}>
          Percentage-off codes for the delegate pass checkout. Create a code, set its validity
          window and usage cap, and track redemptions.
        </p>
      </header>
      <CouponManager initialCoupons={coupons} />
    </div>
  );
}

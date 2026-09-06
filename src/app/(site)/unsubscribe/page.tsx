import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { verifyUnsubToken } from "@/lib/nurture";
import styles from "./unsubscribe.module.css";

export const metadata: Metadata = {
  alternates: { canonical: "/unsubscribe" },
  title: "Unsubscribe",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ e?: string; t?: string }>;
}) {
  const { e, t } = await searchParams;

  let state: "done" | "invalid" = "invalid";

  if (e && t && verifyUnsubToken(e, t)) {
    const email = e.toLowerCase();
    try {
      await prisma.emailUnsubscribe.upsert({
        where: { email },
        update: {},
        create: { email, reason: "one-click" },
      });
      state = "done";
    } catch (err) {
      console.error("[unsubscribe] failed:", err);
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        {state === "done" ? (
          <>
            <span className={styles.mark} aria-hidden="true">✓</span>
            <h1 className={styles.title}>You&apos;ve been unsubscribed.</h1>
            <p className={styles.body}>
              We won&apos;t send you any more sequence emails. You may still
              receive a direct reply if you contact our team.
            </p>
          </>
        ) : (
          <>
            <h1 className={styles.title}>That link didn&apos;t work.</h1>
            <p className={styles.body}>
              The unsubscribe link looks incomplete or expired. Email{" "}
              <a href="mailto:contact@mysticverseglobal.com" className={styles.link}>
                contact@mysticverseglobal.com
              </a>{" "}
              and we&apos;ll remove you right away.
            </p>
          </>
        )}
        <a href="/" className={styles.home}>
          Return to mysticverseglobal.com →
        </a>
      </div>
    </main>
  );
}

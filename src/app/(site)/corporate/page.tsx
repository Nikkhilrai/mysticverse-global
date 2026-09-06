import type { Metadata } from "next";
import CorporateHero from "@/components/corporate/CorporateHero";
import CorporateTiers from "@/components/corporate/CorporateTiers";
import CorporateForm from "@/components/corporate/CorporateForm";
import styles from "@/components/corporate/CorporatePage.module.css";

export const metadata: Metadata = {
  alternates: { canonical: "/corporate" },
  title: "Corporate Bundles | MysticVerse Global 2026",
  description:
    "Bulk delegate passes for HR and people teams — 40% off for groups of 5 or more, billed on a single invoice. A one-day programme on workplace wellbeing, burnout, and human capital. 11 September 2026, Dubai.",
  openGraph: {
    title: "Corporate Bundles — MysticVerse Global 2026",
    description:
      "Bring your people team. 40% off for groups of 5+, single invoice. 11 September 2026, Dubai.",
    type: "website",
  },
};

export default function CorporatePage() {
  return (
    <main>
      <CorporateHero />
      <section className={styles.body}>
        <div className={styles.inner}>
          <CorporateTiers />
          <CorporateForm />
        </div>
      </section>
    </main>
  );
}

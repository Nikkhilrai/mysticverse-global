import type { Metadata } from "next";
import TermsPage from "@/components/legal/TermsPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | MysticVerse Global 2026",
  description:
    "Terms & Conditions governing participation in MysticVerse Global Conference & Exhibition — registration, fees, refunds, intellectual property, and liability.",
  robots: { index: true, follow: true },
};

export default function Page() {
  return <TermsPage />;
}

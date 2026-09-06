import type { Metadata } from "next";
import FreeDelegatePass from "@/components/free-pass/FreeDelegatePass";

export const metadata: Metadata = {
  alternates: { canonical: "/free-delegate-pass" },
  title: "Claim Your Free Delegate Pass | MysticVerse Global 2026",
  description:
    "A limited number of complimentary Seeker Passes to MysticVerse Global 2026 — 11 September 2026, Dubai. No payment required.",
  openGraph: {
    title: "Free Delegate Pass — MysticVerse Global 2026",
    description: "Claim your complimentary pass. 11 September 2026, Dubai.",
    type: "website",
  },
  robots: { index: false, follow: false },
};

export default function FreeDelegatePassPage() {
  return (
    <main>
      <FreeDelegatePass />
    </main>
  );
}

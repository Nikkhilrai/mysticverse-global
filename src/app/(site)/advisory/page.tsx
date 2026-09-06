import type { Metadata } from "next";
import AdvisoryHero from "@/components/advisory/AdvisoryHero";
import AdvisoryGrid from "@/components/advisory/AdvisoryGrid";

export const metadata: Metadata = {
  alternates: { canonical: "/advisory" },
  title: "Advisory Board | MysticVerse Global 2026",
  description:
    "The Advisory Board of MysticVerse Global 2026 — educators, healers, and legal counsel guiding the platform's direction.",
  openGraph: {
    title: "Advisory Board — MysticVerse Global 2026",
    description: "The counsel behind conscious luxury.",
    type: "website",
  },
};

export default function AdvisoryPage() {
  return (
    <main>
      <AdvisoryHero />
      <AdvisoryGrid />
    </main>
  );
}

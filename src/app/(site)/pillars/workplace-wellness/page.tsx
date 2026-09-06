import type { Metadata } from "next";
import WWHero from "@/components/pillars/workplace/WWHero";
import WWShift from "@/components/pillars/workplace/WWShift";
import WWCategories from "@/components/pillars/workplace/WWCategories";
import WWMarket from "@/components/pillars/workplace/WWMarket";

export const metadata: Metadata = {
  alternates: { canonical: "/pillars/workplace-wellness" },
  title: "Workplace Wellness & Human Capital | MysticVerse Global 2026",
  description:
    "Employee burnout is an enterprise risk, not a soft-benefit line item. The frameworks, peer networks, and vetted solutions CHROs and Chief People Officers need to build wellbeing into corporate policy — a pillar of MysticVerse Global 2026.",
  openGraph: {
    title: "Workplace Wellness & Human Capital — MysticVerse Global 2026",
    description:
      "Treating wellbeing as a board-level discipline. Built for CHROs, Chief People Officers, and senior enterprise decision-makers.",
    type: "website",
  },
};

export default function WorkplaceWellnessPage() {
  return (
    <main>
      <WWHero />
      <WWShift />
      <WWCategories />
      <WWMarket />
    </main>
  );
}

import type { Metadata } from "next";
import PMLHero from "@/components/pillars/longevity/PMLHero";
import PMLShift from "@/components/pillars/longevity/PMLShift";
import PMLCategories from "@/components/pillars/longevity/PMLCategories";
import PMLMarket from "@/components/pillars/longevity/PMLMarket";

export const metadata: Metadata = {
  alternates: { canonical: "/pillars/personal-mastery-longevity" },
  title: "Personal Mastery & Longevity | MysticVerse Global 2026",
  description:
    "Healthspan is the modern metric of personal success. Longevity science, functional medicine, and contemplative mastery converge for high performers and biological-age investors — a pillar of MysticVerse Global 2026.",
  openGraph: {
    title: "Personal Mastery & Longevity — MysticVerse Global 2026",
    description:
      "Where science meets contemplative depth. Built for longevity clinic leaders, integrative physicians, contemplative teachers, and biological-age investors.",
    type: "website",
  },
};

export default function PersonalMasteryLongevityPage() {
  return (
    <main>
      <PMLHero />
      <PMLShift />
      <PMLCategories />
      <PMLMarket />
    </main>
  );
}

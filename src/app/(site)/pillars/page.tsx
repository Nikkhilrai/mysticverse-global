import type { Metadata } from "next";
import PillarsHero from "@/components/pillars/PillarsHero";
import PillarsGrid from "@/components/pillars/PillarsGrid";

export const metadata: Metadata = {
  title: "The 4 Pillars | MysticVerse Global 2026",
  description:
    "Four pillars, one curated audience. MysticVerse Global is built as four parallel conversations under one roof — Conscious Luxury Living, Workplace Wellness, Personal Mastery & Longevity, and Wisdom & Modern Science.",
  openGraph: {
    title: "The 4 Pillars — MysticVerse Global 2026",
    description:
      "Four parallel conversations under one roof. Each opens to its own audience; all four meet on the main stage.",
    type: "website",
  },
};

export default function PillarsPage() {
  return (
    <main>
      <PillarsHero />
      <PillarsGrid />
    </main>
  );
}

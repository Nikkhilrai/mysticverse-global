import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PavilionHero from "@/components/pavilion/PavilionHero";
import PavilionIntro from "@/components/pavilion/PavilionIntro";
import PavilionZones from "@/components/pavilion/PavilionZones";
import PavilionThesis from "@/components/pavilion/PavilionThesis";
import PavilionStage from "@/components/pavilion/PavilionStage";
import PavilionSunset from "@/components/pavilion/PavilionSunset";
import PavilionPrivate from "@/components/pavilion/PavilionPrivate";
import PavilionPartner from "@/components/pavilion/PavilionPartner";

export const metadata: Metadata = {
  alternates: { canonical: "/pavilion" },
  title: "The Conscious Living Pavilion | MysticVerse Global 2026",
  description:
    "Five hundred square metres where wellness real estate and luxury retail share a room — because they share a buyer. The flagship zone of MysticVerse Global 2026, Dubai.",
  openGraph: {
    title: "The Conscious Living Pavilion — MysticVerse Global 2026",
    description:
      "The flagship zone where wellness real estate and luxury retail meet. 11 September 2026, Dubai.",
    type: "website",
  },
};

// Temporarily unpublished from the live site — components and copy
// below are untouched. Remove the notFound() call to restore the page.
export default function PavilionPage() {
  notFound();

  return (
    <main>
      <PavilionHero />
      <PavilionIntro />
      <PavilionZones />
      <PavilionThesis />
      <PavilionStage />
      <PavilionSunset />
      <PavilionPrivate />
      <PavilionPartner />
    </main>
  );
}

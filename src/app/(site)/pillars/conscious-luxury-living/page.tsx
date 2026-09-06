import type { Metadata } from "next";
import CLLHero from "@/components/pillars/conscious/CLLHero";
import CLLShift from "@/components/pillars/conscious/CLLShift";
import CLLCategories from "@/components/pillars/conscious/CLLCategories";
import CLLColocated from "@/components/pillars/conscious/CLLColocated";
// import CLLPavilion from "@/components/pillars/conscious/CLLPavilion"; — temporarily unpublished (links to /pavilion)
import CLLMarket from "@/components/pillars/conscious/CLLMarket";

export const metadata: Metadata = {
  alternates: { canonical: "/pillars/conscious-luxury-living" },
  title: "Conscious Luxury Living | MysticVerse Global 2026",
  description:
    "The future of luxury is conscious. Wellness residences, branded communities, and spiritual retail — the flagship pillar of MysticVerse Global 2026, where real estate and luxury retail meet one buyer.",
  openGraph: {
    title: "Conscious Luxury Living — MysticVerse Global 2026",
    description:
      "Wellness residences. Branded communities. Spiritual retail. One audience buying a life, not a product.",
    type: "website",
  },
};

export default function ConsciousLuxuryLivingPage() {
  return (
    <main>
      <CLLHero />
      <CLLShift />
      <CLLCategories />
      <CLLColocated />
      {/* <CLLPavilion /> — temporarily unpublished (links to /pavilion) */}
      <CLLMarket />
    </main>
  );
}

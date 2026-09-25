import type { Metadata } from "next";
import AwardsHero from "@/components/awards/AwardsHero";
import AwardeesShowcase from "@/components/awards/AwardeesShowcase";

export const metadata: Metadata = {
  alternates: { canonical: "/awards" },
  title: "Excellence Awardees | MysticVerse Global 2026",
  description:
    "Meet the honourees of the MysticVerse Global Excellence Awards 2026 — ten honours presented on the main stage on 11 September 2026 at Taj Jumeirah Lakes Towers, Dubai.",
  openGraph: {
    title: "The MysticVerse Global Excellence Awardees 2026",
    description:
      "Ten honours for the practitioners, leaders, and platforms shaping conscious living. Presented 11 September 2026, Dubai.",
    type: "website",
  },
};

export default function AwardsPage() {
  return (
    <main>
      <AwardsHero />
      <AwardeesShowcase />
    </main>
  );
}

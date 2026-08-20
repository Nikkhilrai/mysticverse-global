import type { Metadata } from "next";
import AwardsHero from "@/components/awards/AwardsHero";
import AwardsCategories from "@/components/awards/AwardsCategories";
import AwardsJury from "@/components/awards/AwardsJury";

export const metadata: Metadata = {
  title: "Excellence Awards | MysticVerse Global 2026",
  description:
    "The MysticVerse Global Excellence Awards recognise the projects, leaders, and platforms shaping the conscious luxury economy — eight honours awarded on the main stage, 11 September 2026, Dubai.",
  openGraph: {
    title: "The MysticVerse Global Excellence Awards",
    description:
      "Eight honours for the projects, leaders, and platforms shaping the conscious luxury economy. 11 September 2026, Dubai.",
    type: "website",
  },
};

export default function AwardsPage() {
  return (
    <main>
      <AwardsHero />
      <AwardsCategories />
      <AwardsJury />
    </main>
  );
}

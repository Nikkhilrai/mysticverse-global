import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutPremise from "@/components/about/AboutPremise";
import AboutVisionMission from "@/components/about/AboutVisionMission";
import AboutPrinciples from "@/components/about/AboutPrinciples";
import AboutOrganisers from "@/components/about/AboutOrganisers";
import AboutFounder from "@/components/about/AboutFounder";

export const metadata: Metadata = {
  title: "About | MysticVerse Global 2026",
  description:
    "MysticVerse Global is the platform on which the conscious luxury economy is becoming visible — across real estate, retail, workplace wellbeing, and human longevity.",
  openGraph: {
    title: "About — MysticVerse Global 2026",
    description:
      "We curate the room where conscious wealth, ancient wisdom, and the future of living meet.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutPremise />
      <AboutVisionMission />
      <AboutPrinciples />
      <AboutOrganisers />
      <AboutFounder />
    </main>
  );
}

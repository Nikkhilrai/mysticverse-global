import type { Metadata } from "next";
import SponsorHero from "@/components/sponsor/SponsorHero";
import SponsorWho from "@/components/sponsor/SponsorWho";
import SponsorTiers from "@/components/sponsor/SponsorTiers";
import SponsorAddons from "@/components/sponsor/SponsorAddons";
import ConfirmedPartners from "@/components/partners/ConfirmedPartners";
import SponsorDecks from "@/components/sponsor/SponsorDecks";

export const metadata: Metadata = {
  title: "Sponsor MysticVerse | MysticVerse Global 2026",
  description:
    "Partner with the platform building the conscious luxury economy. Nine sponsorship tiers with curated access to HNIs, real estate decision-makers, CHROs, longevity entrepreneurs, and investors. 11 September 2026, Dubai.",
  openGraph: {
    title: "Sponsor MysticVerse Global 2026",
    description:
      "Nine tiers, calibrated to ambition, category, and audience. One day of measurable presence; twelve months of editorial association.",
    type: "website",
  },
};

export default function SponsorPage() {
  return (
    <main>
      <SponsorHero />
      <SponsorWho />
      <SponsorTiers />
      <SponsorAddons />
      <ConfirmedPartners />
      <SponsorDecks />
    </main>
  );
}

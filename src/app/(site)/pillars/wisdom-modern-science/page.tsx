import type { Metadata } from "next";
import WMSHero from "@/components/pillars/wisdom/WMSHero";
import WMSShift from "@/components/pillars/wisdom/WMSShift";
import WMSCategories from "@/components/pillars/wisdom/WMSCategories";
import WMSMarket from "@/components/pillars/wisdom/WMSMarket";

export const metadata: Metadata = {
  title: "Wisdom & Modern Science | MysticVerse Global 2026",
  description:
    "Ancient contemplative wisdom and modern scientific enquiry, held to the same intellectual standard. Vedic traditions, neuroscience, and clinical psychology in dialogue — the intellectual soul of MysticVerse Global 2026.",
  openGraph: {
    title: "Wisdom & Modern Science — MysticVerse Global 2026",
    description:
      "Ancient wisdom, held to modern intellectual standards. Built for lineage holders, neuroscientists, scholars, and credentialed practitioners.",
    type: "website",
  },
};

export default function WisdomModernSciencePage() {
  return (
    <main>
      <WMSHero />
      <WMSShift />
      <WMSCategories />
      <WMSMarket />
    </main>
  );
}

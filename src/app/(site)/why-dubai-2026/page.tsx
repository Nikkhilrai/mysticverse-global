import type { Metadata } from "next";
import WhyDubaiHero from "@/components/why-dubai/WhyDubaiHero";
import WhyDubaiReasons from "@/components/why-dubai/WhyDubaiReasons";
import WhyDubaiSeptember from "@/components/why-dubai/WhyDubaiSeptember";
import WhyDubaiMarket from "@/components/why-dubai/WhyDubaiMarket";
import WhyDubaiPractical from "@/components/why-dubai/WhyDubaiPractical";

export const metadata: Metadata = {
  title: "Why Dubai 2026 | MysticVerse Global",
  description:
    "Dubai. By design. The geographic centre of the wellness real estate boom — three hours from a third of the world's HNIs, and built for premium gatherings. Why MysticVerse Global 2026 is in Dubai.",
  openGraph: {
    title: "Why Dubai 2026 — MysticVerse Global",
    description:
      "The geographic centre of the wellness real estate boom, built for premium gatherings. 11 September 2026.",
    type: "website",
  },
};

export default function WhyDubaiPage() {
  return (
    <main>
      <WhyDubaiHero />
      <WhyDubaiReasons />
      <WhyDubaiSeptember />
      <WhyDubaiMarket />
      <WhyDubaiPractical />
    </main>
  );
}

import type { Metadata } from "next";
import SpeakersHero from "@/components/speakers/SpeakersHero";
import SpeakersGallery from "@/components/speakers/SpeakersGallery";

export const metadata: Metadata = {
  title: "Speakers | MysticVerse Global 2026",
  description:
    "Meet the MysticVerse Global Conference 2026 faculty — healers, founders, physicians, artists, and yogis bridging ancient wisdom and modern innovation. 10 & 11 September 2026, Dubai.",
  openGraph: {
    title: "Speakers — MysticVerse Global Conference 2026",
    description:
      "The voices shaping conscious living — meet the full speaker faculty.",
    type: "website",
  },
};

export default function SpeakersPage() {
  return (
    <main>
      <SpeakersHero />
      <SpeakersGallery />
    </main>
  );
}

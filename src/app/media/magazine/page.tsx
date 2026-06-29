import type { Metadata } from "next";
import MagazineCollection from "@/components/magazine/MagazineCollection";

export const metadata: Metadata = {
  title: "Magazine | MysticVerse Global 2026",
  description:
    "The MysticVerse Magazine Collection — curated digital magazines covering consciousness, wellness, spirituality, and transformative living. Read The MysticVerse Digest, Issue 01.",
  openGraph: {
    title: "MysticVerse Magazine Collection",
    description:
      "Explore curated digital magazines on consciousness, wellness, and conscious living.",
    type: "website",
  },
};

export default function MagazinePage() {
  return (
    <main>
      <MagazineCollection />
    </main>
  );
}

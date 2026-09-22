import type { Metadata } from "next";
import GalleryHero from "@/components/gallery/GalleryHero";
import EventGallery from "@/components/gallery/EventGallery";

export const metadata: Metadata = {
  alternates: { canonical: "/gallery" },
  title: "Gallery | MysticVerse Global 2026",
  description:
    "Photos from MysticVerse Global 2026 — 11 September, Taj Jumeirah Lakes Towers, Dubai. The sessions, the conversations, and the people who filled the room.",
  openGraph: {
    title: "Gallery — MysticVerse Global Conference 2026",
    description: "Photos from the day, Dubai 2026.",
    type: "website",
  },
};

export default function GalleryPage() {
  return (
    <main>
      <GalleryHero />
      <EventGallery />
    </main>
  );
}

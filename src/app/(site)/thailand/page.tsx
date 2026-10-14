import type { Metadata } from "next";
import ThailandHero from "@/components/thailand/ThailandHero";
import { THAILAND } from "@/components/thailand/thailandData";

/*
  /thailand — MysticVerse Global 2.0, Bangkok, 1–2 July 2027.
  Built section by section from the dev brief (07-Dev-Brief-Bangkok-Page).

  PRE-LAUNCH: noindex, and deliberately absent from the nav, the
  sitemap and the homepage Global Series card. Flip all four together
  at launch (brief §9 items 3–5).
*/
export const metadata: Metadata = {
  title: { absolute: `${THAILAND.editionLabel} | MysticVerse Global — ${THAILAND.city}, ${THAILAND.dateLabel}` },
  description:
    "A two-day summit in Bangkok on 1–2 July 2027 across longevity, holistic wellness and wellness real estate. One hall, a curated senior room, published prices.",
  alternates: { canonical: "/thailand" },
  robots: { index: false, follow: false },
};

export default function ThailandPage() {
  return (
    <main>
      <ThailandHero />
    </main>
  );
}

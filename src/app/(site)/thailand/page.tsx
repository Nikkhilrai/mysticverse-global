import type { Metadata } from "next";
import ThailandHero from "@/components/thailand/ThailandHero";
import ThailandOverview from "@/components/thailand/ThailandOverview";
import ThailandPillars from "@/components/thailand/ThailandPillars";
import ThailandDays from "@/components/thailand/ThailandDays";
import ThailandRoom from "@/components/thailand/ThailandRoom";
import ThailandSpeakers from "@/components/thailand/ThailandSpeakers";
import ThailandWhy from "@/components/thailand/ThailandWhy";
import ThailandRegister from "@/components/thailand/ThailandRegister";
import ThailandProgress from "@/components/thailand/ThailandProgress";
import { THAILAND, THAILAND_HERO, THAILAND_HERO_PHOTO } from "@/components/thailand/thailandData";
import { BANGKOK_PASSES, salesOpen } from "@/lib/passes";
import { SITE_URL } from "@/lib/site";

/*
  /thailand — MysticVerse Global 2.0, Bangkok, 1–2 July 2027.
  Built section by section from the dev brief (07-Dev-Brief-Bangkok-Page).

  LAUNCHED (brief §9 #3–5): indexable, first in the nav, in the
  sitemap, and linked from the homepage Bangkok card and Global Series.
*/
const DESCRIPTION =
  "A two-day summit in Bangkok on 1–2 July 2027 across longevity, holistic wellness and wellness real estate. One hall, a curated senior room, published prices.";

export const metadata: Metadata = {
  title: { absolute: `${THAILAND.editionLabel} | MysticVerse Global — ${THAILAND.city}, ${THAILAND.dateLabel}` },
  description: DESCRIPTION,
  alternates: { canonical: "/thailand" },
  openGraph: {
    title: `${THAILAND.editionName} — ${THAILAND.city}, ${THAILAND.dateLabel}`,
    description: THAILAND_HERO.headline.join(" "),
    type: "website",
    url: `${SITE_URL}/thailand`,
    images: [{ url: THAILAND_HERO_PHOTO.src, width: THAILAND_HERO_PHOTO.width, height: THAILAND_HERO_PHOTO.height, alt: THAILAND_HERO_PHOTO.alt }],
  },
};

/*
  Event schema (brief §10): name, dates, Bangkok location, scheduled,
  offers from the price table. The venue is not contracted (brief §11
  #1), so the location names the city only. Offers list the passes on
  sale through the Bangkok checkout — the unconfirmed Full Summit
  Standard price is not included. Availability follows the sales switch.
*/
const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: `${THAILAND.editionName} — ${THAILAND.editionLabel}`,
  description: DESCRIPTION,
  startDate: THAILAND.startDate,
  endDate: THAILAND.endDate,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  image: [`${SITE_URL}${THAILAND_HERO_PHOTO.src}`],
  url: `${SITE_URL}/thailand`,
  location: {
    "@type": "Place",
    name: `${THAILAND.city}, ${THAILAND.country}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: THAILAND.city,
      addressCountry: "TH",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "MysticVerse Global",
    url: SITE_URL,
  },
  offers: BANGKOK_PASSES.map((p) => ({
    "@type": "Offer",
    name: p.name,
    price: String(p.amountMinor / 100),
    priceCurrency: p.currency,
    availability: salesOpen("bangkok-2027")
      ? "https://schema.org/InStock"
      : "https://schema.org/PreOrder",
    url: `${SITE_URL}/register`,
  })),
};

export default function ThailandPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <ThailandProgress />
      <ThailandHero />
      <ThailandOverview />
      <ThailandPillars />
      <ThailandDays />
      <ThailandRoom />
      <ThailandSpeakers />
      <ThailandWhy />
      <ThailandRegister />
    </main>
  );
}

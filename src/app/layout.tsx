import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import UtmCapture from "@/components/analytics/UtmCapture";
import { SITE_URL, SITE_NAME, EVENT } from "@/lib/site";
import "./globals.css";

// Body + UI typeface.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

// Headline typeface — Fraunces (elegant soft-serif), self-hosted by Next.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  // Makes every relative OG/canonical URL across the site absolute.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MysticVerse Global 2026 | Where Conscious Luxury Meets Inner Mastery",
    template: "%s | MysticVerse Global 2026",
  },
  description:
    "11 September 2026, Dubai. One day. Four pillars. The curated convergence of wellness real estate, workplace wellbeing, longevity science, and contemplative traditions.",
  alternates: { canonical: "/" },
  keywords: [
    "wellness conference Dubai",
    "wellness real estate",
    "workplace wellbeing conference",
    "longevity conference",
    "conscious luxury",
    "MysticVerse Global 2026",
  ],
  openGraph: {
    title: "MysticVerse Global 2026",
    description:
      "11 September 2026, Dubai. Where conscious luxury meets inner mastery.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MysticVerse Global 2026",
    description:
      "11 September 2026, Dubai. Where conscious luxury meets inner mastery.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

/*
  Event structured data. Lets Google surface the date, venue and pass
  pricing directly in search results. Figures mirror src/lib/passes.ts —
  update both together if pricing changes.
*/
const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: EVENT.name,
  description: EVENT.description,
  startDate: EVENT.startDate,
  endDate: EVENT.endDate,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  image: [`${SITE_URL}/opengraph-image`],
  url: SITE_URL,
  location: {
    "@type": "Place",
    name: EVENT.venueName,
    address: {
      "@type": "PostalAddress",
      addressLocality: EVENT.addressLocality,
      addressCountry: EVENT.addressCountry,
    },
  },
  organizer: {
    "@type": "Organization",
    name: "MysticVerse Global",
    url: SITE_URL,
  },
  offers: [
    {
      "@type": "Offer",
      name: "Seeker Pass",
      price: "699",
      priceCurrency: "AED",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/register`,
      validFrom: "2026-01-01T00:00:00+04:00",
    },
    {
      "@type": "Offer",
      name: "Mystic Pass",
      price: "1399",
      priceCurrency: "AED",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/register`,
      validFrom: "2026-01-01T00:00:00+04:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
        <UtmCapture />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

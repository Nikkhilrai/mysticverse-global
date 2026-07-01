import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
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
  title: "MysticVerse Global 2026 | Where Conscious Luxury Meets Inner Mastery",
  description:
    "10 & 11 September 2026, Dubai. Two days. Four pillars. The curated convergence of wellness real estate, workplace wellbeing, longevity science, and contemplative traditions.",
  openGraph: {
    title: "MysticVerse Global 2026",
    description:
      "10 & 11 September 2026, Dubai. Where conscious luxury meets inner mastery.",
    locale: "en_GB",
    type: "website",
  },
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
        {children}
      </body>
    </html>
  );
}

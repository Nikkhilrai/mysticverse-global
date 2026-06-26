import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  // "block" prevents the flash-of-fallback on first paint; fonts are
  // self-hosted by next/font so the block period is imperceptibly short.
  display: "block",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
  display: "block",
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
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full">
          <Header />
          {children}
          <Footer />
        </body>
    </html>
  );
}

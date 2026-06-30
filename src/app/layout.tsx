import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Body + UI typeface. Headlines use Clash Display (loaded via Fontshare
// @import in globals.css). Clash Display will be self-hosted via
// next/font/local before production for zero-FOUT + no CDN dependency.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
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
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Clash Display — headline typeface. Self-host via
            next/font/local before production to drop the CDN dependency. */}
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
        />
      </head>
      <body className="min-h-full">
        {children}
      </body>
    </html>
  );
}

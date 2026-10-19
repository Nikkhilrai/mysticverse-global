import type { Metadata } from "next";
import ThailandHero from "@/components/thailand/ThailandHero";
import PastEditionDubai from "@/components/editions/PastEditionDubai";
import RepositioningStatement from "@/components/repositioning/RepositioningStatement";
import FourPillars from "@/components/pillars/FourPillars";
// import PavilionFeature from "@/components/pavilion/PavilionFeature"; — temporarily unpublished
import StatsSection from "@/components/stats/StatsSection";
import WhoIsInTheRoom from "@/components/room/WhoIsInTheRoom";
import ConfirmedPartners from "@/components/partners/ConfirmedPartners";
import JournalPreview from "@/components/journal/JournalPreview";
import UpcomingEditions from "@/components/editions/UpcomingEditions";
import { THAILAND } from "@/components/thailand/thailandData";

/*
  Homepage — Bangkok 2027 leads (the same hero as /thailand, with
  homepage buttons), Dubai 2026 follows as the past edition. The Dubai
  hero (HeroSection) and the "Next stop, Bangkok" section
  (BangkokEventSection) are no longer rendered here but are kept in the
  codebase.
*/

// The page is otherwise static content, but JournalPreview reads live
// posts from the database — revalidate periodically so a newly
// published article shows up here without waiting for a redeploy.
export const revalidate = 60;

export const metadata: Metadata = {
  title: {
    absolute: `MysticVerse Global 2.0 | ${THAILAND.city}, ${THAILAND.dateLabel} — Longevity, Holistic Wellness & Wellness Real Estate`,
  },
  description:
    "MysticVerse Global 2.0 — a two-day summit in Bangkok on 1–2 July 2027 across longevity, holistic wellness and wellness real estate. One hall, a curated senior room, published prices.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <ThailandHero
        kicker={`Next edition · ${THAILAND.editionName}`}
        primary={{ label: "Explore Bangkok 2027", href: "/thailand", track: "explore" }}
        secondary={{ label: "Book your pass", href: "/register", track: "register" }}
        scrollTo="#past-edition"
      />
      <PastEditionDubai />
      <RepositioningStatement />
      <FourPillars />
      {/* <PavilionFeature /> — temporarily unpublished */}
      <StatsSection />
      <WhoIsInTheRoom />
      <ConfirmedPartners />
      <JournalPreview />
      <UpcomingEditions />
    </main>
  );
}

import HeroSection from "@/components/hero/HeroSection";
import RepositioningStatement from "@/components/repositioning/RepositioningStatement";
import FourPillars from "@/components/pillars/FourPillars";
// import PavilionFeature from "@/components/pavilion/PavilionFeature"; — temporarily unpublished
import StatsSection from "@/components/stats/StatsSection";
import WhoIsInTheRoom from "@/components/room/WhoIsInTheRoom";
import ConfirmedPartners from "@/components/partners/ConfirmedPartners";
import JournalPreview from "@/components/journal/JournalPreview";
import UpcomingEditions from "@/components/editions/UpcomingEditions";

// The page is otherwise static content, but JournalPreview reads live
// posts from the database — revalidate periodically so a newly
// published article shows up here without waiting for a redeploy.
export const revalidate = 60;

export default function Home() {
  return (
    <main>
      <HeroSection />
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

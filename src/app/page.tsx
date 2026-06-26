import HeroSection from "@/components/hero/HeroSection";
import RepositioningStatement from "@/components/repositioning/RepositioningStatement";
import FourPillars from "@/components/pillars/FourPillars";
import PavilionFeature from "@/components/pavilion/PavilionFeature";
import StatsSection from "@/components/stats/StatsSection";
import WhoIsInTheRoom from "@/components/room/WhoIsInTheRoom";
import ConfirmedPartners from "@/components/partners/ConfirmedPartners";
import JournalPreview from "@/components/journal/JournalPreview";
import UpcomingEditions from "@/components/editions/UpcomingEditions";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <RepositioningStatement />
      <FourPillars />
      <PavilionFeature />
      <StatsSection />
      <WhoIsInTheRoom />
      <ConfirmedPartners />
      <JournalPreview />
      <UpcomingEditions />
    </main>
  );
}

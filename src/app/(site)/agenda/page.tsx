import type { Metadata } from "next";
import AgendaHero from "@/components/agenda/AgendaHero";
import AgendaSchedule from "@/components/agenda/AgendaSchedule";

export const metadata: Metadata = {
  title: "Agenda | MysticVerse Global 2026",
  description:
    "The MysticVerse Global Conference 2026 agenda — a day of keynotes, panels, immersive sessions, and the Excellence Awards. Where Ancient Wisdom Meets Modern Innovation. 11 September 2026, Dubai.",
  openGraph: {
    title: "Agenda — MysticVerse Global Conference 2026",
    description:
      "One curated day where ancient wisdom meets modern innovation. 11 September 2026, Dubai.",
    type: "website",
  },
};

export default function AgendaPage() {
  return (
    <main>
      <AgendaHero />
      <AgendaSchedule />
    </main>
  );
}

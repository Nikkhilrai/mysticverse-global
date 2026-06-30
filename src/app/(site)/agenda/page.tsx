import type { Metadata } from "next";
import AgendaHero from "@/components/agenda/AgendaHero";
import AgendaSchedule from "@/components/agenda/AgendaSchedule";

export const metadata: Metadata = {
  title: "Agenda | MysticVerse Global 2026",
  description:
    "The MysticVerse Global Conference 2026 agenda — two days of keynotes, panels, immersive sessions, and the Excellence Awards. Where Ancient Wisdom Meets Modern Innovation. 10 & 11 September 2026, Dubai.",
  openGraph: {
    title: "Agenda — MysticVerse Global Conference 2026",
    description:
      "Two curated days where ancient wisdom meets modern innovation. 10 & 11 September 2026, Dubai.",
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

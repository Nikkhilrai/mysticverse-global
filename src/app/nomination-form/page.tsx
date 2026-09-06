import type { Metadata } from "next";
import NominationForm from "@/components/awards/nominate/NominationForm";

export const metadata: Metadata = {
  alternates: { canonical: "/nomination-form" },
  title: "Excellence Awards 2026 — Official Nomination Form | MysticVerse Global",
  description:
    "Official nomination form for the MysticVerse Global Excellence Awards 2026 — 41 categories across conscious luxury living, workplace wellness, personal mastery, and ancient wisdom.",
  robots: { index: true, follow: true },
};

export default function NominatePage() {
  return (
    <main>
      <NominationForm />
    </main>
  );
}

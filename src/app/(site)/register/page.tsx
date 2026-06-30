import type { Metadata } from "next";
import InterestForm from "@/components/register/InterestForm";

export const metadata: Metadata = {
  title: "Register Interest | MysticVerse Global 2026",
  description:
    "Reserve your place at MysticVerse Global 2026 — share your details and preferred pass, and our team will be in touch with availability. 10 & 11 September 2026, Dubai.",
  openGraph: {
    title: "Register Interest — MysticVerse Global 2026",
    description: "Reserve your place in the room. 10 & 11 September 2026, Dubai.",
    type: "website",
  },
};

export default function RegisterPage() {
  return (
    <main>
      <InterestForm />
    </main>
  );
}

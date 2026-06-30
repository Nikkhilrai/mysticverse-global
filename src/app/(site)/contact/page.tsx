import type { Metadata } from "next";
import ContactSection from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact | MysticVerse Global 2026",
  description:
    "Start a conversation with the MysticVerse Global team — delegate passes, partnerships, speaking, and press. 10 & 11 September 2026, Dubai.",
  openGraph: {
    title: "Contact — MysticVerse Global 2026",
    description: "Start a conversation with the MysticVerse Global team.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main>
      <ContactSection />
    </main>
  );
}

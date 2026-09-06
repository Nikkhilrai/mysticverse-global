import type { Metadata } from "next";
import PassesSection from "@/components/register/PassesSection";
import InterestForm from "@/components/register/InterestForm";

/* Kept on a revalidate window rather than fully static so pass pricing
   changes go live without a redeploy. */
export const revalidate = 300;

export const metadata: Metadata = {
  alternates: { canonical: "/register" },
  title: "Register & Passes | MysticVerse Global 2026",
  description:
    "Book your pass for MysticVerse Global 2026 — Seeker Pass (AED 699, was AED 999) or Mystic Pass (AED 1399, was AED 1999). Secure checkout for 11 September 2026, Dubai. Or register your interest and our team will be in touch.",
  openGraph: {
    title: "Register & Passes — MysticVerse Global 2026",
    description: "Book your pass in minutes. 11 September 2026, Dubai.",
    type: "website",
  },
};

export default function RegisterPage() {
  return (
    <main>
      <PassesSection />
      <InterestForm />
    </main>
  );
}

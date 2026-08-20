import type { Metadata } from "next";
import PassesSection from "@/components/register/PassesSection";
import InterestForm from "@/components/register/InterestForm";
import { getFeaturedPromo } from "@/lib/promo";

/* Revalidated rather than static: the promo banner reflects a live
   coupon row, so it can retire itself when the code expires. */
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Register & Passes | MysticVerse Global 2026",
  description:
    "Book your pass for MysticVerse Global 2026 — Seeker Pass (AED 699, was AED 999) or Mystic Pass (AED 1399, was AED 1999). Secure checkout for 11 September 2026, Dubai. Or register your interest and our team will be in touch.",
  openGraph: {
    title: "Register & Passes — MysticVerse Global 2026",
    description: "Book your pass in minutes. 11 September 2026, Dubai.",
    type: "website",
  },
};

export default async function RegisterPage() {
  const promo = await getFeaturedPromo();

  return (
    <main>
      <PassesSection promo={promo} />
      <InterestForm />
    </main>
  );
}

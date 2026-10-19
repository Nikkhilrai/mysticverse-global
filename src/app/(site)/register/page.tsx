import type { Metadata } from "next";
import BangkokPasses from "@/components/register/BangkokPasses";

/*
  /register now carries the next edition — MysticVerse Global 2.0,
  Bangkok, 1–2 July 2027 — as pass cards (interest only; no checkout
  until the refund and transfer policy is written).

  The concluded Dubai 2026 sections (PassesSection, closed; and
  InterestForm, closed) are no longer rendered here but are kept in
  the codebase, gated by PASSES_OPEN / INTEREST_OPEN.
*/

/* Kept on a revalidate window rather than fully static so pass pricing
   changes go live without a redeploy. */
export const revalidate = 300;

export const metadata: Metadata = {
  alternates: { canonical: "/register" },
  title: { absolute: "Register & Passes | MysticVerse Global — Bangkok 2027" },
  description:
    "Passes for MysticVerse Global 2.0 in Bangkok, 1–2 July 2027 — Day 1 from USD 199, Day 2 USD 179, Full Summit early bird USD 299. Every price published. Register your interest.",
  openGraph: {
    title: "Register & Passes — MysticVerse Global 2.0, Bangkok",
    description: "1–2 July 2027, Bangkok. Every price published.",
    type: "website",
  },
};

export default function RegisterPage() {
  return (
    <main>
      <BangkokPasses />
    </main>
  );
}

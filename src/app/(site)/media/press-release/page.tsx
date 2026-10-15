import type { Metadata } from "next";
import PressRelease from "@/components/press/PressRelease";
import { RELEASE } from "@/components/press/pressReleaseData";

export const metadata: Metadata = {
  alternates: { canonical: "/media/press-release" },
  title: "Press Release",
  description: RELEASE.standfirst,
  openGraph: {
    title: RELEASE.title,
    description: RELEASE.standfirst,
    type: "article",
    images: [{ url: RELEASE.hero.photo.url, width: RELEASE.hero.photo.width, height: RELEASE.hero.photo.height }],
  },
};

export default function PressReleasePage() {
  return <PressRelease />;
}

import ConcludedEditionNote from "@/components/editions/ConcludedEditionNote";

/* The 4 Pillars (and each pillar page) are Dubai 2026 content —
   labelled as the concluded edition (brief §9 #5). */
export default function PillarsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ConcludedEditionNote />
    </>
  );
}

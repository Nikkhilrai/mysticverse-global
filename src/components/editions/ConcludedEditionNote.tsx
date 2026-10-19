import Link from "next/link";
import { THAILAND } from "@/components/thailand/thailandData";
import styles from "./ConcludedEditionNote.module.css";

/*
  Labels a Dubai 2026 page as the concluded edition (brief §9 #5: keep
  the old Dubai pages live for reference and press, out of the primary
  nav, "labelled clearly as the concluded 2026 edition"). A small pill
  pinned to the bottom of the viewport — it can't sit at the top,
  where these pages' full-bleed heroes run under the transparent
  header — linking on to the next edition.
*/
export default function ConcludedEditionNote() {
  return (
    <aside className={styles.note} aria-label="Edition notice">
      <span className={styles.badge}>2026 edition · concluded</span>
      <span className={styles.text}>
        MysticVerse Global 2026 took place on 11 September in Dubai.
      </span>
      <Link href="/thailand" className={styles.link}>
        Next: {THAILAND.city}, {THAILAND.dateLabel} <span aria-hidden="true">→</span>
      </Link>
    </aside>
  );
}

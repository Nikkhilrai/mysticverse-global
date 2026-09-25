import Link from "next/link";
import styles from "./NominationClosed.module.css";

/* Shown at /nomination-form once the 2026 awards have been presented. */
export default function NominationClosed() {
  return (
    <section className={styles.section} aria-labelledby="nomination-closed-title">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <span className={styles.mark} aria-hidden="true">✦</span>
        <p className={styles.overline}>Excellence Awards 2026</p>
        <h1 id="nomination-closed-title" className={styles.title}>
          Nominations are <span className="gradientText">closed.</span>
        </h1>
        <p className={styles.text}>
          The MysticVerse Global Excellence Awards 2026 were presented on
          11 September in Dubai, so entries are no longer being accepted.
          Congratulations to every honouree.
        </p>
        <div className={styles.actions}>
          <Link href="/awards" className={styles.primary}>
            Meet the awardees <span aria-hidden="true">→</span>
          </Link>
          <Link href="/gallery" className={styles.secondary}>
            View event gallery
          </Link>
        </div>
      </div>
    </section>
  );
}

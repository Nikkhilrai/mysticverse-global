import { EVENT } from "@/lib/site";
import { NOMINATION_FEE_USD } from "@/lib/awardCategories";
import styles from "./NominationForm.module.css";

function fmtDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}

export default function NominationIntro() {
  return (
    <section className={styles.hero} aria-label="Nomination form introduction">
      <div className={styles.heroInner}>
        <p className={styles.eyebrow}>Official Nomination Form</p>
        <h1 className={styles.title}>MysticVerse Global Excellence Awards 2026</h1>
        <p className={styles.subtitle}>
          Recognising the projects, leaders, and platforms shaping the conscious luxury
          economy, human capital, longevity, and transformational wisdom. Awarded on the
          main stage as the conference closes — the flagship moment of the event.
        </p>
        <div className={styles.factsRow}>
          <span className={styles.fact}><span className={styles.factLabel}>Date</span>{fmtDate(EVENT.startDate)}</span>
          <span className={styles.fact}><span className={styles.factLabel}>Investment</span>USD ${NOMINATION_FEE_USD} per category entry</span>
          <span className={styles.fact}><span className={styles.factLabel}>Organised by</span>MantraNex Vista Pvt. Ltd.</span>
        </div>
      </div>
    </section>
  );
}

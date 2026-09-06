import { EVENT } from "@/lib/site";
import {
  MIN_BUNDLE_SEATS,
  TEAM_DISCOUNT_PCT,
  perSeatPrice,
  formatAed,
} from "@/lib/corporate";
import styles from "./CorporatePage.module.css";

function fmtDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export default function CorporateHero() {
  return (
    <section className={styles.hero} aria-label="Corporate bundles">
      <div className={styles.heroInner}>
        <p className={styles.eyebrow}>Corporate Bundles</p>
        <h1 className={styles.title}>Bring your core team into the right room.</h1>

        <p className={styles.sub}>
          A one day experience designed for organisations that are actively thinking
          about performance, people, and long term sustainability as one connected
          priority.
        </p>

        <p className={styles.subBody}>
          The conversations go beyond surface level wellbeing. This is where leadership
          teams explore how burnout impacts decision making and output, what resilient
          leadership looks like in practice, how high performing teams are built and
          sustained, and why culture and energy are becoming real competitive
          advantages.
        </p>

        <p className={styles.subBody}>
          It is relevant for founders, leadership teams, operators, and people managers
          who are responsible for building and sustaining teams.
        </p>

        <p className={styles.heroOffer}>
          Bring {MIN_BUNDLE_SEATS} or more from your organisation and access a{" "}
          <strong>{TEAM_DISCOUNT_PCT} percent bundled rate</strong> on a single
          consolidated invoice.
        </p>

        <div className={styles.factsRow}>
          <span className={styles.fact}>
            <span className={styles.factLabel}>Date</span>{fmtDate(EVENT.startDate)}
          </span>
          <span className={styles.fact}>
            <span className={styles.factLabel}>Venue</span>{EVENT.venueName}, {EVENT.addressLocality}
          </span>
          <span className={styles.fact}>
            <span className={styles.factLabel}>Team Rate</span>
            {formatAed(perSeatPrice("seeker", TEAM_DISCOUNT_PCT))} per seat for groups
            of {MIN_BUNDLE_SEATS} or more
          </span>
        </div>
      </div>
    </section>
  );
}

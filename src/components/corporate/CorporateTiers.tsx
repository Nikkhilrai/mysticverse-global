import {
  CORPORATE_TIERS,
  MIN_BUNDLE_SEATS,
  perSeatPrice,
  fullSeatPrice,
  seatRangeLabel,
  formatAed,
} from "@/lib/corporate";
import styles from "./CorporatePage.module.css";

const TOPICS = [
  {
    name: "Enterprise Risk & Retention",
    desc: "Quantifying the organisational cost of burnout, mental health absence, and key-role attrition.",
  },
  {
    name: "Leadership Resilience",
    desc: "Stress-regulation frameworks and mental focus strategies for high-pressure executive decision-making.",
  },
  {
    name: "Workforce Policy & Architecture",
    desc: "Physical office environments, hybrid work policies, and modern benefits infrastructure.",
  },
  {
    name: "Conscious Leadership",
    desc: "Developing emotional intelligence alongside automated tools and digital workflows.",
  },
] as const;

export default function CorporateTiers() {
  const full = fullSeatPrice("seeker");

  return (
    <>
      <div className={styles.sectionHead}>
        <p className={styles.sectionEyebrow}>Pricing</p>
        <h2 className={styles.sectionTitle}>The team rate</h2>
        <p className={styles.sectionSub}>
          Available for groups of {MIN_BUNDLE_SEATS} or more, on the Seeker Pass —
          billed once, on a single invoice.
        </p>
      </div>

      {CORPORATE_TIERS.map((tier) => (
        <div key={tier.id} className={styles.offer}>
          <div className={styles.offerPricing}>
            <span className={styles.tierBadge}>{seatRangeLabel(tier)}</span>
            <span className={styles.offerDiscount}>{tier.discountPct}% off</span>
            <div className={styles.tierPriceRow}>
              <span className={styles.offerPrice}>
                {formatAed(perSeatPrice("seeker", tier.discountPct))}
              </span>
              <s className={styles.tierPriceWas}>{formatAed(full)}</s>
            </div>
            <p className={styles.tierPriceMeta}>per seat, incl. taxes</p>
            <p className={styles.offerExample}>
              {MIN_BUNDLE_SEATS} seats ={" "}
              <strong>
                {formatAed(perSeatPrice("seeker", tier.discountPct) * MIN_BUNDLE_SEATS)}
              </strong>{" "}
              instead of {formatAed(full * MIN_BUNDLE_SEATS)}
            </p>
          </div>

          <ul className={styles.offerPerks}>
            {tier.perks.map((perk) => (
              <li key={perk} className={styles.tierPerk}>
                <span className={styles.tierCheck} aria-hidden="true">✓</span>
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <p className={styles.tierNote}>
        Fewer than {MIN_BUNDLE_SEATS} seats? Standard pricing applies — you can book
        directly on the <a href="/register">register page</a>. Mystic Pass groups are
        also available; tell us which you need and we&apos;ll include both in your
        proposal.
      </p>

      <div className={styles.sectionHead}>
        <p className={styles.sectionEyebrow}>The programme</p>
        <h2 className={styles.sectionTitle}>What your team takes away</h2>
        <p className={styles.sectionSub}>
          Sessions built for the people setting wellbeing policy, not a general
          wellness audience.
        </p>
      </div>

      <div className={styles.topicGrid}>
        {TOPICS.map((t) => (
          <div key={t.name} className={styles.topic}>
            <span className={styles.topicName}>{t.name}</span>
            <span className={styles.topicDesc}>{t.desc}</span>
          </div>
        ))}
      </div>
    </>
  );
}

import { COUNTRIES } from "@/lib/countries";
import { NOMINATION_FEE_USD } from "@/lib/awardCategories";
import type { NominationFormData, FormUpdate } from "./types";
import styles from "./NominationForm.module.css";

export default function PaymentSection({
  value,
  onChange,
  categoryCount,
  submitting,
}: {
  value: NominationFormData;
  onChange: FormUpdate;
  categoryCount: number;
  submitting: boolean;
}) {
  const total = categoryCount * NOMINATION_FEE_USD;

  return (
    <div className={styles.part}>
      <p className={styles.partNo}>Part 5</p>
      <h2 className={styles.partTitle}>Investment & Terms</h2>

      <div className={styles.feeSummary}>
        <span className={styles.feeSummaryLabel}>
          {categoryCount} categor{categoryCount === 1 ? "y" : "ies"} × USD ${NOMINATION_FEE_USD}
        </span>
        <span className={styles.feeSummaryValue}>USD ${total.toLocaleString("en-US")}</span>
      </div>

      <div className={styles.noticeBlock}>
        <p className={styles.noticeTitle}>Terms & Delegate Benefits</p>
        <ul className={styles.noticeList}>
          <li>Nominations are evaluated by an independent advisory board and global jury.</li>
          <li>The nomination evaluation fee is non-refundable once submitted for review.</li>
          <li>
            Delegate benefits include social media features, an article on the website and in
            the MysticVerse magazine, presence on the website as an awardee, and inclusion in
            the event show guide.
          </li>
        </ul>
      </div>

      <label className={styles.label} style={{ marginBottom: "0.6rem", display: "block" }}>Payment Method</label>
      <div className={styles.paymentToggle}>
        <button
          type="button"
          className={`${styles.paymentOption}${value.paymentMethodPreference === "card" ? ` ${styles.paymentOptionActive}` : ""}`}
          onClick={() => onChange({ paymentMethodPreference: "card" })}
        >
          <span className={styles.paymentOptionTitle}>Card</span>
          <span className={styles.paymentOptionDesc}>Pay instantly via secure checkout</span>
        </button>
        <button
          type="button"
          className={`${styles.paymentOption}${value.paymentMethodPreference === "wire" ? ` ${styles.paymentOptionActive}` : ""}`}
          onClick={() => onChange({ paymentMethodPreference: "wire" })}
        >
          <span className={styles.paymentOptionTitle}>International Wire Transfer</span>
          <span className={styles.paymentOptionDesc}>We'll email you wire instructions</span>
        </button>
      </div>

      <p className={styles.subsectionTitle}>Billing Address</p>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="billingName">Billing Name</label>
        <input
          id="billingName"
          className={styles.input}
          value={value.billingName}
          onChange={(e) => onChange({ billingName: e.target.value })}
        />
      </div>
      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="billingAddressLine1">Address Line 1</label>
          <input
            id="billingAddressLine1"
            className={styles.input}
            value={value.billingAddressLine1}
            onChange={(e) => onChange({ billingAddressLine1: e.target.value })}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="billingAddressLine2">Address Line 2 <span className={styles.optional}>(optional)</span></label>
          <input
            id="billingAddressLine2"
            className={styles.input}
            value={value.billingAddressLine2}
            onChange={(e) => onChange({ billingAddressLine2: e.target.value })}
          />
        </div>
      </div>
      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="billingCity">City</label>
          <input
            id="billingCity"
            className={styles.input}
            value={value.billingCity}
            onChange={(e) => onChange({ billingCity: e.target.value })}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="billingState">State / Province</label>
          <input
            id="billingState"
            className={styles.input}
            value={value.billingState}
            onChange={(e) => onChange({ billingState: e.target.value })}
          />
        </div>
      </div>
      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="billingPostalCode">Postal Code</label>
          <input
            id="billingPostalCode"
            className={styles.input}
            value={value.billingPostalCode}
            onChange={(e) => onChange({ billingPostalCode: e.target.value })}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="billingCountry">Country</label>
          <select
            id="billingCountry"
            className={styles.select}
            value={value.billingCountry}
            onChange={(e) => onChange({ billingCountry: e.target.value })}
          >
            <option value="">Select a country</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <label className={styles.declarationRow}>
        <input
          type="checkbox"
          checked={value.declarationAccepted}
          onChange={(e) => onChange({ declarationAccepted: e.target.checked })}
          required
        />
        <span className={styles.declarationText}>
          I confirm that the information provided is accurate and true to the best of my knowledge.
        </span>
      </label>

      <button type="submit" className={styles.submit} disabled={submitting} style={{ marginTop: "1.25rem" }}>
        {submitting
          ? "Processing…"
          : value.paymentMethodPreference === "wire"
            ? `Submit Nomination — USD $${total.toLocaleString("en-US")}`
            : `Submit & Pay $${total.toLocaleString("en-US")}`}
      </button>
    </div>
  );
}

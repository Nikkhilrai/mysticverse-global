import { COUNTRIES } from "@/lib/countries";
import type { NominationFormData, FormUpdate } from "./types";
import styles from "./NominationForm.module.css";

const NOMINATION_TYPES = [
  "Self-Nomination",
  "Nominating an Individual",
  "Nominating an Entity/Organization/Brand",
  "Nominating a Specific Project/Development",
] as const;

export default function NominatorFields({
  value,
  onChange,
}: {
  value: NominationFormData;
  onChange: FormUpdate;
}) {
  return (
    <div className={styles.part}>
      <p className={styles.partNo}>Part 2 · Section A</p>
      <h2 className={styles.partTitle}>Nominator / Applicant Details</h2>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="nominatorName">Full Name of Nominator</label>
          <input
            id="nominatorName"
            className={styles.input}
            value={value.nominatorName}
            onChange={(e) => onChange({ nominatorName: e.target.value })}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="nominatorTitle">Professional Designation / Title</label>
          <input
            id="nominatorTitle"
            className={styles.input}
            value={value.nominatorTitle}
            onChange={(e) => onChange({ nominatorTitle: e.target.value })}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="nominatorOrganisation">Organisation / Company Name</label>
        <input
          id="nominatorOrganisation"
          className={styles.input}
          value={value.nominatorOrganisation}
          onChange={(e) => onChange({ nominatorOrganisation: e.target.value })}
        />
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="nominatorEmail">Official Email Address</label>
          <input
            id="nominatorEmail"
            type="email"
            className={styles.input}
            value={value.nominatorEmail}
            onChange={(e) => onChange({ nominatorEmail: e.target.value })}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="nominatorPhone">Phone / WhatsApp (with country code)</label>
          <input
            id="nominatorPhone"
            type="tel"
            className={styles.input}
            placeholder="+971 00 000 0000"
            value={value.nominatorPhone}
            onChange={(e) => onChange({ nominatorPhone: e.target.value })}
          />
        </div>
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="nominatorCountry">Country / Region of Operation</label>
          <select
            id="nominatorCountry"
            className={styles.select}
            value={value.nominatorCountry}
            onChange={(e) => onChange({ nominatorCountry: e.target.value })}
          >
            <option value="">Select a country</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="nominationType">Nomination Type</label>
          <select
            id="nominationType"
            className={styles.select}
            value={value.nominationType}
            onChange={(e) => onChange({ nominationType: e.target.value })}
          >
            {NOMINATION_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

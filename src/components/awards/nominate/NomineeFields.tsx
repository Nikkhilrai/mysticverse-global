import type { NominationFormData, FormUpdate } from "./types";
import styles from "./NominationForm.module.css";

export default function NomineeFields({
  value,
  onChange,
  sameAsNominator,
  onSameAsNominatorChange,
}: {
  value: NominationFormData;
  onChange: FormUpdate;
  sameAsNominator: boolean;
  onSameAsNominatorChange: (checked: boolean) => void;
}) {
  return (
    <div className={styles.part}>
      <p className={styles.partNo}>Part 2 · Section B</p>
      <h2 className={styles.partTitle}>Nominee Details</h2>
      <p className={styles.partIntro}>If different from the nominator above.</p>

      <label className={styles.checkboxRow} style={{ marginBottom: "1.25rem" }}>
        <input
          type="checkbox"
          checked={sameAsNominator}
          onChange={(e) => onSameAsNominatorChange(e.target.checked)}
        />
        Same as nominator (self-nomination)
      </label>

      {!sameAsNominator && (
        <>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="nomineeName">Nominee Full Name / Project Name / Brand Name</label>
            <input
              id="nomineeName"
              className={styles.input}
              value={value.nomineeName}
              onChange={(e) => onChange({ nomineeName: e.target.value })}
            />
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="nomineeTitle">Nominee Designation / Leadership Title</label>
              <input
                id="nomineeTitle"
                className={styles.input}
                value={value.nomineeTitle}
                onChange={(e) => onChange({ nomineeTitle: e.target.value })}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="nomineeEmail">Nominee Official Email Address</label>
              <input
                id="nomineeEmail"
                type="email"
                className={styles.input}
                value={value.nomineeEmail}
                onChange={(e) => onChange({ nomineeEmail: e.target.value })}
              />
            </div>
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="nomineePhone">Nominee Direct Contact Number</label>
              <input
                id="nomineePhone"
                type="tel"
                className={styles.input}
                value={value.nomineePhone}
                onChange={(e) => onChange({ nomineePhone: e.target.value })}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="nomineeWebsite">Company / Project Website URL</label>
              <input
                id="nomineeWebsite"
                type="text"
                className={styles.input}
                placeholder="https://"
                value={value.nomineeWebsite}
                onChange={(e) => onChange({ nomineeWebsite: e.target.value })}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="nomineeLinkedin">LinkedIn / Official Profile Link</label>
            <input
              id="nomineeLinkedin"
              type="text"
              className={styles.input}
              placeholder="https://"
              value={value.nomineeLinkedin}
              onChange={(e) => onChange({ nomineeLinkedin: e.target.value })}
            />
          </div>
        </>
      )}
    </div>
  );
}

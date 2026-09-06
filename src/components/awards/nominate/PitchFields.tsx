import type { UploadedDocument } from "@/lib/nomination-upload";
import type { NominationFormData, FormUpdate } from "./types";
import DocumentUpload from "./DocumentUpload";
import VideoLinksField from "./VideoLinksField";
import styles from "./NominationForm.module.css";

function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

function WordCounter({ text, max }: { text: string; max: number }) {
  const count = countWords(text);
  const over = count > max;
  return (
    <div className={styles.counterRow}>
      <span className={`${styles.counter}${over ? ` ${styles.counterOver}` : ""}`}>
        {count} / {max} words{over ? " — consider tightening this" : ""}
      </span>
    </div>
  );
}

export default function PitchFields({
  value,
  onChange,
  onDocumentsChange,
  videoLinks,
  onVideoLinksChange,
}: {
  value: NominationFormData;
  onChange: FormUpdate;
  onDocumentsChange: (documents: UploadedDocument[]) => void;
  videoLinks: string[];
  onVideoLinksChange: (links: string[]) => void;
}) {
  return (
    <div className={styles.part}>
      <p className={styles.partNo}>Part 4</p>
      <h2 className={styles.partTitle}>Executive Pitch & Submission Details</h2>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="executiveSummary">
          Executive Summary / Nomination Abstract <span className={styles.optional}>(max 250 words)</span>
        </label>
        <textarea
          id="executiveSummary"
          className={styles.textarea}
          placeholder="A concise overview of the nominee, project, or brand and why it deserves global recognition in the selected category."
          value={value.executiveSummary}
          onChange={(e) => onChange({ executiveSummary: e.target.value })}
          required
        />
        <WordCounter text={value.executiveSummary} max={250} />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="keyAchievements">
          Key Achievements & Measurable Outcomes <span className={styles.optional}>(max 500 words)</span>
        </label>
        <textarea
          id="keyAchievements"
          className={styles.textarea}
          placeholder="Specific impact metrics, achievements, innovations, or tangible outcomes delivered over the past 12–24 months."
          value={value.keyAchievements}
          onChange={(e) => onChange({ keyAchievements: e.target.value })}
          required
        />
        <WordCounter text={value.keyAchievements} max={500} />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="alignmentStatement">
          Alignment with Conscious Living & Human Transformation <span className={styles.optional}>(max 300 words)</span>
        </label>
        <textarea
          id="alignmentStatement"
          className={styles.textarea}
          placeholder="How the project or individual connects wisdom with innovation and drives the conscious luxury or wellness economy forward."
          value={value.alignmentStatement}
          onChange={(e) => onChange({ alignmentStatement: e.target.value })}
          required
        />
        <WordCounter text={value.alignmentStatement} max={300} />
      </div>

      <DocumentUpload onChange={onDocumentsChange} />
      <VideoLinksField links={videoLinks} onChange={onVideoLinksChange} />
    </div>
  );
}

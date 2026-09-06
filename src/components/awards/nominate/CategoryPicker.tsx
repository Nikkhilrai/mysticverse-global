import {
  PILLARS,
  getCategoriesByPillar,
  NOMINATION_FEE_USD,
  MAX_CATEGORIES_PER_NOMINATION,
} from "@/lib/awardCategories";
import styles from "./NominationForm.module.css";

export default function CategoryPicker({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (name: string) => void;
}) {
  const total = selected.length * NOMINATION_FEE_USD;
  const atLimit = selected.length >= MAX_CATEGORIES_PER_NOMINATION;

  return (
    <div className={styles.part}>
      <p className={styles.partNo}>Part 3</p>
      <h2 className={styles.partTitle}>Award Categories</h2>
      <p className={styles.partIntro}>
        Select up to {MAX_CATEGORIES_PER_NOMINATION} categories you wish to enter. Each
        selected category requires a single nomination fee of USD ${NOMINATION_FEE_USD}.
      </p>

      {PILLARS.map((pillar) => (
        <div key={pillar.id} className={styles.pillarGroup}>
          <h3 className={styles.pillarName}>{pillar.name}</h3>
          {pillar.focus && (
            <p className={styles.pillarFocus}>Focus: {pillar.focus}</p>
          )}
          <div className={styles.categoryGrid}>
            {getCategoriesByPillar(pillar.id).map((cat) => {
              const active = selected.includes(cat.name);
              const disabled = !active && atLimit;
              return (
                <label
                  key={cat.id}
                  className={`${styles.categoryCard}${active ? ` ${styles.categoryCardActive}` : ""}${disabled ? ` ${styles.categoryCardDisabled}` : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={active}
                    disabled={disabled}
                    onChange={() => onToggle(cat.name)}
                  />
                  <span className={styles.categoryText}>
                    <span className={styles.categoryName}>{cat.name}</span>
                    <span className={styles.categoryDesc}>{cat.description}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      ))}

      <div className={styles.totalBar}>
        <span className={styles.totalLabel}>
          {selected.length} of {MAX_CATEGORIES_PER_NOMINATION} categories selected
          {atLimit && " — maximum reached"}
        </span>
        <span className={styles.totalValue}>USD ${total.toLocaleString("en-US")}</span>
      </div>
    </div>
  );
}

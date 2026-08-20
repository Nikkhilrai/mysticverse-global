import styles from "./NominationForm.module.css";

export default function VideoLinksField({
  links,
  onChange,
}: {
  links: string[];
  onChange: (links: string[]) => void;
}) {
  const update = (i: number, value: string) => {
    const next = [...links];
    next[i] = value;
    onChange(next);
  };

  const remove = (i: number) => onChange(links.filter((_, idx) => idx !== i));

  const add = () => onChange([...links, ""]);

  return (
    <div className={styles.field}>
      <label className={styles.label}>
        Web Links to Video Pitches or Media <span className={styles.optional}>(optional)</span>
      </label>

      {links.map((link, i) => (
        <div key={i} className={styles.linkRow}>
          <input
            type="text"
            className={styles.input}
            placeholder="https://"
            value={link}
            onChange={(e) => update(i, e.target.value)}
          />
          <button type="button" className={styles.removeLinkBtn} onClick={() => remove(i)}>
            Remove
          </button>
        </div>
      ))}

      <button type="button" className={styles.addLinkBtn} onClick={add}>
        + Add a link
      </button>
    </div>
  );
}

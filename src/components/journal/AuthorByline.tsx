import Image from "next/image";
import styles from "./AuthorByline.module.css";

export interface AuthorBylineData {
  name: string;
  role: string | null;
  image: string | null;
  bio: string | null;
  linkedin: string | null;
  twitter: string | null;
  website: string | null;
}

export default function AuthorByline({ author }: { author: AuthorBylineData }) {
  const hasLinks = author.linkedin || author.twitter || author.website;

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        {author.image ? (
          <div className={styles.avatarWrap}>
            <Image src={author.image} alt={author.name} fill className={styles.avatar} sizes="72px" />
          </div>
        ) : (
          <span className={styles.avatarFallback} aria-hidden="true">
            {author.name.charAt(0).toUpperCase()}
          </span>
        )}

        <div className={styles.body}>
          <p className={styles.eyebrow}>Written by</p>
          <h3 className={styles.name}>
            {author.name}
            {author.role && <span className={styles.role}> — {author.role}</span>}
          </h3>
          {author.bio && <p className={styles.bio}>{author.bio}</p>}

          {hasLinks && (
            <div className={styles.links}>
              {author.linkedin && (
                <a href={author.linkedin} target="_blank" rel="noopener noreferrer" className={styles.link} aria-label={`${author.name} on LinkedIn`}>
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.15 1.45-2.15 2.94v5.66H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.44v6.3zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.11 20.45H3.56V9h3.55v11.45z" />
                  </svg>
                </a>
              )}
              {author.twitter && (
                <a href={author.twitter} target="_blank" rel="noopener noreferrer" className={styles.link} aria-label={`${author.name} on X`}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                    <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7l-5.5-7.2L4.5 22H1.3l8.1-9.3L1 2h7.2l5 6.6L18.9 2zm-1.2 18h1.7L7.4 3.9H5.6L17.7 20z" />
                  </svg>
                </a>
              )}
              {author.website && (
                <a href={author.website} target="_blank" rel="noopener noreferrer" className={styles.link} aria-label={`${author.name}'s website`}>
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18M12 3c2.4 2.5 3.6 5.6 3.6 9s-1.2 6.5-3.6 9c-2.4-2.5-3.6-5.6-3.6-9S9.6 5.5 12 3z" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

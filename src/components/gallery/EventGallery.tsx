"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import styles from "./EventGallery.module.css";
import { GALLERY_PHOTOS } from "./galleryData";

/** Inserts a Cloudinary transformation segment right after `/upload/`. */
function cld(url: string, transform: string): string {
  return url.replace("/upload/", `/upload/${transform}/`);
}

const pad = (n: number) => String(n + 1).padStart(3, "0");

export default function EventGallery() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const go = useCallback(
    (dir: number) =>
      setActive((cur) =>
        cur === null ? cur : (cur + dir + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length,
      ),
    [],
  );

  useEffect(() => {
    if (active === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, go]);

  const photo = active === null ? null : GALLERY_PHOTOS[active];

  return (
    <section className={styles.section} aria-label="Event photo gallery">
      <div className={styles.inner}>
        <div className={styles.grid}>
          {GALLERY_PHOTOS.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className={styles.tile}
              style={{ aspectRatio: `${p.width} / ${p.height}` }}
              onClick={() => setActive(i)}
              aria-label={`View photo ${i + 1} of ${GALLERY_PHOTOS.length}`}
            >
              <Image
                src={cld(p.url, "f_auto,q_auto,c_fill,w_500")}
                alt=""
                fill
                sizes="(max-width: 640px) 46vw, (max-width: 1000px) 30vw, 220px"
                className={styles.tileImg}
                loading={i < 8 ? "eager" : "lazy"}
              />
            </button>
          ))}
        </div>
      </div>

      {photo && active !== null && (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Event photo">
          <div className={styles.backdrop} onClick={close} />

          <button type="button" className={styles.close} onClick={close} aria-label="Close">
            <span aria-hidden="true">✕</span>
          </button>

          <button
            type="button"
            className={`${styles.navBtn} ${styles.navPrev}`}
            onClick={() => go(-1)}
            aria-label="Previous photo"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className={`${styles.navBtn} ${styles.navNext}`}
            onClick={() => go(1)}
            aria-label="Next photo"
          >
            <span aria-hidden="true">→</span>
          </button>

          <div className={styles.frame}>
            <Image
              key={photo.id}
              src={cld(photo.url, "f_auto,q_auto,w_1800")}
              alt=""
              width={photo.width}
              height={photo.height}
              className={styles.frameImg}
              sizes="90vw"
              priority
            />
          </div>

          <span className={styles.counter}>
            {pad(active)} <span className={styles.counterSep}>/</span> {pad(GALLERY_PHOTOS.length - 1)}
          </span>
        </div>
      )}
    </section>
  );
}

import Image from "next/image";
import styles from "./CoverImage.module.css";

/*
  Shows a blog cover whole, whatever its aspect ratio. Covers range
  from portrait to square to 16:9 and many carry baked-in text, so
  cropping them to a fixed frame clips words. Instead the image is
  contained (never cropped) over a blurred, enlarged copy of itself
  that fills the frame. The backdrop loads a tiny variant, so the
  extra request is a few KB.

  The parent must be position: relative with overflow: hidden.
*/
export default function CoverImage({
  src,
  alt,
  sizes,
  priority = false,
  imageClassName,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  /** Extra class for the contained image — e.g. a parent-driven hover zoom. */
  imageClassName?: string;
}) {
  return (
    <>
      <Image src={src} alt="" aria-hidden fill sizes="64px" className={styles.ambient} />
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`${styles.image}${imageClassName ? ` ${imageClassName}` : ""}`}
      />
    </>
  );
}

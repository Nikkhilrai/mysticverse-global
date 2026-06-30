"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./PartnerBanner.module.css";

export default function PartnerBanner() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); io.disconnect(); }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.section}${visible ? ` ${styles.visible}` : ""}`}
      aria-label="Featured partner"
    >
      <div className={styles.inner}>
        <p className={styles.label}>Featured Partner</p>
        <a
          href="https://www.vanikabirstudio.com"
          className={styles.banner}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Vani Kabir Studio — Lightcoded Crystals & Sacred Energy Tools"
        >
          <Image
            src="/images/partners/banner-vks.jpg"
            alt="Vani Kabir Studio — Lightcoded Crystals & Sacred Energy Tools"
            width={1600}
            height={263}
            sizes="100vw"
            priority
            className={styles.image}
          />
        </a>
      </div>
    </section>
  );
}

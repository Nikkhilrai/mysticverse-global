"use client";

import { useEffect, useRef, useState } from "react";
import { ADDONS } from "@/lib/sponsorship";
import styles from "./SponsorAddons.module.css";

export default function SponsorAddons() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.section}${visible ? ` ${styles.in}` : ""}`}
      aria-labelledby="sponsor-addons-heading"
    >
      <div className={styles.inner}>
        <header className={styles.head}>
          <div className={styles.overlineWrap}>
            <span className={styles.overlineRule} aria-hidden="true" />
            <p className={styles.overline}>Add-on opportunities</p>
          </div>
          <h2 id="sponsor-addons-heading" className={styles.heading}>
            Standalone activations.
          </h2>
          <p className={styles.deck}>
            Each can be added to any tier — or taken on its own.
          </p>
        </header>

        <ul className={styles.list}>
          {ADDONS.map((a, i) => (
            <li
              key={a.name}
              className={styles.item}
              style={{ "--i": i } as React.CSSProperties}
            >
              <div className={styles.itemMain}>
                <h3 className={styles.name}>{a.name}</h3>
                <p className={styles.desc}>{a.desc}</p>
              </div>
              <div className={styles.itemMeta}>
                <span className={styles.slots}>
                  {a.slots} {a.slots === 1 ? "slot" : "slots"}
                </span>
                <span className={styles.price}>On request</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

"use client";

import { useInView } from "./useInView";
import styles from "./MaskLines.module.css";

/*
  Headline reveal for the /thailand sections — each line slides up from
  behind a mask, matching the hero headline. Render it inside the <h2>:

    <h2><MaskLines lines={[{ text: "Three areas." },
                           { text: "One converging market.", tone: "ink" }]} /></h2>

  `tone` applies the signature gradient: "ink" on light canvases,
  "light" on dark panels. Observes itself, so it works in any section.
*/
export interface MaskLine {
  text: string;
  tone?: "ink" | "light";
}

export default function MaskLines({ lines, delay = 0 }: { lines: readonly MaskLine[]; delay?: number }) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.3);
  return (
    <span ref={ref} className={`${styles.wrap}${inView ? ` ${styles.in}` : ""}`}>
      {lines.map((l, i) => (
        <span key={i} className={styles.line}>
          <span
            className={`${styles.inner}${l.tone === "ink" ? " gradientTextInk" : l.tone === "light" ? " gradientText" : ""}`}
            style={{ transitionDelay: `${delay + i * 130}ms` }}
          >
            {l.text}
          </span>
        </span>
      ))}
    </span>
  );
}

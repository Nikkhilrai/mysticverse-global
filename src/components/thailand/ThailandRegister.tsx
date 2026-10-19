"use client";

import { useInView } from "./useInView";
import { THAILAND_PRICES, THAILAND_REGISTER } from "./thailandData";
import styles from "./ThailandRegister.module.css";
import MaskLines from "./MaskLines";

/*
  Section 7 — Book your pass (brief §8, reworked on request).
  No prices on /thailand: a dark booking panel with an event "ticket"
  sends visitors to /register, where every pass and price is published
  and passes are booked. Below it, the editorial principle and the
  sponsorship card. `id="register"` and `id="partner"` are the targets
  of the hero's two buttons.
*/
export default function ThailandRegister() {
  const [ref, inView] = useInView<HTMLElement>(0.15);
  const { eyebrow, heading, copy, cta, ticket, partner } = THAILAND_REGISTER;

  return (
    <section
      id="register"
      ref={ref}
      className={`${styles.section}${inView ? ` ${styles.in}` : ""}`}
      aria-labelledby="thailand-register-title"
    >
      <div className={styles.inner}>
        {/* ── Booking panel ─────────────────────────────── */}
        <div className={styles.panel}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>
              <span className={styles.rule} aria-hidden="true" />
              {eyebrow}
            </p>
            <h2 id="thailand-register-title" className={styles.title}>
              <MaskLines lines={[{ text: heading[0] }, { text: heading[1], tone: "light" }]} delay={250} />
            </h2>
            <p className={styles.text}>{copy}</p>
            <a href={cta.href} className={styles.primary} data-track={cta.track}>
              {cta.label}
              <span className={styles.arrow} aria-hidden="true">→</span>
            </a>
          </div>

          <div className={styles.ticketWrap}>
            <a href={cta.href} className={styles.ticket} data-track={cta.track} aria-label={`${cta.label} — ${ticket.title}, ${ticket.place}, ${ticket.date}`}>
              <span className={styles.ticketMain}>
                <span className={styles.admit}>{ticket.kicker}</span>
                <span className={styles.ticketTitle}>{ticket.title}</span>
                <span className={styles.ticketPlace}>{ticket.place}</span>
                <span className={styles.ticketDate}>{ticket.date}</span>
                <span className={styles.ticketLine}>{ticket.line}</span>
              </span>
              <span className={styles.perf} aria-hidden="true" />
              <span className={styles.stub}>
                <span className={styles.stubText}>Thailand 2027</span>
                <span className={styles.barcode} aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>

        {/* ── Principle + partner ───────────────────────── */}
        <div className={styles.below}>
          <p className={styles.principle}>
            <span className={styles.mark} aria-hidden="true">✦</span>
            {THAILAND_PRICES.principle}
          </p>

          <div id="partner" className={styles.partner}>
            <span className={styles.partnerKicker}>{partner.kicker}</span>
            <h3 className={styles.partnerTitle}>{partner.title}</h3>
            <p className={styles.partnerText}>{partner.text}</p>
            <a href={partner.href} className={styles.ghost} data-track={partner.track}>
              {partner.label}
              <span className={styles.arrow} aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

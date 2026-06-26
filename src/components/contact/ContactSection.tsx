"use client";

import { useEffect, useState } from "react";
import styles from "./ContactSection.module.css";

const INTERESTS = ["Sponsor", "Exhibit", "Delegate", "Press", "HR", "Other"] as const;

const CHANNELS = [
  { label: "General", value: "contact@mysticverseglobal.com", href: "mailto:contact@mysticverseglobal.com" },
  { label: "Partnerships", value: "partnerships@mysticverseglobal.com", href: "mailto:partnerships@mysticverseglobal.com" },
  { label: "HR & Corporate", value: "hr@mysticverseglobal.com", href: "mailto:hr@mysticverseglobal.com" },
  { label: "Press", value: "press@mysticverseglobal.com", href: "mailto:press@mysticverseglobal.com" },
  { label: "WhatsApp", value: "+91 92116 11150", href: "https://wa.me/919211611150" },
] as const;

export default function ContactSection() {
  const [mounted, setMounted] = useState(false);
  const [interest, setInterest] = useState<string>("Delegate");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // NOTE: front-end only for now. Wire to a form handler / email service
  // (Resend, Formspree, or a Next.js route handler) before launch.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className={`${styles.section}${mounted ? ` ${styles.in}` : ""}`}>
      <div className={styles.inner}>
        <div className={styles.grid}>

          {/* ── Editorial / contact column ──────────────────── */}
          <div className={styles.lead}>
            <div className={styles.orb} aria-hidden="true" />

            <div className={styles.eyebrowWrap}>
              <p className={styles.eyebrow}>Contact</p>
            </div>
            <h1 className={styles.headline}>
              We&rsquo;d like to<br />
              <span className="gradientText">hear from you.</span>
            </h1>
            <p className={styles.sub}>
              Whether you are exploring partnership, registration, press, or simply
              curious — write to the team that built this platform.
            </p>

            <span className={styles.rule} aria-hidden="true" />

            {/* Direct channels */}
            <div className={styles.block}>
              <p className={styles.blockLabel}>Direct Channels</p>
              <ul className={styles.channels}>
                {CHANNELS.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      className={styles.channel}
                      {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      <span className={styles.channelLabel}>{c.label}</span>
                      <span className={styles.channelValue}>{c.value}</span>
                      <span className={styles.channelArrow} aria-hidden="true">→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <span className={styles.rule} aria-hidden="true" />

            {/* Offices */}
            <div className={styles.block}>
              <p className={styles.blockLabel}>Offices</p>
              <div className={styles.offices}>
                <div className={styles.office}>
                  <span className={styles.pin} aria-hidden="true" />
                  <span className={styles.officeCity}>Gurgaon</span>
                  <span className={styles.officeCountry}>India</span>
                </div>
                <span className={styles.officeConnector} aria-hidden="true" />
                <div className={styles.office}>
                  <span className={styles.pin} aria-hidden="true" />
                  <span className={styles.officeCity}>Dubai</span>
                  <span className={styles.officeCountry}>UAE</span>
                </div>
              </div>
              <p className={styles.company}>MantraNex Vista Pvt. Ltd.</p>
            </div>
          </div>

          {/* ── Form panel ──────────────────────────────────── */}
          <div className={styles.panel}>
            <div className={styles.panelGlow} aria-hidden="true" />

            {submitted ? (
              <div className={styles.success}>
                <span className={styles.successMark} aria-hidden="true">✓</span>
                <h2 className={styles.successTitle}>Message received.</h2>
                <p className={styles.successText}>
                  Thank you for reaching out. Our team will be in touch within two
                  business days.
                </p>
              </div>
            ) : (
              <>
                <div className={styles.panelHead}>
                  <span className={styles.panelKicker}>Send a message</span>
                  <span className={styles.panelNote}>We reply within two business days</span>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.fieldRow}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="name">Name</label>
                      <input className={styles.input} id="name" name="name" type="text" required placeholder="Your name" />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="email">Email</label>
                      <input className={styles.input} id="email" name="email" type="email" required placeholder="you@company.com" />
                    </div>
                  </div>

                  <div className={styles.fieldRow}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="phone">Contact number</label>
                      <input className={styles.input} id="phone" name="phone" type="tel" placeholder="+91 00000 00000" />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="country">Country</label>
                      <input className={styles.input} id="country" name="country" type="text" placeholder="Country" />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="org">Organisation</label>
                    <input className={styles.input} id="org" name="org" type="text" placeholder="Company / fund" />
                  </div>

                  <div className={styles.field}>
                    <span className={styles.label}>Your enquiry is about</span>
                    <div className={styles.chips}>
                      {INTERESTS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          className={`${styles.chip}${interest === opt ? ` ${styles.chipActive}` : ""}`}
                          onClick={() => setInterest(opt)}
                          aria-pressed={interest === opt}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="message">Message</label>
                    <textarea className={styles.textarea} id="message" name="message" rows={4} required placeholder="Tell us a little about what you have in mind…" />
                  </div>

                  <button type="submit" className={styles.submit}>
                    Send Message
                    <span className={styles.arrow} aria-hidden="true">→</span>
                  </button>
                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

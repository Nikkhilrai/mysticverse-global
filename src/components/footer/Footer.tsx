"use client";

import { type FormEvent, useState } from "react";
import styles from "./Footer.module.css";

/*
  KNOWN SIMPLIFICATION — same pattern as the header's nav items.
  Most footer links point to pages that have not been built yet.
  Each un-built destination is flagged with a comment.
  Do not add these pages to the site without confirming hrefs here.
*/

const ABOUT_LINKS = [
  { label: "About MysticVerse",  href: "/about"          }, // FUTURE PAGE
  { label: "Why Dubai 2026",     href: "/why-dubai-2026"  }, // FUTURE PAGE
  { label: "The Venue",          href: "/venue"           }, // FUTURE PAGE
  { label: "Press Room",         href: "/press"           }, // FUTURE PAGE
  { label: "Careers",            href: "/careers"         }, // FUTURE PAGE
] as const;

const PROGRAMME_LINKS = [
  { label: "The 4 Pillars",              href: "/pillars"                     }, // FUTURE PAGE
  { label: "Conscious Living Pavilion",  href: "/pavilion"                    },
  { label: "Agenda",                     href: "/conference/agenda"           }, // FUTURE PAGE
  { label: "Speakers",                   href: "/conference/speakers"         }, // FUTURE PAGE
  { label: "Excellence Awards",          href: "/conference/awards"           }, // FUTURE PAGE
  { label: "Think Tank",                 href: "/conference/think-tank"       }, // FUTURE PAGE
] as const;

const INVOLVED_LINKS = [
  { label: "Become a Sponsor",          href: "/partner/sponsor"              }, // FUTURE PAGE
  { label: "Exhibit With Us",           href: "/partner/exhibit"              }, // FUTURE PAGE
  { label: "HR Leaders Hub",            href: "/pillars/workplace-wellness/hr-leaders-hub" }, // FUTURE PAGE
  { label: "Media Partnerships",        href: "/partner/media"                }, // FUTURE PAGE
  { label: "Speak at MysticVerse",      href: "/speak"                        }, // FUTURE PAGE
  { label: "Nominate for the Awards",   href: "/conference/awards/nominate"   }, // FUTURE PAGE
] as const;

const ATTEND_LINKS = [
  { label: "Delegate Passes",           href: "/register/delegate"            }, // FUTURE PAGE
  { label: "HNI Pass",                  href: "/register/hni"                 }, // FUTURE PAGE
  { label: "Corporate Bundle",          href: "/register/corporate"           }, // FUTURE PAGE
  { label: "Wellness Investor Circle",  href: "/register/investor"            }, // FUTURE PAGE
  { label: "FAQ",                       href: "/faq"                          }, // FUTURE PAGE
  { label: "Contact",                   href: "/contact"                      },
] as const;

/* ── Social icon SVGs ─────────────────────────────────────
   All 24×24 viewBox, fill="currentColor".
   Color controlled via CSS (Canvas A at rest, Brass on hover).
───────────────────────────────────────────────────────── */
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" focusable="false">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="2,4 12,13 22,4" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" focusable="false">
      <path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6z" />
      <circle cx="12" cy="8" r="2" />
    </svg>
  );
}

const CONTACT_CHANNELS = [
  { label: "General",      value: "contact@mysticverseglobal.com",      href: "mailto:contact@mysticverseglobal.com",      Icon: MailIcon    },
  { label: "Partnerships", value: "partnerships@mysticverseglobal.com",  href: "mailto:partnerships@mysticverseglobal.com",  Icon: MailIcon    },
  { label: "HR",           value: "hr@mysticverseglobal.com",            href: "mailto:hr@mysticverseglobal.com",            Icon: MailIcon    },
  { label: "Press",        value: "press@mysticverseglobal.com",         href: "mailto:press@mysticverseglobal.com",         Icon: MailIcon    },
  { label: "WhatsApp",     value: "+91 92116 11150",                     href: "https://wa.me/919211611150",                Icon: PhoneIcon   },
] as const;

const SOCIAL = [
  { label: "LinkedIn",  href: "https://linkedin.com/company/mysticverse-global", Icon: LinkedInIcon  },
  { label: "Instagram", href: "https://instagram.com/mysticverseglobal",         Icon: InstagramIcon },
  { label: "YouTube",   href: "https://youtube.com/@mysticverseglobal",           Icon: YouTubeIcon   },
  { label: "X",         href: "https://x.com/mysticverseglobal",                  Icon: XIcon         },
  { label: "WhatsApp",  href: "https://wa.me/919211611150",                        Icon: WhatsAppIcon  },
] as const;

/* ── Link column component ─────────────────────────────── */
function FooterLinkList({ items }: { items: ReadonlyArray<{ label: string; href: string }> }) {
  return (
    <ul className={styles.linkList} role="list">
      {items.map((item) => (
        <li key={item.href}>
          <a href={item.href} className={styles.footerLink}>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

/* ── Footer ─────────────────────────────────────────────── */
export default function Footer() {
  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: wire to newsletter service (Mailchimp / ConvertKit / etc.)
    setSubmitted(true);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* ── Contact strip ─────────────────────────────── */}
        <div className={styles.contactStrip}>
          <div className={styles.contactLeft}>
            <h2 className={styles.contactHeading}>Get in touch</h2>
            <p className={styles.contactSub}>Partnerships · Delegate passes · Press · HR</p>
            <div className={styles.offices}>
              <span className={styles.officeItem}>
                <span className={styles.channelIcon}><PinIcon /></span>
                Gurgaon, India
              </span>
              <span className={styles.officeDot} aria-hidden="true">·</span>
              <span className={styles.officeItem}>
                <span className={styles.channelIcon}><PinIcon /></span>
                Dubai, UAE
              </span>
            </div>
          </div>
          <div className={styles.contactRight}>
            <div className={styles.contactChannels}>
              {CONTACT_CHANNELS.map((ch) => (
                <a
                  key={ch.label}
                  href={ch.href}
                  className={styles.contactChannel}
                  {...(ch.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className={styles.channelIcon}><ch.Icon /></span>
                  <span className={styles.channelLabel}>{ch.label}</span>
                  <span className={styles.channelValue}>{ch.value}</span>
                </a>
              ))}
            </div>
            <a href="/contact" className={styles.contactCta}>
              Full contact page <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* ── 5-column grid ─────────────────────────────── */}
        <div className={styles.grid}>

          {/* Col 1 — About */}
          <div className={styles.col}>
            <h2 className={styles.colHeader}>About</h2>
            <p className={styles.aboutText}>
              MysticVerse Global is curated by MantraNex Vista Pvt.&nbsp;Ltd.,
              a Gurgaon and Dubai-based platform building the meeting points
              between conscious luxury, wellness real estate, and human
              flourishing.
            </p>
            <FooterLinkList items={ABOUT_LINKS} />
          </div>

          {/* Col 2 — The Programme */}
          <div className={styles.col}>
            <h2 className={styles.colHeader}>The Programme</h2>
            <FooterLinkList items={PROGRAMME_LINKS} />
          </div>

          {/* Col 3 — Get Involved */}
          <div className={styles.col}>
            <h2 className={styles.colHeader}>Get Involved</h2>
            <FooterLinkList items={INVOLVED_LINKS} />
          </div>

          {/* Col 4 — Attend */}
          <div className={styles.col}>
            <h2 className={styles.colHeader}>Attend</h2>
            <FooterLinkList items={ATTEND_LINKS} />
          </div>

          {/* Col 5 — Stay Close (narrow rail) */}
          <div className={`${styles.col} ${styles.colStayClose}`}>
            <h2 className={styles.colHeader}>Stay Close</h2>
            <p className={styles.newsletterTagline}>
              The Conscious Luxury Briefing — Once a fortnight, never a flood.
            </p>

            {submitted ? (
              /* Success state: no popup, no celebration — just this */
              <p className={styles.successMessage}>
                Welcome. Your first Briefing arrives within a fortnight.
              </p>
            ) : (
              <form
                className={styles.newsletterForm}
                onSubmit={handleSubscribe}
                aria-label="Subscribe to the Conscious Luxury Briefing"
                noValidate
              >
                <label htmlFor="footer-email" className={styles.srOnly}>
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={styles.emailInput}
                  autoComplete="email"
                />
                <button type="submit" className={styles.subscribeBtn}>
                  Subscribe
                </button>
              </form>
            )}

            {/* Social icons */}
            <div className={styles.social} aria-label="Social media links">
              {SOCIAL.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  className={styles.socialLink}
                  aria-label={`MysticVerse Global on ${label}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────── */}
      <div className={styles.bottomBar}>
        <p className={styles.bottomCopy}>
          &copy;&nbsp;2026 MysticVerse Global.&ensp;A MantraNex Vista platform.
        </p>

        <nav className={styles.bottomLinks} aria-label="Legal and contact">
          <a href="/privacy"          className={styles.bottomLink}>Privacy</a>          {/* FUTURE PAGE */}
          <a href="/terms"            className={styles.bottomLink}>Terms</a>             {/* FUTURE PAGE */}
          <a href="/code-of-conduct"  className={styles.bottomLink}>Code of Conduct</a>  {/* FUTURE PAGE */}
          <a
            href="mailto:contact@mysticverseglobal.com"
            className={styles.bottomLink}
          >
            contact@mysticverseglobal.com
          </a>
          <a
            href="https://wa.me/919211611150"
            className={styles.bottomLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp: +91&nbsp;9211611150
          </a>
          <span className={styles.bottomMeta}>
            Gurgaon, India&ensp;·&ensp;Dubai, UAE
          </span>
        </nav>
      </div>

    </footer>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Header.module.css";

/*
  NAV_ITEMS — simple links for now.
  Items marked futureDropdown: true will need dropdown menus once
  their child pages are built. Do not add dropdowns until those
  pages exist — the affordance (chevron, hover panel) would link
  to 404s and mislead visitors.

  Future dropdown children:
  — "The 4 Pillars":   Conscious Luxury Living / Workplace Wellness &
                        Human Capital / Personal Mastery & Longevity /
                        Wisdom & Modern Science
  — "Conference":      Agenda / Speakers / Awards / Think Tank
  — "Partner With Us": 4 partner-tier pages (TBD in Phase 4 brief)
*/
const NAV_ITEMS = [
  { label: "Why Dubai 2026",  href: "/why-dubai-2026",  futureDropdown: false },
  { label: "The 4 Pillars",   href: "/pillars",          futureDropdown: true  },
  { label: "The Pavilion",    href: "/pavilion",          futureDropdown: false },
  { label: "Conference",      href: "/conference",        futureDropdown: true  },
  { label: "Partner With Us", href: "/partner",           futureDropdown: true  },
  { label: "Media",           href: "/media",             futureDropdown: false },
  { label: "Contact",         href: "/contact",           futureDropdown: false },
] as const;

const TOPBAR_KEY = "mvg_topbar_dismissed";

export default function Header() {
  const [scrolled,       setScrolled]       = useState(false);
  const [topBarVisible,  setTopBarVisible]  = useState(true);
  const [topBarExiting,  setTopBarExiting]  = useState(false);
  const [menuOpen,       setMenuOpen]       = useState(false);

  /* ── Init top bar from localStorage (client-only) ──────── */
  useEffect(() => {
    if (localStorage.getItem(TOPBAR_KEY) === "true") {
      setTopBarVisible(false);
    }
  }, []);

  /* ── Scroll: toggle shrunk state after 100px ────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Body scroll lock while mobile menu is open ─────────── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* ── Close mobile menu on resize to desktop ─────────────── */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1120) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleDismiss = () => {
    setTopBarExiting(true);
    setTimeout(() => {
      setTopBarVisible(false);
      setTopBarExiting(false);
      localStorage.setItem(TOPBAR_KEY, "true");
    }, 260);
  };

  const headerClass = [
    styles.header,
    scrolled   ? styles.scrolled  : "",
    menuOpen   ? styles.menuOpen  : "",
  ].filter(Boolean).join(" ");

  return (
    <header className={headerClass} role="banner">

      {/* ── Top bar ─────────────────────────────────────────
          Thin dismissible announcement strip above the nav.
          Persists dismissal to localStorage (key: mvg_topbar_dismissed).
          Hides automatically once the user scrolls past 100px.
      ───────────────────────────────────────────────────── */}
      {topBarVisible && (
        <div
          className={`${styles.topBar}${topBarExiting ? ` ${styles.topBarExiting}` : ""}`}
        >
          <p className={styles.topBarText}>
            10 &amp; 11 September 2026&ensp;·&ensp;Dubai, UAE&ensp;·&ensp;Early&#8209;bird pricing closes 31&nbsp;July
          </p>
          <button
            className={styles.topBarDismiss}
            onClick={handleDismiss}
            aria-label="Dismiss announcement"
            type="button"
          >
            ×
          </button>
        </div>
      )}

      {/* ── Main nav row ────────────────────────────────────
          navRow has position: relative; z-index: 1 so it paints
          above the mobileMenu overlay (which is z-index: 0 within
          this stacking context), keeping REGISTER + hamburger
          interactive while the menu is open.
      ───────────────────────────────────────────────────── */}
      <div className={styles.navRow}>

        {/* Logo image */}
        <a
          href="/"
          className={styles.logo}
          aria-label="MysticVerse Global — return to homepage"
        >
          <Image
            src="/images/logo/mysticverse_global.png"
            alt="MysticVerse Global"
            width={160}
            height={48}
            className={styles.logoImage}
            priority
          />
        </a>

        {/* Desktop nav — collapses to hamburger below 1120px */}
        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right cluster: REGISTER (always visible) + hamburger (mobile only) */}
        <div className={styles.actions}>
          <a href="/register" className={styles.registerBtn}>
            Register
          </a>
          <button
            className={`${styles.hamburger}${menuOpen ? ` ${styles.hamburgerOpen}` : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mvg-mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            type="button"
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </div>

      </div>

      {/* ── Mobile menu overlay ─────────────────────────────
          Full-screen Ground panel. Nav items in DM Sans 500 —
          structured and direct. REGISTER at bottom, full-width.
          z-index: 0 within the header stacking context — below
          navRow (z-index: 1) so the controls remain clickable.
      ───────────────────────────────────────────────────── */}
      <div
        id="mvg-mobile-menu"
        className={`${styles.mobileMenu}${menuOpen ? ` ${styles.mobileMenuOpen}` : ""}`}
        aria-hidden={!menuOpen}
        aria-label="Mobile navigation"
      >
        <nav className={styles.mobileNav}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.mobileNavLink}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="/register"
          className={styles.mobileRegisterBtn}
          onClick={() => setMenuOpen(false)}
        >
          Register
        </a>
      </div>

    </header>
  );
}

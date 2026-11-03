"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { sound } from "@/lib/sounds";

interface NavItem {
  href: string;
  label: string;
  index: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home", index: "01" },
  { href: "/work", label: "Work", index: "02" },
  { href: "/about", label: "About", index: "03" },
  { href: "/codex", label: "Codex", index: "04" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position to enhance frosted glass density when content moves behind
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu automatically whenever route changes (covers forward/back browser navigation)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle Escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        sound.playClick();
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Auto-close menu if resized to desktop breakpoint (>= 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  // Prevent background scrolling while mobile navigation panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      const lenis = (window as unknown as { __lenis?: { stop: () => void } }).__lenis;
      lenis?.stop?.();
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      const lenis = (window as unknown as { __lenis?: { start: () => void } }).__lenis;
      lenis?.start?.();
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      const lenis = (window as unknown as { __lenis?: { start: () => void } }).__lenis;
      lenis?.start?.();
    };
  }, [isOpen]);

  const toggleMenu = () => {
    sound.playClick();
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    sound.playClick();
    setIsOpen(false);
  };

  const handleNavClick = () => {
    sound.playClick();
    setIsOpen(false);
  };

  return (
    <>
      <nav className={`kokil-nav ${isScrolled ? "is-scrolled" : ""}`} aria-label="Main Navigation">
        {/* Cold Designer Avatar Logo */}
        <Link
          href="/"
          className="kokil-nav-logo"
          aria-label="Taye Abolarin (Cold Designer) — Home"
          onClick={() => {
            if (isOpen) setIsOpen(false);
            sound.playClick();
          }}
        >
          <Image
            src="/images/cold-designer-avatar.svg"
            alt="Cold Designer Logo"
            width={42}
            height={42}
            priority
          />
        </Link>

        {/* Desktop Pill Links (Visible only on Desktop >= 1024px) */}
        <div className="kokil-nav-links">
          <Link href="/" className={pathname === "/" ? "active" : ""}>
            Home
          </Link>
          <Link
            href="/work"
            className={pathname.startsWith("/work") ? "active" : ""}
          >
            Work
          </Link>
          <Link href="/about" className={pathname === "/about" ? "active" : ""}>
            About
          </Link>
          <Link href="/codex" className={pathname === "/codex" ? "active" : ""}>
            Codex
          </Link>
        </div>

        {/* Desktop Résumé Action (Visible only on Desktop >= 1024px) */}
        <a
          href="/Taye%20Abolarin-Product%20Designer-Resume.pdf"
          download="Taye Abolarin-Product Designer-Resume.pdf"
          className="kokil-nav-resume"
          aria-label="Download Taye Abolarin Product Designer Resume (PDF)"
        >
          <span>R&eacute;sum&eacute;</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
          </svg>
        </a>

        {/* Desktop Email Pill (Visible only on Desktop >= 1024px) */}
        <a
          href="mailto:abolarintaye20@gmail.com"
          className="kokil-nav-email"
        >
          abolarintaye20@gmail.com
        </a>

        {/* Custom Two-Line Hamburger Control (Visible ONLY on Tablet & Mobile < 1024px) */}
        <button
          type="button"
          onClick={toggleMenu}
          className="kokil-nav-toggle"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-panel"
        >
          <span className="kokil-nav-toggle-icon" aria-hidden="true">
            <span className={`toggle-line toggle-line-top ${isOpen ? "open" : ""}`} />
            <span className={`toggle-line toggle-line-bottom ${isOpen ? "open" : ""}`} />
          </span>
        </button>
      </nav>

      {/* Responsive Mobile & Tablet Sliding Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dimmed Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              onClick={handleClose}
              className="mobile-nav-backdrop"
              aria-hidden="true"
            />

            {/* Sliding Panel from Right */}
            <motion.aside
              id="mobile-nav-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Menu"
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
              className="mobile-nav-panel"
            >
              {/* Panel Top Header */}
              <div className="mobile-nav-header">
                <div className="mobile-nav-tag">
                  <span className="w-2 h-2 rounded-full bg-[#a9ddf0] animate-pulse" />
                  <span>Index // Navigation</span>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mobile-nav-close-btn"
                  aria-label="Close navigation panel"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Primary Staggered Navigation Links */}
              <div className="mobile-nav-items">
                {NAV_ITEMS.map((item, idx) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 28 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.08 + idx * 0.045,
                        duration: 0.32,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={handleNavClick}
                        className={`mobile-nav-item-link ${isActive ? "active" : ""}`}
                      >
                        <div className="flex items-center">
                          <span className="mobile-nav-item-index">({item.index})</span>
                          <span className="mobile-nav-item-label">{item.label}</span>
                        </div>
                        <svg
                          className="mobile-nav-item-arrow"
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Panel Footer Actions */}
              <div className="mobile-nav-footer">
                {/* Résumé Action */}
                <a
                  href="/Taye%20Abolarin-Product%20Designer-Resume.pdf"
                  download="Taye Abolarin-Product Designer-Resume.pdf"
                  onClick={() => sound.playClick()}
                  className="mobile-nav-resume-btn"
                  aria-label="Download Taye Abolarin Product Designer Resume PDF"
                >
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-mono-code uppercase tracking-wider opacity-70">
                      Curriculum Vitae
                    </span>
                    <span>Download R&eacute;sum&eacute; (PDF)</span>
                  </div>
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
                  </svg>
                </a>

                {/* Direct Dialogue Email */}
                <a
                  href="mailto:abolarintaye20@gmail.com"
                  onClick={() => sound.playClick()}
                  className="mobile-nav-email-link"
                >
                  <span>abolarintaye20@gmail.com</span>
                  <span>Direct Dialogue &rarr;</span>
                </a>

                <div className="flex justify-between items-center text-[11px] font-mono-code text-[#89919d] pt-2">
                  <span>Lagos, NG &bull; WAT</span>
                  <span>Cold Designer &bull; 2026</span>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

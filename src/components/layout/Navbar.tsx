"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon, Command, Volume2, VolumeX, Check, Copy } from "lucide-react";
import { sound } from "@/lib/sounds";
import { useTheme } from "@/context/ThemeContext";

interface NavItem {
  href: string;
  label: string;
  index: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home", index: "01" },
  { href: "/work", label: "Work", index: "02" },
  { href: "/about", label: "About", index: "03" },
  { href: "/lab", label: "Lab", index: "04" },
  { href: "/contact", label: "Contact", index: "05" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme, mounted } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [sfxEnabled, setSfxEnabled] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Sync SFX state
  useEffect(() => {
    setSfxEnabled(sound.isEnabled());
    const onToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ enabled: boolean }>;
      setSfxEnabled(customEvent.detail.enabled);
    };
    window.addEventListener("cold:sfx_toggle", onToggle);
    return () => window.removeEventListener("cold:sfx_toggle", onToggle);
  }, []);

  const handleCopyEmail = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    try {
      await navigator.clipboard.writeText("abolarintaye20@gmail.com");
      sound.playTick();
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      window.location.href = "mailto:abolarintaye20@gmail.com";
    }
  };

  const toggleSfx = () => {
    const next = sound.toggle();
    setSfxEnabled(next);
  };

  const openCommandPalette = () => {
    sound.playTick();
    if (isOpen) setIsOpen(false);
    window.dispatchEvent(new CustomEvent("cold:open_palette"));
  };

  // Track scroll position to enhance frosted glass density when content moves behind
  useEffect(() => {
    let lastScrolled = false;
    let ticking = false;

    const checkScroll = () => {
      const scrolled = window.scrollY > 15;
      if (scrolled !== lastScrolled) {
        lastScrolled = scrolled;
        setIsScrolled(scrolled);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(checkScroll);
      }
    };

    checkScroll();
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
        sound.playTick();
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
    sound.playTick();
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    sound.playTick();
    setIsOpen(false);
  };

  const handleNavClick = () => {
    sound.playTick();
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={`kokil-nav ${isScrolled ? "is-scrolled" : ""}`}
        style={{
          backdropFilter: "url(#cold-glass-filter-pill) blur(24px) saturate(190%) contrast(106%)",
          WebkitBackdropFilter: "blur(24px) saturate(190%) contrast(106%)",
        }}
        aria-label="Main Navigation"
        onMouseMove={(e: React.MouseEvent<HTMLElement>) => {
          const rect = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--nav-mouse-x", `${e.clientX - rect.left}px`);
          e.currentTarget.style.setProperty("--nav-mouse-y", `${e.clientY - rect.top}px`);
          e.currentTarget.style.setProperty("--nav-mouse-opacity", "1");
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
          e.currentTarget.style.setProperty("--nav-mouse-opacity", "0");
        }}
      >
        {/* Cold Designer Avatar Logo */}
        <Link
          href="/"
          className="kokil-nav-logo"
          aria-label="Taye Abolarin (Cold Designer) — Home"
          onClick={() => {
            if (isOpen) setIsOpen(false);
            sound.playTick();
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
          <Link href="/" prefetch={true} className={pathname === "/" ? "active" : ""}>
            Home
          </Link>
          <Link
            href="/work"
            prefetch={true}
            className={pathname.startsWith("/work") ? "active" : ""}
          >
            Work
          </Link>
          <Link href="/about" prefetch={true} className={pathname === "/about" ? "active" : ""}>
            About
          </Link>
          <Link href="/lab" prefetch={true} className={pathname === "/lab" ? "active" : ""}>
            Lab
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

        {/* Compact ⌘K Command Palette Launcher (Universal across Desktop & Mobile) */}
        <button
          type="button"
          onClick={openCommandPalette}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-white/[0.12] bg-white/[0.04] text-[#89919d] hover:text-[#a9ddf0] hover:border-[#a9ddf0]/30 font-mono-code text-[11px] transition-colors cursor-pointer shrink-0"
          title="Open Command Palette (Cmd+K / Ctrl+K)"
          aria-label="Open Command Palette (Cmd+K / Ctrl+K)"
        >
          <Command size={12} className="text-[#a9ddf0]" />
          <span className="font-semibold text-[#a9ddf0]">K</span>
        </button>

        {/* Theme Toggle (Desktop Only) & Mobile Menu Toggle (< 1024px) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              sound.playTick();
              toggleTheme();
            }}
            className="kokil-nav-theme-btn hidden lg:inline-flex"
            aria-label={mounted && theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            title={mounted && theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {mounted && theme === "light" ? (
              <Moon size={17} strokeWidth={2.2} />
            ) : (
              <Sun size={17} strokeWidth={2.2} />
            )}
          </button>

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
        </div>
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
                <div className="flex items-center gap-2">
                  {/* Command Palette Trigger */}
                  <button
                    type="button"
                    onClick={openCommandPalette}
                    className="mobile-nav-theme-btn flex items-center gap-1"
                    aria-label="Open Command Palette"
                    title="Open Command Palette"
                  >
                    <Command size={12} className="text-[#a9ddf0]" />
                    <span className="font-mono-code text-[11px] font-semibold text-[#a9ddf0]">K</span>
                  </button>

                  {/* Micro-SFX Toggle */}
                  <button
                    type="button"
                    onClick={toggleSfx}
                    className="mobile-nav-theme-btn"
                    aria-label={sfxEnabled ? "SFX: ON" : "SFX: OFF"}
                    title={sfxEnabled ? "SFX: ON" : "SFX: OFF"}
                  >
                    <span className="font-mono-code text-[10px]">
                      {sfxEnabled ? "SFX: ON" : "SFX: OFF"}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      sound.playTick();
                      toggleTheme();
                    }}
                    className="mobile-nav-theme-btn"
                    aria-label={mounted && theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
                  >
                    {mounted && theme === "light" ? (
                      <>
                        <Moon size={13} strokeWidth={2.2} />
                        <span>Dark</span>
                      </>
                    ) : (
                      <>
                        <Sun size={13} strokeWidth={2.2} />
                        <span>Light</span>
                      </>
                    )}
                  </button>
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
                        prefetch={true}
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
                  onClick={() => sound.playTick()}
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

                {/* Direct Dialogue Email (Click to Copy) */}
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="mobile-nav-email-link w-full text-left cursor-pointer"
                  data-cursor-text="Copy Email"
                >
                  <span>
                    {copiedEmail ? "abolarintaye20@gmail.com (Copied ✓)" : "abolarintaye20@gmail.com"}
                  </span>
                  <span>{copiedEmail ? "Copied ✓" : "Copy Email →"}</span>
                </button>

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

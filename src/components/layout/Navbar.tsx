"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <nav className="kokil-nav" aria-label="Main Navigation">
      {/* Avatar Logo with tilt hover effect */}
      <Link href="/" className="kokil-nav-logo" aria-label="Taye Abolarin (Cold Designer) — Home">
        <Image
          src="/images/cold-designer-avatar.svg"
          alt="Cold Designer Logo"
          width={42}
          height={42}
          priority
        />
      </Link>

      {/* Pill Links */}
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

      {/* Accessible Theme Switcher Control */}
      <button
        type="button"
        onClick={toggleTheme}
        className="kokil-nav-theme"
        role="switch"
        aria-checked={mounted ? theme === "light" : false}
        aria-label={
          mounted
            ? `Switch to ${theme === "dark" ? "light" : "dark"} theme`
            : "Toggle light and dark theme"
        }
        title={
          mounted
            ? `Switch to ${theme === "dark" ? "Light" : "Dark"} mode`
            : "Toggle theme"
        }
      >
        {/* Moon Icon (displayed in dark theme) */}
        <span className="kokil-theme-icon moon-icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            <path d="M19 3v2M20 4h-2" strokeWidth="1.8" />
          </svg>
        </span>

        {/* Sun Icon (displayed in light theme) */}
        <span className="kokil-theme-icon sun-icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        </span>
      </button>

      {/* Résumé Direct Download Action */}
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

      {/* Email pill */}
      <a
        href="mailto:abolarintaye20@gmail.com"
        className="kokil-nav-email"
      >
        abolarintaye20@gmail.com
      </a>
    </nav>
  );
}

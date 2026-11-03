"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

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

"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

interface ContactLinkItem {
  name: string;
  desc: string;
  href: string;
  icon: string | React.ReactNode;
}

const CONTACTS: ContactLinkItem[] = [
  {
    name: "Email",
    desc: "abolarintaye20@gmail.com — direct channel for projects & inquiries.",
    href: "mailto:abolarintaye20@gmail.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    desc: "Professional background, recommendations & product work.",
    href: "https://linkedin.com/in/taye-abolarin",
    icon: "in",
  },
  {
    name: "X (Twitter)",
    desc: "Product design thoughts, interface dissections & experiments.",
    href: "https://x.com/taye_abolarin2",
    icon: "𝕏",
  },
  {
    name: "Behance",
    desc: "High-fidelity mockups, UI concepts and design presentations.",
    href: "https://behance.net/colddesigner",
    icon: "Bē",
  },
  {
    name: "GitHub",
    desc: "Frontend prototypes, Next.js experiments & design repositories.",
    href: "https://github.com/Bheemty",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
];

export default function FooterKokil() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footerEl = footerRef.current;
    if (!footerEl) return;

    const eyes = footerEl.querySelectorAll<HTMLElement>(".eye");
    const maxMove = 24;

    function handleMouseMove(e: MouseEvent) {
      eyes.forEach((eye) => {
        const pupil = eye.querySelector<HTMLElement>(".pupil");
        if (!pupil) return;
        const rect = eye.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.min(maxMove, Math.hypot(dx, dy) / 8);
        const angle = Math.atan2(dy, dx);
        const ox = Math.cos(angle) * dist;
        const oy = Math.sin(angle) * dist;
        pupil.style.transform = `translate(calc(-50% + ${ox}px), calc(-50% + ${oy}px))`;
      });
    }

    const blinkInterval = setInterval(() => {
      eyes.forEach((eye) => eye.classList.add("blink"));
      setTimeout(() => {
        eyes.forEach((eye) => eye.classList.remove("blink"));
      }, 150);
    }, 3200);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(blinkInterval);
    };
  }, []);

  function scrollToTop(e: React.MouseEvent) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer ref={footerRef} id="contact">
      <p className="intro-label">(03) &mdash; Contact</p>

      <div className="contact-grid">
        <div>
          <h2 className="contact-title">
            Let&rsquo;s build something <span>people understand.</span>
          </h2>

          <div className="contact-row">
            <a
              href="mailto:abolarintaye20@gmail.com"
              className="contact-email"
            >
              abolarintaye20@gmail.com
            </a>
            <span className="eyes-scene footer-eyes" aria-hidden="true">
              <span className="eye">
                <span className="pupil" />
              </span>
              <span className="eye">
                <span className="pupil" />
              </span>
            </span>
          </div>
        </div>

        <ul className="contact-list">
          {CONTACTS.map((c) => (
            <li key={c.name}>
              <a
                href={c.href}
                className="contact-link"
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <span className="contact-icon" aria-hidden="true">
                  {c.icon}
                </span>
                <span>
                  <span className="contact-name">{c.name}</span>
                  <span className="contact-desc">{c.desc}</span>
                </span>
                <span className="contact-arrow" aria-hidden="true">
                  &nearr;
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="site-footer">
        <span>&copy; 2026 Taye Abolarin (Cold Designer)</span>
        <div className="footer-links">
          <Link href="/work">Work</Link>
          <Link href="/about">About</Link>
          <a
            href="https://linkedin.com/in/taye-abolarin"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="mailto:abolarintaye20@gmail.com">Contact</a>
        </div>
        <a href="#hero" className="footer-top" onClick={scrollToTop}>
          Back to top &uarr;
        </a>
      </div>
    </footer>
  );
}


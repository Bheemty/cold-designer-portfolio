"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

interface ContactLink {
  name: string;
  desc: string;
  href: string;
  icon: React.ReactNode;
}

const CONTACTS: ContactLink[] = [
  {
    name: "LinkedIn",
    desc: "Professional trajectory & verified client recommendations",
    href: "https://linkedin.com/in/taye-abolarin",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "Behance",
    desc: "Complete visual archive & interaction design portfolio",
    href: "https://behance.net/abolarintaye",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h7a3 3 0 0 1 0 6H4V6z" />
        <path d="M4 12h8a3.5 3.5 0 0 1 0 7H4v-7z" />
        <path d="M16 8h5" />
        <path d="M16 15a3 3 0 1 1 6 0 3 3 0 0 1-6 0c0-1.7 1.3-3 3-3" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    desc: "Open source prototypes, Next.js codebases & design tokens",
    href: "https://github.com/Bheemty",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    desc: "Interface thoughts, Figma token experiments & design notes",
    href: "https://x.com/taye_abolarin2",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    ),
  },
];

export default function FooterKokil() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footerEl = footerRef.current;
    if (!footerEl) return;

    let isFooterVisible = false;
    const observer = new IntersectionObserver(
      (entries) => {
        isFooterVisible = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0.1 }
    );
    observer.observe(footerEl);

    const eyeEls = Array.from(footerEl.querySelectorAll<HTMLElement>(".eye"));
    const pupilEls = eyeEls.map((eye) => eye.querySelector<HTMLElement>(".pupil"));
    const maxMove = 22;
    let eyeCenters: Array<{ cx: number; cy: number }> = [];

    function updateEyeCenters() {
      eyeCenters = eyeEls.map((eye) => {
        const rect = eye.getBoundingClientRect();
        return {
          cx: rect.left + rect.width / 2,
          cy: rect.top + rect.height / 2,
        };
      });
    }

    updateEyeCenters();
    window.addEventListener("resize", updateEyeCenters, { passive: true });

    let pendingPointerX = -1000;
    let pendingPointerY = -1000;
    let eyeRaf = 0;

    function renderEyes() {
      if (!isFooterVisible || eyeCenters.length === 0) {
        eyeRaf = requestAnimationFrame(renderEyes);
        return;
      }

      pupilEls.forEach((pupil, idx) => {
        if (!pupil || !eyeCenters[idx]) return;
        const { cx, cy } = eyeCenters[idx];
        const dx = pendingPointerX - cx;
        const dy = pendingPointerY - cy;
        const dist = Math.min(maxMove, Math.hypot(dx, dy) / 10);
        const angle = Math.atan2(dy, dx);
        const ox = Math.cos(angle) * dist;
        const oy = Math.sin(angle) * dist;
        pupil.style.transform = `translate3d(calc(-50% + ${ox.toFixed(1)}px), calc(-50% + ${oy.toFixed(1)}px), 0)`;
      });

      eyeRaf = requestAnimationFrame(renderEyes);
    }

    eyeRaf = requestAnimationFrame(renderEyes);

    function handleMouseMove(e: MouseEvent) {
      if (!isFooterVisible) return;
      pendingPointerX = e.clientX;
      pendingPointerY = e.clientY;
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const blinkInterval = setInterval(() => {
      if (!isFooterVisible) return;
      eyeEls.forEach((eye) => eye.classList.add("blink"));
      setTimeout(() => {
        eyeEls.forEach((eye) => eye.classList.remove("blink"));
      }, 150);
    }, 4000);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(eyeRaf);
      window.removeEventListener("resize", updateEyeCenters);
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(blinkInterval);
    };
  }, []);

  function scrollToTop(e: React.MouseEvent) {
    e.preventDefault();
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <footer ref={footerRef} id="contact">
      <p className="intro-label">(03) &mdash; Contact</p>

      <div className="contact-grid">
        <div>
          <h2 className="contact-title">
            Let&rsquo;s build something <span>people understand.</span>
          </h2>

          {/* Prominent, Intentional Contact Action */}
          <div className="contact-action-zone">
            <a
              href="mailto:abolarintaye20@gmail.com"
              className="contact-direct-btn"
              aria-label="Direct email to abolarintaye20@gmail.com"
            >
              <div className="contact-direct-content">
                <span className="contact-direct-label">Direct Communication</span>
                <span className="contact-direct-address">abolarintaye20@gmail.com</span>
              </div>
              <span className="contact-arrow-badge" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </a>

            <div className="contact-sub-actions">
              <Link href="/contact" className="contact-form-link">
                <span>Start Structured Project Brief &rarr;</span>
              </Link>
            </div>
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
          <Link href="/codex">Codex</Link>
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

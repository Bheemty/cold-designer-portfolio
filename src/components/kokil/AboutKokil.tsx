"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const ABOUT_TEXT =
  "I design digital products that make complex systems feel obvious. Less decorative clutter, more functional clarity — translating messy workflows into structured interfaces, disciplined design systems, and rapid working prototypes.";

const SKILLS = [
  "Figma",
  "Product Design",
  "Conversational UX",
  "Design Systems",
  "Intercity Mobility",
  "Rapid Prototyping",
  "Information Architecture",
];

export default function AboutKokil() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const textEl = textRef.current;
    if (!textEl) return;

    const words = Array.from(textEl.querySelectorAll<HTMLSpanElement>(".word"));
    if (words.length === 0) return;

    // Accessibility check: instantly reveal all words if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      words.forEach((w) => w.classList.add("revealed"));
      return;
    }

    let lastRevealCount = -1;
    let ticking = false;

    // Kokil Tamta exact scroll reveal formula:
    // When the top of the text enters from the bottom of viewport (start = vh * 0.9),
    // words progressively unblur and illuminate as scroll continues towards upper-center (end = vh * 0.35).
    // Scrolling upwards naturally reverses the unblur wave back into blurred state.
    const update = () => {
      ticking = false;
      if (!textEl) return;

      // Clean 0-reset guarantee whenever at the top of Hero
      if (window.scrollY < 30) {
        if (lastRevealCount !== 0) {
          lastRevealCount = 0;
          words.forEach((w) => w.classList.remove("revealed"));
        }
        return;
      }

      const rect = textEl.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.9;
      const end = vh * 0.35;
      let progress = (start - rect.top) / (start - end);
      progress = Math.min(1, Math.max(0, progress));
      const revealCount = Math.round(progress * words.length);

      if (revealCount !== lastRevealCount) {
        lastRevealCount = revealCount;
        for (let i = 0; i < words.length; i++) {
          if (i < revealCount) {
            words[i].classList.add("revealed");
          } else {
            words[i].classList.remove("revealed");
          }
        }
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    // Run initial update on mount (handles page refresh when already scrolled down)
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    // Synchronize with Lenis smooth scrolling for frame-perfect momentum sync
    const lenis = (window as unknown as {
      __lenis?: {
        on: (event: string, cb: () => void) => void;
        off: (event: string, cb: () => void) => void;
      };
    }).__lenis;

    if (lenis?.on) {
      lenis.on("scroll", update);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (lenis?.off) {
        lenis.off("scroll", update);
      }
    };
  }, []);

  const tokens = ABOUT_TEXT.split(/(\s+)/);

  return (
    <section ref={containerRef} id="intro">
      <p className="intro-label">(01) &mdash; About</p>
      <p ref={textRef} className="intro-text">
        {tokens.map((token, idx) => {
          if (/^\s+$/.test(token)) {
            return token;
          }
          const isEmphasis =
            token.toLowerCase().includes("obvious") ||
            token.toLowerCase().includes("clarity");
          return (
            <span
              key={idx}
              className={`word ${isEmphasis ? "emphasis" : ""}`}
            >
              {token}
            </span>
          );
        })}
      </p>

      <div className="intro-footer">
        <ul className="intro-skills">
          {SKILLS.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>

        <Link href="/about" className="intro-more">
          <span>Read Design Monograph</span>
          <svg
            viewBox="0 0 24 24"
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

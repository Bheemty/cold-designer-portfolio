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
    const container = containerRef.current;
    const textEl = textRef.current;
    if (!container || !textEl) return;

    const words = Array.from(textEl.querySelectorAll<HTMLSpanElement>(".word"));
    if (!words.length) return;

    let cachedTop = 0;
    let cachedHeight = 0;
    let lastRevealCount = -1;
    let ticking = false;
    let isVisible = false;

    // Cache layout bounds on resize to NEVER trigger layout thrashing during scroll
    function measure() {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      cachedTop = rect.top + window.scrollY;
      cachedHeight = container.offsetHeight;
    }

    measure();

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? false;
        if (isVisible) update();
      },
      { rootMargin: "150px 0px 150px 0px" }
    );
    observer.observe(container);

    function update() {
      ticking = false;
      if (!isVisible) return;

      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const start = cachedTop - vh * 0.85;
      const end = cachedTop - vh * 0.25;

      let progress = (scrollY - start) / (end - start);
      progress = Math.min(1, Math.max(0, progress));
      const revealCount = Math.round(progress * words.length);

      if (revealCount !== lastRevealCount) {
        lastRevealCount = revealCount;
        words.forEach((w, i) => {
          w.classList.toggle("revealed", i < revealCount);
        });
      }
    }

    function onScroll() {
      if (!isVisible) return;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const tokens = ABOUT_TEXT.split(/(\s+)/);

  return (
    <section ref={containerRef} id="intro">
      <p className="intro-label">(01) &mdash; About</p>
      <p ref={textRef} className="intro-text">
        {tokens.map((token, idx) => {
          if (/^\s+$/.test(token)) {
            return " ";
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
          Read design monograph <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}

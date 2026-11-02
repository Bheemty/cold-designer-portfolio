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

    let isSectionVisible = false;
    let lastRevealCount = -1;
    let ticking = false;

    const observer = new IntersectionObserver(
      (entries) => {
        isSectionVisible = entries[0]?.isIntersecting ?? false;
        if (isSectionVisible) update();
      },
      { rootMargin: "100px 0px 100px 0px" }
    );
    observer.observe(container);

    function update() {
      ticking = false;
      if (!textEl || !isSectionVisible) return;

      const rect = textEl.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.9;
      const end = vh * 0.32;
      let progress = (start - rect.top) / (start - end);
      progress = Math.min(1, Math.max(0, progress));
      const revealCount = Math.round(progress * words.length);

      // Only touch the DOM when the count actually changes
      if (revealCount !== lastRevealCount) {
        lastRevealCount = revealCount;
        words.forEach((w, i) => {
          w.classList.toggle("revealed", i < revealCount);
        });
      }
    }

    function onScroll() {
      if (!isSectionVisible) return;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
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

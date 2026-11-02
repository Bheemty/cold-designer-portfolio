"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const ABOUT_TEXT =
  "I turn complex, real-world problems into products people actually understand, and then I build them. Interfaces that feel obvious, prototypes that actually work, and design systems that quietly do the heavy lifting.";

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

    const words = textEl.querySelectorAll<HTMLSpanElement>(".word");
    if (!words.length) return;

    let ticking = false;

    function update() {
      ticking = false;
      if (!textEl) return;
      const rect = textEl.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.9;
      const end = vh * 0.35;
      let progress = (start - rect.top) / (start - end);
      progress = Math.min(1, Math.max(0, progress));
      const revealCount = Math.round(progress * words.length);

      words.forEach((w, i) => {
        w.classList.toggle("revealed", i < revealCount);
      });
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
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
          const isEmphasis = token.toLowerCase().includes("understand");
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
          More about me <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}


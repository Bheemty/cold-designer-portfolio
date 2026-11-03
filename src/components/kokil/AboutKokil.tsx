"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ABOUT_LINES = [
  {
    prefix: "I design digital products that make complex systems feel ",
    emphasis: "obvious",
    suffix: ".",
  },
  {
    prefix: "Less decorative clutter, more functional ",
    emphasis: "clarity",
    suffix: " \u2014",
  },
  {
    prefix: "translating messy workflows into structured interfaces,",
    emphasis: null,
    suffix: "",
  },
  {
    prefix: "disciplined design systems, and rapid working prototypes.",
    emphasis: null,
    suffix: "",
  },
];

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
  const labelRef = useRef<HTMLParagraphElement>(null);
  const linesRef = useRef<Array<HTMLSpanElement | null>>([]);
  const skillsListRef = useRef<HTMLUListElement>(null);
  const moreRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const label = labelRef.current;
    const skillsList = skillsListRef.current;
    const moreLink = moreRef.current;
    const lines = linesRef.current.filter((el): el is HTMLSpanElement => el !== null);

    if (!container || !label || !skillsList || !moreLink || lines.length === 0) return;

    // Respect reduced-motion preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set([label, ...lines, ...Array.from(skillsList.children), moreLink], {
        opacity: 1,
        y: 0,
        clearProps: "all",
      });
      return;
    }

    const skillsItems = Array.from(skillsList.children) as HTMLElement[];

    // Build the scroll-connected scrubbed animation timeline
    // Exactly matches Kokil Tamta reference: progressive illumination and subtle vertical rise
    // linked directly to scroll velocity, naturally reversing on upward scroll and replaying on re-entry.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 82%",
        end: "top 30%",
        scrub: 0.65, // Responsive, silky smooth catch-up with Lenis
        invalidateOnRefresh: true,
      },
      defaults: {
        ease: "power2.out",
      },
    });

    // 1. (01) — About label glides in
    tl.fromTo(
      label,
      { y: 14, opacity: 0.25 },
      { y: 0, opacity: 1, duration: 0.25 },
      0
    );

    // 2. Line 1: Mission statement
    tl.fromTo(
      lines[0],
      { y: 24, opacity: 0.22 },
      { y: 0, opacity: 1, duration: 0.38 },
      0.04
    );

    // 3. Line 2: Philosophy
    tl.fromTo(
      lines[1],
      { y: 24, opacity: 0.22 },
      { y: 0, opacity: 1, duration: 0.38 },
      0.22
    );

    // 4. Line 3: Execution
    tl.fromTo(
      lines[2],
      { y: 24, opacity: 0.22 },
      { y: 0, opacity: 1, duration: 0.38 },
      0.42
    );

    // 5. Line 4: Output
    tl.fromTo(
      lines[3],
      { y: 24, opacity: 0.22 },
      { y: 0, opacity: 1, duration: 0.38 },
      0.62
    );

    // 6. Skills pills cascade
    tl.fromTo(
      skillsItems,
      { y: 16, opacity: 0.2 },
      { y: 0, opacity: 1, duration: 0.3, stagger: 0.025 },
      0.75
    );

    // 7. "Read Design Monograph" link
    tl.fromTo(
      moreLink,
      { y: 16, opacity: 0.2 },
      { y: 0, opacity: 1, duration: 0.3 },
      0.82
    );

    // Ensure clean reset when at top of Hero
    const handleScrollZeroCheck = () => {
      if (window.scrollY < 30) {
        if (tl.progress() > 0) {
          tl.progress(0);
        }
      }
    };
    window.addEventListener("scroll", handleScrollZeroCheck, { passive: true });

    // Connect Lenis smooth scrolling updates to ScrollTrigger
    const lenis = (window as unknown as { __lenis?: { on: (event: string, cb: () => void) => void; off: (event: string, cb: () => void) => void } }).__lenis;
    const onLenisScroll = () => {
      ScrollTrigger.update();
    };
    if (lenis?.on) {
      lenis.on("scroll", onLenisScroll);
    }

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      window.removeEventListener("scroll", handleScrollZeroCheck);
      window.removeEventListener("resize", handleResize);
      if (lenis?.off) {
        lenis.off("scroll", onLenisScroll);
      }
    };
  }, []);

  return (
    <section ref={containerRef} id="intro">
      <p ref={labelRef} className="intro-label">
        (01) &mdash; About
      </p>
      <p className="intro-text">
        {ABOUT_LINES.map((line, idx) => (
          <span key={idx} className="intro-line">
            <span
              ref={(el) => {
                linesRef.current[idx] = el;
              }}
              className="intro-line-inner"
            >
              {line.prefix}
              {line.emphasis && <span className="emphasis">{line.emphasis}</span>}
              {line.suffix}
            </span>
          </span>
        ))}
      </p>

      <div className="intro-footer">
        <ul ref={skillsListRef} className="intro-skills">
          {SKILLS.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>

        <Link ref={moreRef} href="/about" className="intro-more">
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

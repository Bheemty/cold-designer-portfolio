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

    // Build the entrance animation timeline
    const tl = gsap.timeline({
      paused: true,
      defaults: {
        ease: "power3.out",
      },
    });

    // 1. (01) — About section label reveals
    tl.fromTo(
      label,
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55 },
      0
    );

    // 2. Line-by-line editorial reveal with subtle vertical glide and opacity transition
    tl.fromTo(
      lines,
      { y: 34, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.82,
        stagger: 0.12,
      },
      0.08
    );

    // 3. Skills pills stagger in smoothly
    tl.fromTo(
      skillsItems,
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.035,
        ease: "power2.out",
      },
      0.45
    );

    // 4. "Read Design Monograph" link glides into position
    tl.fromTo(
      moreLink,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" },
      0.55
    );

    // Check initial position on mount (handles page refresh while already scrolled down)
    const checkInitialPosition = () => {
      const rect = container.getBoundingClientRect();
      const triggerThreshold = window.innerHeight * 0.78;
      if (rect.top <= triggerThreshold && rect.bottom > 0) {
        tl.progress(1);
      } else {
        tl.pause(0);
      }
    };

    checkInitialPosition();

    // ScrollTrigger to handle entering from Hero, reversing towards Hero, and replaying
    const st = ScrollTrigger.create({
      trigger: container,
      start: "top 78%",
      end: "bottom 15%",
      onEnter: () => {
        // Scrolling down from Hero into About: replay entrance animation from initial state
        tl.restart();
      },
      onLeaveBack: () => {
        // Scrolling upwards towards Hero: reverse reveal naturally back to concealed state
        tl.reverse();
      },
      onEnterBack: () => {
        // Scrolling up from Selected Work into About: ensure content stays fully visible
        tl.play();
      },
    });

    // Reset when visitor is back at the top of Hero (handles rapid scroll-to-top)
    const handleScrollTopCheck = () => {
      if (window.scrollY < 40) {
        if (tl.progress() > 0 && !tl.reversed()) {
          tl.pause(0);
        }
      }
    };

    window.addEventListener("scroll", handleScrollTopCheck, { passive: true });

    // Connect Lenis smooth scrolling updates to ScrollTrigger if active
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
      st.kill();
      tl.kill();
      window.removeEventListener("scroll", handleScrollTopCheck);
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

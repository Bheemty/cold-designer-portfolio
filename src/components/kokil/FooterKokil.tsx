"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { sound } from "@/lib/sounds";

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
    href: "https://www.linkedin.com/in/taye-abolarin-b503b0240/",
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
    href: "https://www.behance.net/Abolarin_Taye_Joseph",
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
    name: "TikTok",
    desc: "Design process videos, interface interactions & breakdowns",
    href: "https://www.tiktok.com/@taye_abolarin2",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
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
  const { theme, toggleTheme, mounted } = useTheme();
  const [copied, setCopied] = useState(false);
  const [watTime, setWatTime] = useState("");
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const formatWat = () => {
      try {
        const formatted = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Africa/Lagos",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date());
        setWatTime(formatted);
      } catch {
        setWatTime("17:45");
      }
    };
    formatWat();
    const timer = setInterval(formatWat, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText("abolarintaye20@gmail.com");
      sound.playTick();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = "mailto:abolarintaye20@gmail.com";
    }
  };
  const headerRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const footer = footerRef.current;
    const header = headerRef.current;
    const action = actionRef.current;
    const list = listRef.current;
    if (!footer || !header || !action || !list) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const listItems = Array.from(list.children) as HTMLElement[];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: "top 88%",
        toggleActions: "play none none reverse",
        fastScrollEnd: true,
      },
    });

    tl.fromTo(
      header,
      { y: 24, opacity: 0.25 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", clearProps: "transform" }
    );

    tl.fromTo(
      action,
      { y: 24, opacity: 0.2 },
      { y: 0, opacity: 1, duration: 0.45, ease: "power2.out", clearProps: "transform" },
      "-=0.25"
    );

    tl.fromTo(
      listItems,
      { y: 20, opacity: 0.2 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: "power2.out", clearProps: "transform" },
      "-=0.2"
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const footerEl = footerRef.current;
    if (!footerEl) return;

    let isFooterVisible = false;
    let isEyeLoopRunning = false;
    let eyeRaf = 0;

    const startEyeLoop = () => {
      if (!isEyeLoopRunning && isFooterVisible && !document.hidden) {
        isEyeLoopRunning = true;
        eyeRaf = requestAnimationFrame(renderEyes);
      }
    };

    const stopEyeLoop = () => {
      if (eyeRaf) {
        cancelAnimationFrame(eyeRaf);
        eyeRaf = 0;
      }
      isEyeLoopRunning = false;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries[0]?.isIntersecting ?? false;
        isFooterVisible = intersecting;
        if (intersecting) {
          startEyeLoop();
        } else {
          stopEyeLoop();
        }
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

    function renderEyes() {
      if (!isFooterVisible || document.hidden || eyeCenters.length === 0) {
        isEyeLoopRunning = false;
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

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopEyeLoop();
      } else if (isFooterVisible) {
        startEyeLoop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    function handleMouseMove(e: MouseEvent) {
      if (!isFooterVisible) return;
      pendingPointerX = e.clientX;
      pendingPointerY = e.clientY;
      startEyeLoop();
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const blinkInterval = setInterval(() => {
      if (!isFooterVisible || document.hidden) return;
      eyeEls.forEach((eye) => eye.classList.add("blink"));
      setTimeout(() => {
        eyeEls.forEach((eye) => eye.classList.remove("blink"));
      }, 150);
    }, 4000);

    return () => {
      observer.disconnect();
      stopEyeLoop();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
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
      <div className="contact-grid">
        <div>
          <div ref={headerRef}>
            <p className="intro-label">(04) &mdash; Contact</p>
            <h2 className="contact-title">
              Let&rsquo;s build something <span>people understand.</span>
            </h2>
          </div>

          {/* Prominent, Intentional Contact Action */}
          <div ref={actionRef} className="contact-action-zone">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="contact-direct-btn w-full text-left cursor-pointer"
              aria-label="Copy email abolarintaye20@gmail.com"
              data-cursor-text="Copy Email"
            >
              <div className="contact-direct-content">
                <span className="contact-direct-label">
                  {copied ? "Clipboard Updated ✓" : "Direct Communication (Click to Copy)"}
                </span>
                <span className="contact-direct-address">
                  {copied ? "abolarintaye20@gmail.com (Copied ✓)" : "abolarintaye20@gmail.com"}
                </span>
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
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </button>

            <div className="contact-sub-actions">
              <Link href="/contact" className="contact-form-link">
                <span>Start Structured Project Brief</span>
                <svg
                  viewBox="0 0 24 24"
                  width="13"
                  height="13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <ul ref={listRef} className="contact-list">
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
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="site-footer">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 font-mono-code text-xs">
          <span>&copy; 2026 Taye Abolarin (Cold Designer)</span>
          <span className="inline-flex items-center gap-1.5 text-[#a9ddf0]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            <span>Available for Roles &middot; {watTime || "17:45"} WAT</span>
          </span>
        </div>
        <div className="footer-links">
          <Link href="/work">Work</Link>
          <Link href="/about">About</Link>
          <Link href="/lab">Lab</Link>
          <a
            href="https://www.linkedin.com/in/taye-abolarin-b503b0240/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="mailto:abolarintaye20@gmail.com">Contact</a>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              toggleTheme();
            }}
            className="footer-theme-toggle"
            aria-label={mounted && theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {mounted && theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
        <a href="#hero" className="footer-top" onClick={scrollToTop}>
          Back to top &uarr;
        </a>
      </div>
    </footer>
  );
}

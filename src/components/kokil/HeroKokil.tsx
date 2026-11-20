"use client";

import { useEffect, useRef, useState } from "react";
import { sound } from "@/lib/sounds";

export default function HeroKokil() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [watTime, setWatTime] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Live West Africa Time (WAT) Clock
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

  // Choreographed entrance timing trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 40);
    return () => clearTimeout(timer);
  }, []);

  // Video playback lifecycle, IntersectionObserver & reduced-motion handling
  useEffect(() => {
    const video = videoRef.current;
    const hero = heroRef.current;
    if (!video || !hero) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // If user prefers reduced motion, pause video immediately
    if (mediaQuery.matches) {
      video.pause();
    } else {
      video.muted = true;
      video.play().catch(() => {});
    }

    // Play once cleanly and hold on final composed frame
    const handleEnded = () => {
      video.pause();
    };
    video.addEventListener("ended", handleEnded);

    // Performance Guardrail: IntersectionObserver to pause playback when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          if (!mediaQuery.matches && video.paused && !video.ended) {
            video.play().catch(() => {});
          }
        } else {
          if (!video.paused) {
            video.pause();
          }
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(hero);

    return () => {
      observer.disconnect();
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Smooth scroll handlers for anchor navigation
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    sound.playClick();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.hash = `#${targetId}`;
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className={`hero-cinematic ${isLoaded ? "hero-loaded" : ""}`}
    >
      {/* ── FULL-BLEED CINEMATIC VIDEO BACKGROUND ── */}
      <div className="hero-video-wrap" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero-video"
          src="/video/hero-studio.mp4"
          poster="/video/hero-studio-poster.webp"
          autoPlay
          muted
          playsInline
          preload="auto"
        />
        {/* Dark Editorial Scrim Overlay for WCAG AA+ Text Contrast */}
        <div className="hero-scrim" />
      </div>

      {/* ── HERO CONTENT WITH CHOREOGRAPHED ENTRANCE ── */}
      <div className="hero-content">
        <div className="hero-main">
          {/* Staggered Line 1: Intro (Delays 1.0s) */}
          <div className="hero-line-mask">
            <p className="hero-hello hero-anim-hello">
              Hi, I&rsquo;m Taye &mdash; a
            </p>
          </div>

          {/* Staggered Lines 2 & 3: Product Designer (Delays 1.0s - 1.2s) */}
          <h1 className="hero-title">
            <div className="hero-line-mask">
              <span className="line line-1 hero-anim-title-1">Product</span>
            </div>
            <div className="hero-line-mask line-2-mask">
              <span className="line line-2 hero-anim-title-2">Designer</span>
            </div>
          </h1>
        </div>

        {/* Subcopy & CTAs (Delays 1.4s & 1.7s) */}
        <div className="hero-bottom">
          <div className="hero-line-mask hero-desc-mask">
            <p className="hero-desc hero-anim-desc">
              I take complex, messy workflows from 0-to-1 strategy to clear interfaces and live working prototypes—across HealthTech, FinTech, Mobility, AI, and Commerce.
            </p>
          </div>
          <div className="hero-actions-wrap hero-anim-actions">
            <div className="hero-actions">
              <a
                href="#work"
                onClick={(e) => handleScrollTo(e, "work")}
                className="hero-btn primary"
              >
                Explore selected work <span aria-hidden="true">&darr;</span>
              </a>
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, "contact")}
                className="hero-btn ghost"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Metadata & Live WAT Ticker Strip (Delays 1.7s) */}
        <div className="hero-strip-wrap hero-anim-strip">
          <div className="hero-strip">
            <span className="inline-flex items-center gap-1.5 font-mono-code text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              <span>Available for Product Roles &middot; {watTime || "17:45"} WAT</span>
            </span>
            <span className="skills">
              0-to-1 Product Strategy<span className="dot">&middot;</span>Design Systems<span className="dot">&middot;</span>Live Prototypes<span className="dot">&middot;</span>Cross-Industry UX
            </span>
            <span>Scroll &darr;</span>
          </div>
        </div>
      </div>
    </section>
  );
}

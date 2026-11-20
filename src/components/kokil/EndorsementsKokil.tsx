"use client";

import { useState, useCallback, useEffect } from "react";
import { sound } from "@/lib/sounds";

export interface EndorsementItem {
  quote: string;
  endorser: string;
  affiliation: string;
  context: string;
}

export const ENDORSEMENTS: EndorsementItem[] = [
  {
    quote:
      "Taye consistently delivered user-centered designs that balanced functionality with aesthetics. His attention to detail and ability to translate ideas into intuitive, thoughtful designs made my development work smoother and more efficient. He’s a true collaborator—always open to feedback and proactive in ensuring the best possible user experience.",
    endorser: "Tobi Makinde",
    affiliation: "Full-Stack Software Engineer & Founder, Quicck",
    context: "Product & Front-End Delivery",
  },
  {
    quote:
      "Taye owns the product problem end-to-end. He cuts through complex clinical requirements quickly, spots edge cases before engineering starts, and turns messy workflows into clear, buildable interfaces our team can ship with confidence.",
    endorser: "MEDesy Solutions",
    affiliation: "Product & Engineering Team",
    context: "Ongoing Product Design & Handoff",
  },
  {
    quote:
      "Bringing structure to an unpredictable real-world workflow is never easy, but Taye approached every screen with discipline and clarity. His design system work gave our mobile experience a cohesive, trustworthy feel from day one.",
    endorser: "9jaTrip",
    affiliation: "Founding Team",
    context: "Mobile Product & Design Systems",
  },
  {
    quote:
      "Designing for autonomous AI requires real restraint. Taye helped us establish clear verification patterns and a sharp dual-theme system that made complex financial actions feel calm, transparent, and firmly in the user’s control.",
    endorser: "PAAI",
    affiliation: "Product Leadership",
    context: "AI Interaction & Mobile Systems",
  },
  {
    quote:
      "Working with Taye feels like adding a product partner, not just a designer. He balances user clarity with business priorities, prototypes fast so we can validate real interactions early, and keeps every detail sharp through delivery.",
    endorser: "Greall",
    affiliation: "Product & Growth Team",
    context: "End-to-End Product Strategy & UI",
  },
];

export default function EndorsementsKokil() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const total = ENDORSEMENTS.length;
  const current = ENDORSEMENTS[activeIndex];

  const goTo = useCallback(
    (index: number) => {
      if (index === activeIndex || isTransitioning) return;
      sound.playClick();
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex(index);
        setIsTransitioning(false);
      }, 160);
    },
    [activeIndex, isTransitioning]
  );

  const handlePrev = useCallback(() => {
    goTo((activeIndex - 1 + total) % total);
  }, [activeIndex, total, goTo]);

  const handleNext = useCallback(() => {
    goTo((activeIndex + 1) % total);
  }, [activeIndex, total, goTo]);

  // Keyboard navigation when focus is inside the endorsements section
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const section = document.getElementById("endorsements");
      if (section && (section.contains(activeEl) || activeEl === section)) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          handlePrev();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          handleNext();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <section
      id="endorsements"
      className="endorsements-section relative w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-24 sm:py-32"
      aria-label="Client & Collaborator Endorsements"
    >
      <div className="endorsements-inner w-full">
        {/* Section Header & Editorial Stepper Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-10 border-b border-white/[0.08] mb-12 sm:mb-16">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a9ddf0]" aria-hidden="true" />
            <p className="intro-label font-mono-code text-xs uppercase tracking-widest text-[#a9ddf0] m-0">
              (03) &mdash; Endorsements
            </p>
          </div>

          {/* Stepper Navigation: [ 01 / 05 ] + Prev/Next Controls */}
          <div
            className="endorsement-stepper flex items-center gap-3 font-mono-code text-xs self-start sm:self-center"
            role="region"
            aria-label="Endorsements pagination"
          >
            {/* Numbered quick-select pills */}
            <div className="flex items-center gap-1.5">
              {ENDORSEMENTS.map((_, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => goTo(idx)}
                    aria-label={`View endorsement 0${idx + 1}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`h-7 px-2.5 rounded-full border transition-all cursor-pointer font-mono-code text-[11px] ${
                      isActive
                        ? "border-[#a9ddf0] bg-[#a9ddf0]/15 text-[#a9ddf0] font-semibold shadow-[0_0_12px_rgba(169,221,240,0.2)]"
                        : "border-white/[0.1] bg-white/[0.02] text-[#89919d] hover:border-white/30 hover:text-[#f2f1ec]"
                    }`}
                  >
                    0{idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="h-3.5 w-px bg-white/[0.12] mx-1" aria-hidden="true" />

            {/* Stepper arrows */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous endorsement"
                className="h-7 w-7 rounded-full border border-white/[0.1] bg-white/[0.02] text-[#89919d] hover:border-[#a9ddf0] hover:text-[#a9ddf0] flex items-center justify-center transition-colors cursor-pointer"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="12"
                  height="12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next endorsement"
                className="h-7 w-7 rounded-full border border-white/[0.1] bg-white/[0.02] text-[#89919d] hover:border-[#a9ddf0] hover:text-[#a9ddf0] flex items-center justify-center transition-colors cursor-pointer"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="12"
                  height="12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Editorial Pull-Quote with GPU-composited crossfade */}
        <div className="endorsement-body min-h-[300px] sm:min-h-[260px] flex flex-col justify-between">
          <blockquote
            className={`endorsement-quote transition-all duration-200 ease-out ${
              isTransitioning
                ? "opacity-0 translate-y-1"
                : "opacity-100 translate-y-0"
            }`}
            style={{ willChange: "opacity, transform" }}
          >
            <span className="quote-mark" aria-hidden="true">&ldquo;</span>
            {current.quote}
            <span className="quote-mark" aria-hidden="true">&rdquo;</span>
          </blockquote>

          {/* Pure Typographic Hierarchy Signature (NO "Author:" or "Role:" field labels) */}
          <div
            className={`endorsement-meta transition-all duration-200 ease-out ${
              isTransitioning
                ? "opacity-0 translate-y-1"
                : "opacity-100 translate-y-0"
            }`}
            style={{ willChange: "opacity, transform" }}
          >
            {/* Bold Primary Line (Endorser) + Muted Secondary Line (Affiliation) */}
            <div className="endorsement-author-block">
              <h3 className="endorsement-author-name">{current.endorser}</h3>
              <p className="endorsement-author-role">{current.affiliation}</p>
            </div>

            {/* Subtle Monospace Tag (Context) */}
            <div className="endorsement-context-pill">
              <span className="context-indicator" aria-hidden="true" />
              <span>{current.context}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

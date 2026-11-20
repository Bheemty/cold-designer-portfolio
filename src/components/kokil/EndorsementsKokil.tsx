"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
  const trackRef = useRef<HTMLElement>(null);
  const activeIndexRef = useRef(0);
  const tickingRef = useRef(false);

  // References to the 5 individual progress fill bars for zero-jank GPU scaleX mutations
  const fillRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mobileFillRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isCrossfading, setIsCrossfading] = useState(false);

  const total = ENDORSEMENTS.length;
  const current = ENDORSEMENTS[activeIndex];

  // Core scroll handler: updates continuous hairline progress bar via DOM refs across all viewports
  // and only triggers React state updates when crossing 20% step thresholds for locked 60fps performance.
  const updateScrollProgress = useCallback(() => {
    tickingRef.current = false;
    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const scrollDistance = track.offsetHeight - window.innerHeight;
    if (scrollDistance <= 0) return;

    const currentScroll = -rect.top;
    const progress = Math.min(1, Math.max(0, currentScroll / scrollDistance));

    // Calculate active step index: 0, 1, 2, 3, 4 (20% per endorsement)
    const newIndex = Math.min(total - 1, Math.floor(progress * total));

    // Update the 5 hairline fill bars directly on DOM for zero-re-render GPU compositing
    for (let s = 0; s < total; s++) {
      const targets = [fillRefs.current[s], mobileFillRefs.current[s]];
      for (const fillEl of targets) {
        if (!fillEl) continue;

        if (s < newIndex) {
          fillEl.style.transform = "scaleX(1)";
          fillEl.style.opacity = "1";
        } else if (s > newIndex) {
          fillEl.style.transform = "scaleX(0)";
          fillEl.style.opacity = "0.25";
        } else {
          // Active segment fills smoothly from 0% to 100% across its 0.20 span
          const segmentProgress = Math.min(1, Math.max(0, (progress - newIndex * (1 / total)) * total));
          fillEl.style.transform = `scaleX(${segmentProgress})`;
          fillEl.style.opacity = "1";
        }
      }
    }

    // Only commit React state update when crossing the threshold boundary
    if (newIndex !== activeIndexRef.current) {
      activeIndexRef.current = newIndex;
      sound.playTick();
      setIsCrossfading(true);
      setTimeout(() => {
        setActiveIndex(newIndex);
        setIsCrossfading(false);
      }, 140);
    }
  }, [total]);

  // Synchronize with scroll across native window scroll & Lenis smooth scroll
  useEffect(() => {
    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(updateScrollProgress);
      }
    };

    updateScrollProgress();

    // Attach to Lenis smooth scroll ticker if active
    const lenis = (window as unknown as {
      __lenis?: {
        on: (e: string, cb: () => void) => void;
        off: (e: string, cb: () => void) => void;
      };
    }).__lenis;

    if (lenis?.on) {
      lenis.on("scroll", onScroll);
    } else {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (lenis?.off) {
        lenis.off("scroll", onScroll);
      }
    };
  }, [updateScrollProgress]);

  // Clickable step jump: works identically on desktop, tablet, and mobile
  const handleJumpToStep = (targetIndex: number) => {
    sound.playTick();

    const track = trackRef.current;
    if (!track) return;

    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const scrollDistance = track.offsetHeight - window.innerHeight;
    // Aim 4% into that endorsement's slice so it activates firmly
    const stepRatio = targetIndex * (1 / total) + 0.04;
    const targetScroll = Math.round(trackTop + stepRatio * scrollDistance);

    const lenis = (window as unknown as {
      __lenis?: {
        scrollTo: (target: number, options?: { duration?: number }) => void;
      };
    }).__lenis;

    if (lenis?.scrollTo) {
      lenis.scrollTo(targetScroll, { duration: 0.75 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={trackRef}
      id="endorsements"
      className="endorsements-track relative w-full"
      aria-label="Client &amp; Collaborator Endorsements"
    >
      {/* Sticky Viewport Container: stays pinned at top: 0, height: 100dvh across ALL screen sizes */}
      <div className="endorsements-sticky w-full flex items-center justify-center">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 py-6 sm:py-10">
          
          {/* Eyebrow Header */}
          <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-white/[0.08] endorsement-divider mb-6 sm:mb-10">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a9ddf0]" aria-hidden="true" />
              <p className="intro-label font-mono-code text-xs uppercase tracking-widest text-[#a9ddf0] m-0">
                (03) &mdash; Endorsements
              </p>
            </div>

            {/* Quiet, ultra-subtle monospace caption on desktop/tablet, hidden on mobile for zero clutter */}
            <div className="hidden sm:flex items-center gap-2 font-mono-code text-[11px] text-[#89919d]/60">
              <span>[0-to-1 Feedback]</span>
              <span>Verified Collaborations</span>
            </div>
          </div>

          {/* DESKTOP & TABLET LAYOUT (>= 768px: 2-Column Split) */}
          <div className="hidden md:grid md:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* ── LEFT COLUMN (Counter + Endorser + 5-Bar Stepper) ── */}
            <div className="md:col-span-5 lg:col-span-4 flex flex-col justify-between h-full pr-6 lg:pr-8 border-r border-white/[0.08] endorsement-divider">
              
              {/* Top: Prominent Monospace Step Counter: 01 / 05 */}
              <div className="flex items-baseline gap-2.5 font-mono-code mb-8">
                <span className="endorsement-step-num text-5xl lg:text-6xl font-bold tracking-tight text-[#f2f1ec] transition-colors duration-200">
                  0{activeIndex + 1}
                </span>
                <span className="endorsement-step-total text-2xl text-[#89919d] font-normal">
                  / 0{total}
                </span>
              </div>

              {/* Middle: Endorser Identity (Pure Typographic Hierarchy — NO "Author:" or "Role:" labels) */}
              <div
                className={`space-y-3 mb-10 transition-all duration-200 ease-out ${
                  isCrossfading ? "opacity-0 translate-y-1.5" : "opacity-100 translate-y-0"
                }`}
                style={{ willChange: "opacity, transform" }}
              >
                <h3 className="endorsement-author-name text-2xl sm:text-3xl font-bold font-display text-[#FDFDFD] tracking-tight m-0">
                  {current.endorser}
                </h3>
                <p className="endorsement-author-role text-xs sm:text-sm font-mono-code text-[#89919d] tracking-wide m-0">
                  {current.affiliation}
                </p>
                <div className="pt-2">
                  <div className="endorsement-context-pill inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-3.5 py-1.5 font-mono-code text-xs text-[#a9ddf0]">
                    <span className="context-indicator h-1.5 w-1.5 rounded-full bg-[#a9ddf0]" aria-hidden="true" />
                    <span>{current.context}</span>
                  </div>
                </div>
              </div>

              {/* Bottom: 5-Segment Horizontal Progress Indicator */}
              <div className="w-full pt-4 space-y-3">
                <div
                  className="grid grid-cols-5 gap-2 w-full"
                  role="tablist"
                  aria-label="Endorsements progress steps"
                >
                  {ENDORSEMENTS.map((_, idx) => {
                    const isCurrent = idx === activeIndex;
                    return (
                      <button
                        key={idx}
                        type="button"
                        role="tab"
                        aria-selected={isCurrent}
                        aria-label={`Jump to endorsement 0${idx + 1}`}
                        onClick={() => handleJumpToStep(idx)}
                        className="group flex flex-col items-start gap-1.5 cursor-pointer text-left py-1"
                      >
                        <span
                          className={`font-mono-code text-[11px] transition-colors ${
                            isCurrent
                              ? "text-[#a9ddf0] font-semibold"
                              : "text-[#89919d]/70 group-hover:text-[#f2f1ec]"
                          }`}
                        >
                          0{idx + 1}
                        </span>

                        <div className="h-[2px] w-full rounded-full bg-white/[0.12] endorsement-bar-track overflow-hidden relative">
                          <div
                            ref={(el) => {
                              fillRefs.current[idx] = el;
                            }}
                            className="h-full w-full rounded-full bg-[#a9ddf0] endorsement-bar-fill origin-left transition-transform duration-75"
                            style={{
                              transform: idx <= activeIndex ? "scaleX(1)" : "scaleX(0)",
                              opacity: idx <= activeIndex ? 1 : 0.25,
                              willChange: "transform",
                            }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between font-mono-code text-[11px] text-[#89919d] pt-1">
                  <span className="endorsement-scroll-hint tracking-wide">
                    {activeIndex < total - 1 ? (
                      <>
                        <span className="text-[#a9ddf0] font-medium">Scroll &darr;</span> for next endorsement
                      </>
                    ) : (
                      <>
                        <span className="text-[#a9ddf0] font-medium">Continue &darr;</span> into Contact
                      </>
                    )}
                  </span>
                  <span className="text-[10px] text-[#89919d]/60">
                    [Tappable Steps]
                  </span>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN (The Pull-Quote) ── */}
            <div className="md:col-span-7 lg:col-span-8 pl-4 lg:pl-8 flex items-center min-h-[300px]">
              <blockquote
                className={`endorsement-quote text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.38] text-[#FDFDFD] m-0 transition-all duration-300 ease-out ${
                  isCrossfading ? "opacity-0 translate-y-2.5" : "opacity-100 translate-y-0"
                }`}
                style={{ willChange: "opacity, transform" }}
              >
                <span className="quote-mark text-[#a9ddf0] font-serif italic mr-1" aria-hidden="true">
                  &ldquo;
                </span>
                {current.quote}
                <span className="quote-mark text-[#a9ddf0] font-serif italic ml-1" aria-hidden="true">
                  &rdquo;
                </span>
              </blockquote>
            </div>

          </div>

          {/* MOBILE LAYOUT (< 768px: Generously Spaced Vertical Stack) */}
          {/* Order: Top Header -> Upper-Middle (Quote) -> Lower-Middle (Attribution) -> Bottom Progress Strip */}
          <div className="flex md:hidden flex-col justify-between h-[calc(100dvh-120px)] max-h-[640px]">
            
            {/* Upper-Middle: The Quote (Primary Focus, comfortably scaled for 375px screens) */}
            <div className="flex-1 flex flex-col justify-center py-2">
              <blockquote
                className={`endorsement-quote text-base sm:text-lg font-medium leading-[1.45] text-[#FDFDFD] m-0 transition-all duration-300 ease-out ${
                  isCrossfading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                }`}
                style={{ willChange: "opacity, transform" }}
              >
                <span className="quote-mark text-[#a9ddf0] font-serif italic mr-1" aria-hidden="true">
                  &ldquo;
                </span>
                {current.quote}
                <span className="quote-mark text-[#a9ddf0] font-serif italic ml-1" aria-hidden="true">
                  &rdquo;
                </span>
              </blockquote>

              {/* Lower-Middle: Endorser Identity directly beneath quote */}
              <div
                className={`mt-4 pt-3 border-t border-white/[0.06] space-y-1 transition-all duration-200 ease-out ${
                  isCrossfading ? "opacity-0 translate-y-1.5" : "opacity-100 translate-y-0"
                }`}
                style={{ willChange: "opacity, transform" }}
              >
                <h3 className="endorsement-author-name text-lg font-bold font-display text-[#FDFDFD] tracking-tight m-0">
                  {current.endorser}
                </h3>
                <p className="endorsement-author-role text-xs font-mono-code text-[#89919d] tracking-wide m-0">
                  {current.affiliation}
                </p>
                <div className="pt-1">
                  <div className="endorsement-context-pill inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.03] px-2.5 py-1 font-mono-code text-[10px] text-[#a9ddf0]">
                    <span className="context-indicator h-1.5 w-1.5 rounded-full bg-[#a9ddf0]" aria-hidden="true" />
                    <span>{current.context}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom: Progress & Navigation Bar Strip pushed cleanly to bottom */}
            <div className="w-full pt-3 pb-1 border-t border-white/[0.08] space-y-2 shrink-0">
              <div className="flex items-center justify-between font-mono-code">
                <div className="flex items-baseline gap-1.5 text-xs">
                  <span className="endorsement-step-num font-bold text-[#f2f1ec]">0{activeIndex + 1}</span>
                  <span className="endorsement-step-total text-[#89919d]/70">/ 0{total}</span>
                </div>
                <span className="endorsement-scroll-hint text-[10px] text-[#89919d]">
                  {activeIndex < total - 1 ? (
                    <>
                      <span className="text-[#a9ddf0] font-medium">Scroll &darr;</span> for next
                    </>
                  ) : (
                    <>
                      <span className="text-[#a9ddf0] font-medium">Continue &darr;</span> into Contact
                    </>
                  )}
                </span>
              </div>

              {/* 5 Hairline Tappable Step Bars */}
              <div
                className="grid grid-cols-5 gap-1.5 w-full"
                role="tablist"
                aria-label="Endorsements progress steps"
              >
                {ENDORSEMENTS.map((_, idx) => {
                  const isCurrent = idx === activeIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      role="tab"
                      aria-selected={isCurrent}
                      aria-label={`Jump to endorsement 0${idx + 1}`}
                      onClick={() => handleJumpToStep(idx)}
                      className="group flex flex-col items-start gap-1 cursor-pointer text-left py-1"
                    >
                      <div className="h-[2px] w-full rounded-full bg-white/[0.12] endorsement-bar-track overflow-hidden relative">
                        <div
                          ref={(el) => {
                            mobileFillRefs.current[idx] = el;
                          }}
                          className="h-full w-full rounded-full bg-[#a9ddf0] endorsement-bar-fill origin-left transition-transform duration-75"
                          style={{
                            transform: idx <= activeIndex ? "scaleX(1)" : "scaleX(0)",
                            opacity: idx <= activeIndex ? 1 : 0.25,
                            willChange: "transform",
                          }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

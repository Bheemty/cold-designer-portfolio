"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Check, Compass, Sparkles } from "lucide-react";
import { sound } from "@/lib/sounds";

const PHILOSOPHIES = [
  {
    id: "clarity",
    number: "01",
    label: "Clarity Over Ornament",
    subtitle: "Cognitive Load Reduction",
    quote: "True sophistication is the ruthless elimination of unnecessary friction until the interface becomes transparent.",
    narrative:
      "Modern software is easily overwhelmed by decorative badges, noisy telemetry, and unearned visual complexity. My design process strips away superficial noise so that patients finding a doctor, or commuters hailing a vehicle, can complete critical tasks without mental exhaustion.",
    practice: "Applied in MEDesy's 3-step WhatsApp triage gateway, removing 100% of app onboarding friction.",
  },
  {
    id: "systems",
    number: "02",
    label: "Systematic Design Governance",
    subtitle: "From Token Architecture to Scale",
    quote: "A design system is not a static Figma gallery; it is a shared constitutional language between design and engineering.",
    narrative:
      "Every color token, typographic scale, elevation step, and spacing unit is architected with mathematical consistency. I bridge Figma variables with Tailwind CSS, React Native, and design tokens to ensure zero visual translation loss when shipping to production.",
    practice: "Applied across Greall's multi-platform rebrand and MEDesy's cross-surface component architecture.",
  },
  {
    id: "motion",
    number: "03",
    label: "Physicality & Restrained Motion",
    subtitle: "Spatial Orientation, Not Eye Candy",
    quote: "Motion without purpose is visual pollution. Intentional motion reassures human action through calibrated physics.",
    narrative:
      "Every transition in my work communicates where a user came from and where they arrived. By tuning spring stiffness and damping ratios rather than relying on linear time curves, interfaces feel tactile, natural, and grounded in spatial reality.",
    practice: "Calibrated across Stillwater Hall's chapter scrollytelling and Somewhere Hotel's reservation drawer.",
  },
  {
    id: "code",
    number: "04",
    label: "Design-to-Code Fluency",
    subtitle: "Zero Translation Loss",
    quote: "When designers understand the runtime constraints of the browser and native device, what gets designed is what ships.",
    narrative:
      "Designing with concrete understanding of component lifecycles, flexbox layout mechanics, touch target ergonomics, and responsive container queries ensures high-fidelity execution without endless engineering back-and-forth.",
    practice: "Directly authored Next.js, React Native Expo, and Tailwind CSS production interfaces.",
  },
];

export default function DesignManifesto() {
  const [activeTab, setActiveTab] = useState(0);
  const current = PHILOSOPHIES[activeTab];

  return (
    <section className="relative py-28 sm:py-40 px-6 sm:px-12 border-b border-white/[0.08] bg-[#090b0f] text-[#f2f1ec] overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Editorial Subhead */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 mb-20 border-b border-white/[0.08] pb-6">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a9ddf0]" />
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#a9ddf0]">
              Design Monograph
            </span>
          </div>
          <span className="font-mono-code text-xs text-[#89919d]">
            PRODUCT THINKING &amp; CREATIVE DOCTRINE
          </span>
        </div>

        {/* Lead Quote Composition */}
        <div className="mb-24 sm:mb-32">
          <span className="font-mono-code text-xs text-[#89919d] uppercase tracking-wider block mb-4">
            The Perspective
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold tracking-tight text-[#f2f1ec] leading-[1.08] max-w-5xl">
            &ldquo;I believe the most enduring digital products feel{" "}
            <span className="font-editorial-italic font-normal text-[#a9ddf0]">
              inevitable
            </span>{" "}
            — quiet amplifiers of human intent rather than noisy software obstacles.&rdquo;
          </h2>
        </div>

        {/* Interactive Doctrine Exhibition (Dennis Snellenberg / Oyin Inspired) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: 4 Selectable Principles */}
          <div className="lg:col-span-5 space-y-3 font-mono-code text-xs">
            {PHILOSOPHIES.map((p, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveTab(idx);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                    isActive
                      ? "border-[#a9ddf0] bg-[#161a23] shadow-lg shadow-[#a9ddf0]/10"
                      : "border-white/[0.08] bg-[#11141b]/60 hover:border-white/20 hover:bg-[#11141b]"
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[#a9ddf0] font-semibold text-[11px] block">
                      {p.number} // {p.subtitle}
                    </span>
                    <h3
                      className={`font-display text-xl sm:text-2xl font-bold transition-colors ${
                        isActive ? "text-[#f2f1ec]" : "text-[#89919d]"
                      }`}
                    >
                      {p.label}
                    </h3>
                  </div>

                  <span
                    className={`h-2.5 w-2.5 rounded-full transition-all ${
                      isActive ? "bg-[#a9ddf0] scale-125" : "bg-white/10"
                    }`}
                  />
                </button>
              );
            })}

            <div className="pt-6">
              <Link
                href="/about"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className="group inline-flex items-center gap-2 font-mono-code text-xs text-[#89919d] hover:text-[#a9ddf0] transition-colors"
              >
                <span>Read Full About &amp; Professional Background</span>
                <ArrowUpRight
                  size={13}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>
            </div>
          </div>

          {/* Right Column: Detailed Reading Card for Active Principle */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/[0.08] bg-[#11141b] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
                    <span className="font-mono-code text-xs text-[#a9ddf0] font-semibold tracking-wider">
                      PRINCIPLE {current.number}
                    </span>
                    <span className="font-mono-code text-xs text-[#89919d] uppercase">
                      {current.subtitle}
                    </span>
                  </div>

                  <blockquote className="font-display text-2xl sm:text-3xl font-bold text-[#f2f1ec] leading-snug">
                    &ldquo;{current.quote}&rdquo;
                  </blockquote>

                  <p className="text-base sm:text-lg text-[#89919d] font-light leading-relaxed">
                    {current.narrative}
                  </p>

                  <div className="rounded-xl border border-white/[0.06] bg-[#090b0f] p-5 font-mono-code text-xs space-y-1.5">
                    <span className="text-[#a9ddf0] font-semibold block uppercase tracking-wider text-[10px]">
                      VERIFIED APPLICATION IN PRODUCTION
                    </span>
                    <p className="text-[#f2f1ec]/90 leading-relaxed font-light">
                      {current.practice}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

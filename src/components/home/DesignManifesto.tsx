"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Check, Compass, Sparkles, Sliders, Layers, Cpu, ArrowRight } from "lucide-react";
import { sound } from "@/lib/sounds";

const DOCTRINES = [
  {
    id: "friction",
    number: "01",
    label: "Eliminating Cognitive Friction",
    subtitle: "Radical Task Simplification",
    quote: "True sophistication is the ruthless elimination of unnecessary friction until the interface feels inevitable.",
    narrative:
      "Modern digital products are often buried beneath decorative badges, noisy telemetry, and unearned visual complexity. My design process strips away superficial noise so that patients seeking medical care or commuters reserving transit can complete critical journeys without cognitive fatigue.",
    practice: "Applied in MEDesy's WhatsApp triage gateway, removing 100% of app onboarding friction.",
    specimenType: "friction",
  },
  {
    id: "systems",
    number: "02",
    label: "Constitutional Design Systems",
    subtitle: "From Token Architecture to Code",
    quote: "A design system is not a static Figma artboard; it is a shared constitutional language between design and production engineering.",
    narrative:
      "Every color token, typographic step, elevation state, and spacing unit is architected with mathematical consistency. I bridge Figma variables directly with Tailwind CSS, React Native, and design tokens to ensure zero visual translation loss when shipping to production.",
    practice: "Applied across Greall's corporate rebrand and MEDesy's cross-surface component library.",
    specimenType: "tokens",
  },
  {
    id: "motion",
    number: "03",
    label: "Calibrated Spatial Motion",
    subtitle: "Spatial Orientation, Not Eye Candy",
    quote: "Motion without purpose is visual pollution. Intentional motion reassures human action through calibrated physics.",
    narrative:
      "Every transition in my work communicates where a user came from and where they arrived. By tuning organic spring stiffness and damping ratios rather than linear time curves, interfaces feel tactile, responsive, and grounded in physical reality.",
    practice: "Calibrated across Stillwater Hall's chapter scrollytelling and Somewhere Hotel's reservation lookbook.",
    specimenType: "motion",
  },
  {
    id: "fluency",
    number: "04",
    label: "Design-to-Code Fluency",
    subtitle: "Zero Translation Loss",
    quote: "When a designer understands the runtime constraints of the browser and native device, what gets designed is what ships.",
    narrative:
      "Designing with concrete understanding of component lifecycles, flexbox layout mechanics, touch target ergonomics, and responsive container queries ensures high-fidelity execution without endless engineering friction.",
    practice: "Directly authored Next.js, React Native Expo SDK, and Tailwind CSS production interfaces.",
    specimenType: "code",
  },
];

export default function DesignManifesto() {
  const [activeTab, setActiveTab] = useState(0);
  const [frictionLevel, setFrictionLevel] = useState<"standard" | "cold">("cold");
  const [stiffness, setStiffness] = useState(350);
  const [damping, setDamping] = useState(28);

  const current = DOCTRINES[activeTab];

  return (
    <section className="relative py-28 sm:py-40 px-6 sm:px-12 border-b border-white/[0.08] bg-[#090b0f] text-[#f2f1ec] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -bottom-40 left-1/3 h-[500px] w-[500px] rounded-full bg-[#a9ddf0]/[0.02] blur-[160px]" />

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

        {/* Interactive Doctrine Exhibition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: 4 Selectable Principles */}
          <div className="lg:col-span-5 space-y-3 font-mono-code text-xs">
            {DOCTRINES.map((p, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveTab(idx);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`w-full text-left p-6 sm:p-7 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                    isActive
                      ? "border-[#a9ddf0] bg-[#11141b] shadow-xl shadow-[#a9ddf0]/10"
                      : "border-white/[0.08] bg-[#090b0f] hover:border-white/20 hover:bg-[#11141b]/60"
                  }`}
                >
                  <div className="space-y-1.5">
                    <span className="text-[#a9ddf0] font-semibold text-[11px] block">
                      {p.number} {"// "} {p.subtitle}
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
                <span>Read Full Professional Background</span>
                <ArrowUpRight
                  size={13}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>
            </div>
          </div>

          {/* Right Column: Detailed Reading Card & Live Interactive Specimen */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/[0.08] bg-[#11141b] p-8 sm:p-12 shadow-2xl relative overflow-hidden space-y-8">
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
                      DOCTRINE {current.number}
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

                  {/* INTERACTIVE CRAFT SPECIMEN */}
                  <div className="rounded-2xl border border-white/[0.08] bg-[#090b0f] p-6 space-y-4">
                    {current.specimenType === "friction" && (
                      <div className="space-y-4 font-mono-code text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[#a9ddf0] font-semibold uppercase tracking-wider text-[11px] flex items-center gap-2">
                            <Sliders size={13} />
                            Interactive Friction Audit
                          </span>
                          <div className="flex items-center gap-2 bg-[#11141b] p-1 rounded-full border border-white/5">
                            <button
                              onClick={() => setFrictionLevel("standard")}
                              className={`px-3 py-1 rounded-full transition-all ${
                                frictionLevel === "standard"
                                  ? "bg-white/10 text-[#f2f1ec]"
                                  : "text-[#89919d]"
                              }`}
                            >
                              Standard Flow (7 Steps)
                            </button>
                            <button
                              onClick={() => setFrictionLevel("cold")}
                              className={`px-3 py-1 rounded-full transition-all ${
                                frictionLevel === "cold"
                                  ? "bg-[#a9ddf0] text-[#090b0f] font-bold"
                                  : "text-[#89919d]"
                              }`}
                            >
                              Cold Redesign (3 Steps)
                            </button>
                          </div>
                        </div>

                        {frictionLevel === "standard" ? (
                          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-[#89919d]">
                            <div className="text-[#f2f1ec] font-semibold">Standard Industry App Journey:</div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
                              <span className="p-2 rounded bg-white/[0.02]">1. Download App</span>
                              <span className="p-2 rounded bg-white/[0.02]">2. Mandatory Signup</span>
                              <span className="p-2 rounded bg-white/[0.02]">3. Email OTP Verify</span>
                              <span className="p-2 rounded bg-white/[0.02]">4. Profile Setup</span>
                              <span className="p-2 rounded bg-white/[0.02]">5. Intake Form</span>
                              <span className="p-2 rounded bg-white/[0.02]">6. Payment Pre-auth</span>
                              <span className="p-2 rounded bg-white/[0.02]">7. Waiting Room</span>
                            </div>
                            <div className="text-[10px] text-red-400/80 pt-1">
                              Result: High cognitive exhaustion and significant drop-off during acute medical distress.
                            </div>
                          </div>
                        ) : (
                          <div className="p-4 rounded-xl bg-[#a9ddf0]/5 border border-[#a9ddf0]/20 space-y-2 text-[#f2f1ec]">
                            <div className="text-[#a9ddf0] font-semibold">Cold Redesign Flow (MEDesy WhatsApp Triage):</div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] text-[#f2f1ec]">
                              <span className="p-2.5 rounded bg-white/[0.04] border border-[#a9ddf0]/20">
                                01. Instant Chat Entry (Zero Signup)
                              </span>
                              <span className="p-2.5 rounded bg-white/[0.04] border border-[#a9ddf0]/20">
                                02. Conversational Symptom Triage
                              </span>
                              <span className="p-2.5 rounded bg-white/[0.04] border border-[#a9ddf0]/20">
                                03. Licensed Doctor Referral Card
                              </span>
                            </div>
                            <div className="text-[10px] text-[#a9ddf0] pt-1">
                              Result: 100% elimination of registration barriers. Patient reaches qualified care in seconds.
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {current.specimenType === "tokens" && (
                      <div className="space-y-4 font-mono-code text-xs">
                        <div className="flex items-center justify-between text-[11px] text-[#a9ddf0] uppercase tracking-wider font-semibold">
                          <span className="flex items-center gap-2">
                            <Layers size={13} />
                            Design Token Governance Specimen
                          </span>
                          <span className="text-[#89919d]">Tailwind ↔ Figma Token Map</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
                          <div className="p-3 rounded-xl bg-[#090b0f] border border-white/10 space-y-1">
                            <div className="h-4 w-full rounded bg-[#090b0f] border border-white/20" />
                            <span className="text-[#89919d] block text-[10px]">--bg-obsidian</span>
                            <span className="text-[#f2f1ec] font-bold">#090B0F</span>
                          </div>
                          <div className="p-3 rounded-xl bg-[#11141b] border border-white/10 space-y-1">
                            <div className="h-4 w-full rounded bg-[#11141b] border border-white/20" />
                            <span className="text-[#89919d] block text-[10px]">--bg-surface</span>
                            <span className="text-[#f2f1ec] font-bold">#11141B</span>
                          </div>
                          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
                            <div className="h-4 w-full rounded bg-[#f2f1ec]" />
                            <span className="text-[#89919d] block text-[10px]">--text-warm-ivory</span>
                            <span className="text-[#f2f1ec] font-bold">#F2F1EC</span>
                          </div>
                          <div className="p-3 rounded-xl bg-white/[0.02] border border-[#a9ddf0]/30 space-y-1">
                            <div className="h-4 w-full rounded bg-[#a9ddf0]" />
                            <span className="text-[#a9ddf0] block text-[10px]">--accent-ice</span>
                            <span className="text-[#a9ddf0] font-bold">#A9DDF0</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {current.specimenType === "motion" && (
                      <div className="space-y-4 font-mono-code text-xs">
                        <div className="flex items-center justify-between text-[11px] text-[#a9ddf0] uppercase tracking-wider font-semibold">
                          <span className="flex items-center gap-2">
                            <Sparkles size={13} />
                            Calibrated Spring Physics Specimen
                          </span>
                          <span className="text-[#89919d]">Drag to Test Haptics</span>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                          <motion.div
                            drag
                            dragConstraints={{ left: -60, right: 60, top: -20, bottom: 20 }}
                            dragElastic={0.2}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness, damping }}
                            className="cursor-grab active:cursor-grabbing px-6 py-3 rounded-full bg-[#a9ddf0] text-[#090b0f] font-bold text-xs select-none shadow-lg shadow-[#a9ddf0]/20"
                          >
                            Drag &amp; Release Me
                          </motion.div>
                          <div className="space-y-1 text-[11px] text-[#89919d] text-right">
                            <div>Stiffness: <span className="text-[#f2f1ec]">{stiffness} N/m</span></div>
                            <div>Damping: <span className="text-[#f2f1ec]">{damping} Ns/m</span></div>
                            <div className="text-[10px] text-[#a9ddf0]">Organic Inertia Curve</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {current.specimenType === "code" && (
                      <div className="space-y-4 font-mono-code text-xs">
                        <div className="flex items-center justify-between text-[11px] text-[#a9ddf0] uppercase tracking-wider font-semibold">
                          <span className="flex items-center gap-2">
                            <Cpu size={13} />
                            Design-to-Code Technology Stack
                          </span>
                          <span className="text-[#89919d]">Zero Translation Loss</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-[11px]">
                          <span className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-[#f2f1ec] text-center">Next.js 16 (App Router)</span>
                          <span className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-[#f2f1ec] text-center">React 19 &amp; TypeScript</span>
                          <span className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-[#f2f1ec] text-center">React Native (Expo SDK)</span>
                          <span className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-[#f2f1ec] text-center">Framer Motion &amp; Lenis</span>
                        </div>
                      </div>
                    )}

                    <div className="text-[10px] text-[#89919d] pt-2 border-t border-white/5">
                      <span className="text-[#a9ddf0] font-semibold uppercase">VERIFIED APPLICATION: </span>
                      <span className="text-[#f2f1ec]/80">{current.practice}</span>
                    </div>
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

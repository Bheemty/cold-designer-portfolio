"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Layers, Sparkles, Code2, ArrowUpRight, Check } from "lucide-react";
import { sound } from "@/lib/sounds";
import BlurTextReveal from "@/components/motion/BlurTextReveal";
import GlowCard from "@/components/ui/GlowCard";

const CAPABILITIES = [
  {
    index: "01",
    id: "architecture",
    title: "Product Strategy & Systems Architecture",
    tagline: "Translating complex domain realities into frictionless human journeys.",
    description:
      "Specializing in multi-sided platforms, regulatory-bound healthtech, and fragmented commuter workflows. I untangle real-world friction into structured task hierarchies, intuitive decision pathways, and predictable interface systems.",
    icon: Compass,
    competencies: [
      "Conversational UX Design (WhatsApp Triage)",
      "Information Architecture & User Task Flows",
      "Multi-Sided Stakeholder Mapping (Patients / Doctors, Riders / Drivers)",
      "Zero-Friction Onboarding & Checkout Optimization",
    ],
    specimen: {
      type: "flow",
      steps: [
        { label: "Symptom Prompt", detail: "Immediate conversational entry without account sign-up" },
        { label: "Algorithmic Triage", detail: "Matches patient condition to licensed specialist doctor" },
        { label: "Verifiable Prescription", detail: "Direct digital pharmacy referral dispatched over WhatsApp" },
      ],
    },
  },
  {
    index: "02",
    id: "systems",
    title: "Design Systems & Token Architecture",
    tagline: "Disciplined typography, luminance steps, and cross-platform token governance.",
    description:
      "A great design system is mathematically sound, highly accessible, and effortlessly maintainable. I build cohesive token hierarchies where typography scales, elevation states, and semantic color curves map 1:1 between Figma and production codebases.",
    icon: Layers,
    competencies: [
      "Figma Token Studio & Semantic Variables",
      "Cross-Platform Governance (Figma ↔ Tailwind ↔ React Native)",
      "Accessible Typography & Contrast Standards (WCAG AA+)",
      "Component Lifecycle & Variant Standardization",
    ],
    specimen: {
      type: "tokens",
      tokens: [
        { name: "--bg-obsidian", value: "#090B0F", role: "Primary Background Foundation" },
        { name: "--text-warm-ivory", value: "#F2F1EC", role: "Editorial Typographic Scale" },
        { name: "--text-muted-slate", value: "#89919D", role: "Secondary Hierarchy & Structure" },
        { name: "--accent-ice", value: "#A9DDF0", role: "Restrained Interactive Focal Point" },
      ],
    },
  },
  {
    index: "03",
    id: "motion",
    title: "Kinetic Motion & Haptic Craft",
    tagline: "Spatial continuity, spring dynamics, and subtle acoustic feedback.",
    description:
      "Interface animations should never exist merely for decorative flair. I calibrate motion curves with organic spring physics (stiffness, damping, mass) that orient the user spatially, provide tactile reassurance, and preserve 60fps performance on all viewports.",
    icon: Sparkles,
    competencies: [
      "Framer Motion Spring Dynamics & Drag Physics",
      "Lenis Smooth Inertia & Kinetic Scroll Choreography",
      "Web Audio API Micro-Chimes & Haptic Feedback",
      "Spatial Layout Morphs & Non-Jarring Page Transitions",
    ],
    specimen: {
      type: "physics",
      parameters: [
        { label: "Stiffness", value: "350 N/m", role: "Immediate snap responsiveness" },
        { label: "Damping", value: "28 Ns/m", role: "Eliminates excessive oscillation" },
        { label: "Mass", value: "0.8 kg", role: "Lightweight tactile velocity" },
      ],
    },
  },
  {
    index: "04",
    id: "code",
    title: "Design-to-Code Delivery & Prototyping",
    tagline: "Zero translation loss from Figma artboard to shipping production.",
    description:
      "By designing with deep fluency in React, Next.js App Router, React Native Expo, and modern CSS layout engines, the boundary between design concept and production software vanishes. Edge cases, layout collapses, and responsive breakpoints are solved at the source.",
    icon: Code2,
    competencies: [
      "React 19 & Next.js App Router Architecture",
      "React Native & Expo SDK Mobile Development",
      "Strict TypeScript & Modern Semantic HTML/CSS",
      "Interactive Production Prototypes & Git Workflows",
    ],
    specimen: {
      type: "code",
      tags: ["TypeScript", "Next.js App Router", "React Native", "Tailwind CSS", "Expo SDK"],
    },
  },
];

export default function CapabilitiesBento() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const active = CAPABILITIES[selectedIdx];

  return (
    <section className="relative py-28 sm:py-40 px-6 sm:px-12 border-b border-white/[0.08] bg-[#090b0f] text-[#f2f1ec]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 mb-20 border-b border-white/[0.08] pb-6">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a9ddf0]" />
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#a9ddf0]">
              Discipline &amp; Craft
            </span>
          </div>
          <span className="font-mono-code text-xs text-[#89919d]">
            PRODUCT METHODOLOGY &amp; TECHNICAL FLUENCY
          </span>
        </div>

        {/* Section Title */}
        <div className="mb-20 max-w-3xl">
          <BlurTextReveal
            as="h2"
            text="Architecture, systems, and tactile execution."
            className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#f2f1ec] leading-[1.08]"
          />
        </div>

        {/* Interactive Capability Exhibition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Vertical Index Selection */}
          <div className="lg:col-span-5 space-y-3 font-mono-code text-xs">
            {CAPABILITIES.map((cap, idx) => {
              const Icon = cap.icon;
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={cap.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedIdx(idx);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  onPointerMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
                    e.currentTarget.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
                    e.currentTarget.style.setProperty("--glow-opacity", "1");
                  }}
                  onPointerLeave={(e) => {
                    e.currentTarget.style.setProperty("--glow-opacity", "0");
                  }}
                  className={`relative w-full text-left p-6 sm:p-7 rounded-2xl border transition-all duration-300 flex items-center justify-between overflow-hidden cursor-pointer ${
                    isSelected
                      ? "border-[#a9ddf0] bg-[#161a23] shadow-lg shadow-[#a9ddf0]/10"
                      : "border-white/[0.08] bg-[#11141b]/60 hover:border-white/20 hover:bg-[#11141b]"
                  }`}
                >
                  {/* Ambient Proximity Glow Beam */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
                    style={{
                      opacity: "var(--glow-opacity, 0)",
                      background:
                        "radial-gradient(280px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(169, 221, 240, 0.15), transparent 70%)",
                    }}
                  />

                  <div className="relative z-10 flex items-center gap-4">
                    <div
                      className={`p-2.5 rounded-xl border transition-colors ${
                        isSelected
                          ? "border-[#a9ddf0]/40 bg-[#a9ddf0]/10 text-[#a9ddf0]"
                          : "border-white/10 bg-white/[0.02] text-[#89919d]"
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#a9ddf0] block mb-1">
                        PILLAR {cap.index}
                      </span>
                      <h3
                        className={`font-display text-lg sm:text-xl font-bold transition-colors ${
                          isSelected ? "text-[#f2f1ec]" : "text-[#89919d]"
                        }`}
                      >
                        {cap.title}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={`relative z-10 h-2.5 w-2.5 rounded-full transition-all shrink-0 ml-2 ${
                      isSelected ? "bg-[#a9ddf0] scale-125" : "bg-white/10"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Capability Pavilion */}
          <div className="lg:col-span-7">
            <GlowCard className="p-8 sm:p-12 shadow-2xl relative overflow-hidden rounded-3xl" glowColor="rgba(169, 221, 240, 0.12)">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
                    <div className="flex items-center gap-3 font-mono-code text-xs text-[#a9ddf0]">
                      <active.icon size={16} />
                      <span className="font-semibold uppercase tracking-wider">
                        METHODOLOGY PILLAR {active.index}
                      </span>
                    </div>
                    <span className="font-mono-code text-xs text-[#89919d]">
                      [PRODUCTION DISCIPLINE]
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#f2f1ec] mb-3">
                      {active.title}
                    </h3>
                    <p className="text-lg text-[#a9ddf0] font-light leading-relaxed mb-4">
                      {active.tagline}
                    </p>
                    <p className="text-base text-[#89919d] font-light leading-relaxed">
                      {active.description}
                    </p>
                  </div>

                  {/* Competencies Checklist */}
                  <div className="space-y-3 pt-2 font-mono-code text-xs">
                    <span className="text-[#89919d] uppercase block text-[10px] tracking-wider mb-2">
                      Core Product Capabilities:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {active.competencies.map((comp) => (
                        <div
                          key={comp}
                          className="flex items-start gap-2.5 rounded-xl border border-white/[0.06] bg-[#090b0f] p-3 text-[#f2f1ec]"
                        >
                          <Check size={13} className="text-[#a9ddf0] shrink-0 mt-0.5" />
                          <span className="leading-snug">{comp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Specimen Display */}
                  <div className="pt-2">
                    {active.specimen.type === "flow" && (
                      <div className="rounded-2xl border border-white/[0.08] bg-[#090b0f] p-5 font-mono-code text-xs space-y-3">
                        <span className="text-[#a9ddf0] text-[10px] uppercase font-semibold block">
                          Triage Workflow Specimen:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {active.specimen.steps?.map((s, i) => (
                            <div key={s.label} className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                              <span className="text-[#a9ddf0] block text-[10px] mb-1">STEP 0{i + 1}</span>
                              <span className="text-[#f2f1ec] font-semibold block mb-1">{s.label}</span>
                              <span className="text-[#89919d] text-[11px] leading-tight block">{s.detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {active.specimen.type === "tokens" && (
                      <div className="rounded-2xl border border-white/[0.08] bg-[#090b0f] p-5 font-mono-code text-xs space-y-2.5">
                        <span className="text-[#a9ddf0] text-[10px] uppercase font-semibold block">
                          Editorial Token Specimen:
                        </span>
                        {active.specimen.tokens?.map((t) => (
                          <div key={t.name} className="flex items-center justify-between py-1 border-b border-white/5 last:border-0">
                            <span className="text-[#f2f1ec] font-semibold">{t.name}</span>
                            <span className="text-[#89919d] flex items-center gap-2">
                              <span className="h-2.5 w-2.5 rounded-full border border-white/20" style={{ backgroundColor: t.value }} />
                              {t.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {active.specimen.type === "physics" && (
                      <div className="rounded-2xl border border-white/[0.08] bg-[#090b0f] p-5 font-mono-code text-xs space-y-2.5">
                        <span className="text-[#a9ddf0] text-[10px] uppercase font-semibold block">
                          Spring Mechanics Calibration:
                        </span>
                        <div className="grid grid-cols-3 gap-3">
                          {active.specimen.parameters?.map((p) => (
                            <div key={p.label} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-center">
                              <span className="text-[#89919d] block text-[10px] mb-1">{p.label}</span>
                              <span className="text-[#a9ddf0] font-bold text-sm block mb-1">{p.value}</span>
                              <span className="text-[#89919d] text-[10px] leading-tight block">{p.role}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {active.specimen.type === "code" && (
                      <div className="rounded-2xl border border-white/[0.08] bg-[#090b0f] p-5 font-mono-code text-xs space-y-3">
                        <span className="text-[#a9ddf0] text-[10px] uppercase font-semibold block">
                          Verified Technical Tooling:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {active.specimen.tags?.map((tag) => (
                            <span key={tag} className="rounded-lg bg-white/[0.04] border border-white/10 px-3 py-1.5 text-[#f2f1ec]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </GlowCard>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Compass,
  ArrowUpRight,
  ExternalLink,
  Code2,
  CheckCircle2,
  Cpu,
  Bookmark,
  Layers,
} from "lucide-react";
import { Project } from "@/data/projects";
import MorphingDialog from "@/components/ui/MorphingDialog";
import { sound } from "@/lib/sounds";

interface CaseStudyQuickAccessProps {
  project: Project;
  className?: string;
  variant?: "hero" | "floating" | "both";
}

/**
 * CaseStudyQuickAccess: Client modal controller for individual case studies.
 * Provides a quick project overview, metadata ledger, system highlights,
 * and high-precision in-page section jump navigation with smooth scrolling.
 */
export default function CaseStudyQuickAccess({
  project,
  className = "",
  variant = "both",
}: CaseStudyQuickAccessProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showFloatingTrigger, setShowFloatingTrigger] = useState(false);

  // Monitor scroll position to surface the floating trigger on long case studies
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setShowFloatingTrigger(scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Jump to in-page section with smooth scroll and navbar clearance
  const handleJumpToSection = (targetId: string) => {
    sound.playClick();
    setIsOpen(false);

    // Allow dialog dismissal animation to complete smoothly before scrolling
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (!el) return;

      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement, options?: { offset?: number }) => void } }).__lenis;
      if (lenis?.scrollTo) {
        lenis.scrollTo(el, { offset: -90 });
      } else {
        const top = el.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 180);
  };

  // Compile list of available in-page sections for this specific project
  const sections = [
    { id: "section-context", label: "01 // Strategic Context & Problem" },
    ...(project.discoveryInsights && project.discoveryInsights.length > 0
      ? [{ id: "section-discovery", label: "02 // Research & Discovery Insights" }]
      : []),
    ...(project.designDecisions && project.designDecisions.length > 0
      ? [{ id: "section-decisions", label: "03 // Strategic Decisions & Trade-Offs" }]
      : []),
    { id: "section-solution", label: "04 // Architectural Solution & Workflows" },
    ...(project.gallery && project.gallery.length > 0
      ? [{ id: "section-specimens", label: "05 // Interface Specimens & Gallery" }]
      : [{ id: "section-specimens", label: "05 // Interface Exploration & Specs" }]),
    ...(project.validation
      ? [{ id: "section-validation", label: "06 // Validation, Critique & Iterations" }]
      : []),
    ...(project.outcomes
      ? [{ id: "section-outcomes", label: "07 // Outcomes & Designer Retrospective" }]
      : []),
    { id: "section-specs", label: "Technical Specifications & Scope" },
  ];

  return (
    <>
      {/* 1. Primary Hero Action Trigger */}
      {(variant === "hero" || variant === "both") && (
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setIsOpen(true);
          }}
          className={`case-study-glass-chip inline-flex items-center gap-2 rounded-full border border-[#a9ddf0]/30 bg-[#a9ddf0]/10 px-5 py-2.5 font-mono-code text-xs font-semibold text-[#a9ddf0] hover:bg-[#a9ddf0]/20 hover:border-[#a9ddf0]/50 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2),0_4px_16px_rgba(169,221,240,0.15)] transition-all cursor-pointer ${className}`}
          aria-label={`Open Quick Access panel for ${project.title}`}
        >
          <Compass size={14} className="text-[#a9ddf0]" />
          <span>Quick Access</span>
        </button>
      )}

      {/* 2. Floating Persistent Action Trigger (when scrolled down) */}
      {(variant === "floating" || variant === "both") && showFloatingTrigger && (
        <div className="fixed bottom-6 left-6 z-30 pointer-events-auto transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setIsOpen(true);
            }}
            className="group flex items-center gap-2.5 rounded-full border border-white/[0.14] bg-[#090b0f]/85 backdrop-blur-xl px-4 py-2.5 font-mono-code text-xs text-[#f2f1ec] hover:border-[#a9ddf0] hover:text-[#a9ddf0] shadow-[0_8px_30px_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.15)] transition-all cursor-pointer"
            aria-label="Quick Access Case Study Navigation"
          >
            <Compass size={13} className="text-[#a9ddf0] group-hover:rotate-45 transition-transform duration-300" />
            <span className="font-medium">Quick Access</span>
            <span className="text-[10px] text-[#89919d] border-l border-white/[0.10] pl-2 hidden sm:inline">
              Overview &amp; Jump
            </span>
          </button>
        </div>
      )}

      {/* 3. Fully Scrollable Quick Access Morphing Dialog */}
      <MorphingDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={project.title}
        category={project.category}
        maxWidth="3xl"
      >
        <div className="space-y-8 pb-12">
          {/* Hero Specimen Preview if available */}
          {project.heroImage && (
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/[0.08] shadow-lg bg-[#090b0f]">
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 768px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11141b] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono-code text-[11px] text-[#89919d] bg-[#090b0f]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/[0.06]">
                <span className="text-[#f2f1ec] font-medium">{project.title} &mdash; Overview Specimen</span>
                <span>{project.year}</span>
              </div>
            </div>
          )}

          {/* Headline & Strategic Overview */}
          <div>
            <span className="font-mono-code text-[11px] text-[#a9ddf0] uppercase tracking-wider block mb-2 font-semibold">
              Executive Briefing &amp; Scope
            </span>
            <h4 className="font-display text-xl sm:text-2xl font-bold text-[#f2f1ec] mb-3">
              {project.headline}
            </h4>
            <p className="text-sm sm:text-base text-[#89919d] font-light leading-relaxed mb-4">
              {project.overview}
            </p>

            <div className="rounded-xl border border-white/[0.06] bg-[#090b0f] p-4 text-xs font-mono-code text-[#89919d] leading-relaxed">
              <span className="text-[#a9ddf0] uppercase font-semibold block mb-1">
                Core Design Challenge:
              </span>
              <p className="text-[#f2f1ec]/90 font-light">{project.challenge}</p>
            </div>
          </div>

          {/* In-Page Section Navigation Relays */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#090b0f] p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between font-mono-code text-xs">
              <div className="flex items-center gap-2 text-[#a9ddf0] uppercase tracking-wider font-semibold">
                <Bookmark size={14} />
                <span>Jump Directly to Case Study Section:</span>
              </div>
              <span className="text-[#89919d] text-[11px] hidden sm:inline">
                {sections.length} Sections Available
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {sections.map((sec, idx) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => handleJumpToSection(sec.id)}
                  className="flex items-center justify-between text-left rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-[#a9ddf0]/10 hover:border-[#a9ddf0]/30 px-3.5 py-3 font-mono-code text-xs text-[#f2f1ec] hover:text-[#a9ddf0] transition-all cursor-pointer group"
                >
                  <span className="truncate pr-2 font-medium">{sec.label}</span>
                  <span className="text-[#89919d] group-hover:text-[#a9ddf0] group-hover:translate-x-0.5 transition-transform text-[11px] shrink-0">
                    &rarr;
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Project Architecture & Specifications Ledger */}
          <div className="rounded-2xl bg-[#090b0f] border border-white/[0.08] p-5 sm:p-6 font-mono-code text-xs space-y-3">
            <div className="flex items-center gap-2 text-[#a9ddf0] font-semibold uppercase tracking-wider pb-2 border-b border-white/[0.08]">
              <Layers size={14} />
              <span>Project Matrix &amp; Parameters</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="flex justify-between border-b border-white/[0.04] pb-2">
                <span className="text-[#89919d]">CLIENT / IMPRINT:</span>
                <span className="text-[#f2f1ec] font-semibold">{project.client}</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.04] pb-2">
                <span className="text-[#89919d]">DESIGN ROLE:</span>
                <span className="text-[#f2f1ec] font-semibold">{project.role}</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.04] pb-2">
                <span className="text-[#89919d]">YEAR &amp; TIMELINE:</span>
                <span className="text-[#f2f1ec] font-semibold">
                  {project.year} &bull; {project.timeline}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/[0.04] pb-2">
                <span className="text-[#89919d]">ENGAGEMENT:</span>
                <span className="text-[#f2f1ec] font-semibold">{project.type}</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[#89919d] block mb-2 uppercase text-[11px]">
                KEY DELIVERABLES &amp; ARTIFACTS:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.deliverables.map((d) => (
                  <span
                    key={d}
                    className="flex items-center gap-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] px-3 py-1 text-[11px] text-[#a9ddf0]"
                  >
                    <CheckCircle2 size={11} className="text-[#a9ddf0]" />
                    <span>{d}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* System Highlights Cards */}
          {project.systemHighlights && project.systemHighlights.length > 0 && (
            <div className="space-y-3">
              <span className="font-mono-code text-xs text-[#a9ddf0] uppercase tracking-wider block font-semibold">
                System Highlights &amp; Architectural Focus:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.systemHighlights.map((h, i) => (
                  <div
                    key={h.title}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-xs space-y-1.5"
                  >
                    <div className="flex items-center gap-1.5 font-mono-code text-[10px] text-[#a9ddf0]">
                      <span>HIGHLIGHT 0{i + 1}</span>
                    </div>
                    <span className="font-semibold text-[#f2f1ec] block">{h.title}</span>
                    <p className="text-[#89919d] leading-relaxed font-light">{h.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Specifications Matrix */}
          {project.specifications && project.specifications.length > 0 && (
            <div className="rounded-2xl border border-white/[0.08] bg-[#090b0f] p-5 sm:p-6 space-y-3 font-mono-code text-xs">
              <div className="flex items-center gap-2 text-[#f2f1ec] font-semibold uppercase tracking-wider pb-2 border-b border-white/[0.08]">
                <Cpu size={14} className="text-[#a9ddf0]" />
                <span>Verified Implementation Specifications</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {project.specifications.map((s) => (
                  <div key={s.label} className="border-b border-white/[0.04] pb-2">
                    <span className="text-[#89919d] block text-[11px] mb-0.5">{s.label}:</span>
                    <span className="text-[#f2f1ec] font-medium">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Links Footer */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsOpen(false);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FDFDFD] text-[#090b0f] font-mono-code text-xs font-semibold px-6 py-3 hover:bg-[#a9ddf0] transition-colors shadow-lg cursor-pointer"
            >
              <span>Continue Reading Case Study</span>
            </button>

            <div className="flex flex-wrap items-center gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2.5 font-mono-code text-xs text-[#a9ddf0] hover:bg-[#a9ddf0]/10 transition-colors"
                >
                  <span>{project.slug === "9jatrip" ? "Live Website" : "Live Experience"}</span>
                  <ExternalLink size={13} />
                </a>
              )}

              {project.prototypeUrl && (
                <a
                  href={project.prototypeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2.5 font-mono-code text-xs text-[#f2f1ec] hover:border-[#a9ddf0] hover:text-[#a9ddf0] transition-colors"
                >
                  <span>
                    {project.prototypeUrl.includes("figma.com")
                      ? "View in Figma"
                      : project.prototypeUrl.includes("behance.net")
                      ? "Behance"
                      : "Design Specs"}
                  </span>
                  <ArrowUpRight size={13} />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2.5 font-mono-code text-xs text-[#89919d] hover:text-[#f2f1ec] transition-colors"
                >
                  <Code2 size={13} />
                  <span>Source</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </MorphingDialog>
    </>
  );
}

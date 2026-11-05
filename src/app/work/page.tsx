"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Grid, List, Filter, Eye, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { sound } from "@/lib/sounds";
import { PROJECTS, Project } from "@/data/projects";
import ScrollReveal from "@/components/motion/ScrollReveal";
import BlurTextReveal from "@/components/motion/BlurTextReveal";
import MorphingDialog from "@/components/ui/MorphingDialog";
import MagneticButton from "@/components/ui/MagneticButton";
import DirectionalTabs, { TabItem } from "@/components/ui/DirectionalTabs";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CATEGORIES = [
  "All",
  "Healthcare & Conversational",
  "Mobility & Transit",
  "Spatial & Hospitality",
  "Commerce & Marketplace",
  "Enterprise & SaaS",
  "Fintech & Systems",
];

const CATEGORY_TABS: TabItem[] = CATEGORIES.map((cat) => ({
  id: cat,
  label: cat,
}));

const VIEW_TABS: TabItem[] = [
  { id: "editorial", label: "Editorial Showcase", icon: Grid },
  { id: "table", label: "Directory Index", icon: List },
];

// Strict Project Ordering as mandated by design direction:
// 1. MEDesy Solution (medesy) - Healthcare & Conversational UI
// 2. 9jaTrip (9jatrip) - Mobility & Transit
// 3. Spot (spot) - SaaS & Creative Collaboration (Lead Product Designer)
// 4. PROfile (profile) - Enterprise SaaS & HR Tech
// 5. QuickEats (quickeats) - Consumer Mobile & Food Tech
// Followed by extended systems:
// 6. Raven Bank App (raven-bank) - Fintech & Mobile Banking Redesign
// 7. Will (will) - Digital Legacy & Asset Management
// 8. AgriVillage (agrivillage) - Agritech & Cooperative Commerce
const ORDERED_SLUGS = [
  // 1-8: Original Preserved Public Projects in Original Order
  "medesy",
  "9jatrip",
  "somewhere-hotel",
  "buybuddy",
  "stillwater",
  "greall-website",
  "will",
  "agrivillage",
  // 9-12: Approved Behance Portfolio Expansions
  "spot",
  "profile",
  "quickeats",
  "raven-bank",
];

const ORDERED_PROJECTS: Project[] = ORDERED_SLUGS.map((slug) => {
  const p = PROJECTS.find((proj) => proj.slug === slug);
  if (!p) {
    throw new Error(`Missing project for slug: ${slug}`);
  }
  return p;
});

export default function WorkArchivePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"editorial" | "table">("editorial");
  const [inspectingProject, setInspectingProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return ORDERED_PROJECTS.filter((project) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.headline.toLowerCase().includes(q) ||
        project.category.toLowerCase().includes(q) ||
        project.tags.some((t) => t.toLowerCase().includes(q)) ||
        project.deliverables.some((d) => d.toLowerCase().includes(q));

      if (!matchesSearch) return false;

            if (selectedCategory === "All") return true;
      if (selectedCategory === "Healthcare & Conversational") {
        return (
          project.category.includes("Healthcare") ||
          project.category.includes("Conversational") ||
          project.tags.includes("Conversational UI")
        );
      }
      if (selectedCategory === "Mobility & Transit") {
        return project.category.includes("Mobility") || project.category.includes("Transit");
      }
      if (selectedCategory === "Spatial & Hospitality") {
        return (
          project.category.includes("Hospitality") ||
          project.category.includes("Performing Arts") ||
          project.category.includes("Spatial")
        );
      }
      if (selectedCategory === "Commerce & Marketplace") {
        return (
          project.category.includes("Commerce") ||
          project.category.includes("Marketplace") ||
          project.category.includes("Retail") ||
          project.category.includes("Agritech")
        );
      }
      if (selectedCategory === "Enterprise & SaaS") {
        return (
          project.category.includes("Enterprise") ||
          project.category.includes("SaaS") ||
          project.category.includes("HR") ||
          project.tags.includes("HR Tech") ||
          project.tags.includes("Creative Feedback")
        );
      }
      if (selectedCategory === "Fintech & Systems") {
        return (
          project.category.includes("Fintech") ||
          project.category.includes("Banking") ||
          project.category.includes("Corporate") ||
          project.category.includes("Brand") ||
          project.tags.includes("Fintech") ||
          project.tags.includes("Digital Legacy") ||
          project.tags.includes("Brand Identity")
        );
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

    const featuredList = useMemo(() => {
    return filteredProjects.filter((p) =>
      ["medesy", "9jatrip", "somewhere-hotel", "buybuddy", "stillwater"].includes(p.slug)
    );
  }, [filteredProjects]);

  const conceptList = useMemo(() => {
    return filteredProjects.filter((p) =>
      ["greall-website", "spot", "profile", "quickeats", "raven-bank", "will", "agrivillage"].includes(p.slug)
    );
  }, [filteredProjects]);

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, viewMode]);

  return (
    <main className="min-h-screen pt-32 sm:pt-40 pb-28 px-6 sm:px-10 lg:px-16 bg-[#090b0f] text-[#f2f1ec]">
      <div className="mx-auto max-w-[1440px]">
        {/* Editorial Page Header */}
        <header className="border-b border-white/[0.08] pb-12 mb-14">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 font-mono-code text-xs">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#a9ddf0] animate-pulse" />
              <span className="uppercase tracking-widest text-[#a9ddf0]">
                (01) &mdash; Work Directory // 2023 &mdash; 2026
              </span>
            </div>
            <span className="text-[#89919d]">
              12 Verified Production Systems &amp; Product Case Studies
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <BlurTextReveal
                as="h1"
                text="Selected Works."
                className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#f2f1ec] mb-6"
              />
              <p className="text-lg sm:text-xl text-[#89919d] font-light leading-relaxed">A verified index of healthcare systems, intercity transit logistics, creative collaboration platforms, enterprise HR solutions, corporate rebrands, and fintech experiences designed by Taye Abolarin (Cold Designer).</p>
            </div>

            {/* View Mode Switcher with Directional Sliding Hover Tabs */}
            <div
              className="work-view-switcher-glass flex items-center rounded-full border border-white/[0.12] bg-white/[0.04] p-1 font-mono-code text-xs shrink-0 self-start lg:self-end shadow-[inset_0_1.5px_1.5px_0_rgba(255,255,255,0.22),0_8px_24px_-4px_rgba(0,0,0,0.4)]"
              style={{
                backdropFilter: "url(#cold-glass-filter-pill) blur(20px) saturate(185%) contrast(105%)",
                WebkitBackdropFilter: "blur(20px) saturate(185%) contrast(105%)",
              }}
            >
              <DirectionalTabs
                tabs={VIEW_TABS}
                activeId={viewMode}
                onChange={(id) => setViewMode(id as "editorial" | "table")}
                idPrefix="work-view"
                variant="glass"
                ariaLabel="Work view mode switcher"
              />
            </div>
          </div>
        </header>

        {/* Filter & Search Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-16">
          {/* Categories with Directional Sliding Hover Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar font-mono-code text-xs">
            <Filter size={13} className="text-[#89919d] mr-1 hidden sm:inline shrink-0" />
            <DirectionalTabs
              tabs={CATEGORY_TABS}
              activeId={selectedCategory}
              onChange={(id) => setSelectedCategory(id)}
              idPrefix="work-category"
              variant="pill"
              ariaLabel="Work category filter"
            />
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px] md:w-80 shrink-0">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#89919d]" />
            <input
              type="text"
              placeholder="Search systems, roles, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="work-view-switcher-glass w-full rounded-full border border-white/[0.12] bg-white/[0.03] py-2 pl-9 pr-4 font-mono-code text-xs text-[#f2f1ec] placeholder-[#89919d]/60 focus:border-[#a9ddf0] focus:outline-none transition-all shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.1)] focus:shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.2),0_0_16px_rgba(169,221,240,0.15)]"
              style={{
                backdropFilter: "url(#cold-glass-filter-pill) blur(20px) saturate(185%) contrast(105%)",
                WebkitBackdropFilter: "blur(20px) saturate(185%) contrast(105%)",
              }}
            />
          </div>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="rounded-3xl border border-white/[0.08] bg-[#11141b] p-16 text-center font-mono-code text-sm text-[#89919d] space-y-4">
            <p>No projects matched your active query &ldquo;{searchQuery}&rdquo;.</p>
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-2 rounded-full border border-[#a9ddf0]/40 px-5 py-2 text-[#a9ddf0] hover:bg-[#a9ddf0]/10 transition-colors cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* ── EDITORIAL SHOWCASE VIEW ── */}
        {viewMode === "editorial" && filteredProjects.length > 0 && (
          <div className="space-y-28">
            {/* 1. FEATURED CASE STUDIES (01 — 05) */}
            {featuredList.length > 0 && (
              <section aria-label="Featured Case Studies">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-14 font-mono-code text-xs">
                  <span className="text-[#a9ddf0] uppercase tracking-widest font-semibold">
                    (01) &mdash; Featured Case Studies // Production Systems
                  </span>
                  <span className="text-[#89919d]">
                    {featuredList.length} of 05 Flagship Case Studies
                  </span>
                </div>

                <div className="space-y-20">
                  {featuredList.map((p, idx) => {
                    const isEven = idx % 2 === 1;
                    const orderNumber = String(idx + 1).padStart(2, "0");

                    return (
                      <ScrollReveal key={p.slug} start="top 85%" y={24} duration={0.45}>
                        <article
                          className="group rounded-3xl border border-white/[0.08] bg-[#11141b] p-6 sm:p-10 lg:p-12 hover:border-[#a9ddf0]/40 hover:shadow-2xl active:scale-[0.995] transition-all duration-300"
                        >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                          {/* Media Preview Column */}
                          <div
                            className={`lg:col-span-7 ${
                              isEven ? "lg:order-2" : "lg:order-1"
                            }`}
                          >
                            <Link
                              href={`/work/${p.slug}`}
                              onClick={() => sound.playClick()}
                              className="block relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#090b0f] border border-white/[0.08] group-hover:border-[#a9ddf0]/40 transition-colors shadow-2xl"
                            >
                              {p.heroImage ? (
                                <Image
                                  src={p.heroImage}
                                  alt={`${p.title} case study preview`}
                                  fill
                                  sizes="(max-width: 1024px) 100vw, 58vw"
                                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                                />
                              ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center p-8 font-mono-code text-xs text-[#89919d] text-center">
                                  <span className="text-[#a9ddf0] text-sm font-semibold mb-2">
                                    {p.title}
                                  </span>
                                  <span>{p.category}</span>
                                </div>
                              )}
                              <span className="work-inspect-btn absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-[#090b0f]/80 backdrop-blur-xl border border-white/[0.18] px-4 py-2 font-mono-code text-xs text-[#f2f1ec] group-hover:border-[#a9ddf0] group-hover:text-[#a9ddf0] shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.25),0_8px_20px_rgba(0,0,0,0.5)] transition-all">
                                <span>Inspect Study</span>
                                <svg
                                  viewBox="0 0 24 24"
                                  width="14"
                                  height="14"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.4"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  aria-hidden="true"
                                >
                                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                              </span>
                            </Link>
                          </div>

                          {/* Content / Metadata Column */}
                          <div
                            className={`lg:col-span-5 ${
                              isEven ? "lg:order-1" : "lg:order-2"
                            } flex flex-col justify-between h-full`}
                          >
                            <div>
                              {/* Eyebrow & Year */}
                              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5 font-mono-code text-xs">
                                <span className="text-[#a9ddf0] font-semibold">
                                  ({orderNumber}) &mdash; {p.category}
                                </span>
                                <span className="text-[#89919d]">{p.year}</span>
                              </div>

                              {/* Title */}
                              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f2f1ec] group-hover:text-[#a9ddf0] transition-colors mb-3">
                                <Link
                                  href={`/work/${p.slug}`}
                                  onClick={() => sound.playClick()}
                                >
                                  {p.title}
                                </Link>
                              </h2>

                              {/* Headline */}
                              <p className="text-base text-[#89919d] font-light leading-relaxed mb-6">
                                {p.headline}
                              </p>

                              {/* System Specifications Ledger */}
                              <div className="rounded-xl bg-[#090b0f] border border-white/[0.06] p-4 font-mono-code text-xs text-[#89919d] space-y-2 mb-6">
                                <div className="flex justify-between">
                                  <span>ENGAGEMENT:</span>
                                  <span className="text-[#f2f1ec] font-medium">{p.type}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>ROLE:</span>
                                  <span className="text-[#f2f1ec] font-medium">{p.role}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>CLIENT / IMPRINT:</span>
                                  <span className="text-[#f2f1ec] font-medium">{p.client}</span>
                                </div>
                              </div>

                              {/* Deliverables Tags */}
                              <div className="flex flex-wrap gap-2 mb-8 font-mono-code text-[11px]">
                                {p.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="rounded-full bg-white/[0.04] border border-white/[0.08] px-3 py-1 text-[#89919d]"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <Link
                                  href={`/work/${p.slug}`}
                                  onClick={() => sound.playClick()}
                                  className="inline-flex items-center gap-2.5 rounded-full bg-[#FDFDFD] text-[#090b0f] font-mono-code text-xs font-semibold px-6 py-3 hover:bg-[#a9ddf0] transition-colors shadow-lg cursor-pointer"
                                >
                                  <span>View Case Study</span>
                                  <svg
                                    viewBox="0 0 24 24"
                                    width="14"
                                    height="14"
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

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    sound.playClick();
                                    setInspectingProject(p);
                                  }}
                                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-3 font-mono-code text-xs text-[#89919d] hover:text-[#f2f1ec] hover:border-[#a9ddf0] transition-colors cursor-pointer"
                                  aria-label={`Inspect ${p.title} specifications`}
                                >
                                  <Eye size={13} />
                                  <span>Quick Specs</span>
                                </button>
                              </div>

                              {p.liveUrl && (
                                <a
                                  href={p.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 font-mono-code text-xs text-[#89919d] hover:text-[#a9ddf0] transition-colors"
                                >
                                  <span>Live Demo</span>
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
                                </a>
                              )}

                              {!p.liveUrl && p.prototypeUrl && (
                                <a
                                  href={p.prototypeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 font-mono-code text-xs text-[#89919d] hover:text-[#a9ddf0] transition-colors"
                                >
                                  <span>Figma Prototype</span>
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
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </article>
                    </ScrollReveal>
                  );
                  })}
                </div>
              </section>
            )}

            {/* 2. EXTENDED CONCEPT DIRECTORY (06 — 09) */}
            {conceptList.length > 0 && (
              <section aria-label="Extended Concept Directory" className="pt-8">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-12 font-mono-code text-xs">
                  <span className="text-[#a9ddf0] uppercase tracking-widest font-semibold">
                    (02) &mdash; Systems &amp; Extended Case Studies
                  </span>
                  <span className="text-[#89919d]">
                    {conceptList.length} Verified Product Systems &amp; Rebrands
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {conceptList.map((p, idx) => {
                    const orderNumber = String(idx + 6).padStart(2, "0");

                    return (
                      <ScrollReveal key={p.slug} start="top 85%" y={24} duration={0.45}>
                        <article
                          className="group rounded-3xl border border-white/[0.08] bg-[#11141b] p-8 flex flex-col justify-between hover:border-[#a9ddf0]/30 transition-all duration-300"
                        >
                        <div>
                          {/* Eyebrow */}
                          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-5 font-mono-code text-xs">
                            <span className="text-[#a9ddf0] font-semibold">
                              ({orderNumber}) &mdash; {p.category}
                            </span>
                            <span className="text-[#89919d]">{p.year}</span>
                          </div>

                          {/* Title */}
                          <h3 className="font-display text-2xl font-bold text-[#f2f1ec] group-hover:text-[#a9ddf0] transition-colors mb-3">
                            <Link
                              href={`/work/${p.slug}`}
                              onClick={() => sound.playClick()}
                            >
                              {p.title}
                            </Link>
                          </h3>

                          {/* Summary */}
                          <p className="text-sm text-[#89919d] font-light leading-relaxed mb-6">
                            {p.summary}
                          </p>

                          {/* Highlights */}
                          <div className="space-y-2 mb-6 font-mono-code text-xs text-[#89919d]">
                            {p.systemHighlights.slice(0, 2).map((h) => (
                              <div key={h.title} className="flex items-start gap-2">
                                <span className="text-[#a9ddf0] font-bold mt-0.5">&bull;</span>
                                <span>
                                  <strong className="text-[#f2f1ec]">{h.title}:</strong>{" "}
                                  {h.description}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-4 font-mono-code text-xs">
                          <div className="flex items-center gap-3">
                            <Link
                              href={`/work/${p.slug}`}
                              onClick={() => sound.playClick()}
                              className="inline-flex items-center gap-2 text-[#f2f1ec] hover:text-[#a9ddf0] transition-colors font-semibold"
                            >
                              <span>Read Case Study</span>
                              <svg
                                viewBox="0 0 24 24"
                                width="14"
                                height="14"
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

                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                sound.playClick();
                                setInspectingProject(p);
                              }}
                              className="inline-flex items-center gap-1.5 text-[#89919d] hover:text-[#a9ddf0] transition-colors cursor-pointer"
                              aria-label={`Inspect ${p.title} specifications`}
                            >
                              <Eye size={12} />
                              <span>Specs</span>
                            </button>
                          </div>

                          {p.prototypeUrl && (
                            <a
                              href={p.prototypeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-[#89919d] hover:text-[#a9ddf0] transition-colors"
                            >
                              <span>Inspect Prototype</span>
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
                                <path d="M7 17L17 7M17 7H7M17 7V17" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </article>
                    </ScrollReveal>
                  );
                  })}
                </div>
              </section>
            )}
          </div>
        )}

        {/* ── TABLE DIRECTORY VIEW ── */}
        {viewMode === "table" && filteredProjects.length > 0 && (
          <div className="overflow-x-auto rounded-3xl border border-white/[0.08] bg-[#11141b]">
            <table className="w-full text-left font-mono-code text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.02] text-[#89919d] uppercase">
                  <th className="py-4 px-6">Entry</th>
                  <th className="py-4 px-6">System Title</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Engagement</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6">Year</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {filteredProjects.map((p, idx) => (
                  <tr
                    key={p.slug}
                    onMouseEnter={() => sound.playHover()}
                    className="hover:bg-white/[0.03] transition-colors group cursor-pointer"
                  >
                    <td className="py-4 px-6 text-[#a9ddf0] font-semibold">
                      {String(idx + 1).padStart(2, "0")}
                    </td>
                    <td className="py-4 px-6 font-display font-medium text-[#f2f1ec] group-hover:text-[#a9ddf0] transition-colors text-sm">
                      <Link href={`/work/${p.slug}`} className="block">
                        {p.title}
                      </Link>
                    </td>
                    <td className="py-4 px-6 text-[#89919d]">{p.category}</td>
                    <td className="py-4 px-6 text-[#89919d]">{p.type}</td>
                    <td className="py-4 px-6 text-[#f2f1ec]">{p.role}</td>
                    <td className="py-4 px-6 text-[#89919d]">{p.year}</td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            setInspectingProject(p);
                          }}
                          className="inline-flex items-center gap-1 text-[#89919d] hover:text-[#a9ddf0] transition-colors cursor-pointer"
                          aria-label={`Inspect ${p.title} specifications`}
                        >
                          <Eye size={12} />
                          <span>Specs</span>
                        </button>
                        <Link
                          href={`/work/${p.slug}`}
                          className="inline-flex items-center gap-1 text-[#89919d] group-hover:text-[#a9ddf0] transition-colors"
                        >
                          <span>Study</span>
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
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                          </svg>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Section Footer: Inquiry Prompt */}
        <ScrollReveal start="top 88%" y={20} duration={0.45}>
          <div className="mt-24 rounded-3xl border border-white/[0.08] bg-[#11141b] p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono-code text-xs">
            <div>
              <span className="text-[#a9ddf0] uppercase font-semibold block mb-1">
                Product Design &amp; Systems Architecture
              </span>
              <p className="text-[#89919d] max-w-xl">
                Open for professional dialogue, design systems collaboration, and technical consultations. Direct messages receive personal responses.
              </p>
            </div>
            <MagneticButton maxDistance={10} strength={0.25}>
              <a
                href="mailto:abolarintaye20@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-[#FDFDFD] text-[#090b0f] px-6 py-3 font-semibold hover:bg-[#a9ddf0] transition-colors whitespace-nowrap cursor-pointer shadow-lg"
              >
                <span>Start a Direct Conversation</span>
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>

      {/* Morphing Dialog / FLIP Quick-Look Project Specifications Inspector */}
      <MorphingDialog
        isOpen={inspectingProject !== null}
        onClose={() => setInspectingProject(null)}
        title={inspectingProject?.title}
        category={inspectingProject?.category}
        maxWidth="2xl"
      >
        {inspectingProject && (
          <div className="space-y-6">
            {/* Project Hero Preview */}
            {inspectingProject.heroImage && (
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/[0.08] shadow-lg bg-[#090b0f]">
                <Image
                  src={inspectingProject.heroImage}
                  alt={inspectingProject.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Headline & Overview */}
            <div>
              <h4 className="font-display text-xl font-bold text-[#f2f1ec] mb-2">
                {inspectingProject.headline}
              </h4>
              <p className="text-sm text-[#89919d] font-light leading-relaxed">
                {inspectingProject.overview}
              </p>
            </div>

            {/* Specifications Ledger */}
            <div className="rounded-2xl bg-[#090b0f] border border-white/[0.08] p-5 font-mono-code text-xs space-y-3">
              <div className="flex justify-between border-b border-white/[0.06] pb-2">
                <span className="text-[#89919d]">CLIENT / IMPRINT:</span>
                <span className="text-[#f2f1ec] font-semibold">{inspectingProject.client}</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.06] pb-2">
                <span className="text-[#89919d]">ROLE:</span>
                <span className="text-[#f2f1ec] font-semibold">{inspectingProject.role}</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.06] pb-2">
                <span className="text-[#89919d]">YEAR &amp; TIMELINE:</span>
                <span className="text-[#f2f1ec] font-semibold">
                  {inspectingProject.year} &bull; {inspectingProject.timeline}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/[0.06] pb-2">
                <span className="text-[#89919d]">ENGAGEMENT TYPE:</span>
                <span className="text-[#f2f1ec] font-semibold">{inspectingProject.type}</span>
              </div>
              <div>
                <span className="text-[#89919d] block mb-1.5">KEY DELIVERABLES:</span>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {inspectingProject.deliverables.map((d) => (
                    <span
                      key={d}
                      className="rounded-full bg-white/[0.04] border border-white/[0.08] px-2.5 py-0.5 text-[11px] text-[#a9ddf0]"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* System Highlights */}
            {inspectingProject.systemHighlights && inspectingProject.systemHighlights.length > 0 && (
              <div className="space-y-2.5">
                <span className="font-mono-code text-xs text-[#a9ddf0] uppercase tracking-wider block font-semibold">
                  System Architecture &amp; Decisions:
                </span>
                <div className="space-y-2">
                  {inspectingProject.systemHighlights.map((h) => (
                    <div
                      key={h.title}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 text-xs"
                    >
                      <span className="font-semibold text-[#f2f1ec] block mb-1">{h.title}</span>
                      <span className="text-[#89919d] leading-relaxed">{h.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Footer */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-white/[0.08]">
              <Link
                href={`/work/${inspectingProject.slug}`}
                onClick={() => {
                  sound.playClick();
                  setInspectingProject(null);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FDFDFD] text-[#090b0f] font-mono-code text-xs font-semibold px-6 py-3 hover:bg-[#a9ddf0] transition-colors shadow-lg cursor-pointer"
              >
                <span>Read Full Case Study</span>
                <ArrowUpRight size={14} />
              </Link>

              {inspectingProject.prototypeUrl && (
                <a
                  href={inspectingProject.prototypeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-5 py-3 font-mono-code text-xs text-[#a9ddf0] hover:bg-[#a9ddf0]/10 transition-colors"
                >
                  <span>Live Prototype</span>
                  <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </div>
        )}
      </MorphingDialog>
    </main>
  );
}

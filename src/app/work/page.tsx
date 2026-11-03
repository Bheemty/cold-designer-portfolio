"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Grid, List, Filter } from "lucide-react";
import { sound } from "@/lib/sounds";
import { PROJECTS, Project } from "@/data/projects";

const CATEGORIES = [
  "All",
  "Healthcare & Conversational",
  "Mobility & Transit",
  "Commerce & Merchant",
  "Spatial & Performing Arts",
  "Fintech & Systems",
];

// Strict Project Ordering as mandated by design direction:
// 1. MEDesy Solution (medesy)
// 2. 9jaTrip (9jatrip)
// 3. Somewhere Hotel (somewhere-hotel)
// 4. BuyBuddy (buybuddy)
// 5. Stillwater (stillwater)
// Followed by extended concepts:
// 6. Greall (greall-website)
// 7. Will (will)
// 8. Nova (nova-wellness)
// 9. AgriVillage (agrivillage)
const ORDERED_SLUGS = [
  "medesy",
  "9jatrip",
  "somewhere-hotel",
  "buybuddy",
  "stillwater",
  "greall-website",
  "will",
  "nova-wellness",
  "agrivillage",
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
          project.category.includes("Health") ||
          project.tags.includes("Conversational UI")
        );
      }
      if (selectedCategory === "Mobility & Transit") {
        return project.category.includes("Mobility") || project.category.includes("Transit");
      }
      if (selectedCategory === "Commerce & Merchant") {
        return (
          project.category.includes("Commerce") ||
          project.category.includes("Marketplace") ||
          project.category.includes("Retail")
        );
      }
      if (selectedCategory === "Spatial & Performing Arts") {
        return (
          project.category.includes("Hospitality") ||
          project.category.includes("Performing Arts") ||
          project.category.includes("Spatial")
        );
      }
      if (selectedCategory === "Fintech & Systems") {
        return (
          project.category.includes("Corporate") ||
          project.category.includes("Fintech") ||
          project.category.includes("Legacy") ||
          project.category.includes("Agritech")
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
      ["greall-website", "will", "nova-wellness", "agrivillage"].includes(p.slug)
    );
  }, [filteredProjects]);

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
              09 Verified Case Studies &amp; Architectural Concepts
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#f2f1ec] mb-6">
                Selected Works.
              </h1>
              <p className="text-lg sm:text-xl text-[#89919d] font-light leading-relaxed">
                A verified index of production healthcare systems, intercity transit platforms, social commerce storefronts, and atmospheric spatial web experiences designed by Taye Abolarin (Cold Designer).
              </p>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] p-1.5 font-mono-code text-xs shrink-0 self-start lg:self-end">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setViewMode("editorial");
                }}
                className={`flex items-center gap-2 rounded-full px-4 py-2 transition-all cursor-pointer ${
                  viewMode === "editorial"
                    ? "bg-[#FDFDFD] text-[#090b0f] font-semibold shadow-sm"
                    : "text-[#89919d] hover:text-[#f2f1ec]"
                }`}
                aria-pressed={viewMode === "editorial"}
              >
                <Grid size={13} />
                <span>Editorial Showcase</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setViewMode("table");
                }}
                className={`flex items-center gap-2 rounded-full px-4 py-2 transition-all cursor-pointer ${
                  viewMode === "table"
                    ? "bg-[#FDFDFD] text-[#090b0f] font-semibold shadow-sm"
                    : "text-[#89919d] hover:text-[#f2f1ec]"
                }`}
                aria-pressed={viewMode === "table"}
              >
                <List size={13} />
                <span>Directory Index</span>
              </button>
            </div>
          </div>
        </header>

        {/* Filter & Search Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-16">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar font-mono-code text-xs">
            <Filter size={13} className="text-[#89919d] mr-1 hidden sm:inline shrink-0" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory(cat);
                }}
                className={`rounded-full px-4 py-2 transition-all border whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? "border-[#a9ddf0] bg-[#a9ddf0]/15 text-[#a9ddf0] font-semibold"
                    : "border-white/[0.08] bg-white/[0.02] text-[#89919d] hover:border-white/20 hover:text-[#f2f1ec]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px] md:w-80 shrink-0">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#89919d]" />
            <input
              type="text"
              placeholder="Search systems, roles, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-white/[0.08] bg-[#11141b] py-2 pl-9 pr-4 font-mono-code text-xs text-[#f2f1ec] placeholder-[#89919d]/60 focus:border-[#a9ddf0] focus:outline-none transition-colors"
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
                    (01) &mdash; Featured Case Studies // Production &amp; Spatial
                  </span>
                  <span className="text-[#89919d]">
                    {featuredList.length} of 05 Entries
                  </span>
                </div>

                <div className="space-y-20">
                  {featuredList.map((p, idx) => {
                    const isEven = idx % 2 === 1;
                    const orderNumber = String(idx + 1).padStart(2, "0");

                    return (
                      <article
                        key={p.slug}
                        className="group rounded-3xl border border-white/[0.08] bg-[#11141b] p-6 sm:p-10 lg:p-12 hover:border-[#a9ddf0]/30 transition-all duration-300"
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
                              <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-[#090b0f]/90 backdrop-blur-md border border-white/[0.12] px-4 py-2 font-mono-code text-xs text-[#f2f1ec] group-hover:border-[#a9ddf0] group-hover:text-[#a9ddf0] transition-colors">
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
                            <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between gap-4">
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
                    (02) &mdash; Extended Concepts &amp; Digital Architectures
                  </span>
                  <span className="text-[#89919d]">
                    04 Verified Explorations
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {conceptList.map((p, idx) => {
                    const orderNumber = String(idx + 6).padStart(2, "0");

                    return (
                      <article
                        key={p.slug}
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Section Footer: Inquiry Prompt */}
        <div className="mt-24 rounded-3xl border border-white/[0.08] bg-[#11141b] p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono-code text-xs">
          <div>
            <span className="text-[#a9ddf0] uppercase font-semibold block mb-1">
              Product Design &amp; Systems Architecture
            </span>
            <p className="text-[#89919d] max-w-xl">
              Open for professional dialogue, design systems collaboration, and technical consultations. Direct messages receive personal responses.
            </p>
          </div>
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
        </div>
      </div>
    </main>
  );
}

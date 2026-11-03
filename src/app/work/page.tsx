"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Search, Grid, List, Sparkles, Filter, ExternalLink, ArrowRight } from "lucide-react";
import { sound } from "@/lib/sounds";
import { PROJECTS, Project } from "@/data/projects";

const CATEGORIES = [
  "All",
  "Healthcare & Conversational",
  "Mobility & Transit",
  "Commerce & Merchant",
  "Spatial & Architecture",
  "Fintech & Systems",
];

export default function WorkArchivePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"editorial" | "table">("editorial");

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      if (selectedCategory === "All") return true;
      if (selectedCategory === "Healthcare & Conversational") {
        return project.category.includes("Healthcare") || project.category.includes("Health") || project.tags.includes("Conversational UI");
      }
      if (selectedCategory === "Mobility & Transit") {
        return project.category.includes("Mobility") || project.category.includes("Transit");
      }
      if (selectedCategory === "Commerce & Merchant") {
        return project.category.includes("Commerce") || project.category.includes("Retail");
      }
      if (selectedCategory === "Spatial & Architecture") {
        return project.category.includes("Hospitality") || project.category.includes("Performing Arts") || project.category.includes("Spatial");
      }
      if (selectedCategory === "Fintech & Systems") {
        return project.category.includes("Brand") || project.category.includes("Corporate") || project.tags.includes("Fintech");
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main className="min-h-screen pt-32 sm:pt-40 pb-28 px-6 sm:px-10 lg:px-16 bg-[#090b0f] text-[#f2f1ec]">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <header className="border-b border-white/[0.08] pb-12 mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 font-mono-code text-xs">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#a9ddf0] animate-pulse" />
              <span className="uppercase tracking-widest text-[#a9ddf0]">
                Verified Work Directory // 2023 &mdash; 2026
              </span>
            </div>
            <span className="text-[#89919d]">
              09 Verified Case Studies &amp; Architectural Concepts
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#f2f1ec] mb-6">
                Verified Systems &amp; Digital Craft.
              </h1>
              <p className="text-lg sm:text-xl text-[#89919d] font-light leading-relaxed">
                A verified directory of production healthcare systems, intercity mobility platforms, social commerce storefronts, and atmospheric spatial web experiences designed by Taye Abolarin.
              </p>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] p-1 font-mono-code text-xs shrink-0">
              <button
                onClick={() => {
                  sound.playClick();
                  setViewMode("editorial");
                }}
                className={`flex items-center gap-2 rounded-full px-4 py-2 transition-all cursor-pointer ${
                  viewMode === "editorial"
                    ? "bg-[#a9ddf0] text-[#090b0f] font-semibold shadow-sm"
                    : "text-[#89919d] hover:text-[#f2f1ec]"
                }`}
                aria-pressed={viewMode === "editorial"}
              >
                <Grid size={13} />
                <span>Editorial Showcase</span>
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setViewMode("table");
                }}
                className={`flex items-center gap-2 rounded-full px-4 py-2 transition-all cursor-pointer ${
                  viewMode === "table"
                    ? "bg-[#a9ddf0] text-[#090b0f] font-semibold shadow-sm"
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

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-14">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar font-mono-code text-xs">
            <Filter size={13} className="text-[#89919d] mr-1 hidden sm:inline shrink-0" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
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
          <div className="relative min-w-[260px] md:w-72 shrink-0">
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

        {/* Empty Search State */}
        {filteredProjects.length === 0 && (
          <div className="rounded-3xl border border-white/[0.08] bg-[#11141b] p-16 text-center font-mono-code text-sm text-[#89919d] space-y-3">
            <p>No projects matched your active query &ldquo;{searchQuery}&rdquo;.</p>
            <button
              onClick={() => {
                sound.playPop();
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-[#a9ddf0] underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* ── EDITORIAL SHOWCASE VIEW ── */}
        {viewMode === "editorial" && (
          <div className="space-y-12">
            {filteredProjects.map((p, idx) => {
              const isEven = idx % 2 === 0;
              const isFlagship = idx < 2;

              return (
                <article
                  key={p.slug}
                  className={`group rounded-3xl border border-white/[0.1] bg-[#11141b] overflow-hidden transition-all duration-300 hover:border-[#a9ddf0]/40 hover:bg-[#141822] ${
                    isFlagship ? "p-6 sm:p-10" : "p-6 sm:p-8"
                  }`}
                >
                  <div
                    className={`grid grid-cols-1 ${
                      isFlagship ? "lg:grid-cols-12 gap-8 lg:gap-12 items-center" : "lg:grid-cols-12 gap-8 items-start"
                    }`}
                  >
                    {/* Media Preview Column */}
                    <div
                      className={`${
                        isFlagship ? "lg:col-span-7" : "lg:col-span-6"
                      } ${!isEven && isFlagship ? "lg:order-2" : ""}`}
                    >
                      <Link
                        href={`/work/${p.slug}`}
                        onClick={() => sound.playClick()}
                        className="block relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#090b0f] border border-white/[0.06] group-hover:border-[#a9ddf0]/30 transition-colors"
                      >
                        {p.heroImage ? (
                          <Image
                            src={p.heroImage}
                            alt={`${p.title} preview`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 55vw"
                            className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-mono-code text-xs text-[#89919d]">
                            Interactive Exhibit
                          </div>
                        )}
                        <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-[#090b0f]/85 backdrop-blur-md border border-white/[0.12] px-3.5 py-1.5 font-mono-code text-[11px] text-[#f2f1ec] group-hover:border-[#a9ddf0] group-hover:text-[#a9ddf0] transition-colors">
                          <span>Inspect Study</span>
                          <ArrowUpRight size={12} />
                        </span>
                      </Link>
                    </div>

                    {/* Metadata & Content Column */}
                    <div
                      className={`${
                        isFlagship ? "lg:col-span-5" : "lg:col-span-6"
                      } ${!isEven && isFlagship ? "lg:order-1" : ""} flex flex-col justify-between h-full`}
                    >
                      <div>
                        {/* Eyebrow & Category */}
                        <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] pb-4 mb-4 font-mono-code text-xs">
                          <span className="text-[#a9ddf0] font-semibold">
                            0{idx + 1} // {p.category}
                          </span>
                          <span className="text-[#89919d] ml-auto">{p.year}</span>
                        </div>

                        {/* Title */}
                        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#f2f1ec] group-hover:text-[#a9ddf0] transition-colors mb-3">
                          <Link href={`/work/${p.slug}`} onClick={() => sound.playClick()}>
                            {p.title}
                          </Link>
                        </h2>

                        {/* Headline */}
                        <p className="text-base text-[#89919d] font-light leading-relaxed mb-6">
                          {p.headline}
                        </p>

                        {/* Specifications Card */}
                        <div className="rounded-xl bg-[#090b0f] border border-white/[0.06] p-4 font-mono-code text-xs text-[#89919d] space-y-2 mb-6">
                          <div className="flex justify-between">
                            <span className="text-[#89919d]">ENGAGEMENT:</span>
                            <span className="text-[#f2f1ec] font-medium">{p.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#89919d]">ROLE:</span>
                            <span className="text-[#f2f1ec] font-medium">{p.role}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#89919d]">CLIENT / IMPRINT:</span>
                            <span className="text-[#f2f1ec] font-medium">{p.client}</span>
                          </div>
                        </div>

                        {/* Tags */}
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

                      {/* Action Button */}
                      <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                        <Link
                          href={`/work/${p.slug}`}
                          onClick={() => sound.playClick()}
                          className="inline-flex items-center gap-2 rounded-full bg-[#f2f1ec] text-[#090b0f] font-mono-code text-xs font-semibold px-5 py-2.5 hover:bg-[#a9ddf0] transition-colors"
                        >
                          <span>Read Case Study</span>
                          <ArrowRight size={13} />
                        </Link>

                        {p.liveUrl && (
                          <a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono-code text-xs text-[#89919d] hover:text-[#a9ddf0] transition-colors"
                          >
                            <span>Live Product</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* ── TABLE DIRECTORY VIEW ── */}
        {viewMode === "table" && (
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
                    <td className="py-4 px-6 text-[#a9ddf0] font-semibold">0{idx + 1}</td>
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
                        <ArrowUpRight size={12} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Section Footer: Inquiry Prompt */}
        <div className="mt-20 rounded-3xl border border-white/[0.08] bg-[#11141b] p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono-code text-xs">
          <div>
            <span className="text-[#a9ddf0] uppercase font-semibold block mb-1">
              Design Systems &amp; Product Consultation
            </span>
            <p className="text-[#89919d] max-w-xl">
              Available for select contract product design engagements, conversational triage flows, and multi-platform design systems architecture.
            </p>
          </div>
          <Link
            href="/contact"
            className="rounded-full bg-[#f2f1ec] text-[#090b0f] px-6 py-3 font-semibold hover:bg-[#a9ddf0] transition-colors whitespace-nowrap"
          >
            Start a Conversation &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}

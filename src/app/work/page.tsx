"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Search, Grid, List, Filter } from "lucide-react";
import { sound } from "@/lib/sounds";
import { PROJECTS } from "@/data/projects";

const CATEGORIES = [
  "All",
  "Healthcare",
  "Mobility & Transit",
  "Commerce",
  "Spatial & Arts",
  "Brand & Identity",
];

export default function WorkArchivePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      if (selectedCategory === "All") return true;
      if (selectedCategory === "Healthcare") {
        return project.category.includes("Healthcare") || project.category.includes("Health");
      }
      if (selectedCategory === "Mobility & Transit") {
        return project.category.includes("Mobility") || project.category.includes("Transit");
      }
      if (selectedCategory === "Commerce") {
        return project.category.includes("Commerce") || project.category.includes("Retail");
      }
      if (selectedCategory === "Spatial & Arts") {
        return project.category.includes("Hospitality") || project.category.includes("Performing Arts") || project.category.includes("Spatial");
      }
      if (selectedCategory === "Brand & Identity") {
        return project.category.includes("Brand") || project.category.includes("Corporate");
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main className="min-h-screen pt-32 sm:pt-40 pb-24 px-6 sm:px-10 bg-[#090b0f] text-[#f2f1ec]">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="border-b border-white/[0.08] pb-12 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a9ddf0]" />
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#a9ddf0]">
              Full Archive
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#f2f1ec] mb-4">
                Work Index.
              </h1>
              <p className="font-mono-code text-sm text-[#89919d] max-w-xl">
                A verified directory of production product design, conversational interfaces, client design work, and personal software explorations.
              </p>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] p-1 font-mono-code text-xs">
              <button
                onClick={() => {
                  sound.playClick();
                  setViewMode("grid");
                }}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 transition-colors ${
                  viewMode === "grid" ? "bg-[#a9ddf0] text-[#090b0f] font-semibold" : "text-[#89919d] hover:text-[#f2f1ec]"
                }`}
              >
                <Grid size={13} />
                <span>Editorial Grid</span>
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setViewMode("list");
                }}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 transition-colors ${
                  viewMode === "list" ? "bg-[#a9ddf0] text-[#090b0f] font-semibold" : "text-[#89919d] hover:text-[#f2f1ec]"
                }`}
              >
                <List size={13} />
                <span>Dense Index</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-12 font-mono-code text-xs">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter size={13} className="text-[#89919d] mr-1 hidden sm:inline" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory(cat);
                }}
                className={`rounded-full px-3.5 py-1.5 transition-colors border ${
                  selectedCategory === cat
                    ? "border-[#a9ddf0] bg-[#a9ddf0]/10 text-[#a9ddf0] font-semibold"
                    : "border-white/[0.08] bg-white/[0.03] text-[#89919d] hover:border-white/20 hover:text-[#f2f1ec]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#89919d]" />
            <input
              type="text"
              placeholder="Search by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-white/[0.08] bg-[#11141b] py-2 pl-9 pr-4 text-[#f2f1ec] placeholder-[#89919d]/50 focus:border-[#a9ddf0] focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Empty Search State */}
        {filteredProjects.length === 0 && (
          <div className="rounded-2xl border border-white/[0.08] bg-[#11141b] p-12 text-center font-mono-code text-sm text-[#89919d]">
            No projects matched your filter query.{" "}
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-[#a9ddf0] underline ml-2"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* GRID VIEW */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((p, idx) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                data-cursor-text="VIEW"
                className="group relative rounded-2xl border border-white/[0.08] bg-[#11141b] p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#a9ddf0]/40 hover:bg-[#161a23]"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6 font-mono-code text-xs">
                    <span className="text-[#a9ddf0] font-semibold">
                      0{idx + 1} // {p.category}
                    </span>
                    <span className="text-[#89919d]">{p.year}</span>
                  </div>

                  {/* Visual Interface Preview */}
                  {p.heroImage && (
                    <div className="relative w-full aspect-[16/9] mb-6 rounded-xl overflow-hidden bg-[#090b0f] border border-white/[0.06]">
                      <Image
                        src={p.heroImage}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                      />
                    </div>
                  )}

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#f2f1ec] group-hover:text-[#a9ddf0] transition-colors mb-3">
                    {p.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#89919d] font-light leading-relaxed mb-6">
                    {p.headline}
                  </p>

                  <div className="rounded-lg bg-[#090b0f] border border-white/[0.06] p-4 font-mono-code text-xs text-[#89919d] space-y-1.5 mb-6">
                    <div className="flex justify-between">
                      <span className="text-[#89919d]">ENGAGEMENT:</span>
                      <span className="text-[#f2f1ec]">{p.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#89919d]">ROLE:</span>
                      <span className="text-[#f2f1ec]">{p.role}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/[0.08] pt-4 font-mono-code text-xs">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[#89919d]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[#89919d] group-hover:text-[#a9ddf0] transition-colors">
                    <span>Inspect</span>
                    <ArrowUpRight size={13} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* LIST VIEW (Dense Index Table) */}
        {viewMode === "list" && (
          <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#11141b]">
            <table className="w-full text-left font-mono-code text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.02] text-[#89919d] uppercase">
                  <th className="py-4 px-6">#</th>
                  <th className="py-4 px-6">Project Title</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Engagement Type</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6">Year</th>
                  <th className="py-4 px-6 text-right">Route</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {filteredProjects.map((p, idx) => (
                  <tr
                    key={p.slug}
                    onMouseEnter={() => sound.playHover()}
                    className="hover:bg-white/[0.03] transition-colors group"
                  >
                    <td className="py-4 px-6 text-[#89919d]/50">0{idx + 1}</td>
                    <td className="py-4 px-6 font-display font-bold text-base text-[#f2f1ec] group-hover:text-[#a9ddf0]">
                      <Link href={`/work/${p.slug}`} className="block">
                        {p.title}
                      </Link>
                    </td>
                    <td className="py-4 px-6 text-[#89919d]">{p.category}</td>
                    <td className="py-4 px-6">
                      <span className="rounded bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 text-[#89919d]">
                        {p.type}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-[#89919d]">{p.role}</td>
                    <td className="py-4 px-6 text-[#89919d]">{p.year}</td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/work/${p.slug}`}
                        onClick={() => sound.playClick()}
                        className="inline-flex items-center gap-1 text-[#a9ddf0] hover:underline"
                      >
                        <span>View</span>
                        <ArrowUpRight size={12} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

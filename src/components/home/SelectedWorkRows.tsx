"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { sound } from "@/lib/sounds";
import MagneticButton from "@/components/ui/MagneticButton";

interface FeatureProject {
  id: string;
  num: string;
  badge: string;
  domain: string;
  headline: string;
  desc: string;
  tags: string[];
  image: string;
  href: string;
}

const FEATURE_PROJECTS: FeatureProject[] = [
  {
    id: "medesy",
    num: "01",
    badge: "01 // SHIPPED PRODUCT",
    domain: "Healthcare · Conversational Triage",
    headline: "MEDesy: Cutting clinical triage friction inside WhatsApp",
    desc: "Structured patient intake, symptom categorization, and doctor referrals built directly into WhatsApp—eliminating app-download drop-off for patients and streamlining clinical handoffs.",
    tags: ["Product Design", "Conversational UX", "Healthcare Triage", "0-to-1"],
    image: "/images/projects/medesy/whatsapp-mockup-opt.webp",
    href: "/work/medesy",
  },
  {
    id: "9jatrip",
    num: "02",
    badge: "02 // MOBILE PRODUCT",
    domain: "Intercity Transit · Live Booking System",
    headline: "9jaTrip: Replacing chaotic motor-park queues with verified mobile booking",
    desc: "An end-to-end mobile transit system bringing verified routes, real-time seat selection, and transparent terminal schedules to informal interstate travel.",
    tags: ["Mobile Product Design", "Transit Systems", "Route UX", "Design System"],
    image: "/images/projects/9jatrip/booking-ride-mockup-opt.webp",
    href: "/work/9jatrip",
  },
  {
    id: "paai",
    num: "03",
    badge: "03 // FINTECH SYSTEM",
    domain: "Autonomous AI · Trust Verification",
    headline: "PAAI: Designing trust gates for an autonomous AI finance assistant",
    desc: "A dual-theme mobile AI assistant pairing natural-language financial instructions with clear intent-to-card verification gates so users stay in control of automated actions.",
    tags: ["Personal AI", "Fintech", "Dual Theme System", "Mobile Systems"],
    image: "/images/projects/paai/paai-hero-mockup.png",
    href: "/work/paai",
  },
  {
    id: "somewhere",
    num: "04",
    badge: "04 // LIVE CONCEPT",
    domain: "Hospitality · Spatial UI Architecture",
    headline: "Somewhere Hotel: Reimagining hotel booking around daylight & space",
    desc: "An editorial spatial web concept replacing sterile enterprise date-pickers with architectural daylight transitions and calm, suite-first curation.",
    tags: ["Spatial UI", "Editorial Web", "Interaction Design", "Live Concept"],
    image: "/images/projects/somewhere/hotel-exterior-sunset-opt.webp",
    href: "/work/somewhere-hotel",
  },
  {
    id: "buybuddy",
    num: "05",
    badge: "05 // CONCEPT SYSTEM",
    domain: "Social Commerce · Group Cart Coordination",
    headline: "BuyBuddy: Frictionless group checkout & peer-to-peer cart coordination",
    desc: "A collaborative commerce prototype solving multi-user cart fragmentation through synchronized basket state and single-tap split billing.",
    tags: ["Social Commerce", "Collaborative UX", "Cart Systems", "Prototyping"],
    image: "/images/projects/buybuddy/store-landing-opt.webp",
    href: "/work/buybuddy",
  },
  {
    id: "stillwater",
    num: "06",
    badge: "06 // DIGITAL SPACE",
    domain: "Hospitality Architecture · Spatial Web Experience",
    headline: "Stillwater Hall: Immersive spatial identity for private wellness retreats",
    desc: "A quiet, typography-driven digital flagship capturing tactile estate experiences through ambient motion, room-level discovery, and direct residency inquiries.",
    tags: ["Spatial Identity", "Art Direction", "Editorial Experience", "Motion Systems"],
    image: "/images/projects/stillwater/venue-exterior-opt.webp",
    href: "/work/stillwater",
  },
];

export default function SelectedWorkRows() {
  const router = useRouter();
  const rowsRef = useRef<Array<HTMLElement | null>>([]);
  const imagesRef = useRef<Array<HTMLDivElement | null>>([]);

  // Zero-jank GPU parallax and scale-reveal driven entirely on DOM refs via passive scroll + RAF
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const vh = window.innerHeight;
        rowsRef.current.forEach((row, i) => {
          if (!row) return;
          const img = imagesRef.current[i];
          if (!img) return;

          const rect = row.getBoundingClientRect();
          // If completely out of view, skip computations
          if (rect.bottom < -100 || rect.top > vh + 100) return;

          // Normalized progress across viewport: 0 when top enters bottom of screen, 1 when bottom leaves top
          const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
          
          // Smooth scale from 1.06 to 1.00
          const scale = 1.06 - 0.06 * progress;
          // Subtle ±16px GPU vertical parallax
          const translateY = (progress - 0.5) * -32;

          img.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
        });
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleRowClick = (href: string, e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Don't intercept direct link clicks inside row
    if (target.closest("a")) return;
    sound.playClick();
    router.push(href);
  };

  return (
    <section id="work" className="relative w-full border-t border-white/[0.10] bg-[#090b0f] text-[#FDFDFD]">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 pt-24 sm:pt-32 pb-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-white/[0.10]">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent,#38bdf8)] animate-pulse" aria-hidden="true" />
              <p className="font-mono-code text-xs uppercase tracking-widest text-[var(--accent,#38bdf8)] m-0">
                (02) &mdash; Selected work
              </p>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#f2f1ec] m-0">
              Verified Production Case Studies.
            </h2>
          </div>

          <div className="font-mono-code text-xs text-[#89919d] flex items-center gap-2">
            <span>[06 Flagship Systems // 2023 &mdash; 2026]</span>
          </div>
        </div>

        {/* Asymmetric Editorial Feature Rows */}
        <div className="divide-y divide-white/[0.10]">
          {FEATURE_PROJECTS.map((project, idx) => {
            return (
              <article
                key={project.id}
                ref={(el) => {
                  rowsRef.current[idx] = el;
                }}
                onClick={(e) => handleRowClick(project.href, e)}
                data-cursor-text="Read Case Study ↗"
                className="group relative cursor-pointer py-16 sm:py-20 lg:py-24 transition-colors duration-300 hover:bg-white/[0.015]"
                aria-label={project.headline}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                  
                  {/* Left Column: Metadata & Strategic Editorial (5 Columns on Desktop) */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:pr-4">
                    <div>
                      {/* Monospace Index + Status Pill */}
                      <div className="flex items-center gap-3 mb-4 font-mono-code text-xs">
                        <span className="text-[var(--accent,#38bdf8)] font-semibold transition-colors duration-200">
                          {project.badge}
                        </span>
                        <span className="text-white/20">&bull;</span>
                        <span className="text-[#89919d] text-[11px] truncate">
                          {project.domain}
                        </span>
                      </div>

                      {/* Outcome-First Headline */}
                      <h3 className="font-display text-2xl sm:text-3xl lg:text-[2rem] font-bold text-[#f2f1ec] leading-[1.25] tracking-tight transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:text-white m-0">
                        <Link
                          href={project.href}
                          onClick={() => sound.playClick()}
                          className="hover:underline focus:outline-none"
                        >
                          {project.headline}
                        </Link>
                      </h3>

                      {/* Concise Description */}
                      <p className="font-sans text-sm sm:text-base text-[#89919d] font-light leading-relaxed mt-4 max-w-lg m-0">
                        {project.desc}
                      </p>
                    </div>

                    {/* Tags Strip: Single-row horizontal scroll on mobile, flex-wrap on desktop */}
                    <div className="pt-2">
                      <div className="flex sm:flex-wrap items-center overflow-x-auto sm:overflow-visible no-scrollbar pb-1 sm:pb-0 gap-2 font-mono-code text-[11px]">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-white/[0.04] border border-white/[0.08] px-3 py-1 text-[#89919d] shrink-0 whitespace-nowrap transition-colors duration-200 group-hover:border-white/20 group-hover:text-[#f2f1ec]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* CTA Action */}
                      <div className="pt-6">
                        <Link
                          href={project.href}
                          onClick={() => sound.playClick()}
                          className="inline-flex items-center gap-2 font-mono-code text-xs font-semibold text-[#f2f1ec] group-hover:text-[var(--accent,#38bdf8)] transition-colors"
                        >
                          <span>Inspect Strategic Case Study</span>
                          <span className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                            &rarr;
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Framed Product Visual (7 Columns on Desktop) */}
                  <div className="lg:col-span-7">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl lg:rounded-3xl border border-white/[0.12] bg-[#11141b] shadow-2xl transition-all duration-500 group-hover:border-[var(--accent,#38bdf8)]/40 group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
                      <div
                        ref={(el) => {
                          imagesRef.current[idx] = el;
                        }}
                        className="relative h-full w-full will-change-transform"
                      >
                        <Image
                          src={project.image}
                          alt={project.headline}
                          fill
                          sizes="(max-width: 1024px) 100vw, 58vw"
                          className="object-cover object-top"
                          loading={idx < 2 ? "eager" : "lazy"}
                        />
                      </div>

                      {/* Subtle Glass Vignette Overlay */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />
                    </div>
                  </div>

                </div>
              </article>
            );
          })}
        </div>

        {/* Section Closing CTA */}
        <div className="pt-16 sm:pt-20 border-t border-white/[0.10] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <p className="font-mono-code text-xs text-[#89919d] m-0">
            Looking for extended systems, technical design tokens, and corporate rebrands?
          </p>

          <MagneticButton maxDistance={8} strength={0.25}>
            <Link
              href="/work"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-3 rounded-full bg-[#f2f1ec] px-7 py-3.5 font-mono-code text-xs font-semibold text-[#090b0f] hover:bg-[var(--accent,#38bdf8)] transition-colors shadow-lg cursor-pointer"
            >
              <span>Explore All 12 Systems in Work Directory</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </MagneticButton>
        </div>

      </div>
    </section>
  );
}

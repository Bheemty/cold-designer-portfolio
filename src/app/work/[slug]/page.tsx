import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  ExternalLink,
  Code2,
  ShieldCheck,
  Workflow,
  Sparkles,
  BookOpen,
  AlertCircle,
  Compass,
} from "lucide-react";
import { PROJECTS } from "@/data/projects";
import ScrollReveal from "@/components/motion/ScrollReveal";

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found — Cold Designer" };

  return {
    title: `${project.title} — Case Study | Cold Designer`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — ${project.headline}`,
      description: project.summary,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  if (projectIndex === -1) notFound();

  const project = PROJECTS[projectIndex];
  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];
  const prevProject = PROJECTS[(projectIndex - 1 + PROJECTS.length) % PROJECTS.length];

  return (
    <main className="min-h-screen pt-32 sm:pt-40 pb-24 px-4 sm:px-10 bg-[#090b0f] text-[#f2f1ec]">
      <div className="mx-auto max-w-5xl">
        {/* Top Back Link */}
        <div className="mb-12">
          <Link
            href="/work"
            className="case-study-glass-chip inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2 font-mono-code text-xs text-[#89919d] hover:text-[#a9ddf0] hover:border-[#a9ddf0]/30 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.12),0_4px_16px_rgba(0,0,0,0.3)] transition-all"
            style={{
              backdropFilter: "url(#cold-glass-filter-pill) blur(20px) saturate(185%) contrast(105%)",
              WebkitBackdropFilter: "blur(20px) saturate(185%) contrast(105%)",
            }}
          >
            <ArrowLeft size={13} />
            <span>Return to Project Index</span>
          </Link>
        </div>

        {/* Case Study Hero */}
        <header className="border-b border-white/[0.08] pb-16 mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-6 font-mono-code text-xs">
            <span className="case-study-glass-chip rounded-full bg-[#a9ddf0]/10 text-[#a9ddf0] border border-[#a9ddf0]/30 px-3.5 py-1 font-semibold shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.25)]">
              {project.category}
            </span>
            <span className="case-study-glass-chip rounded-full bg-white/[0.04] border border-white/[0.10] px-3 py-1 text-[#89919d] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.08)]">
              {project.type}
            </span>
            {project.badgeLabel && (
              <span className="case-study-glass-chip rounded-full bg-[#a9ddf0]/5 border border-[#a9ddf0]/20 px-3 py-1 text-[#a9ddf0] font-mono-code text-[11px]">
                {project.badgeLabel}
              </span>
            )}
            <span className="text-[#89919d]">{"// "}{project.year}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#f2f1ec] mb-6">
            {project.title}
          </h1>

          <p className="text-xl sm:text-2xl text-[#89919d] font-light leading-relaxed max-w-3xl mb-8">
            {project.headline}
          </p>

          {/* Action Links (Live, Figma, GitHub) */}
          <div className="flex flex-wrap gap-3 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#f2f1ec] px-5 py-2.5 font-mono-code text-xs font-semibold text-[#090b0f] hover:bg-[#a9ddf0] transition-colors"
              >
                <span>Visit Live Experience</span>
                <ExternalLink size={13} />
              </a>
            )}

            {project.prototypeUrl && (
              <a
                href={project.prototypeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="case-study-glass-chip inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.04] px-5 py-2.5 font-mono-code text-xs font-semibold text-[#f2f1ec] hover:border-[#a9ddf0] hover:text-[#a9ddf0] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.18),0_4px_16px_rgba(0,0,0,0.3)] transition-all"
              >
                <span>Inspect in Figma</span>
                <ArrowUpRight size={13} />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="case-study-glass-chip inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.04] px-5 py-2.5 font-mono-code text-xs font-semibold text-[#89919d] hover:text-[#f2f1ec] hover:border-white/30 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.12),0_4px_16px_rgba(0,0,0,0.3)] transition-all"
              >
                <Code2 size={13} />
                <span>Source Repository</span>
              </a>
            )}
          </div>

          {/* Project Metadata Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/[0.08] font-mono-code text-xs">
            <div>
              <span className="text-[#89919d] uppercase block mb-1">CLIENT / CONTEXT</span>
              <span className="text-[#f2f1ec] font-medium">{project.client}</span>
            </div>
            <div>
              <span className="text-[#89919d] uppercase block mb-1">DESIGN ROLE</span>
              <span className="text-[#f2f1ec] font-medium">{project.role}</span>
            </div>
            <div>
              <span className="text-[#89919d] uppercase block mb-1">ENGAGEMENT TYPE</span>
              <span className="text-[#f2f1ec] font-medium">{project.type}</span>
            </div>
            <div>
              <span className="text-[#89919d] uppercase block mb-1">TIMELINE</span>
              <span className="text-[#f2f1ec] font-medium">{project.timeline}</span>
            </div>
          </div>

          {/* Confidentiality / NDA Notice where applicable */}
          {project.confidentialityNote && (
            <div className="mt-8 rounded-xl border border-white/[0.10] bg-white/[0.02] p-5 font-mono-code text-xs flex items-start gap-3">
              <ShieldCheck size={16} className="text-[#a9ddf0] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-[#a9ddf0] font-semibold uppercase tracking-wider block">
                  Confidentiality &amp; NDA Protocol
                </span>
                <p className="text-[#89919d] leading-relaxed">
                  {project.confidentialityNote}
                </p>
              </div>
            </div>
          )}
        </header>

        {/* Hero Visual Mockup or Video Showcase */}
        <ScrollReveal start="top 85%" y={24} duration={0.5}>
          {project.videoSrc ? (
            <div className="mb-20 overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#11141b] p-4 sm:p-6 shadow-2xl">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#090b0f]">
                <video
                  src={project.videoSrc}
                  poster={project.heroImage}
                  controls
                  playsInline
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 flex items-center justify-between font-mono-code text-[11px] text-[#89919d]">
                <span>Cinematic Video Walkthrough Specimen</span>
                <span>{project.title} — Verified Spatial Recording</span>
              </div>
            </div>
          ) : project.heroImage ? (
            <div className="mb-20 overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#11141b] p-4 sm:p-6 shadow-2xl">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#090b0f]">
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  className="object-contain sm:object-cover"
                  priority
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <div className="mt-4 flex items-center justify-between font-mono-code text-[11px] text-[#89919d]">
                <span>Primary Interface Overview</span>
                <span>{project.title} — Verified Visual Specimen</span>
              </div>
            </div>
          ) : null}
        </ScrollReveal>

        {/* Deliverables Pills */}
        <ScrollReveal start="top 85%" y={20} duration={0.45}>
          <section className="mb-20">
            <span className="font-mono-code text-xs text-[#89919d] uppercase tracking-wider block mb-4">
              Deliverables &amp; Artifacts:
            </span>
            <div className="flex flex-wrap gap-2 font-mono-code text-xs">
              {project.deliverables.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-[#11141b] px-3.5 py-2 text-[#f2f1ec]"
                >
                  <CheckCircle2 size={13} className="text-[#a9ddf0]" />
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* 01 // STRATEGIC CONTEXT & PROBLEM SPACE */}
        {/* ───────────────────────────────────────────────────────────── */}
        <ScrollReveal start="top 85%" y={20} duration={0.45}>
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-20">
            <div className="md:col-span-4 font-mono-code text-xs text-[#89919d] uppercase tracking-wider">
              <span>01 // STRATEGIC CONTEXT</span>
            </div>
            <div className="md:col-span-8 space-y-6">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#f2f1ec]">
                The Context &amp; Problem Space
              </h2>
              <p className="text-base sm:text-lg text-[#89919d] font-light leading-relaxed">
                {project.overview}
              </p>

              {/* Structured Problem Breakdown if available */}
              {project.problemStatement && (
                <div className="grid grid-cols-1 gap-4 pt-2 font-mono-code text-xs">
                  <div className="rounded-xl border border-white/[0.08] bg-[#11141b] p-5 space-y-2">
                    <span className="text-[#89919d] uppercase tracking-wide block">Real-World Context:</span>
                    <p className="text-[#f2f1ec] font-light leading-relaxed text-sm">
                      {project.problemStatement.context}
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-[#11141b] p-5 space-y-2">
                    <span className="text-[#a9ddf0] uppercase tracking-wide block">Human Friction Point:</span>
                    <p className="text-[#f2f1ec] font-light leading-relaxed text-sm">
                      {project.problemStatement.friction}
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-[#11141b] p-5 space-y-2">
                    <span className="text-[#89919d] uppercase tracking-wide block">Operational &amp; User Impact:</span>
                    <p className="text-[#f2f1ec] font-light leading-relaxed text-sm">
                      {project.problemStatement.impact}
                    </p>
                  </div>
                </div>
              )}

              <div className="rounded-xl border border-white/[0.08] bg-[#11141b] p-6 space-y-3">
                <h3 className="font-mono-code text-xs font-semibold text-[#a9ddf0] uppercase tracking-wide">
                  The Primary Challenge
                </h3>
                <p className="text-sm text-[#f2f1ec]/90 leading-relaxed font-light">
                  {project.challenge}
                </p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* 02 // RESEARCH & DISCOVERY INSIGHTS */}
        {/* ───────────────────────────────────────────────────────────── */}
        {project.discoveryInsights && project.discoveryInsights.length > 0 && (
          <ScrollReveal start="top 85%" y={20} duration={0.45}>
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-20 border-t border-white/[0.08] pt-16">
              <div className="md:col-span-4 font-mono-code text-xs text-[#89919d] uppercase tracking-wider">
                <span>02 // RESEARCH &amp; DISCOVERY</span>
              </div>
              <div className="md:col-span-8 space-y-6">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#f2f1ec] mb-2">
                    Human Realities &amp; Critical Constraints
                  </h2>
                  <p className="text-sm sm:text-base text-[#89919d] font-light leading-relaxed">
                    Grounded observations, physical boundaries, and ergonomic realities uncovered during discovery without artificial assumptions.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-2">
                  {project.discoveryInsights.map((insight, idx) => (
                    <div
                      key={insight.title}
                      className="rounded-xl border border-white/[0.08] bg-[#11141b] p-6 space-y-2"
                    >
                      <div className="flex items-center justify-between font-mono-code text-[11px] mb-1">
                        <span className="text-[#a9ddf0] font-semibold">INSIGHT 0{idx + 1}</span>
                        <span
                          className={`uppercase px-2.5 py-0.5 rounded-full border text-[10px] ${
                            insight.type === "observation"
                              ? "bg-amber-500/10 text-amber-300 border-amber-500/20"
                              : insight.type === "constraint"
                              ? "bg-purple-500/10 text-purple-300 border-purple-500/20"
                              : "bg-[#a9ddf0]/10 text-[#a9ddf0] border-[#a9ddf0]/20"
                          }`}
                        >
                          {insight.type}
                        </span>
                      </div>
                      <h4 className="font-display text-lg font-bold text-[#f2f1ec]">{insight.title}</h4>
                      <p className="text-sm text-[#89919d] font-light leading-relaxed">
                        {insight.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* 03 // STRATEGIC DECISIONS & TRADE-OFFS */}
        {/* ───────────────────────────────────────────────────────────── */}
        {project.designDecisions && project.designDecisions.length > 0 && (
          <ScrollReveal start="top 85%" y={20} duration={0.45}>
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-20 border-t border-white/[0.08] pt-16">
              <div className="md:col-span-4 font-mono-code text-xs text-[#89919d] uppercase tracking-wider">
                <span>03 // STRATEGIC DECISIONS</span>
              </div>
              <div className="md:col-span-8 space-y-6">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#f2f1ec] mb-2">
                    Key Architectural Decisions &amp; Trade-Offs
                  </h2>
                  <p className="text-sm sm:text-base text-[#89919d] font-light leading-relaxed">
                    Why specific UX directions were prioritized over alternatives, and what compromises were deliberately accepted.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 pt-2">
                  {project.designDecisions.map((decision, idx) => (
                    <div
                      key={decision.title}
                      className="rounded-xl border border-white/[0.08] bg-[#11141b] p-6 space-y-3"
                    >
                      <div className="flex items-center gap-2 font-mono-code text-xs text-[#a9ddf0]">
                        <Compass size={13} />
                        <span className="font-semibold">STRATEGIC DIRECTION 0{idx + 1}</span>
                      </div>
                      <h4 className="font-display text-xl font-bold text-[#f2f1ec]">
                        {decision.title}
                      </h4>
                      <div className="space-y-2 text-sm text-[#89919d] font-light leading-relaxed">
                        <p>
                          <strong className="text-[#f2f1ec] font-medium">Design Rationale: </strong>
                          {decision.rationale}
                        </p>
                        {decision.tradeOff && (
                          <div className="mt-3 rounded-lg border border-white/[0.06] bg-black/30 p-3 font-mono-code text-xs text-[#89919d]">
                            <span className="text-[#a9ddf0] font-semibold">Deliberate Trade-Off: </span>
                            <span>{decision.tradeOff}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* 04 // ARCHITECTURAL SOLUTION & WORKFLOWS */}
        {/* ───────────────────────────────────────────────────────────── */}
        <ScrollReveal start="top 85%" y={20} duration={0.45}>
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-20 border-t border-white/[0.08] pt-16">
            <div className="md:col-span-4 font-mono-code text-xs text-[#89919d] uppercase tracking-wider">
              <span>04 // ARCHITECTURAL SOLUTION</span>
            </div>
            <div className="md:col-span-8 space-y-8">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#f2f1ec] mb-3">
                  Design Execution &amp; Approach
                </h2>
                <p className="text-base sm:text-lg text-[#89919d] font-light leading-relaxed">
                  {project.solution}
                </p>
              </div>

              {/* Core User Workflows when present */}
              {project.coreWorkflows && project.coreWorkflows.length > 0 && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-2 font-mono-code text-xs text-[#a9ddf0] uppercase tracking-wider">
                    <Workflow size={14} />
                    <span>Primary User Workflows &amp; Interaction Journeys</span>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {project.coreWorkflows.map((flow, i) => (
                      <div
                        key={flow.title}
                        className="rounded-xl border border-white/[0.08] bg-[#11141b] p-6 space-y-4"
                      >
                        <div className="flex items-center justify-between font-mono-code text-xs">
                          <span className="text-[#a9ddf0] font-semibold">WORKFLOW 0{i + 1}</span>
                          <span className="text-[#89919d]">JOURNEY FLOW</span>
                        </div>
                        <h4 className="font-display text-lg font-bold text-[#f2f1ec]">{flow.title}</h4>

                        <ol className="space-y-2 font-mono-code text-xs text-[#89919d]">
                          {flow.steps.map((step, sIdx) => (
                            <li key={step} className="flex items-start gap-2.5">
                              <span className="text-[#a9ddf0] font-semibold shrink-0">
                                0{sIdx + 1}.
                              </span>
                              <span className="leading-relaxed text-[#f2f1ec]/90">{step}</span>
                            </li>
                          ))}
                        </ol>

                        <div className="pt-2 border-t border-white/[0.06] font-mono-code text-xs">
                          <span className="text-[#89919d] uppercase">End Outcome: </span>
                          <span className="text-[#a9ddf0] font-medium">{flow.outcome}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* System Highlights Cards */}
              <div className="space-y-4 pt-4">
                <div className="font-mono-code text-xs text-[#89919d] uppercase tracking-wider">
                  <span>System Specification Highlights:</span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {project.systemHighlights.map((hl, i) => (
                    <div
                      key={hl.title}
                      className="rounded-xl border border-white/[0.08] bg-[#11141b] p-6 hover:border-white/20 transition-colors"
                    >
                      <div className="flex items-center gap-2 font-mono-code text-xs text-[#a9ddf0] mb-2">
                        <span className="font-semibold">FEATURE SPEC 0{i + 1}</span>
                      </div>
                      <h4 className="font-display text-xl font-bold text-[#f2f1ec] mb-2">{hl.title}</h4>
                      <p className="text-sm text-[#89919d] font-light leading-relaxed">
                        {hl.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* 05 // VISUAL ARTIFACTS & SPECIMENS */}
        {/* ───────────────────────────────────────────────────────────── */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="mb-20 border-t border-white/[0.08] pt-16">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-10">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a9ddf0]" />
                <span className="font-mono-code text-xs uppercase tracking-widest text-[#a9ddf0]">
                  05 // Interface Artifacts &amp; Visual Specimens
                </span>
              </div>
              <span className="font-mono-code text-xs text-[#89919d]">
                [AUTHENTIC FIGMA DESIGNS &amp; PRODUCTION SPECIMENS]
              </span>
            </div>

            <div className="space-y-12">
              {project.gallery.map((item, idx) => (
                <ScrollReveal key={item.src + idx} start="top 85%" y={24} duration={0.45}>
                  <div className="group overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#11141b] p-4 sm:p-8 transition-all hover:border-white/20">
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#090b0f]">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-contain sm:object-cover transition-transform duration-700 group-hover:scale-[1.01]"
                        sizes="(max-width: 1200px) 100vw, 1200px"
                      />
                    </div>
                    <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-t border-white/[0.06] pt-4 font-mono-code text-xs">
                      <span className="text-[#f2f1ec] font-medium leading-relaxed max-w-2xl">
                        {item.caption}
                      </span>
                      <span className="text-[#89919d] text-[11px] shrink-0">
                        SPECIMEN 0{idx + 1}
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}

        {/* Editorial Notice for Conceptual/Figma-Only Projects */}
        {(!project.gallery || project.gallery.length === 0) && (
          <ScrollReveal start="top 85%" y={20} duration={0.45}>
            <section className="mb-20 border-t border-white/[0.08] pt-16">
              <div className="rounded-2xl border border-white/[0.08] bg-[#11141b] p-8 sm:p-10">
                <div className="flex items-center gap-2 font-mono-code text-xs text-[#a9ddf0] mb-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#a9ddf0]" />
                  <span className="uppercase tracking-widest">Interface Exploration &amp; Specimen Files</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[#f2f1ec] mb-3">
                  Interactive Design Specs &amp; Exploration Files
                </h3>
                <p className="text-base text-[#89919d] font-light leading-relaxed max-w-2xl mb-6">
                  Complete user journeys, typography grids, component states, and design system variables for {project.title} are documented in the project source files.
                </p>
                <div className="flex flex-wrap gap-3">
                  {project.prototypeUrl && (
                    <a
                      href={project.prototypeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#f2f1ec] px-5 py-2.5 font-mono-code text-xs font-semibold text-[#090b0f] hover:bg-[#a9ddf0] transition-colors"
                    >
                      <span>Open Verified Figma File</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-5 py-2.5 font-mono-code text-xs font-semibold text-[#f2f1ec] hover:border-[#a9ddf0] hover:text-[#a9ddf0] transition-colors"
                    >
                      <Code2 size={13} />
                      <span>View Source Repository</span>
                    </a>
                  )}
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* 06 // VALIDATION, CRITIQUE & ITERATIONS */}
        {/* ───────────────────────────────────────────────────────────── */}
        {project.validation && (
          <ScrollReveal start="top 85%" y={20} duration={0.45}>
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-20 border-t border-white/[0.08] pt-16">
              <div className="md:col-span-4 font-mono-code text-xs text-[#89919d] uppercase tracking-wider">
                <span>06 // VALIDATION &amp; ITERATION</span>
              </div>
              <div className="md:col-span-8 space-y-6">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#f2f1ec] mb-2">
                    Constructive Critique &amp; Iterative Refinements
                  </h2>
                  <p className="text-sm sm:text-base text-[#89919d] font-light leading-relaxed">
                    How design directions were tested, what friction emerged in review, and what concrete changes were introduced.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Methodology & Feedback */}
                  <div className="rounded-xl border border-white/[0.08] bg-[#11141b] p-6 space-y-3">
                    <span className="font-mono-code text-xs text-[#a9ddf0] uppercase tracking-wide block">
                      Evaluation Methodology:
                    </span>
                    <p className="text-sm text-[#f2f1ec]/90 leading-relaxed font-light">
                      {project.validation.methodology}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/[0.08] bg-[#11141b] p-6 space-y-3">
                    <span className="font-mono-code text-xs text-[#89919d] uppercase tracking-wide block">
                      Review Findings &amp; Friction Points:
                    </span>
                    <p className="text-sm text-[#89919d] leading-relaxed font-light">
                      {project.validation.feedbackSummary}
                    </p>
                  </div>

                  {/* Concrete Iterations Made */}
                  {project.validation.iterationsMade && project.validation.iterationsMade.length > 0 && (
                    <div className="rounded-xl border border-white/[0.08] bg-[#11141b] p-6 space-y-3">
                      <span className="font-mono-code text-xs text-[#a9ddf0] uppercase tracking-wide block">
                        Concrete Iterations Implemented:
                      </span>
                      <ul className="space-y-2 font-mono-code text-xs text-[#89919d]">
                        {project.validation.iterationsMade.map((iteration) => (
                          <li key={iteration} className="flex items-start gap-2.5">
                            <CheckCircle2 size={13} className="text-[#a9ddf0] shrink-0 mt-0.5" />
                            <span className="text-[#f2f1ec]/90 leading-relaxed">{iteration}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Honest Limitations Acknowledged */}
                  {project.validation.limitationsAcknowledged && (
                    <div className="rounded-xl border border-white/[0.08] bg-black/40 p-5 space-y-2 font-mono-code text-xs">
                      <div className="flex items-center gap-2 text-amber-300">
                        <AlertCircle size={13} />
                        <span className="font-semibold uppercase tracking-wider">
                          Acknowledged Constraints &amp; Scope Boundaries:
                        </span>
                      </div>
                      <p className="text-[#89919d] leading-relaxed font-light">
                        {project.validation.limitationsAcknowledged}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* 07 // DELIVERABLES & DESIGNER RETROSPECTIVE */}
        {/* ───────────────────────────────────────────────────────────── */}
        {project.outcomes && (
          <ScrollReveal start="top 85%" y={20} duration={0.45}>
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-20 border-t border-white/[0.08] pt-16">
              <div className="md:col-span-4 font-mono-code text-xs text-[#89919d] uppercase tracking-wider">
                <span>07 // OUTCOMES &amp; LEARNINGS</span>
              </div>
              <div className="md:col-span-8 space-y-6">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#f2f1ec] mb-2">
                    Delivered Artifacts &amp; Retrospective
                  </h2>
                  <p className="text-sm sm:text-base text-[#89919d] font-light leading-relaxed">
                    Tangible outcomes produced, personal designer reflections, and avenues for future exploration.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Deliverables summary */}
                  <div className="rounded-xl border border-white/[0.08] bg-[#11141b] p-6 space-y-2">
                    <span className="font-mono-code text-xs text-[#a9ddf0] uppercase tracking-wide block">
                      Delivered Artifacts Summary:
                    </span>
                    <p className="text-sm text-[#f2f1ec] leading-relaxed font-light">
                      {project.outcomes.deliverablesSummary}
                    </p>
                  </div>

                  {/* Key Learnings */}
                  {project.outcomes.keyLearnings && project.outcomes.keyLearnings.length > 0 && (
                    <div className="rounded-xl border border-white/[0.08] bg-[#11141b] p-6 space-y-3">
                      <div className="flex items-center gap-2 font-mono-code text-xs text-[#a9ddf0] uppercase tracking-wide">
                        <BookOpen size={13} />
                        <span>Key Designer Learnings &amp; Retrospective:</span>
                      </div>
                      <div className="space-y-3 text-sm text-[#89919d] font-light leading-relaxed">
                        {project.outcomes.keyLearnings.map((learning, lIdx) => (
                          <p key={lIdx} className="border-l border-[#a9ddf0]/30 pl-4 py-1">
                            {learning}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Future Improvements */}
                  {project.outcomes.futureImprovements && project.outcomes.futureImprovements.length > 0 && (
                    <div className="rounded-xl border border-white/[0.08] bg-[#11141b] p-6 space-y-2 font-mono-code text-xs">
                      <div className="flex items-center gap-2 text-[#89919d] uppercase">
                        <Sparkles size={13} className="text-[#a9ddf0]" />
                        <span>Avenues for Next Iteration (V2 Scope):</span>
                      </div>
                      <ul className="space-y-1.5 text-[#f2f1ec]/80">
                        {project.outcomes.futureImprovements.map((imp) => (
                          <li key={imp} className="flex items-start gap-2">
                            <span className="text-[#a9ddf0]">→</span>
                            <span>{imp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TECHNICAL & VERIFICATION SPECS */}
        {/* ───────────────────────────────────────────────────────────── */}
        <ScrollReveal start="top 85%" y={20} duration={0.45}>
          <section className="rounded-2xl border border-white/[0.08] bg-[#11141b] p-6 sm:p-10 mb-20 font-mono-code text-xs">
            <div className="flex items-center gap-3 mb-6 border-b border-white/[0.08] pb-4">
              <Cpu size={15} className="text-[#a9ddf0]" />
              <span className="uppercase text-[#f2f1ec] font-semibold tracking-wider">
                Implementation Parameters &amp; Verified Scope
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.specifications.map((spec) => (
                <div key={spec.label} className="border-b border-white/[0.06] pb-3">
                  <span className="text-[#89919d] block mb-1">{spec.label}</span>
                  <span className="text-[#f2f1ec] font-medium">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.08] text-[#89919d]">
              <span className="text-[#a9ddf0] font-semibold">LAYOUT ARCHITECTURE: </span>
              <span className="text-[#f2f1ec]/80">{project.wireframeSummary}</span>
            </div>
          </section>
        </ScrollReveal>

        {/* Bottom Next & Previous Project Switcher */}
        <ScrollReveal start="top 88%" y={20} duration={0.45}>
          <nav className="border-t border-white/[0.08] pt-16">
            <div className="flex items-center justify-between font-mono-code text-xs text-[#89919d] mb-6 uppercase">
              <span>Navigation Relays</span>
              <span>Case Study Exploration</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link
                href={`/work/${prevProject.slug}`}
                className="group rounded-xl border border-white/[0.08] bg-[#11141b] p-6 hover:border-[#a9ddf0]/40 hover:shadow-xl active:scale-[0.99] transition-all"
              >
                <span className="font-mono-code text-xs text-[#89919d] block mb-2">
                  ← PREVIOUS PROJECT
                </span>
                <h4 className="font-display text-xl sm:text-2xl font-bold text-[#f2f1ec] group-hover:text-[#a9ddf0] transition-colors">
                  {prevProject.title}
                </h4>
                <p className="font-mono-code text-xs text-[#89919d] mt-1">{prevProject.category}</p>
              </Link>

              <Link
                href={`/work/${nextProject.slug}`}
                className="group rounded-xl border border-white/[0.08] bg-[#11141b] p-6 text-right hover:border-[#a9ddf0]/40 hover:shadow-xl active:scale-[0.99] transition-all"
              >
                <span className="font-mono-code text-xs text-[#89919d] block mb-2">
                  NEXT PROJECT →
                </span>
                <h4 className="font-display text-xl sm:text-2xl font-bold text-[#f2f1ec] group-hover:text-[#a9ddf0] transition-colors">
                  {nextProject.title}
                </h4>
                <p className="font-mono-code text-xs text-[#89919d] mt-1">{nextProject.category}</p>
              </Link>
            </div>
          </nav>
        </ScrollReveal>
      </div>
    </main>
  );
}

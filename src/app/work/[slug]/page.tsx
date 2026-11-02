import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Cpu, ExternalLink, Code2 } from "lucide-react";
import { PROJECTS } from "@/data/projects";

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
    <main className="min-h-screen pt-32 sm:pt-40 pb-24 px-6 sm:px-10 bg-[#090b0f] text-[#f2f1ec]">
      <div className="mx-auto max-w-5xl">
        {/* Top Back Link */}
        <div className="mb-12">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-mono-code text-xs text-[#89919d] hover:text-[#a9ddf0] transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Return to Project Index</span>
          </Link>
        </div>

        {/* Case Study Hero */}
        <header className="border-b border-white/[0.08] pb-16 mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-6 font-mono-code text-xs">
            <span className="rounded bg-[#a9ddf0]/10 text-[#a9ddf0] border border-[#a9ddf0]/25 px-2.5 py-1 font-semibold">
              {project.category}
            </span>
            <span className="rounded bg-white/[0.03] border border-white/[0.06] px-2.5 py-1 text-[#89919d]">
              {project.type}
            </span>
            <span className="text-[#89919d]">// {project.year}</span>
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
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-5 py-2.5 font-mono-code text-xs font-semibold text-[#f2f1ec] hover:border-[#a9ddf0] hover:text-[#a9ddf0] transition-colors"
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
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-5 py-2.5 font-mono-code text-xs font-semibold text-[#89919d] hover:text-[#f2f1ec] transition-colors"
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
        </header>

        {/* Hero Visual Mockup or Video Showcase */}
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

        {/* Deliverables Pills */}
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

        {/* Strategic Context & Friction */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
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

        {/* The Solution & Architecture */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20 border-t border-white/[0.08] pt-16">
          <div className="md:col-span-4 font-mono-code text-xs text-[#89919d] uppercase tracking-wider">
            <span>02 // ARCHITECTURAL SOLUTION</span>
          </div>
          <div className="md:col-span-8 space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#f2f1ec]">
              Design Execution &amp; Approach
            </h2>
            <p className="text-base sm:text-lg text-[#89919d] font-light leading-relaxed">
              {project.solution}
            </p>

            {/* System Highlights Cards */}
            <div className="grid grid-cols-1 gap-4 pt-4">
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
        </section>

        {/* Visual Design Artifacts & Final Interface Screens */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="mb-20 border-t border-white/[0.08] pt-16">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-10">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a9ddf0]" />
                <span className="font-mono-code text-xs uppercase tracking-widest text-[#a9ddf0]">
                  03 // Interface Artifacts &amp; Visual Specimens
                </span>
              </div>
              <span className="font-mono-code text-xs text-[#89919d]">
                [AUTHENTIC FIGMA DESIGNS &amp; PRODUCTION SPECIMENS]
              </span>
            </div>

            <div className="space-y-12">
              {project.gallery.map((item, idx) => (
                <div
                  key={item.src + idx}
                  className="group overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#11141b] p-4 sm:p-8 transition-all hover:border-white/20"
                >
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
              ))}
            </div>
          </section>
        )}

        {/* Editorial Notice for Conceptual/Figma-Only Projects */}
        {(!project.gallery || project.gallery.length === 0) && (
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
        )}

        {/* Technical & Verification Specs */}
        <section className="rounded-2xl border border-white/[0.08] bg-[#11141b] p-8 sm:p-12 mb-20 font-mono-code text-xs">
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

        {/* Bottom Next & Previous Project Switcher */}
        <nav className="border-t border-white/[0.08] pt-16">
          <div className="flex items-center justify-between font-mono-code text-xs text-[#89919d] mb-6 uppercase">
            <span>Navigation Relays</span>
            <span>Case Study Exploration</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link
              href={`/work/${prevProject.slug}`}
              className="group rounded-xl border border-white/[0.08] bg-[#11141b] p-6 hover:border-[#a9ddf0]/30 transition-colors"
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
              className="group rounded-xl border border-white/[0.08] bg-[#11141b] p-6 text-right hover:border-[#a9ddf0]/30 transition-colors"
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
      </div>
    </main>
  );
}

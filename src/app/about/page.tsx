"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { sound } from "@/lib/sounds";
import ScrollReveal from "@/components/motion/ScrollReveal";

const VERIFIED_ENGAGEMENTS = [
  {
    period: "2024 — Present",
    role: "Product Designer",
    company: "Medesy Technologies",
    location: "Nigeria / Remote (Employment)",
    description:
      "Designing product architecture for a WhatsApp-first telehealth platform connecting patients with licensed physicians. Designing frictionless conversational triage, patient onboarding, and web service architecture.",
    tags: ["Conversational UX", "Telehealth", "Design Systems", "Web Architecture"],
  },
  {
    period: "2023 — 2024",
    role: "Product Designer",
    company: "Greall Technologies",
    location: "Nigeria (Employment)",
    description:
      "Led the complete corporate website redesign and brand identity evolution. Collaborated on digital fintech product architecture, multi-currency flows, and cross-platform design guidelines.",
    tags: ["Fintech Ecosystem", "Corporate Rebrand", "Design System", "Figma"],
  },
  {
    period: "Ongoing Practice",
    role: "Independent Product Designer & Technologist",
    company: "Cold Designer Studio",
    location: "Lagos, Nigeria",
    description:
      "Designing and prototyping specialized digital products across mobility (9jaTrip), social micro-commerce (BuyBuddy), mobile wellness companions (Nova Wellness in React Native), and cinematic web experiences (Stillwater Hall, Somewhere Hotel).",
    tags: ["Product Strategy", "React Native", "Next.js", "Design-to-Code"],
  },
];

const TOOLKIT = [
  {
    category: "Product & Systems Design",
    items: [
      "End-to-End Product Discovery & Flow Mapping",
      "Conversational UX (WhatsApp Decision Trees)",
      "Information Architecture & User Journeys",
      "Figma Design Systems & Token Governance",
      "Responsive Web & Mobile App Ergonomics",
    ],
  },
  {
    category: "Interaction & Motion Craft",
    items: [
      "Lenis Smooth Inertia & Scroll Pacing",
      "Framer Motion Physics & Spring Tuning",
      "Web Audio API Sound Integration",
      "Sequential Scrollytelling Choreography",
      "Tactile Micro-Interactions & Haptic States",
    ],
  },
  {
    category: "Engineering Fluency",
    items: [
      "React Native & Expo SDK",
      "Next.js App Router & Server Components",
      "TypeScript & Strict Type Safety",
      "Tailwind CSS & Component Architecture",
      "Git & Collaborative Production Workflows",
    ],
  },
  {
    category: "Domains & Specializations",
    items: [
      "Telehealth & Triage Gateways",
      "Urban Mobility & Commuter Terminal UX",
      "Social Commerce & Instant Stores",
      "Spatial & Editorial Web Experiences",
      "Privacy-First Local Storage Mobile Apps",
    ],
  },
];

export default function AboutPage() {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <main className="min-h-screen pt-32 sm:pt-40 pb-28 px-6 sm:px-10 lg:px-16 bg-[#090b0f] text-[#f2f1ec]">
      <div className="mx-auto max-w-[1440px]">
        {/* Page Header */}
        <header className="border-b border-white/[0.08] pb-12 mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 font-mono-code text-xs">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#a9ddf0] animate-pulse" />
              <span className="uppercase tracking-widest text-[#a9ddf0]">
                (01) &mdash; Identity &amp; Practice // Taye Abolarin
              </span>
            </div>
            <span className="text-[#89919d]">
              Cold Designer Studio &bull; Lagos, Nigeria
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#f2f1ec] mb-6">
            Taye Abolarin.
          </h1>

          <p className="text-xl sm:text-2xl text-[#89919d] font-light leading-relaxed max-w-4xl">
            UI/UX and Product Designer operating under the independent imprint <strong className="text-[#f2f1ec] font-medium">Cold Designer</strong>. Focused on creating structured, intuitive digital products across conversational healthcare gateways, regional transit platforms, and interactive web systems.
          </p>
        </header>

        {/* 2-COLUMN EXHIBITION & ESSAY SPREAD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          {/* Left Column: Art-Directed Exhibition Portrait Frame (5 cols) */}
          <div className="lg:col-span-5">
            <ScrollReveal start="top 85%" y={20} duration={0.5} className="sticky top-28 space-y-6">
              {/* Exhibition Mount Card */}
              <div
                style={{
                  boxShadow: "0 24px 60px -20px rgba(135, 85, 62, 0.22), 0 0 0 1px rgba(255, 255, 255, 0.08)",
                }}
                className="relative w-full rounded-3xl bg-[#11141b] overflow-hidden p-6 sm:p-7 flex flex-col justify-between space-y-6"
              >
                {/* Architectural Corner Crosshairs */}
                <div className="absolute top-4 left-4 font-mono-code text-[10px] text-white/20 select-none">+</div>
                <div className="absolute top-4 right-4 font-mono-code text-[10px] text-white/20 select-none">+</div>
                <div className="absolute bottom-4 left-4 font-mono-code text-[10px] text-white/20 select-none">+</div>
                <div className="absolute bottom-4 right-4 font-mono-code text-[10px] text-white/20 select-none">+</div>

                {/* Frame Header */}
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3.5 font-mono-code text-[11px] text-[#89919d]">
                  <span className="text-[#a9ddf0] uppercase tracking-wider font-semibold">
                    IDENTITY MONOGRAPH // PORTRAIT
                  </span>
                  <span>REF. CD-01</span>
                </div>

                {/* Center Exhibition Subject: Authentic Full Portrait */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-white/[0.12] shadow-2xl group bg-[#87553e]">
                  <Image
                    src="/images/taye-abolarin-portrait.jpg"
                    alt="Taye Abolarin — Product Designer"
                    fill
                    sizes="(max-width: 1024px) 100vw, 460px"
                    priority
                    className="object-cover object-center group-hover:scale-[1.015] transition-transform duration-700 ease-out"
                    onError={() => setPhotoFailed(true)}
                  />
                  {photoFailed && (
                    <div className="absolute inset-0 bg-[#090b0f] flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-24 h-24 rounded-full border border-white/20 p-4 mb-3">
                        <Image
                          src="/images/cold-designer-avatar.svg"
                          alt="Cold Designer Monogram"
                          width={64}
                          height={64}
                          className="object-contain"
                        />
                      </div>
                      <span className="font-display font-semibold text-sm text-[#f2f1ec]">Cold Designer</span>
                    </div>
                  )}
                </div>

                {/* Identity Plaque & Verification */}
                <div className="space-y-4 pt-1">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#a9ddf0]" />
                      <span className="font-mono-code text-[11px] text-[#a9ddf0] tracking-wider uppercase font-semibold">
                        Product Designer &bull; Cold Designer
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-[#f2f1ec] tracking-tight">
                      Taye Abolarin
                    </h3>
                    <p className="font-mono-code text-xs text-[#89919d] mt-0.5">
                      Independent Digital Product Practice
                    </p>
                  </div>

                  {/* Frame Specifications Ledger */}
                  <div className="border-t border-white/[0.08] pt-3.5 font-mono-code text-[11px] text-[#89919d] space-y-1.5">
                    <div className="flex justify-between">
                      <span>DISCIPLINE:</span>
                      <span className="text-[#f2f1ec]">Product / UI/UX Systems</span>
                    </div>
                    <div className="flex justify-between">
                      <span>LOCATION:</span>
                      <span className="text-[#f2f1ec]">Lagos, NG (Global Remote)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>FOCUS:</span>
                      <span className="text-[#f2f1ec]">Digital Ergonomics &amp; Web Systems</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Resume Download Action */}
              <a
                href="/Taye Abolarin-Product Designer-Resume.pdf"
                download="Taye Abolarin-Product Designer-Resume.pdf"
                onClick={() => sound.playClick()}
                className="w-full flex items-center justify-between rounded-2xl border border-white/[0.1] bg-[#11141b] p-5 font-mono-code text-xs text-[#f2f1ec] hover:border-[#a9ddf0] hover:bg-[#151922] active:scale-[0.985] transition-all cursor-pointer group shadow-xl"
                aria-label="Download Taye Abolarin Product Designer Resume PDF"
              >
                <div className="flex flex-col text-left">
                  <span className="text-[#a9ddf0] font-semibold uppercase text-[10px] tracking-wider mb-0.5">
                    Curriculum Vitae
                  </span>
                  <span className="font-display font-medium text-sm text-[#f2f1ec] group-hover:text-[#a9ddf0] transition-colors">
                    Download Resume (PDF)
                  </span>
                </div>
                <span className="w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center text-[#f2f1ec] group-hover:bg-[#a9ddf0] group-hover:text-[#090b0f] transition-all">
                  <svg
                    viewBox="0 0 24 24"
                    width="15"
                    height="15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 4v12m0 0l-5-5m5 5l5-5M4 20h16" />
                  </svg>
                </span>
              </a>
            </ScrollReveal>
          </div>

          {/* Right Column: Editorial Narrative & Essays (7 cols) */}
          <div className="lg:col-span-7 space-y-16">
            {/* Lead Editorial Creed Callout */}
            <ScrollReveal start="top 85%" y={20} duration={0.45}>
              <div className="rounded-3xl border border-white/[0.08] bg-[#11141b] p-8 sm:p-10 shadow-2xl space-y-4">
                <span className="font-mono-code text-xs text-[#a9ddf0] uppercase tracking-wider block font-semibold">
                  DESIGN ETHOS &bull; CLARITY AS A DISCIPLINE
                </span>
                <blockquote className="font-display text-2xl sm:text-3xl font-bold text-[#f2f1ec] leading-snug tracking-tight">
                  &ldquo;An interface should feel obvious, not because it is trivial to design, but because every layer of confusion has been stripped away.&rdquo;
                </blockquote>
                <p className="text-base text-[#89919d] font-light leading-relaxed">
                  Operating at the intersection of user research, conversational product architecture, and production frontend code. Based in Lagos, designing for real-world usability across mobile and web platforms.
                </p>
              </div>
            </ScrollReveal>

            {/* The Meaning of "Cold" */}
            <ScrollReveal start="top 85%" y={20} duration={0.45}>
              <section className="space-y-6">
                <div className="font-mono-code text-xs text-[#a9ddf0] uppercase tracking-wider flex items-center gap-2">
                  <span>01 // THE DOCTRINE</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f2f1ec]">
                  Why &ldquo;Cold&rdquo;?
                </h2>

                <div className="space-y-5 text-lg text-[#89919d] font-light leading-relaxed">
                  <p>
                    In a digital landscape filled with over-stimulating decoration, intrusive banners, and generic templates, <strong className="text-[#f2f1ec] font-normal">&ldquo;Cold&rdquo;</strong> represents an intentional commitment to clarity.
                  </p>
                  <p>
                    Cold is not emotional detachment. Cold is the temperature of clear thinking. It is the disciplined elimination of non-essential noise until an interface feels effortless, functional, and grounded in human reality.
                  </p>
                  <p>
                    Whether designing a conversational healthcare triage system connecting patients to licensed physicians over WhatsApp, or structuring the arrival sequence of an architectural concert hall, the goal remains identical: build products that respect the user&apos;s time, attention, and cognitive focus.
                  </p>
                </div>
              </section>
            </ScrollReveal>

            {/* Experience Timeline */}
            <ScrollReveal start="top 85%" y={24} duration={0.45}>
              <section className="border-t border-white/[0.08] pt-14 space-y-8">
                <div className="font-mono-code text-xs text-[#a9ddf0] uppercase tracking-wider flex items-center gap-2">
                  <span>02 // PROFESSIONAL EXPERIENCE</span>
                </div>

                <h2 className="font-display text-3xl font-bold text-[#f2f1ec]">
                  Verified Experience
                </h2>

                <div className="space-y-6">
                  {VERIFIED_ENGAGEMENTS.map((item) => (
                    <div
                      key={item.company}
                      className="rounded-2xl border border-white/[0.08] bg-[#11141b] p-8 hover:border-[#a9ddf0]/30 transition-colors shadow-lg"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/[0.08] pb-4 mb-4 font-mono-code text-xs">
                        <span className="text-[#a9ddf0] font-semibold">{item.period}</span>
                        <span className="text-[#89919d]">{item.location}</span>
                      </div>

                      <h3 className="font-display text-2xl font-bold text-[#f2f1ec] mb-1">
                        {item.role}
                      </h3>
                      <span className="font-mono-code text-xs text-[#89919d] block mb-4">
                        {item.company}
                      </span>

                      <p className="text-base text-[#89919d] font-light leading-relaxed mb-6">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2 font-mono-code text-xs">
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded bg-white/[0.03] border border-white/[0.06] px-2.5 py-1 text-[#89919d]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            {/* Toolkit */}
            <ScrollReveal start="top 85%" y={24} duration={0.45}>
              <section className="border-t border-white/[0.08] pt-14 space-y-8">
                <div className="font-mono-code text-xs text-[#a9ddf0] uppercase tracking-wider flex items-center gap-2">
                  <span>03 // CAPABILITIES</span>
                </div>

                <h2 className="font-display text-3xl font-bold text-[#f2f1ec]">
                  Disciplinary Toolkit
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {TOOLKIT.map((t) => (
                    <div
                      key={t.category}
                      className="rounded-2xl border border-white/[0.08] bg-[#11141b] p-6 shadow-md"
                    >
                      <h3 className="font-mono-code text-xs font-semibold text-[#a9ddf0] uppercase tracking-wider mb-4">
                        {t.category}
                      </h3>
                      <ul className="space-y-2.5 font-mono-code text-xs text-[#89919d]">
                        {t.items.map((it) => (
                          <li key={it} className="flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-[#a9ddf0]" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            {/* Creative Standards & Influences */}
            <ScrollReveal start="top 85%" y={20} duration={0.45}>
              <section className="border-t border-white/[0.08] pt-14 space-y-8">
                <div className="rounded-2xl border border-white/[0.08] bg-[#11141b] p-8 sm:p-10 font-mono-code text-xs shadow-md">
                  <div className="flex items-center gap-3 mb-6 border-b border-white/[0.08] pb-4">
                    <BookOpen size={16} className="text-[#a9ddf0]" />
                    <span className="uppercase text-[#f2f1ec] font-semibold tracking-wider">
                      Creative Influences &amp; Standards
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <span className="text-[#89919d] uppercase block mb-1">Architecture</span>
                      <p className="text-[#f2f1ec]/85 leading-relaxed font-sans text-sm">
                        Tadao Ando concrete geometry, Dieter Rams reductionism, quiet structural honesty.
                      </p>
                    </div>
                    <div>
                      <span className="text-[#89919d] uppercase block mb-1">Typography</span>
                      <p className="text-[#f2f1ec]/85 leading-relaxed font-sans text-sm">
                        Swiss International Style, Josef Müller-Brockmann grid discipline, neo-grotesque hierarchy.
                      </p>
                    </div>
                    <div>
                      <span className="text-[#89919d] uppercase block mb-1">Digital Craft</span>
                      <p className="text-[#f2f1ec]/85 leading-relaxed font-sans text-sm">
                        Zero layout shift, responsive performance, tactile micro-feedback, and production design-to-code fidelity.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </ScrollReveal>
          </div>
        </div>

        {/* Direct Dialogue Invitation Banner */}
        <ScrollReveal start="top 88%" y={20} duration={0.45}>
          <section className="rounded-3xl border border-white/[0.08] bg-[#11141b] p-8 sm:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 font-mono-code text-xs shadow-2xl">
            <div className="max-w-2xl">
              <span className="text-[#a9ddf0] uppercase font-semibold block mb-2 tracking-wider">
                Direct Dialogue &amp; Inquiries
              </span>
              <p className="text-base text-[#89919d] font-sans font-light leading-relaxed">
                Open for thoughtful product discussions, design systems architecture, and professional inquiries. Direct messages receive personal responses.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto shrink-0">
              <a
                href="mailto:abolarintaye20@gmail.com"
                onClick={() => sound.playClick()}
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#FDFDFD] text-[#090b0f] px-6 py-3.5 font-semibold hover:bg-[#a9ddf0] transition-colors whitespace-nowrap cursor-pointer shadow-lg"
              >
                <span>abolarintaye20@gmail.com</span>
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

              <Link
                href="/contact"
                onClick={() => sound.playClick()}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-5 py-3.5 text-[#f2f1ec] hover:border-[#a9ddf0] hover:text-[#a9ddf0] transition-colors whitespace-nowrap"
              >
                <span>Structured Brief</span>
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
              </Link>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </main>
  );
}

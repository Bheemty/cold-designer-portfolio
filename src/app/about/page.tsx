import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "About — Cold Designer | Taye Abolarin",
  description:
    "Design philosophy, verified practice, and product methodology of Taye Abolarin (Cold Designer).",
};

const VERIFIED_ENGAGEMENTS = [
  {
    period: "2024 — Present",
    role: "Lead Product Designer",
    company: "Medesy Technologies",
    location: "Nigeria / Remote (Employment)",
    description:
      "Directing product design for a WhatsApp-first telehealth platform connecting patients with licensed physicians. Designing frictionless conversational triage, patient onboarding, and web service architecture.",
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
      "End-to-End Product Discovery",
      "Conversational UX (WhatsApp Flows)",
      "Information Architecture & User Journeys",
      "Figma Design Systems & Token Governance",
      "Responsive Web & Mobile App Ergonomics",
    ],
  },
  {
    category: "Interaction & Motion Craft",
    items: [
      "Lenis Smooth Inertia",
      "Framer Motion Physics & Springs",
      "Web Audio API Sound Integration",
      "Sequential Scrollytelling",
      "Tactile Micro-Interactions",
    ],
  },
  {
    category: "Engineering Fluency",
    items: [
      "React Native & Expo SDK",
      "Next.js App Router",
      "TypeScript",
      "Tailwind CSS",
      "Git & Component Workflows",
    ],
  },
  {
    category: "Domains & Specializations",
    items: [
      "Telehealth & Triage Gateways",
      "Urban Mobility & Commuter UX",
      "Social Commerce & Instant Stores",
      "Spatial & Editorial Web Experiences",
      "Privacy-First Local Storage Apps",
    ],
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 sm:pt-40 pb-24 px-6 sm:px-10 bg-[#090b0f] text-[#f2f1ec]">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="border-b border-white/[0.08] pb-12 mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a9ddf0]" />
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#a9ddf0]">
              Monograph // Identity &amp; Practice
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#f2f1ec] mb-6">
            Taye Abolarin.
          </h1>

          <p className="text-xl sm:text-2xl text-[#89919d] font-light leading-relaxed max-w-3xl">
            Product Designer operating under the independent imprint <strong className="text-[#f2f1ec] font-medium">Cold Designer</strong>. Focused on conversational interfaces, digital product architecture, and high-craft web experiences.
          </p>
        </div>

        {/* The Meaning of "Cold" */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          <div className="md:col-span-4 font-mono-code text-xs text-[#89919d] uppercase tracking-wider">
            <span>01 // THE DOCTRINE</span>
          </div>
          <div className="md:col-span-8 space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#f2f1ec]">
              Why &ldquo;Cold&rdquo;?
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#89919d] font-light leading-relaxed">
              <p>
                In a digital landscape filled with over-stimulating decoration, intrusive banners, and generic templates, &ldquo;Cold&rdquo; represents an intentional commitment to clarity.
              </p>
              <p>
                Cold is not emotional detachment. Cold is the temperature of clear thinking. It is the disciplined elimination of clutter until an interface feels effortless, functional, and grounded in human need.
              </p>
              <p>
                Whether designing a conversational health triage system for WhatsApp or a cinematic spatial web showcase, the goal remains identical: building products that respect the user&apos;s time and focus.
              </p>
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24 border-t border-white/[0.08] pt-16">
          <div className="md:col-span-4 font-mono-code text-xs text-[#89919d] uppercase tracking-wider">
            <span>02 // EXPERIENCE</span>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#f2f1ec] mb-10">
              Verified Engagements
            </h2>

            <div className="space-y-8">
              {VERIFIED_ENGAGEMENTS.map((item) => (
                <div
                  key={item.company}
                  className="rounded-2xl border border-white/[0.08] bg-[#11141b] p-8 hover:border-[#a9ddf0]/30 transition-colors"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/[0.08] pb-4 mb-4 font-mono-code text-xs">
                    <span className="text-[#a9ddf0] font-semibold">{item.period}</span>
                    <span className="text-[#89919d]">{item.location}</span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#f2f1ec] mb-1">
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
                      <span key={t} className="rounded bg-white/[0.03] border border-white/[0.06] px-2.5 py-1 text-[#89919d]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Toolkit */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24 border-t border-white/[0.08] pt-16">
          <div className="md:col-span-4 font-mono-code text-xs text-[#89919d] uppercase tracking-wider">
            <span>03 // CAPABILITIES</span>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#f2f1ec] mb-10">
              Disciplinary Toolkit
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {TOOLKIT.map((t) => (
                <div key={t.category} className="rounded-xl border border-white/[0.08] bg-[#11141b] p-6">
                  <h3 className="font-mono-code text-xs font-semibold text-[#a9ddf0] uppercase tracking-wider mb-4">
                    {t.category}
                  </h3>
                  <ul className="space-y-2 font-mono-code text-xs text-[#89919d]">
                    {t.items.map((it) => (
                      <li key={it} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-[#a9ddf0]/60" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Creative Influences */}
        <section className="rounded-2xl border border-white/[0.08] bg-[#11141b] p-8 sm:p-12 font-mono-code text-xs">
          <div className="flex items-center gap-3 mb-6 border-b border-white/[0.08] pb-4">
            <BookOpen size={15} className="text-[#a9ddf0]" />
            <span className="uppercase text-[#f2f1ec] font-semibold tracking-wider">
              Creative Influences &amp; Standards
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <span className="text-[#89919d] uppercase block mb-1">Architecture</span>
              <p className="text-[#f2f1ec]/80 leading-relaxed">
                Tadao Ando concrete geometry, Dieter Rams reductionism, quiet structural honesty.
              </p>
            </div>
            <div>
              <span className="text-[#89919d] uppercase block mb-1">Typography</span>
              <p className="text-[#f2f1ec]/80 leading-relaxed">
                Swiss International Style, Josef Müller-Brockmann grid discipline, neo-grotesque hierarchy.
              </p>
            </div>
            <div>
              <span className="text-[#89919d] uppercase block mb-1">Digital Craft</span>
              <p className="text-[#f2f1ec]/80 leading-relaxed">
                Zero layout shift, responsive performance, tactile micro-feedback, and production design-to-code fidelity.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-white/[0.08] bg-[#11141b] p-8 font-mono-code text-xs">
          <div>
            <span className="text-[#a9ddf0] uppercase font-semibold block mb-1">Dialogue &amp; Collaboration</span>
            <p className="text-[#89919d]">Available for select product design commissions, design systems architecture, and consulting.</p>
          </div>
          <Link
            href="/contact"
            className="flex items-center gap-2 rounded-full bg-[#f2f1ec] px-6 py-3 font-semibold text-[#090b0f] hover:bg-[#a9ddf0] transition-colors whitespace-nowrap"
          >
            <span>Get in Touch</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
}

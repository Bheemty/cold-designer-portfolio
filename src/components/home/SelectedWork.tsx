"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, ExternalLink, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { sound } from "@/lib/sounds";
import { PROJECTS } from "@/data/projects";

export default function SelectedWork() {
  // Daylight phase state for Somewhere Hotel
  const [somewherePhase, setSomewherePhase] = useState<"suite" | "exterior" | "penthouse">("suite");

  // Chapter state for Stillwater Hall
  const [stillwaterChapter, setStillwaterChapter] = useState<"exterior" | "stage" | "seating">("exterior");

  const somewhereImages = {
    suite: {
      src: "/images/projects/somewhere/suite-sunset.png",
      label: "Horizon Suite // Golden Hour Sunset",
      desc: "Full-bleed ocean terrace perspective showcasing natural daylight illumination.",
    },
    exterior: {
      src: "/images/projects/somewhere/hero-exterior.png",
      label: "Architectural Facade // Minimalist Arrival",
      desc: "Brutalist coastal entry pavilion with quiet ambient audio and typographic pacing.",
    },
    penthouse: {
      src: "/images/projects/somewhere/penthouse-sunset.png",
      label: "Penthouse Observation Lounge // Twilight",
      desc: "Panoramic 180° maritime horizon view paired with spatial reservation drawer.",
    },
  };

  const stillwaterImages = {
    exterior: {
      src: "/images/projects/stillwater/venue-exterior.png",
      label: "Chapter 01 // The Blue-Hour Arrival",
      desc: "Keyframed exterior approach establishing physical acoustic presence.",
    },
    stage: {
      src: "/images/projects/stillwater/full-stage.png",
      label: "Chapter 02 // Full Acoustic Stage",
      desc: "Orchestral stage vantage viewed from center orchestra stalls.",
    },
    seating: {
      src: "/images/projects/stillwater/auditorium-seating.png",
      label: "Chapter 03 // Interactive Tier Sightlines",
      desc: "Real-time seat selection map with spatial line-of-sight acoustics.",
    },
  };

  return (
    <section
      id="selected-work"
      className="relative py-28 sm:py-40 px-6 sm:px-12 border-b border-white/[0.08] bg-[#090b0f] text-[#f2f1ec]"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-24 sm:mb-32 pb-8 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a9ddf0]" />
              <span className="font-mono-code text-xs uppercase tracking-widest text-[#a9ddf0]">
                Curated Exhibition [01—05]
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#f2f1ec]">
              Selected{" "}
              <span className="font-editorial-italic font-normal text-[#a9ddf0]">Works</span>.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-base text-[#89919d] font-light leading-relaxed">
              An art-directed showcase of production telehealth architecture, urban commuter mobility, and immersive spatial web experiences.
            </p>
          </div>
        </div>

        {/* =========================================================================
            PROJECT 01: MEDESY SOLUTION (Telehealth & Conversational UX)
            Composition: Asymmetric Vertical Device Showcase + Triage Pathway
           ========================================================================= */}
        <div className="mb-32 sm:mb-44">
          <div className="rounded-3xl border border-white/[0.08] bg-[#11141b] p-6 sm:p-12 lg:p-16 relative overflow-hidden group hover:border-[#a9ddf0]/30 transition-all duration-500 shadow-2xl">
            {/* Ambient Background Gradient */}
            <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-[#a9ddf0]/[0.02] blur-[140px]" />

            {/* Header Metadata */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6 mb-12 font-mono-code text-xs">
              <div className="flex items-center gap-3">
                <span className="rounded bg-[#a9ddf0]/10 text-[#a9ddf0] border border-[#a9ddf0]/25 px-3 py-1 font-semibold">
                  EXHIBIT 01 // TELEHEALTH PLATFORM
                </span>
                <span className="text-[#89919d]">Current Employment</span>
              </div>
              <div className="flex items-center gap-6 text-[#89919d]">
                <span>2024 — Present</span>
                <span className="text-white/20">•</span>
                <span className="text-[#f2f1ec]">Lead Product Designer</span>
              </div>
            </div>

            {/* Asymmetric Showcase Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Narrative & Product Thinking */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="font-mono-code text-xs text-[#a9ddf0] uppercase tracking-wider block mb-2">
                    Medesy Technologies
                  </span>
                  <h3 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#f2f1ec] leading-[1.06]">
                    MEDesy Solution.
                  </h3>
                </div>

                <p className="text-lg sm:text-xl text-[#89919d] font-light leading-relaxed">
                  WhatsApp-first telehealth platform connecting patients directly to licensed physicians without app installation barriers.
                </p>

                <p className="text-sm text-[#89919d]/90 font-light leading-relaxed">
                  Rather than forcing patients into an unfamiliar app during medical distress, MEDesy conducts structured conversational triage directly in WhatsApp — delivering verifiable digital prescriptions, lab referrals, and doctor consultations.
                </p>

                {/* Key Architectural Decisions */}
                <div className="space-y-3 pt-2 font-mono-code text-xs">
                  <div className="flex items-start gap-2.5 text-[#f2f1ec]">
                    <CheckCircle2 size={14} className="text-[#a9ddf0] shrink-0 mt-0.5" />
                    <span>Frictionless conversational symptom triage (3-step quick handoff)</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[#f2f1ec]">
                    <CheckCircle2 size={14} className="text-[#a9ddf0] shrink-0 mt-0.5" />
                    <span>Zero account barrier; immediate WhatsApp chat initiation</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[#f2f1ec]">
                    <CheckCircle2 size={14} className="text-[#a9ddf0] shrink-0 mt-0.5" />
                    <span>Verified doctor referral cards &amp; digital pharmacy receipts</span>
                  </div>
                </div>

                {/* Action Links */}
                <div className="pt-6 flex flex-wrap items-center gap-4">
                  <Link
                    href="/work/medesy"
                    onClick={() => sound.playClick()}
                    onMouseEnter={() => sound.playHover()}
                    data-cursor-text="CASE STUDY"
                    className="inline-flex items-center gap-2 rounded-full bg-[#f2f1ec] hover:bg-[#a9ddf0] px-6 py-3 font-mono-code text-xs font-semibold text-[#090b0f] transition-all"
                  >
                    <span>Inspect Case Study</span>
                    <ArrowRight size={13} />
                  </Link>

                  <a
                    href="https://www.figma.com/design/Vl1qsoE22hQjt8oEXZubja/Medesy-2?m=auto&t=jglC0OFhMaDeX2tP-6"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    onMouseEnter={() => sound.playHover()}
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] hover:border-[#a9ddf0] hover:text-[#a9ddf0] px-5 py-3 font-mono-code text-xs font-semibold text-[#f2f1ec] transition-all"
                  >
                    <span>View in Figma</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>

              {/* Right Column: High-Fidelity Mobile Mockup Container */}
              <div className="lg:col-span-7 flex justify-center">
                <div className="relative w-full max-w-md rounded-3xl bg-[#090b0f] border border-white/[0.1] p-4 sm:p-6 shadow-2xl group-hover:border-[#a9ddf0]/40 transition-all duration-500">
                  <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-[#161a23] border border-white/5 shadow-inner">
                    <Image
                      src="/images/projects/medesy/whatsapp-mockup.png"
                      alt="MEDesy WhatsApp Conversational Triage Interface"
                      fill
                      sizes="(max-width: 1024px) 90vw, 420px"
                      className="object-contain sm:object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    />
                  </div>

                  {/* Tactile Device Badge */}
                  <div className="mt-4 flex items-center justify-between font-mono-code text-[11px] text-[#89919d]">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#a9ddf0]" />
                      Verified WhatsApp Triage Interface
                    </span>
                    <span>Specimen 01</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PROJECT 02: 9JATRIP (Urban Mobility & Commuter Transit)
            Composition: Dual-Card Overlap (Booking Flow + Ride Receipt)
           ========================================================================= */}
        <div className="mb-32 sm:mb-44">
          <div className="rounded-3xl border border-white/[0.08] bg-[#11141b] p-6 sm:p-12 lg:p-16 relative overflow-hidden group hover:border-[#a9ddf0]/30 transition-all duration-500 shadow-2xl">
            {/* Header Metadata */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6 mb-12 font-mono-code text-xs">
              <div className="flex items-center gap-3">
                <span className="rounded bg-[#a9ddf0]/10 text-[#a9ddf0] border border-[#a9ddf0]/25 px-3 py-1 font-semibold">
                  EXHIBIT 02 // MOBILITY &amp; TRANSIT
                </span>
                <span className="text-[#89919d]">Client / Freelance</span>
              </div>
              <div className="flex items-center gap-6 text-[#89919d]">
                <span>2024</span>
                <span className="text-white/20">•</span>
                <span className="text-[#f2f1ec]">Product Designer</span>
              </div>
            </div>

            {/* Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Dual Visual Presentation: Left Column (Span 7) */}
              <div className="lg:col-span-7 relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                  {/* Primary: Multi-modal Booking Screen */}
                  <div className="rounded-2xl bg-[#090b0f] border border-white/[0.1] p-3 shadow-2xl group-hover:border-[#a9ddf0]/30 transition-all duration-500">
                    <div className="relative aspect-[9/16] w-full rounded-xl overflow-hidden bg-[#161a23]">
                      <Image
                        src="/images/projects/9jatrip/booking-screen.png"
                        alt="9jaTrip Multi-Modal Booking Screen"
                        fill
                        sizes="(max-width: 768px) 90vw, 320px"
                        className="object-contain sm:object-cover group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    </div>
                    <div className="mt-3 text-center font-mono-code text-[10px] text-[#89919d]">
                      Multi-Modal Vehicle Selection
                    </div>
                  </div>

                  {/* Secondary Overlapping: Ride Receipt & Fare Transparency */}
                  <div className="rounded-2xl bg-[#090b0f] border border-white/[0.1] p-3 shadow-2xl group-hover:border-[#a9ddf0]/30 transition-all duration-500 sm:-translate-y-4">
                    <div className="relative aspect-[9/16] w-full rounded-xl overflow-hidden bg-[#161a23]">
                      <Image
                        src="/images/projects/9jatrip/ride-receipt.png"
                        alt="9jaTrip Verified Ride Receipt"
                        fill
                        sizes="(max-width: 768px) 90vw, 320px"
                        className="object-contain sm:object-cover group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    </div>
                    <div className="mt-3 text-center font-mono-code text-[10px] text-[#89919d]">
                      Verified Trip Receipt &amp; QR
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative (Span 5) */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="font-mono-code text-xs text-[#a9ddf0] uppercase tracking-wider block mb-2">
                    9jaTrip Mobility
                  </span>
                  <h3 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#f2f1ec] leading-[1.06]">
                    9jaTrip.
                  </h3>
                </div>

                <p className="text-lg sm:text-xl text-[#89919d] font-light leading-relaxed">
                  Pragmatic urban transit and ride-hailing app tailored to Nigerian commuter realities.
                </p>

                <p className="text-sm text-[#89919d]/90 font-light leading-relaxed">
                  Commuters in metropolitan Nigeria navigate diverse, fragmented transport choices. 9jaTrip unifies cabs, green cabs, keke napep (tricycles), and okada into a single high-legibility interface with upfront fare transparency and charter vs. individual seat tiers.
                </p>

                <div className="space-y-3 pt-2 font-mono-code text-xs">
                  <div className="flex items-start gap-2.5 text-[#f2f1ec]">
                    <CheckCircle2 size={14} className="text-[#a9ddf0] shrink-0 mt-0.5" />
                    <span>Charter entire vehicle vs. individual seat reservation modes</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[#f2f1ec]">
                    <CheckCircle2 size={14} className="text-[#a9ddf0] shrink-0 mt-0.5" />
                    <span>High-contrast typography readable under direct harsh sunlight</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[#f2f1ec]">
                    <CheckCircle2 size={14} className="text-[#a9ddf0] shrink-0 mt-0.5" />
                    <span>Itemized digital receipts with verified driver credentials</span>
                  </div>
                </div>

                <div className="pt-6 flex flex-wrap items-center gap-4">
                  <Link
                    href="/work/9jatrip"
                    onClick={() => sound.playClick()}
                    onMouseEnter={() => sound.playHover()}
                    data-cursor-text="CASE STUDY"
                    className="inline-flex items-center gap-2 rounded-full bg-[#f2f1ec] hover:bg-[#a9ddf0] px-6 py-3 font-mono-code text-xs font-semibold text-[#090b0f] transition-all"
                  >
                    <span>Inspect Case Study</span>
                    <ArrowRight size={13} />
                  </Link>

                  <a
                    href="https://www.figma.com/design/QPyY4HiyEc40yQk5609OMG/9jaTrip?node-id=0-1&p=f&t=Mm09Z82YdZ3Is25i-0"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    onMouseEnter={() => sound.playHover()}
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] hover:border-[#a9ddf0] hover:text-[#a9ddf0] px-5 py-3 font-mono-code text-xs font-semibold text-[#f2f1ec] transition-all"
                  >
                    <span>Inspect in Figma</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PROJECT 03: SOMEWHERE HOTEL (Hospitality & Spatial Web)
            Composition: Full-Bleed Panorama + Interactive Daylight Phase Shifter
           ========================================================================= */}
        <div className="mb-32 sm:mb-44">
          <div className="rounded-3xl border border-white/[0.08] bg-[#11141b] p-6 sm:p-12 lg:p-16 relative overflow-hidden group hover:border-[#a9ddf0]/30 transition-all duration-500 shadow-2xl">
            {/* Header Metadata */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6 mb-10 font-mono-code text-xs">
              <div className="flex items-center gap-3">
                <span className="rounded bg-[#a9ddf0]/10 text-[#a9ddf0] border border-[#a9ddf0]/25 px-3 py-1 font-semibold">
                  EXHIBIT 03 // SPATIAL &amp; HOSPITALITY
                </span>
                <span className="text-[#89919d]">Personal Digital Concept</span>
              </div>
              <div className="flex items-center gap-6 text-[#89919d]">
                <span>2024</span>
                <span className="text-white/20">•</span>
                <span className="text-[#f2f1ec]">Art Director &amp; Experience Designer</span>
              </div>
            </div>

            {/* Narrative Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div className="max-w-2xl">
                <span className="font-mono-code text-xs text-[#a9ddf0] uppercase tracking-wider block mb-2">
                  Editorial Sanctuary
                </span>
                <h3 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#f2f1ec] leading-[1.06] mb-3">
                  Somewhere Hotel.
                </h3>
                <p className="text-lg sm:text-xl text-[#89919d] font-light leading-relaxed">
                  Cinematic coastal hospitality website and reservation demonstration exploring daylight transitions.
                </p>
              </div>

              {/* Interactive Daylight Phase Controls */}
              <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-[#090b0f] p-1.5 border border-white/[0.08] font-mono-code text-xs">
                <span className="text-[#89919d] text-[11px] px-3 uppercase tracking-wider hidden sm:inline">
                  Atmosphere:
                </span>
                {(["suite", "exterior", "penthouse"] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      sound.playClick();
                      setSomewherePhase(key);
                    }}
                    className={`rounded-xl px-4 py-2 transition-all font-semibold ${
                      somewherePhase === key
                        ? "bg-[#a9ddf0] text-[#090b0f] shadow-md shadow-[#a9ddf0]/20"
                        : "text-[#89919d] hover:text-[#f2f1ec] hover:bg-white/[0.03]"
                    }`}
                  >
                    {key === "suite" && "Sunset Suite"}
                    {key === "exterior" && "Arrival Facade"}
                    {key === "penthouse" && "Twilight Penthouse"}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Panoramic Showcase Canvas */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#090b0f] border border-white/[0.1] shadow-2xl mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={somewherePhase}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={somewhereImages[somewherePhase].src}
                    alt={somewhereImages[somewherePhase].label}
                    fill
                    priority
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-cover"
                  />
                  {/* Subtle Gradient Vignette */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090b0f]/80 via-transparent to-black/20" />

                  {/* Contextual Overlay Note */}
                  <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono-code text-xs">
                    <span className="text-[#f2f1ec] font-semibold bg-[#090b0f]/80 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                      {somewhereImages[somewherePhase].label}
                    </span>
                    <span className="text-[#89919d] text-[11px] bg-[#090b0f]/80 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md hidden sm:inline">
                      {somewhereImages[somewherePhase].desc}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-white/[0.08]">
              <p className="font-mono-code text-xs text-[#89919d] max-w-xl">
                Treats hospitality as an editorial monograph rather than a transactional booking engine, featuring responsive daylight ambiance shifts and demonstration reservation drawers.
              </p>

              <div className="flex items-center gap-4 shrink-0">
                <Link
                  href="/work/somewhere-hotel"
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                  className="inline-flex items-center gap-2 rounded-full bg-[#f2f1ec] hover:bg-[#a9ddf0] px-6 py-3 font-mono-code text-xs font-semibold text-[#090b0f] transition-all"
                >
                  <span>Case Study</span>
                  <ArrowRight size={13} />
                </Link>

                <a
                  href="https://somewhere-hotel.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] hover:border-[#a9ddf0] hover:text-[#a9ddf0] px-5 py-3 font-mono-code text-xs font-semibold text-[#f2f1ec] transition-all"
                >
                  <span>Visit Live Experience</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PROJECT 04: BUYBUDDY (Social Micro-Commerce & WhatsApp Handoff)
            Composition: Split-Screen Product Ecosystem (Merchant Studio + Shopper Store)
           ========================================================================= */}
        <div className="mb-32 sm:mb-44">
          <div className="rounded-3xl border border-white/[0.08] bg-[#11141b] p-6 sm:p-12 lg:p-16 relative overflow-hidden group hover:border-[#a9ddf0]/30 transition-all duration-500 shadow-2xl">
            {/* Header Metadata */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6 mb-12 font-mono-code text-xs">
              <div className="flex items-center gap-3">
                <span className="rounded bg-[#a9ddf0]/10 text-[#a9ddf0] border border-[#a9ddf0]/25 px-3 py-1 font-semibold">
                  EXHIBIT 04 // COMMERCE &amp; WHATSAPP HANDOFF
                </span>
                <span className="text-[#89919d]">Personal Product MVP</span>
              </div>
              <div className="flex items-center gap-6 text-[#89919d]">
                <span>2024</span>
                <span className="text-white/20">•</span>
                <span className="text-[#f2f1ec]">Product Designer &amp; Dev</span>
              </div>
            </div>

            {/* Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Narrative (Span 5) */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="font-mono-code text-xs text-[#a9ddf0] uppercase tracking-wider block mb-2">
                    Social Commerce MVP
                  </span>
                  <h3 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#f2f1ec] leading-[1.06]">
                    BuyBuddy.
                  </h3>
                </div>

                <p className="text-lg sm:text-xl text-[#89919d] font-light leading-relaxed">
                  Instant social commerce storefronts converting Instagram and TikTok traffic into structured WhatsApp orders.
                </p>

                <p className="text-sm text-[#89919d]/90 font-light leading-relaxed">
                  Social vendors lose critical sales when buyers abandon complex checkout accounts. BuyBuddy gives independent sellers an instant shareable store URL where customers pick variants and tap one button to dispatch a pre-formatted order summary directly to WhatsApp.
                </p>

                <div className="space-y-3 pt-2 font-mono-code text-xs">
                  <div className="flex items-start gap-2.5 text-[#f2f1ec]">
                    <CheckCircle2 size={14} className="text-[#a9ddf0] shrink-0 mt-0.5" />
                    <span>Zero customer registration; eliminates drop-off friction</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[#f2f1ec]">
                    <CheckCircle2 size={14} className="text-[#a9ddf0] shrink-0 mt-0.5" />
                    <span>One-tap WhatsApp handoff with pre-structured cart text</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[#f2f1ec]">
                    <CheckCircle2 size={14} className="text-[#a9ddf0] shrink-0 mt-0.5" />
                    <span>Mobile-first merchant dashboard for real-time inventory management</span>
                  </div>
                </div>

                <div className="pt-6 flex flex-wrap items-center gap-4">
                  <Link
                    href="/work/buybuddy"
                    onClick={() => sound.playClick()}
                    onMouseEnter={() => sound.playHover()}
                    data-cursor-text="CASE STUDY"
                    className="inline-flex items-center gap-2 rounded-full bg-[#f2f1ec] hover:bg-[#a9ddf0] px-6 py-3 font-mono-code text-xs font-semibold text-[#090b0f] transition-all"
                  >
                    <span>Inspect Case Study</span>
                    <ArrowRight size={13} />
                  </Link>

                  <a
                    href="https://buybuddy-bheemty.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    onMouseEnter={() => sound.playHover()}
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] hover:border-[#a9ddf0] hover:text-[#a9ddf0] px-5 py-3 font-mono-code text-xs font-semibold text-[#f2f1ec] transition-all"
                  >
                    <span>Test Live Demo</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              {/* Right Column: Split Dual Mockups (Span 7) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Upper: Vendor Dashboard Preview */}
                <div className="rounded-2xl bg-[#090b0f] border border-white/[0.1] p-3 sm:p-4 shadow-2xl group-hover:border-[#a9ddf0]/30 transition-all duration-500">
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#161a23]">
                    <Image
                      src="/images/projects/buybuddy/vendor-dashboard.png"
                      alt="BuyBuddy Vendor Management Dashboard"
                      fill
                      sizes="(max-width: 1024px) 100vw, 550px"
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between font-mono-code text-[11px] text-[#89919d]">
                    <span>Vendor Store Studio &amp; Inventory Management</span>
                    <span>Specimen A</span>
                  </div>
                </div>

                {/* Lower: Shopper Storefront Preview */}
                <div className="rounded-2xl bg-[#090b0f] border border-white/[0.1] p-3 sm:p-4 shadow-2xl group-hover:border-[#a9ddf0]/30 transition-all duration-500">
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#161a23]">
                    <Image
                      src="/images/projects/buybuddy/store-landing.png"
                      alt="BuyBuddy Customer Storefront Landing"
                      fill
                      sizes="(max-width: 1024px) 100vw, 550px"
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between font-mono-code text-[11px] text-[#89919d]">
                    <span>Customer Storefront &amp; Instant WhatsApp Checkout Handoff</span>
                    <span>Specimen B</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PROJECT 05: STILLWATER HALL (Cinematic Performing Arts & Ticketing)
            Composition: Full-Stage Panorama + Interactive Spatial Chapters
           ========================================================================= */}
        <div className="mb-24">
          <div className="rounded-3xl border border-white/[0.08] bg-[#11141b] p-6 sm:p-12 lg:p-16 relative overflow-hidden group hover:border-[#a9ddf0]/30 transition-all duration-500 shadow-2xl">
            {/* Header Metadata */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6 mb-10 font-mono-code text-xs">
              <div className="flex items-center gap-3">
                <span className="rounded bg-[#a9ddf0]/10 text-[#a9ddf0] border border-[#a9ddf0]/25 px-3 py-1 font-semibold">
                  EXHIBIT 05 // CINEMATIC DIGITAL EXPERIENCE
                </span>
                <span className="text-[#89919d]">Personal Web Experience</span>
              </div>
              <div className="flex items-center gap-6 text-[#89919d]">
                <span>2024</span>
                <span className="text-white/20">•</span>
                <span className="text-[#f2f1ec]">Experience Designer &amp; Creative Technologist</span>
              </div>
            </div>

            {/* Narrative Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div className="max-w-2xl">
                <span className="font-mono-code text-xs text-[#a9ddf0] uppercase tracking-wider block mb-2">
                  Acoustic Scrollytelling
                </span>
                <h3 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#f2f1ec] leading-[1.06] mb-3">
                  Stillwater Hall.
                </h3>
                <p className="text-lg sm:text-xl text-[#89919d] font-light leading-relaxed">
                  Cinematic spatial venue walkthrough and interactive digital ticketing experience.
                </p>
              </div>

              {/* Spatial Chapter Switcher */}
              <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-[#090b0f] p-1.5 border border-white/[0.08] font-mono-code text-xs">
                <span className="text-[#89919d] text-[11px] px-3 uppercase tracking-wider hidden sm:inline">
                  Chapter:
                </span>
                {(["exterior", "stage", "seating"] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      sound.playClick();
                      setStillwaterChapter(key);
                    }}
                    className={`rounded-xl px-4 py-2 transition-all font-semibold ${
                      stillwaterChapter === key
                        ? "bg-[#a9ddf0] text-[#090b0f] shadow-md shadow-[#a9ddf0]/20"
                        : "text-[#89919d] hover:text-[#f2f1ec] hover:bg-white/[0.03]"
                    }`}
                  >
                    {key === "exterior" && "01 // Arrival"}
                    {key === "stage" && "02 // Acoustic Stage"}
                    {key === "seating" && "03 // Seating Map"}
                  </button>
                ))}
              </div>
            </div>

            {/* Chapter Display Canvas */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#090b0f] border border-white/[0.1] shadow-2xl mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stillwaterChapter}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={stillwaterImages[stillwaterChapter].src}
                    alt={stillwaterImages[stillwaterChapter].label}
                    fill
                    priority
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090b0f]/80 via-transparent to-black/20" />

                  <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono-code text-xs">
                    <span className="text-[#f2f1ec] font-semibold bg-[#090b0f]/80 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                      {stillwaterImages[stillwaterChapter].label}
                    </span>
                    <span className="text-[#89919d] text-[11px] bg-[#090b0f]/80 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md hidden sm:inline">
                      {stillwaterImages[stillwaterChapter].desc}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-white/[0.08]">
              <p className="font-mono-code text-xs text-[#89919d] max-w-xl">
                Guides concertgoers through keyframed camera chapters from exterior evening blue-hour through grand foyer and stage sightlines to an interactive demo pass generator.
              </p>

              <div className="flex items-center gap-4 shrink-0">
                <Link
                  href="/work/stillwater"
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                  className="inline-flex items-center gap-2 rounded-full bg-[#f2f1ec] hover:bg-[#a9ddf0] px-6 py-3 font-mono-code text-xs font-semibold text-[#090b0f] transition-all"
                >
                  <span>Case Study</span>
                  <ArrowRight size={13} />
                </Link>

                <a
                  href="https://stillwater-concert-experience.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] hover:border-[#a9ddf0] hover:text-[#a9ddf0] px-5 py-3 font-mono-code text-xs font-semibold text-[#f2f1ec] transition-all"
                >
                  <span>Visit Live Experience</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

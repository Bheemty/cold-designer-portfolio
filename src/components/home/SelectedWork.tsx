"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Clock,
  Compass,
  MapPin,
  Calendar,
  Layers,
  ChevronRight,
  MessageSquare,
  ShieldCheck,
  Building,
} from "lucide-react";
import { sound } from "@/lib/sounds";

// ============================================================================
// STILLWATER VIDEO CHAPTERS
// ============================================================================
const STILLWATER_CHAPTERS = [
  {
    id: "01",
    title: "The Evening Approach",
    duration: "0:07",
    src: "/videos/stillwater/01_approach.mp4",
    still: "/images/projects/stillwater/01_Exterior.png",
    description: "Camera glides across the courtyard under twilight blue-hour illumination toward the illuminated glass facade.",
    stage: "Stage 01 // Arrival",
  },
  {
    id: "02",
    title: "Foyer & Grand Doors",
    duration: "0:05",
    src: "/videos/stillwater/02_doors_lobby.mp4",
    still: "/images/projects/stillwater/03_Lobby.png",
    description: "Automatic doors part; the camera enters the terrazzo foyer promenade toward the auditorium threshold.",
    stage: "Stage 02 // Threshold",
  },
  {
    id: "03",
    title: "Stage Reveal & Praise",
    duration: "0:05",
    src: "/videos/stillwater/03_stage_reveal.mp4",
    still: "/images/projects/stillwater/05_Full_Stage.png",
    description: "Moving down the center aisle reveals the warm acoustic auditorium stage and orchestral choir risers.",
    stage: "Stage 03 // Stage",
  },
  {
    id: "04",
    title: "Turn to Audience Seating",
    duration: "0:05",
    src: "/videos/stillwater/04_turn_seating.mp4",
    still: "/images/projects/stillwater/06_Front_Seating.png",
    description: "Level camera turn near the front aisle surveying tier seating rows, sightlines, and acoustic baffles.",
    stage: "Stage 04 // Seating",
  },
  {
    id: "05",
    title: "Rear Elevation & Settle",
    duration: "0:05",
    src: "/videos/stillwater/05_rear_seating.mp4",
    still: "/images/projects/stillwater/08_Rear_Seating.png",
    description: "Advancing toward the rear tier seating, framing the entire hall vantage before ticket confirmation.",
    stage: "Stage 05 // Overview",
  },
];

// ============================================================================
// 9JATRIP INTERCITY ROUTES
// ============================================================================
const INTERCITY_ROUTES = [
  {
    id: "lagos-ibadan",
    from: "Lagos (Ojota Hub)",
    to: "Ibadan (Iwo Road Interchange)",
    distance: "128 KM",
    estTime: "1h 45m",
    fare: "₦4,500",
    departure: "08:30 AM",
    bay: "Terminal Gate 03",
    seatsLeft: 5,
    vehicle: "Executive 14-Seater Coach",
  },
  {
    id: "abuja-kaduna",
    from: "Abuja (Utako Gateway)",
    to: "Kaduna (Kawo Central Hub)",
    distance: "186 KM",
    estTime: "2h 15m",
    fare: "₦7,200",
    departure: "10:15 AM",
    bay: "Terminal Gate 01",
    seatsLeft: 8,
    vehicle: "Express Intercity Shuttle",
  },
  {
    id: "benin-ph",
    from: "Benin City (Uselu Station)",
    to: "Port Harcourt (Waterlines Hub)",
    distance: "264 KM",
    estTime: "3h 40m",
    fare: "₦9,500",
    departure: "01:00 PM",
    bay: "Terminal Gate 06",
    seatsLeft: 3,
    vehicle: "Premium Intercity Coach",
  },
];

export default function SelectedWork() {
  // --------------------------------------------------------------------------
  // EXHIBIT 01: MEDesy State (Interactive Triage Simulation)
  // --------------------------------------------------------------------------
  const [triageStep, setTriageStep] = useState<0 | 1 | 2>(0);

  // --------------------------------------------------------------------------
  // EXHIBIT 02: 9jaTrip State (Intercity Terminal Route Selector)
  // --------------------------------------------------------------------------
  const [selectedRoute, setSelectedRoute] = useState(INTERCITY_ROUTES[0]);
  const [tripViewMode, setTripViewMode] = useState<"screen" | "receipt">("screen");

  // --------------------------------------------------------------------------
  // EXHIBIT 03: Somewhere Hotel State (Daylight Atmosphere Phases)
  // --------------------------------------------------------------------------
  const [daylightPhase, setDaylightPhase] = useState<"sunset" | "day" | "night" | "exterior">("sunset");

  // --------------------------------------------------------------------------
  // EXHIBIT 04: BuyBuddy State (Dual Marketplace Switcher)
  // --------------------------------------------------------------------------
  const [buybuddyWorkspace, setBuybuddyWorkspace] = useState<"products" | "orders" | "wallet" | "storefront">("products");

  // --------------------------------------------------------------------------
  // EXHIBIT 05: Stillwater Hall State (Video Walkthrough Player)
  // --------------------------------------------------------------------------
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeChapter = STILLWATER_CHAPTERS[activeChapterIndex];

  // Handle Video Chapter Switch
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = activeChapter.src;
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [activeChapterIndex, activeChapter.src]);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const prog = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(prog);
    }
  };

  const handleVideoEnded = () => {
    // Loop to next chapter sequentially or restart
    const nextIdx = (activeChapterIndex + 1) % STILLWATER_CHAPTERS.length;
    setActiveChapterIndex(nextIdx);
  };

  const togglePlay = () => {
    sound.playClick();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    sound.playClick();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const selectChapter = (idx: number) => {
    sound.playClick();
    setActiveChapterIndex(idx);
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
              An art-directed monograph of production telehealth triage, intercity mobility platforms, and immersive spatial web experiences.
            </p>
          </div>
        </div>

        {/* =========================================================================
            EXHIBIT 01: MEDESY SOLUTION
            Theme: Healthcare & Conversational UI
            Architecture: Asymmetric vertical phone frame + Interactive Triage Stepper
           ========================================================================= */}
        <div id="exhibit-medesy" className="mb-32 sm:mb-44 scroll-mt-28">
          <div className="rounded-3xl border border-white/[0.08] bg-[#11141b] p-6 sm:p-12 lg:p-16 relative overflow-hidden group hover:border-[#a9ddf0]/30 transition-all duration-500 shadow-2xl">
            {/* Ambient Background Gradient */}
            <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-[#a9ddf0]/[0.025] blur-[140px]" />

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
                <span className="text-[#f2f1ec]">Product Designer</span>
              </div>
            </div>

            {/* Asymmetric Showcase Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Narrative & Interactive Triage Simulation */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="font-mono-code text-xs text-[#a9ddf0] uppercase tracking-wider block mb-2">
                    Medesy Technologies
                  </span>
                  <h3 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#f2f1ec] leading-[1.06]">
                    MEDesy Solution.
                  </h3>
                </div>

                <p className="text-lg sm:text-xl text-[#89919d] font-light leading-relaxed">
                  WhatsApp-first telehealth triage gateway connecting patients directly to licensed physicians without app installation barriers.
                </p>

                <p className="text-sm text-[#89919d]/90 font-light leading-relaxed">
                  Rather than forcing users through intimidating app registrations during medical distress, MEDesy conducts humane conversational triage directly in WhatsApp — delivering verified symptom guidance, specialist doctor referrals, and digital consultation summaries.
                </p>

                {/* Interactive Triage Pathway Simulator */}
                <div className="rounded-2xl border border-white/[0.08] bg-[#090b0f] p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                    <span className="font-mono-code text-[11px] uppercase tracking-wider text-[#a9ddf0] font-semibold flex items-center gap-2">
                      <MessageSquare size={13} />
                      Interactive Triage Flow Simulator
                    </span>
                    <span className="font-mono-code text-[10px] text-[#89919d]">Tap Step to Preview</span>
                  </div>

                  {/* Stepper Buttons */}
                  <div className="grid grid-cols-3 gap-2 font-mono-code text-[11px]">
                    {[
                      { step: 0, label: "01. Symptom Query" },
                      { step: 1, label: "02. Doctor Match" },
                      { step: 2, label: "03. Referral Summary" },
                    ].map((item) => (
                      <button
                        key={item.step}
                        onClick={() => {
                          sound.playClick();
                          setTriageStep(item.step as 0 | 1 | 2);
                        }}
                        className={`rounded-lg py-2 px-2 text-center transition-all ${
                          triageStep === item.step
                            ? "bg-[#a9ddf0] text-[#090b0f] font-bold shadow-md shadow-[#a9ddf0]/20"
                            : "bg-white/[0.03] text-[#89919d] hover:text-[#f2f1ec] hover:bg-white/[0.06]"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Step Dynamic Content Box */}
                  <div className="min-h-[100px] rounded-xl bg-[#11141b] border border-white/[0.06] p-4 text-xs font-mono-code">
                    <AnimatePresence mode="wait">
                      {triageStep === 0 && (
                        <motion.div
                          key="step0"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="space-y-2 text-[#89919d]"
                        >
                          <div className="text-[#a9ddf0] font-semibold">Stage 01: Conversational Entry</div>
                          <p className="text-[#f2f1ec]">
                            &ldquo;Hello, welcome to MEDesy. Please describe your primary symptom or medical concern.&rdquo;
                          </p>
                          <div className="text-[10px] text-[#89919d]/80 pt-1 border-t border-white/5">
                            Outcome: Zero signup barrier. Immediate patient articulation in familiar WhatsApp chat UI.
                          </div>
                        </motion.div>
                      )}

                      {triageStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="space-y-2 text-[#89919d]"
                        >
                          <div className="text-[#a9ddf0] font-semibold">Stage 02: Specialty Matching &amp; Triage</div>
                          <p className="text-[#f2f1ec]">
                            Structured symptom prompts classify severity and route request to licensed on-duty physician.
                          </p>
                          <div className="text-[10px] text-[#89919d]/80 pt-1 border-t border-white/5">
                            Outcome: Eliminates clinical misrouting while preparing structured intake note for the doctor.
                          </div>
                        </motion.div>
                      )}

                      {triageStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="space-y-2 text-[#89919d]"
                        >
                          <div className="text-[#a9ddf0] font-semibold">Stage 03: Verified Consultation Card</div>
                          <p className="text-[#f2f1ec]">
                            Patient receives verified session badge, consultation summary, and partner pharmacy instructions.
                          </p>
                          <div className="text-[10px] text-[#89919d]/80 pt-1 border-t border-white/5">
                            Outcome: Transparent documentation that patient can retain and reference securely.
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Action Links */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    href="/work/medesy"
                    onClick={() => sound.playClick()}
                    onMouseEnter={() => sound.playHover()}
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

              {/* Right Column: High-Fidelity Mobile Frame */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-full max-w-sm rounded-3xl bg-[#090b0f] border border-white/[0.1] p-4 sm:p-5 shadow-2xl group-hover:border-[#a9ddf0]/40 transition-all duration-500">
                  <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-[#161a23] border border-white/5 shadow-inner">
                    <Image
                      src="/images/projects/medesy/whatsapp-mockup.png"
                      alt="MEDesy WhatsApp Conversational Triage Interface"
                      fill
                      sizes="(max-width: 1024px) 90vw, 420px"
                      className="object-contain sm:object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between font-mono-code text-[11px] text-[#89919d]">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#a9ddf0]" />
                      Authentic WhatsApp Triage UI
                    </span>
                    <span>Specimen 01</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            EXHIBIT 02: 9JATRIP
            Theme: Intercity Transit & Terminal Hub Logistics (Freelance)
            Architecture: Interactive Route Terminal Simulator + Real Transit Mockups
           ========================================================================= */}
        <div id="exhibit-9jatrip" className="mb-32 sm:mb-44 scroll-mt-28">
          <div className="rounded-3xl border border-white/[0.08] bg-[#11141b] p-6 sm:p-12 lg:p-16 relative overflow-hidden group hover:border-[#a9ddf0]/30 transition-all duration-500 shadow-2xl">
            {/* Header Metadata */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6 mb-12 font-mono-code text-xs">
              <div className="flex items-center gap-3">
                <span className="rounded bg-[#a9ddf0]/10 text-[#a9ddf0] border border-[#a9ddf0]/25 px-3 py-1 font-semibold">
                  EXHIBIT 02 // INTERCITY MOBILITY &amp; TRANSIT
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
              {/* Left Column: Visual Mockup Showcase with Toggle (Span 7) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center justify-between font-mono-code text-xs">
                  <span className="text-[#89919d]">Visual Specimen:</span>
                  <div className="flex items-center gap-2 rounded-full bg-[#090b0f] p-1 border border-white/[0.08]">
                    <button
                      onClick={() => {
                        sound.playClick();
                        setTripViewMode("screen");
                      }}
                      className={`rounded-full px-3 py-1 font-semibold transition-all ${
                        tripViewMode === "screen"
                          ? "bg-[#a9ddf0] text-[#090b0f]"
                          : "text-[#89919d] hover:text-[#f2f1ec]"
                      }`}
                    >
                      Terminal Route Booking
                    </button>
                    <button
                      onClick={() => {
                        sound.playClick();
                        setTripViewMode("receipt");
                      }}
                      className={`rounded-full px-3 py-1 font-semibold transition-all ${
                        tripViewMode === "receipt"
                          ? "bg-[#a9ddf0] text-[#090b0f]"
                          : "text-[#89919d] hover:text-[#f2f1ec]"
                      }`}
                    >
                      Boarding Pass &amp; Receipt
                    </button>
                  </div>
                </div>

                {/* Mockup Display */}
                <div className="rounded-2xl bg-[#090b0f] border border-white/[0.1] p-4 shadow-2xl group-hover:border-[#a9ddf0]/30 transition-all duration-500">
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#161a23]">
                    <AnimatePresence mode="wait">
                      {tripViewMode === "screen" ? (
                        <motion.div
                          key="screen"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.02 }}
                          transition={{ duration: 0.4 }}
                          className="relative w-full h-full"
                        >
                          <Image
                            src="/images/projects/9jatrip/home-screen-mockup.png"
                            alt="9jaTrip Terminal Hub Selection Screen"
                            fill
                            className="object-contain"
                            sizes="(max-width: 1024px) 100vw, 700px"
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="receipt"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.02 }}
                          transition={{ duration: 0.4 }}
                          className="relative w-full h-full"
                        >
                          <Image
                            src="/images/projects/9jatrip/ride-receipt.png"
                            alt="9jaTrip Digital Boarding Pass & Receipt"
                            fill
                            className="object-contain"
                            sizes="(max-width: 1024px) 100vw, 700px"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="mt-3 flex items-center justify-between font-mono-code text-[11px] text-[#89919d]">
                    <span>{tripViewMode === "screen" ? "Intercity Terminal Route Selector" : "Itemized Boarding Pass with Gate QR"}</span>
                    <span>Specimen 02</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative & Interactive Terminal Route Selector (Span 5) */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="font-mono-code text-xs text-[#a9ddf0] uppercase tracking-wider block mb-2">
                    9jaTrip Mobility (Freelance)
                  </span>
                  <h3 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#f2f1ec] leading-[1.06]">
                    9jaTrip.
                  </h3>
                </div>

                <p className="text-lg sm:text-xl text-[#89919d] font-light leading-relaxed">
                  Intercity transit booking and terminal hub logistics designed for regional Nigerian commuters.
                </p>

                <p className="text-sm text-[#89919d]/90 font-light leading-relaxed">
                  Replaces chaotic bus park queues with scheduled departures between regional transport hubs. Commuters select departure terminals, choose reserved coach seats, and receive high-contrast digital boarding passes.
                </p>

                {/* Interactive Route Inspector */}
                <div className="rounded-2xl border border-white/[0.08] bg-[#090b0f] p-4 space-y-3 font-mono-code text-xs">
                  <div className="text-[11px] uppercase tracking-wider text-[#a9ddf0] font-semibold flex items-center gap-2">
                    <MapPin size={13} />
                    Select Intercity Hub Corridor:
                  </div>

                  <div className="flex flex-col gap-2">
                    {INTERCITY_ROUTES.map((route) => (
                      <button
                        key={route.id}
                        onClick={() => {
                          sound.playClick();
                          setSelectedRoute(route);
                        }}
                        className={`text-left p-3 rounded-xl border transition-all ${
                          selectedRoute.id === route.id
                            ? "border-[#a9ddf0] bg-[#a9ddf0]/10 text-[#f2f1ec]"
                            : "border-white/[0.06] bg-white/[0.02] text-[#89919d] hover:border-white/20 hover:text-[#f2f1ec]"
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold mb-1">
                          <span>{route.from} → {route.to}</span>
                          <span className="text-[#a9ddf0]">{route.fare}</span>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-[#89919d]">
                          <span>{route.departure}</span>
                          <span>•</span>
                          <span>{route.bay}</span>
                          <span>•</span>
                          <span className="text-[#a9ddf0]">{route.seatsLeft} seats left</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href="/work/9jatrip"
                    onClick={() => sound.playClick()}
                    onMouseEnter={() => sound.playHover()}
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
                    <span>View in Figma</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            EXHIBIT 03: SOMEWHERE HOTEL
            Theme: Hospitality & Spatial Web (Personal Concept)
            Architecture: Full-Bleed Panorama + Interactive Daylight Phase Controller
           ========================================================================= */}
        <div id="exhibit-somewhere" className="mb-32 sm:mb-44 scroll-mt-28">
          <div className="rounded-3xl border border-white/[0.08] bg-[#11141b] p-6 sm:p-12 lg:p-16 relative overflow-hidden group hover:border-[#a9ddf0]/30 transition-all duration-500 shadow-2xl">
            {/* Header Metadata */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6 mb-10 font-mono-code text-xs">
              <div className="flex items-center gap-3">
                <span className="rounded bg-[#a9ddf0]/10 text-[#a9ddf0] border border-[#a9ddf0]/25 px-3 py-1 font-semibold">
                  EXHIBIT 03 // SPATIAL &amp; HOSPITALITY
                </span>
                <span className="text-[#89919d]">Personal Digital Concept (Booking Demo Only)</span>
              </div>
              <div className="flex items-center gap-6 text-[#89919d]">
                <span>2024</span>
                <span className="text-white/20">•</span>
                <span className="text-[#f2f1ec]">Experience Designer</span>
              </div>
            </div>

            {/* Narrative Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div className="max-w-2xl">
                <span className="font-mono-code text-xs text-[#a9ddf0] uppercase tracking-wider block mb-2">
                  Editorial Sanctuary Lookbook
                </span>
                <h3 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#f2f1ec] leading-[1.06] mb-3">
                  Somewhere Hotel.
                </h3>
                <p className="text-lg sm:text-xl text-[#89919d] font-light leading-relaxed">
                  Cinematic coastal hospitality experience and reservation demonstration exploring atmospheric daylight shifts.
                </p>
              </div>

              {/* Interactive Daylight Controller */}
              <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-[#090b0f] p-1.5 border border-white/[0.08] font-mono-code text-xs">
                <span className="text-[#89919d] text-[11px] px-3 uppercase tracking-wider hidden sm:inline">
                  Daylight:
                </span>
                {[
                  { id: "sunset", label: "Sunset Dusk (06:45 PM)" },
                  { id: "day", label: "Midday Sun (12:00 PM)" },
                  { id: "night", label: "Twilight Nocturne (09:30 PM)" },
                  { id: "exterior", label: "Arrival Facade" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      sound.playClick();
                      setDaylightPhase(item.id as typeof daylightPhase);
                    }}
                    className={`rounded-xl px-3.5 py-2 transition-all font-semibold ${
                      daylightPhase === item.id
                        ? "bg-[#a9ddf0] text-[#090b0f] shadow-md shadow-[#a9ddf0]/20"
                        : "text-[#89919d] hover:text-[#f2f1ec] hover:bg-white/[0.03]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Panoramic Canvas */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#090b0f] border border-white/[0.1] shadow-2xl mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={daylightPhase}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={
                      daylightPhase === "sunset"
                        ? "/images/projects/somewhere/suite-balcony-sunset.png"
                        : daylightPhase === "day"
                        ? "/images/projects/somewhere/suite-balcony-day.png"
                        : daylightPhase === "night"
                        ? "/images/projects/somewhere/suite-balcony-night.png"
                        : "/images/projects/somewhere/hotel-exterior-sunset.png"
                    }
                    alt="Somewhere Hotel Atmosphere"
                    fill
                    priority
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090b0f]/85 via-transparent to-black/20" />

                  {/* Contextual Overlay Note */}
                  <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono-code text-xs">
                    <span className="text-[#f2f1ec] font-semibold bg-[#090b0f]/85 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                      {daylightPhase === "sunset" && "Horizon Balcony Suite // Warm Golden Dusk (21°C)"}
                      {daylightPhase === "day" && "Horizon Balcony Suite // Midday Maritime Sun (24°C)"}
                      {daylightPhase === "night" && "Horizon Balcony Suite // Nocturne Architectural Glow (18°C)"}
                      {daylightPhase === "exterior" && "Arrival Courtyard & Facade // Ambient Twilight"}
                    </span>
                    <span className="text-[#89919d] text-[11px] bg-[#090b0f]/85 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                      Fictional concept; booking demonstration only
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-white/[0.08]">
              <p className="font-mono-code text-xs text-[#89919d] max-w-xl">
                Treats hospitality as an editorial publication rather than a transactional booking engine, featuring multi-light room explorations and demonstration reservation drawers.
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
            EXHIBIT 04: BUYBUDDY
            Theme: Buyer–Seller Marketplace Platform (Personal Product Concept)
            Architecture: Interactive Dual Workspace (Merchant Studio vs Shopper Catalog)
           ========================================================================= */}
        <div id="exhibit-buybuddy" className="mb-32 sm:mb-44 scroll-mt-28">
          <div className="rounded-3xl border border-white/[0.08] bg-[#11141b] p-6 sm:p-12 lg:p-16 relative overflow-hidden group hover:border-[#a9ddf0]/30 transition-all duration-500 shadow-2xl">
            {/* Header Metadata */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6 mb-12 font-mono-code text-xs">
              <div className="flex items-center gap-3">
                <span className="rounded bg-[#a9ddf0]/10 text-[#a9ddf0] border border-[#a9ddf0]/25 px-3 py-1 font-semibold">
                  EXHIBIT 04 // COMMERCE &amp; MARKETPLACE
                </span>
                <span className="text-[#89919d]">Personal Product Concept</span>
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
                    Marketplace Architecture
                  </span>
                  <h3 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#f2f1ec] leading-[1.06]">
                    BuyBuddy.
                  </h3>
                </div>

                <p className="text-lg sm:text-xl text-[#89919d] font-light leading-relaxed">
                  Modern buyer–seller marketplace platform empowering independent merchants with intuitive inventory and ordering workflows.
                </p>

                <p className="text-sm text-[#89919d]/90 font-light leading-relaxed">
                  Independent creative merchants struggle with fragmented, high-friction ecommerce tooling. BuyBuddy bridges merchant inventory control with a clean, responsive customer shopping experience.
                </p>

                {/* Interactive Workspace Controller */}
                <div className="rounded-2xl border border-white/[0.08] bg-[#090b0f] p-4 space-y-2 font-mono-code text-xs">
                  <span className="text-[11px] text-[#a9ddf0] uppercase tracking-wider font-semibold block mb-2">
                    Inspect Marketplace Workspaces:
                  </span>
                  {[
                    { id: "products", label: "01. Merchant Inventory Studio", note: "Product publishing, multi-variants & pricing" },
                    { id: "orders", label: "02. Orders & Fulfillment Ledger", note: "Live transaction tracking & fulfillment status" },
                    { id: "wallet", label: "03. Merchant Wallet & Settlement", note: "Revenue balance & scheduled bank disbursements" },
                    { id: "storefront", label: "04. Shopper Storefront Catalog", note: "Responsive buyer experience with variant selectors" },
                  ].map((ws) => (
                    <button
                      key={ws.id}
                      onClick={() => {
                        sound.playClick();
                        setBuybuddyWorkspace(ws.id as typeof buybuddyWorkspace);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all ${
                        buybuddyWorkspace === ws.id
                          ? "border-[#a9ddf0] bg-[#a9ddf0]/10 text-[#f2f1ec]"
                          : "border-white/[0.04] bg-white/[0.01] text-[#89919d] hover:text-[#f2f1ec] hover:border-white/10"
                      }`}
                    >
                      <div className="font-semibold text-[11px]">{ws.label}</div>
                      <div className="text-[10px] text-[#89919d]">{ws.note}</div>
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    href="/work/buybuddy"
                    onClick={() => sound.playClick()}
                    onMouseEnter={() => sound.playHover()}
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

              {/* Right Column: Dynamic Workspace Mockup (Span 7) */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl bg-[#090b0f] border border-white/[0.1] p-4 shadow-2xl group-hover:border-[#a9ddf0]/30 transition-all duration-500">
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#161a23]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={buybuddyWorkspace}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.4 }}
                        className="relative w-full h-full"
                      >
                        <Image
                          src={
                            buybuddyWorkspace === "products"
                              ? "/images/projects/buybuddy/vendor-products.png"
                              : buybuddyWorkspace === "orders"
                              ? "/images/projects/buybuddy/vendor-orders.png"
                              : buybuddyWorkspace === "wallet"
                              ? "/images/projects/buybuddy/vendor-wallet.png"
                              : "/images/projects/buybuddy/store-landing.png"
                          }
                          alt="BuyBuddy Marketplace Interface"
                          fill
                          className="object-contain"
                          sizes="(max-width: 1024px) 100vw, 700px"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div className="mt-3 flex items-center justify-between font-mono-code text-[11px] text-[#89919d]">
                    <span>
                      {buybuddyWorkspace === "products" && "Merchant Inventory Studio — Variant Management"}
                      {buybuddyWorkspace === "orders" && "Vendor Orders Ledger — Real-Time Status Tracking"}
                      {buybuddyWorkspace === "wallet" && "Financial Wallet — Revenue & Settlement History"}
                      {buybuddyWorkspace === "storefront" && "Customer Storefront — Modular Product Lookbook"}
                    </span>
                    <span>Specimen 04</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            EXHIBIT 05: STILLWATER HALL (Cinematic Video Walkthrough & Spatial Web)
            Theme: Performing Arts, Acoustic Scrollytelling, Video Integration
            Architecture: Cinema Video Player + Interactive 5-Stage Chapter Scrubber
           ========================================================================= */}
        <div id="exhibit-stillwater" className="mb-24 scroll-mt-28">
          <div className="rounded-3xl border border-white/[0.08] bg-[#11141b] p-6 sm:p-12 lg:p-16 relative overflow-hidden group hover:border-[#a9ddf0]/30 transition-all duration-500 shadow-2xl">
            {/* Header Metadata */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6 mb-10 font-mono-code text-xs">
              <div className="flex items-center gap-3">
                <span className="rounded bg-[#a9ddf0]/10 text-[#a9ddf0] border border-[#a9ddf0]/25 px-3 py-1 font-semibold">
                  EXHIBIT 05 // CINEMATIC VIDEO WALKTHROUGH
                </span>
                <span className="text-[#89919d]">Personal Web Experience</span>
              </div>
              <div className="flex items-center gap-6 text-[#89919d]">
                <span>2024</span>
                <span className="text-white/20">•</span>
                <span className="text-[#f2f1ec]">Experience Designer &amp; Developer</span>
              </div>
            </div>

            {/* Narrative Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
              <div className="max-w-2xl">
                <span className="font-mono-code text-xs text-[#a9ddf0] uppercase tracking-wider block mb-2">
                  5-Stage Spatial Walkthrough
                </span>
                <h3 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#f2f1ec] leading-[1.06] mb-3">
                  Stillwater Hall.
                </h3>
                <p className="text-lg sm:text-xl text-[#89919d] font-light leading-relaxed">
                  Cinematic spatial venue walkthrough and interactive digital ticketing experience featuring authentic video chapters.
                </p>
              </div>

              {/* Player Status Badge */}
              <div className="flex items-center gap-3 font-mono-code text-xs text-[#a9ddf0] bg-[#090b0f] px-4 py-2 rounded-full border border-white/[0.08]">
                <span className="h-2 w-2 rounded-full bg-[#a9ddf0] animate-pulse" />
                <span>{activeChapter.stage}</span>
              </div>
            </div>

            {/* CINEMA VIDEO PLAYER CONTAINER */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#090b0f] border border-white/[0.1] shadow-2xl mb-6">
              <video
                ref={videoRef}
                src={activeChapter.src}
                poster={activeChapter.still}
                playsInline
                autoPlay
                muted={isMuted}
                loop={false}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnded}
                className="w-full h-full object-cover"
              />

              {/* Video Gradient Overlays */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090b0f]/90 via-transparent to-black/30" />

              {/* Top Title Overlay */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between font-mono-code text-xs">
                <span className="text-[#f2f1ec] font-semibold bg-[#090b0f]/80 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                  Chapter {activeChapter.id}: {activeChapter.title}
                </span>
                <span className="text-[#89919d] bg-[#090b0f]/80 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                  {activeChapter.duration}
                </span>
              </div>

              {/* Bottom Interactive Controls & Progress Bar */}
              <div className="absolute bottom-6 left-6 right-6 space-y-3">
                {/* Progress Bar */}
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#a9ddf0] transition-all duration-200"
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono-code text-xs">
                  {/* Left: Play/Pause & Sound Toggle */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="flex items-center gap-2 rounded-full bg-[#f2f1ec] text-[#090b0f] font-semibold px-4 py-2 hover:bg-[#a9ddf0] transition-colors"
                    >
                      {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                      <span>{isPlaying ? "Pause" : "Play"}</span>
                    </button>

                    <button
                      onClick={toggleMute}
                      className="flex items-center gap-2 rounded-full border border-white/20 bg-[#090b0f]/80 text-[#f2f1ec] px-4 py-2 hover:border-[#a9ddf0] hover:text-[#a9ddf0] transition-colors backdrop-blur-md"
                    >
                      {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                      <span>{isMuted ? "Sound Off" : "Sound On"}</span>
                    </button>
                  </div>

                  {/* Right: Caption Description */}
                  <p className="text-[11px] text-[#f2f1ec]/85 max-w-lg bg-[#090b0f]/80 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md hidden md:block">
                    {activeChapter.description}
                  </p>
                </div>
              </div>
            </div>

            {/* CHAPTER TIMELINE SCRUBBER BUTTONS */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8 font-mono-code text-xs">
              {STILLWATER_CHAPTERS.map((ch, idx) => (
                <button
                  key={ch.id}
                  onClick={() => selectChapter(idx)}
                  className={`text-left p-3 rounded-xl border transition-all ${
                    activeChapterIndex === idx
                      ? "border-[#a9ddf0] bg-[#a9ddf0]/10 text-[#f2f1ec]"
                      : "border-white/[0.06] bg-[#090b0f] text-[#89919d] hover:border-white/20 hover:text-[#f2f1ec]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[#a9ddf0] font-semibold">{ch.id}</span>
                    <span className="text-[10px] text-[#89919d]">{ch.duration}</span>
                  </div>
                  <div className="font-semibold truncate text-[11px]">{ch.title}</div>
                  <div className="text-[9px] text-[#89919d] uppercase mt-1">{ch.stage}</div>
                </button>
              ))}
            </div>

            {/* Footer Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-white/[0.08]">
              <p className="font-mono-code text-xs text-[#89919d] max-w-xl">
                Guides concertgoers through a continuous architectural sequence: evening exterior → grand lobby → acoustic stage → seat-row hover details &amp; demo pass generation.
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

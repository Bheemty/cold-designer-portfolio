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
  MapPin,
  Clock,
  Compass,
  MessageSquare,
  ShieldCheck,
  Building,
  Layers,
  ChevronRight,
  Check,
  Radio,
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
    vehicle: "Executive 14-Seater HiAce Coach",
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
  const [tripViewMode, setTripViewMode] = useState<"screen" | "seat" | "receipt">("screen");

  // --------------------------------------------------------------------------
  // EXHIBIT 03: PAAI State (Flow Simulation)
  // --------------------------------------------------------------------------
  const [paaiActiveFlow, setPaaiActiveFlow] = useState<"assistant" | "intent" | "wallet">("assistant");

  // --------------------------------------------------------------------------
  // EXHIBIT 04: Somewhere Hotel State (Daylight Atmosphere Phases)
  // --------------------------------------------------------------------------
  const [daylightPhase, setDaylightPhase] = useState<"sunset" | "day" | "night" | "exterior">("sunset");

  // --------------------------------------------------------------------------
  // EXHIBIT 05: BuyBuddy State (Dual Marketplace Switcher)
  // --------------------------------------------------------------------------
  const [buybuddyWorkspace, setBuybuddyWorkspace] = useState<"products" | "orders" | "wallet" | "storefront">("products");

  // --------------------------------------------------------------------------
  // EXHIBIT 06: Stillwater Hall State (Video Walkthrough Player)
  // --------------------------------------------------------------------------
  // EXHIBIT 05: Stillwater Hall State (Video Walkthrough Player)
  // --------------------------------------------------------------------------
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [selectedTier, setSelectedTier] = useState<"stalls" | "circle" | "balcony">("stalls");
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
    if (videoRef.current && videoRef.current.duration && progressBarRef.current) {
      const prog = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      progressBarRef.current.style.width = `${prog}%`;
    }
  };

  const handleVideoEnded = () => {
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
                Curated Exhibition [01—06]
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
            Layout: Asymmetric Editorial Column + Floating Device Crucible
           ========================================================================= */}
        <div id="exhibit-medesy" className="mb-36 sm:mb-48 scroll-mt-28">
          <div className="relative">
            {/* Contextual Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6 mb-12 font-mono-code text-xs">
              <div className="flex items-center gap-3">
                <span className="rounded bg-[#a9ddf0]/10 text-[#a9ddf0] border border-[#a9ddf0]/25 px-3 py-1 font-semibold">
                  01 // TELEHEALTH PLATFORM
                </span>
                <span className="text-[#89919d]">Current Employment</span>
              </div>
              <div className="flex items-center gap-6 text-[#89919d]">
                <span>2024 — Present</span>
                <span className="text-white/20">•</span>
                <span className="text-[#f2f1ec]">Product Designer</span>
              </div>
            </div>

            {/* Asymmetric Spread */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Narrative & Interactive Simulation (Span 6) */}
              <div className="lg:col-span-6 space-y-8">
                <div>
                  <span className="font-mono-code text-xs text-[#a9ddf0] uppercase tracking-wider block mb-2">
                    Medesy Technologies
                  </span>
                  <h3 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#f2f1ec] leading-[1.04]">
                    MEDesy Solution.
                  </h3>
                </div>

                <p className="text-xl sm:text-2xl text-[#89919d] font-light leading-relaxed">
                  Structured WhatsApp-first triage gateway connecting patients directly to licensed physicians without app installation barriers.
                </p>

                <p className="text-base text-[#89919d]/90 font-light leading-relaxed">
                  Rather than forcing patients into unfamiliar applications during medical distress, MEDesy conducts humane conversational triage directly in WhatsApp — delivering verified symptom guidance, specialist doctor referrals, and digital consultation summaries.
                </p>

                {/* Interactive Triage Simulator */}
                <div className="rounded-2xl border border-white/[0.08] bg-[#11141b] p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                    <span className="font-mono-code text-xs uppercase tracking-wider text-[#a9ddf0] font-semibold flex items-center gap-2">
                      <MessageSquare size={14} />
                      Interactive Triage Simulator
                    </span>
                    <span className="font-mono-code text-[11px] text-[#89919d]">Tap Step to Test</span>
                  </div>

                  {/* Step Buttons */}
                  <div className="grid grid-cols-3 gap-2 font-mono-code text-xs">
                    {[
                      { step: 0, label: "01. Intake" },
                      { step: 1, label: "02. Doctor Match" },
                      { step: 2, label: "03. Referral Card" },
                    ].map((item) => (
                      <button
                        key={item.step}
                        onClick={() => {
                          sound.playClick();
                          setTriageStep(item.step as 0 | 1 | 2);
                        }}
                        className={`rounded-xl py-2.5 px-3 text-center transition-all ${
                          triageStep === item.step
                            ? "bg-[#a9ddf0] text-[#090b0f] font-bold shadow-md shadow-[#a9ddf0]/20"
                            : "bg-white/[0.03] text-[#89919d] hover:text-[#f2f1ec] hover:bg-white/[0.06]"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Simulated Conversation Screen */}
                  <div className="min-h-[140px] rounded-xl bg-[#090b0f] border border-white/[0.06] p-4 text-xs font-mono-code space-y-3">
                    <AnimatePresence mode="wait">
                      {triageStep === 0 && (
                        <motion.div
                          key="step0"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="space-y-2.5"
                        >
                          <div className="flex items-start gap-2">
                            <span className="text-[#a9ddf0] shrink-0 font-bold">MEDesy Bot:</span>
                            <span className="text-[#f2f1ec]">
                              &ldquo;Welcome to MEDesy. Please describe your main symptom and how many days you have experienced it.&rdquo;
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-[#89919d] shrink-0 font-bold">Patient:</span>
                            <span className="text-[#89919d]">
                              &ldquo;I have had an intense throbbing headache for 2 days with light sensitivity.&rdquo;
                            </span>
                          </div>
                          <div className="text-[10px] text-[#a9ddf0] pt-1 border-t border-white/5">
                            Outcome: Zero signup friction. Immediate conversational triage within standard WhatsApp.
                          </div>
                        </motion.div>
                      )}

                      {triageStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="space-y-2.5"
                        >
                          <div className="flex items-start gap-2">
                            <span className="text-[#a9ddf0] shrink-0 font-bold">Clinical Rule:</span>
                            <span className="text-[#f2f1ec]">
                              Matched to Neurological &amp; General Consultation.
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-[#89919d] shrink-0 font-bold">Assigned Doctor:</span>
                            <span className="text-[#89919d]">
                              Dr. Adebayo O. (Consultant Physician, MBBS, FMCP) — Active On-Call.
                            </span>
                          </div>
                          <div className="text-[10px] text-[#a9ddf0] pt-1 border-t border-white/5">
                            Outcome: Automated triage routing ensures patients reach qualified clinicians without waiting room delay.
                          </div>
                        </motion.div>
                      )}

                      {triageStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="space-y-2.5"
                        >
                          <div className="flex items-start gap-2">
                            <span className="text-[#a9ddf0] shrink-0 font-bold">Referral Badge:</span>
                            <span className="text-[#f2f1ec]">
                              Session #MDS-84920 Verified &amp; Signed.
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-[#89919d] shrink-0 font-bold">Prescription:</span>
                            <span className="text-[#89919d]">
                              Digital pickup token dispatched to nearest accredited partner pharmacy.
                            </span>
                          </div>
                          <div className="text-[10px] text-[#a9ddf0] pt-1 border-t border-white/5">
                            Outcome: Clean, portable documentation that patients can reference directly on their phone.
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href="/work/medesy"
                    onClick={() => sound.playClick()}
                    onMouseEnter={() => sound.playHover()}
                    className="inline-flex items-center gap-2 rounded-full bg-[#f2f1ec] hover:bg-[#a9ddf0] px-7 py-3.5 font-mono-code text-xs font-semibold text-[#090b0f] transition-all"
                  >
                    <span>Examine Case Study</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Floating Mobile Crucible (Span 6) */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-full max-w-sm rounded-[2.5rem] bg-[#090b0f] border border-white/[0.12] p-4 sm:p-5 shadow-2xl">
                  {/* Subtle Glow */}
                  <div className="pointer-events-none absolute -inset-1 rounded-[2.5rem] bg-[#a9ddf0]/10 blur-xl opacity-40" />

                  <div className="relative aspect-[9/16] w-full rounded-[2rem] overflow-hidden bg-[#161a23] border border-white/5 shadow-inner">
                    <Image
                      src="/images/projects/medesy/whatsapp-mockup.png"
                      alt="MEDesy WhatsApp Conversational Triage Interface"
                      fill
                      priority
                      sizes="(max-width: 1024px) 90vw, 420px"
                      className="object-contain sm:object-cover"
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between font-mono-code text-[11px] text-[#89919d]">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#a9ddf0]" />
                      Authentic WhatsApp Triage Interface
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
            Theme: Intercity Mobility & Transit (Freelance)
            Layout: Split Transit Terminal Board + Interactive Corridor Dispatcher
           ========================================================================= */}
        <div id="exhibit-9jatrip" className="mb-36 sm:mb-48 scroll-mt-28">
          <div className="relative">
            {/* Contextual Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6 mb-12 font-mono-code text-xs">
              <div className="flex items-center gap-3">
                <span className="rounded bg-[#a9ddf0]/10 text-[#a9ddf0] border border-[#a9ddf0]/25 px-3 py-1 font-semibold">
                  02 // INTERCITY MOBILITY
                </span>
                <span className="text-[#89919d]">Client / Freelance</span>
              </div>
              <div className="flex items-center gap-6 text-[#89919d]">
                <span>2024</span>
                <span className="text-white/20">•</span>
                <span className="text-[#f2f1ec]">Product Designer</span>
              </div>
            </div>

            {/* Split Terminal Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Visual Showcase (Span 7) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center justify-between font-mono-code text-xs">
                  <span className="text-[#89919d]">Terminal Interface Specimen:</span>
                  <div className="flex items-center gap-2 rounded-full bg-[#11141b] p-1 border border-white/[0.08]">
                    {[
                      { id: "screen", label: "Booking & Gateway" },
                      { id: "receipt", label: "Digital Boarding Pass" },
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => {
                          sound.playClick();
                          setTripViewMode(btn.id as typeof tripViewMode);
                        }}
                        className={`rounded-full px-3.5 py-1.5 font-semibold transition-all ${
                          tripViewMode === btn.id
                            ? "bg-[#a9ddf0] text-[#090b0f]"
                            : "text-[#89919d] hover:text-[#f2f1ec]"
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Display Frame */}
                <div className="rounded-3xl bg-[#11141b] border border-white/[0.1] p-5 shadow-2xl">
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#090b0f]">
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
                            src="/images/projects/9jatrip/booking-screen.png"
                            alt="9jaTrip Intercity Route Booking and Payment Gateway"
                            fill
                            className="object-contain"
                            sizes="(max-width: 1024px) 100vw, 750px"
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
                            sizes="(max-width: 1024px) 100vw, 750px"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="mt-4 flex items-center justify-between font-mono-code text-[11px] text-[#89919d]">
                    <span>
                      {tripViewMode === "screen"
                        ? "Intercity Route Booking & Moniepoint Payment Gateway"
                        : "High-Contrast Boarding Pass with Gate QR Code"}
                    </span>
                    <span>Specimen 02</span>
                  </div>
                </div>
              </div>

              {/* Narrative & Interactive Corridor Dispatcher (Span 5) */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <span className="font-mono-code text-xs text-[#a9ddf0] uppercase tracking-wider block mb-2">
                    9jaTrip Mobility (Freelance)
                  </span>
                  <h3 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#f2f1ec] leading-[1.04]">
                    9jaTrip.
                  </h3>
                </div>

                <p className="text-xl sm:text-2xl text-[#89919d] font-light leading-relaxed">
                  Intercity transit booking and terminal hub logistics designed for regional Nigerian travelers.
                </p>

                <p className="text-base text-[#89919d]/90 font-light leading-relaxed">
                  Replaces chaotic bus park queues with scheduled departures between established regional transport hubs. Commuters select terminal hubs, reserve specific coach seats, and receive high-contrast digital boarding passes.
                </p>

                {/* Corridor Selector Console */}
                <div className="rounded-2xl border border-white/[0.08] bg-[#11141b] p-5 space-y-3 font-mono-code text-xs">
                  <div className="text-xs uppercase tracking-wider text-[#a9ddf0] font-semibold flex items-center gap-2">
                    <MapPin size={14} />
                    Live Regional Hub Corridors:
                  </div>

                  <div className="flex flex-col gap-2.5">
                    {INTERCITY_ROUTES.map((route) => (
                      <button
                        key={route.id}
                        onClick={() => {
                          sound.playClick();
                          setSelectedRoute(route);
                        }}
                        className={`text-left p-3.5 rounded-xl border transition-all ${
                          selectedRoute.id === route.id
                            ? "border-[#a9ddf0] bg-[#a9ddf0]/10 text-[#f2f1ec]"
                            : "border-white/[0.06] bg-[#090b0f] text-[#89919d] hover:border-white/20 hover:text-[#f2f1ec]"
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold mb-1 text-sm">
                          <span>{route.from} → {route.to}</span>
                          <span className="text-[#a9ddf0]">{route.fare}</span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-[#89919d]">
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

                {/* CTAs */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href="/work/9jatrip"
                    onClick={() => sound.playClick()}
                    onMouseEnter={() => sound.playHover()}
                    className="inline-flex items-center gap-2 rounded-full bg-[#f2f1ec] hover:bg-[#a9ddf0] px-7 py-3.5 font-mono-code text-xs font-semibold text-[#090b0f] transition-all"
                  >
                    <span>Examine Case Study</span>
                    <ArrowRight size={14} />
                  </Link>

                  <a
                    href="https://www.9jatrip.ng/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    onMouseEnter={() => sound.playHover()}
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] hover:border-[#a9ddf0] hover:text-[#a9ddf0] px-6 py-3.5 font-mono-code text-xs font-semibold text-[#f2f1ec] transition-all"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            EXHIBIT 03: PAAI
            Theme: Autonomous AI Assistant & Unified Mobile Ecosystem
            Layout: Dual-Theme Architecture + Interactive Intent-to-Card Simulation
           ========================================================================= */}
        <div id="exhibit-paai" className="mb-36 sm:mb-48 scroll-mt-28">
          <div className="relative">
            {/* Contextual Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6 mb-12 font-mono-code text-xs">
              <div className="flex items-center gap-3">
                <span className="rounded bg-[#a9ddf0]/10 text-[#a9ddf0] border border-[#a9ddf0]/25 px-3 py-1 font-semibold">
                  03 // AUTONOMOUS AI &amp; MOBILE ECOSYSTEM
                </span>
                <span className="text-[#89919d]">Mobile Product Architecture · Dual Theme System</span>
              </div>
              <div className="flex items-center gap-6 text-[#89919d]">
                <span>2024</span>
                <span className="text-white/20">•</span>
                <span className="text-[#f2f1ec]">Lead Product Designer</span>
              </div>
            </div>

            {/* Asymmetric Spread */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Narrative & Interactive Simulation (Span 6) */}
              <div className="lg:col-span-6 space-y-8">
                <div>
                  <span className="font-mono-code text-xs text-[#a9ddf0] uppercase tracking-wider block mb-2">
                    PAAI Systems · Personal Intelligence
                  </span>
                  <h3 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#f2f1ec] leading-[1.04]">
                    PAAI.
                  </h3>
                </div>

                <p className="text-xl sm:text-2xl text-[#89919d] font-light leading-relaxed">
                  Autonomous mobile intelligence companion uniting natural language execution with an adaptive dual-theme design system and friction-free financial transactions.
                </p>

                {/* Flow Switcher Controls */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono-code text-xs text-[#89919d]">
                    <span className="uppercase tracking-wider">Interactive Architecture Flow:</span>
                    <span className="text-[#a9ddf0]">Verified Intent Paradigm</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "assistant" as const, label: "AI Assistant", tag: "Natural Lang" },
                      { id: "intent" as const, label: "Intent-to-Card", tag: "Safe Execution" },
                      { id: "wallet" as const, label: "Dual Wallet", tag: "Light/Dark" },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          setPaaiActiveFlow(mode.id);
                        }}
                        className={`rounded-xl border p-3 text-left transition-all cursor-pointer font-mono-code ${
                          paaiActiveFlow === mode.id
                            ? "border-[#a9ddf0] bg-[#a9ddf0]/10 text-[#f2f1ec] shadow-[0_0_20px_rgba(169,221,240,0.15)]"
                            : "border-white/[0.08] bg-[#11141b] text-[#89919d] hover:border-white/20 hover:text-[#f2f1ec]"
                        }`}
                      >
                        <div className="text-xs font-semibold block">{mode.label}</div>
                        <div className="text-[10px] text-[#89919d] mt-0.5">{mode.tag}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interactive Simulation Crucible */}
                <div className="rounded-2xl border border-white/[0.08] bg-[#11141b] p-6 space-y-4 font-mono-code text-xs">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                    <div className="flex items-center gap-2 text-[#a9ddf0]">
                      <Sparkles size={14} />
                      <span className="font-semibold uppercase tracking-wider">
                        {paaiActiveFlow === "assistant" && "Autonomous Natural Language Prompt"}
                        {paaiActiveFlow === "intent" && "Intent-to-Card Verification Gate"}
                        {paaiActiveFlow === "wallet" && "Unified Multi-Currency Balance Ledger"}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#89919d] uppercase">Dual-Mode Calibrated</span>
                  </div>

                  {paaiActiveFlow === "assistant" && (
                    <div className="space-y-3 pt-1">
                      <div className="flex gap-3 items-start bg-white/[0.02] p-3.5 rounded-xl border border-white/[0.06]">
                        <span className="text-[#a9ddf0] shrink-0 font-bold">User:</span>
                        <p className="text-[#f2f1ec] leading-relaxed">
                          &ldquo;Send ₦25,000 to Sarah for the team lunch bill and summarize our weekly meal expenses.&rdquo;
                        </p>
                      </div>
                      <div className="flex gap-3 items-start bg-[#a9ddf0]/[0.04] p-3.5 rounded-xl border border-[#a9ddf0]/20">
                        <span className="text-[#a9ddf0] shrink-0 font-bold">PAAI:</span>
                        <div className="space-y-2 text-[#89919d] leading-relaxed">
                          <p className="text-[#f2f1ec]">
                            Prepared instant transfer to <strong className="text-[#a9ddf0]">Sarah Johnson (GTBank)</strong>. Weekly lunch total is currently ₦48,200 across 3 orders.
                          </p>
                          <span className="inline-block px-2.5 py-1 rounded bg-[#a9ddf0]/15 text-[#a9ddf0] text-[11px] font-semibold">
                            Pending Biometric Verification Card ↓
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {paaiActiveFlow === "intent" && (
                    <div className="space-y-3 pt-1">
                      <div className="rounded-xl border border-[#a9ddf0]/30 bg-[#090b0f] p-4 space-y-3">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[#89919d] uppercase tracking-wider">Payment Confirmation</span>
                          <span className="text-[#a9ddf0] font-semibold">₦25,000.00</span>
                        </div>
                        <div className="flex items-center gap-3 py-2 border-y border-white/[0.06]">
                          <div className="h-8 w-8 rounded-full bg-[#a9ddf0]/20 flex items-center justify-center text-[#a9ddf0] font-bold">
                            SJ
                          </div>
                          <div>
                            <div className="text-[#f2f1ec] font-semibold">Sarah Johnson</div>
                            <div className="text-[10px] text-[#89919d]">Guaranty Trust Bank · ···· 4821</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-[#89919d]">
                          <span>Network Transfer Fee: ₦0.00</span>
                          <span className="text-[#a9ddf0] flex items-center gap-1">
                            <ShieldCheck size={12} /> Biometric Ready
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {paaiActiveFlow === "wallet" && (
                    <div className="space-y-3 pt-1">
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="rounded-xl border border-white/[0.06] bg-[#090b0f] p-3 space-y-1">
                          <span className="text-[#89919d] block text-[10px] uppercase">Primary Balance</span>
                          <span className="text-[#f2f1ec] font-bold text-sm">₦1,420,500.00</span>
                          <span className="text-[#a9ddf0] text-[10px] block">OLED Obsidian Mode</span>
                        </div>
                        <div className="rounded-xl border border-white/[0.06] bg-[#090b0f] p-3 space-y-1">
                          <span className="text-[#89919d] block text-[10px] uppercase">Virtual USD Card</span>
                          <span className="text-[#f2f1ec] font-bold text-sm">$3,240.00</span>
                          <span className="text-emerald-400 text-[10px] block">Active · Multi-Currency</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Key Metrics / Highlights */}
                <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/[0.08] font-mono-code text-xs">
                  <div>
                    <span className="text-[#89919d] block mb-1 uppercase text-[10px] tracking-wider">Themes</span>
                    <span className="text-2xl font-bold text-[#f2f1ec] font-display">Dual</span>
                    <span className="text-[#89919d] block text-[11px] mt-0.5">Light &amp; Dark</span>
                  </div>
                  <div>
                    <span className="text-[#89919d] block mb-1 uppercase text-[10px] tracking-wider">Safeguard</span>
                    <span className="text-2xl font-bold text-[#a9ddf0] font-display">Intent</span>
                    <span className="text-[#89919d] block text-[11px] mt-0.5">Verified Cards</span>
                  </div>
                  <div>
                    <span className="text-[#89919d] block mb-1 uppercase text-[10px] tracking-wider">Platform</span>
                    <span className="text-2xl font-bold text-[#f2f1ec] font-display">Mobile</span>
                    <span className="text-[#89919d] block text-[11px] mt-0.5">iOS &amp; Android</span>
                  </div>
                </div>

                {/* Action Links */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/work/paai"
                    onClick={() => sound.playClick()}
                    onMouseEnter={() => sound.playHover()}
                    className="inline-flex items-center gap-2 rounded-full bg-[#f2f1ec] px-7 py-3.5 font-mono-code text-xs font-semibold text-[#090b0f] hover:bg-[#a9ddf0] transition-all"
                  >
                    <span>Examine Case Study</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Verified Visual Specimen & Canvas Overview (Span 6) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#11141b] p-4 sm:p-6 shadow-2xl transition-all hover:border-white/20">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#090b0f]">
                    <Image
                      src="/images/projects/paai/paai-canvas-overview.png"
                      alt="PAAI Mobile Application Multi-Screen System Canvas"
                      fill
                      className="object-contain transition-transform duration-700 hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-t border-white/[0.06] pt-4 font-mono-code text-xs">
                    <span className="text-[#f2f1ec] font-medium leading-relaxed">
                      Multi-Screen Architecture Canvas: Dual-Theme Onboarding, AI Prompts &amp; Multi-Currency Wallet
                    </span>
                    <span className="text-[#89919d] text-[11px] shrink-0">
                      AUTHENTIC SPECIMEN
                    </span>
                  </div>
                </div>

                {/* Architectural Blueprint Bar */}
                <div className="grid grid-cols-2 gap-3 font-mono-code text-xs">
                  <div className="rounded-xl border border-white/[0.06] bg-[#11141b] p-4">
                    <div className="flex items-center gap-2 text-[#a9ddf0] mb-1 font-semibold">
                      <Layers size={13} />
                      <span>Semantic Tokens</span>
                    </div>
                    <p className="text-[11px] text-[#89919d] leading-relaxed">
                      Calibrated contrast ratios across deep obsidian dark backgrounds and clean sunlight light surfaces.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/[0.06] bg-[#11141b] p-4">
                    <div className="flex items-center gap-2 text-[#a9ddf0] mb-1 font-semibold">
                      <ShieldCheck size={13} />
                      <span>Execution Trust</span>
                    </div>
                    <p className="text-[11px] text-[#89919d] leading-relaxed">
                      Two-tier action pattern requiring biometric confirmation on every autonomous AI financial transfer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            EXHIBIT 04: SOMEWHERE HOTEL
            Theme: Hospitality & Spatial Web Experience (Personal Concept)
            Layout: Full-Bleed Architectural Lookbook + Daylight Phase Shifter
           ========================================================================= */}
        <div id="exhibit-somewhere" className="mb-36 sm:mb-48 scroll-mt-28">
          <div className="relative">
            {/* Contextual Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6 mb-10 font-mono-code text-xs">
              <div className="flex items-center gap-3">
                <span className="rounded bg-[#a9ddf0]/10 text-[#a9ddf0] border border-[#a9ddf0]/25 px-3 py-1 font-semibold">
                  04 // SPATIAL LOOKBOOK
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
                <h3 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#f2f1ec] leading-[1.04] mb-3">
                  Somewhere Hotel.
                </h3>
                <p className="text-xl sm:text-2xl text-[#89919d] font-light leading-relaxed">
                  Cinematic coastal hospitality experience and reservation demonstration exploring atmospheric daylight shifts.
                </p>
              </div>

              {/* Daylight Atmosphere Controls */}
              <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-[#11141b] p-1.5 border border-white/[0.08] font-mono-code text-xs">
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
                    className={`rounded-xl px-4 py-2 transition-all font-semibold ${
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

            {/* Full-Bleed Panoramic Lookbook Canvas */}
            <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-[#090b0f] border border-white/[0.1] shadow-2xl mb-8">
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
                    sizes="(max-width: 1400px) 100vw, 1400px"
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

            {/* Bottom Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-white/[0.08]">
              <p className="font-mono-code text-xs text-[#89919d] max-w-xl">
                Treats hospitality as an editorial monograph rather than a transactional booking engine, featuring multi-light room explorations and demonstration reservation drawers.
              </p>

              <div className="flex items-center gap-4 shrink-0">
                <Link
                  href="/work/somewhere-hotel"
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                  className="inline-flex items-center gap-2 rounded-full bg-[#f2f1ec] hover:bg-[#a9ddf0] px-7 py-3.5 font-mono-code text-xs font-semibold text-[#090b0f] transition-all"
                >
                  <span>Examine Case Study</span>
                  <ArrowRight size={14} />
                </Link>

                <a
                  href="https://somewhere-hotel.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] hover:border-[#a9ddf0] hover:text-[#a9ddf0] px-6 py-3.5 font-mono-code text-xs font-semibold text-[#f2f1ec] transition-all"
                >
                  <span>Visit Live Experience</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            EXHIBIT 05: BUYBUDDY
            Theme: Buyer–Seller Marketplace Platform (Personal Product Concept)
            Layout: Dual Marketplace Workbench (Merchant Studio vs Shopper Catalog)
           ========================================================================= */}
        <div id="exhibit-buybuddy" className="mb-36 sm:mb-48 scroll-mt-28">
          <div className="relative">
            {/* Contextual Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6 mb-12 font-mono-code text-xs">
              <div className="flex items-center gap-3">
                <span className="rounded bg-[#a9ddf0]/10 text-[#a9ddf0] border border-[#a9ddf0]/25 px-3 py-1 font-semibold">
                  05 // COMMERCE &amp; MARKETPLACE
                </span>
                <span className="text-[#89919d]">Personal Product Concept</span>
              </div>
              <div className="flex items-center gap-6 text-[#89919d]">
                <span>2024</span>
                <span className="text-white/20">•</span>
                <span className="text-[#f2f1ec]">Product Designer &amp; Dev</span>
              </div>
            </div>

            {/* Dual Workbench Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Narrative & Workspace Switcher (Span 5) */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <span className="font-mono-code text-xs text-[#a9ddf0] uppercase tracking-wider block mb-2">
                    Marketplace Architecture
                  </span>
                  <h3 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#f2f1ec] leading-[1.04]">
                    BuyBuddy.
                  </h3>
                </div>

                <p className="text-xl sm:text-2xl text-[#89919d] font-light leading-relaxed">
                  Modern buyer–seller marketplace platform empowering independent merchants with intuitive inventory and ordering workflows.
                </p>

                <p className="text-base text-[#89919d]/90 font-light leading-relaxed">
                  Independent creative merchants struggle with fragmented, high-friction ecommerce tooling. BuyBuddy bridges merchant inventory control with a clean, responsive customer shopping experience.
                </p>

                {/* Workspace Switcher Selector */}
                <div className="rounded-2xl border border-white/[0.08] bg-[#11141b] p-4 space-y-2 font-mono-code text-xs">
                  <span className="text-[11px] text-[#a9ddf0] uppercase tracking-wider font-semibold block mb-2">
                    Select Marketplace Workflow:
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
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        buybuddyWorkspace === ws.id
                          ? "border-[#a9ddf0] bg-[#a9ddf0]/10 text-[#f2f1ec]"
                          : "border-white/[0.04] bg-[#090b0f] text-[#89919d] hover:text-[#f2f1ec] hover:border-white/10"
                      }`}
                    >
                      <div className="font-semibold text-xs">{ws.label}</div>
                      <div className="text-[10px] text-[#89919d]">{ws.note}</div>
                    </button>
                  ))}
                </div>

                {/* CTAs */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href="/work/buybuddy"
                    onClick={() => sound.playClick()}
                    onMouseEnter={() => sound.playHover()}
                    className="inline-flex items-center gap-2 rounded-full bg-[#f2f1ec] hover:bg-[#a9ddf0] px-7 py-3.5 font-mono-code text-xs font-semibold text-[#090b0f] transition-all"
                  >
                    <span>Examine Case Study</span>
                    <ArrowRight size={14} />
                  </Link>

                  <a
                    href="https://buybuddy-bheemty.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    onMouseEnter={() => sound.playHover()}
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] hover:border-[#a9ddf0] hover:text-[#a9ddf0] px-6 py-3.5 font-mono-code text-xs font-semibold text-[#f2f1ec] transition-all"
                  >
                    <span>Test Live Demo</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              {/* Dynamic Workbench Showcase (Span 7) */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl bg-[#11141b] border border-white/[0.1] p-5 shadow-2xl">
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#090b0f]">
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
                          sizes="(max-width: 1024px) 100vw, 750px"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div className="mt-4 flex items-center justify-between font-mono-code text-[11px] text-[#89919d]">
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
            EXHIBIT 06: STILLWATER HALL
            Theme: Performing Arts, Acoustic Scrollytelling, Video Integration
            Layout: Full Cinema Screening Stage + 5-Stage Spatial Chapter Scrubber
           ========================================================================= */}
        <div id="exhibit-stillwater" className="mb-24 scroll-mt-28">
          <div className="relative">
            {/* Contextual Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6 mb-10 font-mono-code text-xs">
              <div className="flex items-center gap-3">
                <span className="rounded bg-[#a9ddf0]/10 text-[#a9ddf0] border border-[#a9ddf0]/25 px-3 py-1 font-semibold">
                  06 // CINEMATIC VIDEO WALKTHROUGH
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
                <h3 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#f2f1ec] leading-[1.04] mb-3">
                  Stillwater Hall.
                </h3>
                <p className="text-xl sm:text-2xl text-[#89919d] font-light leading-relaxed">
                  Cinematic spatial venue walkthrough and interactive digital ticketing experience featuring authentic video chapters.
                </p>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-3 font-mono-code text-xs text-[#a9ddf0] bg-[#11141b] px-4 py-2 rounded-full border border-white/[0.08]">
                <span className="h-2 w-2 rounded-full bg-[#a9ddf0] animate-pulse" />
                <span>{activeChapter.stage}</span>
              </div>
            </div>

            {/* CINEMA VIDEO SCREEN CONTAINER */}
            <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-[#090b0f] border border-white/[0.1] shadow-2xl mb-6">
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

              {/* Video Gradient Vignette */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090b0f]/90 via-transparent to-black/30" />

              {/* Top Title Overlay */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between font-mono-code text-xs">
                <span className="text-[#f2f1ec] font-semibold bg-[#090b0f]/80 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                  Chapter {activeChapter.id}: {activeChapter.title}
                </span>
                <span className="text-[#89919d] bg-[#090b0f]/80 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                  {activeChapter.duration}
                </span>
              </div>

              {/* Bottom Interactive Controls */}
              <div className="absolute bottom-6 left-6 right-6 space-y-3">
                {/* Progress Line */}
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#a9ddf0] transition-all duration-200"
                    ref={progressBarRef}
                    style={{ width: "0%" }}
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono-code text-xs">
                  {/* Left: Play/Pause & Sound */}
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
                  <p className="text-[11px] text-[#f2f1ec]/85 max-w-lg bg-[#090b0f]/80 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md hidden md:block">
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
                  className={`text-left p-3.5 rounded-2xl border transition-all ${
                    activeChapterIndex === idx
                      ? "border-[#a9ddf0] bg-[#a9ddf0]/10 text-[#f2f1ec]"
                      : "border-white/[0.06] bg-[#11141b] text-[#89919d] hover:border-white/20 hover:text-[#f2f1ec]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[#a9ddf0] font-semibold">{ch.id}</span>
                    <span className="text-[10px] text-[#89919d]">{ch.duration}</span>
                  </div>
                  <div className="font-semibold truncate text-xs">{ch.title}</div>
                  <div className="text-[10px] text-[#89919d] uppercase mt-1">{ch.stage}</div>
                </button>
              ))}
            </div>

            {/* Bottom Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-white/[0.08]">
              <p className="font-mono-code text-xs text-[#89919d] max-w-xl">
                Guides concertgoers through a continuous architectural sequence: evening exterior → grand foyer → acoustic stage → seat-row hover details &amp; demo pass generation.
              </p>

              <div className="flex items-center gap-4 shrink-0">
                <Link
                  href="/work/stillwater"
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                  className="inline-flex items-center gap-2 rounded-full bg-[#f2f1ec] hover:bg-[#a9ddf0] px-7 py-3.5 font-mono-code text-xs font-semibold text-[#090b0f] transition-all"
                >
                  <span>Examine Case Study</span>
                  <ArrowRight size={14} />
                </Link>

                <a
                  href="https://stillwater-concert-experience.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] hover:border-[#a9ddf0] hover:text-[#a9ddf0] px-6 py-3.5 font-mono-code text-xs font-semibold text-[#f2f1ec] transition-all"
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

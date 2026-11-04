"use client";

import { useState, useRef, useEffect, useId } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Volume2, VolumeX, Sparkles, Check, AlertCircle, RefreshCw } from "lucide-react";
import { sound } from "@/lib/sounds";
import { useTheme } from "@/context/ThemeContext";
import ScrollReveal from "@/components/motion/ScrollReveal";

export default function LabPage() {
  // ─────────────────────────────────────────────────────────────
  // EXPERIMENT 4: INTERFACE ARCHITECTURE & HERO EXPLORATIONS
  // ─────────────────────────────────────────────────────────────
  const [activeStudy, setActiveStudy] = useState<"real-estate" | "unimaid">("real-estate");
  const [studyViewTab, setStudyViewTab] = useState<"preview" | "breakdown">("preview");

  // Global Audio Feedback Toggle (Never autoplays; user must interact)
  const [soundEnabled, setSoundEnabled] = useState(true);

  // ─────────────────────────────────────────────────────────────
  // EXPERIMENT 1: THE INTERACTION STUDIO STATE
  // ─────────────────────────────────────────────────────────────
  // A. Async Lifecycle Button
  const [lifecycleState, setLifecycleState] = useState<"idle" | "loading" | "success">("idle");
  const lifecycleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleTriggerLifecycle = () => {
    if (lifecycleState !== "idle") return;
    setLifecycleState("loading");
    if (soundEnabled) sound.playClick();

    lifecycleTimerRef.current = setTimeout(() => {
      setLifecycleState("success");
      if (soundEnabled) sound.playChime(660, 0.25);

      lifecycleTimerRef.current = setTimeout(() => {
        setLifecycleState("idle");
      }, 2000);
    }, 1100);
  };

  // B. Hold-to-Confirm Destructive Action
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isArchived, setIsArchived] = useState(false);
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startHold = () => {
    if (isArchived) return;
    setIsHolding(true);
    if (soundEnabled) sound.playPop(320);

    const startTime = Date.now();
    const duration = 1200; // 1.2s to confirm

    holdIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, (elapsed / duration) * 100);
      setHoldProgress(progress);

      if (progress >= 100) {
        clearInterval(holdIntervalRef.current!);
        setIsHolding(false);
        setIsArchived(true);
        if (soundEnabled) sound.playChime(520, 0.3);
      }
    }, 25);
  };

  const endHold = () => {
    if (isArchived) return;
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    if (holdProgress < 100 && isHolding) {
      if (soundEnabled) sound.playClick();
    }
    setIsHolding(false);
    setHoldProgress(0);
  };

  const resetArchive = () => {
    setIsArchived(false);
    setHoldProgress(0);
    if (soundEnabled) sound.playPop();
  };

  // C. Operational Mode Toggle
  const [autonomousTriage, setAutonomousTriage] = useState(true);

  // D. Precondition Gate
  const [identityVerified, setIdentityVerified] = useState(false);
  const [gateSubmitted, setGateSubmitted] = useState(false);

  // ─────────────────────────────────────────────────────────────
  // EXPERIMENT 2: THE INTERFACE SWITCHER STATE
  // ─────────────────────────────────────────────────────────────
  const { theme: globalTheme, setTheme: setGlobalTheme } = useTheme();
  const [activeTheme, setActiveTheme] = useState<"obsidian" | "paper" | "midnight">(
    globalTheme === "light" ? "paper" : "obsidian"
  );
  const [densityMode, setDensityMode] = useState<"spacious" | "compact">("spacious");
  const [highlightAction, setHighlightAction] = useState(false);

  // Synchronize local preview theme with the active global theme
  useEffect(() => {
    if (globalTheme === "light" && activeTheme !== "paper") {
      setActiveTheme("paper");
    } else if (globalTheme === "dark" && activeTheme === "paper") {
      setActiveTheme("obsidian");
    }
  }, [globalTheme, activeTheme]);

  // ─────────────────────────────────────────────────────────────
  // EXPERIMENT 3: TYPE & VISUAL HIERARCHY STATE
  // ─────────────────────────────────────────────────────────────
  const [hierarchyMode, setHierarchyMode] = useState<"intentional" | "flat">("intentional");
  const [typeWeight, setTypeWeight] = useState(700);
  const [typeTracking, setTypeTracking] = useState(-0.02);
  const [sampleHeadline, setSampleHeadline] = useState("Structured WhatsApp-First Triage Gateway");

  const weightSliderId = useId();
  const trackingSliderId = useId();

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (lifecycleTimerRef.current) clearTimeout(lifecycleTimerRef.current);
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, []);

  // Theme variable map for live component preview
  const themeStyles = {
    obsidian: {
      bg: "#090b0f",
      cardBg: "#11141b",
      border: "rgba(255, 255, 255, 0.1)",
      textPrimary: "#f2f1ec",
      textMuted: "#89919d",
      accent: "#a9ddf0",
      accentSurface: "rgba(169, 221, 240, 0.12)",
      tagBg: "rgba(255, 255, 255, 0.04)",
      tagBorder: "rgba(255, 255, 255, 0.08)",
    },
    paper: {
      bg: "#FDFDFD",
      cardBg: "#FFFFFF",
      border: "rgba(18, 22, 30, 0.1)",
      textPrimary: "#11141b",
      textMuted: "#4d5462",
      accent: "#027a9e",
      accentSurface: "rgba(2, 122, 158, 0.08)",
      tagBg: "#f4f2ea",
      tagBorder: "rgba(18, 22, 30, 0.08)",
    },
    midnight: {
      bg: "#0b1329",
      cardBg: "#131e3d",
      border: "rgba(56, 189, 248, 0.2)",
      textPrimary: "#f8fafc",
      textMuted: "#94a3b8",
      accent: "#38bdf8",
      accentSurface: "rgba(56, 189, 248, 0.14)",
      tagBg: "rgba(56, 189, 248, 0.05)",
      tagBorder: "rgba(56, 189, 248, 0.15)",
    },
  };

  const currentTheme = themeStyles[activeTheme];

  return (
    <main className="min-h-screen pt-32 sm:pt-40 pb-28 px-6 sm:px-10 lg:px-16 bg-[#090b0f] text-[#f2f1ec]">
      <div className="mx-auto max-w-[1440px]">
        {/* Navigation Breadcrumb */}
        <div className="mb-10">
          <Link
            href="/"
            onClick={() => sound.playClick()}
            className="inline-flex items-center gap-2 font-mono-code text-xs text-[#89919d] hover:text-[#a9ddf0] transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Return to Portfolio Home</span>
          </Link>
        </div>

        {/* Editorial Page Header */}
        <header className="border-b border-white/[0.08] pb-12 mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 font-mono-code text-xs">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#a9ddf0] animate-pulse" />
              <span className="uppercase tracking-widest text-[#a9ddf0]">
                (01) &mdash; Interactive Design Lab // Experiments &amp; Explorations
              </span>
            </div>

            {/* Global Audio Toggle */}
            <button
              type="button"
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) sound.playChime(660, 0.2);
              }}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-1.5 font-mono-code text-xs text-[#f2f1ec] hover:border-[#a9ddf0] transition-colors cursor-pointer"
              aria-label={soundEnabled ? "Mute interactive audio feedback" : "Enable interactive audio feedback"}
            >
              {soundEnabled ? (
                <>
                  <Volume2 size={13} className="text-[#a9ddf0]" />
                  <span>Audio Feedback: Active</span>
                </>
              ) : (
                <>
                  <VolumeX size={13} className="text-[#89919d]" />
                  <span>Audio Muted</span>
                </>
              )}
            </button>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#f2f1ec] mb-6">
            The Lab
          </h1>

          <p className="text-xl sm:text-2xl text-[#89919d] font-light leading-relaxed max-w-4xl">
            A living workspace exploring interactive design experiments, state lifecycles, adaptive themes, density ergonomics, and typographic hierarchy. Every experiment below is an interactive artifact designed to be experienced directly.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 font-mono-code text-xs text-[#89919d]">
            <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
              Cold Designer Lab
            </span>
            <span>&bull;</span>
            <span>4 Interactive Experiments &amp; Interface Studies</span>
            <span>&bull;</span>
            <span className="text-[#a9ddf0]">Touch &amp; Keyboard Accessible</span>
          </div>
        </header>

        {/* ─────────────────────────────────────────────────────────────
            EXPERIMENT 01: THE INTERACTION STUDIO
           ───────────────────────────────────────────────────────────── */}
        <ScrollReveal start="top 85%" y={24} duration={0.5}>
          <section aria-labelledby="exp1-title" className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/[0.08] pb-4 mb-10 gap-4">
            <div>
              <div className="font-mono-code text-xs text-[#a9ddf0] uppercase tracking-wider mb-1">
                EXPERIMENT 01 // INTERACTION STUDIO
              </div>
              <h2 id="exp1-title" className="font-display text-3xl font-bold text-[#f2f1ec]">
                State Lifecycles &amp; Intentional Friction
              </h2>
            </div>
            <p className="font-mono-code text-xs text-[#89919d] max-w-md">
              Instruction: Try clicking, pressing, and holding each control to observe how real interfaces communicate state.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Interactive Workspace (8 cols) */}
            <div className="lg:col-span-8 rounded-3xl border border-white/[0.08] bg-[#11141b] p-8 sm:p-10 flex flex-col justify-between">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* 1. Async Lifecycle Button */}
                <div className="rounded-2xl border border-white/[0.06] bg-[#090b0f] p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between font-mono-code text-xs text-[#89919d] mb-3">
                      <span className="uppercase text-[#a9ddf0]">A &mdash; Async Lifecycle</span>
                      <span>Single Tap</span>
                    </div>
                    <h3 className="font-display font-semibold text-lg text-[#f2f1ec] mb-2">
                      Telehealth Booking Action
                    </h3>
                    <p className="text-xs text-[#89919d] leading-relaxed mb-6">
                      Click to observe the complete asynchronous progression: Idle &rarr; Loading &rarr; Success &rarr; Auto-reset.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={handleTriggerLifecycle}
                      disabled={lifecycleState !== "idle"}
                      className={`w-full py-3.5 px-6 rounded-full font-mono-code text-xs font-semibold flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer shadow-lg ${
                        lifecycleState === "idle"
                          ? "bg-[#FDFDFD] text-[#090b0f] hover:bg-[#a9ddf0] hover:scale-[1.01]"
                          : lifecycleState === "loading"
                          ? "bg-[#f59e0b] text-[#090b0f] cursor-wait"
                          : "bg-[#10b981] text-[#FDFDFD]"
                      }`}
                    >
                      {lifecycleState === "idle" && (
                        <>
                          <span>Schedule Consultation</span>
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
                        </>
                      )}
                      {lifecycleState === "loading" && (
                        <>
                          <RefreshCw size={14} className="animate-spin" />
                          <span>Verifying Physician Availability...</span>
                        </>
                      )}
                      {lifecycleState === "success" && (
                        <>
                          <Check size={14} />
                          <span>Consultation Confirmed</span>
                        </>
                      )}
                    </button>

                    <div className="font-mono-code text-[11px] text-[#89919d] flex items-center justify-between border-t border-white/[0.06] pt-2">
                      <span>STATE:</span>
                      <span className="text-[#a9ddf0] font-semibold uppercase">{lifecycleState}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Hold-to-Confirm Destructive Action */}
                <div className="rounded-2xl border border-white/[0.06] bg-[#090b0f] p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between font-mono-code text-xs text-[#89919d] mb-3">
                      <span className="uppercase text-[#ef4444]">B &mdash; Intentional Friction</span>
                      <span>Hold 1.2s</span>
                    </div>
                    <h3 className="font-display font-semibold text-lg text-[#f2f1ec] mb-2">
                      Archive Critical Record
                    </h3>
                    <p className="text-xs text-[#89919d] leading-relaxed mb-6">
                      Press and hold for 1.2s to commit. Releasing early safely cancels the action without committing.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {!isArchived ? (
                      <div className="relative">
                        <button
                          type="button"
                          onMouseDown={startHold}
                          onMouseUp={endHold}
                          onMouseLeave={endHold}
                          onTouchStart={startHold}
                          onTouchEnd={endHold}
                          className="relative w-full py-3.5 px-6 rounded-full font-mono-code text-xs font-semibold overflow-hidden border border-red-500/40 bg-red-500/10 text-red-200 hover:border-red-500 transition-colors cursor-pointer select-none"
                        >
                          {/* Dynamic Fill Progress Bar */}
                          <div
                            style={{ width: `${holdProgress}%` }}
                            className="absolute inset-0 bg-red-500/30 transition-all duration-75 ease-linear pointer-events-none"
                          />
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            {isHolding ? (
                              <span>Holding... {Math.round(holdProgress)}%</span>
                            ) : (
                              <span>Press &amp; Hold to Archive</span>
                            )}
                          </span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-3 p-2.5 rounded-full bg-red-500/15 border border-red-500/40 font-mono-code text-xs text-red-200">
                        <span className="flex items-center gap-1.5 pl-2">
                          <Check size={14} className="text-red-400" />
                          <span>Record Archived</span>
                        </span>
                        <button
                          type="button"
                          onClick={resetArchive}
                          className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[#f2f1ec] cursor-pointer"
                        >
                          Undo
                        </button>
                      </div>
                    )}

                    <div className="font-mono-code text-[11px] text-[#89919d] flex items-center justify-between border-t border-white/[0.06] pt-2">
                      <span>HOLD PROGRESS:</span>
                      <span className="text-red-300 font-semibold">{Math.round(holdProgress)}%</span>
                    </div>
                  </div>
                </div>

                {/* 3. Operational Mode Toggle */}
                <div className="rounded-2xl border border-white/[0.06] bg-[#090b0f] p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between font-mono-code text-xs text-[#89919d] mb-3">
                      <span className="uppercase text-[#a9ddf0]">C &mdash; Kinetic Haptics</span>
                      <span>Toggle State</span>
                    </div>
                    <h3 className="font-display font-semibold text-lg text-[#f2f1ec] mb-2">
                      Operational Dispatch Mode
                    </h3>
                    <p className="text-xs text-[#89919d] leading-relaxed mb-6">
                      Toggle between autonomous conversational routing and direct manual physician assignment.
                    </p>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                    <div className="flex flex-col">
                      <span className="font-mono-code text-xs font-semibold text-[#f2f1ec]">
                        {autonomousTriage ? "Autonomous WhatsApp Triage" : "Manual Doctor Review"}
                      </span>
                      <span className="font-mono-code text-[11px] text-[#89919d]">
                        {autonomousTriage ? "Instant algorithmic matching" : "Physician review queue"}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setAutonomousTriage((prev) => !prev);
                        if (soundEnabled) sound.playChime(autonomousTriage ? 480 : 640, 0.15);
                      }}
                      className={`relative w-14 h-8 rounded-full p-1 transition-colors duration-250 cursor-pointer ${
                        autonomousTriage ? "bg-[#a9ddf0]" : "bg-white/10"
                      }`}
                      aria-label="Toggle autonomous triage mode"
                    >
                      <div
                        className={`w-6 h-6 rounded-full shadow-md transition-transform duration-250 ease-out flex items-center justify-center ${
                          autonomousTriage ? "translate-x-6 bg-[#090b0f]" : "translate-x-0 bg-white"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            autonomousTriage ? "bg-[#a9ddf0]" : "bg-[#090b0f]"
                          }`}
                        />
                      </div>
                    </button>
                  </div>
                </div>

                {/* 4. Precondition Gate (Disabled vs Active) */}
                <div className="rounded-2xl border border-white/[0.06] bg-[#090b0f] p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between font-mono-code text-xs text-[#89919d] mb-3">
                      <span className="uppercase text-[#a9ddf0]">D &mdash; Precondition Gate</span>
                      <span>Form Logic</span>
                    </div>
                    <h3 className="font-display font-semibold text-lg text-[#f2f1ec] mb-2">
                      Disabled State Clarity
                    </h3>
                    <p className="text-xs text-[#89919d] leading-relaxed mb-6">
                      Toggle the requirement checkbox below to see how disabled states should inform rather than frustrate.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-center gap-3 font-mono-code text-xs text-[#89919d] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={identityVerified}
                        onChange={(e) => {
                          setIdentityVerified(e.target.checked);
                          if (soundEnabled) sound.playClick();
                        }}
                        className="w-4 h-4 rounded accent-[#a9ddf0] cursor-pointer"
                      />
                      <span className="text-[#f2f1ec]">Patient identity &amp; consent confirmed</span>
                    </label>

                    <button
                      type="button"
                      disabled={!identityVerified}
                      onClick={() => {
                        setGateSubmitted(true);
                        if (soundEnabled) sound.playChime(700, 0.2);
                        setTimeout(() => setGateSubmitted(false), 2000);
                      }}
                      className={`w-full py-3.5 px-6 rounded-full font-mono-code text-xs font-semibold transition-all duration-200 cursor-pointer ${
                        identityVerified
                          ? "bg-[#FDFDFD] text-[#090b0f] hover:bg-[#a9ddf0] shadow-lg cursor-pointer"
                          : "bg-white/5 border border-white/10 text-white/30 cursor-not-allowed"
                      }`}
                    >
                      {gateSubmitted ? (
                        <span className="flex items-center justify-center gap-2">
                          <Check size={14} /> Intake Submitted
                        </span>
                      ) : identityVerified ? (
                        "Proceed to Intake Gateway"
                      ) : (
                        "Verify Consent to Proceed"
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Interaction Studio Footer */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between font-mono-code text-xs text-[#89919d] gap-2">
                <span>EXECUTION PRINCIPLE:</span>
                <span className="text-[#a9ddf0]">Zero dead clicks &bull; Clear feedback loops &bull; Friction where safety is required</span>
              </div>
            </div>

            {/* Design Thinking Sidebar (4 cols) */}
            <div className="lg:col-span-4 rounded-3xl border border-white/[0.08] bg-[#11141b] p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div>
                <span className="font-mono-code text-xs text-[#a9ddf0] uppercase tracking-wider block mb-2">
                  THE DESIGN RATIONALE
                </span>
                <h3 className="font-display text-2xl font-bold text-[#f2f1ec] mb-4">
                  Why Micro-Interactions Matter
                </h3>
                <div className="space-y-4 text-sm text-[#89919d] font-light leading-relaxed">
                  <p>
                    A button is the primary tactile threshold between a human decision and a computational event. When feedback is delayed, vague, or missing, users experience cognitive friction.
                  </p>
                  <p>
                    In clinical healthcare systems (like MEDesy) and urban transit check-ins (9jaTrip), double-submissions cause duplicate charges and clinician confusion.
                  </p>
                  <p>
                    By engineering optimistic locking during async loads, and adding intentional physical friction (hold-to-confirm) on destructive commands, we protect users without intrusive confirmation popups.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#090b0f] p-5 font-mono-code text-xs text-[#89919d] space-y-2">
                <div className="flex justify-between">
                  <span>ASYNC LOCK:</span>
                  <span className="text-[#a9ddf0]">Guaranteed</span>
                </div>
                <div className="flex justify-between">
                  <span>HOLD PHYSICS:</span>
                  <span className="text-[#f2f1ec]">Linear Time Clamp</span>
                </div>
                <div className="flex justify-between">
                  <span>AUDIO CUES:</span>
                  <span className="text-[#f2f1ec]">{soundEnabled ? "Active (Web Audio)" : "Muted"}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ─────────────────────────────────────────────────────────────
          EXPERIMENT 02: THE INTERFACE SWITCHER
         ───────────────────────────────────────────────────────────── */}
      <ScrollReveal start="top 85%" y={24} duration={0.5}>
        <section aria-labelledby="exp2-title" className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/[0.08] pb-4 mb-10 gap-4">
            <div>
              <div className="font-mono-code text-xs text-[#a9ddf0] uppercase tracking-wider mb-1">
                EXPERIMENT 02 // INTERFACE SWITCHER
              </div>
              <h2 id="exp2-title" className="font-display text-3xl font-bold text-[#f2f1ec]">
                Adaptive Themes &amp; Density Ergonomics
              </h2>
            </div>
            <p className="font-mono-code text-xs text-[#89919d] max-w-md">
              Instruction: Switch themes and toggle density to observe how the interface adapts to different operational environments.
            </p>
          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-[#11141b] p-8 sm:p-12">
            {/* Control Bar */}
            <div className="flex flex-wrap items-center justify-between gap-6 pb-8 mb-8 border-b border-white/[0.08]">
              {/* Theme Selector — Global Portfolio Controller */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono-code text-xs text-[#89919d] uppercase">
                    Portfolio Theme Switch
                  </span>
                  <span className="font-mono-code text-[10px] px-2 py-0.5 rounded-full bg-[#a9ddf0]/15 text-[#a9ddf0] border border-[#a9ddf0]/30 font-semibold">
                    Global
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono-code text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTheme("obsidian");
                      setGlobalTheme("dark");
                      if (soundEnabled) sound.playClick();
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all cursor-pointer ${
                      globalTheme === "dark"
                        ? "border-[#a9ddf0] bg-[#a9ddf0]/15 text-[#a9ddf0] font-semibold"
                        : "border-white/[0.08] bg-white/[0.02] text-[#89919d] hover:text-[#f2f1ec]"
                    }`}
                    aria-pressed={globalTheme === "dark"}
                  >
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        globalTheme === "dark" ? "bg-[#a9ddf0] animate-pulse" : "bg-[#89919d]/40"
                      }`}
                    />
                    <span>Dark Theme (Obsidian)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTheme("paper");
                      setGlobalTheme("light");
                      if (soundEnabled) sound.playClick();
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all cursor-pointer ${
                      globalTheme === "light"
                        ? "border-[#a9ddf0] bg-[#a9ddf0]/15 text-[#a9ddf0] font-semibold"
                        : "border-white/[0.08] bg-white/[0.02] text-[#89919d] hover:text-[#f2f1ec]"
                    }`}
                    aria-pressed={globalTheme === "light"}
                  >
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        globalTheme === "light" ? "bg-[#027a9e] animate-pulse" : "bg-[#89919d]/40"
                      }`}
                    />
                    <span>Light Theme (#FDFDFD)</span>
                  </button>
                </div>
              </div>

              {/* Density Mode */}
              <div>
                <span className="font-mono-code text-xs text-[#89919d] block mb-2 uppercase">
                  Layout Density
                </span>
                <div className="flex items-center gap-2 font-mono-code text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setDensityMode("spacious");
                      if (soundEnabled) sound.playPop();
                    }}
                    className={`px-4 py-2 rounded-full border transition-all cursor-pointer ${
                      densityMode === "spacious"
                        ? "border-[#a9ddf0] bg-[#a9ddf0]/15 text-[#a9ddf0] font-semibold"
                        : "border-white/[0.08] bg-white/[0.02] text-[#89919d] hover:text-[#f2f1ec]"
                    }`}
                  >
                    Spacious (Consumer)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDensityMode("compact");
                      if (soundEnabled) sound.playPop();
                    }}
                    className={`px-4 py-2 rounded-full border transition-all cursor-pointer ${
                      densityMode === "compact"
                        ? "border-[#a9ddf0] bg-[#a9ddf0]/15 text-[#a9ddf0] font-semibold"
                        : "border-white/[0.08] bg-white/[0.02] text-[#89919d] hover:text-[#f2f1ec]"
                    }`}
                  >
                    Compact (Clinician Queue)
                  </button>
                </div>
              </div>

              {/* Hierarchy Focus Switch */}
              <div>
                <span className="font-mono-code text-xs text-[#89919d] block mb-2 uppercase">
                  Optical Focus
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setHighlightAction(!highlightAction);
                    if (soundEnabled) sound.playClick();
                  }}
                  className={`px-4 py-2 rounded-full border font-mono-code text-xs transition-all cursor-pointer ${
                    highlightAction
                      ? "border-[#a9ddf0] bg-[#a9ddf0] text-[#090b0f] font-semibold"
                      : "border-white/[0.08] bg-white/[0.02] text-[#89919d] hover:text-[#f2f1ec]"
                  }`}
                >
                  {highlightAction ? "Primary Path Highlighted" : "Highlight Primary Action"}
                </button>
              </div>
            </div>

            {/* Global Theme Sync Notice */}
            <div className="mb-8 px-4 sm:px-5 py-3.5 rounded-2xl border border-white/[0.08] bg-white/[0.02] flex flex-wrap items-center justify-between gap-4 font-mono-code text-xs">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a9ddf0] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#a9ddf0]" />
                </span>
                <span className="text-[#89919d]">
                  Active Global Website Theme:{" "}
                  <strong className="text-[#f2f1ec] font-semibold">
                    {globalTheme === "light" ? "Studio Light Canvas (#FDFDFD)" : "Obsidian Dark Brand"}
                  </strong>
                </span>
              </div>
              <span className="text-[11px] text-[#89919d]">
                Selection updates the entire website immediately &bull; Persists across all page navigation &amp; reload
              </span>
            </div>

            {/* Live Interactive Component Preview Canvas */}
            <div
              style={{
                backgroundColor: currentTheme.bg,
                transition: "background-color 0.35s ease, color 0.35s ease",
              }}
              className="rounded-2xl p-6 sm:p-10 flex items-center justify-center border border-white/[0.06] shadow-2xl"
            >
              <div
                style={{
                  backgroundColor: currentTheme.cardBg,
                  borderColor: currentTheme.border,
                  color: currentTheme.textPrimary,
                  padding: densityMode === "spacious" ? "32px" : "18px",
                  transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                className="w-full max-w-2xl rounded-2xl border shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Card Eyebrow & Status */}
                  <div
                    style={{
                      borderBottomColor: currentTheme.border,
                      paddingBottom: densityMode === "spacious" ? "14px" : "8px",
                      marginBottom: densityMode === "spacious" ? "18px" : "10px",
                    }}
                    className="flex items-center justify-between border-b font-mono-code text-xs"
                  >
                    <span
                      style={{
                        color: currentTheme.accent,
                        backgroundColor: currentTheme.accentSurface,
                        padding: "3px 8px",
                        borderRadius: "99px",
                      }}
                      className="font-semibold"
                    >
                      TRIAGE RECORD // PT-48201
                    </span>
                    <span
                      style={{
                        color: currentTheme.textMuted,
                        opacity: highlightAction ? 0.4 : 1,
                        transition: "opacity 0.2s",
                      }}
                    >
                      Priority: Urgent Referral
                    </span>
                  </div>

                  {/* Patient Headline */}
                  <h4
                    style={{
                      color: currentTheme.textPrimary,
                      fontSize: densityMode === "spacious" ? "24px" : "18px",
                      marginBottom: densityMode === "spacious" ? "8px" : "4px",
                    }}
                    className="font-display font-bold tracking-tight"
                  >
                    Amara Okafor &bull; Acute Symptom Triage
                  </h4>

                  <p
                    style={{
                      color: currentTheme.textMuted,
                      fontSize: densityMode === "spacious" ? "15px" : "13px",
                      marginBottom: densityMode === "spacious" ? "20px" : "12px",
                      opacity: highlightAction ? 0.3 : 1,
                      transition: "opacity 0.2s",
                    }}
                    className="font-light leading-relaxed"
                  >
                    Patient initiated WhatsApp triage for severe headache with visual aura. Automated decision flow identified secondary red flag indicators; matched to licensed neurologist for urgent consultation.
                  </p>

                  {/* Specifications Matrix */}
                  <div
                    style={{
                      gap: densityMode === "spacious" ? "12px" : "6px",
                      marginBottom: densityMode === "spacious" ? "24px" : "14px",
                      opacity: highlightAction ? 0.35 : 1,
                      transition: "opacity 0.2s",
                    }}
                    className="grid grid-cols-2 sm:grid-cols-3 font-mono-code text-xs"
                  >
                    <div
                      style={{
                        backgroundColor: currentTheme.tagBg,
                        borderColor: currentTheme.tagBorder,
                        padding: densityMode === "spacious" ? "10px" : "6px",
                      }}
                      className="rounded-lg border"
                    >
                      <span style={{ color: currentTheme.textMuted }} className="block text-[10px] uppercase">
                        Matched Doctor
                      </span>
                      <strong style={{ color: currentTheme.textPrimary }}>Dr. E. Adebayo</strong>
                    </div>
                    <div
                      style={{
                        backgroundColor: currentTheme.tagBg,
                        borderColor: currentTheme.tagBorder,
                        padding: densityMode === "spacious" ? "10px" : "6px",
                      }}
                      className="rounded-lg border"
                    >
                      <span style={{ color: currentTheme.textMuted }} className="block text-[10px] uppercase">
                        Response Window
                      </span>
                      <strong style={{ color: currentTheme.textPrimary }}>&lt; 5 Minutes</strong>
                    </div>
                    <div
                      style={{
                        backgroundColor: currentTheme.tagBg,
                        borderColor: currentTheme.tagBorder,
                        padding: densityMode === "spacious" ? "10px" : "6px",
                      }}
                      className="rounded-lg border"
                    >
                      <span style={{ color: currentTheme.textMuted }} className="block text-[10px] uppercase">
                        Channel
                      </span>
                      <strong style={{ color: currentTheme.textPrimary }}>WhatsApp Direct</strong>
                    </div>
                  </div>
                </div>

                {/* Primary Action Button */}
                <div
                  style={{
                    borderTopColor: currentTheme.border,
                    paddingTop: densityMode === "spacious" ? "16px" : "10px",
                  }}
                  className="flex items-center justify-between border-t gap-4"
                >
                  <span
                    style={{
                      color: currentTheme.textMuted,
                      fontSize: "12px",
                      opacity: highlightAction ? 0.4 : 1,
                    }}
                    className="font-mono-code hidden sm:inline"
                  >
                    End-to-End Encrypted Triage
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      if (soundEnabled) sound.playClick();
                    }}
                    style={{
                      backgroundColor: currentTheme.accent,
                      color: activeTheme === "paper" ? "#FDFDFD" : "#090b0f",
                      padding: densityMode === "spacious" ? "12px 24px" : "8px 16px",
                      fontSize: densityMode === "spacious" ? "13px" : "11px",
                      transform: highlightAction ? "scale(1.03)" : "scale(1)",
                      boxShadow: highlightAction
                        ? `0 0 24px ${currentTheme.accent}66`
                        : "none",
                    }}
                    className="inline-flex items-center gap-2 rounded-full font-mono-code font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap"
                  >
                    <span>Initiate Doctor Handoff</span>
                    <svg
                      viewBox="0 0 24 24"
                      width="13"
                      height="13"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Design Rationale */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono-code text-xs text-[#89919d]">
              <div>
                <span className="text-[#a9ddf0] font-semibold block mb-1 uppercase">Dark vs Light Purpose</span>
                <p className="font-sans text-sm text-[#89919d] leading-relaxed">
                  Dark themes reduce eye strain in low-light clinical emergency rooms; light editorial themes maximize legibility for daytime patient lookbooks.
                </p>
              </div>
              <div>
                <span className="text-[#a9ddf0] font-semibold block mb-1 uppercase">Density Ergonomics</span>
                <p className="font-sans text-sm text-[#89919d] leading-relaxed">
                  Spacious layouts calm anxious patients reading symptoms; compact density allows specialists to manage triage queues without horizontal or vertical friction.
                </p>
              </div>
              <div>
                <span className="text-[#a9ddf0] font-semibold block mb-1 uppercase">Optical Focus</span>
                <p className="font-sans text-sm text-[#89919d] leading-relaxed">
                  By controlling relative contrast, the interface ensures the user&apos;s attention lands squarely on the most critical clinical action.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ─────────────────────────────────────────────────────────────
          EXPERIMENT 03: TYPE & VISUAL HIERARCHY STUDIO
         ───────────────────────────────────────────────────────────── */}
      <ScrollReveal start="top 85%" y={24} duration={0.5}>
        <section aria-labelledby="exp3-title" className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/[0.08] pb-4 mb-10 gap-4">
            <div>
              <div className="font-mono-code text-xs text-[#a9ddf0] uppercase tracking-wider mb-1">
                EXPERIMENT 03 // TYPE &amp; VISUAL HIERARCHY
              </div>
              <h2 id="exp3-title" className="font-display text-3xl font-bold text-[#f2f1ec]">
                Scale, Tracking &amp; Scanning Hierarchy
              </h2>
            </div>
            <p className="font-mono-code text-xs text-[#89919d] max-w-md">
              Instruction: Toggle between Flat and Intentional hierarchy, or slide weight and tracking to experience how typography guides human attention.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Hierarchy Contrast Tester (6 cols) */}
            <div className="lg:col-span-6 rounded-3xl border border-white/[0.08] bg-[#11141b] p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
                  <span className="font-mono-code text-xs text-[#a9ddf0] uppercase font-semibold">
                    A &mdash; Contrast Hierarchy Test
                  </span>
                  <div className="flex items-center gap-1.5 font-mono-code text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setHierarchyMode("flat");
                        if (soundEnabled) sound.playClick();
                      }}
                      className={`px-3 py-1 rounded-full border transition-all cursor-pointer ${
                        hierarchyMode === "flat"
                          ? "border-red-400/50 bg-red-400/15 text-red-200 font-semibold"
                          : "border-white/[0.08] text-[#89919d]"
                      }`}
                    >
                      Flat (Anti-Pattern)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setHierarchyMode("intentional");
                        if (soundEnabled) sound.playClick();
                      }}
                      className={`px-3 py-1 rounded-full border transition-all cursor-pointer ${
                        hierarchyMode === "intentional"
                          ? "border-[#a9ddf0] bg-[#a9ddf0]/15 text-[#a9ddf0] font-semibold"
                          : "border-white/[0.08] text-[#89919d]"
                      }`}
                    >
                      Intentional (Cold Standard)
                    </button>
                  </div>
                </div>

                {/* Specimen Card */}
                {hierarchyMode === "flat" ? (
                  <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center space-y-3 font-sans text-sm text-[#89919d]">
                    <div className="font-mono-code text-xs text-red-300 uppercase mb-2">
                      Notice: Low Contrast &bull; Flat Visual Weight &bull; Difficult to Scan
                    </div>
                    <div>medesy solution healthcare triage 2024 product designer</div>
                    <div>structured whatsapp-first triage gateway connecting patients to licensed physicians</div>
                    <div>eliminating waiting room friction and app installation barriers across nigerian clinics</div>
                    <div>view case study figma prototype live documentation</div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-[#a9ddf0]/30 bg-[#090b0f] p-8 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 font-mono-code text-xs">
                      <span className="text-[#a9ddf0] uppercase font-semibold">
                        (01) &mdash; Healthcare &amp; Conversational UX
                      </span>
                      <span className="text-[#89919d]">2024</span>
                    </div>

                    <h4 className="font-display text-2xl sm:text-3xl font-bold text-[#f2f1ec] tracking-tight">
                      MEDesy Solution
                    </h4>

                    <p className="text-base text-[#89919d] font-light leading-relaxed">
                      Structured WhatsApp-First Triage Gateway connecting patients to licensed physicians with zero app installation friction.
                    </p>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#FDFDFD] text-[#090b0f] font-mono-code text-xs font-semibold px-5 py-2.5 shadow-md">
                        <span>View Case Study</span>
                        <svg
                          viewBox="0 0 24 24"
                          width="13"
                          height="13"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </span>
                      <span className="font-mono-code text-xs text-[#89919d]">WCAG AAA 14.8:1</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="font-mono-code text-xs text-[#89919d] pt-6 border-t border-white/[0.08] mt-6">
                Status: {hierarchyMode === "intentional" ? "High eye-scanning velocity" : "High cognitive friction"}
              </div>
            </div>

            {/* Variable Typographic Tension Slider (6 cols) */}
            <div className="lg:col-span-6 rounded-3xl border border-white/[0.08] bg-[#11141b] p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
                  <span className="font-mono-code text-xs text-[#a9ddf0] uppercase font-semibold">
                    B &mdash; Variable Typography Tension
                  </span>
                  <span className="font-mono-code text-xs text-[#89919d]">Live Sliders</span>
                </div>

                {/* Sample Display */}
                <div className="rounded-2xl border border-white/[0.08] bg-[#090b0f] p-8 min-h-[140px] flex items-center justify-center text-center overflow-hidden mb-8">
                  <span
                    style={{
                      fontWeight: typeWeight,
                      letterSpacing: `${typeTracking}em`,
                    }}
                    className="font-display text-2xl sm:text-3xl text-[#f2f1ec] transition-all duration-75 block max-w-full"
                  >
                    {sampleHeadline}
                  </span>
                </div>

                {/* Sliders */}
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between font-mono-code text-xs mb-2">
                      <label htmlFor={weightSliderId} className="text-[#89919d]">
                        FONT WEIGHT (wght: 300 &mdash; 800)
                      </label>
                      <span className="text-[#a9ddf0] font-semibold">{typeWeight}</span>
                    </div>
                    <input
                      id={weightSliderId}
                      type="range"
                      min="300"
                      max="800"
                      step="50"
                      value={typeWeight}
                      onChange={(e) => {
                        setTypeWeight(Number(e.target.value));
                        if (soundEnabled) sound.playClick();
                      }}
                      className="w-full accent-[#a9ddf0] bg-white/10 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between font-mono-code text-xs mb-2">
                      <label htmlFor={trackingSliderId} className="text-[#89919d]">
                        LETTER TRACKING (em: -0.04 &mdash; +0.16)
                      </label>
                      <span className="text-[#a9ddf0] font-semibold">{typeTracking.toFixed(3)}em</span>
                    </div>
                    <input
                      id={trackingSliderId}
                      type="range"
                      min="-0.04"
                      max="0.16"
                      step="0.01"
                      value={typeTracking}
                      onChange={(e) => {
                        setTypeTracking(Number(e.target.value));
                        if (soundEnabled) sound.playClick();
                      }}
                      className="w-full accent-[#a9ddf0] bg-white/10 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Sample Preset Buttons */}
              <div className="flex flex-wrap gap-2 pt-6 border-t border-white/[0.08] mt-6">
                {[
                  "Structured WhatsApp-First Triage Gateway",
                  "Intercity Transit Booking & Hub Logistics",
                  "Atmospheric Coastal Hospitality Lookbook",
                ].map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => {
                      setSampleHeadline(sample);
                      if (soundEnabled) sound.playPop();
                    }}
                    className={`rounded-full px-3.5 py-1 font-mono-code text-[11px] border transition-colors cursor-pointer ${
                      sampleHeadline === sample
                        ? "border-[#a9ddf0] bg-[#a9ddf0]/10 text-[#a9ddf0]"
                        : "border-white/[0.08] text-[#89919d] hover:text-[#f2f1ec]"
                    }`}
                  >
                    {sample.split(" ")[0]}...
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ─────────────────────────────────────────────────────────────
          EXPERIMENT 04: INTERFACE ARCHITECTURE & HERO EXPLORATIONS
         ───────────────────────────────────────────────────────────── */}
      <ScrollReveal start="top 85%" y={24} duration={0.5}>
        <section aria-labelledby="exp4-title" className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/[0.08] pb-4 mb-10 gap-4">
            <div>
              <div className="font-mono-code text-xs text-[#a9ddf0] uppercase tracking-wider mb-1">
                EXPERIMENT 04 // INTERFACE ARCHITECTURE &amp; HERO STUDIES
              </div>
              <h2 id="exp4-title" className="font-display text-3xl font-bold text-[#f2f1ec]">
                Fidelity, Framing &amp; Hero Section Ergonomics
              </h2>
            </div>
            <p className="font-mono-code text-xs text-[#89919d] max-w-md">
              Instruction: Switch between the desktop real estate discovery hero and the institutional university redesign. Inspect high-resolution UI layers, problem statements, and responsive layout decisions.
            </p>
          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-[#11141b] p-6 sm:p-10">
            {/* Study Switcher & Mode Toggles */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.08] font-mono-code text-xs">
              {/* Study selector */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveStudy("real-estate");
                    if (soundEnabled) sound.playClick();
                  }}
                  className={`px-4 py-2 rounded-full border transition-all cursor-pointer ${
                    activeStudy === "real-estate"
                      ? "border-[#a9ddf0] bg-[#a9ddf0]/15 text-[#a9ddf0] font-semibold"
                      : "border-white/[0.08] text-[#89919d] hover:text-[#f2f1ec]"
                  }`}
                >
                  01 // Real Estate Hero Study
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveStudy("unimaid");
                    if (soundEnabled) sound.playClick();
                  }}
                  className={`px-4 py-2 rounded-full border transition-all cursor-pointer ${
                    activeStudy === "unimaid"
                      ? "border-[#a9ddf0] bg-[#a9ddf0]/15 text-[#a9ddf0] font-semibold"
                      : "border-white/[0.08] text-[#89919d] hover:text-[#f2f1ec]"
                  }`}
                >
                  02 // UniMaid Web Redesign
                </button>
              </div>

              {/* View tab selector */}
              <div className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] p-1">
                <button
                  type="button"
                  onClick={() => {
                    setStudyViewTab("preview");
                    if (soundEnabled) sound.playClick();
                  }}
                  className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                    studyViewTab === "preview"
                      ? "bg-[#FDFDFD] text-[#090b0f] font-semibold shadow-sm"
                      : "text-[#89919d] hover:text-[#f2f1ec]"
                  }`}
                >
                  Visual Preview
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStudyViewTab("breakdown");
                    if (soundEnabled) sound.playClick();
                  }}
                  className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                    studyViewTab === "breakdown"
                      ? "bg-[#FDFDFD] text-[#090b0f] font-semibold shadow-sm"
                      : "text-[#89919d] hover:text-[#f2f1ec]"
                  }`}
                >
                  System Specs
                </button>
              </div>
            </div>

            {/* Study Content */}
            {activeStudy === "real-estate" ? (
              <div>
                {studyViewTab === "preview" ? (
                  <div className="space-y-6">
                    <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#090b0f] border border-white/[0.08] shadow-2xl">
                      <Image
                        src="/images/lab/real-estate-hero.png"
                        alt="Clean and Elegant Real Estate Hero Section Design by Taye Abolarin"
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 1200px"
                      />
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4 font-mono-code text-xs text-[#89919d]">
                      <span>High-Resolution Presentation Canvas &bull; 2,800px Source</span>
                      <a
                        href="https://www.behance.net/gallery/205324419/Clean-and-Elegant-Real-Estate-Hero-Section-Design"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#a9ddf0] hover:underline inline-flex items-center gap-1"
                      >
                        <span>Original Behance Study</span>
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono-code text-xs">
                    <div className="space-y-6">
                      <div>
                        <span className="text-[#a9ddf0] uppercase font-semibold block mb-2">Design Concept &amp; Intent</span>
                        <p className="font-sans text-sm text-[#f2f1ec] font-light leading-relaxed">
                          Designed with the end-user in mind, this hero section for a modern real estate platform balances architectural elegance with rapid functional search. The layout prioritizes visual immersion while keeping location, property type, price filtering, and contact actions immediately accessible.
                        </p>
                      </div>
                      <div className="rounded-2xl bg-[#090b0f] border border-white/[0.06] p-5 space-y-3">
                        <span className="text-[#a9ddf0] font-semibold block uppercase">Layout Specifications</span>
                        <div className="flex justify-between border-b border-white/[0.04] pb-2">
                          <span className="text-[#89919d]">GRID MATRIX:</span>
                          <span className="text-[#f2f1ec]">12-Column Responsive Layout</span>
                        </div>
                        <div className="flex justify-between border-b border-white/[0.04] pb-2">
                          <span className="text-[#89919d]">TYPOGRAPHY:</span>
                          <span className="text-[#f2f1ec]">Clean High-Contrast Display &amp; Sans</span>
                        </div>
                        <div className="flex justify-between border-b border-white/[0.04] pb-2">
                          <span className="text-[#89919d]">ACCENT COLOR:</span>
                          <span className="text-[#FF5722]">#FF5722 (Warm Terracotta Accent)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#89919d]">TOOLS USED:</span>
                          <span className="text-[#f2f1ec]">Figma &amp; Adobe Photoshop</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <span className="text-[#a9ddf0] uppercase font-semibold block mb-2">Ergonomic Decisions</span>
                        <ul className="space-y-3 font-sans text-sm text-[#89919d] font-light">
                          <li className="flex items-start gap-2">
                            <span className="text-[#a9ddf0] font-bold mt-1">&bull;</span>
                            <span><strong>Instant Filter Dock:</strong> Buy / Sell / Rent segmentation placed directly in line with location and price inputs to eliminate drop-off.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#a9ddf0] font-bold mt-1">&bull;</span>
                            <span><strong>Atmospheric Architectural Photography:</strong> Dusk architectural facade establishes premium credibility while preserving text legibility via scrim overlays.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#a9ddf0] font-bold mt-1">&bull;</span>
                            <span><strong>Uncluttered Header:</strong> Direct utility navigation with high-priority orange Contact CTA anchoring the top right.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {studyViewTab === "preview" ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#090b0f] border border-white/[0.08] shadow-2xl">
                        <Image
                          src="/images/lab/unimaid-hero.png"
                          alt="University of Maiduguri Landing Page Redesign Mockup"
                          fill
                          className="object-contain"
                          sizes="(max-width: 1024px) 100vw, 600px"
                        />
                      </div>
                      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#090b0f] border border-white/[0.08] shadow-2xl">
                        <Image
                          src="/images/lab/unimaid-story.png"
                          alt="University of Maiduguri Problem Statement and Solution Story"
                          fill
                          className="object-contain"
                          sizes="(max-width: 1024px) 100vw, 600px"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4 font-mono-code text-xs text-[#89919d]">
                      <span>Institutional Academic Redesign &bull; Higher Education UX</span>
                      <a
                        href="https://www.behance.net/gallery/209032475/University-of-Maiduguri-Landing-Page-Re-design"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#a9ddf0] hover:underline inline-flex items-center gap-1"
                      >
                        <span>Original Behance Study</span>
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono-code text-xs">
                    <div className="space-y-6">
                      <div>
                        <span className="text-[#a9ddf0] uppercase font-semibold block mb-2">Project Story &amp; Objective</span>
                        <p className="font-sans text-sm text-[#f2f1ec] font-light leading-relaxed">
                          The University of Maiduguri&apos;s digital gateway serves as the primary touchpoint for prospective applicants, enrolled students, faculty, and research partners. The redesign transformed a cluttered, outdated web presence into a clean, intuitive, and modern institutional portal that prioritizes accessibility and clear navigation.
                        </p>
                      </div>
                      <div className="rounded-2xl bg-[#090b0f] border border-white/[0.06] p-5 space-y-3">
                        <span className="text-[#a9ddf0] font-semibold block uppercase">Core Academic Problems Solved</span>
                        <div className="border-b border-white/[0.04] pb-2 text-[#89919d]">
                          <strong className="text-[#f2f1ec]">Cluttered Layout:</strong> Key academic schedules, faculty lists, and admission notices were buried beneath unorganized blocks.
                        </div>
                        <div className="border-b border-white/[0.04] pb-2 text-[#89919d]">
                          <strong className="text-[#f2f1ec]">Navigation Roadblocks:</strong> Students struggled to find portal links, examination schedules, and faculty resources.
                        </div>
                        <div className="text-[#89919d]">
                          <strong className="text-[#f2f1ec]">Outdated Aesthetics:</strong> Modernized typography and brand identity to reflect the university&apos;s true standard of excellence.
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <span className="text-[#a9ddf0] uppercase font-semibold block mb-2">Institutional Architecture</span>
                        <ul className="space-y-3 font-sans text-sm text-[#89919d] font-light">
                          <li className="flex items-start gap-2">
                            <span className="text-[#a9ddf0] font-bold mt-1">&bull;</span>
                            <span><strong>Streamlined Admissions Funnel:</strong> Prominent &ldquo;Apply Now&rdquo; callouts with clear academic requirements and fee schedules.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#a9ddf0] font-bold mt-1">&bull;</span>
                            <span><strong>Dual Portal Access:</strong> Direct links for staff and student login positioned above the primary navigation bar.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#a9ddf0] font-bold mt-1">&bull;</span>
                            <span><strong>Multi-Device Accessibility:</strong> Tested for mobile readability to ensure reliable access on low-bandwidth student networks.</span>
                          </li>
                        </ul>
                      </div>
                      <div className="rounded-2xl bg-[#090b0f] border border-white/[0.06] p-4 flex justify-between items-center text-[#89919d]">
                        <span>DESIGN TOOLS:</span>
                        <span className="text-[#f2f1ec]">Figma &bull; Photoshop &bull; Figjam &bull; Google Meet</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </ScrollReveal>

      {/* ─────────────────────────────────────────────────────────────
          COHERENT CLOSING SECTION
         ───────────────────────────────────────────────────────────── */}
      <ScrollReveal start="top 88%" y={20} duration={0.45}>
        <section className="rounded-3xl border border-white/[0.08] bg-[#11141b] p-8 sm:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 font-mono-code text-xs">
          <div className="max-w-2xl">
            <span className="text-[#a9ddf0] uppercase font-semibold block mb-2 tracking-wider">
              Playground Synthesis &bull; Cold Designer
            </span>
            <p className="text-base text-[#89919d] font-sans font-light leading-relaxed">
              Design is the sum of a thousand invisible decisions. When interfaces feel effortless and intuitive, it is because state, feedback, density, and hierarchy were deliberately engineered.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto shrink-0">
            <Link
              href="/work"
              onClick={() => sound.playClick()}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FDFDFD] text-[#090b0f] px-6 py-3.5 font-semibold hover:bg-[#a9ddf0] transition-colors whitespace-nowrap cursor-pointer shadow-lg"
            >
              <span>Explore Selected Work</span>
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
            </Link>

            <a
              href="mailto:abolarintaye20@gmail.com"
              onClick={() => sound.playClick()}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-5 py-3.5 text-[#f2f1ec] hover:border-[#a9ddf0] hover:text-[#a9ddf0] transition-colors whitespace-nowrap"
            >
              <span>Start Direct Dialogue</span>
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
            </a>
          </div>
        </section>
      </ScrollReveal>
    </div>
    </main>
  );
}

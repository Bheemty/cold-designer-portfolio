"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { sound } from "@/lib/sounds";
import { Volume2, VolumeX, Sparkles, Check, ArrowUpRight, Sun, Moon, Clock } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function LabChapterBreak() {
  // ── Instrument 1 State: Async Lifecycle Button ──
  const [lifecycleState, setLifecycleState] = useState<"idle" | "loading" | "success">("idle");
  const [density, setDensity] = useState<"spacious" | "compact">("spacious");
  const [sfxOn, setSfxOn] = useState(true);

  const handleTriggerLifecycle = () => {
    if (lifecycleState !== "idle") return;
    setLifecycleState("loading");
    if (sfxOn) sound.playClick();

    setTimeout(() => {
      setLifecycleState("success");
      if (sfxOn) sound.playChime(660, 0.25);

      setTimeout(() => {
        setLifecycleState("idle");
      }, 1800);
    }, 900);
  };

  // ── Instrument 2 State: Circadian Daylight Slider ──
  const [timeHour, setTimeHour] = useState(18); // Default to Golden Hour (18:00)

  const getSunlightSpec = (hour: number) => {
    if (hour >= 6 && hour < 11) {
      return {
        label: "Dawn & Morning",
        kelvin: "4200K",
        angle: "28° East",
        bg: "linear-gradient(135deg, rgba(254, 215, 170, 0.15), rgba(186, 230, 253, 0.08))",
        color: "#FED7AA",
      };
    }
    if (hour >= 11 && hour < 16) {
      return {
        label: "Direct Solar Noon",
        kelvin: "5600K",
        angle: "76° Overhead",
        bg: "linear-gradient(135deg, rgba(224, 242, 254, 0.2), rgba(254, 243, 199, 0.1))",
        color: "#E0F2FE",
      };
    }
    if (hour >= 16 && hour < 20) {
      return {
        label: "Golden Hour Sunset",
        kelvin: "3000K",
        angle: "14° West",
        bg: "linear-gradient(135deg, rgba(251, 146, 60, 0.22), rgba(217, 70, 239, 0.1))",
        color: "#FB923C",
      };
    }
    return {
      label: "Astronomical Twilight",
      kelvin: "2200K",
      angle: "Sub-horizon",
      bg: "linear-gradient(135deg, rgba(15, 23, 42, 0.4), rgba(30, 41, 59, 0.3))",
      color: "#94A3B8",
    };
  };

  const currentSun = getSunlightSpec(timeHour);

  return (
    <section
      id="playground"
      className="relative w-full border-t border-b border-white/[0.12] bg-[#0B0D10] text-[#F2EFE8] overflow-hidden"
      aria-label="COLD // Interactive R&D Lab"
    >
      {/* Invisible anchor aliases for backwards compatibility */}
      <span id="lab" className="sr-only" tabIndex={-1} aria-hidden="true" />
      <span id="codex" className="sr-only" tabIndex={-1} aria-hidden="true" />

      {/* Ambient Deep Glow */}
      <div
        className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-[var(--accent,#38bdf8)]/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 py-24 sm:py-32">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 border-b border-white/[0.10]">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent,#38bdf8)] animate-pulse" aria-hidden="true" />
              <p className="font-mono-code text-xs uppercase tracking-widest text-[var(--accent,#38bdf8)] m-0">
                (03) &mdash; R&amp;D Lab // Interactive Studies
              </p>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F2EFE8] leading-tight break-words m-0">
              Creative Journal &amp; Interactive Lab.
            </h2>

            <p className="font-sans text-base sm:text-lg text-[#89919d] font-light leading-relaxed mt-4 max-w-2xl m-0">
              Direct interface studies exploring tactile micro-interactions, circadian daylight calculations, and single-payload conversational commerce.
            </p>
          </div>

          <div className="shrink-0">
            <MagneticButton maxDistance={8} strength={0.25}>
              <Link
                href="/lab"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.16] bg-white/[0.04] px-6 py-3 font-mono-code text-xs font-semibold text-[#F2EFE8] hover:border-[var(--accent,#38bdf8)] hover:text-[var(--accent,#38bdf8)] transition-all shadow-md cursor-pointer"
              >
                <span>Explore Full Lab (4 Studies)</span>
                <ArrowUpRight size={14} />
              </Link>
            </MagneticButton>
          </div>
        </div>

        {/* Instrument Panel Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12 items-stretch">
          
          {/* ── INSTRUMENT 01: Async Feedback Lifecycle (7 Cols) ── */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-white/[0.12] bg-[#11141b]/80 p-6 sm:p-10 backdrop-blur-sm">
            <div>
              {/* Instrument Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6 font-mono-code text-xs">
                <span className="text-[var(--accent,#38bdf8)] font-semibold uppercase tracking-wider">
                  Instrument 01 // Interaction Studio
                </span>
                <span className="text-[#89919d]">Tactile Feedback Engine</span>
              </div>

              <h3 className="font-display text-2xl font-bold text-[#F2EFE8] mb-2 m-0">
                Async Action Feedback Lifecycle
              </h3>
              <p className="font-sans text-sm text-[#89919d] font-light leading-relaxed mb-8 m-0">
                Testing button state transitions, auditory feedback thresholds, and optical density configurations.
              </p>

              {/* Controls Toolbar */}
              <div className="flex flex-wrap items-center gap-4 mb-8 font-mono-code text-xs">
                <div className="flex items-center gap-1.5 rounded-full border border-white/[0.10] bg-white/[0.03] p-1">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playPop();
                      setDensity("spacious");
                    }}
                    className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${
                      density === "spacious"
                        ? "bg-white/[0.12] text-[#F2EFE8] font-semibold"
                        : "text-[#89919d] hover:text-[#F2EFE8]"
                    }`}
                  >
                    Spacious
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playPop();
                      setDensity("compact");
                    }}
                    className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${
                      density === "compact"
                        ? "bg-white/[0.12] text-[#F2EFE8] font-semibold"
                        : "text-[#89919d] hover:text-[#F2EFE8]"
                    }`}
                  >
                    Compact
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setSfxOn(!sfxOn)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.03] px-3.5 py-1.5 text-xs text-[#89919d] hover:text-[#F2EFE8] transition-colors cursor-pointer"
                >
                  {sfxOn ? <Volume2 size={13} className="text-[var(--accent,#38bdf8)]" /> : <VolumeX size={13} />}
                  <span>Audio: {sfxOn ? "ON" : "OFF"}</span>
                </button>
              </div>

              {/* Live Test Bed */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#090b0f] p-8 flex flex-col items-center justify-center min-h-[160px] text-center">
                <button
                  type="button"
                  onClick={handleTriggerLifecycle}
                  disabled={lifecycleState !== "idle"}
                  className={`cursor-pointer rounded-full font-mono-code font-semibold transition-all duration-300 flex items-center gap-2.5 shadow-lg ${
                    density === "spacious" ? "px-8 py-4 text-sm" : "px-6 py-2.5 text-xs"
                  } ${
                    lifecycleState === "loading"
                      ? "bg-white/[0.15] text-[#89919d] cursor-wait"
                      : lifecycleState === "success"
                      ? "bg-emerald-500 text-[#090b0f]"
                      : "bg-[#F2EFE8] text-[#090b0f] hover:bg-[var(--accent,#38bdf8)]"
                  }`}
                >
                  {lifecycleState === "loading" && (
                    <span className="h-4 w-4 rounded-full border-2 border-[#89919d] border-t-transparent animate-spin" />
                  )}
                  {lifecycleState === "success" && <Check size={16} strokeWidth={2.5} />}
                  <span>
                    {lifecycleState === "loading"
                      ? "Committing State..."
                      : lifecycleState === "success"
                      ? "Verified ✓"
                      : "Simulate Checkout Action"}
                  </span>
                </button>

                <p className="font-mono-code text-[11px] text-[#89919d]/70 mt-4 m-0">
                  {lifecycleState === "idle" && "[Click button to observe state lifecycle]"}
                  {lifecycleState === "loading" && "[900ms simulated network latency]"}
                  {lifecycleState === "success" && "[660Hz harmonic audio verification chime]"}
                </p>
              </div>
            </div>

            {/* Telemetry Readout */}
            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between font-mono-code text-[11px] text-[#89919d]">
              <span>Active State: <strong className="text-[#F2EFE8]">{lifecycleState.toUpperCase()}</strong></span>
              <span>Density: <strong className="text-[#F2EFE8]">{density.toUpperCase()}</strong></span>
            </div>
          </div>

          {/* ── INSTRUMENT 02 & 03 (5 Cols) ── */}
          <div className="lg:col-span-5 flex flex-col gap-8 justify-between">
            
            {/* Instrument 02: Circadian Sunlight Study */}
            <div className="rounded-3xl border border-white/[0.12] bg-[#11141b]/80 p-6 sm:p-8 backdrop-blur-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-5 font-mono-code text-xs">
                  <span className="text-[var(--accent,#38bdf8)] font-semibold uppercase tracking-wider">
                    Instrument 02 // Daylight UI
                  </span>
                  <span className="text-[#89919d]">Spatial Angle</span>
                </div>

                <h4 className="font-display text-xl font-bold text-[#F2EFE8] mb-2 m-0">
                  Circadian Light Angle Calculation
                </h4>
                <p className="font-sans text-xs text-[#89919d] font-light leading-relaxed mb-6 m-0">
                  Dynamic solar Kelvin temperature based on real-world suite illumination.
                </p>

                {/* Daylight Display Specimen */}
                <div
                  className="rounded-2xl border border-white/[0.08] p-5 mb-5 transition-all duration-500"
                  style={{ background: currentSun.bg }}
                >
                  <div className="flex items-center justify-between font-mono-code text-xs mb-2">
                    <span className="flex items-center gap-1.5" style={{ color: currentSun.color }}>
                      <Clock size={13} />
                      <strong>{String(timeHour).padStart(2, "0")}:00 WAT</strong>
                    </span>
                    <span className="text-[#F2EFE8] font-semibold">{currentSun.label}</span>
                  </div>
                  <div className="flex items-center justify-between font-mono-code text-[11px] text-[#89919d]">
                    <span>Temperature: <strong className="text-[#F2EFE8]">{currentSun.kelvin}</strong></span>
                    <span>Sun Angle: <strong className="text-[#F2EFE8]">{currentSun.angle}</strong></span>
                  </div>
                </div>

                {/* Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between font-mono-code text-[11px] text-[#89919d]">
                    <span>06:00 Dawn</span>
                    <span>12:00 Noon</span>
                    <span>18:00 Golden</span>
                    <span>23:00 Night</span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="23"
                    value={timeHour}
                    onChange={(e) => {
                      sound.playTick();
                      setTimeHour(Number(e.target.value));
                    }}
                    className="w-full h-1.5 bg-white/[0.12] rounded-lg appearance-none cursor-pointer accent-[var(--accent,#38bdf8)]"
                    aria-label="Adjust circadian daylight hour"
                  />
                </div>
              </div>
            </div>

            {/* Instrument 03: Micro-Commerce Chat Payloads */}
            <div className="rounded-3xl border border-white/[0.12] bg-[#11141b]/80 p-6 sm:p-8 backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-5 font-mono-code text-xs">
                <span className="text-[var(--accent,#38bdf8)] font-semibold uppercase tracking-wider">
                  Instrument 03 // Commerce Flow
                </span>
                <span className="text-[#89919d]">WhatsApp Payload</span>
              </div>

              <h4 className="font-display text-xl font-bold text-[#F2EFE8] mb-2 m-0">
                Single-Payload Conversational Links
              </h4>
              <p className="font-sans text-xs text-[#89919d] font-light leading-relaxed mb-4 m-0">
                Eliminating cart checkout drop-off by bundling SKU selections, sizing, and payment instructions into a single encrypted URL payload.
              </p>

              <div className="rounded-xl border border-white/[0.08] bg-[#090b0f] p-3.5 font-mono-code text-xs text-[#89919d] flex items-center justify-between">
                <span className="text-[var(--accent,#38bdf8)] truncate pr-2">
                  buy.buddy/p/lagos-merch?sku=44&amp;size=XL&amp;split=2
                </span>
                <span className="rounded bg-white/[0.06] px-2 py-0.5 text-[10px] text-[#F2EFE8] shrink-0">
                  1-Tap Checkout
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

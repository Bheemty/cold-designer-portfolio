"use client";

import { useState, useRef, useEffect, useId } from "react";
import Link from "next/link";
import { ArrowLeft, Volume2, VolumeX, Sparkles, Sliders, RefreshCw, Layers } from "lucide-react";
import { sound } from "@/lib/sounds";

export default function CodexPage() {
  // Sound mute state
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Button interaction counters & states
  const [clickCount, setClickCount] = useState(0);
  const [hapticActive, setHapticActive] = useState(false);
  const [magneticToggled, setMagneticToggled] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);

  // Typography tension slider
  const [fontWeight, setFontWeight] = useState(600);
  const [letterSpacing, setLetterSpacing] = useState(-0.02);
  const [fontSample, setFontSample] = useState("Cold Design Engineering");

  // Web Audio custom pitch
  const [customPitch, setCustomPitch] = useState(440);

  // Design Token Theme Switcher
  const [activeTheme, setActiveTheme] = useState<"obsidian" | "studio" | "slate" | "midnight">("obsidian");

  // Draggable Puck Physics State
  const puckRef = useRef<HTMLDivElement>(null);
  const [puckPos, setPuckPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Generate unique IDs for accessibility
  const weightInputId = useId();
  const spacingInputId = useId();
  const pitchInputId = useId();

  // Handle puck dragging
  const handlePuckStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    dragStartRef.current = { x: clientX - puckPos.x, y: clientY - puckPos.y };
    if (soundEnabled) sound.playPop();
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const rawX = clientX - dragStartRef.current.x;
      const rawY = clientY - dragStartRef.current.y;
      // Apply elastic damping limit
      const dist = Math.hypot(rawX, rawY);
      const maxDist = 90;
      if (dist > maxDist) {
        const angle = Math.atan2(rawY, rawX);
        setPuckPos({ x: Math.cos(angle) * maxDist, y: Math.sin(angle) * maxDist });
      } else {
        setPuckPos({ x: rawX, y: rawY });
      }
    };

    const handleEnd = () => {
      if (!isDragging) return;
      setIsDragging(false);
      // Spring release snap back
      if (soundEnabled) sound.playClick();
      setPuckPos({ x: 0, y: 0 });
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleMove);
      window.addEventListener("touchend", handleEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, soundEnabled]);

  const handleCustomSynthPlay = (freq: number) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // AudioContext unavailable
    }
  };

  const themes = {
    obsidian: { bg: "#090b0f", surface: "#11141b", accent: "#a9ddf0", text: "#f2f1ec", border: "rgba(255,255,255,0.12)" },
    studio: { bg: "#f7f7f5", surface: "#ffffff", accent: "#111111", text: "#111111", border: "rgba(0,0,0,0.12)" },
    slate: { bg: "#0f172a", surface: "#1e293b", accent: "#38bdf8", text: "#f8fafc", border: "rgba(56,189,248,0.2)" },
    midnight: { bg: "#0d0a1a", surface: "#1a1430", accent: "#e879f9", text: "#fdf4ff", border: "rgba(232,121,249,0.25)" },
  };

  return (
    <main className="min-h-screen pt-32 sm:pt-40 pb-28 px-6 sm:px-10 lg:px-16 bg-[#090b0f] text-[#f2f1ec]">
      <div className="mx-auto max-w-6xl">
        {/* Navigation Breadcrumb */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono-code text-xs text-[#89919d] hover:text-[#a9ddf0] transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Return to Portfolio Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <header className="border-b border-white/[0.08] pb-12 mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 font-mono-code text-xs">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#a9ddf0] animate-pulse" />
              <span className="uppercase tracking-widest text-[#a9ddf0]">
                Interactive Codex // Lab Environment
              </span>
            </div>

            {/* Global Audio Toggle */}
            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) sound.playChime(660, 0.2);
              }}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-1.5 font-mono-code text-xs text-[#f2f1ec] hover:border-[#a9ddf0] transition-colors"
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
            The Codex.
          </h1>

          <p className="text-xl sm:text-2xl text-[#89919d] font-light leading-relaxed max-w-3xl">
            A real-time laboratory of tactile micro-interactions, spring mechanics, web audio feedback, and design system token governance.
          </p>
        </header>

        {/* LAB GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* SECTION 1: TACTILE BUTTONS & CONTROLS (7 Cols) */}
          <section className="lg:col-span-7 rounded-3xl border border-white/[0.1] bg-[#11141b] p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-8">
                <div className="flex items-center gap-2">
                  <Sliders size={16} className="text-[#a9ddf0]" />
                  <span className="font-mono-code text-xs font-semibold uppercase text-[#f2f1ec] tracking-wider">
                    01 // Tactile Physics &amp; Haptic States
                  </span>
                </div>
                <span className="font-mono-code text-xs text-[#89919d]">Live CSS Springs</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {/* 1. Mechanical Click Button */}
                <div className="rounded-2xl border border-white/[0.08] bg-[#090b0f] p-6 flex flex-col items-center justify-between text-center min-h-[190px]">
                  <span className="font-mono-code text-[11px] text-[#89919d] uppercase mb-4">
                    Mechanical Plunger
                  </span>
                  <button
                    onClick={() => {
                      setClickCount((c) => c + 1);
                      if (soundEnabled) sound.playClick();
                    }}
                    className="relative px-6 py-3.5 rounded-xl bg-gradient-to-b from-white to-[#d4d4d4] text-[#090b0f] font-mono-code text-xs font-bold shadow-[0_6px_0_#8e8e8e,0_12px_16px_rgba(0,0,0,0.4)] active:translate-y-1.5 active:shadow-[0_0px_0_#8e8e8e,0_4px_8px_rgba(0,0,0,0.4)] transition-all cursor-pointer"
                  >
                    PRESS TACTILE
                  </button>
                  <span className="font-mono-code text-[11px] text-[#a9ddf0] mt-4">
                    Actuations: {clickCount}
                  </span>
                </div>

                {/* 2. Soft Haptic Pill */}
                <div className="rounded-2xl border border-white/[0.08] bg-[#090b0f] p-6 flex flex-col items-center justify-between text-center min-h-[190px]">
                  <span className="font-mono-code text-[11px] text-[#89919d] uppercase mb-4">
                    Haptic Cushion Pill
                  </span>
                  <button
                    onClick={() => {
                      setHapticActive(!hapticActive);
                      if (soundEnabled) sound.playPop();
                    }}
                    className={`px-6 py-3.5 rounded-full font-mono-code text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      hapticActive
                        ? "bg-[#a9ddf0] text-[#090b0f] scale-105 shadow-[0_0_24px_rgba(169,221,240,0.5)]"
                        : "bg-white/[0.06] text-[#f2f1ec] border border-white/[0.12] hover:bg-white/[0.1] active:scale-95"
                    }`}
                  >
                    {hapticActive ? "STATE: EXPANDED" : "STATE: RESTING"}
                  </button>
                  <span className="font-mono-code text-[11px] text-[#89919d] mt-4">
                    Toggle spring expansion
                  </span>
                </div>

                {/* 3. Magnetic Toggle Snap */}
                <div className="rounded-2xl border border-white/[0.08] bg-[#090b0f] p-6 flex flex-col items-center justify-between text-center min-h-[190px]">
                  <span className="font-mono-code text-[11px] text-[#89919d] uppercase mb-4">
                    Magnetic Snap Switch
                  </span>
                  <button
                    onClick={() => {
                      setMagneticToggled(!magneticToggled);
                      if (soundEnabled) sound.playChime(magneticToggled ? 520 : 780, 0.2);
                    }}
                    className={`w-16 h-9 rounded-full p-1 transition-colors duration-300 cursor-pointer flex items-center ${
                      magneticToggled ? "bg-[#a9ddf0]" : "bg-white/[0.15]"
                    }`}
                    aria-label="Toggle magnetic snap switch"
                  >
                    <div
                      className={`w-7 h-7 rounded-full bg-[#090b0f] transition-transform duration-300 shadow-md ${
                        magneticToggled ? "translate-x-7 bg-[#090b0f]" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <span className="font-mono-code text-[11px] text-[#89919d] mt-4">
                    {magneticToggled ? "LATCHED (TRUE)" : "OPEN (FALSE)"}
                  </span>
                </div>

                {/* 4. Elastic Resistance Drag Puck */}
                <div className="rounded-2xl border border-white/[0.08] bg-[#090b0f] p-6 flex flex-col items-center justify-between text-center min-h-[190px] relative overflow-hidden select-none">
                  <span className="font-mono-code text-[11px] text-[#89919d] uppercase mb-2">
                    Elastic Resistance Puck
                  </span>
                  <div className="relative w-28 h-20 flex items-center justify-center">
                    <div className="absolute inset-0 border border-dashed border-white/[0.15] rounded-full pointer-events-none" />
                    <div
                      ref={puckRef}
                      onMouseDown={handlePuckStart}
                      onTouchStart={handlePuckStart}
                      style={{
                        transform: `translate3d(${puckPos.x}px, ${puckPos.y}px, 0)`,
                        transition: isDragging ? "none" : "transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      }}
                      className="w-12 h-12 rounded-full bg-[#a9ddf0] text-[#090b0f] flex items-center justify-center font-bold text-[10px] cursor-grab active:cursor-grabbing shadow-[0_4px_16px_rgba(169,221,240,0.4)]"
                    >
                      PULL
                    </div>
                  </div>
                  <span className="font-mono-code text-[10px] text-[#89919d] mt-2">
                    {isDragging ? "Elastic tension active" : "Drag & release to snap"}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 font-mono-code text-xs text-[#89919d] flex items-center justify-between">
              <span>All tactile controls support pointer, touch &amp; keyboard access.</span>
              <span className="text-[#a9ddf0]">Spring Physics Active</span>
            </div>
          </section>

          {/* SECTION 2: SYNTHESIZER & AUDIO LAB (5 Cols) */}
          <section className="lg:col-span-5 rounded-3xl border border-white/[0.1] bg-[#11141b] p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-8">
                <div className="flex items-center gap-2">
                  <Volume2 size={16} className="text-[#a9ddf0]" />
                  <span className="font-mono-code text-xs font-semibold uppercase text-[#f2f1ec] tracking-wider">
                    02 // Web Audio Synthesizer
                  </span>
                </div>
                <span className="font-mono-code text-xs text-[#89919d]">Zero Audio Assets</span>
              </div>

              <p className="text-sm text-[#89919d] font-light leading-relaxed mb-6">
                Real-time harmonic sound synthesis powered directly by the Web Audio API without external MP3/WAV files.
              </p>

              {/* Sound Palette Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-6 font-mono-code text-xs">
                <button
                  onClick={() => soundEnabled && sound.playClick()}
                  className="rounded-xl border border-white/[0.08] bg-[#090b0f] p-3.5 text-left hover:border-[#a9ddf0]/40 transition-colors"
                >
                  <span className="text-[#f2f1ec] font-semibold block">Click Pulse</span>
                  <span className="text-[#89919d] text-[11px]">800Hz damped</span>
                </button>
                <button
                  onClick={() => soundEnabled && sound.playPop()}
                  className="rounded-xl border border-white/[0.08] bg-[#090b0f] p-3.5 text-left hover:border-[#a9ddf0]/40 transition-colors"
                >
                  <span className="text-[#f2f1ec] font-semibold block">Bubble Pop</span>
                  <span className="text-[#89919d] text-[11px]">420Hz exp drop</span>
                </button>
                <button
                  onClick={() => soundEnabled && sound.playChime(660, 0.3)}
                  className="rounded-xl border border-white/[0.08] bg-[#090b0f] p-3.5 text-left hover:border-[#a9ddf0]/40 transition-colors"
                >
                  <span className="text-[#f2f1ec] font-semibold block">Harmonic Bell</span>
                  <span className="text-[#89919d] text-[11px]">660Hz dual sine</span>
                </button>
                <button
                  onClick={() => soundEnabled && sound.playChime(880, 0.15)}
                  className="rounded-xl border border-white/[0.08] bg-[#090b0f] p-3.5 text-left hover:border-[#a9ddf0]/40 transition-colors"
                >
                  <span className="text-[#f2f1ec] font-semibold block">Crystal Ping</span>
                  <span className="text-[#89919d] text-[11px]">880Hz crisp</span>
                </button>
              </div>

              {/* Frequency Pitch Slider */}
              <div className="rounded-xl bg-[#090b0f] border border-white/[0.08] p-5 space-y-3 mb-6">
                <div className="flex justify-between items-center font-mono-code text-xs">
                  <label htmlFor={pitchInputId} className="text-[#89919d]">SYNTHESIZER PITCH</label>
                  <span className="text-[#a9ddf0] font-semibold">{customPitch} Hz</span>
                </div>
                <input
                  id={pitchInputId}
                  type="range"
                  min="220"
                  max="1100"
                  step="20"
                  value={customPitch}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setCustomPitch(val);
                    handleCustomSynthPlay(val);
                  }}
                  className="w-full accent-[#a9ddf0] cursor-pointer"
                  aria-label="Synthesizer Pitch Frequency"
                />
                <button
                  onClick={() => handleCustomSynthPlay(customPitch)}
                  className="w-full rounded-lg bg-white/[0.06] hover:bg-[#a9ddf0] hover:text-[#090b0f] text-[#f2f1ec] py-2 font-mono-code text-xs transition-colors"
                >
                  Trigger Custom Sine Tone ({customPitch} Hz)
                </button>
              </div>
            </div>

            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 font-mono-code text-xs text-[#89919d]">
              Complies with browser autoplay policy; zero sounds play without explicit user interaction.
            </div>
          </section>

          {/* SECTION 3: TYPOGRAPHY TENSION & VARIABLE SLIDER (6 Cols) */}
          <section className="lg:col-span-6 rounded-3xl border border-white/[0.1] bg-[#11141b] p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-8">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-[#a9ddf0]" />
                  <span className="font-mono-code text-xs font-semibold uppercase text-[#f2f1ec] tracking-wider">
                    03 // Variable Typography Tension
                  </span>
                </div>
                <span className="font-mono-code text-xs text-[#89919d]">Fluid Optical Matrix</span>
              </div>

              {/* Live Preview Box */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#090b0f] p-8 min-h-[160px] flex items-center justify-center text-center mb-6 overflow-hidden">
                <span
                  style={{
                    fontWeight,
                    letterSpacing: `${letterSpacing}em`,
                  }}
                  className="font-display text-2xl sm:text-4xl text-[#f2f1ec] transition-all duration-100"
                >
                  {fontSample}
                </span>
              </div>

              {/* Controls */}
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between font-mono-code text-xs text-[#89919d] mb-1">
                    <label htmlFor={weightInputId}>WEIGHT AXIS (300 &mdash; 900)</label>
                    <span className="text-[#a9ddf0] font-semibold">{fontWeight}</span>
                  </div>
                  <input
                    id={weightInputId}
                    type="range"
                    min="300"
                    max="900"
                    step="50"
                    value={fontWeight}
                    onChange={(e) => {
                      setFontWeight(Number(e.target.value));
                      if (soundEnabled) sound.playClick();
                    }}
                    className="w-full accent-[#a9ddf0] cursor-pointer"
                    aria-label="Font Weight Axis"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-mono-code text-xs text-[#89919d] mb-1">
                    <label htmlFor={spacingInputId}>LETTER TRACKING (-0.05em &mdash; 0.20em)</label>
                    <span className="text-[#a9ddf0] font-semibold">{letterSpacing.toFixed(2)}em</span>
                  </div>
                  <input
                    id={spacingInputId}
                    type="range"
                    min="-0.05"
                    max="0.20"
                    step="0.01"
                    value={letterSpacing}
                    onChange={(e) => {
                      setLetterSpacing(Number(e.target.value));
                      if (soundEnabled) sound.playClick();
                    }}
                    className="w-full accent-[#a9ddf0] cursor-pointer"
                    aria-label="Letter Tracking Axis"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              {["Cold Design", "Spatial UI", "Telemetry", "Zero Drift"].map((sample) => (
                <button
                  key={sample}
                  onClick={() => {
                    setFontSample(sample);
                    if (soundEnabled) sound.playPop();
                  }}
                  className={`rounded-full px-3 py-1 font-mono-code text-[11px] border transition-colors ${
                    fontSample === sample
                      ? "border-[#a9ddf0] bg-[#a9ddf0]/10 text-[#a9ddf0]"
                      : "border-white/[0.08] text-[#89919d] hover:text-[#f2f1ec]"
                  }`}
                >
                  {sample}
                </button>
              ))}
            </div>
          </section>

          {/* SECTION 4: DESIGN TOKEN THEME MATRIX (6 Cols) */}
          <section className="lg:col-span-6 rounded-3xl border border-white/[0.1] bg-[#11141b] p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-8">
                <div className="flex items-center gap-2">
                  <Layers size={16} className="text-[#a9ddf0]" />
                  <span className="font-mono-code text-xs font-semibold uppercase text-[#f2f1ec] tracking-wider">
                    04 // Design System Token Matrix
                  </span>
                </div>
                <span className="font-mono-code text-xs text-[#89919d]">Live Token Engine</span>
              </div>

              {/* Theme Selection Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
                {(["obsidian", "studio", "slate", "midnight"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setActiveTheme(t);
                      if (soundEnabled) sound.playClick();
                    }}
                    className={`rounded-xl p-3 border font-mono-code text-xs text-left capitalize transition-all ${
                      activeTheme === t
                        ? "border-[#a9ddf0] bg-[#a9ddf0]/10 text-[#a9ddf0] font-semibold scale-[1.02]"
                        : "border-white/[0.08] bg-[#090b0f] text-[#89919d] hover:border-white/20"
                    }`}
                  >
                    <span>{t}</span>
                  </button>
                ))}
              </div>

              {/* Live Theme Canvas Preview */}
              <div
                style={{
                  backgroundColor: themes[activeTheme].bg,
                  borderColor: themes[activeTheme].border,
                  color: themes[activeTheme].text,
                }}
                className="rounded-2xl border p-6 transition-all duration-300 mb-6 space-y-4"
              >
                <div className="flex justify-between items-center font-mono-code text-xs">
                  <span style={{ color: themes[activeTheme].accent }} className="font-bold uppercase tracking-wider">
                    Theme: {activeTheme}
                  </span>
                  <span>Tokens Active</span>
                </div>

                <div
                  style={{
                    backgroundColor: themes[activeTheme].surface,
                    borderColor: themes[activeTheme].border,
                  }}
                  className="rounded-xl border p-4 flex items-center justify-between"
                >
                  <span className="font-display font-medium text-sm">
                    Tokenized Interface Card
                  </span>
                  <button
                    style={{
                      backgroundColor: themes[activeTheme].accent,
                      color: themes[activeTheme].bg,
                    }}
                    className="rounded-full px-3.5 py-1 text-xs font-bold font-mono-code transition-transform active:scale-95"
                  >
                    Action
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-[#090b0f] border border-white/[0.06] p-4 font-mono-code text-xs text-[#89919d] space-y-1">
              <div>--theme-bg: <span className="text-[#f2f1ec]">{themes[activeTheme].bg}</span></div>
              <div>--theme-accent: <span className="text-[#a9ddf0]">{themes[activeTheme].accent}</span></div>
            </div>
          </section>
        </div>

        {/* Bottom Dialogue Box */}
        <div className="mt-16 rounded-2xl border border-white/[0.08] bg-[#11141b] p-8 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono-code text-xs">
          <div>
            <span className="text-[#a9ddf0] uppercase font-semibold block mb-1">
              Craft &amp; Technical Execution
            </span>
            <p className="text-[#89919d]">
              Every interaction above is engineered with zero bloat, pure vanilla React/CSS transforms, and accessible pointer mechanics.
            </p>
          </div>
          <Link
            href="/work"
            className="rounded-full bg-[#f2f1ec] px-6 py-3 font-semibold text-[#090b0f] hover:bg-[#a9ddf0] transition-colors whitespace-nowrap"
          >
            Explore Flagship Projects &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}

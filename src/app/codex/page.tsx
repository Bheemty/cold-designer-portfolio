"use client";

import { useState, useRef, useEffect, useId } from "react";
import Link from "next/link";
import { ArrowLeft, Volume2, VolumeX, Sliders, Layers } from "lucide-react";
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
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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

        {/* Page Header */}
        <header className="border-b border-white/[0.08] pb-12 mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 font-mono-code text-xs">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#a9ddf0] animate-pulse" />
              <span className="uppercase tracking-widest text-[#a9ddf0]">
                (01) &mdash; Creative Journal &amp; Codex // Interactive Laboratory
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
            Creative Journal &amp; Codex.
          </h1>

          <p className="text-xl sm:text-2xl text-[#89919d] font-light leading-relaxed max-w-3xl">
            A real-time laboratory of tactile micro-interactions, spring mechanics, Web Audio synthesizers, and design system token governance by Taye Abolarin.
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
                    type="button"
                    onClick={() => {
                      setClickCount((c) => c + 1);
                      if (soundEnabled) sound.playClick();
                    }}
                    className="relative px-6 py-3.5 rounded-xl bg-gradient-to-b from-white to-[#d4d4d4] text-[#090b0f] font-mono-code text-xs font-bold shadow-[0_6px_0_#8e8e8e,0_12px_16px_rgba(0,0,0,0.4)] active:translate-y-1.5 active:shadow-[0_0px_0_#8e8e8e,0_4px_8px_rgba(0,0,0,0.4)] transition-all cursor-pointer"
                  >
                    PRESS DOWN ({clickCount})
                  </button>
                  <span className="font-mono-code text-[10px] text-[#89919d] mt-4">
                    6px spring offset + low pop
                  </span>
                </div>

                {/* 2. Magnetic Toggle */}
                <div className="rounded-2xl border border-white/[0.08] bg-[#090b0f] p-6 flex flex-col items-center justify-between text-center min-h-[190px]">
                  <span className="font-mono-code text-[11px] text-[#89919d] uppercase mb-4">
                    Magnetic Snap State
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setMagneticToggled((m) => !m);
                      if (soundEnabled) sound.playChime(magneticToggled ? 520 : 680, 0.15);
                    }}
                    className={`relative w-20 h-10 rounded-full p-1 transition-colors duration-300 cursor-pointer ${
                      magneticToggled ? "bg-[#a9ddf0]" : "bg-white/10"
                    }`}
                    aria-label="Toggle magnetic state"
                  >
                    <div
                      className={`w-8 h-8 rounded-full bg-[#090b0f] shadow-md transition-transform duration-300 ease-out flex items-center justify-center ${
                        magneticToggled ? "translate-x-10 bg-[#090b0f]" : "translate-x-0 bg-white"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#a9ddf0]" />
                    </div>
                  </button>
                  <span className="font-mono-code text-[10px] text-[#89919d] mt-4">
                    Status: {magneticToggled ? "ENGAGED" : "DORMANT"}
                  </span>
                </div>

                {/* 3. Soft Haptic Cushion */}
                <div className="rounded-2xl border border-white/[0.08] bg-[#090b0f] p-6 flex flex-col items-center justify-between text-center min-h-[190px]">
                  <span className="font-mono-code text-[11px] text-[#89919d] uppercase mb-4">
                    Haptic Cushion
                  </span>
                  <button
                    type="button"
                    onMouseDown={() => {
                      setHapticActive(true);
                      if (soundEnabled) sound.playPop(340);
                    }}
                    onMouseUp={() => setHapticActive(false)}
                    onTouchStart={() => {
                      setHapticActive(true);
                      if (soundEnabled) sound.playPop(340);
                    }}
                    onTouchEnd={() => setHapticActive(false)}
                    className={`px-7 py-3 rounded-full border border-[#a9ddf0]/30 font-mono-code text-xs text-[#a9ddf0] transition-all duration-200 cursor-pointer ${
                      hapticActive
                        ? "scale-90 bg-[#a9ddf0]/20 shadow-[inset_0_4px_12px_rgba(0,0,0,0.6)]"
                        : "scale-100 bg-[#a9ddf0]/5 shadow-none"
                    }`}
                  >
                    {hapticActive ? "COMPRESSED" : "PRESS & HOLD"}
                  </button>
                  <span className="font-mono-code text-[10px] text-[#89919d] mt-4">
                    Sub-harmonic pitch shift
                  </span>
                </div>

                {/* 4. Pulse Generator */}
                <div className="rounded-2xl border border-white/[0.08] bg-[#090b0f] p-6 flex flex-col items-center justify-between text-center min-h-[190px]">
                  <span className="font-mono-code text-[11px] text-[#89919d] uppercase mb-4">
                    Harmonic Resonator
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setPulseCount((p) => p + 1);
                      if (soundEnabled) sound.playChime(440 + (pulseCount % 5) * 80, 0.25);
                    }}
                    className="relative w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:border-[#a9ddf0] hover:bg-[#a9ddf0]/10 transition-all cursor-pointer group"
                    aria-label="Trigger harmonic chime"
                  >
                    <span className="h-3 w-3 rounded-full bg-[#a9ddf0] group-hover:scale-125 transition-transform" />
                  </button>
                  <span className="font-mono-code text-[10px] text-[#89919d] mt-4">
                    Pentatonic harmonic ladder
                  </span>
                </div>
              </div>
            </div>

            <div className="font-mono-code text-xs text-[#89919d] pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span>PHYSICS ENGINE:</span>
              <span className="text-[#a9ddf0]">Cubic-Bezier Spring + Web Audio</span>
            </div>
          </section>

          {/* SECTION 2: ELASTIC DRAG PUCK (5 Cols) */}
          <section className="lg:col-span-5 rounded-3xl border border-white/[0.1] bg-[#11141b] p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-8">
                <span className="font-mono-code text-xs font-semibold uppercase text-[#f2f1ec] tracking-wider">
                  02 // Elastic Inertia Anchor
                </span>
                <span className="font-mono-code text-xs text-[#89919d]">Kinetic Tension</span>
              </div>

              {/* Elastic Playground Arena */}
              <div className="relative w-full aspect-square rounded-2xl bg-[#090b0f] border border-white/[0.08] flex items-center justify-center overflow-hidden mb-6">
                {/* Tension Center Reticle */}
                <div className="absolute w-24 h-24 rounded-full border border-white/[0.06] flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border border-white/[0.08]" />
                </div>
                <div className="absolute font-mono-code text-[9px] text-[#89919d]/40 select-none">
                  RESTING ANCHOR (0, 0)
                </div>

                {/* Elastic String Line (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line
                    x1="50%"
                    y1="50%"
                    x2={`calc(50% + ${puckPos.x}px)`}
                    y2={`calc(50% + ${puckPos.y}px)`}
                    stroke={isDragging ? "#a9ddf0" : "rgba(255,255,255,0.15)"}
                    strokeWidth={isDragging ? 2.5 : 1}
                    strokeDasharray={isDragging ? "none" : "3 3"}
                  />
                </svg>

                {/* Draggable Puck */}
                <div
                  ref={puckRef}
                  onMouseDown={handlePuckStart}
                  onTouchStart={handlePuckStart}
                  style={{
                    transform: `translate(${puckPos.x}px, ${puckPos.y}px)`,
                    transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                  className={`w-16 h-16 rounded-full border flex items-center justify-center font-mono-code text-xs select-none cursor-grab active:cursor-grabbing shadow-xl ${
                    isDragging
                      ? "border-[#a9ddf0] bg-[#a9ddf0] text-[#090b0f] font-bold scale-110 shadow-[0_0_24px_rgba(169,221,240,0.5)]"
                      : "border-white/20 bg-white/10 text-[#f2f1ec] scale-100"
                  }`}
                >
                  <span>{isDragging ? "DRAG" : "PULL"}</span>
                </div>
              </div>

              <div className="flex items-center justify-between font-mono-code text-xs text-[#89919d]">
                <span>TENSION DELTA:</span>
                <span className="text-[#a9ddf0]">
                  ΔX: {Math.round(puckPos.x)}px | ΔY: {Math.round(puckPos.y)}px
                </span>
              </div>
            </div>

            <div className="font-mono-code text-[11px] text-[#89919d] pt-4 border-t border-white/[0.08] mt-6">
              Release cursor anywhere to observe inverse spring velocity.
            </div>
          </section>

          {/* SECTION 3: TYPOGRAPHIC TENSION SLIDER (6 Cols) */}
          <section className="lg:col-span-6 rounded-3xl border border-white/[0.1] bg-[#11141b] p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-8">
                <span className="font-mono-code text-xs font-semibold uppercase text-[#f2f1ec] tracking-wider">
                  03 // Variable Typographic Tension
                </span>
                <span className="font-mono-code text-xs text-[#89919d]">Variable Axes</span>
              </div>

              {/* Dynamic Sample Display */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#090b0f] p-8 min-h-[140px] flex items-center justify-center text-center overflow-hidden mb-8">
                <span
                  style={{
                    fontWeight: fontWeight,
                    letterSpacing: `${letterSpacing}em`,
                  }}
                  className="font-display text-2xl sm:text-3xl text-[#f2f1ec] transition-all duration-75 block max-w-full truncate"
                >
                  {fontSample}
                </span>
              </div>

              {/* Sliders */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between font-mono-code text-xs mb-2">
                    <label htmlFor={weightInputId} className="text-[#89919d]">FONT WEIGHT (wght)</label>
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
                    className="w-full accent-[#a9ddf0] bg-white/10 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-mono-code text-xs mb-2">
                    <label htmlFor={spacingInputId} className="text-[#89919d]">TRACKING / KERNING (em)</label>
                    <span className="text-[#a9ddf0] font-semibold">{letterSpacing.toFixed(3)}em</span>
                  </div>
                  <input
                    id={spacingInputId}
                    type="range"
                    min="-0.08"
                    max="0.25"
                    step="0.01"
                    value={letterSpacing}
                    onChange={(e) => {
                      setLetterSpacing(Number(e.target.value));
                      if (soundEnabled) sound.playClick();
                    }}
                    className="w-full accent-[#a9ddf0] bg-white/10 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Quick Word Preset Pills */}
            <div className="flex flex-wrap gap-2 pt-6 border-t border-white/[0.08] mt-6">
              {["Cold Design Engineering", "WhatsApp Triage Architecture", "Spatial Luxury Lookbook"].map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => {
                    setFontSample(sample);
                    if (soundEnabled) sound.playPop();
                  }}
                  className={`rounded-full px-3 py-1 font-mono-code text-[11px] border transition-colors cursor-pointer ${
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
                    type="button"
                    onClick={() => {
                      setActiveTheme(t);
                      if (soundEnabled) sound.playClick();
                    }}
                    className={`rounded-xl p-3 border font-mono-code text-xs text-left capitalize transition-all cursor-pointer ${
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
                    type="button"
                    style={{
                      backgroundColor: themes[activeTheme].accent,
                      color: themes[activeTheme].bg,
                    }}
                    className="rounded-full px-3.5 py-1 text-xs font-bold font-mono-code transition-transform active:scale-95 cursor-pointer"
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
        <div className="mt-20 rounded-3xl border border-white/[0.08] bg-[#11141b] p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono-code text-xs">
          <div>
            <span className="text-[#a9ddf0] uppercase font-semibold block mb-1">
              Craft &amp; Technical Execution
            </span>
            <p className="text-[#89919d] max-w-xl">
              Every interaction above is engineered with zero bloat, pure vanilla React/CSS transforms, and accessible pointer mechanics.
            </p>
          </div>
          <Link
            href="/work"
            onClick={() => sound.playClick()}
            className="inline-flex items-center gap-2 rounded-full bg-[#ffffff] px-6 py-3.5 font-semibold text-[#090b0f] hover:bg-[#a9ddf0] transition-colors whitespace-nowrap cursor-pointer shadow-lg"
          >
            <span>Explore All Work</span>
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
        </div>
      </div>
    </main>
  );
}

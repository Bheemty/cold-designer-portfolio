"use client";

import { useState } from "react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { Sparkles, Sliders, Volume2, Move, RotateCcw } from "lucide-react";
import { sound } from "@/lib/sounds";

const PROFILES = [
  { name: "Snappy Micro", stiffness: 520, damping: 32, useCase: "Mobile sheets & action buttons" },
  { name: "Organic Inertia", stiffness: 320, damping: 24, useCase: "Desktop modals & card reveals" },
  { name: "Velvet Spring", stiffness: 180, damping: 18, useCase: "Fluid spatial menus & hero reels" },
];

export default function InteractivePlayground() {
  const [springStiffness, setSpringStiffness] = useState(320);
  const [springDamping, setSpringDamping] = useState(24);
  const [selectedPreset, setSelectedPreset] = useState("Organic Inertia");
  const [dragCount, setDragCount] = useState(0);

  const applyPreset = (p: typeof PROFILES[0]) => {
    sound.playClick();
    setSelectedPreset(p.name);
    setSpringStiffness(p.stiffness);
    setSpringDamping(p.damping);
  };

  const triggerCelebration = () => {
    sound.playChime(880, 0.3);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#a9ddf0", "#f2f1ec", "#89919d"],
    });
  };

  const playHarmonicScale = () => {
    sound.playChime(523.25, 0.18); // C5
    setTimeout(() => sound.playChime(659.25, 0.18), 110); // E5
    setTimeout(() => sound.playChime(783.99, 0.22), 220); // G5
    setTimeout(() => sound.playChime(1046.5, 0.3), 330); // C6
  };

  const handleDragRelease = () => {
    sound.playClick();
    setDragCount((prev) => prev + 1);
  };

  return (
    <section className="relative py-28 sm:py-40 px-6 sm:px-12 border-b border-white/[0.08] bg-[#090b0f] text-[#f2f1ec] overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 mb-20 border-b border-white/[0.08] pb-6">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a9ddf0]" />
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#a9ddf0]">
              The Interaction Lab
            </span>
          </div>
          <span className="font-mono-code text-xs text-[#89919d]">
            MATERIAL DYNAMICS &amp; HAPTIC CALIBRATION
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Description & Audio Controls */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#f2f1ec] leading-[1.08]">
              Kinetic tactility, <br />
              <span className="font-editorial-italic font-normal text-[#a9ddf0]">
                calibrated with restraint
              </span>
              .
            </h2>

            <p className="text-base text-[#89919d] font-light leading-relaxed">
              Design is felt through responsiveness. Test out live spring physics, trigger synthesized harmonic chimes, and inspect how calibrated micro-motion establishes the quiet confidence of digital products.
            </p>

            {/* Presets Selector */}
            <div className="space-y-2 pt-2">
              <span className="font-mono-code text-[11px] text-[#89919d] uppercase tracking-wider block">
                Calibrated Physics Presets:
              </span>
              <div className="flex flex-wrap gap-2">
                {PROFILES.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => applyPreset(p)}
                    onMouseEnter={() => sound.playHover()}
                    className={`font-mono-code text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                      selectedPreset === p.name
                        ? "border-[#a9ddf0] bg-[#a9ddf0]/10 text-[#a9ddf0] font-semibold"
                        : "border-white/[0.08] bg-white/[0.02] text-[#89919d] hover:border-white/20 hover:text-[#f2f1ec]"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <button
                onClick={playHarmonicScale}
                onMouseEnter={() => sound.playHover()}
                className="flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] hover:border-[#a9ddf0] hover:text-[#a9ddf0] px-5 py-2.5 font-mono-code text-xs font-semibold text-[#f2f1ec] transition-all"
              >
                <Volume2 size={13} className="text-[#a9ddf0]" />
                <span>Synthesize Harmonic Chime</span>
              </button>

              <button
                onClick={triggerCelebration}
                onMouseEnter={() => sound.playHover()}
                className="flex items-center gap-2 rounded-full bg-[#f2f1ec] hover:bg-[#a9ddf0] px-5 py-2.5 font-mono-code text-xs font-semibold text-[#090b0f] transition-all"
              >
                <Sparkles size={13} />
                <span>Particle Response</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Physics Test Canvas */}
          <div className="lg:col-span-7 rounded-3xl border border-white/[0.08] bg-[#11141b] p-6 sm:p-10 shadow-2xl">
            {/* Control Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-white/[0.08] font-mono-code text-xs">
              <div>
                <div className="flex justify-between text-[#89919d] mb-2">
                  <span className="flex items-center gap-1.5">
                    <Sliders size={12} />
                    <span>Spring Stiffness</span>
                  </span>
                  <span className="text-[#f2f1ec] font-bold">{springStiffness} N/m</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="800"
                  value={springStiffness}
                  onChange={(e) => {
                    setSelectedPreset("Custom");
                    setSpringStiffness(Number(e.target.value));
                  }}
                  className="w-full accent-[#a9ddf0] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[#89919d] mb-2">
                  <span className="flex items-center gap-1.5">
                    <Sliders size={12} />
                    <span>Damping Ratio</span>
                  </span>
                  <span className="text-[#f2f1ec] font-bold">{springDamping} Ns/m</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  value={springDamping}
                  onChange={(e) => {
                    setSelectedPreset("Custom");
                    setSpringDamping(Number(e.target.value));
                  }}
                  className="w-full accent-[#a9ddf0] cursor-pointer"
                />
              </div>
            </div>

            {/* Draggable Spring Object Canvas */}
            <div className="relative h-64 w-full rounded-2xl bg-[#090b0f] border border-white/[0.06] my-6 flex flex-col items-center justify-center overflow-hidden">
              <span className="absolute top-3 left-4 font-mono-code text-[10px] text-[#89919d] uppercase">
                Drag specimen to evaluate spring rebound &amp; resting inertia
              </span>

              <motion.div
                drag
                dragConstraints={{ left: -140, right: 140, top: -70, bottom: 70 }}
                dragElastic={0.4}
                dragTransition={{ bounceStiffness: springStiffness, bounceDamping: springDamping }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => sound.playHover()}
                onDragEnd={handleDragRelease}
                className="cursor-grab active:cursor-grabbing flex flex-col items-center justify-center rounded-2xl border px-8 py-5 shadow-2xl select-none"
                style={{
                  backgroundColor: "rgba(169, 221, 240, 0.08)",
                  borderColor: "rgba(169, 221, 240, 0.4)",
                  color: "#f2f1ec",
                }}
              >
                <div className="flex items-center gap-2 font-display text-lg font-bold text-[#a9ddf0]">
                  <Move size={15} />
                  <span>TACTILE SPRING SPECIMEN</span>
                </div>
                <span className="font-mono-code text-[10px] text-[#89919d] mt-1">
                  Stiffness: {springStiffness} N/m • Damping: {springDamping} Ns/m
                </span>
              </motion.div>

              <span className="absolute bottom-3 right-4 font-mono-code text-[10px] text-[#89919d]">
                Interactions: {dragCount}
              </span>
            </div>

            <div className="flex items-center justify-between font-mono-code text-xs text-[#89919d] pt-2">
              <span>Foundation Accent:</span>
              <span className="flex items-center gap-2 text-[#f2f1ec]">
                <span className="h-3 w-3 rounded-full bg-[#a9ddf0]" />
                Ice Blue (#A9DDF0)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

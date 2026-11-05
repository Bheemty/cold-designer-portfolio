"use client";

import React, { useState } from "react";
import { ColdGlassSurface, useColdGlass } from "./ColdGlassEngine";
import {
  Layers,
  Sparkles,
  Eye,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Maximize2,
} from "lucide-react";

export function MaterialComparison() {
  const { theme, refractionMode, setRefractionMode, refractionScale, setRefractionScale } =
    useColdGlass();
  const [selectedBackground, setSelectedBackground] = useState<number>(0);
  const isDark = theme === "dark";

  const backgrounds = [
    {
      id: "vibrant-spectrum",
      name: "Vibrant Chromatic Spectrum",
      description: "Tests color bending, chromatic refraction & edge light displacement.",
      renderBg: () => (
        <div className="absolute inset-0 overflow-hidden bg-[#090b10]">
          {/* Intense vibrant gradient blooms */}
          <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 blur-2xl opacity-80 animate-pulse" />
          <div className="absolute top-1/2 -right-12 w-72 h-72 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 blur-2xl opacity-80" />
          <div className="absolute -bottom-10 left-1/4 w-60 h-60 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 blur-xl opacity-70" />

          {/* Optical test stripes */}
          <div className="absolute inset-0 flex items-center justify-around opacity-40">
            <div className="w-1.5 h-full bg-white transform -rotate-12" />
            <div className="w-2.5 h-full bg-amber-300 transform -rotate-12" />
            <div className="w-1.5 h-full bg-cyan-300 transform -rotate-12" />
            <div className="w-3.5 h-full bg-pink-400 transform -rotate-12" />
            <div className="w-1 h-full bg-white transform -rotate-12" />
          </div>

          {/* High-frequency background test pattern */}
          <div className="absolute bottom-6 left-6 font-mono-code text-[11px] font-bold text-white tracking-widest uppercase">
            REFRACTION TEST PATTERN // OPTICAL SNELL DISPLACEMENT 24PX
          </div>
        </div>
      ),
    },
    {
      id: "dark-obsidian",
      name: "Dark Obsidian Blueprint Grid",
      description: "Tests smoked-glass depth, caustic rim shadows & contrast on dark UI.",
      renderBg: () => (
        <div className="absolute inset-0 bg-[#06080d] overflow-hidden">
          {/* High-tech engineering grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute top-10 left-10 font-mono-code text-xs text-[#38bdf8]/60 space-y-1">
            <div>INDEX: [COLD_GLASS_OBSIDIAN]</div>
            <div>LATENCY: 0.12ms GPU_COMPOSITED</div>
            <div>COORDINATES: X: 42.884 Y: -71.209</div>
          </div>
          <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full border border-sky-400/30 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border border-sky-400/20 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-sky-500/10" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "light-quartz",
      name: "Light Architectural Minimal",
      description: "Tests quartz meniscus definition & text clarity on bright surfaces.",
      renderBg: () => (
        <div className="absolute inset-0 bg-[#f1f4f9] overflow-hidden">
          {/* Subtle architectural shadows and geometry */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#e2e8f0] via-[#edf2f7] to-[#ffffff]" />
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/80 to-transparent transform skew-x-12" />
          <div className="absolute top-12 left-10 text-[#0f172a] space-y-1 font-sans">
            <h4 className="font-display font-bold text-2xl tracking-tight">KOKIL ARCHITECTURE</h4>
            <p className="font-mono-code text-xs text-[#64748b]">BRIGHT ENVIRONMENT STRESS TEST</p>
          </div>
          <div className="absolute bottom-8 left-10 flex gap-4 font-mono-code text-xs text-[#334155]">
            <span className="px-2 py-1 bg-white rounded border border-slate-200">CONTRAST: 14.8:1</span>
            <span className="px-2 py-1 bg-white rounded border border-slate-200">SURFACE: QUARTZ</span>
          </div>
        </div>
      ),
    },
    {
      id: "dense-editorial",
      name: "Dense Editorial Typography",
      description: "Proves underlying text stays razor sharp through the flat glass center.",
      renderBg: () => (
        <div className="absolute inset-0 bg-[#0e121a] p-8 overflow-hidden select-none">
          <div className="max-w-md space-y-3 font-sans text-xs leading-relaxed text-[#94a3b8]">
            <h5 className="font-display font-bold text-base text-white">
              Snell&apos;s Law & The Geometric Lens Boundary
            </h5>
            <p>
              When light enters a glass element, refraction occurs primarily where the surface normal
              deviates from perpendicular. In flat center zones, the refractive angle is zero,
              leaving text completely legible.
            </p>
            <p className="font-mono-code text-[11px] text-[#38bdf8]">
              function refract(incident, normal, eta) &#123; return eta * incident; &#125;
            </p>
            <p>
              By isolating displacement strictly to the outer meniscus rim, Cold Glass avoids the
              melted-soup defect of naive Perlin noise filters.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="matrix" className="w-full max-w-6xl mx-auto py-16 px-4">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-code border font-medium">
          <Sparkles size={13} className="text-[#38bdf8]" />
          <span>Section D &bull; Material Matrix & Comparison</span>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight">
          Cold Glass vs. Ordinary Glassmorphism
        </h2>
        <p className="font-sans text-sm text-[#94a3b8] max-w-2xl mx-auto">
          Evaluate authentic optical refraction against diverse environments. Observe how the outer rim
          curves light rays while the center retains total clarity.
        </p>
      </div>

      {/* Mode Comparison Selector */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        <button
          type="button"
          onClick={() => setRefractionMode("optical")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono-code text-xs font-semibold border transition-all cursor-pointer ${
            refractionMode === "optical"
              ? "bg-[#0284c7] text-white border-[#38bdf8] shadow-[0_0_18px_rgba(2,132,199,0.4)]"
              : isDark
              ? "bg-white/[0.04] text-[#94a3b8] border-white/10 hover:text-white"
              : "bg-black/[0.04] text-[#475569] border-black/10 hover:text-[#0f131a]"
          }`}
        >
          <Sparkles size={14} />
          <span>Cold Glass (SDF Optical Lens)</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20">Active</span>
        </button>

        <button
          type="button"
          onClick={() => setRefractionMode("caustic")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono-code text-xs font-semibold border transition-all cursor-pointer ${
            refractionMode === "caustic"
              ? "bg-[#0284c7] text-white border-[#38bdf8] shadow-[0_0_18px_rgba(2,132,199,0.4)]"
              : isDark
              ? "bg-white/[0.04] text-[#94a3b8] border-white/10 hover:text-white"
              : "bg-black/[0.04] text-[#475569] border-black/10 hover:text-[#0f131a]"
          }`}
        >
          <Layers size={14} />
          <span>Caustic Fallback (Safari/WebKit)</span>
        </button>

        <button
          type="button"
          onClick={() => setRefractionMode("legacy")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono-code text-xs font-semibold border transition-all cursor-pointer ${
            refractionMode === "legacy"
              ? "bg-amber-600 text-white border-amber-400 shadow-[0_0_18px_rgba(217,119,6,0.4)]"
              : isDark
              ? "bg-white/[0.04] text-[#94a3b8] border-white/10 hover:text-white"
              : "bg-black/[0.04] text-[#475569] border-black/10 hover:text-[#0f131a]"
          }`}
        >
          <AlertTriangle size={14} />
          <span>Ordinary Glassmorphism (Legacy Flat Blur)</span>
        </button>
      </div>

      {/* Background Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 font-mono-code text-xs">
        {backgrounds.map((bg, idx) => (
          <button
            key={bg.id}
            type="button"
            onClick={() => setSelectedBackground(idx)}
            className={`px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
              selectedBackground === idx
                ? isDark
                  ? "bg-white/15 text-white border-white/30 font-semibold"
                  : "bg-black/10 text-[#0f131a] border-black/20 font-semibold"
                : isDark
                ? "bg-white/[0.03] text-[#64748b] border-white/05 hover:text-[#94a3b8]"
                : "bg-black/[0.03] text-[#94a3b8] border-black/05 hover:text-[#475569]"
            }`}
          >
            {bg.name}
          </button>
        ))}
      </div>

      {/* Interactive Demonstration Stage */}
      <div className="relative w-full h-[460px] sm:h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center p-6">
        {/* Active Test Background Layer */}
        {backgrounds[selectedBackground].renderBg()}

        {/* Floating Cold Glass Inspection Lens Card */}
        <div className="relative z-20 w-full max-w-lg">
          <ColdGlassSurface
            shape="card"
            elevation="panel"
            className="p-6 sm:p-8"
            interactive={true}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`p-1.5 rounded-lg ${
                      isDark ? "bg-[#0284c7]/20 text-[#38bdf8]" : "bg-[#0f172a]/10 text-[#0284c7]"
                    }`}
                  >
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm tracking-tight">
                      Cold Glass Refractive Lens
                    </h3>
                    <p className="font-mono-code text-[10px] text-[#94a3b8]">
                      Mode: {refractionMode.toUpperCase()} &bull; Displacement: {refractionScale}px
                    </p>
                  </div>
                </div>

                <span
                  className={`font-mono-code text-[10px] px-2.5 py-1 rounded-full font-semibold ${
                    refractionMode === "optical"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : refractionMode === "caustic"
                      ? "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }`}
                >
                  {refractionMode === "optical"
                    ? "Snell's Refraction"
                    : refractionMode === "caustic"
                    ? "Caustic Fallback"
                    : "Naive Blur"}
                </span>
              </div>

              <p className="font-sans text-xs sm:text-sm leading-relaxed">
                Move your cursor across this surface. Notice the subtle environmental sheen, the
                two-stage meniscus specular highlight along the top rim, and the physical refraction
                distorting the background stripes around the perimeter.
              </p>

              {/* Technical Inspection Chips */}
              <div className="grid grid-cols-2 gap-2 pt-2 font-mono-code text-[11px]">
                <div
                  className={`p-2 rounded-xl border flex items-center gap-2 ${
                    isDark ? "bg-white/[0.03] border-white/08" : "bg-black/[0.02] border-black/06"
                  }`}
                >
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  <span>Center Clarity: 100%</span>
                </div>
                <div
                  className={`p-2 rounded-xl border flex items-center gap-2 ${
                    isDark ? "bg-white/[0.03] border-white/08" : "bg-black/[0.02] border-black/06"
                  }`}
                >
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  <span>Rim Meniscus: 22px</span>
                </div>
                <div
                  className={`p-2 rounded-xl border flex items-center gap-2 ${
                    isDark ? "bg-white/[0.03] border-white/08" : "bg-black/[0.02] border-black/06"
                  }`}
                >
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  <span>Light/Dark Reactive</span>
                </div>
                <div
                  className={`p-2 rounded-xl border flex items-center gap-2 ${
                    isDark ? "bg-white/[0.03] border-white/08" : "bg-black/[0.02] border-black/06"
                  }`}
                >
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  <span>GPU Zero-DOM Screenshot</span>
                </div>
              </div>
            </div>
          </ColdGlassSurface>
        </div>
      </div>
    </section>
  );
}


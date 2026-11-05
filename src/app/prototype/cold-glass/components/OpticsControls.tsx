"use client";

import React from "react";
import { useColdGlass } from "./ColdGlassEngine";
import { Sliders, Sun, Moon, Info, Zap, Shield, Sparkles } from "lucide-react";

export function OpticsControls() {
  const {
    theme,
    toggleTheme,
    refractionScale,
    setRefractionScale,
    rimWidth,
    setRimWidth,
    specularStrength,
    setSpecularStrength,
    isFilterSupported,
  } = useColdGlass();

  const isDark = theme === "dark";

  return (
    <div
      className={`rounded-3xl p-6 sm:p-8 border transition-all ${
        isDark
          ? "bg-[#0b0f17]/80 border-white/10 text-white"
          : "bg-white/90 border-black/10 text-[#0f131a] shadow-lg"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <Sliders size={18} className="text-[#38bdf8]" />
            <h3 className="font-display font-bold text-lg tracking-tight">
              Optics Engine Parameters
            </h3>
          </div>
          <p
            className={`font-mono-code text-xs mt-1 ${
              isDark ? "text-[#94a3b8]" : "text-[#64748b]"
            }`}
          >
            Live SDF geometric displacement and meniscus specular tuning
          </p>
        </div>

        {/* Instant Live Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-mono-code text-xs font-semibold border transition-all cursor-pointer ${
            isDark
              ? "bg-white/[0.08] hover:bg-white/[0.16] text-white border-white/15"
              : "bg-[#0f172a] hover:bg-[#1e293b] text-white border-[#0f172a]"
          }`}
        >
          {isDark ? (
            <>
              <Sun size={14} className="text-amber-400" />
              <span>Switch to Light Theme</span>
            </>
          ) : (
            <>
              <Moon size={14} className="text-sky-300" />
              <span>Switch to Dark Theme</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Control 1: Refraction Scale */}
        <div className="space-y-2">
          <div className="flex justify-between items-center font-mono-code text-xs">
            <label className="font-medium">Refraction Displacement</label>
            <span className="text-[#38bdf8] font-bold">{refractionScale}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="40"
            step="1"
            value={refractionScale}
            onChange={(e) => setRefractionScale(Number(e.target.value))}
            className="w-full accent-[#38bdf8] cursor-pointer"
          />
          <p
            className={`text-[10px] font-sans ${
              isDark ? "text-[#64748b]" : "text-[#94a3b8]"
            }`}
          >
            Snell&apos;s angle scale applied to background rays at the outer meniscus rim.
          </p>
        </div>

        {/* Control 2: Rim Meniscus Width */}
        <div className="space-y-2">
          <div className="flex justify-between items-center font-mono-code text-xs">
            <label className="font-medium">Meniscus Rim Width</label>
            <span className="text-[#38bdf8] font-bold">{rimWidth}px</span>
          </div>
          <input
            type="range"
            min="8"
            max="36"
            step="2"
            value={rimWidth}
            onChange={(e) => setRimWidth(Number(e.target.value))}
            className="w-full accent-[#38bdf8] cursor-pointer"
          />
          <p
            className={`text-[10px] font-sans ${
              isDark ? "text-[#64748b]" : "text-[#94a3b8]"
            }`}
          >
            Physical width of the curved border lens before flattening to 100% center clarity.
          </p>
        </div>

        {/* Control 3: Specular Sheen Intensity */}
        <div className="space-y-2">
          <div className="flex justify-between items-center font-mono-code text-xs">
            <label className="font-medium">Specular Highlights</label>
            <span className="text-[#38bdf8] font-bold">
              {Math.round(specularStrength * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={specularStrength}
            onChange={(e) => setSpecularStrength(Number(e.target.value))}
            className="w-full accent-[#38bdf8] cursor-pointer"
          />
          <p
            className={`text-[10px] font-sans ${
              isDark ? "text-[#64748b]" : "text-[#94a3b8]"
            }`}
          >
            Dual-bounce environmental reflection and top edge meniscus caustics.
          </p>
        </div>
      </div>

      {/* Browser Capability Probe Status */}
      <div
        className={`mt-6 pt-4 border-t flex flex-wrap items-center justify-between gap-3 font-mono-code text-xs ${
          isDark ? "border-white/[0.08]" : "border-black/[0.06]"
        }`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              isFilterSupported ? "bg-emerald-400 animate-pulse" : "bg-sky-400"
            }`}
          />
          <span className={isDark ? "text-[#94a3b8]" : "text-[#64748b]"}>
            Hardware Architecture:
          </span>
          <span className="font-semibold text-[#38bdf8]">
            {isFilterSupported
              ? "Chromium GPU Backdrop SDF Lens Refraction (Active)"
              : "WebKit/Gecko Caustic Specular Fallback (Active)"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
            Zero External Dependencies
          </span>
          <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[10px]">
            React 19 Safe
          </span>
        </div>
      </div>
    </div>
  );
}


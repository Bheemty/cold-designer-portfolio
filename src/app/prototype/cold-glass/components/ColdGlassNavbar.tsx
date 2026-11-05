"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ColdGlassSurface, useColdGlass } from "./ColdGlassEngine";
import { Sun, Moon, ArrowUpRight, Sparkles } from "lucide-react";

export function ColdGlassNavbar() {
  const { theme, toggleTheme } = useColdGlass();
  const [activeItem, setActiveItem] = useState("Prototype");
  const isDark = theme === "dark";

  const navItems = [
    { label: "Prototype", href: "#overview" },
    { label: "Refraction Optics", href: "#optics" },
    { label: "Material Matrix", href: "#matrix" },
    { label: "Ask Cold Glass", href: "#ask-cold" },
  ];

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100vw-2.5rem)] max-w-4xl">
      <ColdGlassSurface
        shape="pill"
        elevation="nav"
        className="px-3.5 py-2 sm:px-5 sm:py-2.5 flex items-center justify-between"
      >
        {/* Brand Logo / Avatar */}
        <div className="flex items-center gap-3">
          <div
            className={`relative flex items-center justify-center w-8 h-8 rounded-full overflow-hidden transition-all duration-300 font-bold text-xs ${
              isDark
                ? "bg-gradient-to-tr from-[#0284c7] to-[#38bdf8] text-white shadow-[0_0_14px_rgba(56,189,248,0.35)]"
                : "bg-gradient-to-tr from-[#0f172a] to-[#334155] text-white shadow-[0_4px_12px_rgba(15,23,42,0.25)]"
            }`}
          >
            <Sparkles size={14} className="animate-spin-slow" />
          </div>
          <div className="flex flex-col">
            <span
              className={`font-display font-bold text-xs tracking-wider uppercase ${
                isDark ? "text-white" : "text-[#0f131a]"
              }`}
            >
              Cold Glass
            </span>
            <span
              className={`font-mono-code text-[9px] tracking-tight ${
                isDark ? "text-[#94a3b8]" : "text-[#64748b]"
              }`}
            >
              Optical Refraction Lab
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeItem === item.label;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setActiveItem(item.label)}
                className={`relative px-3.5 py-1.5 rounded-full font-mono-code text-xs transition-all duration-200 ${
                  isActive
                    ? isDark
                      ? "text-[#38bdf8] font-semibold bg-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
                      : "text-[#0284c7] font-semibold bg-black/[0.06] shadow-[inset_0_1px_1px_rgba(0,0,0,0.06)]"
                    : isDark
                    ? "text-[#94a3b8] hover:text-white hover:bg-white/[0.04]"
                    : "text-[#475569] hover:text-[#0f131a] hover:bg-black/[0.04]"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Theme Toggle & Live Prototype Indicator */}
        <div className="flex items-center gap-2">
          {/* Instant Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono-code text-xs font-medium transition-all duration-300 cursor-pointer ${
              isDark
                ? "bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/10"
                : "bg-black/[0.05] hover:bg-black/[0.10] text-[#0f131a] border border-black/10"
            }`}
          >
            {isDark ? (
              <>
                <Sun size={13} className="text-amber-400" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon size={13} className="text-indigo-600" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>

          {/* Return / Index Link */}
          <Link
            href="/"
            className={`hidden sm:inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full font-mono-code text-xs font-semibold transition-all duration-300 ${
              isDark
                ? "bg-white text-[#090b0f] hover:bg-white/90 shadow-[0_4px_14px_rgba(255,255,255,0.2)]"
                : "bg-[#0f172a] text-white hover:bg-[#1e293b] shadow-[0_4px_14px_rgba(15,23,42,0.2)]"
            }`}
          >
            <span>Live Site</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </ColdGlassSurface>
    </header>
  );
}


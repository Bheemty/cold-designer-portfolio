"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, Compass, Sparkles, Eye, ShieldCheck, Layers } from "lucide-react";
import { sound } from "@/lib/sounds";

const EXHIBITION_PILLARS = [
  { index: "01", name: "MEDesy Solution", field: "Telehealth Triage", anchor: "#exhibit-medesy" },
  { index: "02", name: "9jaTrip", field: "Intercity Transit", anchor: "#exhibit-9jatrip" },
  { index: "03", name: "Somewhere Hotel", field: "Spatial Web Lookbook", anchor: "#exhibit-somewhere" },
  { index: "04", name: "BuyBuddy", field: "Merchant Marketplace", anchor: "#exhibit-buybuddy" },
  { index: "05", name: "Stillwater Hall", field: "Cinematic Video", anchor: "#exhibit-stillwater" },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lensMode, setLensMode] = useState<"obsidian" | "ice">("obsidian");

  // Calibrated mouse parallax coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 180 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-350, 350], [7, -7]);
  const rotateY = useTransform(smoothMouseX, [-350, 350], [-7, 7]);
  const specularX = useTransform(smoothMouseX, [-350, 350], [20, 80]);
  const specularY = useTransform(smoothMouseY, [-350, 350], [20, 80]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const toggleLens = () => {
    sound.playClick();
    setLensMode((prev) => (prev === "obsidian" ? "ice" : "obsidian"));
  };

  const scrollToExhibit = (anchor: string) => {
    sound.playClick();
    const target = document.querySelector(anchor);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[96vh] sm:min-h-screen flex flex-col justify-between pt-32 sm:pt-36 pb-12 px-6 sm:px-12 bg-[#090b0f] text-[#f2f1ec] overflow-hidden border-b border-white/[0.08]"
    >
      {/* Ambient Atmospheric Glow & Stage Lighting */}
      <div className="pointer-events-none absolute -top-40 right-10 h-[650px] w-[650px] rounded-full bg-[#a9ddf0]/[0.035] blur-[180px]" />
      <div className="pointer-events-none absolute bottom-0 left-10 h-[500px] w-[500px] rounded-full bg-white/[0.015] blur-[160px]" />

      {/* Top Editorial Monograph Metadata Bar */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono-code text-xs text-[#89919d] pb-8 border-b border-white/[0.08]"
      >
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[#a9ddf0] animate-pulse" />
          <span className="text-[#f2f1ec] font-semibold tracking-wide">Taye Abolarin</span>
          <span className="text-white/20">—</span>
          <span className="text-[#89919d]">Product Designer / Cold Designer</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Compass size={13} className="text-[#a9ddf0]" />
            <span>Lagos, Nigeria (WAT / UTC+1)</span>
          </div>
          <span className="text-white/20 hidden sm:inline">•</span>
          <div className="flex items-center gap-2 text-[#a9ddf0] font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a9ddf0]" />
            <span>Product Design • Cold Designer</span>
          </div>
        </div>
      </motion.div>

      {/* Centerpiece: Editorial Headline & Interactive Kinetic Specimen */}
      <div className="my-auto py-12 sm:py-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic Monument */}
          <div className="lg:col-span-8 space-y-8">
            {/* Monograph Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <span className="font-mono-code text-xs uppercase tracking-widest text-[#a9ddf0] bg-[#a9ddf0]/10 border border-[#a9ddf0]/20 px-3.5 py-1.5 rounded-full">
                Editorial Product Design × Interaction Systems
              </span>
            </motion.div>

            {/* Main Editorial Statement with Serif Italic Highlights */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-[#f2f1ec] leading-[1.03]"
            >
              Shaping interfaces that turn{" "}
              <span className="font-editorial-italic font-normal text-[#a9ddf0]">
                cognitive friction
              </span>{" "}
              into{" "}
              <span className="font-editorial-italic font-normal text-[#f2f1ec]">
                calm clarity
              </span>
              .
            </motion.h1>

            {/* Verified Narrative Paragraph */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-2 items-baseline"
            >
              <p className="md:col-span-9 text-lg sm:text-2xl text-[#89919d] font-light leading-relaxed">
                Operating under the independent imprint <strong className="text-[#f2f1ec] font-medium">Cold Designer</strong>. Product Designer with approximately two years of dedicated, self-taught practice across Figma, Photoshop, and modern web frameworks — architecting conversational healthcare gateways, intercity mobility platforms, and immersive spatial web experiences.
              </p>

              <div className="md:col-span-3 flex md:justify-end">
                <Link
                  href="/about"
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                  className="group inline-flex items-center gap-2 font-mono-code text-xs text-[#89919d] hover:text-[#a9ddf0] transition-colors"
                >
                  <span>About Practice</span>
                  <ArrowUpRight
                    size={13}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Expressive Kinetic Identity Specimen ("Cold Lens") */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-72 sm:w-80 rounded-3xl border border-white/[0.12] bg-[#11141b]/90 p-6 shadow-2xl backdrop-blur-xl group select-none cursor-pointer"
              onClick={toggleLens}
              data-cursor-text="TOGGLE LENS"
            >
              {/* Refractive Specular Gradient */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-30 transition-opacity duration-500 group-hover:opacity-60"
                style={{
                  background:
                    lensMode === "ice"
                      ? "radial-gradient(circle at 50% 30%, rgba(169, 221, 240, 0.4), transparent 70%)"
                      : "radial-gradient(circle at 50% 30%, rgba(242, 241, 236, 0.15), transparent 70%)",
                }}
              />

              {/* Lens Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5 font-mono-code text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#a9ddf0]" />
                  <span className="text-[#f2f1ec] font-semibold uppercase tracking-wider">
                    Cold Specimen
                  </span>
                </div>
                <span className="text-[#89919d]">REF: CD-2024</span>
              </div>

              {/* Central Kinetic Disc Graphic */}
              <div className="relative aspect-square w-full rounded-2xl bg-[#090b0f] border border-white/[0.08] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                {/* Concentric Calibration Rings */}
                <div className="absolute inset-4 rounded-full border border-white/[0.06] animate-[spin_40s_linear_infinite]" />
                <div className="absolute inset-10 rounded-full border border-dashed border-[#a9ddf0]/20 animate-[spin_25s_linear_infinite_reverse]" />
                <div className="absolute inset-16 rounded-full border border-white/[0.04]" />

                <div className="relative z-10 space-y-2">
                  <div className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#f2f1ec]">
                    0.0°
                  </div>
                  <div className="font-mono-code text-[10px] text-[#a9ddf0] uppercase tracking-widest">
                    {lensMode === "ice" ? "Glacial Ice // Focus" : "Atelier Obsidian // Calm"}
                  </div>
                </div>

                {/* Subtext */}
                <div className="absolute bottom-3 font-mono-code text-[9px] text-[#89919d]/70">
                  Tap to Shift Temperature
                </div>
              </div>

              {/* Metadata Readout */}
              <div className="mt-5 space-y-1.5 font-mono-code text-[10px] text-[#89919d]">
                <div className="flex justify-between">
                  <span>DISCIPLINE:</span>
                  <span className="text-[#f2f1ec]">Product / UI/UX</span>
                </div>
                <div className="flex justify-between">
                  <span>LOCATION:</span>
                  <span className="text-[#f2f1ec]">Lagos // Remote</span>
                </div>
                <div className="flex justify-between">
                  <span>METHODOLOGY:</span>
                  <span className="text-[#a9ddf0]">Friction Elimination</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Action Catalyst & Quick Exhibition Index */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="pt-8 border-t border-white/[0.08]"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <a
              href="#selected-work"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              className="group flex items-center gap-3 rounded-full bg-[#f2f1ec] px-7 py-3.5 font-mono-code text-xs font-semibold text-[#090b0f] transition-all hover:bg-[#a9ddf0] hover:scale-105"
            >
              <span>Examine Exhibition 01—05</span>
              <ArrowDown
                size={14}
                className="group-hover:translate-y-0.5 transition-transform"
              />
            </a>

            <Link
              href="/work"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-6 py-3.5 font-mono-code text-xs font-medium text-[#f2f1ec] hover:border-[#a9ddf0] hover:text-[#a9ddf0] transition-all"
            >
              <span>Full Work Archive</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>

          {/* Quick Exhibition Index Ticker */}
          <div className="hidden xl:flex items-center gap-6 font-mono-code text-xs text-[#89919d]">
            <span className="text-[10px] uppercase tracking-wider text-white/40">Exhibition Index:</span>
            {EXHIBITION_PILLARS.map((ex) => (
              <button
                key={ex.index}
                onClick={() => scrollToExhibit(ex.anchor)}
                onMouseEnter={() => sound.playHover()}
                className="group flex items-center gap-2 hover:text-[#a9ddf0] transition-colors"
              >
                <span className="text-[#a9ddf0] font-semibold">{ex.index}</span>
                <span className="group-hover:underline underline-offset-4">{ex.name}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

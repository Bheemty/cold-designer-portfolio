"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, Compass, Sparkles } from "lucide-react";
import { sound } from "@/lib/sounds";

const EXHIBIT_INDEX = [
  { index: "01", title: "MEDesy Solution", category: "Healthcare & Conversational UI", anchor: "#exhibit-medesy" },
  { index: "02", title: "9jaTrip", category: "Intercity Transit & Logistics", anchor: "#exhibit-9jatrip" },
  { index: "03", title: "Somewhere Hotel", category: "Spatial Web & Architecture", anchor: "#exhibit-somewhere" },
  { index: "04", title: "BuyBuddy", category: "Commerce & Marketplace", anchor: "#exhibit-buybuddy" },
  { index: "05", title: "Stillwater Hall", category: "Cinematic Web & Video", anchor: "#exhibit-stillwater" },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Calibrated mouse parallax coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 32, stiffness: 180 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-300, 300], [4, -4]);
  const rotateY = useTransform(smoothMouseX, [-300, 300], [-4, 4]);

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
      className="relative min-h-[95vh] sm:min-h-screen flex flex-col justify-between pt-32 sm:pt-36 pb-12 px-6 sm:px-12 bg-[#090b0f] text-[#f2f1ec] overflow-hidden border-b border-white/[0.08]"
    >
      {/* Subtle stage lighting glow */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[650px] w-[650px] rounded-full bg-[#a9ddf0]/[0.035] blur-[180px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-[500px] w-[500px] rounded-full bg-white/[0.015] blur-[160px]" />

      {/* Top Editorial Monograph Metadata Bar */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono-code text-xs text-[#89919d] pb-8 border-b border-white/[0.08]"
      >
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[#a9ddf0]" />
          <span className="text-[#f2f1ec] font-medium tracking-wide">Taye Abolarin</span>
          <span className="text-white/20">—</span>
          <span className="text-[#89919d]">UI/UX &amp; Product Designer</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Compass size={13} className="text-[#a9ddf0]" />
            <span>Lagos, NG (WAT / UTC+1)</span>
          </div>
          <span className="text-white/20 hidden sm:inline">•</span>
          <div className="flex items-center gap-2 text-[#a9ddf0] font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a9ddf0] animate-pulse" />
            <span>Open for Select Commissions</span>
          </div>
        </div>
      </motion.div>

      {/* Centerpiece: Editorial Typography with Serif Italic Highlights */}
      <div className="my-auto py-10 sm:py-16 max-w-6xl">
        <div className="space-y-8">
          {/* Practice Descriptor Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#a9ddf0] bg-[#a9ddf0]/10 border border-[#a9ddf0]/20 px-3.5 py-1.5 rounded-full">
              Editorial Monograph // Product Design × Interaction
            </span>
          </motion.div>

          {/* Large Architectural Statement */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-bold tracking-tight text-[#f2f1ec] leading-[1.03]"
          >
            Designing{" "}
            <span className="font-editorial-italic font-normal text-[#a9ddf0]">
              conversational triage
            </span>
            , intercity transit systems, and{" "}
            <span className="font-editorial-italic font-normal text-[#f2f1ec]">
              tactile digital products
            </span>
            .
          </motion.h1>

          {/* Bio & Guardrail-Truth Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 items-baseline"
          >
            <p className="md:col-span-8 text-lg sm:text-2xl text-[#89919d] font-light leading-relaxed">
              Operating under the independent imprint{" "}
              <strong className="text-[#f2f1ec] font-medium">Cold Designer</strong>. Product Designer with approximately two years of focused self-taught practice across Figma, Photoshop, and modern web frameworks — eliminating friction and shaping interfaces with calm clarity.
            </p>

            <div className="md:col-span-4 flex flex-col md:items-end gap-3">
              <Link
                href="/about"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className="group inline-flex items-center gap-2 font-mono-code text-xs text-[#89919d] hover:text-[#a9ddf0] transition-colors"
              >
                <span>Read Philosophy &amp; Practice</span>
                <ArrowUpRight
                  size={13}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar: Action Buttons & Quick Exhibition Navigator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="pt-8 border-t border-white/[0.08]"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Primary Action Button */}
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
            {EXHIBIT_INDEX.map((ex) => (
              <button
                key={ex.index}
                onClick={() => scrollToExhibit(ex.anchor)}
                onMouseEnter={() => sound.playHover()}
                className="group flex items-center gap-2 hover:text-[#a9ddf0] transition-colors"
              >
                <span className="text-[#a9ddf0] font-semibold">{ex.index}</span>
                <span className="group-hover:underline underline-offset-4">{ex.title}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

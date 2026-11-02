"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, Compass } from "lucide-react";
import { sound } from "@/lib/sounds";

const FEATURED_TEASERS = [
  {
    slug: "medesy",
    title: "MEDesy Solution",
    role: "Lead Product Designer",
    category: "Telehealth & Conversational UX",
    thumb: "/images/projects/medesy/whatsapp-mockup.png",
    aspect: "16/10",
    tagline: "WhatsApp-first doctor triage & e-prescriptions",
  },
  {
    slug: "9jatrip",
    title: "9jaTrip",
    role: "Product Designer",
    category: "Transit & Mobility",
    thumb: "/images/projects/9jatrip/booking-screen.png",
    aspect: "9/16",
    tagline: "Multi-modal vehicle bookings & verified receipts",
  },
  {
    slug: "somewhere-hotel",
    title: "Somewhere Hotel",
    role: "Experience Designer",
    category: "Luxury Hospitality",
    thumb: "/images/projects/somewhere/suite-sunset.png",
    aspect: "16/9",
    tagline: "Cinematic spatial sanctuary & daylight atmosphere",
  },
  {
    slug: "buybuddy",
    title: "BuyBuddy",
    role: "Product Designer & Dev",
    category: "Social Micro-Commerce",
    thumb: "/images/projects/buybuddy/vendor-dashboard.png",
    aspect: "16/10",
    tagline: "Instant merchant catalogs with WhatsApp checkout",
  },
  {
    slug: "stillwater",
    title: "Stillwater Hall",
    role: "Creative Technologist",
    category: "Performing Arts Web",
    thumb: "/images/projects/stillwater/venue-exterior.png",
    aspect: "16/9",
    tagline: "Spatial stage walkthrough & interactive ticketing",
  },
];

export default function Hero() {
  const [activeTeaser, setActiveTeaser] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Subtle interactive pointer-parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 200 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-300, 300], [6, -6]);
  const rotateY = useTransform(smoothMouseX, [-300, 300], [-6, 6]);

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
    setActiveTeaser(null);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[94vh] sm:min-h-screen flex flex-col justify-between pt-32 sm:pt-40 pb-12 px-6 sm:px-12 bg-[#090b0f] text-[#f2f1ec] overflow-hidden border-b border-white/[0.08]"
    >
      {/* Restrained architectural atmospheric glow */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-[#a9ddf0]/[0.03] blur-[180px]" />
      <div className="pointer-events-none absolute bottom-0 -left-20 h-[500px] w-[500px] rounded-full bg-white/[0.015] blur-[150px]" />

      {/* Top Editorial Monograph Coordinates */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono-code text-xs text-[#89919d] pb-8 border-b border-white/[0.08]"
      >
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[#a9ddf0]" />
          <span className="text-[#f2f1ec] font-medium tracking-wide">Taye Abolarin</span>
          <span className="text-white/20">—</span>
          <span className="text-[#89919d]">Independent Product Designer</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Compass size={13} className="text-[#a9ddf0]" />
            <span>Lagos, NG (WAT / UTC+1)</span>
          </div>
          <span className="text-white/20 hidden sm:inline">•</span>
          <div className="flex items-center gap-2 text-[#a9ddf0] font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a9ddf0] animate-pulse" />
            <span>Available for Select Commissions</span>
          </div>
        </div>
      </motion.div>

      {/* Main Editorial Centerpiece */}
      <div className="my-auto py-12 sm:py-16 max-w-6xl">
        <div className="space-y-8">
          {/* Subtitle / Discipline Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#a9ddf0] bg-[#a9ddf0]/10 border border-[#a9ddf0]/20 px-3 py-1 rounded-full">
              Editorial Product Design × Interaction Systems
            </span>
          </motion.div>

          {/* Main Editorial Statement with Serif Italic Accents */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-[#f2f1ec] leading-[1.03]"
          >
            Designing{" "}
            <span className="font-editorial-italic font-normal text-[#a9ddf0]">
              conversational interfaces
            </span>
            , urban transit tools, and{" "}
            <span className="font-editorial-italic font-normal text-[#f2f1ec]">
              tactile digital products
            </span>
            .
          </motion.h1>

          {/* Designer Narrative & Context */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 items-baseline"
          >
            <p className="md:col-span-8 text-lg sm:text-2xl text-[#89919d] font-light leading-relaxed">
              Operating under the independent brand{" "}
              <strong className="text-[#f2f1ec] font-medium">Cold Designer</strong>. Lead Product Designer at{" "}
              <span className="text-[#f2f1ec] border-b border-white/20 pb-0.5">Medesy Technologies</span>. Focused on reducing cognitive friction, architecting multi-platform design tokens, and bringing deep interaction craft from concept to code.
            </p>

            <div className="md:col-span-4 flex flex-col md:items-end gap-3">
              <Link
                href="/about"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className="group inline-flex items-center gap-2 font-mono-code text-xs text-[#89919d] hover:text-[#a9ddf0] transition-colors"
              >
                <span>Read Design Philosophy &amp; Practice</span>
                <ArrowUpRight
                  size={13}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar: Action & Interactive 3D Perspective Project Filmstrip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="pt-8 border-t border-white/[0.08]"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Scroll Cue Action */}
          <div className="flex items-center gap-4 shrink-0">
            <a
              href="#selected-work"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              data-cursor-text="DISCOVER"
              className="group inline-flex items-center gap-3 rounded-full bg-[#f2f1ec] hover:bg-[#a9ddf0] px-6 py-3 font-mono-code text-xs font-semibold text-[#090b0f] transition-all duration-300 shadow-lg hover:shadow-[#a9ddf0]/20"
            >
              <span>Examine Selected Projects (05)</span>
              <ArrowDown size={13} className="group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Curated Project Reel with 3D Tilt & Live Peeks */}
          <motion.div
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
            className="flex flex-wrap items-center gap-2.5 font-mono-code text-xs"
          >
            <span className="hidden sm:inline text-white/30 uppercase tracking-widest text-[11px] mr-1">
              Curated Index:
            </span>

            {FEATURED_TEASERS.map((item, idx) => (
              <div
                key={item.slug}
                className="relative"
                onMouseEnter={() => {
                  sound.playHover();
                  setActiveTeaser(idx);
                }}
                onMouseLeave={() => setActiveTeaser(null)}
              >
                <Link
                  href={`/work/${item.slug}`}
                  onClick={() => sound.playClick()}
                  className={`group flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 transition-all duration-300 ${
                    activeTeaser === idx
                      ? "border-[#a9ddf0] bg-[#161a23] text-[#f2f1ec] shadow-md shadow-[#a9ddf0]/10 scale-[1.03]"
                      : "border-white/[0.08] bg-white/[0.02] text-[#89919d] hover:border-white/20 hover:text-[#f2f1ec]"
                  }`}
                >
                  <div className="relative h-4 w-6 rounded overflow-hidden bg-black/60 border border-white/10 shrink-0">
                    <Image
                      src={item.thumb}
                      alt={item.title}
                      fill
                      sizes="24px"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="font-medium text-[#f2f1ec] group-hover:text-[#a9ddf0] transition-colors">
                    0{idx + 1} // {item.title}
                  </span>
                </Link>

                {/* Hover Reveal Card Specimen */}
                {activeTeaser === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="pointer-events-none absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 rounded-2xl border border-white/20 bg-[#11141b]/95 p-3 backdrop-blur-xl shadow-2xl z-50 hidden md:block"
                  >
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#090b0f] mb-2.5 border border-white/10">
                      <Image
                        src={item.thumb}
                        alt={item.title}
                        fill
                        sizes="256px"
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-[#a9ddf0]">
                        <span className="font-semibold uppercase">{item.category}</span>
                        <span>{item.role}</span>
                      </div>
                      <p className="text-[11px] text-[#f2f1ec] font-medium leading-snug">
                        {item.tagline}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

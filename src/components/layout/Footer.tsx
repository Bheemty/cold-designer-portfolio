"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, Copy, Check, Mail } from "lucide-react";
import { sound } from "@/lib/sounds";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [year, setYear] = useState("2025");
  const [clocks, setClocks] = useState({
    lagos: "",
    london: "",
    newYork: "",
  });

  const realEmail = "abolarintaye20@gmail.com";

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
    const updateClocks = () => {
      const now = new Date();
      setClocks({
        lagos: now.toLocaleTimeString("en-US", {
          timeZone: "Africa/Lagos",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        london: now.toLocaleTimeString("en-US", {
          timeZone: "Europe/London",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        newYork: now.toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      });
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    sound.playChime(750, 0.2);
    navigator.clipboard.writeText(realEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#090b0f] text-[#f2f1ec] pt-20 pb-12 overflow-hidden">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[350px] w-[600px] rounded-full bg-[#a9ddf0]/5 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        {/* Massive Call to Action */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a9ddf0]" />
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#a9ddf0]">
              Collaboration &amp; Inquiries
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] max-w-4xl text-[#f2f1ec]">
            Have an ambitious vision? <br />
            <span className="font-editorial-italic font-normal text-[#a9ddf0]">Let&apos;s build interfaces of calm clarity.</span>
          </h2>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            {/* Copy Email Button */}
            <button
              onClick={handleCopyEmail}
              onMouseEnter={() => sound.playHover()}
              className="group flex items-center gap-3 rounded-full border border-white/[0.12] bg-white/[0.03] px-6 py-3.5 font-mono-code text-xs font-semibold text-[#f2f1ec] transition-all hover:border-[#a9ddf0] hover:bg-[#a9ddf0] hover:text-[#090b0f]"
            >
              <Mail size={15} />
              <span>{realEmail}</span>
              {copied ? (
                <span className="flex items-center gap-1 rounded bg-[#090b0f] px-2 py-0.5 text-[10px] text-[#a9ddf0]">
                  <Check size={11} /> COPIED
                </span>
              ) : (
                <Copy size={13} className="text-[#89919d] group-hover:text-[#090b0f] transition-colors" />
              )}
            </button>

            {/* Direct Project Inquiry Route */}
            <Link
              href="/contact"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-2 rounded-full bg-[#f2f1ec] px-7 py-3.5 font-mono-code text-xs font-semibold text-[#090b0f] transition-transform hover:scale-105 hover:bg-[#a9ddf0]"
            >
              <span>Start a Project Brief</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Global Clocks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-white/[0.08] py-8 my-12 font-mono-code text-xs">
          <div className="flex items-center justify-between sm:justify-start gap-4">
            <span className="text-[#89919d] uppercase">Lagos Base (WAT):</span>
            <span className="text-[#f2f1ec] font-medium">{clocks.lagos || "12:00"}</span>
          </div>
          <div className="flex items-center justify-between sm:justify-start gap-4">
            <span className="text-[#89919d] uppercase">London (GMT):</span>
            <span className="text-[#f2f1ec] font-medium">{clocks.london || "11:00"}</span>
          </div>
          <div className="flex items-center justify-between sm:justify-start gap-4">
            <span className="text-[#89919d] uppercase">New York (EST):</span>
            <span className="text-[#f2f1ec] font-medium">{clocks.newYork || "06:00"}</span>
          </div>
        </div>

        {/* Bottom Navigation & Credits */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 font-mono-code text-xs">
          <div>
            <h4 className="text-[#89919d] uppercase tracking-wider mb-4">Sitemap</h4>
            <ul className="space-y-2 text-[#89919d]">
              <li>
                <Link href="/" className="hover:text-[#a9ddf0] transition-colors">
                  01. Selected Works
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-[#a9ddf0] transition-colors">
                  02. Project Archive
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#a9ddf0] transition-colors">
                  03. About &amp; Philosophy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#a9ddf0] transition-colors">
                  04. Contact Brief
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#89919d] uppercase tracking-wider mb-4">Profiles</h4>
            <ul className="space-y-2 text-[#89919d]">
              <li>
                <a
                  href="https://x.com/taye_abolarin2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-[#a9ddf0] transition-colors"
                >
                  <span>X (Twitter)</span>
                  <ArrowUpRight size={11} className="opacity-40" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@taye_abolarin2?is_from_webapp=1&sender_device=pc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-[#a9ddf0] transition-colors"
                >
                  <span>TikTok</span>
                  <ArrowUpRight size={11} className="opacity-40" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/taye-abolarin-b503b0240/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-[#a9ddf0] transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight size={11} className="opacity-40" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.behance.net/Abolarin_Taye_Joseph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-[#a9ddf0] transition-colors"
                >
                  <span>Behance</span>
                  <ArrowUpRight size={11} className="opacity-40" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Bheemty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-[#a9ddf0] transition-colors"
                >
                  <span>GitHub</span>
                  <ArrowUpRight size={11} className="opacity-40" />
                </a>
              </li>
              <li>
                <a
                  href="https://colddesigner.lovable.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-[#a9ddf0] transition-colors"
                >
                  <span>Lovable Portfolio</span>
                  <ArrowUpRight size={11} className="opacity-40" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#89919d] uppercase tracking-wider mb-4">Discipline</h4>
            <p className="text-[#89919d] leading-relaxed">
              Product design spanning conversational UI, healthtech gateways, mobile transit, and spatial web experiences.
            </p>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-[#89919d] uppercase tracking-wider mb-4">Scroll</h4>
              <button
                onClick={scrollToTop}
                onMouseEnter={() => sound.playHover()}
                className="group flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-4 py-2 text-[#89919d] transition-all hover:border-[#a9ddf0] hover:text-[#a9ddf0]"
              >
                <span>Back to Top</span>
                <ArrowUp size={13} className="transition-transform group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Final Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/[0.08] pt-8 font-mono-code text-[11px] text-[#89919d] gap-4">
          <p>© {year} Cold Designer (Taye Abolarin). All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Built with Next.js, Lenis &amp; Tailwind</span>
            <span>•</span>
            <span className="text-[#a9ddf0]">Editorial Monograph</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowUpRight, Volume2, VolumeX, Mail } from "lucide-react";
import { sound } from "@/lib/sounds";

interface ElasticMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isSoundOn: boolean;
  onToggleSound: () => void;
}

const NAV_LINKS = [
  { href: "/", label: "Index", index: "01", caption: "Featured Work & Doctrine" },
  { href: "/work", label: "Archive", index: "02", caption: "Complete Project Directory" },
  { href: "/about", label: "About", index: "03", caption: "Verified Practice & Experience" },
  { href: "/contact", label: "Contact", index: "04", caption: "Dialogue & Collaboration" },
];

const SOCIAL_LINKS = [
  { label: "X (Twitter)", href: "https://x.com/taye_abolarin2" },
  { label: "TikTok", href: "https://www.tiktok.com/@taye_abolarin2?is_from_webapp=1&sender_device=pc" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/taye-abolarin-b503b0240/" },
  { label: "Behance", href: "https://www.behance.net/Abolarin_Taye_Joseph" },
  { label: "GitHub", href: "https://github.com/Bheemty" },
  { label: "Lovable", href: "https://colddesigner.lovable.app/" },
];

export default function ElasticMenu({
  isOpen,
  onClose,
  isSoundOn,
  onToggleSound,
}: ElasticMenuProps) {
  const pathname = usePathname();
  const [lagosTime, setLagosTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLagosTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Africa/Lagos",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Dimmed backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-998 bg-black/80 backdrop-blur-sm"
          />

          {/* Sliding panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="fixed top-0 right-0 bottom-0 z-999 flex w-full max-w-2xl flex-col justify-between border-l border-white/[0.08] bg-[#0d1016] p-6 sm:p-12 text-[#f2f1ec] shadow-2xl"
          >
            {/* Header row inside drawer */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a9ddf0]" />
                <span className="font-mono-code text-xs text-[#89919d] uppercase tracking-widest">
                  Navigation
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    sound.playClick();
                    onToggleSound();
                  }}
                  className="flex items-center gap-1.5 rounded-full border border-white/[0.1] px-3 py-1 font-mono-code text-xs text-[#89919d] hover:border-[#a9ddf0] hover:text-[#a9ddf0] transition-colors"
                >
                  {isSoundOn ? <Volume2 size={13} /> : <VolumeX size={13} />}
                  <span>{isSoundOn ? "AUDIO: ON" : "AUDIO: OFF"}</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    onClose();
                  }}
                  aria-label="Close navigation"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] text-[#f2f1ec] transition-transform hover:rotate-90 hover:border-[#a9ddf0] hover:text-[#a9ddf0]"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Main Navigation Links */}
            <div className="my-auto py-8">
              <p className="font-mono-code text-[11px] text-[#89919d] uppercase tracking-widest mb-6">
                Directory
              </p>
              <ul className="flex flex-col gap-4">
                {NAV_LINKS.map((link, idx) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + idx * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => {
                          sound.playClick();
                          onClose();
                        }}
                        onMouseEnter={() => sound.playHover()}
                        className="group flex items-baseline justify-between py-2 text-3xl sm:text-5xl font-display font-medium tracking-tight text-[#f2f1ec]/80 transition-all hover:text-[#a9ddf0] hover:translate-x-2"
                      >
                        <div className="flex items-baseline gap-4">
                          <span className="font-mono-code text-xs text-[#a9ddf0]/60 group-hover:text-[#a9ddf0]">
                            {link.index}
                          </span>
                          <span className={isActive ? "text-[#a9ddf0] font-bold" : ""}>
                            {link.label}
                          </span>
                        </div>
                        <span className="hidden sm:inline-block font-mono-code text-xs text-[#89919d] group-hover:text-[#f2f1ec] font-normal">
                          {link.caption}
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            {/* Footer details & Social links */}
            <div className="space-y-6 border-t border-white/[0.08] pt-6">
              <div className="grid grid-cols-2 gap-4 text-xs font-mono-code">
                <div>
                  <span className="text-[#89919d] uppercase block mb-1">Local Time / Base</span>
                  <span className="text-[#f2f1ec] font-medium">{lagosTime || "12:00:00"} WAT (UTC+1)</span>
                </div>
                <div>
                  <span className="text-[#89919d] uppercase block mb-1">Practice</span>
                  <span className="text-[#a9ddf0] font-medium flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#a9ddf0]" />
                    Cold Designer
                  </span>
                </div>
              </div>

              {/* Social Channels */}
              <div>
                <p className="font-mono-code text-[11px] text-[#89919d] uppercase tracking-widest mb-2">
                  Verified Profiles
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => sound.playHover()}
                      className="group flex items-center gap-1 font-mono-code text-xs text-[#89919d] hover:text-[#a9ddf0] transition-colors"
                    >
                      <span>{s.label}</span>
                      <ArrowUpRight size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Email CTA */}
              <div className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 font-mono-code text-xs">
                <div className="flex items-center gap-2 text-[#89919d]">
                  <Mail size={14} className="text-[#a9ddf0]" />
                  <span className="text-[#f2f1ec] text-[11px] sm:text-xs">abolarintaye20@gmail.com</span>
                </div>
                <Link
                  href="/contact"
                  onClick={() => {
                    sound.playClick();
                    onClose();
                  }}
                  className="rounded-lg bg-[#f2f1ec] px-3.5 py-1.5 font-semibold text-[#090b0f] hover:bg-[#a9ddf0] transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

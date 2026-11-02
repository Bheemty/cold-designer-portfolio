"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Volume2, VolumeX } from "lucide-react";
import { sound } from "@/lib/sounds";
import ElasticMenu from "./ElasticMenu";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    setIsSoundOn(sound.isEnabled());

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          timeZone: "Africa/Lagos",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 1000);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleSound = () => {
    const newState = sound.toggle();
    setIsSoundOn(newState);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#090b0f]/85 backdrop-blur-md border-b border-white/[0.08] py-3.5"
            : "bg-transparent py-5 sm:py-7"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-10">
          {/* Logo / Brand Name */}
          <Link
            href="/"
            onClick={() => sound.playClick()}
            onMouseEnter={() => sound.playHover()}
            className="group flex items-center gap-3"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.03] font-mono-code text-xs font-bold text-[#f2f1ec] transition-colors group-hover:border-[#a9ddf0] group-hover:text-[#a9ddf0]">
              CD
              <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-[#a9ddf0]" />
            </div>

            <div className="flex flex-col">
              <span className="font-display text-sm font-semibold tracking-wider text-[#f2f1ec] uppercase group-hover:text-[#a9ddf0] transition-colors">
                Cold Designer
              </span>
              <span className="font-mono-code text-[10px] tracking-tight text-[#89919d] uppercase">
                Taye Abolarin
              </span>
            </div>
          </Link>

          {/* Center Timezone & Navigation (Desktop) */}
          <div className="hidden md:flex items-center gap-8 font-mono-code text-xs text-[#89919d]">
            {/* Real-time local timezone tracker */}
            <div className="flex items-center gap-2 border-r border-white/[0.08] pr-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a9ddf0]" />
              <span className="text-[#89919d]">LAGOS / WAT:</span>
              <span className="font-medium text-[#f2f1ec]">{timeString || "12:00"}</span>
            </div>

            {/* Quick in-page routes */}
            <nav className="flex items-center gap-6">
              <Link
                href="/work"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className={`transition-colors hover:text-[#a9ddf0] ${
                  pathname === "/work" || pathname.startsWith("/work/")
                    ? "text-[#a9ddf0] font-semibold"
                    : "text-[#89919d]"
                }`}
              >
                Work
              </Link>
              <Link
                href="/about"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className={`transition-colors hover:text-[#a9ddf0] ${
                  pathname === "/about" ? "text-[#a9ddf0] font-semibold" : "text-[#89919d]"
                }`}
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className={`transition-colors hover:text-[#a9ddf0] ${
                  pathname === "/contact" ? "text-[#a9ddf0] font-semibold" : "text-[#89919d]"
                }`}
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Right Controls: Sound Toggle & Menu Trigger */}
          <div className="flex items-center gap-3">
            {/* Sound Toggle Button */}
            <button
              onClick={() => {
                toggleSound();
              }}
              onMouseEnter={() => sound.playHover()}
              aria-label="Toggle sound effects"
              className={`hidden sm:flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono-code text-[11px] transition-colors ${
                isSoundOn
                  ? "border-[#a9ddf0] bg-[#a9ddf0]/10 text-[#a9ddf0]"
                  : "border-white/[0.1] bg-white/[0.03] text-[#89919d] hover:border-white/20 hover:text-[#f2f1ec]"
              }`}
            >
              {isSoundOn ? (
                <>
                  <Volume2 size={13} className="text-[#a9ddf0]" />
                  <span className="flex items-center gap-0.5">
                    <span className="inline-block h-2 w-0.5 bg-[#a9ddf0] animate-pulse" />
                    <span className="inline-block h-3 w-0.5 bg-[#a9ddf0] animate-bounce" />
                    <span className="inline-block h-1.5 w-0.5 bg-[#a9ddf0] animate-pulse" />
                  </span>
                  <span>AUDIO</span>
                </>
              ) : (
                <>
                  <VolumeX size={13} />
                  <span>MUTE</span>
                </>
              )}
            </button>

            {/* Menu Trigger Button */}
            <button
              onClick={() => {
                sound.playClick();
                setIsMenuOpen(true);
              }}
              onMouseEnter={() => sound.playHover()}
              aria-label="Open menu"
              className="group flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-4 py-1.5 font-mono-code text-xs font-semibold text-[#f2f1ec] transition-all hover:border-[#a9ddf0] hover:bg-[#a9ddf0] hover:text-[#090b0f]"
            >
              <span className="uppercase tracking-wider">Menu</span>
              <span className="flex flex-col gap-1">
                <span className="h-0.5 w-3.5 bg-current transition-transform group-hover:translate-x-0.5" />
                <span className="h-0.5 w-2 bg-current transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Elastic Drawer Menu */}
      <ElasticMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        isSoundOn={isSoundOn}
        onToggleSound={toggleSound}
      />
    </>
  );
}

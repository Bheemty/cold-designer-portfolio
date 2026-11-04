"use client";

import React from "react";
import { Sparkles, MessageSquare, X } from "lucide-react";
import { sound } from "@/lib/sounds";

interface AskColdLauncherProps {
  isOpen: boolean;
  onToggle: () => void;
  hasUnread?: boolean;
  }

export default function AskColdLauncher({
  isOpen,
  onToggle,
  hasUnread = false,
  }: AskColdLauncherProps) {
  return (
    <button
      type="button"
      onClick={() => {
        sound.playClick();
        onToggle();
      }}
      aria-expanded={isOpen}
      aria-label={isOpen ? "Close Ask Cold assistant" : "Open Ask Cold AI representative"}
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 group flex items-center gap-2.5 rounded-full p-2.5 sm:px-4 sm:py-2.5 transition-all duration-300 cursor-pointer shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent,#a9ddf0)] ${
        isOpen
          ? "bg-[var(--bg-surface,#11141b)] text-[var(--text-primary,#f2f1ec)] border border-white/[0.14] scale-95"
          : "bg-[var(--bg-surface,#11141b)]/90 backdrop-blur-xl text-[var(--text-primary,#f2f1ec)] border border-white/[0.14] hover:border-[var(--accent,#a9ddf0)] hover:scale-105"
      }`}
      style={{
        transform: "translate3d(0, calc(-1 * var(--ask-cold-lift, 0px)), 0)",
        transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease, background-color 0.3s ease",
        boxShadow: isOpen
          ? "0 12px 36px -4px rgba(0, 0, 0, 0.6)"
          : "0 16px 40px -6px rgba(0, 0, 0, 0.5), 0 0 20px 0 rgba(169, 221, 240, 0.12)",
      }}
    >
      {/* Icon Badge */}
      <div className="relative flex items-center justify-center h-8 w-8 rounded-full bg-[var(--accent,#a9ddf0)] text-[#090b0f] shrink-0 font-bold transition-transform duration-300 group-hover:rotate-12">
        {isOpen ? (
          <X size={16} strokeWidth={2.5} />
        ) : (
          <Sparkles size={16} strokeWidth={2.5} />
        )}

        {/* Ambient idle pulse ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[var(--accent,#a9ddf0)]/30 animate-ping opacity-60 pointer-events-none" />
        )}

        {/* Unread indicator */}
        {hasUnread && !isOpen && (
          <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-[#11141b]" />
        )}
      </div>

      {/* Label on Desktop */}
      <div className="hidden sm:flex flex-col text-left font-mono-code leading-tight pr-1">
        <span className="text-xs font-semibold text-[var(--text-primary,#f2f1ec)] tracking-tight flex items-center gap-1.5">
          <span>Ask Cold</span>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
        <span className="text-[10px] text-[var(--text-secondary,#89919d)]">
          AI Representative
        </span>
      </div>
    </button>
  );
}


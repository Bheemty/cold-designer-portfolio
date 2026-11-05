"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { sound } from "@/lib/sounds";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  count?: number;
}

interface DirectionalTabsProps {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
  idPrefix?: string;
  variant?: "pill" | "glass";
  ariaLabel?: string;
}

/**
 * DirectionalTabs: Premium sliding hover tabs.
 * Combines an active selection indicator with a directional gliding hover indicator
 * powered by Motion layoutId and spring physics.
 */
export default function DirectionalTabs({
  tabs,
  activeId,
  onChange,
  className = "",
  idPrefix = "tabs",
  variant = "pill",
  ariaLabel = "Navigation tabs",
}: DirectionalTabsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (index + 1) % tabs.length;
      onChange(tabs[nextIndex].id);
      sound.playClick();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      onChange(tabs[prevIndex].id);
      sound.playClick();
    }
  };

  return (
    <nav
      aria-label={ariaLabel}
      onMouseLeave={() => setHoveredId(null)}
      onPointerLeave={() => setHoveredId(null)}
      className={`relative flex items-center gap-1.5 font-mono-code text-xs ${className}`}
    >
      {tabs.map((tab, idx) => {
        const isSelected = activeId === tab.id;
        const isHovered = hoveredId === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isSelected}
            tabIndex={isSelected ? 0 : -1}
            onPointerEnter={() => setHoveredId(tab.id)}
            onPointerOver={() => setHoveredId(tab.id)}
            onMouseEnter={() => setHoveredId(tab.id)}
            onMouseOver={() => setHoveredId(tab.id)}
            onFocus={() => setHoveredId(tab.id)}
            onBlur={() => setHoveredId(null)}
            onClick={() => {
              if (!isSelected) {
                sound.playClick();
                onChange(tab.id);
              }
            }}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`relative flex items-center gap-2 rounded-full px-4 py-2 transition-colors duration-200 whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a9ddf0] select-none ${
              variant === "glass"
                ? isSelected
                  ? "text-[#090b0f] font-semibold"
                  : "text-[#89919d] hover:text-[#f2f1ec]"
                : isSelected
                ? "text-[#a9ddf0] font-semibold"
                : "text-[#89919d] hover:text-[#f2f1ec] border border-white/[0.09] bg-white/[0.03] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.06)]"
            }`}
          >
            {/* 1. Active Selection Sliding Indicator */}
            {isSelected && (
              <motion.div
                data-active-pill="true"
                layoutId={`${idPrefix}-active-pill`}
                className={`absolute inset-0 rounded-full -z-10 ${
                  variant === "glass"
                    ? "bg-[#FDFDFD] shadow-[0_4px_14px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.8)]"
                    : "border border-[#a9ddf0]/50 bg-gradient-to-r from-[#a9ddf0]/25 to-[#a9ddf0]/15 shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.35),0_0_18px_0_rgba(169,221,240,0.2)]"
                }`}
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                  mass: 0.4,
                }}
              />
            )}

            {/* 2. Directional Gliding Hover Indicator (Pre-click cursor tracking) */}
            <AnimatePresence>
              {isHovered && !isSelected && (
                <motion.div
                  data-hover-pill="true"
                  layoutId={`${idPrefix}-hover-pill`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`absolute inset-0 rounded-full -z-10 ${
                    variant === "glass"
                      ? "bg-white/[0.1] border border-white/[0.15] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.15)]"
                      : "bg-white/[0.08] border border-white/[0.14] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.1)]"
                  }`}
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 30,
                    mass: 0.35,
                  }}
                />
              )}
            </AnimatePresence>

            {/* Label and optional Icon */}
            {Icon && <Icon size={13} className="shrink-0" />}
            <span className="relative z-10">{tab.label}</span>
            {typeof tab.count === "number" && (
              <span
                className={`relative z-10 text-[10px] px-1.5 py-0.5 rounded-full ${
                  isSelected
                    ? variant === "glass"
                      ? "bg-[#090b0f]/15 text-[#090b0f]"
                      : "bg-[#a9ddf0]/20 text-[#a9ddf0]"
                    : "bg-white/[0.06] text-[#89919d]"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}

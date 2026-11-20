"use client";

import { useState } from "react";
import { sound } from "@/lib/sounds";

interface CaseStudyDisclosureProps {
  title: string;
  badge?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function CaseStudyDisclosure({
  title,
  badge = "Detailed Deep Dive",
  children,
  defaultOpen = false,
}: CaseStudyDisclosureProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = () => {
    sound.playTick();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-full my-8 rounded-2xl border border-white/[0.10] bg-[#11141b]/60 overflow-hidden transition-all">
      <button
        type="button"
        onClick={toggle}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer hover:bg-white/[0.02] transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono-code text-xs text-[#a9ddf0] font-semibold">
            {isOpen ? "[-]" : "[+]"}
          </span>
          <span className="font-display text-base sm:text-lg font-bold text-[#f2f1ec] tracking-tight">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {badge && (
            <span className="font-mono-code text-[11px] text-[#89919d] rounded-full border border-white/[0.08] px-2.5 py-0.5">
              {badge}
            </span>
          )}
          <span className="font-mono-code text-xs text-[#a9ddf0]">
            {isOpen ? "Collapse Notes" : "Inspect Notes"}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/[0.06] animate-in fade-in duration-200">
          {children}
        </div>
      )}
    </div>
  );
}

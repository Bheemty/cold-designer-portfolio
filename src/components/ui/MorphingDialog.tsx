"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { sound } from "@/lib/sounds";

interface MorphingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  category?: string;
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}

/**
 * MorphingDialog: Shared-element FLIP modal with Lenis scroll lock
 * and accessible keyboard trapping (Esc key dismissal).
 */
export default function MorphingDialog({
  isOpen,
  onClose,
  title,
  category,
  children,
  className = "",
  maxWidth = "2xl",
}: MorphingDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Coordinate Lenis smooth scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      const lenis = (window as unknown as { __lenis?: { stop: () => void } }).__lenis;
      lenis?.stop?.();
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      const lenis = (window as unknown as { __lenis?: { start: () => void } }).__lenis;
      lenis?.start?.();
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      const lenis = (window as unknown as { __lenis?: { start: () => void } }).__lenis;
      lenis?.start?.();
    };
  }, [isOpen]);

  // Trap Escape key for dismissal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        sound.playClick();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
  }[maxWidth];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title || "Inspector Modal"}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          {/* Dimmed Optical Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="fixed inset-0 bg-[#090b0f]/80 backdrop-blur-xl"
            aria-hidden="true"
          />

          {/* Morphing Dialog Container */}
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full ${maxWidthClasses} my-auto rounded-3xl border border-white/[0.12] bg-[#11141b] text-[#f2f1ec] shadow-[0_24px_70px_-15px_rgba(0,0,0,0.8),inset_0_1px_1.5px_0_rgba(255,255,255,0.15)] overflow-hidden z-10 ${className}`}
          >
            {/* Header */}
            {(title || category) && (
              <div className="flex items-center justify-between border-b border-white/[0.08] px-6 sm:px-8 py-5">
                <div>
                  {category && (
                    <div className="flex items-center gap-2 font-mono-code text-[11px] text-[#a9ddf0] uppercase tracking-wider mb-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#a9ddf0] animate-pulse" />
                      <span>{category}</span>
                    </div>
                  )}
                  {title && (
                    <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#f2f1ec]">
                      {title}
                    </h3>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onClose();
                  }}
                  className="rounded-full p-2 text-[#89919d] hover:text-[#f2f1ec] hover:bg-white/[0.08] transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X size={18} />
                </button>
              </div>
            )}

            {/* Dialog Content */}
            <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto no-scrollbar">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

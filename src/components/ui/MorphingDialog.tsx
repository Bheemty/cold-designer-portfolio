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
  headerActions?: React.ReactNode;
}

/**
 * MorphingDialog: Shared-element FLIP modal with Lenis scroll isolation,
 * rock-solid background scroll locking (preserving exact scroll position),
 * pinned sticky header, independent top-to-bottom vertical scrolling,
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
  headerActions,
}: MorphingDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Coordinate robust scroll lock and Lenis isolation
  useEffect(() => {
    if (!isOpen) return;

    // Capture initial scroll position before locking
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop?.();

    const prevBodyStyles = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    };
    const prevHtmlOverflow = document.documentElement.style.overflow;

    // Fix body at exact negative scroll offset to prevent any background shifting
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Focus scrollable content for instant keyboard navigation (PageUp/Down, Arrows)
    const timer = setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.focus({ preventScroll: true });
      }
    }, 50);

    // Support natural touch scrolling: allow content to scroll, and forward header swipes
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      const isInsideScrollable = target?.closest("[data-dialog-scrollable]");
      if (!isInsideScrollable) {
        if (target?.closest("[role='dialog']") && contentRef.current) {
          const currentY = e.touches[0].clientY;
          const deltaY = touchStartY - currentY;
          contentRef.current.scrollTop += deltaY;
          touchStartY = currentY;
          if (e.cancelable) e.preventDefault();
        } else {
          if (e.cancelable) e.preventDefault();
        }
      }
    };
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      clearTimeout(timer);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);

      // Restore previous body and html styles
      document.body.style.position = prevBodyStyles.position;
      document.body.style.top = prevBodyStyles.top;
      document.body.style.left = prevBodyStyles.left;
      document.body.style.right = prevBodyStyles.right;
      document.body.style.width = prevBodyStyles.width;
      document.body.style.overflow = prevBodyStyles.overflow;
      document.documentElement.style.overflow = prevHtmlOverflow;

      // Restore exact scroll position
      window.scrollTo(0, scrollY);

      // Resume Lenis smooth scroll
      lenis?.start?.();
    };
  }, [isOpen]);

  // Handle keyboard navigation (Escape dismissal + Arrow / Page scrolling)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        sound.playClick();
        onClose();
        return;
      }
      if (!contentRef.current) return;
      if (e.key === "ArrowDown") {
        contentRef.current.scrollTop += 60;
      } else if (e.key === "ArrowUp") {
        contentRef.current.scrollTop -= 60;
      } else if (e.key === "PageDown" || (e.key === " " && !e.shiftKey)) {
        contentRef.current.scrollTop += contentRef.current.clientHeight * 0.8;
        e.preventDefault();
      } else if (e.key === "PageUp" || (e.key === " " && e.shiftKey)) {
        contentRef.current.scrollTop -= contentRef.current.clientHeight * 0.8;
        e.preventDefault();
      } else if (e.key === "Home") {
        contentRef.current.scrollTop = 0;
        e.preventDefault();
      } else if (e.key === "End") {
        contentRef.current.scrollTop = contentRef.current.scrollHeight;
        e.preventDefault();
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

  // Forward wheel scrolling when mouse is over non-scrollable header or margins
  const handleWheel = (e: React.WheelEvent) => {
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      contentRef.current.scrollTop += e.deltaY;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title || "Inspector Modal"}
          data-lenis-prevent
          className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-hidden pointer-events-auto"
        >
          {/* Dimmed Optical Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="fixed inset-0 bg-[#090b0f]/80 backdrop-blur-xl -z-10"
            aria-hidden="true"
          />

          {/* Morphing Dialog Container */}
          <motion.div
            ref={dialogRef}
            data-lenis-prevent
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onWheel={handleWheel}
            className={`relative flex flex-col w-full ${maxWidthClasses} max-h-[85vh] max-h-[calc(100dvh-2rem)] rounded-2xl sm:rounded-3xl border border-white/[0.12] bg-[#11141b] text-[#f2f1ec] shadow-[0_24px_70px_-15px_rgba(0,0,0,0.8),inset_0_1px_1.5px_0_rgba(255,255,255,0.15)] overflow-hidden z-10 ${className}`}
          >
            {/* Pinned Sticky Header */}
            {(title || category) && (
              <div className="shrink-0 sticky top-0 bg-[#11141b]/95 backdrop-blur-md z-20 flex items-center justify-between border-b border-white/[0.08] px-5 sm:px-8 py-4 sm:py-5">
                <div className="min-w-0 pr-4">
                  {category && (
                    <div className="flex items-center gap-2 font-mono-code text-[11px] text-[#a9ddf0] uppercase tracking-wider mb-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#a9ddf0] animate-pulse shrink-0" />
                      <span className="truncate">{category}</span>
                    </div>
                  )}
                  {title && (
                    <h3 className="font-display text-lg sm:text-2xl font-bold tracking-tight text-[#f2f1ec] truncate">
                      {title}
                    </h3>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {headerActions}
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      onClose();
                    }}
                    className="dialog-close-btn flex items-center justify-center h-9 w-9 rounded-full border border-white/[0.14] bg-white/[0.06] text-[#f2f1ec] hover:bg-white/[0.15] hover:border-white/[0.28] hover:text-[#FFFFFF] active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a9ddf0] shadow-sm shrink-0"
                    aria-label="Close dialog"
                    title="Close dialog (Esc)"
                  >
                    <X size={18} strokeWidth={2.4} />
                  </button>
                </div>
              </div>
            )}

            {/* Smooth Top-to-Bottom Independently Scrollable Content */}
            <div
              ref={contentRef}
              data-lenis-prevent
              data-dialog-scrollable
              tabIndex={0}
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 sm:px-8 py-6 focus:outline-none custom-modal-scrollbar"
              style={{
                WebkitOverflowScrolling: "touch",
                overscrollBehavior: "contain",
              }}
            >
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

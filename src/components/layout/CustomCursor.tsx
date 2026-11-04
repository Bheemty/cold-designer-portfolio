"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Only enable custom cursor on fine pointer devices without reduced motion
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const textEl = textRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let isHovered = false;
    let currentText = "";
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      isVisible = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    // Lightweight pointerover listener for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [data-cursor-interactive], input, textarea");
      const cursorTextAttr = target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text");

      if (cursorTextAttr) {
        if (currentText !== cursorTextAttr) {
          currentText = cursorTextAttr;
          if (textEl) textEl.textContent = cursorTextAttr;
          ring.classList.add("is-text");
          ring.classList.add("is-hovered");
        }
      } else if (interactive) {
        if (!isHovered) {
          isHovered = true;
          currentText = "";
          if (textEl) textEl.textContent = "";
          ring.classList.remove("is-text");
          ring.classList.add("is-hovered");
        }
      } else {
        if (isHovered || currentText) {
          isHovered = false;
          currentText = "";
          if (textEl) textEl.textContent = "";
          ring.classList.remove("is-text");
          ring.classList.remove("is-hovered");
        }
      }
    };

    // Smooth lerp rendering loop (resting state optimization to free main-thread during scroll)
    let lastRenderMouseX = -999;
    let lastRenderMouseY = -999;

    const render = () => {
      if (isVisible) {
        const dx = mouseX - ringX;
        const dy = mouseY - ringY;
        const distSq = dx * dx + dy * dy;

        // Only commit DOM style mutations while the cursor or spring ring is in active motion
        if (distSq > 0.04 || mouseX !== lastRenderMouseX || mouseY !== lastRenderMouseY) {
          lastRenderMouseX = mouseX;
          lastRenderMouseY = mouseY;
          dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

          ringX += dx * 0.2;
          ringY += dy * 0.2;
          ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        }
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden="true"
    >
      {/* Central precision dot (opacity controlled via style, GPU accelerated) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-[#a9ddf0] opacity-0 transition-opacity duration-200 will-change-transform"
      />

      {/* Outer fluid follower ring */}
      <div
        ref={ringRef}
        className="cursor-ring fixed top-0 left-0 flex items-center justify-center rounded-full border border-[#a9ddf0]/40 opacity-0 transition-[border-color,background-color,transform-box] duration-150 will-change-transform"
      >
        <span ref={textRef} className="cursor-text" />
      </div>
    </div>
  );
}

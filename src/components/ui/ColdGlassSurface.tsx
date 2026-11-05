"use client";

import React, { useRef } from "react";
import { STATIC_PILL_NORMAL_MAP, STATIC_CARD_NORMAL_MAP } from "./cold-glass-maps";

export type GlassShape = "pill" | "card" | "circle";
export type GlassElevation = "nav" | "panel" | "chip" | "subtle";

export interface ColdGlassSurfaceProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  shape?: GlassShape;
  elevation?: GlassElevation;
  interactive?: boolean;
  blur?: number;
  strength?: number;
  radius?: number | string;
  children?: React.ReactNode;
}

// ── GLOBAL SVG FILTER DEFINITION MOUNT (SYNCHRONOUS STATIC SSR + HYDRATION) ──
export function ColdGlassFilterDefs() {
  return (
    <svg
      className="fixed top-0 left-0 w-0 h-0 pointer-events-none opacity-0 select-none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter
          id="cold-glass-filter-pill"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feImage
            href={STATIC_PILL_NORMAL_MAP}
            result="pillMap"
            preserveAspectRatio="none"
            width="100%"
            height="100%"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="pillMap"
            scale="22"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <filter
          id="cold-glass-filter-card"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feImage
            href={STATIC_CARD_NORMAL_MAP}
            result="cardMap"
            preserveAspectRatio="none"
            width="100%"
            height="100%"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="cardMap"
            scale="22"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}

// ── COLD GLASS SURFACE COMPONENT ──
export const ColdGlassSurface = React.forwardRef<HTMLElement, ColdGlassSurfaceProps>(
  (
    {
      as: Component = "div",
      shape = "card",
      elevation = "panel",
      interactive = true,
      blur = 24,
      strength = 0.85,
      radius,
      className = "",
      style,
      children,
      onMouseMove,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const surfaceRef = useRef<HTMLElement | null>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
      if (interactive) {
        const target = surfaceRef.current;
        if (target) {
          const rect = target.getBoundingClientRect();
          target.style.setProperty("--cold-mouse-x", `${e.clientX - rect.left}px`);
          target.style.setProperty("--cold-mouse-y", `${e.clientY - rect.top}px`);
          target.style.setProperty("--cold-mouse-opacity", "1");
        }
      }
      if (onMouseMove) onMouseMove(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
      if (interactive) {
        const target = surfaceRef.current;
        if (target) {
          target.style.setProperty("--cold-mouse-opacity", "0");
        }
      }
      if (onMouseLeave) onMouseLeave(e);
    };

    const borderRadius =
      radius !== undefined
        ? radius
        : shape === "pill"
        ? "9999px"
        : shape === "circle"
        ? "50%"
        : elevation === "chip"
        ? "14px"
        : "24px";

    const filterUrl =
      shape === "pill"
        ? "url(#cold-glass-filter-pill)"
        : "url(#cold-glass-filter-card)";

    const baseBackdrop = `blur(${blur}px) saturate(190%) contrast(106%)`;
    const backdropFilter = `${filterUrl} ${baseBackdrop}`;

    return (
      <Component
        ref={(el: HTMLElement | null) => {
          surfaceRef.current = el;
          if (typeof ref === "function") ref(el);
          else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = el;
        }}
        className={`cold-glass-surface ${className}`}
        data-shape={shape}
        data-elevation={elevation}
        style={{
          borderRadius,
          backdropFilter,
          WebkitBackdropFilter: backdropFilter,
          ...style,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {/* Top & Bottom Meniscus Sheen */}
        <div
          className="cold-glass-sheen absolute inset-0 pointer-events-none rounded-[inherit]"
          aria-hidden="true"
        />

        {/* Dynamic Cursor Sheen Follower */}
        {interactive && (
          <div
            className="cold-glass-cursor-follower absolute inset-0 pointer-events-none rounded-[inherit]"
            aria-hidden="true"
          />
        )}

        {/* Content Container (flex-col min-h-0 to guarantee independent scroll bounding) */}
        <div className="relative z-10 w-full h-full flex flex-col min-h-0">{children}</div>
      </Component>
    );
  }
);

ColdGlassSurface.displayName = "ColdGlassSurface";



"use client";

import React, { useState, useEffect, useRef } from "react";

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

// ── SDF NORMAL MAP GENERATOR (SNELL'S LAW MENISCUS OPTICS) ──
function createSdfNormalMap(width: number, height: number, radius: number, rimWidth: number): string {
  if (typeof document === "undefined") return "";
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;
  const r = Math.min(radius, width / 2, height / 2);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      const cx = x < r ? r : x > width - r ? width - r : x;
      const cy = y < r ? r : y > height - r ? height - r : y;

      const dx = x - cx;
      const dy = y - cy;
      const cornerDist = Math.sqrt(dx * dx + dy * dy);

      let distToEdge = 0;
      let nx = 0;
      let ny = 0;

      if (x < r || x > width - r || y < r || y > height - r) {
        distToEdge = r - cornerDist;
        if (cornerDist > 0.001) {
          nx = -dx / cornerDist;
          ny = -dy / cornerDist;
        }
      } else {
        const distLeft = x;
        const distRight = width - x;
        const distTop = y;
        const distBottom = height - y;
        distToEdge = Math.min(distLeft, distRight, distTop, distBottom);

        if (distToEdge === distLeft) {
          nx = 1;
          ny = 0;
        } else if (distToEdge === distRight) {
          nx = -1;
          ny = 0;
        } else if (distToEdge === distTop) {
          nx = 0;
          ny = 1;
        } else {
          nx = 0;
          ny = -1;
        }
      }

      if (distToEdge < 0) {
        data[idx] = 128;
        data[idx + 1] = 128;
        data[idx + 2] = 128;
        data[idx + 3] = 0;
        continue;
      }

      if (distToEdge < rimWidth) {
        const t = distToEdge / rimWidth;
        const strengthVal = Math.sin((1 - t) * (Math.PI / 2));
        const red = Math.round(128 + nx * strengthVal * 127);
        const green = Math.round(128 + ny * strengthVal * 127);

        data[idx] = Math.max(0, Math.min(255, red));
        data[idx + 1] = Math.max(0, Math.min(255, green));
        data[idx + 2] = 128;
        data[idx + 3] = 255;
      } else {
        // Flat center: ZERO displacement, 100% clarity
        data[idx] = 128;
        data[idx + 1] = 128;
        data[idx + 2] = 128;
        data[idx + 3] = 255;
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return canvas.toDataURL("image/png");
}

let globalFilterMounted = false;

// ── GLOBAL SVG FILTER DEFINITION MOUNT ──
export function ColdGlassFilterDefs() {
  const [mounted, setMounted] = useState(false);
  const [pillMapUri, setPillMapUri] = useState("");
  const [cardMapUri, setCardMapUri] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && !globalFilterMounted) {
      globalFilterMounted = true;
      const pill = createSdfNormalMap(256, 64, 32, 22);
      const card = createSdfNormalMap(256, 256, 28, 22);
      setPillMapUri(pill);
      setCardMapUri(card);
      setMounted(true);
    }
  }, []);

  if (!mounted || !pillMapUri) return null;

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
          <feImage href={pillMapUri} result="pillMap" preserveAspectRatio="none" width="100%" height="100%" />
          <feDisplacementMap in="SourceGraphic" in2="pillMap" scale="22" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        <filter
          id="cold-glass-filter-card"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feImage href={cardMapUri} result="cardMap" preserveAspectRatio="none" width="100%" height="100%" />
          <feDisplacementMap in="SourceGraphic" in2="cardMap" scale="22" xChannelSelector="R" yChannelSelector="G" />
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
    const [isChromium, setIsChromium] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
      if (typeof window !== "undefined") {
        const isChromeVendor =
          /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        setIsChromium(isChromeVendor);
      }
    }, []);

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
      isChromium && isClient
        ? shape === "pill"
          ? "url(#cold-glass-filter-pill)"
          : "url(#cold-glass-filter-card)"
        : "";

    const baseBackdrop = `blur(${blur}px) saturate(160%) contrast(102%)`;
    const backdropFilter = filterUrl ? `${filterUrl} ${baseBackdrop}` : baseBackdrop;

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


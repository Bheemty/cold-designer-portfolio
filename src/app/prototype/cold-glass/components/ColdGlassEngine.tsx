"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

// ── COLD GLASS CONTEXT & THEME DEFINITIONS ──
export type GlassTheme = "dark" | "light";

interface ColdGlassContextType {
  theme: GlassTheme;
  setTheme: (t: GlassTheme) => void;
  toggleTheme: () => void;
  refractionScale: number;
  setRefractionScale: (s: number) => void;
  rimWidth: number;
  setRimWidth: (w: number) => void;
  specularStrength: number;
  setSpecularStrength: (s: number) => void;
  refractionMode: "optical" | "caustic" | "legacy";
  setRefractionMode: (m: "optical" | "caustic" | "legacy") => void;
  isFilterSupported: boolean;
}

const ColdGlassContext = createContext<ColdGlassContextType>({
  theme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
  refractionScale: 20,
  setRefractionScale: () => {},
  rimWidth: 20,
  setRimWidth: () => {},
  specularStrength: 0.9,
  setSpecularStrength: () => {},
  refractionMode: "optical",
  setRefractionMode: () => {},
  isFilterSupported: true,
});

export const useColdGlass = () => useContext(ColdGlassContext);

// ── SDF NORMAL MAP GENERATOR (SNEIL'S LAW OPTICS) ──
// Generates a normal map where flat interior = rgb(128, 128, 128) (zero displacement),
// and the perimeter rim contains surface normal vectors encoding optical curvature.
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

      // Distance to corner centers
      const cx = x < r ? r : x > width - r ? width - r : x;
      const cy = y < r ? r : y > height - r ? height - r : y;

      const dx = x - cx;
      const dy = y - cy;
      const cornerDist = Math.sqrt(dx * dx + dy * dy);

      let distToEdge = 0;
      let nx = 0;
      let ny = 0;

      if (x < r || x > width - r || y < r || y > height - r) {
        // Corner region
        distToEdge = r - cornerDist;
        if (cornerDist > 0.001) {
          nx = -dx / cornerDist;
          ny = -dy / cornerDist;
        }
      } else {
        // Flat edge regions
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

      // If outside the outer boundary (clipped by border-radius)
      if (distToEdge < 0) {
        data[idx] = 128;
        data[idx + 1] = 128;
        data[idx + 2] = 128;
        data[idx + 3] = 0;
        continue;
      }

      // If inside the rim meniscus zone
      if (distToEdge < rimWidth) {
        // Smoothstep meniscus curvature (cosine curve)
        const t = distToEdge / rimWidth;
        const strength = Math.sin((1 - t) * (Math.PI / 2));

        // Inward optical bending (refraction towards the center of thickness)
        const red = Math.round(128 + nx * strength * 127);
        const green = Math.round(128 + ny * strength * 127);

        data[idx] = Math.max(0, Math.min(255, red));
        data[idx + 1] = Math.max(0, Math.min(255, green));
        data[idx + 2] = 128;
        data[idx + 3] = 255;
      } else {
        // Flat center: ZERO displacement, 100% clarity for underlying text
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

// ── GLOBAL SVG FILTER MOUNT & PROVIDER ──
export function ColdGlassProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<GlassTheme>("dark");
  const [refractionScale, setRefractionScale] = useState(22);
  const [rimWidth, setRimWidth] = useState(22);
  const [specularStrength, setSpecularStrength] = useState(0.85);
  const [refractionMode, setRefractionMode] = useState<"optical" | "caustic" | "legacy">("optical");
  const [pillMapUri, setPillMapUri] = useState("");
  const [cardMapUri, setCardMapUri] = useState("");
  const [isFilterSupported, setIsFilterSupported] = useState(true);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    // Check if backdrop-filter with url() is supported
    if (typeof window !== "undefined") {
      const isChromium =
        /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
      setIsFilterSupported(isChromium);

      // Generate SDF normal maps for Pill and Card geometries
      const pill = createSdfNormalMap(256, 64, 32, rimWidth);
      const card = createSdfNormalMap(256, 256, 28, rimWidth);
      setPillMapUri(pill);
      setCardMapUri(card);
    }
  }, [rimWidth]);

  return (
    <ColdGlassContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        refractionScale,
        setRefractionScale,
        rimWidth,
        setRimWidth,
        specularStrength,
        setSpecularStrength,
        refractionMode,
        setRefractionMode,
        isFilterSupported,
      }}
    >
      {/* ── SVG LENS REFRACTION DEFINITIONS ── */}
      <svg
        className="fixed top-0 left-0 w-0 h-0 pointer-events-none opacity-0"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {pillMapUri && (
            <filter
              id="cold-glass-filter-pill"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
              colorInterpolationFilters="sRGB"
            >
              <feImage
                href={pillMapUri}
                result="pillMap"
                preserveAspectRatio="none"
                width="100%"
                height="100%"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="pillMap"
                scale={refractionScale}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          )}

          {cardMapUri && (
            <filter
              id="cold-glass-filter-card"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
              colorInterpolationFilters="sRGB"
            >
              <feImage
                href={cardMapUri}
                result="cardMap"
                preserveAspectRatio="none"
                width="100%"
                height="100%"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="cardMap"
                scale={refractionScale}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          )}
        </defs>
      </svg>

      <div data-cold-theme={theme} className={`cold-glass-root theme-${theme}`}>
        {children}
      </div>
    </ColdGlassContext.Provider>
  );
}

// ── COLD GLASS SURFACE COMPONENT ──
// High-fidelity physical glass container with Snell's law refraction,
// specular meniscus highlights, and cursor-reactive environmental sheen.
export interface ColdGlassSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: "pill" | "card" | "circle";
  elevation?: "nav" | "panel" | "chip" | "subtle";
  interactive?: boolean;
  blur?: number;
  children?: React.ReactNode;
}

export const ColdGlassSurface = React.forwardRef<HTMLDivElement, ColdGlassSurfaceProps>(
  (
    {
      shape = "card",
      elevation = "panel",
      interactive = true,
      blur = 24,
      className = "",
      style,
      children,
      onMouseMove,
      ...props
    },
    ref
  ) => {
    const { theme, refractionMode, isFilterSupported, specularStrength } = useColdGlass();
    const surfaceRef = useRef<HTMLDivElement | null>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive) return;
      const target = surfaceRef.current;
      if (target) {
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        target.style.setProperty("--cold-mouse-x", `${x}px`);
        target.style.setProperty("--cold-mouse-y", `${y}px`);
        target.style.setProperty("--cold-mouse-opacity", "1");
      }
      if (onMouseMove) onMouseMove(e);
    };

    const handleMouseLeave = () => {
      if (!interactive) return;
      const target = surfaceRef.current;
      if (target) {
        target.style.setProperty("--cold-mouse-opacity", "0");
      }
    };

    // Styling based on theme
    const isDark = theme === "dark";

    // Select filter if optical mode and supported
    const filterId =
      refractionMode === "optical" && isFilterSupported
        ? shape === "pill"
          ? "url(#cold-glass-filter-pill)"
          : "url(#cold-glass-filter-card)"
        : undefined;

    // Radius styling
    const borderRadius =
      shape === "pill"
        ? "9999px"
        : shape === "circle"
        ? "50%"
        : elevation === "chip"
        ? "14px"
        : "24px";

    // Dual theme material recipes
    const materialStyles: React.CSSProperties = isDark
      ? {
          // Dark Theme: Smoked Obsidian Glass
          backgroundColor: "rgba(11, 15, 23, 0.72)",
          borderColor: "rgba(255, 255, 255, 0.12)",
          boxShadow: `
            inset 0 1.5px 1.5px 0 rgba(255, 255, 255, ${0.40 * specularStrength}),
            inset 0 -1.5px 1.5px 0 rgba(0, 0, 0, 0.50),
            inset 0 0 0 1px rgba(255, 255, 255, 0.08),
            0 24px 64px -12px rgba(0, 0, 0, 0.65),
            0 4px 16px -2px rgba(0, 0, 0, 0.35)
          `,
          color: "#f2f1ec",
        }
      : {
          // Light Theme: Liquid Quartz Crystal
          backgroundColor: "rgba(255, 255, 255, 0.82)",
          borderColor: "rgba(255, 255, 255, 0.90)",
          boxShadow: `
            inset 0 1.5px 1.5px 0 rgba(255, 255, 255, ${1.0 * specularStrength}),
            inset 0 -1.5px 1.5px 0 rgba(15, 23, 42, 0.08),
            inset 0 0 0 1px rgba(255, 255, 255, 0.60),
            0 20px 48px -12px rgba(15, 23, 42, 0.14),
            0 4px 14px -2px rgba(15, 23, 42, 0.06)
          `,
          color: "#0f131a",
        };

    // Backdrop filter composition
    let backdropFilter = `blur(${blur}px) saturate(${isDark ? "145%" : "165%"}) contrast(${isDark ? "102%" : "104%"})`;
    if (filterId && refractionMode === "optical") {
      backdropFilter = `${filterId} ${backdropFilter}`;
    }

    return (
      <div
        ref={(el) => {
          surfaceRef.current = el;
          if (typeof ref === "function") ref(el);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }}
        className={`relative overflow-hidden transition-colors duration-300 ${className}`}
        style={{
          borderRadius,
          borderWidth: "1px",
          borderStyle: "solid",
          backdropFilter,
          WebkitBackdropFilter: backdropFilter,
          ...materialStyles,
          ...style,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {/* Specular Edge Highlight Layer (Meniscus Sheen) */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit]"
          style={{
            background: isDark
              ? "linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 40%, rgba(0, 0, 0, 0.25) 100%)"
              : "linear-gradient(180deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0) 35%, rgba(15, 23, 42, 0.04) 100%)",
            opacity: specularStrength,
          }}
          aria-hidden="true"
        />

        {/* Dynamic Cursor Sheen Follower */}
        {interactive && (
          <div
            className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300"
            style={{
              background: `radial-gradient(400px circle at var(--cold-mouse-x, -500px) var(--cold-mouse-y, -500px), ${
                isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.45)"
              }, transparent 60%)`,
              opacity: "var(--cold-mouse-opacity, 0)",
            }}
            aria-hidden="true"
          />
        )}

        {/* Content Container */}
        <div className="relative z-10 w-full h-full flex flex-col min-h-0">{children}</div>
      </div>
    );
  }
);

ColdGlassSurface.displayName = "ColdGlassSurface";

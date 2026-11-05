"use client";

import React, { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { useTheme } from "@/context/ThemeContext";

interface CobeGlobeProps {
  className?: string;
}

/**
 * CobeGlobe: Lightweight WebGL dot-matrix globe.
 * Visualizes the studio base in Lagos, Nigeria (6.5244° N, 3.3792° E)
 * with dynamic ResizeObserver scaling, calibrated contrast palettes,
 * and inertia-damped interactive rotation.
 */
export default function CobeGlobe({ className = "" }: CobeGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [webGlSupported, setWebGlSupported] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Check WebGL availability before mounting createGlobe
    try {
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
    } catch {
      setWebGlSupported(false);
      return;
    }

    const dpr = Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1);
    let currentWidth = container.offsetWidth || 320;

    // Palette calibrated to Cold Designer aesthetic and high contrast visibility
    // Dark: Luminous icy-cyan dots over dark sphere
    // Light: Refined slate-navy dots over soft sphere
    const baseColor: [number, number, number] = isLight
      ? [0.32, 0.44, 0.58]
      : [0.45, 0.65, 0.88];
    const markerColor: [number, number, number] = isLight
      ? [0.02, 0.48, 0.65] // refined teal-cyan
      : [0.66, 0.87, 0.94]; // #a9ddf0 signature cold accent
    const glowColor: [number, number, number] = isLight
      ? [0.82, 0.88, 0.96]
      : [0.12, 0.28, 0.45];

    let phi = 0;
    let rafId = 0;
    let globe: ReturnType<typeof createGlobe> | null = null;

    try {
      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: currentWidth * dpr,
        height: currentWidth * dpr,
        phi: 0,
        theta: 0.16,
        dark: isLight ? 0 : 1,
        diffuse: isLight ? 1.2 : 1.35,
        mapSamples: 16000,
        mapBrightness: isLight ? 3.6 : 4.8,
        mapBaseBrightness: isLight ? 0.05 : 0.08,
        baseColor,
        markerColor,
        glowColor,
        opacity: isLight ? 0.9 : 0.92,
        scale: 1.05,
        markers: [
          // Studio Base: Lagos, Nigeria (WAT / UTC+1)
          { location: [6.5244, 3.3792], size: 0.09 },
        ],
      });

      // ResizeObserver to handle container layout changes dynamically
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const w = Math.round(entry.contentRect.width);
          if (w > 40 && Math.abs(w - currentWidth) > 2) {
            currentWidth = w;
            globe?.update({
              width: w * dpr,
              height: w * dpr,
            });
          }
        }
      });
      resizeObserver.observe(container);

      // Render loop with inertia damping on drag release
      let hasRenderedFirstFrame = false;
      const render = () => {
        if (pointerInteracting.current === null) {
          // Smooth continuous auto-rotation
          phi += 0.003;
        } else {
          // Drag rotation with momentum
          phi += pointerInteractionMovement.current;
          pointerInteractionMovement.current *= 0.92;
        }

        globe?.update({
          phi,
        });

        if (!hasRenderedFirstFrame) {
          hasRenderedFirstFrame = true;
          setIsLoaded(true);
        }

        rafId = requestAnimationFrame(render);
      };
      rafId = requestAnimationFrame(render);

      return () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
        resizeObserver.disconnect();
        if (globe) {
          globe.destroy();
        }
      };
    } catch (err) {
      console.warn("Cobe Globe WebGL initialization fallback:", err);
      setWebGlSupported(false);
    }
  }, [isLight]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-square max-w-[340px] mx-auto flex items-center justify-center overflow-hidden ${className}`}
    >
      {webGlSupported ? (
        <>
          <canvas
            ref={canvasRef}
            onPointerDown={(e) => {
              pointerInteracting.current =
                e.clientX - pointerInteractionMovement.current;
              if (canvasRef.current) {
                canvasRef.current.style.cursor = "grabbing";
              }
            }}
            onPointerUp={() => {
              pointerInteracting.current = null;
              if (canvasRef.current) {
                canvasRef.current.style.cursor = "grab";
              }
            }}
            onPointerOut={() => {
              pointerInteracting.current = null;
              if (canvasRef.current) {
                canvasRef.current.style.cursor = "grab";
              }
            }}
            onMouseMove={(e) => {
              if (pointerInteracting.current !== null) {
                const delta = e.clientX - pointerInteracting.current;
                pointerInteractionMovement.current = delta * 0.005;
              }
            }}
            onTouchMove={(e) => {
              if (pointerInteracting.current !== null && e.touches[0]) {
                const delta = e.touches[0].clientX - pointerInteracting.current;
                pointerInteractionMovement.current = delta * 0.005;
              }
            }}
            className="w-full h-full"
            style={{
              contain: "layout paint size",
              cursor: "grab",
            }}
          />

          {/* Monograph Coordinate Badge Overlay */}
          <div className="pointer-events-none absolute bottom-2 inset-x-0 flex items-center justify-center">
            <div
              className={`flex items-center gap-2 rounded-full border px-3.5 py-1 text-[11px] font-mono-code shadow-lg backdrop-blur-md transition-colors ${
                isLight
                  ? "border-black/[0.08] bg-white/80 text-[#4a5568]"
                  : "border-white/[0.12] bg-[#090b0f]/80 text-[#89919d]"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#a9ddf0] animate-pulse" />
              <span className={isLight ? "text-[#090b0f] font-semibold" : "text-[#f2f1ec] font-semibold"}>
                Lagos, NG
              </span>
              <span>&bull;</span>
              <span>6.5244&deg; N, 3.3792&deg; E</span>
            </div>
          </div>
        </>
      ) : (
        /* Clean fallback if WebGL is disabled or unsupported */
        <div className="flex flex-col items-center justify-center p-6 text-center font-mono-code text-xs text-[#89919d] border border-white/[0.08] rounded-2xl bg-white/[0.02]">
          <div className="h-2 w-2 rounded-full bg-[#a9ddf0] animate-pulse mb-3" />
          <span className="text-sm font-semibold text-[#f2f1ec] mb-1">Studio Base</span>
          <span>Lagos, Nigeria (WAT / UTC+1)</span>
          <span className="text-[10px] text-[#89919d]/70 mt-2">6.5244&deg; N, 3.3792&deg; E</span>
        </div>
      )}
    </div>
  );
}

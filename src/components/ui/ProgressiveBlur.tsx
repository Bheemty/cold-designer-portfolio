"use client";

import React from "react";

interface ProgressiveBlurProps {
  className?: string;
  position?: "top" | "bottom";
  height?: string;
  maxBlur?: number;
}

const BLUR_STOPS = [
  { blur: 1, stop: 100 },
  { blur: 2, stop: 87.5 },
  { blur: 4, stop: 75 },
  { blur: 8, stop: 62.5 },
  { blur: 14, stop: 50 },
  { blur: 20, stop: 37.5 },
  { blur: 28, stop: 25 },
  { blur: 36, stop: 12.5 },
];

/**
 * ProgressiveBlur: Multi-stop optical gradient blur overlay.
 * Softens scrolling content seamlessly under the fixed navigation
 * without harsh boundary lines or abrupt cutoffs.
 */
export default function ProgressiveBlur({
  className = "",
  position = "top",
  height = "110px",
}: ProgressiveBlurProps) {
  const isTop = position === "top";

  return (
    <div
      aria-hidden="true"
      className={`fixed left-0 right-0 pointer-events-none select-none z-[150] overflow-hidden ${
        isTop ? "top-0" : "bottom-0"
      } ${className}`}
      style={{ height }}
    >
      {/* 8-layer optical gradient blur stack */}
      {BLUR_STOPS.map((layer, index) => {
        const maskGradient = isTop
          ? `linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) ${layer.stop * 0.3}%, rgba(0, 0, 0, 0) ${layer.stop}%)`
          : `linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) ${layer.stop * 0.3}%, rgba(0, 0, 0, 0) ${layer.stop}%)`;

        return (
          <div
            key={index}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${layer.blur}px)`,
              WebkitBackdropFilter: `blur(${layer.blur}px)`,
              maskImage: maskGradient,
              WebkitMaskImage: maskGradient,
            }}
          />
        );
      })}

      {/* Atmospheric luminance tint for seamless edge dissipation */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: isTop
            ? "linear-gradient(to bottom, var(--progressive-blur-tint, rgba(9, 11, 15, 0.72)) 0%, rgba(9, 11, 15, 0) 100%)"
            : "linear-gradient(to top, var(--progressive-blur-tint, rgba(9, 11, 15, 0.72)) 0%, rgba(9, 11, 15, 0) 100%)",
        }}
      />
    </div>
  );
}

"use client";

import React from "react";

interface DitherVeilProps {
  className?: string;
  opacity?: number;
  density?: "low" | "medium" | "high";
}

/**
 * DitherVeil: 1-bit Bayer matrix dither texture backdrop.
 * Celebrates algorithmic digital craft with a restrained, hardware-accelerated
 * stipple pattern and subtle radial edge vignette.
 */
export default function DitherVeil({
  className = "",
  opacity = 0.05,
  density = "medium",
}: DitherVeilProps) {
  // Bayer 4x4 matrix threshold coordinates scaled to 16x16 grid
  const patternSize = density === "high" ? 12 : density === "medium" ? 16 : 24;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 select-none overflow-hidden z-0 ${className}`}
      style={{
        opacity,
        maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 100%)",
      }}
    >
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="bayer-dither-matrix"
            width={patternSize}
            height={patternSize}
            patternUnits="userSpaceOnUse"
          >
            {/* Bayer 4x4 index points */}
            <rect x="0" y="0" width="1.2" height="1.2" fill="currentColor" />
            <rect x={patternSize * 0.5} y={patternSize * 0.5} width="1.2" height="1.2" fill="currentColor" />
            <rect x={patternSize * 0.5} y="0" width="1.2" height="1.2" fill="currentColor" />
            <rect x="0" y={patternSize * 0.5} width="1.2" height="1.2" fill="currentColor" />
            <rect x={patternSize * 0.25} y={patternSize * 0.75} width="1.2" height="1.2" fill="currentColor" />
            <rect x={patternSize * 0.75} y={patternSize * 0.25} width="1.2" height="1.2" fill="currentColor" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#bayer-dither-matrix)"
          className="text-[#f2f1ec]"
        />
      </svg>
    </div>
  );
}

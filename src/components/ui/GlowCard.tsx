"use client";

import React, { useRef } from "react";

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  glowRadius?: number;
}

/**
 * GlowCard: Mouse-proximity radial illuminated surface.
 * Dynamically projects an ambient spotlight matching pointer coordinates
 * for subtle physical depth and responsive interface tactility.
 */
export default function GlowCard({
  children,
  className = "",
  glowColor = "rgba(169, 221, 240, 0.14)",
  glowRadius = 380,
  ...rest
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--glow-x", `${x}px`);
    cardRef.current.style.setProperty("--glow-y", `${y}px`);
    cardRef.current.style.setProperty("--glow-opacity", "1");
  };

  const handlePointerLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--glow-opacity", "0");
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#11141b] transition-all duration-300 ${className}`}
      {...rest}
    >
      {/* Radial proximity illumination beam */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: "var(--glow-opacity, 0)",
          background: `radial-gradient(${glowRadius}px circle at var(--glow-x, 50%) var(--glow-y, 50%), ${glowColor}, transparent 65%)`,
        }}
      />

      {/* Surface content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

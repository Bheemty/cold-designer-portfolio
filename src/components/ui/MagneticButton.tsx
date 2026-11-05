"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  maxDistance?: number;
  strength?: number;
  disabled?: boolean;
}

/**
 * MagneticButton: Bounded spring proximity cursor attraction.
 * Gently pulls interactive CTA controls towards fine pointer devices (mouse)
 * and strictly disables on touch/mobile devices to preserve native touch targets.
 */
export default function MagneticButton({
  children,
  className = "",
  maxDistance = 12,
  strength = 0.35,
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isPointerFine, setIsPointerFine] = useState(false);

  useEffect(() => {
    // Check if device uses fine pointer (mouse/trackpad), not touch
    const checkPointer = () => {
      const fine = window.matchMedia("(pointer: fine)").matches;
      setIsPointerFine(fine);
    };

    checkPointer();
    window.addEventListener("resize", checkPointer, { passive: true });
    return () => window.removeEventListener("resize", checkPointer);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 190, damping: 15, mass: 0.2 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerFine || disabled || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rawDx = (e.clientX - centerX) * strength;
    const rawDy = (e.clientY - centerY) * strength;
    const distance = Math.hypot(rawDx, rawDy);

    if (distance > maxDistance && distance > 0) {
      const clampRatio = maxDistance / distance;
      x.set(rawDx * clampRatio);
      y.set(rawDy * clampRatio);
    } else {
      x.set(rawDx);
      y.set(rawDy);
    }
  };

  const handlePointerLeave = () => {
    if (!isPointerFine || disabled) return;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        x: isPointerFine && !disabled ? springX : 0,
        y: isPointerFine && !disabled ? springY : 0,
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

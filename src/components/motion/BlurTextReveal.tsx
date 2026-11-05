"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

interface BlurTextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  delay?: number;
  staggerDelay?: number;
  duration?: number;
  once?: boolean;
}

/**
 * BlurTextReveal: Controlled editorial blur-to-sharp typography reveal.
 * Splits text into individual words and orchestrates an organic blur-to-focus
 * wave using Motion spring easing, with reduced-motion fallback.
 */
export default function BlurTextReveal({
  text,
  as = "h2",
  className = "",
  delay = 0,
  staggerDelay = 0.045,
  duration = 0.55,
  once = true,
}: BlurTextRevealProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  const words = text.split(/\s+/).filter(Boolean);
  const Component = motion[as] as typeof motion.div;

  if (reducedMotion) {
    const StaticComponent = as;
    return <StaticComponent className={className}>{text}</StaticComponent>;
  }

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-40px" }}
      className={className}
      aria-label={text}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0"
        >
          <motion.span
            variants={{
              hidden: {
                filter: "blur(12px)",
                opacity: 0,
                y: 12,
              },
              visible: {
                filter: "blur(0px)",
                opacity: 1,
                y: 0,
              },
            }}
            transition={{
              duration,
              delay: delay + index * staggerDelay,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}

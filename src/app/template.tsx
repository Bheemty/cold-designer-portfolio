"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function Template({ children }: { children: React.ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Respect system accessibility setting for reduced motion
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);

    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener("change", listener);

    // Scroll window smoothly to top on route change if not targeting a hash anchor
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, opts?: { immediate?: boolean }) => void } }).__lenis;
      lenis?.scrollTo?.(0, { immediate: true });
    }

    return () => media.removeEventListener("change", listener);
  }, []);

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.32,
        ease: [0.16, 1, 0.3, 1], // Apple-inspired fluid easing curve
      }}
      className="w-full flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
}


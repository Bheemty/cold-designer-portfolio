"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Do not hijack native touch scrolling on touch-only mobile devices (prevents sluggish iOS/Android scroll)
    const isTouchOnly = window.matchMedia("(pointer: coarse) and (hover: none)").matches;
    if (isTouchOnly) return;

    // Ensure CSS doesn't fight Lenis
    document.documentElement.style.scrollBehavior = "auto";

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 0.95,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      syncTouch: false,
      autoResize: true,
    });

    lenisRef.current = lenis;
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // 1. Tell ScrollTrigger to update whenever Lenis scrolls
    lenis.on("scroll", ScrollTrigger.update);
    lenis.resize();

    // 2. Drive Lenis through GSAP's unified master ticker
    // Eliminates competing requestAnimationFrame loops, double-ticking, and frame-tearing
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000); // GSAP provides time in seconds; Lenis expects milliseconds
    };
    gsap.ticker.add(updateTicker);

    // 3. Keep lagSmoothing at a healthy threshold so hitch recovery works smoothly without violent jumping
    gsap.ticker.lagSmoothing(500, 33);

    // 4. Continuously synchronize Lenis limits with dynamic DOM height changes (images loading, accordions, filters)
    let resizeTimer: NodeJS.Timeout;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (lenisRef.current) {
          lenisRef.current.resize();
        }
        ScrollTrigger.refresh();
      }, 60);
    });
    if (document.body) {
      resizeObserver.observe(document.body);
    }

    return () => {
      clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      gsap.ticker.remove(updateTicker);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  // When pathname changes, immediately reset scroll position to top and force immediate dimension recalculation
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      lenisRef.current.resize();
    } else if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    ScrollTrigger.refresh();

    // Re-calculate after 0.32s page transition completes to ensure pinpoint accuracy
    const timer = setTimeout(() => {
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
      ScrollTrigger.refresh();
    }, 360);

    return () => clearTimeout(timer);
  }, [pathname]);

  return <>{children}</>;
}

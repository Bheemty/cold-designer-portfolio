"use client";

import { useEffect, useRef, ReactNode, ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  scale?: number;
  toggleActions?: string;
  as?: ElementType;
  itemSelector?: string;
}

export default function ScrollReveal({
  children,
  className = "",
  y = 24,
  duration = 0.5,
  delay = 0,
  stagger = 0,
  start = "top 85%",
  scale = 1,
  toggleActions = "play none none reverse",
  as: Component = "div",
  itemSelector,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = containerRef.current;
    if (!el) return;

    // Accessibility: bypass animations if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    let targets: Element[] | Element = el;
    if (itemSelector) {
      const selected = Array.from(el.querySelectorAll(itemSelector));
      if (selected.length > 0) targets = selected;
    } else if (stagger > 0 && el.children.length > 0) {
      targets = Array.from(el.children);
    }

    const anim = gsap.fromTo(
      targets,
      { y, opacity: 0.15, scale },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration,
        delay,
        stagger: stagger > 0 ? stagger : undefined,
        ease: "power2.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions,
          fastScrollEnd: true,
        },
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [y, duration, delay, stagger, start, scale, toggleActions, itemSelector]);

  return (
    <Component ref={containerRef} className={className}>
      {children}
    </Component>
  );
}


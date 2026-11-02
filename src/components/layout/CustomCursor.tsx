"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for following follower
  const springX = useSpring(mouseX, { stiffness: 500, damping: 28, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28, mass: 0.5 });

  useEffect(() => {
    // Only enable custom cursor on fine pointer devices and when reduced motion is not preferred
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;
    setIsPointerDevice(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Global listener for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [data-cursor-interactive], input, textarea");
      const cursorTextAttr = target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text");

      if (cursorTextAttr) {
        setCursorText(cursorTextAttr);
        setIsHovered(true);
      } else if (interactive) {
        setCursorText("");
        setIsHovered(true);
      } else {
        setCursorText("");
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isPointerDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-9999 overflow-hidden">
      {/* Central precision dot */}
      <motion.div
        className="fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-[#a9ddf0] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Outer fluid spring ring / pill */}
      <motion.div
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full border border-[#a9ddf0]/60 transition-colors duration-200 ${
          cursorText
            ? "bg-[#a9ddf0] text-[#090b0f] border-transparent px-3 py-1 font-mono-code font-bold text-[10px] tracking-wider uppercase"
            : isHovered
            ? "bg-[#a9ddf0]/15 scale-180 border-[#a9ddf0]"
            : "bg-transparent scale-100"
        }`}
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: cursorText ? "auto" : isHovered ? "42px" : "26px",
          height: cursorText ? "auto" : isHovered ? "42px" : "26px",
        }}
        transition={{ type: "spring", stiffness: 450, damping: 25 }}
      >
        {cursorText && (
          <span className="whitespace-nowrap select-none">{cursorText}</span>
        )}
      </motion.div>
    </div>
  );
}

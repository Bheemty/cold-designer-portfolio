"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { sound } from "@/lib/sounds";

export default function HeroKokil() {
  const heroRef = useRef<HTMLElement>(null);
  const dotsGroupRef = useRef<SVGGElement>(null);
  const [hintHidden, setHintHidden] = useState(false);

  const resetScratch = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const dotsGroup = dotsGroupRef.current;
    if (dotsGroup) {
      while (dotsGroup.firstChild) {
        dotsGroup.removeChild(dotsGroup.firstChild);
      }
    }
    setHintHidden(false);
    try {
      sound.playClick();
    } catch {}
  }, []);

  useEffect(() => {
    const heroEl = heroRef.current;
    const dotsGroup = dotsGroupRef.current;
    if (!heroEl || !dotsGroup) return;

    let isHeroVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isHeroVisible = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0.05 }
    );
    observer.observe(heroEl);

    // ── Eye pupil tracking with cached coordinates to avoid layout thrashing ──
    const eyeEls = Array.from(heroEl.querySelectorAll<HTMLElement>(".eye"));
    const pupilEls = eyeEls.map((eye) => eye.querySelector<HTMLElement>(".pupil"));
    const maxMove = 28;

    let eyeCenters: Array<{ cx: number; cy: number }> = [];

    function updateEyeCenters() {
      eyeCenters = eyeEls.map((eye) => {
        const rect = eye.getBoundingClientRect();
        return {
          cx: rect.left + rect.width / 2,
          cy: rect.top + rect.height / 2,
        };
      });
    }

    updateEyeCenters();
    window.addEventListener("resize", updateEyeCenters, { passive: true });

    let pendingPointerX = -1000;
    let pendingPointerY = -1000;
    let eyeRaf = 0;

    function renderEyes() {
      if (!isHeroVisible || eyeCenters.length === 0) {
        eyeRaf = requestAnimationFrame(renderEyes);
        return;
      }

      pupilEls.forEach((pupil, idx) => {
        if (!pupil || !eyeCenters[idx]) return;
        const { cx, cy } = eyeCenters[idx];
        const dx = pendingPointerX - cx;
        const dy = pendingPointerY - cy;
        const dist = Math.min(maxMove, Math.hypot(dx, dy) / 8);
        const angle = Math.atan2(dy, dx);
        const ox = Math.cos(angle) * dist;
        const oy = Math.sin(angle) * dist;
        pupil.style.transform = `translate3d(calc(-50% + ${ox.toFixed(1)}px), calc(-50% + ${oy.toFixed(1)}px), 0)`;
      });

      eyeRaf = requestAnimationFrame(renderEyes);
    }

    eyeRaf = requestAnimationFrame(renderEyes);

    function handleMouseMove(e: MouseEvent) {
      if (!isHeroVisible) return;
      pendingPointerX = e.clientX;
      pendingPointerY = e.clientY;
    }

    const blinkInterval = setInterval(() => {
      if (!isHeroVisible) return;
      eyeEls.forEach((eye) => eye.classList.add("blink"));
      setTimeout(() => {
        eyeEls.forEach((eye) => eye.classList.remove("blink"));
      }, 150);
    }, 3200);

    // ── Rub to reveal painted canvas ──
    const MAX_DOTS = 220; // Lightweight SVG tree that keeps scrolling silky smooth
    const MIN_DIST = 22;
    const BRUSH_RADIUS = 280;
    let lastX: number | null = null;
    let lastY: number | null = null;

    function addDot(clientX: number, clientY: number) {
      if (!heroEl || !dotsGroup || !isHeroVisible) return;
      const rect = heroEl.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (lastX !== null && lastY !== null) {
        const dist = Math.hypot(x - lastX, y - lastY);
        if (dist < MIN_DIST) return;
      }
      lastX = x;
      lastY = y;

      setHintHidden(true);

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", String(x));
      circle.setAttribute("cy", String(y));
      circle.setAttribute("r", String(BRUSH_RADIUS));
      circle.setAttribute("fill", "white");
      dotsGroup.appendChild(circle);

      while (dotsGroup.childNodes.length > MAX_DOTS) {
        if (dotsGroup.firstChild) {
          dotsGroup.removeChild(dotsGroup.firstChild);
        }
      }
    }

    let sweepTimeout: NodeJS.Timeout | null = null;
    let sweepInterval: NodeJS.Timeout | null = null;

    function cancelAutoSweep() {
      if (sweepTimeout) {
        clearTimeout(sweepTimeout);
        sweepTimeout = null;
      }
      if (sweepInterval) {
        clearInterval(sweepInterval);
        sweepInterval = null;
      }
    }

    function onPointerMove(e: PointerEvent) {
      cancelAutoSweep();
      addDot(e.clientX, e.clientY);
    }

    function onTouchMove(e: TouchEvent) {
      cancelAutoSweep();
      if (e.touches[0]) {
        addDot(e.touches[0].clientX, e.touches[0].clientY);
      }
    }

    function onPointerLeave() {
      lastX = null;
      lastY = null;
    }

    // Auto-sweep for touch screens after idle time if user hasn't scratched
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) {
      sweepTimeout = setTimeout(() => {
        const r = heroEl.getBoundingClientRect();
        const rows = Math.max(3, Math.ceil(r.height / 280));
        let step = 0;
        const totalSteps = rows * 5;
        sweepInterval = setInterval(() => {
          if (step > totalSteps) {
            if (sweepInterval) clearInterval(sweepInterval);
            return;
          }
          const rowIdx = Math.floor(step / 5);
          const colIdx = step % 5;
          const x = (colIdx / 4) * r.width;
          const y = (rowIdx / rows) * r.height;
          addDot(r.left + x, r.top + y);
          step++;
        }, 50);
      }, 4000);
    }

    const handleThemeChange = () => {
      cancelAutoSweep();
      if (dotsGroup) {
        while (dotsGroup.firstChild) {
          dotsGroup.removeChild(dotsGroup.firstChild);
        }
      }
      setHintHidden(false);
      lastX = null;
      lastY = null;
    };

    window.addEventListener("cold-designer-theme-change", handleThemeChange);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    heroEl.addEventListener("pointermove", onPointerMove, { passive: true });
    heroEl.addEventListener("touchmove", onTouchMove, { passive: true });
    heroEl.addEventListener("pointerleave", onPointerLeave, { passive: true });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(eyeRaf);
      cancelAutoSweep();
      window.removeEventListener("resize", updateEyeCenters);
      window.removeEventListener("cold-designer-theme-change", handleThemeChange);
      window.removeEventListener("mousemove", handleMouseMove);
      heroEl.removeEventListener("pointermove", onPointerMove);
      heroEl.removeEventListener("touchmove", onTouchMove);
      heroEl.removeEventListener("pointerleave", onPointerLeave);
      clearInterval(blinkInterval);
    };
  }, []);

  return (
    <section ref={heroRef} id="hero">
      {/* Revealed Canvas Paint (Obsidian dark in dark mode, pristine #FDFDFD in light mode) */}
      <div className="hero-paint" id="heroPaint" />

      {/* Base Layer: completely concealed initial state in both themes */}
      <div className="hero-base">
        <div className="hero-main">
          <p className="hero-hello">Hi, I&rsquo;m Taye &mdash; a</p>
          <h1 className="hero-title">
            <span className="line line-1">
              Product
              <span className="eyes-scene">
                <span className="eye">
                  <span className="pupil" />
                </span>
                <span className="eye">
                  <span className="pupil" />
                </span>
                <div className="eyes-labels" aria-hidden="false">
                  <button
                    type="button"
                    className="hero-hide-btn"
                    onClick={resetScratch}
                    title="Re-hide hero"
                    aria-label="Re-hide hero"
                  >
                    HIDE
                  </button>
                  <span
                    className={`cursor-hint ${hintHidden ? "hide" : ""}`}
                    id="cursorHint"
                    aria-hidden={hintHidden}
                  >
                    COLOR ME
                  </span>
                </div>
              </span>
            </span>
            <span className="line line-2">Designer</span>
          </h1>
        </div>
        <div className="hero-bottom">
          <p className="hero-desc">
            I design clear, sensible digital products for complex real-world workflows &mdash; turning messy operational problems into intuitive interfaces and rapid working prototypes.
          </p>
          <div className="hero-actions">
            <a href="#work" className="hero-btn primary" tabIndex={-1} aria-hidden="true">
              Explore selected work <span aria-hidden="true">&darr;</span>
            </a>
            <a href="mailto:abolarintaye20@gmail.com" className="hero-btn ghost" tabIndex={-1} aria-hidden="true">
              Get in touch
            </a>
          </div>
        </div>
        <div className="hero-strip" aria-hidden="true">
          <span>Portfolio &rsquo;26</span>
          <span className="skills">
            Conversational UX<span className="dot">&middot;</span>Transit Systems<span className="dot">&middot;</span>Design Systems<span className="dot">&middot;</span>Figma
          </span>
          <span>Scroll &darr;</span>
        </div>
      </div>

      {/* Invert Layer: progressively revealed only within scratched areas */}
      <div className="hero-invert" id="heroInvert" aria-hidden="true">
        <div className="hero-main">
          <p className="hero-hello">Hi, I&rsquo;m Taye &mdash; a</p>
          <h1 className="hero-title">
            <span className="line line-1">
              Product
              <span className="eyes-spacer" aria-hidden="true">
                <span />
                <span />
              </span>
            </span>
            <span className="line line-2">Designer</span>
          </h1>
        </div>
        <div className="hero-bottom">
          <p className="hero-desc">
            I design clear, sensible digital products for complex real-world workflows &mdash; turning messy operational problems into intuitive interfaces and rapid working prototypes.
          </p>
          <div className="hero-actions">
            <a href="#work" className="hero-btn primary">
              Explore selected work <span aria-hidden="true">&darr;</span>
            </a>
            <a href="mailto:abolarintaye20@gmail.com" className="hero-btn ghost">
              Get in touch
            </a>
          </div>
        </div>
        <div className="hero-strip">
          <span>Portfolio &rsquo;26</span>
          <span className="skills">
            Conversational UX<span className="dot">&middot;</span>Transit Systems<span className="dot">&middot;</span>Design Systems<span className="dot">&middot;</span>Figma
          </span>
          <span>Scroll &darr;</span>
        </div>
      </div>

      {/* SVG Mask with dynamic #rubDots */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <mask id="rubMask" maskUnits="objectBoundingBox" x="-20%" y="-20%" width="140%" height="140%">
            <rect x="-2000" y="-2000" width="5000" height="5000" fill="black" />
            <g ref={dotsGroupRef} id="rubDots" />
          </mask>
        </defs>
      </svg>
    </section>
  );
}

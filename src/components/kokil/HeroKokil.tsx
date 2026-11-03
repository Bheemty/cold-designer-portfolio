"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { sound } from "@/lib/sounds";

const HERO_REVEALED_KEY = "cold_designer_hero_revealed";

function getHeroRevealedState(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const val = window.sessionStorage.getItem(HERO_REVEALED_KEY);
    if (val === "true") return true;
    return document.documentElement.getAttribute("data-hero-revealed") === "true";
  } catch {
    try {
      return document.documentElement.getAttribute("data-hero-revealed") === "true";
    } catch {
      return false;
    }
  }
}

function setHeroRevealedState(revealed: boolean) {
  if (typeof window === "undefined") return;
  try {
    if (revealed) {
      window.sessionStorage.setItem(HERO_REVEALED_KEY, "true");
      // Note: We deliberately do NOT set data-hero-revealed on documentElement here
      // to avoid triggering any CSS mask removal while the visitor is actively on the page!
    } else {
      window.sessionStorage.removeItem(HERO_REVEALED_KEY);
      document.documentElement.removeAttribute("data-hero-revealed");
    }
  } catch {
    try {
      if (!revealed) {
        document.documentElement.removeAttribute("data-hero-revealed");
      }
    } catch {}
  }
}

// Spatial grid resolution for measuring actual erased surface coverage
const GRID_COLS = 28;
const GRID_ROWS = 16;
const TOTAL_CELLS = GRID_COLS * GRID_ROWS; // 448 discrete surface cells
const COMPLETION_THRESHOLD = 0.70; // Genuine 70% physical erased surface coverage

export default function HeroKokil() {
  const heroRef = useRef<HTMLElement>(null);
  const dotsGroupRef = useRef<SVGGElement>(null);

  // Initialize revealed state strictly from session (only true if completed on an earlier visit in this session)
  const [isRevealed, setIsRevealed] = useState(() => getHeroRevealedState());
  const [hintHidden, setHintHidden] = useState(() => getHeroRevealedState());
  const hasCompletedRef = useRef(false);

  // Erased cells tracker for measuring genuine physical surface coverage
  const erasedCellsRef = useRef<Set<number>>(new Set());

  const resetScratch = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    hasCompletedRef.current = false;
    erasedCellsRef.current.clear();
    setHeroRevealedState(false);
    setIsRevealed(false);
    setHintHidden(false);

    const heroEl = heroRef.current;
    if (heroEl) {
      heroEl.classList.remove("is-revealed");
    }

    const dotsGroup = dotsGroupRef.current;
    if (dotsGroup) {
      while (dotsGroup.firstChild) {
        dotsGroup.removeChild(dotsGroup.firstChild);
      }
    }
    try {
      sound.playClick();
    } catch {}
  }, []);

  useEffect(() => {
    const heroEl = heroRef.current;
    const dotsGroup = dotsGroupRef.current;
    if (!heroEl || !dotsGroup) return;

    // Check saved session state on mount: if visitor completed reveal on a prior visit in this session, show revealed
    const savedRevealed = getHeroRevealedState();
    if (savedRevealed) {
      hasCompletedRef.current = true;
      setIsRevealed(true);
      setHintHidden(true);
      document.documentElement.setAttribute("data-hero-revealed", "true");
      heroEl.classList.add("is-revealed");
    }

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

    // ── 100% Pure Manual Progressive Rub-to-Reveal ──
    const MAX_DOTS = 900; // Capacity from original reference implementation
    const MIN_DIST = 18; // Distance between strokes from original reference
    const BRUSH_RADIUS = 280; // Radius from original reference
    let lastX: number | null = null;
    let lastY: number | null = null;
    let isScratching = false;

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

      // Calculate genuine surface area erased (without artificially inflating on repeat strokes)
      const cellW = rect.width / GRID_COLS;
      const cellH = rect.height / GRID_ROWS;
      const minCol = Math.max(0, Math.floor((x - BRUSH_RADIUS) / cellW));
      const maxCol = Math.min(GRID_COLS - 1, Math.floor((x + BRUSH_RADIUS) / cellW));
      const minRow = Math.max(0, Math.floor((y - BRUSH_RADIUS) / cellH));
      const maxRow = Math.min(GRID_ROWS - 1, Math.floor((y + BRUSH_RADIUS) / cellH));

      for (let r = minRow; r <= maxRow; r++) {
        const cellCenterY = (r + 0.5) * cellH;
        for (let c = minCol; c <= maxCol; c++) {
          const cellCenterX = (c + 0.5) * cellW;
          if (Math.hypot(x - cellCenterX, y - cellCenterY) <= BRUSH_RADIUS) {
            erasedCellsRef.current.add(r * GRID_COLS + c);
          }
        }
      }

      const coverageRatio = erasedCellsRef.current.size / TOTAL_CELLS;

      // Completion occurs ONLY after visitor genuinely scratches the required 70% proportion of surface
      // NOTE: This NEVER automatically unveils unscratched areas or alters the mask while on the page!
      // The visitor continues manual scratching uninterrupted.
      if (!hasCompletedRef.current && coverageRatio >= COMPLETION_THRESHOLD) {
        hasCompletedRef.current = true;
        setHeroRevealedState(true);
      }
    }

    function onPointerDown(e: PointerEvent) {
      if ((e.target as HTMLElement)?.closest("button, a")) return;
      isScratching = true;
      lastX = null;
      lastY = null;
      addDot(e.clientX, e.clientY);
    }

    function onPointerMove(e: PointerEvent) {
      pendingPointerX = e.clientX;
      pendingPointerY = e.clientY;
      // Erase only when visitor physically presses and moves, or touches the screen
      const isMouseDown = (e.buttons & 1) === 1;
      const isTouch = e.pointerType === "touch";
      if (isScratching && (isMouseDown || isTouch)) {
        addDot(e.clientX, e.clientY);
      }
    }

    function onPointerUp() {
      isScratching = false;
      lastX = null;
      lastY = null;
    }

    function onTouchStart(e: TouchEvent) {
      if ((e.target as HTMLElement)?.closest("button, a")) return;
      isScratching = true;
      lastX = null;
      lastY = null;
      if (e.touches[0]) {
        addDot(e.touches[0].clientX, e.touches[0].clientY);
      }
    }

    function onTouchMove(e: TouchEvent) {
      if (e.touches[0]) {
        pendingPointerX = e.touches[0].clientX;
        pendingPointerY = e.touches[0].clientY;
        if (isScratching) {
          addDot(e.touches[0].clientX, e.touches[0].clientY);
        }
      }
    }

    function onTouchEnd() {
      isScratching = false;
      lastX = null;
      lastY = null;
    }

    const handleThemeChange = () => {
      if (getHeroRevealedState()) {
        return;
      }
      if (dotsGroup) {
        while (dotsGroup.firstChild) {
          dotsGroup.removeChild(dotsGroup.firstChild);
        }
      }
      erasedCellsRef.current.clear();
      hasCompletedRef.current = false;
      setHintHidden(false);
      lastX = null;
      lastY = null;
    };

    window.addEventListener("cold-designer-theme-change", handleThemeChange);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    heroEl.addEventListener("pointerdown", onPointerDown);
    heroEl.addEventListener("pointermove", onPointerMove, { passive: true });

    heroEl.addEventListener("touchstart", onTouchStart, { passive: true });
    heroEl.addEventListener("touchmove", onTouchMove, { passive: true });
    heroEl.addEventListener("touchend", onTouchEnd, { passive: true });
    heroEl.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(eyeRaf);
      window.removeEventListener("resize", updateEyeCenters);
      window.removeEventListener("cold-designer-theme-change", handleThemeChange);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);

      heroEl.removeEventListener("pointerdown", onPointerDown);
      heroEl.removeEventListener("pointermove", onPointerMove);

      heroEl.removeEventListener("touchstart", onTouchStart);
      heroEl.removeEventListener("touchmove", onTouchMove);
      heroEl.removeEventListener("touchend", onTouchEnd);
      heroEl.removeEventListener("touchcancel", onTouchEnd);

      clearInterval(blinkInterval);
    };
  }, []);

  return (
    <section ref={heroRef} id="hero" className={isRevealed ? "is-revealed" : ""}>
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
            <rect x="-2000" y="-2000" width="5000" height="5000" fill={isRevealed ? "white" : "black"} />
            <g ref={dotsGroupRef} id="rubDots" />
          </mask>
        </defs>
      </svg>
    </section>
  );
}

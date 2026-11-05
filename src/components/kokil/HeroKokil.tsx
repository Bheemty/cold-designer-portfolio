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
      // while actively on the page to avoid abruptly removing the mask while visitor is viewing/scratching!
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

  // Initialize revealed state as false for SSR consistency; restored on client mount in useEffect
  const [isRevealed, setIsRevealed] = useState(false);
  const [hintHidden, setHintHidden] = useState(false);
  const hasCompletedRef = useRef(false);

  // Erased cells tracker for measuring genuine physical surface coverage
  const erasedCellsRef = useRef<Set<number>>(new Set());

  // Refs for managing auto-sweep lifecycle and restart on mobile
  const autoSweepCancelRef = useRef<(() => void) | null>(null);
  const triggerAutoScratchRef = useRef<(() => void) | null>(null);

  const resetScratch = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    // Cancel running auto-sweep animation if active
    if (autoSweepCancelRef.current) {
      autoSweepCancelRef.current();
      autoSweepCancelRef.current = null;
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

    // On mobile / touch devices, restart the progressive automatic scratch animation
    if (triggerAutoScratchRef.current) {
      triggerAutoScratchRef.current();
    }
  }, []);

  useEffect(() => {
    const heroEl = heroRef.current;
    const dotsGroup = dotsGroupRef.current;
    if (!heroEl || !dotsGroup) return;

    // Detect device capabilities: mouse/fine pointer desktop vs mobile/tablet touch
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

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

    function getEyeMidpoint() {
      if (eyeCenters.length === 0) {
        return { mx: window.innerWidth / 2, my: window.innerHeight / 2 };
      }
      const sumX = eyeCenters.reduce((acc, c) => acc + c.cx, 0);
      const sumY = eyeCenters.reduce((acc, c) => acc + c.cy, 0);
      return {
        mx: sumX / eyeCenters.length,
        my: sumY / eyeCenters.length,
      };
    }

    updateEyeCenters();
    window.addEventListener("resize", updateEyeCenters, { passive: true });

    let pendingPointerX = -1000;
    let pendingPointerY = -1000;
    let eyeRaf = 0;

    // Mobile tap-directed gaze offsets (relative to center -50%, -50%)
    const currentOx = [0, 0];
    const currentOy = [0, 0];
    const targetOx = [0, 0];
    const targetOy = [0, 0];
    let hasActiveMobileGaze = false;
    let mobileRestTimer: number | null = null;

    function renderEyes() {
      if (!isHeroVisible || eyeCenters.length === 0) {
        eyeRaf = requestAnimationFrame(renderEyes);
        return;
      }

      if (isDesktop) {
        // Desktop: Instantaneous 1:1 mouse tracking preserved exactly
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
      } else {
        // Mobile & touch: Smooth biological saccade transition (lerp) toward target tap or auto-sweep position
        if (hasActiveMobileGaze) {
          const LERP_FACTOR = 0.14; // ~220ms smooth natural eye motion
          pupilEls.forEach((pupil, idx) => {
            if (!pupil) return;
            currentOx[idx] += (targetOx[idx] - currentOx[idx]) * LERP_FACTOR;
            currentOy[idx] += (targetOy[idx] - currentOy[idx]) * LERP_FACTOR;

            const isRestTarget = Math.abs(targetOx[idx]) < 0.01 && Math.abs(targetOy[idx]) < 0.01;
            const isAtRest = Math.abs(currentOx[idx]) < 0.15 && Math.abs(currentOy[idx]) < 0.15;

            if (isRestTarget && isAtRest) {
              currentOx[idx] = 0;
              currentOy[idx] = 0;
              pupil.style.transform = `translate3d(-50%, -50%, 0)`;
            } else {
              pupil.style.transform = `translate3d(calc(-50% + ${currentOx[idx].toFixed(1)}px), calc(-50% + ${currentOy[idx].toFixed(1)}px), 0)`;
            }
          });
        } else {
          // Default initial resting position before any interaction
          pupilEls.forEach((pupil) => {
            if (pupil) {
              pupil.style.transform = `translate3d(-50%, -50%, 0)`;
            }
          });
        }
      }

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

    // ── Progressive Mask Erasure & Spatial Coverage Engine ──
    const MAX_DOTS = 900;
    const MIN_DIST = 18;
    const BRUSH_RADIUS = 280;
    let lastX: number | null = null;
    let lastY: number | null = null;

    function addLocalDot(x: number, y: number, heroW: number, heroH: number) {
      if (!heroEl || !dotsGroup) return;

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
      const cellW = heroW / GRID_COLS;
      const cellH = heroH / GRID_ROWS;
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
      // On desktop: never snaps DOM mask while visitor is actively scratching on the page.
      if (!hasCompletedRef.current && coverageRatio >= COMPLETION_THRESHOLD) {
        hasCompletedRef.current = true;
        setHeroRevealedState(true);
      }
    }

    function addDotFromClientCoords(clientX: number, clientY: number) {
      if (!heroEl || !dotsGroup || !isHeroVisible) return;
      const rect = heroEl.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      addLocalDot(x, y, rect.width, rect.height);
    }

    // ── DESKTOP: MANUAL MOUSE-MOVEMENT SCRATCHING ──
    let onDesktopPointerMove: ((e: PointerEvent) => void) | null = null;
    let onDesktopPointerDown: ((e: PointerEvent) => void) | null = null;
    let onDesktopPointerLeave: (() => void) | null = null;

    if (isDesktop) {
      // Desktop visitors manually reveal the Hero using ordinary mouse movement.
      // No clicking, holding or click-and-dragging is required.
      // Erasing stops immediately when the mouse stops moving.
      onDesktopPointerMove = (e: PointerEvent) => {
        if (!isHeroVisible) return;
        pendingPointerX = e.clientX;
        pendingPointerY = e.clientY;

        // Keep HIDE button click target clean
        if ((e.target as HTMLElement)?.closest(".hero-hide-btn")) return;

        addDotFromClientCoords(e.clientX, e.clientY);
      };

      onDesktopPointerDown = (e: PointerEvent) => {
        if (!isHeroVisible) return;
        if ((e.target as HTMLElement)?.closest(".hero-hide-btn")) return;
        addDotFromClientCoords(e.clientX, e.clientY);
      };

      onDesktopPointerLeave = () => {
        lastX = null;
        lastY = null;
      };

      heroEl.addEventListener("pointermove", onDesktopPointerMove, { passive: true });
      heroEl.addEventListener("pointerdown", onDesktopPointerDown, { passive: true });
      heroEl.addEventListener("pointerleave", onDesktopPointerLeave, { passive: true });
      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      // No auto-scratch on desktop
      triggerAutoScratchRef.current = null;
    }

    // ── MOBILE & TABLET: PROGRESSIVE AUTOMATIC SCRATCH ANIMATION ──
    if (!isDesktop) {
      // Mobile and tablet visitors are NOT required to tap, click, drag or swipe.
      // The website automatically begins a smooth, progressive serpentine / zig-zag scratch animation.
      function startAutoScratch() {
        if (!heroEl || !dotsGroup) return;
        if (hasCompletedRef.current) return;

        const rect = heroEl.getBoundingClientRect();
        if (rect.height <= 0 || rect.width <= 0) {
          const retryTimer = window.setTimeout(startAutoScratch, 100);
          autoSweepCancelRef.current = () => window.clearTimeout(retryTimer);
          return;
        }

        const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const numRows = Math.max(4, Math.ceil(rect.height / 180));
        const stepsInRow = Math.max(12, Math.round(rect.width / 32));
        const pts: Array<{ x: number; y: number }> = [];

        for (let i = 0; i < numRows; i++) {
          const rowY = (rect.height * (i + 0.5)) / numRows;
          const isEven = i % 2 === 0;
          const fromX = isEven ? -40 : rect.width + 40;
          const toX = isEven ? rect.width + 40 : -40;

          for (let k = 0; k <= stepsInRow; k++) {
            const t = k / stepsInRow;
            const x = fromX + (toX - fromX) * t;
            const y = rowY + Math.sin(t * Math.PI) * 12;
            pts.push({ x, y });
          }
        }

        if (isReduced) {
          pts.forEach((pt) => addLocalDot(pt.x, pt.y, rect.width, rect.height));
          hasCompletedRef.current = true;
          setHeroRevealedState(true);
          setIsRevealed(true);
          heroEl.classList.add("is-revealed");
          return;
        }

        let ptIndex = 0;
        let rafId = 0;
        let lastTime = 0;
        const STEP_INTERVAL_MS = 25; // ~25ms per point -> ~1.5s total smooth sweep

        function sweepStep(timestamp: number) {
          if (!lastTime) lastTime = timestamp;
          const delta = timestamp - lastTime;

          if (delta >= STEP_INTERVAL_MS) {
            lastTime = timestamp;
            const pt = pts[ptIndex++];
            if (pt) {
              addLocalDot(pt.x, pt.y, rect.width, rect.height);
              // Googly eyes follow the sweep coordinates across the surface
              const ptX = rect.left + pt.x;
              const ptY = rect.top + pt.y;
              eyeCenters.forEach((center, idx) => {
                const dx = ptX - center.cx;
                const dy = ptY - center.cy;
                const dist = Math.min(maxMove, Math.hypot(dx, dy) / 8);
                const angle = Math.atan2(dy, dx);
                targetOx[idx] = Math.cos(angle) * dist;
                targetOy[idx] = Math.sin(angle) * dist;
                currentOx[idx] = targetOx[idx];
                currentOy[idx] = targetOy[idx];
              });
              hasActiveMobileGaze = true;
            }
          }

          if (ptIndex < pts.length) {
            rafId = requestAnimationFrame(sweepStep);
          } else {
            // Sweep complete: Hero is fully revealed
            hasCompletedRef.current = true;
            setHeroRevealedState(true);
            setIsRevealed(true);
            if (heroEl) {
              heroEl.classList.add("is-revealed");
            }
            autoSweepCancelRef.current = null;
            lastX = null;
            lastY = null;

            // Smoothly glide eyes back to resting forward gaze
            targetOx[0] = 0;
            targetOy[0] = 0;
            targetOx[1] = 0;
            targetOy[1] = 0;
          }
        }

        rafId = requestAnimationFrame(sweepStep);
        autoSweepCancelRef.current = () => {
          cancelAnimationFrame(rafId);
        };
      }

      function scheduleAutoScratch() {
        if (autoSweepCancelRef.current) {
          autoSweepCancelRef.current();
          autoSweepCancelRef.current = null;
        }
        // Brief 500ms discovery window showing concealed surface & eyes before progressive animation begins
        const delayTimer = window.setTimeout(startAutoScratch, 500);
        autoSweepCancelRef.current = () => {
          window.clearTimeout(delayTimer);
        };
      }

      triggerAutoScratchRef.current = scheduleAutoScratch;

      // If not previously revealed, initiate automatic scratch after brief reveal delay
      if (!savedRevealed) {
        scheduleAutoScratch();
      }
    }

    // ── MOBILE & TOUCH TAP-DIRECTED EYE MOVEMENT ──
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let isTouchScroll = false;

    const onHeroTouchStart = (e: TouchEvent) => {
      if (!isHeroVisible || e.touches.length !== 1) return;
      const t = e.touches[0];
      touchStartX = t.clientX;
      touchStartY = t.clientY;
      touchStartTime = performance.now();
      isTouchScroll = false;
    };

    const onHeroTouchMove = (e: TouchEvent) => {
      if (isTouchScroll || e.touches.length !== 1) return;
      const t = e.touches[0];
      const dist = Math.hypot(t.clientX - touchStartX, t.clientY - touchStartY);
      if (dist > 14) {
        // Visitor is scrolling the page, not tapping
        isTouchScroll = true;
      }
    };

    const onHeroTouchEnd = (e: TouchEvent) => {
      if (isTouchScroll || !isHeroVisible) return;
      const duration = performance.now() - touchStartTime;
      if (duration > 500) return; // Touch held too long for an intentional tap

      // Respect hide button & interactive UI controls
      const targetEl = e.target as HTMLElement | null;
      if (targetEl?.closest(".hero-hide-btn, .scratch-btn, button, a")) return;

      const touch = e.changedTouches[0];
      const tapX = touch && touch.clientX !== undefined ? touch.clientX : touchStartX;
      const tapY = touch && touch.clientY !== undefined ? touch.clientY : touchStartY;

      // Verify tap is within the hero interactive section bounds
      const heroRect = heroEl.getBoundingClientRect();
      if (
        tapX < heroRect.left ||
        tapX > heroRect.right ||
        tapY < heroRect.top ||
        tapY > heroRect.bottom
      ) {
        return;
      }

      // Clear any pending resting gaze timer
      if (mobileRestTimer) {
        window.clearTimeout(mobileRestTimer);
        mobileRestTimer = null;
      }

      // Calculate per-pupil target offsets towards tap position
      eyeCenters.forEach((center, idx) => {
        const dx = tapX - center.cx;
        const dy = tapY - center.cy;
        const dist = Math.min(maxMove, Math.hypot(dx, dy) / 8);
        const angle = Math.atan2(dy, dx);
        targetOx[idx] = Math.cos(angle) * dist;
        targetOy[idx] = Math.sin(angle) * dist;
      });
      hasActiveMobileGaze = true;

      // After ~2.7s of inactivity without another touch, smoothly return eyes forward to resting gaze
      mobileRestTimer = window.setTimeout(() => {
        targetOx[0] = 0;
        targetOy[0] = 0;
        targetOx[1] = 0;
        targetOy[1] = 0;
      }, 2700);
    };

    if (!isDesktop) {
      heroEl.addEventListener("touchstart", onHeroTouchStart, { passive: true });
      heroEl.addEventListener("touchmove", onHeroTouchMove, { passive: true });
      heroEl.addEventListener("touchend", onHeroTouchEnd, { passive: true });
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

      if (!isDesktop && triggerAutoScratchRef.current) {
        triggerAutoScratchRef.current();
      }
    };

    window.addEventListener("cold-designer-theme-change", handleThemeChange);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(eyeRaf);
      window.removeEventListener("resize", updateEyeCenters);
      window.removeEventListener("cold-designer-theme-change", handleThemeChange);
      clearInterval(blinkInterval);

      if (mobileRestTimer) {
        window.clearTimeout(mobileRestTimer);
        mobileRestTimer = null;
      }

      if (autoSweepCancelRef.current) {
        autoSweepCancelRef.current();
        autoSweepCancelRef.current = null;
      }
      triggerAutoScratchRef.current = null;

      if (isDesktop) {
        if (onDesktopPointerMove) heroEl.removeEventListener("pointermove", onDesktopPointerMove);
        if (onDesktopPointerDown) heroEl.removeEventListener("pointerdown", onDesktopPointerDown);
        if (onDesktopPointerLeave) heroEl.removeEventListener("pointerleave", onDesktopPointerLeave);
        window.removeEventListener("mousemove", handleMouseMove);
      } else {
        heroEl.removeEventListener("touchstart", onHeroTouchStart);
        heroEl.removeEventListener("touchmove", onHeroTouchMove);
        heroEl.removeEventListener("touchend", onHeroTouchEnd);
      }
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
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function HeroKokil() {
  const heroRef = useRef<HTMLElement>(null);
  const dotsGroupRef = useRef<SVGGElement>(null);
  const [hintHidden, setHintHidden] = useState(false);

  useEffect(() => {
    const heroEl = heroRef.current;
    const dotsGroup = dotsGroupRef.current;
    if (!heroEl || !dotsGroup) return;

    // ── Eye pupil tracking ──
    const eyes = heroEl.querySelectorAll<HTMLElement>(".eye");
    const maxMove = 28;

    function handleMouseMove(e: MouseEvent) {
      eyes.forEach((eye) => {
        const pupil = eye.querySelector<HTMLElement>(".pupil");
        if (!pupil) return;
        const rect = eye.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.min(maxMove, Math.hypot(dx, dy) / 8);
        const angle = Math.atan2(dy, dx);
        const ox = Math.cos(angle) * dist;
        const oy = Math.sin(angle) * dist;
        pupil.style.transform = `translate(calc(-50% + ${ox}px), calc(-50% + ${oy}px))`;
      });
    }

    const blinkInterval = setInterval(() => {
      eyes.forEach((eye) => eye.classList.add("blink"));
      setTimeout(() => {
        eyes.forEach((eye) => eye.classList.remove("blink"));
      }, 150);
    }, 3200);

    // ── Rub to reveal dark paint ──
    const MAX_DOTS = 900;
    const MIN_DIST = 16;
    const BRUSH_RADIUS = 280;
    let lastX: number | null = null;
    let lastY: number | null = null;

    function addDot(clientX: number, clientY: number) {
      if (!heroEl || !dotsGroup) return;
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

    function onPointerMove(e: PointerEvent) {
      addDot(e.clientX, e.clientY);
    }

    function onTouchMove(e: TouchEvent) {
      if (e.touches[0]) {
        addDot(e.touches[0].clientX, e.touches[0].clientY);
      }
    }

    function onPointerLeave() {
      lastX = null;
      lastY = null;
    }

    // Gentle auto-sweep for touch screens or early teaser
    const isTouch = window.matchMedia("(hover: none)").matches;
    let sweepTimeout: NodeJS.Timeout;
    if (isTouch) {
      sweepTimeout = setTimeout(() => {
        const r = heroEl.getBoundingClientRect();
        const rows = Math.max(3, Math.ceil(r.height / 260));
        let step = 0;
        const totalSteps = rows * 6;
        const sweepTimer = setInterval(() => {
          if (step > totalSteps) {
            clearInterval(sweepTimer);
            return;
          }
          const rowIdx = Math.floor(step / 6);
          const colIdx = step % 6;
          const x = (colIdx / 5) * r.width;
          const y = (rowIdx / rows) * r.height;
          addDot(r.left + x, r.top + y);
          step++;
        }, 40);
      }, 800);
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    heroEl.addEventListener("pointermove", onPointerMove);
    heroEl.addEventListener("touchmove", onTouchMove, { passive: true });
    heroEl.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      heroEl.removeEventListener("pointermove", onPointerMove);
      heroEl.removeEventListener("touchmove", onTouchMove);
      heroEl.removeEventListener("pointerleave", onPointerLeave);
      clearInterval(blinkInterval);
      if (sweepTimeout) clearTimeout(sweepTimeout);
    };
  }, []);

  return (
    <section ref={heroRef} id="hero">
      {/* Dark Obsidian Invert Canvas Paint */}
      <div className="hero-paint" id="heroPaint" />

      {/* Base Light Layer (Text & Buttons are transparent until rubbed) */}
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
                <span
                  className={`cursor-hint ${hintHidden ? "hide" : ""}`}
                  id="cursorHint"
                  aria-hidden="true"
                >
                  colour me
                </span>
              </span>
            </span>
            <span className="line line-2">Designer</span>
          </h1>
        </div>
        <div className="hero-bottom">
          <p className="hero-desc">
            I turn complex systems into clear, intuitive products people actually understand &mdash; from conversational healthcare triage to intercity transit.
          </p>
          <div className="hero-actions">
            <a href="#work" className="hero-btn primary">
              See selected work <span aria-hidden="true">&darr;</span>
            </a>
            <a href="mailto:abolarintaye20@gmail.com" className="hero-btn ghost">
              Get in touch
            </a>
          </div>
        </div>
        <div className="hero-strip">
          <span>Portfolio &rsquo;26</span>
          <span className="skills">
            UX<span className="dot">&middot;</span>UI<span className="dot">&middot;</span>Prototyping<span className="dot">&middot;</span>Design Systems
          </span>
          <span>Scroll &darr;</span>
        </div>
      </div>

      {/* Invert Dark Obsidian Layer (revealed where pointer rubs over the SVG mask) */}
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
            I turn complex systems into clear, intuitive products people actually understand &mdash; from conversational healthcare triage to intercity transit.
          </p>
          <div className="hero-actions">
            <a href="#work" className="hero-btn primary" tabIndex={-1}>
              See selected work <span aria-hidden="true">&darr;</span>
            </a>
            <a href="mailto:abolarintaye20@gmail.com" className="hero-btn ghost" tabIndex={-1}>
              Get in touch
            </a>
          </div>
        </div>
        <div className="hero-strip">
          <span>Portfolio &rsquo;26</span>
          <span className="skills">
            UX<span className="dot">&middot;</span>UI<span className="dot">&middot;</span>Prototyping<span className="dot">&middot;</span>Design Systems
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


"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sound } from "@/lib/sounds";

interface JournalSheet {
  id: string;
  tabLabel: string;
  title: string;
  pageNo: string;
  category: string;
  desc: string;
  image?: string;
  linkText?: string;
  href?: string;
  isInteractive?: boolean;
}

const JOURNAL_PAGES: JournalSheet[] = [
  {
    id: "index",
    tabLabel: "Index",
    title: "Journal Index",
    pageNo: "00",
    category: "Archive Directory",
    desc: "Directory of creative observations, interface studies, and tactile experiments.",
  },
  {
    id: "circadian",
    tabLabel: "Light UI",
    title: "Spatial Light & Circadian UI",
    pageNo: "01",
    category: "Observational Note // Spatial UI",
    desc: "Why do luxury hotel bookings rely on sterile enterprise calendars? An interface study replacing static room grids with dynamic solar angles—reflecting actual Golden Hour suite illumination before the guest even reserves.",
    image: "/images/projects/somewhere/suite-balcony-sunset-opt.webp",
    linkText: "Inspect Spatial Study",
    href: "/work/somewhere-hotel",
  },
  {
    id: "payloads",
    tabLabel: "Chat Payloads",
    title: "Micro-Commerce & Chat Payloads",
    pageNo: "02",
    category: "Field Study // Lagos Micro-Commerce",
    desc: "Observing friction in informal social commerce. Rather than forcing multi-step cart funnels onto WhatsApp buyers, exploring structured single-payload links that bundle product selections, sizing, and payment instructions directly into a message.",
    image: "/images/projects/buybuddy/whatsapp-chat-opt.webp",
    linkText: "Inspect Commerce Study",
    href: "/work/buybuddy",
  },
  {
    id: "acoustics",
    tabLabel: "Sound Pacing",
    title: "Sound Panning & Sequential Pacing",
    pageNo: "03",
    category: "Interaction Experiment // Web Audio",
    desc: "Examining architectural acoustics as digital pacing. Translating physical threshold transitions—from concrete street silence to reverberant timber auditorium—into continuous stereo web audio panning.",
    image: "/images/projects/stillwater/04_Auditorium_Threshold-opt.webp",
    linkText: "Inspect Acoustic Study",
    href: "/work/stillwater",
  },
  {
    id: "lab",
    tabLabel: "The Lab",
    title: "Interactive Design Experiments",
    pageNo: "04",
    category: "Design Decisions // The Lab",
    desc: "Experience interface decisions firsthand: button feedback lifecycles, layout density, and theme contrast.",
    isInteractive: true,
    href: "/lab",
  },
];

export default function NotebookKokil() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [busy, setBusy] = useState<boolean>(false);
  const nbRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // Interactive sheet 4 state (Design Playground preview)
  const [previewState, setPreviewState] = useState<"idle" | "loading" | "success">("idle");
  const [previewDensity, setPreviewDensity] = useState<"spacious" | "compact">("spacious");
  const [labSoundOn, setLabSoundOn] = useState<boolean>(true);

  function handleTestState() {
    if (previewState !== "idle") return;
    setPreviewState("loading");
    if (labSoundOn) sound.playClick();
    setTimeout(() => {
      setPreviewState("success");
      if (labSoundOn) sound.playChime(660, 0.2);
      setTimeout(() => {
        setPreviewState("idle");
      }, 1600);
    }, 900);
  }

  const TURN_DURATION = 850;
  const STAGGER = 180;

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const title = titleRef.current;
    const wrap = wrapRef.current;
    if (!section || !title || !wrap) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 82%",
        toggleActions: "play none none reverse",
        fastScrollEnd: true,
      },
    });

    tl.fromTo(
      title,
      { y: 22, opacity: 0.25 },
      { y: 0, opacity: 1, duration: 0.45, ease: "power2.out", clearProps: "transform" }
    );

    tl.fromTo(
      wrap,
      { y: 32, opacity: 0.2 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", clearProps: "transform" },
      "-=0.25"
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  function goTo(targetIdx: number) {
    if (targetIdx < 0 || targetIdx >= JOURNAL_PAGES.length || targetIdx === currentPage || busy) {
      return;
    }

    const nb = nbRef.current;
    if (!nb) {
      setCurrentPage(targetIdx);
      return;
    }

    const sheetEls = Array.from(nb.querySelectorAll<HTMLElement>(".nb-sheet"));
    const forward = targetIdx > currentPage;
    const moving = forward
      ? sheetEls.slice(currentPage, targetIdx)
      : sheetEls.slice(targetIdx, currentPage).reverse();

    setBusy(true);
    setCurrentPage(targetIdx);

    moving.forEach((s, k) => {
      const t1 = setTimeout(() => {
        s.style.zIndex = String(100 + k);
        s.classList.add("is-turning");
        s.classList.toggle("is-flipped", forward);
      }, k * STAGGER);
      timersRef.current.push(t1);
    });

    const t2 = setTimeout(() => {
      moving.forEach((s) => s.classList.remove("is-turning"));
      setBusy(false);
    }, (moving.length - 1) * STAGGER + TURN_DURATION);
    timersRef.current.push(t2);
  }

  return (
    <section ref={sectionRef} id="playground" className="journal-codex-section" aria-labelledby="playgroundTitle">
      {/* Invisible anchor for #codex backward compatibility */}
      <span id="codex" className="sr-only" tabIndex={-1} aria-hidden="true" />
      <span id="lab" className="sr-only" tabIndex={-1} aria-hidden="true" />

      <h2 ref={titleRef} className="mp-title" id="playgroundTitle">
        Creative Journal &amp; Lab
      </h2>

      <div ref={wrapRef} className="nb-wrap">
        <div ref={nbRef} className="nb" id="notebook">
          {/* Hanging Bookmark Ribbons */}
          <div className="nb-ribbons" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </div>

          {/* Dark Cover */}
          <div className="nb-cover" aria-hidden="true" />

          {/* Left: Tilted Notes Sheets */}
          <div className="nb-note nb-note--back" aria-hidden="true" />
          <div className="nb-note">
            <h3>Notes</h3>
            <p>Design rationales, interface observations &amp; tactile laboratory. Flip the tabs &rarr;</p>
          </div>

          {/* Left: Stitched Pocket with vector doodle */}
          <div className="nb-pocket" aria-hidden="true">
            <svg
              className="nb-doodle"
              viewBox="0 0 120 90"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M60 78 C58 60 58 44 60 30" />
              <path d="M60 62 C50 58 42 50 40 40 C50 41 57 48 60 56" />
              <path d="M60 52 C70 48 77 41 80 32 C70 33 63 39 60 46" />
              <circle cx="60" cy="22" r="8" />
              <path d="M60 8v4M60 32v4M46 22h4M70 22h4M50 12l3 3M67 29l3 3M50 32l3-3M67 15l3-3" />
              <path d="M24 28l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
              <path d="M96 50l1.5 4.5 4.5 1.5-4.5 1.5-1.5 4.5-1.5-4.5-4.5-1.5 4.5-1.5z" />
            </svg>
          </div>

          {/* Center Spine + Spiral Coil Rings */}
          <div className="nb-spine" aria-hidden="true" />
          <div className="nb-rings" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>

          {/* Right: Pagewrap with Stack & Flippable Sheets */}
          <div className="nb-pagewrap">
            <div className="nb-stack" aria-hidden="true" />

            {/* Sheet 0: Index */}
            <div
              className={`nb-sheet ${currentPage > 0 ? "is-flipped" : ""}`}
              data-page="index"
              style={{
                zIndex: currentPage === 0 ? 30 : 10,
              }}
            >
              <section className="nb-face nb-face--front" aria-label="Journal Index">
                <h3 className="nb-h">Journal Index</h3>
                <div className="nb-index">
                  <div className="nb-row nb-row--head">
                    <span>Observation / Study</span>
                    <span>Entry</span>
                  </div>
                  {JOURNAL_PAGES.slice(1).map((pg, i) => (
                    <button
                      key={pg.id}
                      type="button"
                      className="nb-row"
                      onClick={() => goTo(i + 1)}
                    >
                      <span className="nb-row-name">{pg.title}</span>
                      <span>{pg.pageNo}</span>
                    </button>
                  ))}
                </div>
              </section>
              <div
                className="nb-face nb-face--back"
                onClick={() => goTo(0)}
                aria-hidden="true"
              >
                <span className="nb-ghost">Index</span>
                <button type="button" className="nb-prev" tabIndex={-1}>
                  &larr; Back to Index
                </button>
              </div>
            </div>

            {/* Sheet 1: Circadian UI Study */}
            <div
              className={`nb-sheet ${currentPage > 1 ? "is-flipped" : ""}`}
              data-page="circadian"
              style={{
                zIndex:
                  currentPage === 1
                    ? 30
                    : currentPage < 1
                    ? 20
                    : 11,
              }}
            >
              <section className="nb-face nb-face--front" aria-label="Spatial Light Study">
                <h3 className="nb-h">Spatial Light UI</h3>
                <div className="nb-pg-meta">
                  <button type="button" className="nb-back" onClick={() => goTo(0)}>
                    &larr; Index
                  </button>
                  <span>Entry 01</span>
                </div>
                <Link
                  className="nb-shot nb-shot--link"
                  href="/work/somewhere-hotel"
                  style={{
                    backgroundImage: `url('${JOURNAL_PAGES[1].image}')`,
                  }}
                  aria-label="Inspect spatial daylighting study"
                >
                  <span className="nb-shot-hint" aria-hidden="true">
                    <span>Explore</span>
                    <svg
                      viewBox="0 0 24 24"
                      width="11"
                      height="11"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </span>
                </Link>
                <p className="nb-pg-desc">{JOURNAL_PAGES[1].desc}</p>
                <div className="nb-pg-actions">
                  <button
                    type="button"
                    className="nb-prev-inline"
                    onClick={() => goTo(0)}
                  >
                    &larr; Index
                  </button>
                  <button
                    type="button"
                    className="nb-next"
                    onClick={() => goTo(2)}
                  >
                    Next Entry &rarr;
                  </button>
                </div>
              </section>
              <div
                className="nb-face nb-face--back"
                onClick={() => goTo(1)}
                aria-hidden="true"
              >
                <span className="nb-ghost">Light UI</span>
                <button type="button" className="nb-prev" tabIndex={-1}>
                  &larr; Back to Entry 01
                </button>
              </div>
            </div>

            {/* Sheet 2: Micro-Commerce Payloads */}
            <div
              className={`nb-sheet ${currentPage > 2 ? "is-flipped" : ""}`}
              data-page="payloads"
              style={{
                zIndex:
                  currentPage === 2
                    ? 30
                    : currentPage < 2
                    ? 19
                    : 12,
              }}
            >
              <section className="nb-face nb-face--front" aria-label="Chat Payloads Study">
                <h3 className="nb-h">Micro-Commerce Payloads</h3>
                <div className="nb-pg-meta">
                  <button type="button" className="nb-back" onClick={() => goTo(0)}>
                    &larr; Index
                  </button>
                  <span>Entry 02</span>
                </div>
                <Link
                  className="nb-shot nb-shot--link"
                  href="/work/buybuddy"
                  style={{
                    backgroundImage: `url('${JOURNAL_PAGES[2].image}')`,
                  }}
                  aria-label="Inspect micro-commerce study"
                >
                  <span className="nb-shot-hint" aria-hidden="true">
                    <span>Explore</span>
                    <svg
                      viewBox="0 0 24 24"
                      width="11"
                      height="11"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </span>
                </Link>
                <p className="nb-pg-desc">{JOURNAL_PAGES[2].desc}</p>
                <div className="nb-pg-actions">
                  <button
                    type="button"
                    className="nb-prev-inline"
                    onClick={() => goTo(1)}
                  >
                    &larr; Entry 01
                  </button>
                  <button
                    type="button"
                    className="nb-next"
                    onClick={() => goTo(3)}
                  >
                    Next Entry &rarr;
                  </button>
                </div>
              </section>
              <div
                className="nb-face nb-face--back"
                onClick={() => goTo(2)}
                aria-hidden="true"
              >
                <span className="nb-ghost">Payloads</span>
                <button type="button" className="nb-prev" tabIndex={-1}>
                  &larr; Back to Entry 02
                </button>
              </div>
            </div>

            {/* Sheet 3: Sound Panning & Pacing */}
            <div
              className={`nb-sheet ${currentPage > 3 ? "is-flipped" : ""}`}
              data-page="acoustics"
              style={{
                zIndex:
                  currentPage === 3
                    ? 30
                    : currentPage < 3
                    ? 18
                    : 13,
              }}
            >
              <section className="nb-face nb-face--front" aria-label="Sound Pacing Study">
                <h3 className="nb-h">Acoustic Web Pacing</h3>
                <div className="nb-pg-meta">
                  <button type="button" className="nb-back" onClick={() => goTo(0)}>
                    &larr; Index
                  </button>
                  <span>Entry 03</span>
                </div>
                <Link
                  className="nb-shot nb-shot--link"
                  href="/work/stillwater"
                  style={{
                    backgroundImage: `url('${JOURNAL_PAGES[3].image}')`,
                  }}
                  aria-label="Inspect acoustic study"
                >
                  <span className="nb-shot-hint" aria-hidden="true">
                    <span>Explore</span>
                    <svg
                      viewBox="0 0 24 24"
                      width="11"
                      height="11"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </span>
                </Link>
                <p className="nb-pg-desc">{JOURNAL_PAGES[3].desc}</p>
                <div className="nb-pg-actions">
                  <button
                    type="button"
                    className="nb-prev-inline"
                    onClick={() => goTo(2)}
                  >
                    &larr; Entry 02
                  </button>
                  <button
                    type="button"
                    className="nb-next"
                    onClick={() => goTo(4)}
                  >
                    The Lab &rarr;
                  </button>
                </div>
              </section>
              <div
                className="nb-face nb-face--back"
                onClick={() => goTo(3)}
                aria-hidden="true"
              >
                <span className="nb-ghost">Acoustics</span>
                <button type="button" className="nb-prev" tabIndex={-1}>
                  &larr; Back to Entry 03
                </button>
              </div>
            </div>

            {/* Sheet 4: Interactive Design Playground Preview */}
            <div
              className={`nb-sheet ${currentPage > 4 ? "is-flipped" : ""}`}
              data-page="lab"
              style={{
                zIndex: currentPage === 4 ? 30 : 17,
              }}
            >
              <section className="nb-face nb-face--front" aria-label="Interactive Design Experiments">
                <h3 className="nb-h">The Lab</h3>
                <div className="nb-pg-meta">
                  <button type="button" className="nb-back" onClick={() => goTo(0)}>
                    &larr; Index
                  </button>
                  <span>Entry 04</span>
                </div>

                <p className="nb-pg-desc" style={{ marginBottom: "0.8cqw", fontSize: "1.25cqw" }}>
                  Experience interface decisions firsthand: state lifecycles, density scaling, and theme contrast.
                </p>

                {/* Working Interactive Playground Preview */}
                <div className="nb-lab-box">
                  {/* Row 1: Button Feedback Lifecycle */}
                  <div className="nb-lab-row">
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.2cqw" }}>
                      <span style={{ fontSize: "1.2cqw", fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: "#1a1a1a" }}>
                        Button State Lifecycle
                      </span>
                      <span style={{ fontSize: "1cqw", color: "#666" }}>
                        Try clicking to test feedback
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleTestState}
                      className={`nb-lab-state-btn is-${previewState}`}
                      disabled={previewState !== "idle"}
                    >
                      {previewState === "idle" && <span>Schedule Triage</span>}
                      {previewState === "loading" && <span>Confirming...</span>}
                      {previewState === "success" && <span>Confirmed &#10003;</span>}
                    </button>
                  </div>

                  {/* Row 2: Ergonomic Density Switcher */}
                  <div className="nb-lab-row">
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.2cqw" }}>
                      <span style={{ fontSize: "1.2cqw", fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: "#1a1a1a" }}>
                        Ergonomic Density
                      </span>
                      <span style={{ fontSize: "1cqw", color: "#666" }}>
                        Layout: {previewDensity === "spacious" ? "Spacious" : "Compact"}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "0.6cqw" }}>
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewDensity("spacious");
                          if (labSoundOn) sound.playPop();
                        }}
                        className={`nb-lab-pill ${previewDensity === "spacious" ? "is-active" : ""}`}
                      >
                        Spacious
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewDensity("compact");
                          if (labSoundOn) sound.playPop();
                        }}
                        className={`nb-lab-pill ${previewDensity === "compact" ? "is-active" : ""}`}
                      >
                        Compact
                      </button>
                    </div>
                  </div>
                </div>

                <div className="nb-pg-actions" style={{ marginTop: "1.2cqw" }}>
                  <button
                    type="button"
                    className="nb-prev-inline"
                    onClick={() => goTo(3)}
                  >
                    &larr; Entry 03
                  </button>
                  <Link href="/lab" className="nb-visit">
                    <span>Open The Lab</span>
                    <svg
                      viewBox="0 0 24 24"
                      width="12"
                      height="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </Link>
                </div>
              </section>
              <div
                className="nb-face nb-face--back"
                onClick={() => goTo(4)}
                aria-hidden="true"
              >
                <span className="nb-ghost">Playground</span>
                <button type="button" className="nb-prev" tabIndex={-1}>
                  &larr; Back to Playground
                </button>
              </div>
            </div>
          </div>

          {/* Side Indexed Tabs */}
          <div className="nb-tabs" role="tablist" aria-label="Notebook sections">
            {JOURNAL_PAGES.map((pg, idx) => (
              <button
                key={pg.id}
                type="button"
                className={`nb-tab ${currentPage === idx ? "is-on" : ""}`}
                role="tab"
                aria-selected={currentPage === idx}
                onClick={() => goTo(idx)}
              >
                {pg.tabLabel}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

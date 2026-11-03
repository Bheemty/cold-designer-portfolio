"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
    image: "/images/projects/somewhere/suite-balcony-sunset.png",
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
    image: "/images/projects/buybuddy/whatsapp-chat.png",
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
    image: "/images/projects/stillwater/04_Auditorium_Threshold.png",
    linkText: "Inspect Acoustic Study",
    href: "/work/stillwater",
  },
  {
    id: "codex",
    tabLabel: "Codex Lab",
    title: "Tactile UI Laboratory",
    pageNo: "04",
    category: "Interactive Laboratory // Haptics",
    desc: "A living playground of tactile buttons, spring physics, and Web Audio synthesis.",
    isInteractive: true,
    href: "/codex",
  },
];

export default function NotebookKokil() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [busy, setBusy] = useState<boolean>(false);
  const nbRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // Interactive sheet 4 state
  const [labClicks, setLabClicks] = useState<number>(0);
  const [labSoundOn, setLabSoundOn] = useState<boolean>(true);
  const [labPillActive, setLabPillActive] = useState<boolean>(false);

  const TURN_DURATION = 850;
  const STAGGER = 180;

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
    <section id="codex" className="notebook-section" aria-labelledby="playgroundTitle">
      {/* Invisible anchor for backward compatibility */}
      <span id="playground" className="sr-only" aria-hidden="true" />

      <h2 className="mp-title" id="playgroundTitle">
        Creative Journal &amp; Codex
      </h2>

      <div className="nb-wrap">
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
                    Explore &nearr;
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
                    Explore &nearr;
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
                    Explore &nearr;
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
                    Codex Lab &rarr;
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

            {/* Sheet 4: Working Interactive Codex Laboratory */}
            <div
              className={`nb-sheet ${currentPage > 4 ? "is-flipped" : ""}`}
              data-page="codex"
              style={{
                zIndex: currentPage === 4 ? 30 : 17,
              }}
            >
              <section className="nb-face nb-face--front" aria-label="Interactive Codex Lab">
                <h3 className="nb-h">Codex Tactile Lab</h3>
                <div className="nb-pg-meta">
                  <button type="button" className="nb-back" onClick={() => goTo(0)}>
                    &larr; Index
                  </button>
                  <span>Entry 04</span>
                </div>

                {/* Real Working Interactive Controls inside the notebook */}
                <div className="nb-lab-box">
                  <div className="nb-lab-row">
                    <button
                      type="button"
                      onClick={() => {
                        setLabClicks((c) => c + 1);
                        if (labSoundOn) sound.playClick();
                      }}
                      className="nb-lab-tactile-btn"
                    >
                      <span>Press Mechanical</span>
                    </button>
                    <span className="nb-lab-counter">Clicks: {labClicks}</span>
                  </div>

                  <div className="nb-lab-row">
                    <button
                      type="button"
                      onClick={() => {
                        setLabPillActive(!labPillActive);
                        if (labSoundOn) sound.playPop();
                      }}
                      className={`nb-lab-pill ${labPillActive ? "is-active" : ""}`}
                    >
                      {labPillActive ? "Spring: Active" : "Spring: Rest"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const next = !labSoundOn;
                        setLabSoundOn(next);
                        if (next) sound.playChime(660, 0.2);
                      }}
                      className="nb-lab-audio-toggle"
                    >
                      {labSoundOn ? "Sound: ON" : "Sound: OFF"}
                    </button>
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
                  <Link href="/codex" className="nb-visit">
                    <span>Open Full Codex Lab &rarr;</span>
                  </Link>
                </div>
              </section>
              <div
                className="nb-face nb-face--back"
                onClick={() => goTo(4)}
                aria-hidden="true"
              >
                <span className="nb-ghost">Codex</span>
                <button type="button" className="nb-prev" tabIndex={-1}>
                  &larr; Back to Codex
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

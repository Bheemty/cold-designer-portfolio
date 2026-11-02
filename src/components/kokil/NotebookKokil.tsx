"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface PageSheet {
  id: string;
  tabLabel: string;
  title: string;
  pageNo: string;
  desc: string;
  image?: string;
  linkText?: string;
  href?: string;
  isSoon?: boolean;
}

const PAGES: PageSheet[] = [
  {
    id: "index",
    tabLabel: "Index",
    title: "Index",
    pageNo: "00",
    desc: "Directory of case studies and design notes.",
  },
  {
    id: "medesy",
    tabLabel: "MEDesy",
    title: "MEDesy Solution",
    pageNo: "01",
    desc: "Conversational triage system balancing clinical safety with patient ease on messaging platforms.",
    image: "/images/projects/medesy/whatsapp-mockup.png",
    linkText: "Read Case Study",
    href: "/work/medesy",
  },
  {
    id: "transit",
    tabLabel: "9jaTrip",
    title: "9jaTrip Transit",
    pageNo: "02",
    desc: "Structuring interstate bus travel across Nigerian terminals with seat reservation and park verification.",
    image: "/images/projects/9jatrip/booking-ride-mockup.png",
    linkText: "Read Case Study",
    href: "/work/9jatrip",
  },
  {
    id: "somewhere",
    tabLabel: "Somewhere",
    title: "Somewhere Hotel",
    pageNo: "03",
    desc: "Translating hospitality architecture and ambient sunset lighting into an editorial booking flow.",
    image: "/images/projects/somewhere/hotel-exterior-sunset.png",
    linkText: "Read Case Study",
    href: "/work/somewhere-hotel",
  },
  {
    id: "experiments",
    tabLabel: "Codex",
    title: "Design Codex",
    pageNo: "04",
    desc: "Upcoming explorations in tactile UI components, audio micro-interactions, and design systems.",
    isSoon: true,
  },
];

export default function NotebookKokil() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [busy, setBusy] = useState<boolean>(false);
  const nbRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const TURN_DURATION = 850;
  const STAGGER = 180;

  useEffect(() => {
    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  function goTo(targetIdx: number) {
    if (targetIdx < 0 || targetIdx >= PAGES.length || targetIdx === currentPage || busy) {
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
    <section id="playground" aria-labelledby="playgroundTitle">
      <h2 className="mp-title" id="playgroundTitle">
        Design Codex &amp; Notes
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
            <p>A collection of design rationales, interaction experiments &amp; case studies. Flip the tabs &rarr;</p>
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
              <section className="nb-face nb-face--front" aria-label="Index">
                <h3 className="nb-h">Index</h3>
                <div className="nb-index">
                  <div className="nb-row nb-row--head">
                    <span>Project</span>
                    <span>Page No.</span>
                  </div>
                  {PAGES.slice(1).map((pg, i) => (
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

            {/* Sheet 1: MEDesy */}
            <div
              className={`nb-sheet ${currentPage > 1 ? "is-flipped" : ""}`}
              data-page="medesy"
              style={{
                zIndex:
                  currentPage === 1
                    ? 30
                    : currentPage < 1
                    ? 20
                    : 11,
              }}
            >
              <section className="nb-face nb-face--front" aria-label="MEDesy Solution">
                <h3 className="nb-h">MEDesy Solution</h3>
                <div className="nb-pg-meta">
                  <button type="button" className="nb-back" onClick={() => goTo(0)}>
                    &larr; Index
                  </button>
                  <span>Page 01</span>
                </div>
                <Link
                  className="nb-shot nb-shot--link"
                  href="/work/medesy"
                  style={{
                    backgroundImage: `url('${PAGES[1].image}')`,
                  }}
                  aria-label="Open MEDesy case study"
                >
                  <span className="nb-shot-hint" aria-hidden="true">
                    Open &nearr;
                  </span>
                </Link>
                <p className="nb-pg-desc">{PAGES[1].desc}</p>
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
                    Next page &rarr;
                  </button>
                </div>
              </section>
              <div
                className="nb-face nb-face--back"
                onClick={() => goTo(1)}
                aria-hidden="true"
              >
                <span className="nb-ghost">MEDesy</span>
                <button type="button" className="nb-prev" tabIndex={-1}>
                  &larr; Back to MEDesy
                </button>
              </div>
            </div>

            {/* Sheet 2: 9jaTrip */}
            <div
              className={`nb-sheet ${currentPage > 2 ? "is-flipped" : ""}`}
              data-page="transit"
              style={{
                zIndex:
                  currentPage === 2
                    ? 30
                    : currentPage < 2
                    ? 19
                    : 12,
              }}
            >
              <section className="nb-face nb-face--front" aria-label="9jaTrip Transit">
                <h3 className="nb-h">9jaTrip Transit</h3>
                <div className="nb-pg-meta">
                  <button type="button" className="nb-back" onClick={() => goTo(0)}>
                    &larr; Index
                  </button>
                  <span>Page 02</span>
                </div>
                <Link
                  className="nb-shot nb-shot--link"
                  href="/work/9jatrip"
                  style={{
                    backgroundImage: `url('${PAGES[2].image}')`,
                  }}
                  aria-label="Open 9jaTrip case study"
                >
                  <span className="nb-shot-hint" aria-hidden="true">
                    Open &nearr;
                  </span>
                </Link>
                <p className="nb-pg-desc">{PAGES[2].desc}</p>
                <div className="nb-pg-actions">
                  <button
                    type="button"
                    className="nb-prev-inline"
                    onClick={() => goTo(1)}
                  >
                    &larr; MEDesy
                  </button>
                  <button
                    type="button"
                    className="nb-next"
                    onClick={() => goTo(3)}
                  >
                    Next page &rarr;
                  </button>
                </div>
              </section>
              <div
                className="nb-face nb-face--back"
                onClick={() => goTo(2)}
                aria-hidden="true"
              >
                <span className="nb-ghost">9jaTrip</span>
                <button type="button" className="nb-prev" tabIndex={-1}>
                  &larr; Back to 9jaTrip
                </button>
              </div>
            </div>

            {/* Sheet 3: Somewhere Hotel */}
            <div
              className={`nb-sheet ${currentPage > 3 ? "is-flipped" : ""}`}
              data-page="somewhere"
              style={{
                zIndex:
                  currentPage === 3
                    ? 30
                    : currentPage < 3
                    ? 18
                    : 13,
              }}
            >
              <section className="nb-face nb-face--front" aria-label="Somewhere Hotel">
                <h3 className="nb-h">Somewhere Hotel</h3>
                <div className="nb-pg-meta">
                  <button type="button" className="nb-back" onClick={() => goTo(0)}>
                    &larr; Index
                  </button>
                  <span>Page 03</span>
                </div>
                <Link
                  className="nb-shot nb-shot--link"
                  href="/work/somewhere-hotel"
                  style={{
                    backgroundImage: `url('${PAGES[3].image}')`,
                  }}
                  aria-label="Open Somewhere Hotel case study"
                >
                  <span className="nb-shot-hint" aria-hidden="true">
                    Open &nearr;
                  </span>
                </Link>
                <p className="nb-pg-desc">{PAGES[3].desc}</p>
                <div className="nb-pg-actions">
                  <button
                    type="button"
                    className="nb-prev-inline"
                    onClick={() => goTo(2)}
                  >
                    &larr; 9jaTrip
                  </button>
                  <button
                    type="button"
                    className="nb-next"
                    onClick={() => goTo(4)}
                  >
                    Next page &rarr;
                  </button>
                </div>
              </section>
              <div
                className="nb-face nb-face--back"
                onClick={() => goTo(3)}
                aria-hidden="true"
              >
                <span className="nb-ghost">Somewhere</span>
                <button type="button" className="nb-prev" tabIndex={-1}>
                  &larr; Back to Somewhere
                </button>
              </div>
            </div>

            {/* Sheet 4: Design Codex */}
            <div
              className={`nb-sheet ${currentPage > 4 ? "is-flipped" : ""}`}
              data-page="experiments"
              style={{
                zIndex: currentPage === 4 ? 30 : 17,
              }}
            >
              <section className="nb-face nb-face--front nb-soon" aria-label="Design Codex">
                <h3 className="nb-h">Page 04</h3>
                <div className="nb-pg-meta">
                  <button type="button" className="nb-back" onClick={() => goTo(0)}>
                    &larr; Index
                  </button>
                  <span>Page 04</span>
                </div>
                <div className="nb-soon-body">
                  <p className="nb-soon-title">Coming soon</p>
                  <p className="nb-soon-sub">
                    Upcoming explorations in tactile UI components, audio micro-interactions, and design systems.
                  </p>
                  <svg
                    className="nb-soon-doodle"
                    viewBox="0 0 120 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M6 26c10-14 18-14 26 0s16 14 26 0 18-14 26 0 16 14 26 0" />
                  </svg>
                </div>
                <div className="nb-pg-actions">
                  <button
                    type="button"
                    className="nb-prev-inline"
                    onClick={() => goTo(3)}
                  >
                    &larr; Somewhere Hotel
                  </button>
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
            {PAGES.map((pg, idx) => (
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

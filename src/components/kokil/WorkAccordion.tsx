"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProjectItem {
  id: string;
  num: string;
  shortLabel: string;
  eyebrow: string;
  title: string;
  desc: string;
  tags: string[];
  image: string;
  href: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "medesy",
    num: "01",
    shortLabel: "01 — MEDesy",
    eyebrow: "01 — Healthcare · Conversational UI",
    title: "MEDesy: Conversational patient triage & appointment referrals",
    desc: "Structured patient intake, symptom categorisation, and doctor appointment referrals designed within WhatsApp to reduce clinical triage friction.",
    tags: ["Product Design", "Conversational UX", "Healthcare Triage", "Figma"],
    image: "/images/projects/medesy/whatsapp-mockup-opt.webp",
    href: "/work/medesy",
  },
  {
    id: "9jatrip",
    num: "02",
    shortLabel: "02 — 9jaTrip",
    eyebrow: "02 — Intercity Transit · Mobile App",
    title: "9jaTrip: Intercity coach booking & verified terminal transit",
    desc: "A unified mobile booking system replacing informal interstate motor-park queues with verified routes, seat selection, and transparent terminal schedules.",
    tags: ["Mobile Product Design", "Transit Systems", "Route UX", "Design System"],
    image: "/images/projects/9jatrip/booking-ride-mockup-opt.webp",
    href: "/work/9jatrip",
  },
  {
    id: "somewhere",
    num: "03",
    shortLabel: "03 — Somewhere",
    eyebrow: "03 — Hospitality · Spatial Web",
    title: "Somewhere Hotel: Atmospheric spatial hospitality booking",
    desc: "An editorial reservation concept translating architectural daylight transitions, suite spatial layouts, and calm curation into digital hospitality.",
    tags: ["Spatial UI Concept", "Editorial Web", "Interaction Design"],
    image: "/images/projects/somewhere/hotel-exterior-sunset-opt.webp",
    href: "/work/somewhere-hotel",
  },
  {
    id: "buybuddy",
    num: "04",
    shortLabel: "04 — BuyBuddy",
    eyebrow: "04 — Commerce · Marketplace Platform",
    title: "BuyBuddy: Social commerce storefronts & escrow purchasing",
    desc: "Streamlining informal merchant commerce with quick product links, catalog management, and protected buyer inquiries.",
    tags: ["Commerce UX", "Marketplace Platform", "Merchant Tools"],
    image: "/images/projects/buybuddy/store-landing-opt.webp",
    href: "/work/buybuddy",
  },
  {
    id: "stillwater",
    num: "05",
    shortLabel: "05 — Stillwater",
    eyebrow: "05 — Performing Arts · Sequential Flow",
    title: "Stillwater Hall: Acoustic architectural concert walkthrough",
    desc: "A sequential media experience translating architectural arrival, auditorium acoustics, and seat perspectives into a paced digital walkthrough.",
    tags: ["Acoustic Architecture", "Sequential Media", "Concept Web"],
    image: "/images/projects/stillwater/venue-exterior-opt.webp",
    href: "/work/stillwater",
  },
];

export default function WorkAccordion() {
  const [activeId, setActiveId] = useState<string>("medesy");
  const router = useRouter();

  // Instant hover response with zero artificial delay
  const handlePointerEnter = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  function handlePanelClick(p: ProjectItem, e: React.MouseEvent) {
    const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
    const isStacked = typeof window !== "undefined" && window.innerWidth <= 1024;

    // On touch or stacked mobile: first tap opens, second tap / link click navigates
    if ((isTouch || isStacked) && activeId !== p.id) {
      e.preventDefault();
      setActiveId(p.id);
      return;
    }

    const target = e.target as HTMLElement;
    if (target.closest(".work-go")) return;
    router.push(p.href);
  }

  return (
    <section id="work">
      {/* Section Header */}
      <div className="work-header-row">
        <p className="intro-label">(02) &mdash; Selected work</p>
      </div>

      {/* Horizontal Accordion Gallery */}
      <div className="acc" id="workAcc">
        {PROJECTS.map((project, idx) => {
          const isOpen = activeId === project.id;
          return (
            <article
              key={project.id}
              className={`acc-panel ${isOpen ? "is-open" : ""}`}
              tabIndex={0}
              style={{
                ["--img" as string]: `url('${project.image}')`,
                ["--d" as string]: `${idx * 0.05}s`,
              }}
              aria-label={project.title}
              onPointerEnter={() => handlePointerEnter(project.id)}
              onFocus={() => setActiveId(project.id)}
              onClick={(e) => handlePanelClick(project, e)}
              onKeyDown={(e) => {
                if (e.key === "Enter") router.push(project.href);
              }}
            >
              {/* Collapsed Peek State (hardware accelerated, centered label, dark contrast overlay) */}
              <div className="acc-peek" aria-hidden="true" />
              <span className="acc-peek-label" aria-hidden="true">
                {project.shortLabel}
              </span>

              {/* Expanded Card Body: structured tiers prevent any clipping or overflow */}
              <div className="acc-body">
                <div className="acc-media">
                  <div
                    className="acc-device"
                    role="img"
                    aria-label={`${project.title} preview mockup`}
                  />
                </div>

                <div className="acc-info">
                  <span className="work-eyebrow">{project.eyebrow}</span>
                  <h3 className="work-title">{project.title}</h3>
                  <p className="work-desc">{project.desc}</p>
                </div>

                <div className="acc-action-row">
                  <div className="work-tags">
                    {project.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>

                  <Link
                    href={project.href}
                    className="work-go"
                    aria-label={`Read ${project.title} case study`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>View Case Study</span>
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
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
              </div>
            </article>
          );
        })}
      </div>

      {/* Prominent, Clearly Visible "Explore All Work" CTA */}
      <div className="work-closing-cta">
        <Link href="/work" className="work-explore-btn" aria-label="Explore All Work in full directory">
          <span>Explore All Work</span>
          <span className="work-explore-arrow" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
}

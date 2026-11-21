"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sound } from "@/lib/sounds";

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
    eyebrow: "01 — Healthcare · Shipped Product",
    title: "MEDesy: Cutting clinical triage friction inside WhatsApp",
    desc: "Structured patient intake, symptom categorization, and doctor referrals built directly into WhatsApp—eliminating app-download drop-off for patients and streamlining clinical handoffs.",
    tags: ["Product Design", "Conversational UX", "Healthcare Triage", "0-to-1"],
    image: "/images/projects/medesy/whatsapp-mockup-opt.webp",
    href: "/work/medesy",
  },
  {
    id: "9jatrip",
    num: "02",
    shortLabel: "02 — 9jaTrip",
    eyebrow: "02 — Intercity Transit · Mobile Product",
    title: "9jaTrip: Replacing chaotic motor-park queues with verified mobile booking",
    desc: "An end-to-end mobile transit system bringing verified routes, real-time seat selection, and transparent terminal schedules to informal interstate travel.",
    tags: ["Mobile Product Design", "Transit Systems", "Route UX", "Design System"],
    image: "/images/projects/9jatrip/booking-ride-mockup-opt.webp",
    href: "/work/9jatrip",
  },
  {
    id: "paai",
    num: "03",
    shortLabel: "03 — PAAI",
    eyebrow: "03 — Autonomous AI · Fintech System",
    title: "PAAI: Designing trust gates for an autonomous AI finance assistant",
    desc: "A dual-theme mobile AI assistant pairing natural-language financial instructions with clear intent-to-card verification gates so users stay in control of automated actions.",
    tags: ["Personal AI", "Fintech", "Dual Theme System", "Mobile Systems"],
    image: "/images/projects/paai/paai-hero-mockup.png",
    href: "/work/paai",
  },
  {
    id: "somewhere",
    num: "04",
    shortLabel: "04 — Somewhere",
    eyebrow: "04 — Hospitality · Interactive Concept",
    title: "Somewhere Hotel: Reimagining hotel booking around daylight & space",
    desc: "An editorial spatial web concept replacing sterile enterprise date-pickers with architectural daylight transitions and calm, suite-first curation.",
    tags: ["Spatial UI", "Editorial Web", "Interaction Design", "Live Concept"],
    image: "/images/projects/somewhere/hotel-exterior-sunset-opt.webp",
    href: "/work/somewhere-hotel",
  },
  {
    id: "buybuddy",
    num: "05",
    shortLabel: "05 — BuyBuddy",
    eyebrow: "05 — Social Commerce · Concept System",
    title: "BuyBuddy: Frictionless group checkout & peer-to-peer cart coordination",
    desc: "A collaborative commerce prototype solving multi-user cart fragmentation through synchronized basket state and single-tap split billing.",
    tags: ["Social Commerce", "Collaborative UX", "Cart Systems", "Prototyping"],
    image: "/images/projects/buybuddy/store-landing-opt.webp",
    href: "/work/buybuddy",
  },
  {
    id: "stillwater",
    num: "06",
    shortLabel: "06 — Stillwater",
    eyebrow: "06 — Hospitality Architecture · Digital Space",
    title: "Stillwater Hall: Immersive spatial identity for private wellness retreats",
    desc: "A quiet, typography-driven digital flagship capturing tactile estate experiences through ambient motion, room-level discovery, and direct residency inquiries.",
    tags: ["Spatial Identity", "Art Direction", "Editorial Experience", "Motion Systems"],
    image: "/images/projects/stillwater/venue-exterior-opt.webp",
    href: "/work/stillwater",
  },
];

export default function WorkAccordion() {
  const [activeId, setActiveId] = useState<string>("medesy");
  const router = useRouter();

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const accRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const header = headerRef.current;
    const acc = accRef.current;
    const cta = ctaRef.current;
    if (!section || !header || !acc) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const panels = Array.from(acc.children) as HTMLElement[];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        toggleActions: "play none none reverse",
        fastScrollEnd: true,
      },
    });

    tl.fromTo(
      header,
      { y: 22, opacity: 0.25 },
      { y: 0, opacity: 1, duration: 0.45, ease: "power2.out", clearProps: "transform" }
    );

    tl.fromTo(
      panels,
      { y: 28, opacity: 0.2, scale: 0.99 },
      { y: 0, opacity: 1, scale: 1, duration: 0.55, stagger: 0.05, ease: "power2.out", clearProps: "transform" },
      "-=0.25"
    );

    if (cta) {
      tl.fromTo(
        cta,
        { y: 18, opacity: 0.2 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", clearProps: "transform" },
        "-=0.2"
      );
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  // Instant hover response with zero artificial delay — desktop mouse only
  const handlePointerEnter = useCallback((id: string) => {
    // Strictly fine pointer (mouse/trackpad) only — prevent mobile touch gestures from cancelling clicks
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    setActiveId(id);
  }, []);

  function handlePanelClick(p: ProjectItem, e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    // If the click is already on or within an interactive link, let the link handle navigation
    if (target.closest("a")) return;

    const isStacked = typeof window !== "undefined" && window.innerWidth <= 1024;

    // On mobile & tablet (stacked cards): all cards are already displayed open,
    // so tapping anywhere on the card navigates directly to the project case study.
    if (isStacked) {
      sound.playClick();
      router.push(p.href);
      return;
    }

    // On desktop: if the panel is currently collapsed, clicking it expands it;
    // if the panel is already expanded, clicking anywhere on it navigates to the project case study.
    if (activeId !== p.id) {
      sound.playClick();
      setActiveId(p.id);
      return;
    }

    sound.playClick();
    router.push(p.href);
  }

  return (
    <section ref={sectionRef} id="work">
      {/* Section Header */}
      <div ref={headerRef} className="work-header-row">
        <p className="intro-label">(02) &mdash; Selected work</p>
      </div>

      {/* Horizontal Accordion Gallery */}
      <div ref={accRef} className="acc" id="workAcc">
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
              {/* Collapsed Peek State */}
              <div className="acc-peek" aria-hidden="true" />
              <span className="acc-peek-label" aria-hidden="true">
                {project.shortLabel}
              </span>

              {/* Expanded Card Body */}
              <div className="acc-body">
                <Link
                  href={project.href}
                  className="acc-media-link"
                  aria-label={`Read ${project.title} case study`}
                  onClick={() => sound.playClick()}
                >
                  <div className="acc-media">
                    <div
                      className="acc-device"
                      role="img"
                      aria-label={`${project.title} preview mockup`}
                    />
                  </div>
                </Link>

                <div className="acc-info">
                  <span className="work-eyebrow">{project.eyebrow}</span>
                  <Link
                    href={project.href}
                    className="work-title-link"
                    onClick={() => sound.playClick()}
                    aria-label={`Read ${project.title} case study`}
                  >
                    <h3 className="work-title">{project.title}</h3>
                  </Link>
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
                    prefetch={true}
                    className="work-go cursor-pointer"
                    aria-label={`Read ${project.title} case study`}
                    onClick={() => {
                      sound.playClick();
                    }}
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

      {/* Prominent "Explore All Work" CTA */}
      <div ref={ctaRef} className="work-closing-cta">
        <Link
          href="/work"
          prefetch={true}
          className="work-explore-btn cursor-pointer"
          aria-label="Explore All Work in full directory"
          onClick={() => {
            sound.playClick();
          }}
        >
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

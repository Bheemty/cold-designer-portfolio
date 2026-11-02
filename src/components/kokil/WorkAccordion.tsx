"use client";

import { useState } from "react";
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
    title: "MEDesy: conversational triage & referral platform",
    desc: "Bridging patient-doctor consultations with structured triage intake, voice notes, and clinician appointment referrals.",
    tags: ["Product Design", "Conversational UX", "Healthcare", "Triage"],
    image: "/images/projects/medesy/whatsapp-mockup.png",
    href: "/work/medesy",
  },
  {
    id: "9jatrip",
    num: "02",
    shortLabel: "02 — 9jaTrip",
    eyebrow: "02 — Intercity Transit · Mobile App",
    title: "9jaTrip: organized long-distance travel across Nigeria",
    desc: "Dedicated intercity transit hub connecting travellers with verified interstate parks, transparent route pricing, and real-time fleet tracking.",
    tags: ["Mobile App", "Transit Systems", "UI/UX", "Intercity"],
    image: "/images/projects/9jatrip/booking-ride-mockup.png",
    href: "/work/9jatrip",
  },
  {
    id: "somewhere",
    num: "03",
    shortLabel: "03 — Somewhere",
    eyebrow: "03 — Hospitality · Spatial Web",
    title: "Somewhere Hotel: atmospheric spatial booking experience",
    desc: "A cinematic booking portal translating architectural luxury, day-to-night lighting transitions, and suite curation into digital spaces.",
    tags: ["Spatial Web", "Editorial UX", "Hospitality"],
    image: "/images/projects/somewhere/hotel-exterior-sunset.png",
    href: "/work/somewhere-hotel",
  },
  {
    id: "buybuddy",
    num: "04",
    shortLabel: "04 — BuyBuddy",
    eyebrow: "04 — Commerce · Marketplace Platform",
    title: "BuyBuddy: conversational buyer–seller marketplace",
    desc: "Connecting social commerce sellers and everyday shoppers with curated product catalogues and transparent storefronts.",
    tags: ["E-Commerce", "Marketplace", "Web App"],
    image: "/images/projects/buybuddy/store-landing.png",
    href: "/work/buybuddy",
  },
  {
    id: "stillwater",
    num: "05",
    shortLabel: "05 — Stillwater",
    eyebrow: "05 — Performing Arts · Sequential Flow",
    title: "Stillwater Hall: sequential concert hall walkthrough",
    desc: "An architectural acoustic journey mapping the physical progression from exterior plaza into auditorium seating.",
    tags: ["Acoustic Architecture", "Cinematic Web", "Media Flow"],
    image: "/images/projects/stillwater/venue-exterior.png",
    href: "/work/stillwater",
  },
];

export default function WorkAccordion() {
  const [activeId, setActiveId] = useState<string>("medesy");
  const router = useRouter();

  function handlePanelClick(p: ProjectItem, e: React.MouseEvent) {
    const isStacked = typeof window !== "undefined" && window.innerWidth <= 992;
    if (!isStacked && activeId !== p.id) {
      e.preventDefault();
      setActiveId(p.id);
      return;
    }
    // If clicking inside the card or its link
    const target = e.target as HTMLElement;
    if (target.closest(".work-go")) return;
    router.push(p.href);
  }

  return (
    <section id="work">
      <p className="intro-label">(02) &mdash; Selected work</p>
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
                ["--d" as string]: `${idx * 0.1}s`,
              }}
              aria-label={project.title}
              onMouseEnter={() => setActiveId(project.id)}
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
                <div className="acc-media">
                  <div
                    className="acc-device"
                    role="img"
                    aria-label={`${project.title} screen mockup`}
                  />
                </div>
                <span className="work-eyebrow">{project.eyebrow}</span>
                <h3 className="work-title">{project.title}</h3>
                <p className="work-desc">{project.desc}</p>
                <div className="work-tags">
                  {project.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                  <Link
                    href={project.href}
                    className="work-go"
                    aria-label={`Read ${project.title} case study`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Case Study
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
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}


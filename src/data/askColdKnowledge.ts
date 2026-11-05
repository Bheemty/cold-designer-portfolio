/**
 * ASK COLD — KNOWLEDGE BASE (SINGLE SOURCE OF TRUTH)
 * Grounded strictly in verified portfolio facts for Taye Abolarin (Cold Designer).
 * Never fabricate metrics, clients, degrees, or experiences.
 */

export interface KnowledgeProject {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  role: string;
  timeline: string;
  headline: string;
  summary: string;
  overview: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  tags: string[];
  systemHighlights: { title: string; description: string }[];
  specifications: { label: string; value: string }[];
  caseStudyUrl: string;
  prototypeUrl?: string;
  liveUrl?: string;
}

export interface KnowledgeService {
  id: string;
  title: string;
  category: string;
  headline: string;
  description: string;
  deliverables: string[];
  idealFor: string;
}

export interface KnowledgeEmployment {
  company: string;
  role: string;
  period: string;
  type: string;
  summary: string;
  keyContributions: string[];
}

export interface KnowledgeAvailability {
  status: string;
  openFor: string[];
  timeframe: string;
  collaborationModel: string;
  bookingGuidance: string;
}

export interface KnowledgePricing {
  model: string;
  policy: string;
  explanation: string;
  guidance: string;
}

export interface KnowledgeProcessStep {
  step: number;
  phase: string;
  description: string;
  outputs: string[];
}

export interface KnowledgeBase {
  profile: {
    fullName: string;
    publicName: string;
    brandName: string;
    handle: string;
    title: string;
    location: string;
    remotePreference: string;
    summary: string;
    philosophy: string;
    coreCompetencies: string[];
    designMethods: string[];
    technicalTools: string[];
    engineeringSkills: string[];
    resumeUrl: string;
    contactEmail: string;
    socialLinks: {
      linkedin: string;
      behance: string;
      tiktok: string;
    };
  };
  services: KnowledgeService[];
  employmentHistory: KnowledgeEmployment[];
  availability: KnowledgeAvailability;
  pricingPolicy: KnowledgePricing;
  designProcess: KnowledgeProcessStep[];
  projects: KnowledgeProject[];
  labExperiments: {
    id: string;
    title: string;
    category: string;
    description: string;
    url: string;
  }[];
  frequentlyAsked: {
    category: string;
    questions: string[];
    answerSummary: string;
  }[];
}

export const ASK_COLD_KNOWLEDGE: KnowledgeBase = {
  profile: {
    fullName: "Abolarin Taye Joseph",
    publicName: "Taye Abolarin",
    brandName: "Cold Designer",
    handle: "@cold_designer",
    title: "Independent Product Designer & Design Technologist",
    location: "Nigeria (Available Globally for Remote Roles & Consultations)",
    remotePreference: "Full remote, asynchronous collaboration across US, European, and African time zones.",
    summary:
      "Taye Abolarin (Cold Designer) is an independent product designer and design technologist specializing in complex UX architectures, conversational triage gateways, intercity mobility platforms, creative collaboration SaaS, enterprise HR systems, and high-fidelity interaction design. He bridges rigorous system thinking with frontend craft.",
    philosophy:
      "Design is the sum of a thousand invisible decisions. High-performing products eliminate cognitive friction by meeting users where they already communicate (such as WhatsApp-first healthcare triage), establishing intentional typography hierarchies, and delivering clear tactile and audio feedback.",
    coreCompetencies: [
      "Product Architecture & Information Hierarchy",
      "Conversational UX & Triage Systems",
      "Enterprise SaaS & Dashboard Design",
      "Mobile Interaction Design (iOS & Android)",
      "Design Systems & Token Architecture",
      "User Research, Survey Synthesis & Persona Modeling",
      "Rapid Prototyping & Micro-Interactions",
    ],
    designMethods: [
      "User journey mapping and mental model alignment",
      "Low-fidelity wireframing to high-fidelity component libraries",
      "Empirical usability testing and feedback synthesis",
      "Accessible typography, contrast, and responsive layout grids",
      "Dual-theme system design (light and dark modes)",
    ],
    technicalTools: [
      "Figma",
      "Figjam",
      "Adobe Photoshop",
      "Slack",
      "Google Meet / Forms / Docs",
      "Grain",
      "Microsoft Teams",
    ],
    engineeringSkills: [
      "Next.js App Router & React 19",
      "TypeScript",
      "Tailwind CSS",
      "GSAP (ScrollTrigger & Motion Choreography)",
      "Motion (Framer Motion)",
      "Web Audio API Synthesis",
    ],
    resumeUrl: "/Taye Abolarin-Product Designer-Resume.pdf",
    contactEmail: "abolarintaye20@gmail.com",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/taye-abolarin-b503b0240/",
      behance: "https://www.behance.net/Abolarin_Taye_Joseph",
      tiktok: "https://www.tiktok.com/@taye_abolarin2",
    },
  },

  services: [
    {
      id: "product-architecture-saas",
      title: "Enterprise SaaS & Web Applications",
      category: "Product Architecture & SaaS",
      headline: "Complex multi-persona platforms, data-dense dashboards, and operational workflows.",
      description:
        "Architecting end-to-end web applications and enterprise tools that turn dense operational data into actionable, high-clarity user interfaces.",
      deliverables: [
        "Information Architecture & Scaffolding",
        "Wireframing & User Journey Mapping",
        "30+ High-Fidelity Responsive Modules",
        "Role Permissions & Multi-Persona Dashboard UX",
      ],
      idealFor:
        "Founders, engineering leaders, and product teams building B2B SaaS, internal tools, HRMS, and data analytics platforms.",
    },
    {
      id: "mobile-app-design",
      title: "Mobile App Design (iOS & Android)",
      category: "Mobile Interaction Design",
      headline: "Native iOS and Android application design with tactile feedback and dual light/dark themes.",
      description:
        "Crafting intuitive consumer and enterprise mobile applications with platform-native ergonomics, rapid booking/checkout flows, and gesture-driven navigation.",
      deliverables: [
        "Full Mobile App UI/UX (Figma)",
        "Dual Light & Dark Theme UI Kits",
        "Interactive Mobile Click-Through Prototypes",
        "Developer Handoff Specifications & Redlines",
      ],
      idealFor:
        "Startups and product teams launching new consumer mobile apps, fintech banking, transit booking, or health/food tech.",
    },
    {
      id: "conversational-triage",
      title: "Conversational UX & Triage Gateways",
      category: "Conversational UI",
      headline: "Zero-barrier conversational interfaces on WhatsApp and web chat channels.",
      description:
        "Engineering humane conversational decision trees and symptom/request triage flows that eliminate account creation friction and meet users in familiar channels.",
      deliverables: [
        "Conversational UX Decision Trees",
        "WhatsApp Flow Architecture & Fallback Paths",
        "Web Service Triage Entrypoints",
        "Specialist / Clinician Handoff Routing",
      ],
      idealFor:
        "Healthcare providers, consultation platforms, and customer intake systems seeking zero-friction onboarding.",
    },
    {
      id: "design-systems",
      title: "Design Systems & Token Architecture",
      category: "Design Systems",
      headline: "Scalable Figma component libraries and multi-platform design tokens.",
      description:
        "Building production-grade design systems with atomic component hierarchies, accessible typographic scales, semantic color tokens, and engineering documentation.",
      deliverables: [
        "Figma Component Libraries (Auto-Layout 5.0)",
        "Design Tokens (JSON / CSS variables)",
        "Light & Dark Mode Token Semantic Aliases",
        "Component Usage & Accessibility Guidelines",
      ],
      idealFor:
        "Growing engineering and design teams needing consistency, rapid shipping velocity, and unified brand standards across platforms.",
    },
    {
      id: "ux-audits",
      title: "UX Audits & Heuristic Evaluation",
      category: "Design Strategy & Audits",
      headline: "Empirical usability reviews, friction point identification, and conversion optimization.",
      description:
        "Diagnosing drop-off points, typographic scanning friction, layout density issues, and usability hurdles in existing digital products with concrete redesign recommendations.",
      deliverables: [
        "Heuristic Usability Teardown",
        "Competitive Benchmarking Matrix",
        "Prioritized UX Recommendation Matrix",
        "Rapid Redesign Screen Concepts",
      ],
      idealFor:
        "Teams with established products facing high user drop-off, low conversion, or interface clutter.",
    },
    {
      id: "design-technologist",
      title: "Design Technologist & Interaction Prototyping",
      category: "Frontend Craft & Prototyping",
      headline: "High-fidelity interactive prototypes bridging design and production code.",
      description:
        "Translating sophisticated micro-interactions, spring physics, and fluid choreography into functional prototypes using React, Next.js, Tailwind, and GSAP.",
      deliverables: [
        "Functional Next.js / React Prototypes",
        "GSAP / Framer Motion Choreography Specs",
        "Web Audio / Haptic Feedback Integration",
        "Production-Ready Frontend Component Implementation",
      ],
      idealFor:
        "Teams aiming for world-class tactile polish, smooth transitions, and flawless design-to-engineering parity.",
    },
  ],

  employmentHistory: [
    {
      company: "Medesy Technologies",
      role: "Product Designer",
      period: "2024",
      type: "Employment Engagement",
      summary:
        "Designed a structured WhatsApp-first triage gateway connecting patients in Nigeria with licensed physicians, removing waiting room delays and app download barriers.",
      keyContributions: [
        "Architected an intuitive 3-step conversational triage pathway for symptom articulation over WhatsApp.",
        "Created the responsive web service gateway, doctor referral guidance, and consultation summary flows.",
        "Engineered the custom MEDesy component library and multi-platform design system.",
      ],
    },
    {
      company: "Greall Technologies",
      role: "Product Designer",
      period: "2023",
      type: "Employment Engagement",
      summary:
        "Led the complete corporate brand identity evolution and responsive web architecture overhaul for Greall Technologies.",
      keyContributions: [
        "Art-directed a modern brand visual system with refined typography and palette hierarchy.",
        "Rebuilt the responsive corporate website optimized for institutional partner evaluation across desktop and mobile.",
        "Created structured service ecosystem pillars communicating technical fintech credibility.",
      ],
    },
    {
      company: "Cold Designer Studio / Independent Practice",
      role: "Lead Product Designer & Design Technologist",
      period: "2023 - Present",
      type: "Independent Studio Practice",
      summary:
        "Leading product architecture, mobile app design, and design system engagements for founders and startups worldwide.",
      keyContributions: [
        "Directed an 8-week cross-functional team (PM, 2 frontend engineers, 2 designers) as Lead Product Designer on Spot, producing 30+ screens with pinned spatial critique.",
        "Designed PROfile enterprise HRMS: 37 high-resolution modules, predictive attrition analytics, and mobile self-service.",
        "Designed QuickEats consumer mobile app: 45 presentation boards, 20-minute recipe generator, dual light/dark themes.",
        "Designed Raven Bank personal banking app in an intensive 48-hour sprint featuring 1-tap beneficiary transfers.",
        "Designed 9jaTrip intercity transit mobile booking with terminal hub selection and digital QR boarding passes.",
      ],
    },
  ],

  availability: {
    status: "Open for select freelance gigs, contract roles, and design consultations.",
    openFor: [
      "Freelance Product Design Gigs (Web & Mobile Apps)",
      "Contract Product Designer / Design Technologist Roles (3 to 6+ months)",
      "Design System Architecture & Multi-Platform Component Libraries",
      "Comprehensive UX Audits & Product Strategy Consultations",
    ],
    timeframe: "Available to start new engagements immediately or on scheduled sprint cycles.",
    collaborationModel:
      "Full remote, asynchronous collaboration across US, European, and African time zones with dedicated weekly syncs.",
    bookingGuidance:
      "You can start a project enquiry right here through Ask Cold or email Taye directly at abolarintaye20@gmail.com with your project goals, scope, and target timeline.",
  },

  pricingPolicy: {
    model: "Value- and Scope-Based Pricing",
    policy:
      "Taye does not quote generic flat fees or invent arbitrary rates without understanding the project's specific scope and requirements.",
    explanation:
      "Every digital product is unique in its architectural complexity, number of platforms (web, iOS, Android), deliverable depth (from low-fi wireframes to coded design tokens), and timeline. Pricing is structured around project value, milestone deliverables, or defined monthly contract engagements.",
    guidance:
      "To receive an accurate estimate or proposal, share a high-level overview of your project (goals, key features, target timeline, and platform) via Ask Cold's 'Start Project Enquiry' option or by emailing abolarintaye20@gmail.com.",
  },

  designProcess: [
    {
      step: 1,
      phase: "Discovery & Strategy Alignment",
      description:
        "Deep dive into business goals, core user personas, technical constraints, and competitive benchmarks to establish clear success metrics.",
      outputs: ["Project Brief & Success Criteria", "User Journey Maps", "Information Hierarchy Scaffolding"],
    },
    {
      step: 2,
      phase: "System Architecture & Wireframing",
      description:
        "Rapid iteration on structural layouts, information flow, and low-fidelity wireframes to validate interaction paths without visual distraction.",
      outputs: ["Low-Fidelity Screen Flows", "Clickable Wireframe Walkthroughs", "Stakeholder Alignment Review"],
    },
    {
      step: 3,
      phase: "High-Fidelity UI & Design System",
      description:
        "Translating wireframes into polished, accessible, production-ready interfaces with typography scale, dual-theme color tokens, and atomic Figma components.",
      outputs: ["Production-Ready UI Screens", "Scalable Figma Component Library", "Dual Light & Dark Theme Assets"],
    },
    {
      step: 4,
      phase: "Interactive Prototyping & Motion",
      description:
        "Crafting fluid micro-interactions, transition choreography, and interactive click-throughs to test ergonomics and validate usability.",
      outputs: ["High-Fidelity Interactive Prototypes", "Motion & Transition Specifications", "Usability Feedback Revisions"],
    },
    {
      step: 5,
      phase: "Engineering Handoff & Quality Assurance",
      description:
        "Detailed developer documentation, token exports, auto-layout verification, and direct collaboration during frontend implementation.",
      outputs: ["Design Token Specs (JSON/CSS)", "Responsive Breakpoint Guidelines", "Design QA Audits on Staging"],
    },
  ],

  projects: [
    {
      slug: "medesy",
      title: "MEDesy Solution",
      client: "Medesy Technologies",
      category: "Healthcare & Conversational UI",
      year: "2024",
      role: "Product Designer",
      timeline: "Employment Engagement",
      headline: "Structured WhatsApp-First Triage Gateway Connecting Patients to Licensed Physicians",
      summary:
        "A conversational healthcare platform providing patient triage and licensed doctor consultations directly over WhatsApp — eliminating waiting room friction and app installation barriers.",
      overview:
        "MEDesy addresses healthcare accessibility by meeting patients where they already communicate: WhatsApp. Rather than requiring patients to download an unfamiliar app for episodic medical questions, MEDesy provides a structured conversational gateway where patients describe symptoms, connect with licensed Nigerian doctors, and receive verifiable consultation summaries securely.",
      challenge:
        "Creating immediate trust, clarity, and safety within a conversational interface and supporting web touchpoints. Patients in distress require clear triage without clinical jargon, while doctors need structured symptom summaries before commencing care.",
      solution:
        "Engineered an intuitive 3-step triage pathway: instant chat engagement without forced accounts, smart symptom guidance to the appropriate specialist, and seamless handoff for consultation and partner pharmacy directions.",
      deliverables: [
        "Conversational UX Architecture (WhatsApp Triage Flow)",
        "Web Service Gateway & Patient Entry Point",
        "Doctor Referral Guidance & Structured Consultation Flows",
        "Design System & Multi-Platform Component Library",
      ],
      tags: ["Healthcare", "Conversational UI", "WhatsApp", "Design System"],
      systemHighlights: [
        {
          title: "Conversational Triage Flow",
          description: "Humane, structured decision prompts helping patients articulate symptoms clearly before connecting to a licensed physician.",
        },
        {
          title: "Zero-Barrier WhatsApp Gateway",
          description: "Immediate consultation initiation using standard WhatsApp chat channels, ensuring reliable access across varied mobile devices.",
        },
        {
          title: "Verified Service Architecture",
          description: "Transparent web gateway displaying doctor credential standards, partner networks, and patient privacy commitments.",
        },
      ],
      specifications: [
        { label: "Platform", value: "WhatsApp Conversational Flow & Responsive Web" },
        { label: "Design Scope", value: "Triage UX, Consultation Flows & Web Architecture" },
        { label: "Engagement", value: "Product Designer (Employment)" },
        { label: "Design System", value: "Custom MEDesy Component Library" },
      ],
      caseStudyUrl: "/work/medesy",
      prototypeUrl: "https://www.figma.com/design/Vl1qsoE22hQjt8oEXZubja/Medesy-2?m=auto&t=jglC0OFhMaDeX2tP-6",
    },
    {
      slug: "9jatrip",
      title: "9jaTrip",
      client: "9jaTrip",
      category: "Intercity Mobility & Transit",
      year: "2024",
      role: "Product Designer",
      timeline: "Freelance Engagement",
      headline: "Intercity Transit Booking and Terminal Hub Logistics for Regional Commuters",
      summary:
        "A specialized intercity mobility platform designed for travelers moving between regional transport hubs and terminals — offering scheduled departures, seat selection, and digital boarding passes.",
      overview:
        "Commuting between major cities and regional hubs across Nigeria historically requires physical queues at dispersed bus parks with volatile pricing. 9jaTrip unifies intercity travel booking into a clean mobile experience, enabling travelers to reserve departures from established terminal hubs with guaranteed seat allocations.",
      challenge:
        "Accommodating varied route schedules, departure hubs, and fluctuating passenger capacity while providing absolute fare transparency and legible digital boarding verification.",
      solution:
        "Crafted an intuitive terminal-to-terminal journey planner: travelers pick their origin hub and destination corridor, compare vehicle amenities and departure times, select preferred seats, and receive high-contrast digital boarding passes ready for terminal gate scanning.",
      deliverables: [
        "Intercity Route & Terminal UX",
        "Scheduled Hub-to-Hub Seat Booking",
        "Upfront Route Fare Transparency",
        "Digital Boarding Pass & Terminal QR",
      ],
      tags: ["Mobility", "Intercity Transit", "Mobile App", "Terminal UX"],
      systemHighlights: [
        {
          title: "Intercity Terminal Hub Selector",
          description: "Clear hub-to-hub route search showing verified departure stations and scheduled transit intervals.",
        },
        {
          title: "Seat Reservation & Capacity",
          description: "Interactive seat map showing available window, aisle, and front seats with clear luggage allotment.",
        },
        {
          title: "Digital Boarding Verification",
          description: "High-contrast boarding pass with terminal departure gate details, QR verification, and itemized fare breakdown.",
        },
      ],
      specifications: [
        { label: "Platform", value: "iOS & Android Mobile Application" },
        { label: "Focus", value: "Intercity Transit, Hub Terminals, Digital Boarding" },
        { label: "Engagement", value: "Freelance Product Design" },
        { label: "Design Deliverable", value: "Figma UI/UX & Interactive Prototypes" },
      ],
      caseStudyUrl: "/work/9jatrip",
      prototypeUrl: "https://www.figma.com/design/QPyY4HiyEc40yQk5609OMG/9jaTrip?node-id=0-1&p=f&t=Mm09Z82YdZ3Is25i-0",
    },
    {
      slug: "somewhere-hotel",
      title: "Somewhere Hotel",
      client: "Somewhere Hospitality Group",
      category: "Hospitality & Spatial Web",
      year: "2024",
      role: "Digital Experience & Visual Designer",
      timeline: "Concept / Lab Exploration",
      headline: "Atmospheric Spatial Reservation Interface Translating Architectural Daylight and Calm",
      summary:
        "An editorial reservation concept translating architectural daylight transitions, suite spatial layouts, and calm curation into digital hospitality.",
      overview:
        "Digital hospitality platforms often subject guests to stressful countdown timers, flashing discounts, and overcrowded booking engines. Somewhere Hotel is an editorial reservation experience designed around calm spatial transitions, letting guests experience the property through dawn, noon, sunset, and twilight lighting conditions.",
      challenge:
        "Communicating tactile architectural space and emotional tranquility on 2D digital viewports without sacrificing booking conversion clarity.",
      solution:
        "Created an interactive daylight state engine that shifts imagery and typography according to time of day, integrated floor plan orientation maps, and quiet step-by-step reservation flows.",
      deliverables: [
        "Atmospheric Reservation Architecture",
        "Daylight Shift Interaction Engine",
        "Suite Floor Plan & View Orientation UX",
        "Editorial Visual Identity & Design System",
      ],
      tags: ["Hospitality", "Spatial Web", "Interaction Design", "Editorial UX"],
      systemHighlights: [
        {
          title: "Daylight Transition Engine",
          description: "Visual atmosphere that dynamically responds to time of day, previewing morning terrace light to twilight poolside moods.",
        },
        {
          title: "Spatial Suite Exploration",
          description: "Uncluttered floor plans and aspect perspectives giving guests genuine architectural context before booking.",
        },
        {
          title: "Calm Booking Pathway",
          description: "Elimination of manipulative scarcity patterns, providing transparent room inventory and upfront pricing.",
        },
      ],
      specifications: [
        { label: "Platform", value: "Responsive Web (Editorial Spatial Concept)" },
        { label: "Focus", value: "Atmospheric Digital Hospitality & Interaction" },
        { label: "Design Deliverable", value: "Figma Prototypes & Spatial Asset System" },
        { label: "Engagement", value: "Concept / Lab Exploration" },
      ],
      caseStudyUrl: "/work/somewhere-hotel",
      prototypeUrl: "https://www.figma.com/design/L5fXbK2GfQ5e7XgqB9Y9Xm/Somewhere-Hotel?node-id=0-1",
    },
    {
      slug: "buybuddy",
      title: "BuyBuddy",
      client: "BuyBuddy Commerce",
      category: "Social Commerce & Marketplace Platform",
      year: "2024",
      role: "Lead Product Designer",
      timeline: "Product Design Engagement",
      headline: "Streamlined Social Storefronts & Escrow-Protected Purchasing for Digital Merchants",
      summary:
        "Streamlining informal merchant commerce with quick product links, catalog management, and protected buyer inquiries.",
      overview:
        "Informal social commerce on Instagram and WhatsApp is plagued by trust friction, manual DM negotiations, and payment verification anxiety. BuyBuddy bridges informal selling with structured e-commerce, offering merchants instant bio-link storefronts, automated catalog sync, and escrow-backed payments.",
      challenge:
        "Designing an ultra-low-friction checkout for casual social media shoppers while providing informal vendors with sophisticated inventory and order tracking tools.",
      solution:
        "Engineered a 2-click guest checkout, WhatsApp-integrated order updates, and a clean vendor dashboard managing inventory, payment releases, and logistics coordination.",
      deliverables: [
        "Merchant Bio-Link Storefront Architecture",
        "2-Click Social Guest Checkout Flow",
        "Vendor Inventory & Escrow Management Dashboard",
        "Multi-Device Design System & Merchant Assets",
      ],
      tags: ["Commerce UX", "Marketplace Platform", "Merchant Tools", "Fintech"],
      systemHighlights: [
        {
          title: "Bio-Link Storefront Generator",
          description: "Lightweight mobile storefronts loading instantly from social bios with integrated payment gateways.",
        },
        {
          title: "Escrow Protection System",
          description: "Funds held securely until buyer confirms receipt, eliminating fraud anxiety on both sides.",
        },
        {
          title: "Merchant Inventory Dashboard",
          description: "Real-time stock alerts, revenue summaries, and instant WhatsApp customer messaging.",
        },
      ],
      specifications: [
        { label: "Platform", value: "Mobile Web Storefronts & Merchant Portal" },
        { label: "Focus", value: "Social Micro-Commerce & Escrow Purchasing" },
        { label: "Design Deliverable", value: "Figma UI/UX & Flow Specifications" },
        { label: "Engagement", value: "Lead Product Designer" },
      ],
      caseStudyUrl: "/work/buybuddy",
      prototypeUrl: "https://www.figma.com/design/buybuddy-spec?node-id=0-1",
    },
    {
      slug: "stillwater",
      title: "Stillwater Hall",
      client: "Stillwater Performing Arts Trust",
      category: "Performing Arts & Sequential Spatial Flow",
      year: "2024",
      role: "Spatial UX & Experience Designer",
      timeline: "Concept / Architectural Study",
      headline: "Acoustic Architectural Concert Walkthrough Translating Hall Geometry and Sonic Resonance",
      summary:
        "A sequential media experience translating architectural arrival, auditorium acoustics, and seat perspectives into a paced digital walkthrough.",
      overview:
        "Stillwater Hall explores how architectural spaces can be translated into digital journeys. Through 8 sequential camera chapters, the experience walks visitors from the twilight courtyard through the terrazzo lobby into the auditorium, showcasing sightlines, acoustics, and seating tiers.",
      challenge:
        "Preserving architectural reverence and cinematic spatial pacing within a responsive browser environment.",
      solution:
        "Designed an editorial chapter scrubber, acoustic perspective toggles, and immersive video chapter integration allowing visitors to inspect acoustic timber surfaces and seating perspectives.",
      deliverables: [
        "Sequential Chapter Walkthrough Interface",
        "Acoustic Sightline & Seating Simulator",
        "Twilight Lighting Mode & Spatial Camera Motion",
        "Responsive Architectural Specimen Showcase",
      ],
      tags: ["Acoustic Architecture", "Sequential Media", "Concept Web", "Spatial UX"],
      systemHighlights: [
        {
          title: "8-Chapter Walkthrough",
          description: "Paced sequential camera progression from exterior twilight arrival to front-row acoustic perspectives.",
        },
        {
          title: "Tiered Sightline Verification",
          description: "True-to-scale seat perspective views across stalls, dress circle, and upper balcony.",
        },
        {
          title: "Atmospheric Acoustic Scoring",
          description: "Integrated ambient reverberation preview matching physical hall acoustics.",
        },
      ],
      specifications: [
        { label: "Platform", value: "Cinematic Web Experience & Video Integration" },
        { label: "Focus", value: "Acoustic Architecture & Spatial Pacing" },
        { label: "Design Deliverable", value: "Figma Architecture & Interactive Video Scrubber" },
        { label: "Engagement", value: "Concept / Architectural Study" },
      ],
      caseStudyUrl: "/work/stillwater",
      prototypeUrl: "https://www.figma.com/design/stillwater-hall?node-id=0-1",
    },
    {
      slug: "greall-website",
      title: "Greall Corporate Rebrand",
      client: "Greall Technologies",
      category: "Corporate Web & Brand Identity",
      year: "2023",
      role: "Product Designer",
      timeline: "Corporate Brand Project",
      headline: "Brand Evolution and Modern Digital Presence for Greall Technologies",
      summary:
        "A complete corporate website redesign and brand identity overhaul for Greall, establishing a cohesive visual system, responsive web architecture, and contemporary product narrative.",
      overview:
        "As part of Greall's strategic positioning, this initiative focused on elevating the company's corporate web presence and brand language to communicate technological credibility and product ecosystem breadth to institutional partners and consumers.",
      challenge:
        "Unifying diverse technological offerings under a cohesive, modern visual language while modernizing the website's responsiveness and editorial clarity.",
      solution:
        "Art-directed a clean brand system featuring clear typography hierarchies, structured service pillars, and an uncluttered responsive layout that emphasizes technological capability without visual noise.",
      deliverables: [
        "Brand Identity & Visual System",
        "Responsive Corporate Web Redesign",
        "Product Narrative & Value Proposition",
        "Marketing Asset Library",
      ],
      tags: ["Brand Identity", "Web Design", "Fintech Ecosystem", "Design System"],
      systemHighlights: [
        {
          title: "Modern Visual System",
          description: "A refined palette and typography framework establishing strong brand authority across digital touchpoints.",
        },
        {
          title: "Responsive Web Architecture",
          description: "Editorial web layout optimized for executive evaluation across desktop displays and mobile viewports.",
        },
        {
          title: "Service Ecosystem Hierarchy",
          description: "Clear modular sections delineating Greall's technical products and enterprise value proposition.",
        },
      ],
      specifications: [
        { label: "Role", value: "Product Designer (Employment)" },
        { label: "Scope", value: "Corporate Website Rebrand & Digital Visual System" },
        { label: "Deliverable", value: "Figma Design System, Web Architecture & Assets" },
        { label: "Year", value: "2023" },
      ],
      caseStudyUrl: "/work/greall-website",
      prototypeUrl: "https://www.figma.com/design/lF1WVFUs6FAzgNZ4DBEHQz/Greall-s-Website-Rebranding?node-id=463-9841&t=nlMA7sCFaPU6OIpn-1",
    },
    {
      slug: "spot",
      title: "Spot",
      client: "Spot Creative Community",
      category: "SaaS & Creative Collaboration",
      year: "2024",
      role: "Lead Product Designer",
      timeline: "8-Week Cross-Functional Production",
      headline: "Structured Creative Feedback Platform Empowering Designers Through Community Critique",
      summary:
        "A dedicated web-based creative collaboration platform enabling designers to upload works-in-progress, receive pinned contextual critique from verified peers, access curated design resources, and engage in community design forums.",
      overview:
        "Designers often struggle in isolation without access to structured, constructive critique. Fragmented feedback across social media or messaging apps lacks spatial context and actionable depth. Spot provides a specialized web-based workspace where designers share projects, pin contextual feedback directly to visual layers, and collaborate with verified industry peers.",
      challenge:
        "Fostering constructive, respectful critique without letting feedback devolve into superficial praise or unhelpful criticism, while ensuring the canvas commenting interface feels lightweight and fluid on dense multi-artboard uploads.",
      solution:
        "As Lead Product Designer, guided an 8-week product cycle coordinating with engineering and project leadership. Engineered a pinned-commenting engine allowing reviewers to highlight exact interface coordinates, categorize remarks by UX, visual hierarchy, or typography, and track resolution states across design iterations.",
      deliverables: [
        "Product UX & Information Architecture (30+ High-Fidelity Screens)",
        "Interactive Feedback Canvas with Pinned Contextual Critique",
        "Collaborator Hub & Community Design Forum",
        "Multi-Device Design System & Component Library",
        "Qualitative Survey & Competitive Benchmark Studies",
      ],
      tags: ["SaaS", "Lead Product Designer", "Creative Feedback", "Design System", "Web App"],
      systemHighlights: [
        {
          title: "Pinned Spatial Critique Canvas",
          description: "Allows reviewers to click directly onto design artboards and attach categorized, actionable feedback with resolution status tags.",
        },
        {
          title: "Cross-Functional Design Leadership",
          description: "Directed product architecture across 8 weeks, coordinating with front-end engineers and supporting junior product designers.",
        },
        {
          title: "Curated Resource & Discussion Forum",
          description: "Integrated community hubs enabling designers to share design assets, seek mentorship, and discuss emerging industry standards.",
        },
      ],
      specifications: [
        { label: "Role", value: "Lead Product Designer" },
        { label: "Platform", value: "Responsive Web Application (30+ Screens)" },
        { label: "Duration", value: "8+ Weeks (Cross-Functional Team)" },
        { label: "Team", value: "1 PM, 1 Lead Designer, 2 Developers, 2 Designers" },
        { label: "Tools", value: "Figma, Adobe Photoshop, Figjam, Slack, Google Meet" },
      ],
      caseStudyUrl: "/work/spot",
      prototypeUrl: "https://www.behance.net/gallery/214429537/Spot-Redefining-Creative-Feedback-A-Case-Study",
    },
    {
      slug: "profile",
      title: "PROfile",
      client: "Enterprise Solutions",
      category: "Enterprise SaaS & HR Tech",
      year: "2025",
      role: "Product Designer",
      timeline: "Enterprise SaaS UX Architecture",
      headline: "Integrated Organizational HRMS and Employee Self-Service Portal",
      summary:
        "A comprehensive enterprise human resource management solution uniting administrative attendance tracking, automated clock-in, predictive attrition analytics, and employee self-service into an intuitive, accessible dashboard.",
      overview:
        "Organizations frequently manage workforce operations across siloed spreadsheets, disconnected payroll tools, and paper attendance sheets. PROfile centralizes human resource administration and employee self-service into a singular, responsive platform that simplifies day-to-day operations for HR managers while giving employees transparent control over their work life.",
      challenge:
        "Displaying dense enterprise metrics (headcount, attendance status, attrition risk, payroll distribution) without overwhelming administrative users, while making daily mobile tasks (clock-in, leave requests, feedback) effortless for frontline employees.",
      solution:
        "Architected a multi-persona system: a high-density administrative dashboard with high-clarity data visualizations for HR leadership, and a lightweight mobile companion for employees with one-tap attendance verification, leave status trackers, and company directories.",
      deliverables: [
        "Enterprise Executive & HR Administrative Dashboard",
        "Employee Self-Service (ESS) Mobile & Web Portals",
        "Automated Clock-In, Attendance & Leave Request Workflows",
        "Company Payroll Distribution & Predictive Attrition Analytics",
        "Multi-Persona Role Permissions & Navigation System",
      ],
      tags: ["Enterprise SaaS", "HR Tech", "Dashboard UX", "Data Visualization", "Mobile App"],
      systemHighlights: [
        {
          title: "Predictive Attrition & Retention Signals",
          description: "Surfaces departmental performance trends and employee satisfaction metrics to help leadership proactively address burnout and turnover.",
        },
        {
          title: "Unified Attendance & Clock-In Gateway",
          description: "Real-time attendance ledger distinguishing on-time arrivals, lateness, absences, and approved leaves with automatic shift reconciliation.",
        },
        {
          title: "Zero-Friction Employee Self-Service (ESS)",
          description: "Mobile-first portal allowing employees to log attendance, submit time-off requests, and review benefit allocations directly.",
        },
      ],
      specifications: [
        { label: "Platform", value: "Web Application & Mobile Companion" },
        { label: "Domain", value: "Enterprise SaaS, Human Resource Management (HRMS)" },
        { label: "Deliverable", value: "37 High-Resolution Modules & Responsive Design System" },
        { label: "Tools", value: "Figma, Grain, Teams, Google Docs, Google Forms, Google Meet" },
      ],
      caseStudyUrl: "/work/profile",
      prototypeUrl: "https://www.behance.net/gallery/222769651/PROfile-An-Organizational-HRM-Solution",
    },
    {
      slug: "quickeats",
      title: "QuickEats",
      client: "QuickEats Health",
      category: "Consumer Mobile & Food Tech",
      year: "2025",
      role: "Product Designer",
      timeline: "4 Weeks (Dec 14 – Jan 9)",
      headline: "Smart Meal Planning and Automated Grocery Companion for Busy Lifestyles",
      summary:
        "A thoughtful consumer mobile app empowering students and busy professionals to eat healthy on a budget through personalized 20-minute recipes, smart pantry matching, and automated grocery lists.",
      overview:
        "Young adults, students, and working professionals frequently struggle to maintain a healthy diet. Busy schedules lead to impulse takeout, food waste, and unnecessary grocery expenses. QuickEats turns grocery chaos into effortless, budget-friendly meals by pairing quick recipes (under 20 minutes) with intelligent shopping lists and pantry-aware recipe recommendations.",
      challenge:
        "Overcoming meal-prep intimidation without making nutrition tracking feel like a restrictive chore, while accommodating diverse dietary preferences, budget constraints, and time limitations.",
      solution:
        "Designed a frictionless mobile experience built around a flexible 7-day meal matrix. Users select dietary goals, tap available ingredients from their kitchen to generate recipes, and auto-export shopping lists sorted by supermarket aisle to save time and money.",
      deliverables: [
        "End-to-End Consumer Mobile Application (45 Presentation Boards)",
        "Dual Light & Dark Theme Design System",
        "Interactive Weekly Meal Planning & Schedule Grid",
        "Smart Pantry Ingredient Match & Batch Cooking Mode",
        "Automated Budget-Friendly Grocery List Generator",
      ],
      tags: ["Consumer Mobile", "Food Tech", "Meal Planning", "Design System", "Dual Theme"],
      systemHighlights: [
        {
          title: "Pantry Ingredient Matching",
          description: "Instantly suggests nutritious recipes using items already at home, minimizing grocery runs and household food waste.",
        },
        {
          title: "20-Minute Batch Cooking Mode",
          description: "Step-by-step cooking guides optimized for quick preparation and weekend batch storage.",
        },
        {
          title: "Auto-Consolidated Grocery Lists",
          description: "Aggregates ingredient requirements across all scheduled meals into a categorized, budget-aware shopping checklist.",
        },
      ],
      specifications: [
        { label: "Platform", value: "iOS & Android Native Mobile App" },
        { label: "Deliverable", value: "45 Presentation Boards, Dual Light/Dark UI Kit" },
        { label: "Duration", value: "4 Weeks (Dec 14 – Jan 9)" },
        { label: "Tools", value: "Figma, Google Docs, Google Forms, Google Meet, Slack" },
      ],
      caseStudyUrl: "/work/quickeats",
      prototypeUrl: "https://www.behance.net/gallery/218767855/Meal-Prepping-Mobile-App-A-Case-Study",
    },
    {
      slug: "raven-bank",
      title: "Raven Bank App",
      client: "Raven Bank (Redesign Sprint)",
      category: "Fintech & Mobile Banking",
      year: "2025",
      role: "Product Designer",
      timeline: "2-Day Intensive Redesign Challenge",
      headline: "High-Clarity Personal Banking and Instant P2P Transfer Experience",
      summary:
        "A 2-day intensive mobile banking redesign for Raven, modernizing the personal banking dashboard, clarifying balance management, and eliminating multi-step friction during peer-to-peer transfers.",
      overview:
        "Digital banking in Nigeria demands rapid, unambiguous interactions where transfers succeed without second-guessing. The Raven Bank personal app was redesigned in an intensive 2-day sprint to improve visual hierarchy, speed up peer-to-peer payments, and establish a modern, trustworthy aesthetic for users across all levels of tech experience.",
      challenge:
        "Simplifying complex everyday banking tasks without sacrificing regulatory security standards or obscuring vital account information.",
      solution:
        "Rebuilt the dashboard around a high-contrast balance hero with single-tap Send, Receive, and Pay actions. Introduced quick-transfer avatar chips for frequent beneficiaries and simplified transfer confirmation into a single clear step.",
      deliverables: [
        "Personal Banking Mobile App Redesign (10 Modules)",
        "Streamlined Account Balance & Virtual Card Dashboard",
        "Frictionless P2P Money Transfer & Beneficiary Flow",
        "Modernized Biometric Security & Onboarding Sequence",
      ],
      tags: ["Fintech", "Mobile Banking", "P2P Transfers", "Rapid Sprint", "UI/UX"],
      systemHighlights: [
        {
          title: "Single-Tap Transfer Shortcuts",
          description: "Circular frequent beneficiary chips on the home dashboard allowing users to initiate transfers in a single tap.",
        },
        {
          title: "High-Contrast Balance Controls",
          description: "Clean balance card with instant privacy toggle, MFB verification badge, and direct account number copy action.",
        },
        {
          title: "Rapid Sprint Execution",
          description: "Delivered a complete, cohesive mobile experience in a focused 48-hour design challenge.",
        },
      ],
      specifications: [
        { label: "Platform", value: "iOS & Android Mobile Banking" },
        { label: "Format", value: "2-Day Rapid Sprint Challenge" },
        { label: "Credit", value: "Abolarin, Taye Joseph (@cold_designer)" },
        { label: "Tools", value: "Figma, Figjam, Google Meet" },
      ],
      caseStudyUrl: "/work/raven-bank",
      prototypeUrl: "https://www.behance.net/gallery/221018589/Fintech-Application-Raven-Bank-App-A-Case-Study",
    },
    {
      slug: "will",
      title: "Will (Digital Legacy)",
      client: "Self-Initiated Concept",
      category: "Digital Legacy & Asset Succession",
      year: "2024",
      role: "Product Designer",
      timeline: "Concept Exploration",
      headline: "Empathetic Asset Inheritance and Generational Digital Legacy Planning",
      summary:
        "A sensitive digital platform helping individuals inventory digital accounts, appoint verified beneficiaries, and ensure the orderly, secure transfer of memories and assets.",
      overview:
        "As lives become increasingly digital, crucial financial accounts, personal records, and memories are frequently lost upon an individual's passing. Will was designed as a thoughtful digital estate tool helping individuals organize their legacy with emotional peace of mind.",
      challenge:
        "Designing for a deeply sensitive topic without inducing morbidity or anxiety, while maintaining rigorous clarity around security, encryption, and trustee verification triggers.",
      solution:
        "Created a calm, step-by-step onboarding journey treating estate planning as an act of care. Beneficiaries receive clearly structured instructions only upon verified triggers, with explicit permissions configured per asset.",
      deliverables: [
        "End-to-End Asset Succession UX",
        "Trustee & Beneficiary Verification Flows",
        "Encrypted Vault Architecture UI",
        "Empathetic Onboarding System",
      ],
      tags: ["Digital Legacy", "Fintech", "Security", "UX Research"],
      systemHighlights: [
        {
          title: "Empathetic Guided Onboarding",
          description: "Gentle progressive disclosure walking users through asset categories without intimidating legal complexity.",
        },
        {
          title: "Trustee Verification Protocol",
          description: "Clear multi-party verification interface ensuring assets remain sealed until verified life events occur.",
        },
        {
          title: "Encrypted Vault Hierarchy",
          description: "Structured categorized vaults for documents, financial credentials, and personal messages.",
        },
      ],
      specifications: [
        { label: "Platform", value: "Responsive Web & Mobile App Concept" },
        { label: "Focus", value: "Digital Estate Planning, Trustee Verification, UX" },
        { label: "Design Deliverable", value: "Figma Prototypes & Design System" },
        { label: "Engagement", value: "Concept / Lab Exploration" },
      ],
      caseStudyUrl: "/work/will",
      prototypeUrl: "https://www.figma.com/design/pLg1nVX9917TdkiDhjohoo/Will?node-id=0-1&t=1v4ItukpKgMzxDIC-1",
    },
    {
      slug: "agrivillage",
      title: "AgriVillage",
      client: "Self-Initiated Concept",
      category: "Agritech & Cooperative Commerce",
      year: "2024",
      role: "Product Designer",
      timeline: "Concept Exploration",
      headline: "Direct Market Access Connecting Smallholder Farmers and Bulk Buyers",
      summary:
        "A streamlined agricultural marketplace concept designed to bridge rural farming cooperatives with urban distributors, improving harvest price discovery and bulk logistics.",
      overview:
        "Agricultural supply chains in emerging markets suffer from severe intermediary markups and harvest waste. AgriVillage connects farming cooperatives directly with commercial food buyers, enabling transparent produce lot listing and coordinated aggregation.",
      challenge:
        "Designing for low-digital-literacy rural users alongside sophisticated commercial purchasers with divergent information needs.",
      solution:
        "Crafted a visual, icon-assisted listing flow for farmers to input crop yields, coupled with a robust search and negotiation interface for commercial purchasers tracking produce batches and harvest schedules.",
      deliverables: [
        "Farmer Cooperative Marketplace UX",
        "Bulk Produce Listing & Price Discovery",
        "Mobile-First Offline-Ready UI",
        "Logistics & Delivery Coordination",
      ],
      tags: ["Agritech", "Marketplace", "Logistics", "Mobile First"],
      systemHighlights: [
        {
          title: "Visual Produce Catalog",
          description: "Simplified icon-based entry system accommodating diverse agricultural grades and standard unit weights.",
        },
        {
          title: "Cooperative Batch Aggregation",
          description: "Allows multiple local smallholders to combine yields to fulfill large commercial purchase orders.",
        },
        {
          title: "Transparent Price Benchmarks",
          description: "Displays regional market averages to protect farmers against predatory low-ball pricing.",
        },
      ],
      specifications: [
        { label: "Platform", value: "Mobile-First Web Application" },
        { label: "Focus", value: "Agricultural Commerce, Price Discovery, Logistics" },
        { label: "Design Deliverable", value: "Figma UI/UX & Flow Specs" },
        { label: "Engagement", value: "Concept / Lab Exploration" },
      ],
      caseStudyUrl: "/work/agrivillage",
      prototypeUrl: "https://www.figma.com/design/XJQKHJvC4YzQbkN3ng8I22/AgriVillage?node-id=0-1&t=jS5CliPpYKPZb8kI-1",
    },
  ],

  labExperiments: [
    {
      id: "exp1",
      title: "The Interaction Studio",
      category: "Interaction & Haptic States",
      description: "Explores async button lifecycles (idle, loading, success), haptic/sound responses, and layout density.",
      url: "/lab#exp1-title",
    },
    {
      id: "exp2",
      title: "The Interface Switcher",
      category: "Theme & Surface Contrast",
      description: "Interactive demonstration of theme switching (Dark Obsidian vs Paper Light), contrast ratios, and layout density.",
      url: "/lab#exp2-title",
    },
    {
      id: "exp3",
      title: "Type & Visual Hierarchy Studio",
      category: "Typography Ergonomics",
      description: "Compares flat text hierarchies with intentional scanning contrast, variable weights, and tracking.",
      url: "/lab#exp3-title",
    },
    {
      id: "exp4",
      title: "Visual Architecture & Hero Studies",
      category: "Fidelity & Hero Section Studies",
      description: "Detailed interactive breakdown of the Clean Real Estate Hero Study and the University of Maiduguri Web Redesign.",
      url: "/lab#exp4-title",
    },
  ],

  frequentlyAsked: [
    {
      category: "Identity",
      questions: ["Who is Taye?", "Who is Cold Designer?", "Tell me about Taye"],
      answerSummary:
        "Taye Abolarin, known professionally as Cold Designer (@cold_designer), is an independent product designer and design technologist based in Nigeria, working with global teams. He specializes in conversational UX, mobility systems, creative SaaS platforms, enterprise HR solutions, and high-fidelity interaction design.",
    },
    {
      category: "Availability & Gigs",
      questions: [
        "Are you available for a gig?",
        "Can I hire Taye?",
        "Is Taye taking on freelance work?",
        "Are you available for contract roles?",
      ],
      answerSummary:
        "Yes! Taye is currently open for select freelance gigs, contract roles (3-6+ months), and design consultations. He works remotely with global teams across US, European, and African time zones. You can start an enquiry directly through Ask Cold or email him at abolarintaye20@gmail.com.",
    },
    {
      category: "Pricing & Rates",
      questions: [
        "How much does a project cost?",
        "What are your rates?",
        "How much for a website or app?",
        "Do you have a fixed price list?",
      ],
      answerSummary:
        "Taye uses value- and scope-based pricing rather than generic flat fees. Pricing is determined by architectural complexity, platform count (web, iOS, Android), deliverables, and timeline. To get an accurate quote, share a brief project summary via Ask Cold's enquiry option or email abolarintaye20@gmail.com.",
    },
    {
      category: "Services & Mobile Apps",
      questions: [
        "Do you design mobile apps?",
        "What services do you offer?",
        "Can you build a design system?",
        "Do you do UX audits?",
      ],
      answerSummary:
        "Yes, Taye specializes in Mobile App Design (iOS & Android native apps like QuickEats, Raven Bank, and 9jaTrip), Enterprise SaaS & Web Platforms (Spot, PROfile), Conversational UX (WhatsApp healthcare triage in MEDesy), Scalable Design Systems in Figma, and UX Audits.",
    },
    {
      category: "Employment & Experience",
      questions: [
        "What is Taye's work history?",
        "Tell me about his time at Medesy",
        "What was his role at Greall?",
      ],
      answerSummary:
        "Taye was Product Designer at Medesy Technologies (designing the WhatsApp healthcare triage gateway and web portal), Product Designer at Greall Technologies (leading their corporate rebrand and web redesign), and Lead Product Designer & Design Technologist at Cold Designer Studio directing projects like Spot, PROfile, QuickEats, and 9jaTrip.",
    },
    {
      category: "Design Process",
      questions: ["What is your design process?", "How do you work?", "How do we collaborate?"],
      answerSummary:
        "Taye follows a structured 5-stage workflow: 1) Discovery & Strategy Alignment, 2) System Architecture & Wireframing, 3) High-Fidelity UI & Design Systems, 4) Interactive Prototyping & Motion, and 5) Engineering Handoff & QA with detailed token specs.",
    },
    {
      category: "Resume",
      questions: ["Where is his resume?", "Can I download his CV?", "Show me his resume"],
      answerSummary:
        "You can view and download Taye's verified PDF resume directly at [/Taye Abolarin-Product Designer-Resume.pdf](/Taye%20Abolarin-Product%20Designer-Resume.pdf).",
    },
    {
      category: "Socials",
      questions: ["What are his social links?", "Where can I find him online?", "Behance or LinkedIn"],
      answerSummary:
        "Taye shares his design work and case studies on [Behance](https://www.behance.net/Abolarin_Taye_Joseph), connects professionally on [LinkedIn](https://www.linkedin.com/in/taye-abolarin-b503b0240/), and shares design content on [TikTok](https://www.tiktok.com/@taye_abolarin2).",
    },
  ],
};


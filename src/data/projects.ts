export interface ProjectGalleryItem {
  src: string;
  caption: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  type: "Employment" | "Client / Freelance" | "Concept / Lab Exploration";
  category: string;
  year: string;
  role: string;
  timeline: string;
  deliverables: string[];
  headline: string;
  summary: string;
  accentColor: string;
  featured: boolean;
  featuredOrder?: number;
  tags: string[];
  heroImage?: string;
  videoSrc?: string;
  gallery?: ProjectGalleryItem[];
  overview: string;
  challenge: string;
  solution: string;
  systemHighlights: {
    title: string;
    description: string;
  }[];
  specifications: {
    label: string;
    value: string;
  }[];
  prototypeUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  wireframeSummary: string;
}

export const PROJECTS: Project[] = [
  // ─────────────────────────────────────────────────────────────
  // 1. PRESERVED ORIGINAL PORTFOLIO PROJECTS (Foundational Work)
  // ─────────────────────────────────────────────────────────────
{
    slug: "medesy",
    title: "MEDesy Solution",
    client: "Medesy Technologies",
    type: "Employment",
    category: "Healthcare & Conversational UI",
    year: "2024",
    role: "Product Designer",
    timeline: "Employment Engagement",
    deliverables: [
      "Conversational UX Architecture (WhatsApp Triage Flow)",
      "Web Service Gateway & Patient Entry Point",
      "Doctor Referral Guidance & Structured Consultation Flows",
      "Design System & Multi-Platform Component Library",
    ],
    headline: "Structured WhatsApp-First Triage Gateway Connecting Patients to Licensed Physicians",
    summary:
      "A conversational healthcare platform providing patient triage and licensed doctor consultations directly over WhatsApp — eliminating waiting room friction and app installation barriers.",
    accentColor: "#A9DDF0",
    featured: true,
    featuredOrder: 1,
    tags: ["Healthcare", "Conversational UI", "WhatsApp", "Design System"],
    heroImage: "/images/projects/medesy/whatsapp-mockup-opt.webp",
    gallery: [
      {
        src: "/images/projects/medesy/whatsapp-mockup-opt.webp",
        caption: "MEDesy WhatsApp triage interface: immediate symptom guidance, licensed doctor matching, and structured consultation actions.",
        alt: "MEDesy WhatsApp Triage Mockup",
      },
    ],
    overview:
      "MEDesy addresses healthcare accessibility by meeting patients where they already communicate: WhatsApp. Rather than requiring patients to download an unfamiliar application for episodic medical questions, MEDesy provides a structured conversational gateway where patients describe symptoms, connect with licensed Nigerian doctors, and receive verifiable consultation summaries securely.",
    challenge:
      "Creating immediate trust, clarity, and safety within a conversational interface and supporting web touchpoints. Patients in distress require clear triage without clinical jargon, while doctors need structured symptom summaries before commencing care.",
    solution:
      "Engineered an intuitive 3-step triage pathway: instant chat engagement without forced accounts, smart symptom guidance to the appropriate specialist, and seamless handoff for consultation and partner pharmacy directions. All public presentations maintain strict confidentiality regarding proprietary clinical tooling.",
    systemHighlights: [
      {
        title: "Conversational Triage Flow",
        description:
          "Humane, structured decision prompts helping patients articulate symptoms clearly before connecting to a licensed physician.",
      },
      {
        title: "Zero-Barrier WhatsApp Gateway",
        description:
          "Immediate consultation initiation using standard WhatsApp chat channels, ensuring reliable access across varied mobile devices.",
      },
      {
        title: "Verified Service Architecture",
        description:
          "Transparent web gateway displaying doctor credential standards, partner networks, and patient privacy commitments.",
      },
    ],
    specifications: [
      { label: "Platform", value: "WhatsApp Conversational Flow & Responsive Web" },
      { label: "Design Scope", value: "Triage UX, Consultation Flows & Web Architecture" },
      { label: "Engagement", value: "Product Designer (Employment)" },
      { label: "Design System", value: "Custom MEDesy Component Library" },
    ],
    prototypeUrl: "https://www.figma.com/design/Vl1qsoE22hQjt8oEXZubja/Medesy-2?m=auto&t=jglC0OFhMaDeX2tP-6",
    wireframeSummary:
      "Structured around frictionless chat-initiated triage, high-clarity doctor profile summaries, and unambiguous consultation steps.",
  },
{
    slug: "9jatrip",
    title: "9jaTrip",
    client: "9jaTrip",
    type: "Client / Freelance",
    category: "Intercity Mobility & Transit",
    year: "2024",
    role: "Product Designer",
    timeline: "Freelance Engagement",
    deliverables: [
      "Intercity Route & Terminal UX",
      "Scheduled Hub-to-Hub Seat Booking",
      "Upfront Route Fare Transparency",
      "Digital Boarding Pass & Terminal QR",
    ],
    headline: "Intercity Transit Booking and Terminal Hub Logistics for Regional Commuters",
    summary:
      "A specialized intercity mobility platform designed for travelers moving between regional transport hubs and terminals — offering scheduled departures, seat selection, and digital boarding passes.",
    accentColor: "#A9DDF0",
    featured: true,
    featuredOrder: 2,
    tags: ["Mobility", "Intercity Transit", "Mobile App", "Terminal UX"],
    heroImage: "/images/projects/9jatrip/booking-screen.png",
    gallery: [
      {
        src: "/images/projects/9jatrip/booking-screen.png",
        caption: "9jaTrip intercity journey booking and payment gateway: trip itinerary, departure schedule, and Moniepoint verification.",
        alt: "9jaTrip Intercity Booking and Payment Gateway",
      },
      {
        src: "/images/projects/9jatrip/ride-receipt.png",
        caption: "Digital boarding pass and departure confirmation: seat assignment, passenger verification, and terminal check-in QR code.",
        alt: "9jaTrip Digital Boarding Pass & Confirmation Ticket",
      },
      {
        src: "/images/projects/9jatrip/chatter-receipt.png",
        caption: "Charter booking reservation receipt: transparent flat-rate vehicle charter with cash-on-arrival payment flexibility.",
        alt: "9jaTrip Charter Booking Reservation Receipt",
      },
    ],
    overview:
      "Commuting between major cities and regional hubs across Nigeria historically requires physical queues at dispersed bus parks with volatile pricing. 9jaTrip unifies intercity travel booking into a clean mobile experience, enabling travelers to reserve departures from established terminal hubs with guaranteed seat allocations.",
    challenge:
      "Accommodating varied route schedules, departure hubs, and fluctuating passenger capacity while providing absolute fare transparency and legible digital boarding verification.",
    solution:
      "Crafted an intuitive terminal-to-terminal journey planner: travelers pick their origin hub and destination corridor, compare vehicle amenities and departure times, select preferred seats, and receive high-contrast digital boarding passes ready for terminal gate scanning.",
    systemHighlights: [
      {
        title: "Intercity Terminal Hub Selector",
        description:
          "Clear hub-to-hub route search showing verified departure stations and scheduled transit intervals.",
      },
      {
        title: "Seat Reservation & Capacity",
        description:
          "Interactive seat map showing available window, aisle, and front seats with clear luggage allotment.",
      },
      {
        title: "Digital Boarding Verification",
        description:
          "High-contrast boarding pass with terminal departure gate details, QR verification, and itemized fare breakdown.",
      },
    ],
    specifications: [
      { label: "Platform", value: "iOS & Android Mobile Application" },
      { label: "Focus", value: "Intercity Transit, Hub Terminals, Digital Boarding" },
      { label: "Engagement", value: "Freelance Product Design" },
      { label: "Design Deliverable", value: "Figma UI/UX & Interactive Prototypes" },
    ],
    prototypeUrl: "https://www.figma.com/design/QPyY4HiyEc40yQk5609OMG/9jaTrip?node-id=0-1&p=f&t=Mm09Z82YdZ3Is25i-0",
    wireframeSummary:
      "Optimized bottom-sheet drawer patterns for rapid destination search, live map pin placement, and single-tap vehicle category selection.",
  },
{
    slug: "somewhere-hotel",
    title: "Somewhere Hotel",
    client: "Self-Initiated Concept",
    type: "Concept / Lab Exploration",
    category: "Hospitality & Spatial Web",
    year: "2024",
    role: "Experience Designer",
    timeline: "Concept Exploration",
    deliverables: [
      "Editorial Brand Digital Experience",
      "Curated Room & Suite Showcase",
      "Interactive Reservation Demonstration",
      "Atmospheric Daylight Transitions (Day, Sunset, Night)",
    ],
    headline: "Cinematic Coastal Hospitality Experience and Interactive Room Lookbook",
    summary:
      "An editorial digital experience for a fictional luxury coastal sanctuary, using photography-led spatial journeys across day, sunset, and night alongside a refined room reservation demonstration.",
    accentColor: "#A9DDF0",
    featured: false,
    featuredOrder: 3,
    tags: ["Hospitality", "Editorial Design", "Spatial Web", "Art Direction"],
    heroImage: "/images/projects/somewhere/suite-balcony-sunset-opt.webp",
    gallery: [
      {
        src: "/images/projects/somewhere/suite-balcony-sunset-opt.webp",
        caption: "Horizon Suite ocean terrace during golden-hour sunset with warm natural ambient light.",
        alt: "Somewhere Hotel Horizon Suite at Sunset",
      },
      {
        src: "/images/projects/somewhere/suite-balcony-day-opt.webp",
        caption: "Horizon Suite ocean terrace under midday daylight conditions.",
        alt: "Somewhere Hotel Horizon Suite at Day",
      },
      {
        src: "/images/projects/somewhere/suite-balcony-night-opt.webp",
        caption: "Horizon Suite ocean terrace under twilight and architectural night lighting.",
        alt: "Somewhere Hotel Horizon Suite at Night",
      },
      {
        src: "/images/projects/somewhere/hotel-exterior-sunset-opt.webp",
        caption: "Minimalist architectural entrance facade with soft twilight landscape lighting.",
        alt: "Somewhere Hotel Facade",
      },
    ],
    overview:
      "Somewhere Hotel is a fictional concept exploring hospitality web design treated as an editorial publication rather than a transactional booking engine. The experience guides visitors through photographic architectural sequences capturing arrival courtyards, ocean suites, private terraces, and dining rooms across shifting daylight hours.",
    challenge:
      "Balancing quiet, cinematic atmosphere with functional hospitality utility, ensuring room discovery feels evocative while keeping dates, rates, and guest parameters instantly accessible.",
    solution:
      "Designed a dual-tempo layout: full-bleed photographic storytelling paired with a sticky reservation dock. Guests can inspect suites by floor and daylight conditions (day, sunset, night), review amenities, and interact with a streamlined booking demonstration (no real payment or backend claimed).",
    systemHighlights: [
      {
        title: "Atmospheric Light-Phase Shifter",
        description:
          "Allows guests to view suite interiors and ocean balconies under morning light, golden-hour sunset, and twilight ambiance.",
      },
      {
        title: "Editorial Suite Lookbook",
        description:
          "Balanced serif typography, deliberate whitespace, and quiet micro-interactions evoking relaxed architectural luxury.",
      },
      {
        title: "Demonstration Reservation Drawer",
        description:
          "Non-intrusive booking demonstration facilitating date selection, suite comparisons, and guest count confirmation.",
      },
    ],
    specifications: [
      { label: "Platform", value: "Responsive Web Application" },
      { label: "Live Demo", value: "somewhere-hotel.vercel.app" },
      { label: "Focus", value: "Art Direction, Spatial Discovery, Booking Demonstration" },
      { label: "Engagement", value: "Personal Digital Concept" },
    ],
    liveUrl: "https://somewhere-hotel.vercel.app/",
    wireframeSummary:
      "Full-bleed hero transitions, contextual suite galleries with lighting toggles, and persistent reservation bar.",
  },
{
    slug: "buybuddy",
    title: "BuyBuddy",
    client: "Self-Initiated Concept",
    type: "Concept / Lab Exploration",
    category: "Commerce & Marketplace",
    year: "2024",
    role: "Product Designer & Frontend Developer",
    timeline: "Concept & Prototype Exploration",
    deliverables: [
      "Vendor Storefront & Inventory Studio",
      "Mobile-First Buyer Ordering Flow",
      "Order Management & Payment Ledger UI",
      "Responsive Web App (Next.js & TypeScript)",
    ],
    headline: "Modern Buyer–Seller Marketplace Platform for Independent Merchants",
    summary:
      "A mobile-first commerce ecosystem connecting independent merchants with buyers, featuring an intuitive merchant inventory studio, multi-variant product catalog, and seamless shopper order workflows.",
    accentColor: "#A9DDF0",
    featured: false,
    featuredOrder: 4,
    tags: ["Commerce", "Marketplace", "Next.js", "Design System"],
    heroImage: "/images/projects/buybuddy/vendor-products.png",
    gallery: [
      {
        src: "/images/projects/buybuddy/vendor-products.png",
        caption: "Vendor inventory studio: product listing, category organization, stock management, and pricing controls.",
        alt: "BuyBuddy Vendor Inventory Studio",
      },
      {
        src: "/images/projects/buybuddy/vendor-orders.png",
        caption: "Merchant orders ledger: real-time order tracking, fulfillment status, and customer details.",
        alt: "BuyBuddy Vendor Orders",
      },
      {
        src: "/images/projects/buybuddy/vendor-wallet.png",
        caption: "Vendor financial wallet: revenue summaries, pending settlements, and payout management.",
        alt: "BuyBuddy Vendor Wallet",
      },
      {
        src: "/images/projects/buybuddy/store-landing-opt.webp",
        caption: "Shopper-facing storefront view: clean mobile category navigation and product variant selectors.",
        alt: "BuyBuddy Store Landing",
      },
    ],
    overview:
      "Independent merchants and creative sellers frequently struggle with cumbersome, fragmented ecommerce tools that demand complex setup. BuyBuddy was designed as a modern buyer–seller marketplace platform that streamlines shop creation for vendors while providing buyers with a clean, trustworthy browsing and ordering experience.",
    challenge:
      "Designing a dual-sided marketplace interface that feels lightweight for mobile merchants managing physical stock while delivering frictionless product discovery for discerning consumers.",
    solution:
      "Crafted an integrated merchant dashboard (catalog, orders, wallet) paired with a responsive storefront lookbook where shoppers can inspect product variants, compare options, and submit structured orders.",
    systemHighlights: [
      {
        title: "Merchant Inventory Studio",
        description:
          "Mobile-first dashboard for publishing products, configuring size/color variants, and monitoring live stock levels.",
      },
      {
        title: "Order & Settlement Ledger",
        description:
          "Clear operational tracking for pending shipments, fulfilled transactions, and vendor revenue balance.",
      },
      {
        title: "Frictionless Buyer Catalog",
        description:
          "High-clarity product cards, instant variant filtering, and responsive basket drawer for rapid purchasing.",
      },
    ],
    specifications: [
      { label: "Stack", value: "Next.js App Router, TypeScript, Tailwind CSS" },
      { label: "Live Demo", value: "buybuddy-bheemty.netlify.app" },
      { label: "Focus", value: "Buyer–Seller Marketplace, Merchant Studio, Catalog UX" },
      { label: "Engagement", value: "Personal Product Concept" },
    ],
    liveUrl: "https://buybuddy-bheemty.netlify.app/",
    wireframeSummary:
      "Modular product grid cards, interactive sticky bag drawer, and vendor management navigation.",
  },
{
    slug: "stillwater",
    title: "Stillwater Hall",
    client: "Self-Initiated Concept",
    type: "Concept / Lab Exploration",
    category: "Cinematic Web & Performing Arts",
    year: "2024",
    role: "Experience Designer & Creative Developer",
    timeline: "Interactive Experiment",
    deliverables: [
      "Cinematic Spatial Venue Walkthrough (Exterior to Stage)",
      "5-Stage Walkthrough Progression (Arrival → Lobby → Stage → Seating → Rear)",
      "Interactive Seat-Row Sightline Details & Booking Demonstration",
      "Full Video Capture & Scrollytelling Choreography",
    ],
    headline: "Cinematic Spatial Walkthrough and Digital Ticketing for Stillwater Hall",
    summary:
      "An experiential web exploration guiding concertgoers through a cinematic architectural sequence from exterior arrival to center stage, complete with interactive seat selection and digital demo pass issuance.",
    accentColor: "#A9DDF0",
    featured: false,
    featuredOrder: 5,
    tags: ["Cinematic Web", "Motion Design", "Video Walkthrough", "Creative Code"],
    heroImage: "/images/projects/stillwater/05_Full_Stage-opt.webp",
    videoSrc: "/videos/stillwater/01_approach.mp4",
    gallery: [
      {
        src: "/images/projects/stillwater/01_Exterior-opt.webp",
        caption: "Stage 01: Evening exterior approach — twilight architectural illumination and atmospheric arrival.",
        alt: "Stillwater Hall Exterior Approach",
      },
      {
        src: "/images/projects/stillwater/03_Lobby-opt.webp",
        caption: "Stage 02: Grand foyer & lobby transition through glass threshold into the auditorium promenade.",
        alt: "Stillwater Grand Foyer",
      },
      {
        src: "/images/projects/stillwater/05_Full_Stage-opt.webp",
        caption: "Stage 03: Acoustic auditorium stage perspective with warm stage illumination.",
        alt: "Stillwater Full Stage",
      },
      {
        src: "/images/projects/stillwater/06_Front_Seating-opt.webp",
        caption: "Stage 04: Turn toward audience seating with interactive tier and sightline details.",
        alt: "Stillwater Front & Mid Seating",
      },
      {
        src: "/images/projects/stillwater/08_Rear_Seating-opt.webp",
        caption: "Stage 05: Rear auditorium seating and elevation vantage point.",
        alt: "Stillwater Rear Auditorium Seating",
      },
    ],
    overview:
      "Stillwater Hall explores how performing arts venues can introduce concerts through immersive digital spaces. Rather than relying on flat ticket grids, visitors embark on a continuous camera journey: approaching the venue under evening blue hour, stepping through the grand foyer, entering the burgundy concert hall, and standing on stage before choosing their seat.",
    challenge:
      "Communicating physical venue presence, acoustic anticipation, and seating sightlines on desktop and mobile browsers without requiring heavy 3D rendering engines.",
    solution:
      "Structured keyframed camera chapters (Evening Exterior → Lobby/Hall → Stage/Praise → Seat-Row Details/Booking → Rear Seating) tied to smooth scroll choreography, paired with an interactive seat map allowing attendees to inspect vantage points and issue a demo pass.",
    systemHighlights: [
      {
        title: "Cinematic Video Chapter Walkthrough",
        description:
          "Sequential video progression from exterior arrival through grand lobby to full stage view.",
      },
      {
        title: "Perspective Seat-Row Details",
        description:
          "Interactive seating interface mapping hall tiers, accessibility zones, and direct sightlines to the stage.",
      },
      {
        title: "Demonstration Digital Admission Pass",
        description:
          "Generates an editorial digital ticket badge displaying seat reservation, event date, and admission reference.",
      },
    ],
    specifications: [
      { label: "Live Site", value: "stillwater-concert-experience.vercel.app" },
      { label: "Repository", value: "github.com/Bheemty/Stillwater" },
      { label: "Focus", value: "Spatial Scrollytelling, Digital Ticketing, Motion" },
      { label: "Engagement", value: "Personal Cinematic Web Experience" },
    ],
    liveUrl: "https://stillwater-concert-experience.vercel.app/",
    githubUrl: "https://github.com/Bheemty/Stillwater",
    wireframeSummary:
      "Full-viewport progressive scrollytelling canvas with chapter indicator dock, seat selection overlay, and pass modal.",
  },
{
    slug: "greall-website",
    title: "Greall Corporate Rebrand",
    client: "Greall Technologies",
    type: "Employment",
    category: "Corporate Web & Brand Identity",
    year: "2023",
    role: "Product Designer",
    timeline: "Corporate Brand Project",
    deliverables: [
      "Brand Identity & Visual System",
      "Responsive Corporate Web Redesign",
      "Product Narrative & Value Proposition",
      "Marketing Asset Library",
    ],
    headline: "Brand Evolution and Modern Digital Presence for Greall Technologies",
    summary:
      "A complete corporate website redesign and brand identity overhaul for Greall, establishing a cohesive visual system, responsive web architecture, and contemporary product narrative.",
    accentColor: "#A9DDF0",
    featured: false,
    tags: ["Brand Identity", "Web Design", "Fintech Ecosystem", "Design System"],
    overview:
      "As part of Greall's strategic positioning, this initiative focused on elevating the company's corporate web presence and brand language to communicate technological credibility and product ecosystem breadth to institutional partners and consumers.",
    challenge:
      "Unifying diverse technological offerings under a cohesive, modern visual language while modernizing the website's responsiveness and editorial clarity.",
    solution:
      "Art-directed a clean brand system featuring clear typography hierarchies, structured service pillars, and an uncluttered responsive layout that emphasizes technological capability without visual noise.",
    systemHighlights: [
      {
        title: "Modern Visual System",
        description:
          "A refined palette and typography framework establishing strong brand authority across digital touchpoints.",
      },
      {
        title: "Responsive Web Architecture",
        description:
          "Editorial web layout optimized for executive evaluation across desktop displays and mobile viewports.",
      },
      {
        title: "Service Ecosystem Hierarchy",
        description:
          "Clear modular sections delineating Greall's technical products and enterprise value proposition.",
      },
    ],
    specifications: [
      { label: "Role", value: "Product Designer (Employment)" },
      { label: "Scope", value: "Corporate Website Rebrand & Digital Visual System" },
      { label: "Deliverable", value: "Figma Design System, Web Architecture & Assets" },
      { label: "Year", value: "2023" },
    ],
    prototypeUrl: "https://www.figma.com/design/lF1WVFUs6FAzgNZ4DBEHQz/Greall-s-Website-Rebranding?node-id=463-9841&t=nlMA7sCFaPU6OIpn-1",
    wireframeSummary:
      "Clear corporate narrative grid, interactive service highlights, and responsive navigation header.",
  },
{
    slug: "will",
    title: "Will (Digital Legacy)",
    client: "Self-Initiated Concept",
    type: "Concept / Lab Exploration",
    category: "Digital Legacy & Asset Succession",
    year: "2024",
    role: "Product Designer",
    timeline: "Concept Exploration",
    deliverables: [
      "End-to-End Asset Succession UX",
      "Trustee & Beneficiary Verification Flows",
      "Encrypted Vault Architecture UI",
      "Empathetic Onboarding System",
    ],
    headline: "Empathetic Asset Inheritance and Generational Digital Legacy Planning",
    summary:
      "A sensitive digital platform helping individuals inventory digital accounts, appoint verified beneficiaries, and ensure the orderly, secure transfer of memories and assets.",
    accentColor: "#A9DDF0",
    featured: false,
    tags: ["Digital Legacy", "Fintech", "Security", "UX Research"],
    overview:
      "As lives become increasingly digital, crucial financial accounts, personal records, and memories are frequently lost upon an individual's passing. Will was designed as a thoughtful digital estate tool helping individuals organize their legacy with emotional peace of mind.",
    challenge:
      "Designing for a deeply sensitive topic without inducing morbidity or anxiety, while maintaining rigorous clarity around security, encryption, and trustee verification triggers.",
    solution:
      "Created a calm, step-by-step onboarding journey treating estate planning as an act of care. Beneficiaries receive clearly structured instructions only upon verified triggers, with explicit permissions configured per asset.",
    systemHighlights: [
      {
        title: "Empathetic Guided Onboarding",
        description:
          "Gentle progressive disclosure walking users through asset categories without intimidating legal complexity.",
      },
      {
        title: "Trustee Verification Protocol",
        description:
          "Clear multi-party verification interface ensuring assets remain sealed until verified life events occur.",
      },
      {
        title: "Encrypted Vault Hierarchy",
        description:
          "Structured categorized vaults for documents, financial credentials, and personal messages.",
      },
    ],
    specifications: [
      { label: "Platform", value: "Responsive Web & Mobile App Concept" },
      { label: "Focus", value: "Digital Estate Planning, Trustee Verification, UX" },
      { label: "Design Deliverable", value: "Figma Prototypes & Design System" },
      { label: "Engagement", value: "Concept / Lab Exploration" },
    ],
    prototypeUrl: "https://www.figma.com/design/pLg1nVX9917TdkiDhjohoo/Will?node-id=0-1&t=1v4ItukpKgMzxDIC-1",
    wireframeSummary:
      "Multi-stage legacy setup wizards, secure asset inventory list, and trustee assignment drawer.",
  },
{
    slug: "agrivillage",
    title: "AgriVillage",
    client: "Self-Initiated Concept",
    type: "Concept / Lab Exploration",
    category: "Agritech & Cooperative Commerce",
    year: "2024",
    role: "Product Designer",
    timeline: "Concept Exploration",
    deliverables: [
      "Farmer Cooperative Marketplace UX",
      "Bulk Produce Listing & Price Discovery",
      "Mobile-First Offline-Ready UI",
      "Logistics & Delivery Coordination",
    ],
    headline: "Direct Market Access Connecting Smallholder Farmers and Bulk Buyers",
    summary:
      "A streamlined agricultural marketplace concept designed to bridge rural farming cooperatives with urban distributors, improving harvest price discovery and bulk logistics.",
    accentColor: "#A9DDF0",
    featured: false,
    tags: ["Agritech", "Marketplace", "Logistics", "Mobile First"],
    heroImage: "/images/projects/agrivillage/hero-opt.webp",
    gallery: [
      {
        src: "/images/projects/agrivillage/hero-opt.webp",
        caption: "AgriVillage platform exploration: 'Transforming Agriculture with Innovation and Technology' — farmer cooperative marketplace hero and responsive showcase.",
        alt: "AgriVillage Hero Section Design",
      },
    ],
    overview:
      "Agricultural supply chains in emerging markets suffer from severe intermediary markups and harvest waste. AgriVillage connects farming cooperatives directly with commercial food buyers, enabling transparent produce lot listing and coordinated aggregation.",
    challenge:
      "Designing for low-digital-literacy rural users alongside sophisticated commercial purchasers with divergent information needs.",
    solution:
      "Crafted a visual, icon-assisted listing flow for farmers to input crop yields, coupled with a robust search and negotiation interface for commercial purchasers tracking produce batches and harvest schedules.",
    systemHighlights: [
      {
        title: "Visual Produce Catalog",
        description:
          "Simplified icon-based entry system accommodating diverse agricultural grades and standard unit weights.",
      },
      {
        title: "Cooperative Batch Aggregation",
        description:
          "Allows multiple local smallholders to combine yields to fulfill large commercial purchase orders.",
      },
      {
        title: "Transparent Price Benchmarks",
        description:
          "Displays regional market averages to protect farmers against predatory low-ball pricing.",
      },
    ],
    specifications: [
      { label: "Platform", value: "Mobile-First Web Application" },
      { label: "Focus", value: "Agricultural Commerce, Price Discovery, Logistics" },
      { label: "Design Deliverable", value: "Figma UI/UX & Flow Specs" },
      { label: "Engagement", value: "Concept / Lab Exploration" },
    ],
    prototypeUrl: "https://www.figma.com/design/XJQKHJvC4YzQbkN3ng8I22/AgriVillage?node-id=0-1&t=jS5CliPpYKPZb8kI-1",
    wireframeSummary:
      "Large-touch target produce selectors, simple batch creation cards, and clear delivery timeline trackers.",
  },

  // ─────────────────────────────────────────────────────────────
  // 2. BEHANCE PORTFOLIO EXPANSIONS (Approved Additions)
  // ─────────────────────────────────────────────────────────────
{
    "slug": "spot",
    "title": "Spot",
    "client": "Spot Creative Community",
    "type": "Client / Freelance",
    "category": "SaaS & Creative Collaboration",
    "year": "2024",
    "role": "Lead Product Designer",
    "timeline": "8-Week Cross-Functional Production",
    "deliverables": [
      "Product UX & Information Architecture (30+ High-Fidelity Screens)",
      "Interactive Feedback Canvas with Pinned Contextual Critique",
      "Collaborator Hub & Community Design Forum",
      "Multi-Device Design System & Component Library",
      "Qualitative Survey & Competitive Benchmark Studies"
    ],
    "headline": "Structured Creative Feedback Platform Empowering Designers Through Community Critique",
    "summary": "A dedicated web-based creative collaboration platform enabling designers to upload works-in-progress, receive pinned contextual critique from verified peers, access curated design resources, and engage in community design forums.",
    "accentColor": "#EAA823",
    "featured": true,
    "featuredOrder": 3,
    "tags": [
      "SaaS",
      "Lead Product Designer",
      "Creative Feedback",
      "Design System",
      "Web App"
    ],
    "heroImage": "/images/projects/spot/hero-opt.webp",
    "gallery": [
      {
        "src": "/images/projects/spot/hero-opt.webp",
        "caption": "Spot creative collaboration platform: web-based hub for designers to upload work and receive structured peer feedback.",
        "alt": "Spot Creative Feedback Platform Hero"
      },
      {
        "src": "/images/projects/spot/problem-solution.png",
        "caption": "Problem statement & 8-week production scope: addressing the lack of actionable critique and fragmented design resources across 30+ screens.",
        "alt": "Spot Problem Statement and Metrics"
      },
      {
        "src": "/images/projects/spot/research-personas.png",
        "caption": "User research synthesis and empathy mapping: identifying key roadblocks in junior and independent designer workflows.",
        "alt": "Spot User Research & Personas"
      },
      {
        "src": "/images/projects/spot/design-system-opt.webp",
        "caption": "Spot multi-platform design system: token hierarchy, high-contrast typography, and reusable interaction components.",
        "alt": "Spot Design System"
      },
      {
        "src": "/images/projects/spot/feedback-canvas-opt.webp",
        "caption": "Contextual feedback canvas: pinned inline annotations, structured critique categories, and version comparisons.",
        "alt": "Spot Contextual Feedback Canvas"
      },
      {
        "src": "/images/projects/spot/screens-overview.png",
        "caption": "Comprehensive screen architecture: from onboarding and project showcases to community discussions and resource vaults.",
        "alt": "Spot High-Fidelity Responsive Screens"
      }
    ],
    "overview": "Designers often struggle in isolation without access to structured, constructive critique. Fragmented feedback across social media or messaging apps lacks spatial context and actionable depth. Spot provides a specialized web-based workspace where designers share projects, pin contextual feedback directly to visual layers, and collaborate with verified industry peers.",
    "challenge": "Fostering constructive, respectful critique without letting feedback devolve into superficial praise or unhelpful criticism, while ensuring the canvas commenting interface feels lightweight and fluid on dense multi-artboard uploads.",
    "solution": "As Lead Product Designer, guided an 8-week product cycle coordinating with engineering and project leadership. Engineered a pinned-commenting engine allowing reviewers to highlight exact interface coordinates, categorize remarks by UX, visual hierarchy, or typography, and track resolution states across design iterations.",
    "systemHighlights": [
      {
        "title": "Pinned Spatial Critique Canvas",
        "description": "Allows reviewers to click directly onto design artboards and attach categorized, actionable feedback with resolution status tags."
      },
      {
        "title": "Cross-Functional Design Leadership",
        "description": "Directed product architecture across 8 weeks, coordinating with front-end engineers and supporting junior product designers."
      },
      {
        "title": "Curated Resource & Discussion Forum",
        "description": "Integrated community hubs enabling designers to share design assets, seek mentorship, and discuss emerging industry standards."
      }
    ],
    "specifications": [
      {
        "label": "Role",
        "value": "Lead Product Designer"
      },
      {
        "label": "Platform",
        "value": "Responsive Web Application (30+ Screens)"
      },
      {
        "label": "Duration",
        "value": "8+ Weeks (Cross-Functional Team)"
      },
      {
        "label": "Team",
        "value": "1 PM, 1 Lead Designer, 2 Developers, 2 Designers"
      },
      {
        "label": "Tools",
        "value": "Figma, Adobe Photoshop, Figjam, Slack, Google Meet"
      }
    ],
    "prototypeUrl": "https://www.behance.net/gallery/214429537/Spot-Redefining-Creative-Feedback-A-Case-Study",
    "wireframeSummary": "Grid-based portfolio showcase, sticky lateral critique inspector, and multi-artboard canvas navigation."
  },
{
    "slug": "profile",
    "title": "PROfile",
    "client": "Enterprise Solutions",
    "type": "Client / Freelance",
    "category": "Enterprise SaaS & HR Tech",
    "year": "2025",
    "role": "Product Designer",
    "timeline": "Enterprise SaaS UX Architecture",
    "deliverables": [
      "Enterprise Executive & HR Administrative Dashboard",
      "Employee Self-Service (ESS) Mobile & Web Portals",
      "Automated Clock-In, Attendance & Leave Request Workflows",
      "Company Payroll Distribution & Predictive Attrition Analytics",
      "Multi-Persona Role Permissions & Navigation System"
    ],
    "headline": "Integrated Organizational HRMS and Employee Self-Service Portal",
    "summary": "A comprehensive enterprise human resource management solution uniting administrative attendance tracking, automated clock-in, predictive attrition analytics, and employee self-service into an intuitive, accessible dashboard.",
    "accentColor": "#1B59F8",
    "featured": true,
    "featuredOrder": 4,
    "tags": [
      "Enterprise SaaS",
      "HR Tech",
      "Dashboard UX",
      "Data Visualization",
      "Mobile App"
    ],
    "heroImage": "/images/projects/profile/hero-opt.webp",
    "gallery": [
      {
        "src": "/images/projects/profile/hero-opt.webp",
        "caption": "PROfile enterprise overview dashboard: real-time headcount (258 employees), working format ratio, performance charts, and payroll breakdown.",
        "alt": "PROfile Enterprise Overview Dashboard"
      },
      {
        "src": "/images/projects/profile/about-problems.png",
        "caption": "Core problem framework: replacing fragmented spreadsheets and manual tracking with centralized, automated, and predictive HR workflows.",
        "alt": "PROfile Problems and Objectives"
      },
      {
        "src": "/images/projects/profile/research-findings.png",
        "caption": "Quantitative user research & stakeholder insights: addressing attrition warning signs and employee self-service demands.",
        "alt": "PROfile User Research and Findings"
      },
      {
        "src": "/images/projects/profile/dashboard-overview.png",
        "caption": "Modular administrative workspaces: attendance rosters, payroll processing schedules, and departmental performance matrices.",
        "alt": "PROfile Administrative Workspaces"
      },
      {
        "src": "/images/projects/profile/mobile-screens.png",
        "caption": "Employee Self-Service (ESS) mobile app: one-tap clock-in, leave application tracker, shift calendar, and digital paystubs.",
        "alt": "PROfile ESS Mobile Application"
      }
    ],
    "overview": "Organizations frequently manage workforce operations across siloed spreadsheets, disconnected payroll tools, and paper attendance sheets. PROfile centralizes human resource administration and employee self-service into a singular, responsive platform that simplifies day-to-day operations for HR managers while giving employees transparent control over their work life.",
    "challenge": "Displaying dense enterprise metrics (headcount, attendance status, attrition risk, payroll distribution) without overwhelming administrative users, while making daily mobile tasks (clock-in, leave requests, feedback) effortless for frontline employees.",
    "solution": "Architected a multi-persona system: a high-density administrative dashboard with high-clarity data visualizations for HR leadership, and a lightweight mobile companion for employees with one-tap attendance verification, leave status trackers, and company directories.",
    "systemHighlights": [
      {
        "title": "Predictive Attrition & Retention Signals",
        "description": "Surfaces departmental performance trends and employee satisfaction metrics to help leadership proactively address burnout and turnover."
      },
      {
        "title": "Unified Attendance & Clock-In Gateway",
        "description": "Real-time attendance ledger distinguishing on-time arrivals, lateness, absences, and approved leaves with automatic shift reconciliation."
      },
      {
        "title": "Zero-Friction Employee Self-Service (ESS)",
        "description": "Mobile-first portal allowing employees to log attendance, submit time-off requests, and review benefit allocations directly."
      }
    ],
    "specifications": [
      {
        "label": "Platform",
        "value": "Web Application & Mobile Companion"
      },
      {
        "label": "Domain",
        "value": "Enterprise SaaS, Human Resource Management (HRMS)"
      },
      {
        "label": "Deliverable",
        "value": "37 High-Resolution Modules & Responsive Design System"
      },
      {
        "label": "Tools",
        "value": "Figma, Grain, Teams, Google Docs, Google Forms, Google Meet"
      }
    ],
    "prototypeUrl": "https://www.behance.net/gallery/222769651/PROfile-An-Organizational-HRM-Solution",
    "wireframeSummary": "Dual-tier navigation with sticky left operations rail, modular metric cards, and responsive slide-over employee profiles."
  },
{
    "slug": "quickeats",
    "title": "QuickEats",
    "client": "QuickEats Health",
    "type": "Concept / Lab Exploration",
    "category": "Consumer Mobile & Food Tech",
    "year": "2025",
    "role": "Product Designer",
    "timeline": "4 Weeks (Dec 14 – Jan 9)",
    "deliverables": [
      "End-to-End Consumer Mobile Application (45 Presentation Boards)",
      "Dual Light & Dark Theme Design System",
      "Interactive Weekly Meal Planning & Schedule Grid",
      "Smart Pantry Ingredient Match & Batch Cooking Mode",
      "Automated Budget-Friendly Grocery List Generator"
    ],
    "headline": "Smart Meal Planning and Automated Grocery Companion for Busy Lifestyles",
    "summary": "A thoughtful consumer mobile app empowering students and busy professionals to eat healthy on a budget through personalized 20-minute recipes, smart pantry matching, and automated grocery lists.",
    "accentColor": "#10B981",
    "featured": true,
    "featuredOrder": 5,
    "tags": [
      "Consumer Mobile",
      "Food Tech",
      "Meal Planning",
      "Design System",
      "Dual Theme"
    ],
    "heroImage": "/images/projects/quickeats/hero-opt.webp",
    "gallery": [
      {
        "src": "/images/projects/quickeats/hero-opt.webp",
        "caption": "QuickEats dual-theme mobile interface: light and dark theme comparison of the weekly meal planning dashboard.",
        "alt": "QuickEats Dual Theme Mobile Dashboard"
      },
      {
        "src": "/images/projects/quickeats/problem-solution-opt.webp",
        "caption": "Three-pillar problem framework: time constraints, lack of cooking confidence, and grocery budget mismanagement solved through smart UI.",
        "alt": "QuickEats Problems and Solutions"
      },
      {
        "src": "/images/projects/quickeats/user-research-opt.webp",
        "caption": "User research & survey analysis: identifying key grocery hurdles, dietary preferences, and preparation time limits.",
        "alt": "QuickEats User Research Synthesis"
      },
      {
        "src": "/images/projects/quickeats/meal-planning-flow-opt.webp",
        "caption": "Structured weekly meal planner: calendar scheduling (Breakfast, Lunch, Dinner), interactive recipe cards, and batch cooking guides.",
        "alt": "QuickEats Meal Planning Workflow"
      },
      {
        "src": "/images/projects/quickeats/design-system-opt.webp",
        "caption": "Comprehensive component library: typography scale, semantic color palettes for light/dark modes, and interactive food cards.",
        "alt": "QuickEats Design System & UI Kit"
      }
    ],
    "overview": "Young adults, students, and working professionals frequently struggle to maintain a healthy diet. Busy schedules lead to impulse takeout, food waste, and unnecessary grocery expenses. QuickEats turns grocery chaos into effortless, budget-friendly meals by pairing quick recipes (under 20 minutes) with intelligent shopping lists and pantry-aware recipe recommendations.",
    "challenge": "Overcoming meal-prep intimidation without making nutrition tracking feel like a restrictive chore, while accommodating diverse dietary preferences, budget constraints, and time limitations.",
    "solution": "Designed a frictionless mobile experience built around a flexible 7-day meal matrix. Users select dietary goals, tap available ingredients from their kitchen to generate recipes, and auto-export shopping lists sorted by supermarket aisle to save time and money.",
    "systemHighlights": [
      {
        "title": "Pantry Ingredient Matching",
        "description": "Instantly suggests nutritious recipes using items already at home, minimizing grocery runs and household food waste."
      },
      {
        "title": "20-Minute Batch Cooking Mode",
        "description": "Step-by-step cooking guides optimized for quick preparation and weekend batch storage."
      },
      {
        "title": "Auto-Consolidated Grocery Lists",
        "description": "Aggregates ingredient requirements across all scheduled meals into a categorized, budget-aware shopping checklist."
      }
    ],
    "specifications": [
      {
        "label": "Platform",
        "value": "iOS & Android Native Mobile App"
      },
      {
        "label": "Deliverable",
        "value": "45 Presentation Boards, Dual Light/Dark UI Kit"
      },
      {
        "label": "Duration",
        "value": "4 Weeks (Dec 14 – Jan 9)"
      },
      {
        "label": "Tools",
        "value": "Figma, Google Docs, Google Forms, Google Meet, Slack"
      }
    ],
    "prototypeUrl": "https://www.behance.net/gallery/218767855/Meal-Prepping-Mobile-App-A-Case-Study",
    "wireframeSummary": "Bottom-dock navigation with calendar header, card-based swipe gestures for dish swaps, and collapsible ingredient trays."
  },
{
    "slug": "raven-bank",
    "title": "Raven Bank App",
    "client": "Raven Bank (Redesign Sprint)",
    "type": "Concept / Lab Exploration",
    "category": "Fintech & Mobile Banking",
    "year": "2025",
    "role": "Product Designer",
    "timeline": "2-Day Intensive Redesign Challenge",
    "deliverables": [
      "Personal Banking Mobile App Redesign (10 Modules)",
      "Streamlined Account Balance & Virtual Card Dashboard",
      "Frictionless P2P Money Transfer & Beneficiary Flow",
      "Modernized Biometric Security & Onboarding Sequence"
    ],
    "headline": "High-Clarity Personal Banking and Instant P2P Transfer Experience",
    "summary": "A 2-day intensive mobile banking redesign for Raven, modernizing the personal banking dashboard, clarifying balance management, and eliminating multi-step friction during peer-to-peer transfers.",
    "accentColor": "#7C3AED",
    "featured": false,
    "tags": [
      "Fintech",
      "Mobile Banking",
      "P2P Transfers",
      "Rapid Sprint",
      "UI/UX"
    ],
    "heroImage": "/images/projects/raven-bank/hero-opt.webp",
    "gallery": [
      {
        "src": "/images/projects/raven-bank/hero-opt.webp",
        "caption": "Raven Bank redesign hero: redesigned onboarding, personal account dashboard (BestStar MFB), and security screens.",
        "alt": "Raven Bank Mobile Redesign Hero"
      },
      {
        "src": "/images/projects/raven-bank/problem-solution-opt.webp",
        "caption": "Sprint objectives: replacing cluttered legacy navigation with clear financial controls, intuitive balance visibility, and instant transfers.",
        "alt": "Raven Bank Challenge and Solution"
      },
      {
        "src": "/images/projects/raven-bank/onboarding-flow.png",
        "caption": "High-trust security onboarding: biometric login verification and clear account privacy protections.",
        "alt": "Raven Bank Security and Onboarding"
      },
      {
        "src": "/images/projects/raven-bank/transfer-screens.png",
        "caption": "Streamlined money transfer workflow: quick beneficiary shortcuts (Kola, Sophia, Donald), instant amount entry, and receipt cards.",
        "alt": "Raven Bank Transfer Experience"
      },
      {
        "src": "/images/projects/raven-bank/dashboard-cards.png",
        "caption": "Modular financial cards: one-tap access to airtime, utility bills, data bundles, and recent transfer logs.",
        "alt": "Raven Bank Financial Dashboards"
      }
    ],
    "overview": "Digital banking in Nigeria demands rapid, unambiguous interactions where transfers succeed without second-guessing. The Raven Bank personal app was redesigned in an intensive 2-day sprint to improve visual hierarchy, speed up peer-to-peer payments, and establish a modern, trustworthy aesthetic for users across all levels of tech experience.",
    "challenge": "Simplifying complex everyday banking tasks without sacrificing regulatory security standards or obscuring vital account information.",
    "solution": "Rebuilt the dashboard around a high-contrast balance hero with single-tap Send, Receive, and Pay actions. Introduced quick-transfer avatar chips for frequent beneficiaries and simplified transfer confirmation into a single clear step.",
    "systemHighlights": [
      {
        "title": "Single-Tap Transfer Shortcuts",
        "description": "Circular frequent beneficiary chips on the home dashboard allowing users to initiate transfers in a single tap."
      },
      {
        "title": "High-Contrast Balance Controls",
        "description": "Clean balance card with instant privacy toggle, MFB verification badge, and direct account number copy action."
      },
      {
        "title": "Rapid Sprint Execution",
        "description": "Delivered a complete, cohesive mobile experience in a focused 48-hour design challenge."
      }
    ],
    "specifications": [
      {
        "label": "Platform",
        "value": "iOS & Android Mobile Banking"
      },
      {
        "label": "Format",
        "value": "2-Day Rapid Sprint Challenge"
      },
      {
        "label": "Credit",
        "value": "Abolarin, Taye Joseph (@cold_designer)"
      },
      {
        "label": "Tools",
        "value": "Figma, Figjam, Google Meet"
      }
    ],
    "prototypeUrl": "https://www.behance.net/gallery/221018589/Fintech-Application-Raven-Bank-App-A-Case-Study",
    "wireframeSummary": "Header with notification badges, central balance capsule, horizontal beneficiary carousel, and quick utility tiles."
  },
];

// ─────────────────────────────────────────────────────────────
// PRIVATE / UNRELEASED SOURCE (Strictly Excluded from Public Routes)
// ─────────────────────────────────────────────────────────────
export const PRIVATE_UNRELEASED_PROJECTS: Project[] = [
{
    slug: "nova-wellness",
    title: "Nova Wellness",
    client: "Self-Initiated Concept",
    type: "Concept / Lab Exploration",
    category: "Mobile Health & Supportive Companion",
    year: "2024",
    role: "Product Designer & React Native Developer",
    timeline: "Mobile Exploration",
    deliverables: [
      "Daily Wellness Check-In Companion",
      "Voice Reflection Journal (AssemblyAI)",
      "Conversational Reflection Guidance (Gemini)",
      "Private On-Device Data Architecture",
    ],
    headline: "Supportive Daily Wellness Companion with Voice Journaling and Gemini AI",
    summary:
      "A React Native mobile application built with Expo SDK 57, offering mindful mood check-ins, AssemblyAI voice transcription, reflective AI conversation via Gemini, and privacy-first on-device data persistence.",
    accentColor: "#A9DDF0",
    featured: false,
    tags: ["Mobile App", "React Native", "AI Companion", "Mental Wellness"],
    overview:
      "Nova is a supportive mobile companion designed to facilitate daily mental check-ins, reflective voice journaling, and habit tracking without intrusive telemetry or unsolicited clinical diagnoses. The app operates with strict on-device data storage, ensuring personal entries remain confidential.",
    challenge:
      "Designing an empathetic, calm mobile interface that encourages daily consistency without inducing screen guilt or gamifying mental well-being.",
    solution:
      "Implemented a calm typography-driven design language, quick morning/evening check-in sheets, voice-to-text reflections with editable transcriptions, and a contextual Gemini conversation assistant that only responds when explicitly summoned.",
    systemHighlights: [
      {
        title: "Voice-to-Text Reflection",
        description:
          "Streamlined voice recording with AssemblyAI integration, producing editable transcripts before saving.",
      },
      {
        title: "Intentional Gemini Conversations",
        description:
          "AI reflection partner operating within bounded contexts, providing supportive inquiry without clinical claims.",
      },
      {
        title: "Private On-Device Storage",
        description:
          "All check-in entries, voice transcripts, and routine logs persist strictly on the local device.",
      },
    ],
    specifications: [
      { label: "Tech Stack", value: "React Native, Expo SDK 57, TypeScript, Reanimated" },
      { label: "AI & Audio", value: "Gemini Developer API, AssemblyAI Transcription" },
      { label: "Focus", value: "Mindful Check-Ins, Voice Journaling, Local Privacy" },
      { label: "Repository", value: "github.com/Bheemty/nova-wellness" },
    ],
    githubUrl: "https://github.com/Bheemty/nova-wellness",
    wireframeSummary:
      "Floating navigation bar, keyboard-safe bottom sheets, and expandable voice recording states.",
  },
];

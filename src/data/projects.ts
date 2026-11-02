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
    heroImage: "/images/projects/medesy/whatsapp-mockup.png",
    gallery: [
      {
        src: "/images/projects/medesy/whatsapp-mockup.png",
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
    heroImage: "/images/projects/9jatrip/home-screen-mockup.png",
    gallery: [
      {
        src: "/images/projects/9jatrip/home-screen-mockup.png",
        caption: "9jaTrip terminal hub route selector: scheduled departures between intercity hubs with upfront pricing.",
        alt: "9jaTrip Home Screen Mockup",
      },
      {
        src: "/images/projects/9jatrip/booking-ride-mockup.png",
        caption: "Intercity transit booking interface: vehicle capacity, seat tier options, and luggage allowances.",
        alt: "9jaTrip Booking Ride Mockup",
      },
      {
        src: "/images/projects/9jatrip/live-tracking-mockup.png",
        caption: "Intercity coach and transit live departure tracking with terminal bay indicators.",
        alt: "9jaTrip Live Tracking Mockup",
      },
      {
        src: "/images/projects/9jatrip/ride-receipt.png",
        caption: "Digital boarding pass and itemized fare receipt with terminal check-in QR code.",
        alt: "9jaTrip Boarding Pass & Receipt",
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
    featured: true,
    featuredOrder: 3,
    tags: ["Hospitality", "Editorial Design", "Spatial Web", "Art Direction"],
    heroImage: "/images/projects/somewhere/suite-balcony-sunset.png",
    gallery: [
      {
        src: "/images/projects/somewhere/suite-balcony-sunset.png",
        caption: "Horizon Suite ocean terrace during golden-hour sunset with warm natural ambient light.",
        alt: "Somewhere Hotel Horizon Suite at Sunset",
      },
      {
        src: "/images/projects/somewhere/suite-balcony-day.png",
        caption: "Horizon Suite ocean terrace under midday daylight conditions.",
        alt: "Somewhere Hotel Horizon Suite at Day",
      },
      {
        src: "/images/projects/somewhere/suite-balcony-night.png",
        caption: "Horizon Suite ocean terrace under twilight and architectural night lighting.",
        alt: "Somewhere Hotel Horizon Suite at Night",
      },
      {
        src: "/images/projects/somewhere/hotel-exterior-sunset.png",
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
    featured: true,
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
        src: "/images/projects/buybuddy/store-landing.png",
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
    featured: true,
    featuredOrder: 5,
    tags: ["Cinematic Web", "Motion Design", "Video Walkthrough", "Creative Code"],
    heroImage: "/images/projects/stillwater/05_Full_Stage.png",
    videoSrc: "/videos/stillwater/01_approach.mp4",
    gallery: [
      {
        src: "/images/projects/stillwater/01_Exterior.png",
        caption: "Stage 01: Evening exterior approach — twilight architectural illumination and atmospheric arrival.",
        alt: "Stillwater Hall Exterior Approach",
      },
      {
        src: "/images/projects/stillwater/03_Lobby.png",
        caption: "Stage 02: Grand foyer & lobby transition through glass threshold into the auditorium promenade.",
        alt: "Stillwater Grand Foyer",
      },
      {
        src: "/images/projects/stillwater/05_Full_Stage.png",
        caption: "Stage 03: Acoustic auditorium stage perspective with warm stage illumination.",
        alt: "Stillwater Full Stage",
      },
      {
        src: "/images/projects/stillwater/06_Front_Seating.png",
        caption: "Stage 04: Turn toward audience seating with interactive tier and sightline details.",
        alt: "Stillwater Front & Mid Seating",
      },
      {
        src: "/images/projects/stillwater/08_Rear_Seating.png",
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
];

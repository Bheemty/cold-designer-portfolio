export interface ProjectGalleryItem {
  src: string;
  caption: string;
  alt: string;
}

export interface ProjectDiscoveryInsight {
  title: string;
  description: string;
  type: "observation" | "constraint" | "insight";
}

export interface ProjectDesignDecision {
  title: string;
  rationale: string;
  tradeOff?: string;
}

export interface ProjectWorkflow {
  title: string;
  steps: string[];
  outcome: string;
}

export interface ProjectValidation {
  methodology: string;
  feedbackSummary: string;
  iterationsMade: string[];
  limitationsAcknowledged: string;
}

export interface ProjectOutcomes {
  deliverablesSummary: string;
  keyLearnings: string[];
  futureImprovements?: string[];
}

export interface ProjectProblemStatement {
  context: string;
  friction: string;
  impact: string;
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

  // Rich storytelling & audit enhancements
  storytellingFormat?: "in-depth-case-study" | "spatial-showcase" | "concept-exploration" | "confidential-practice";
  badgeLabel?: string;
  confidentialityNote?: string;
  problemStatement?: ProjectProblemStatement;
  discoveryInsights?: ProjectDiscoveryInsight[];
  designDecisions?: ProjectDesignDecision[];
  coreWorkflows?: ProjectWorkflow[];
  validation?: ProjectValidation;
  outcomes?: ProjectOutcomes;
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
    storytellingFormat: "in-depth-case-study",
    badgeLabel: "Employment Engagement · NDA Compliant",
    confidentialityNote:
      "This case study showcases the user-facing conversational triage UX, public web gateway, and licensed doctor consultation workflows. In accordance with employment non-disclosure agreements, proprietary internal clinical diagnostic algorithms and backend physician scheduling tooling are confidential and omitted.",
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
        caption: "MEDesy WhatsApp triage interface: instant symptom intake chips, severity grading, and structured licensed physician consultation handoff.",
        alt: "MEDesy WhatsApp Triage Mockup",
      },
    ],
    problemStatement: {
      context:
        "Accessing qualified medical consultations across Nigerian cities frequently entails hours spent in crowded clinic waiting rooms, costly cross-town travel, and fragmented physical paper records.",
      friction:
        "Patients experiencing acute symptoms or seeking episodic medical advice face severe drop-off when forced to download a 60MB native mobile application and complete multi-step account registration before speaking with a clinician.",
      impact:
        "Delayed early medical consultation, high drop-off during registration distress, and widespread reliance on unverified internet self-medication.",
    },
    overview:
      "MEDesy addresses healthcare accessibility by meeting patients where they already communicate: WhatsApp. Rather than requiring patients to download an unfamiliar application for episodic medical questions, MEDesy provides a structured conversational gateway where patients describe symptoms, connect with licensed Nigerian doctors, and receive verifiable consultation summaries securely.",
    challenge:
      "Creating immediate trust, clarity, and safety within a conversational interface and supporting web touchpoints. Patients in distress require clear triage without clinical jargon, while doctors need structured symptom summaries before commencing care.",
    solution:
      "Engineered an intuitive 3-step triage pathway: instant chat engagement without forced accounts, smart symptom guidance to the appropriate specialist, and seamless handoff for consultation and partner pharmacy directions. All public presentations maintain strict confidentiality regarding proprietary clinical tooling.",
    discoveryInsights: [
      {
        title: "High Cognitive Distress Lowers Form Tolerance",
        description:
          "Observation: Patients experiencing fever, pain, or pediatric distress abandon long registration forms. WhatsApp is already installed on over 90% of target mobile devices, eliminating download barriers.",
        type: "observation",
      },
      {
        title: "Bandwidth & Device Disparity",
        description:
          "Constraint: Variable 2G/3G connectivity in suburban corridors makes heavy native mobile apps slow or impossible to download during acute medical moments.",
        type: "constraint",
      },
      {
        title: "Standardized Intake Protects Doctor Time",
        description:
          "Insight: Physicians require structured, standardized symptom summaries before starting consultations to avoid spending the initial 10 minutes extracting basic triage history.",
        type: "insight",
      },
    ],
    designDecisions: [
      {
        title: "WhatsApp-First Gateway vs Forced Native App",
        rationale:
          "Meeting patients in their existing daily messaging platform eliminated app store friction, enabling immediate consultation initiation within 60 seconds.",
        tradeOff:
          "Constrained interaction design to WhatsApp's UI primitives (quick replies, interactive list pickers) rather than custom bespoke canvas elements.",
      },
      {
        title: "Structured Decision Chips vs Free-Form Text",
        rationale:
          "Guided interactive chips eliminate clinical terminology confusion and ensure patient symptoms match standardized medical triage categories.",
        tradeOff:
          "Slightly less open-ended storytelling upfront, though patients can add free-text personal notes once basic triage categories are selected.",
      },
      {
        title: "30-Second Physician Pre-Consultation Summary Card",
        rationale:
          "Formatted triage output into a standardized clinician card displaying primary complaint, duration, and pain severity so doctors can review the context instantly.",
        tradeOff:
          "Required strict validation rules during conversational intake to prevent incomplete patient summaries.",
      },
    ],
    coreWorkflows: [
      {
        title: "Patient Symptom Triage",
        steps: [
          "Patient initiates WhatsApp conversation via web QR or direct link without forced app download.",
          "Selects primary symptom category (e.g., General Medicine, Pediatrics, Dental) via guided quick-reply chips.",
          "Specifies onset duration and severity level through standardized time brackets.",
        ],
        outcome: "Structured intake generated in under 90 seconds without clinical jargon.",
      },
      {
        title: "Licensed Physician Matching & Hand-Off",
        steps: [
          "Triage engine matches patient summary with an available verified physician.",
          "Doctor receives structured 30-second intake summary card before accepting.",
          "Consultation commences via secure encrypted messaging or phone consultation.",
        ],
        outcome: "Physician begins care fully briefed on patient complaints.",
      },
      {
        title: "Care Summary & Pharmacy Fulfillment",
        steps: [
          "Physician issues verified clinical guidance and prescription summary.",
          "Patient receives structured digital prescription receipt with partner pharmacy QR codes.",
        ],
        outcome: "Patient obtains clear medication guidance and verified pickup locations.",
      },
    ],
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
    validation: {
      methodology:
        "Clinical workflow simulations conducted with practicing general practitioners and usability reviews across 10 common episodic triage scenarios.",
      feedbackSummary:
        "Early conversational drafts felt overly robotic, and physicians noted patients frequently misestimated symptom onset when asked for exact dates.",
      iterationsMade: [
        "Replaced exact date inputs with relative duration chips ('Started today', '2–3 days ago', 'Over a week ago').",
        "Softened conversational bot voice to convey empathy and reassurance.",
        "Introduced emergency red-flag disclaimers routing severe trauma or chest pain cases directly to emergency physical facilities.",
      ],
      limitationsAcknowledged:
        "WhatsApp channel constraints prevent direct in-chat video streaming, requiring hand-off to phone or specialized secure video links for visual physical examinations.",
    },
    outcomes: {
      deliverablesSummary:
        "End-to-end WhatsApp conversational triage state machine, responsive web gateway UI, clinical summary card component library, and design tokens in Figma.",
      keyLearnings: [
        "In healthcare product design, accessibility and empathy matter far more than visual novelty. Meeting patients where they already spend their day removes friction that no native app could match.",
        "Constrained platforms (like WhatsApp Business API) force designers to focus ruthlessly on information hierarchy and conversational clarity.",
      ],
      futureImprovements: [
        "Exploring local-language voice note transcription for patients with limited text literacy.",
      ],
    },
    specifications: [
      { label: "Platform", value: "WhatsApp Conversational UI & Responsive Web" },
      { label: "Target Region", value: "Nigeria / Urban & Suburban Centers" },
      { label: "Design System", value: "Figma Tokens, WhatsApp Business API Architecture" },
      { label: "Role Scope", value: "Conversational UX, Web Gateway, Clinical Card Architecture" },
    ],
    prototypeUrl:
      "https://www.figma.com/design/Vl1qsoE22hQjt8oEXZubja/Medesy-2?m=auto&t=jglC0OFhMaDeX2tP-6",
    wireframeSummary:
      "Three-pane conversational intake flow, verified web service hero, and standardized doctor referral cards.",
  },

  {
    slug: "9jatrip",
    title: "9jaTrip",
    client: "9jaTrip Mobility",
    type: "Client / Freelance",
    category: "Intercity Mobility & Transit",
    year: "2024",
    role: "Product Designer",
    timeline: "Freelance Engagement",
    storytellingFormat: "in-depth-case-study",
    badgeLabel: "Client Project · Shipped Mobile Product",
    deliverables: [
      "Terminal-to-Terminal Route Discovery System",
      "Interactive Bus Coach Seat Selection Map",
      "Digital QR Boarding Pass & Ride Receipts",
      "Charter Vehicle Reservation Engine",
    ],
    headline: "Intercity Transit Booking and Terminal Hub Logistics for Regional Commuters",
    summary:
      "An intercity transit booking application for travelers moving between regional transport hubs and bus terminals across Nigeria, offering seat selection and digital QR boarding passes.",
    accentColor: "#A9DDF0",
    featured: true,
    featuredOrder: 2,
    tags: ["Mobility", "Transit", "Mobile UI", "Ticketing"],
    heroImage: "/images/projects/9jatrip/booking-screen.png",
    gallery: [
      {
        src: "/images/projects/9jatrip/booking-screen.png",
        caption: "9jaTrip journey booking and payment gateway: verified terminal itinerary, departure schedules, seat selector, and Moniepoint payment integration.",
        alt: "9jaTrip Journey Booking Screen",
      },
      {
        src: "/images/projects/9jatrip/ride-receipt.png",
        caption: "Digital boarding pass and departure confirmation: seat assignment, luggage tag verification, terminal check-in QR code, and driver details.",
        alt: "9jaTrip Digital Boarding Pass",
      },
      {
        src: "/images/projects/9jatrip/chatter-receipt.png",
        caption: "Charter reservation receipt: flat-rate private vehicle booking with transparent payment breakdowns and cash-on-arrival flexibility.",
        alt: "9jaTrip Charter Booking Receipt",
      },
    ],
    problemStatement: {
      context:
        "Intercity bus transit across Nigeria moves millions of commuters daily between commercial capitals like Lagos, Ibadan, Benin, Abuja, and Port Harcourt.",
      friction:
        "Booking intercity travel historically required physical early-morning visits to chaotic motor parks with opaque pricing, no advance seat reservations, and zero departure time guarantees.",
      impact:
        "High travel anxiety, cash theft risks at parks, luggage extortion by informal loaders, and wasted hours waiting for buses to fill up.",
    },
    overview:
      "9jaTrip solves the uncertainty of Nigerian interstate road travel by providing a modern mobile booking system organized around verified transit hubs and terminals. Commuters can select departure terminals, choose specific seats on interactive coach diagrams, and receive digital QR boarding passes that guarantee their departure slot without motor-park chaos.",
    challenge:
      "Accommodating varied fleet vehicle configurations (14-seater commuter vans, 18-seater shuttles, 45-seater luxury coaches) while maintaining an effortless booking flow operable under low network bandwidth and high outdoor sunlight glare.",
    solution:
      "Designed a hub-based terminal selector, dynamic vehicle seat layouts with clear luggage allowance badges, transparent itemized pricing including terminal levies, and offline-accessible digital boarding passes with high-contrast QR codes for rapid terminal scanning.",
    discoveryInsights: [
      {
        title: "Terminal Name Trumps Street Address",
        description:
          "Observation: Commuters navigate by motor-park terminal brand (e.g. Jibowu, Maza-Maza, Ojota) rather than GPS street coordinates. Routing must be anchored to recognized park hubs.",
        type: "observation",
      },
      {
        title: "Low Bandwidth & Terminal Dead Zones",
        description:
          "Constraint: Motor parks are notorious for cellular congestion and dead zones. Boarding passes must be fully accessible and scannable offline.",
        type: "constraint",
      },
      {
        title: "Upfront Luggage Transparency Eliminates Harassment",
        description:
          "Insight: Surprise luggage fees at the park gate create severe friction. Allowing travelers to declare and pay for bags upfront protects them from loader extortion.",
        type: "insight",
      },
    ],
    designDecisions: [
      {
        title: "Terminal-Hub Search Architecture",
        rationale:
          "Replaced generic open-map pins with curated terminal-to-terminal selectors, guaranteeing commuters arrive at the exact designated boarding park.",
        tradeOff:
          "Requires ongoing maintenance of terminal database entries rather than relying on automated Google Places APIs.",
      },
      {
        title: "Modular Dynamic Coach Seat Maps",
        rationale:
          "Created flexible responsive seat grid components that adapt automatically between 14-seater commuter HiAce vans and 45-passenger luxury coaches.",
        tradeOff:
          "Higher initial design system complexity to handle varying vehicle seat aisles and emergency exit positions.",
      },
      {
        title: "High-Contrast Offline Digital QR Pass",
        rationale:
          "Built boarding passes with local caching and deep black-on-white contrast to ensure rapid gate scanning even under intense outdoor midday sun.",
        tradeOff:
          "Sacrificed decorative pastel gradients in the boarding ticket view for utilitarian readability.",
      },
    ],
    coreWorkflows: [
      {
        title: "Terminal Discovery & Departure Comparison",
        steps: [
          "User selects origin terminal (e.g., Jibowu Central) and destination hub (e.g., Ring Road, Benin).",
          "Compares scheduled departures, vehicle types (AC Coach vs Standard), and transparent fares.",
        ],
        outcome: "Commuter selects preferred departure time with verified pricing.",
      },
      {
        title: "Interactive Seat & Luggage Customization",
        steps: [
          "Views interactive coach layout showing available, reserved, and window seats.",
          "Selects exact seat number and declares standard luggage or excess baggage allowance.",
        ],
        outcome: "Transparent itemized price computed with zero surprise park fees.",
      },
      {
        title: "Digital Check-In & Boarding Gate Verification",
        steps: [
          "Completes secure checkout via Moniepoint, bank transfer, or debit card.",
          "Receives high-contrast QR pass saved directly to mobile device gallery and app cache.",
          "Terminal loader scans QR pass offline at vehicle gate for instant entry.",
        ],
        outcome: "Frictionless boarding without physical ticket counter queues.",
      },
    ],
    systemHighlights: [
      {
        title: "Verified Terminal Hub Selector",
        description:
          "Clear categorization by recognized commercial transit parks across major interstate routes.",
      },
      {
        title: "Interactive Coach Seat Layout",
        description:
          "Dynamic visual diagrams supporting 14-seater, 18-seater, and luxury coach seating configurations.",
      },
      {
        title: "High-Contrast Offline Boarding Pass",
        description:
          "Monochrome-optimized QR passes designed for rapid scanning under bright sunlight and dead zones.",
      },
    ],
    validation: {
      methodology:
        "User journey walkthroughs with frequent regional commuters and prototype usability evaluations across mobile screen sizes.",
      feedbackSummary:
        "Early testers expressed anxiety about what would happen if terminal agents claimed not to have record of their digital booking.",
      iterationsMade: [
        "Added explicit carrier confirmation codes and offline carrier phone contact pills directly on the ticket pass.",
        "Included detailed terminal landmark directions on the booking confirmation screen.",
        "Introduced flat-rate private charter booking receipts for families and corporate groups.",
      ],
      limitationsAcknowledged:
        "Real-time GPS vehicle tracking during transit was omitted from v1 due to telematics hardware inconsistencies across independent fleet operators.",
    },
    outcomes: {
      deliverablesSummary:
        "Production-ready mobile UI screens in Figma, interactive prototype, comprehensive design token hierarchy, and developer handoff documentation.",
      keyLearnings: [
        "Designing for regional mobility requires designing for worst-case environments: failing batteries, noisy terminals, and outdoor glare.",
        "Upfront price transparency builds immense user loyalty in markets characterized by informal pricing volatility.",
      ],
      futureImprovements: [
        "Automated SMS fallback passes dispatched for commuters whose phone battery dies before terminal boarding.",
      ],
    },
    specifications: [
      { label: "Platform", value: "Mobile Application (iOS & Android Specs)" },
      { label: "Market", value: "Nigerian Regional Transit & Commuter Logistics" },
      { label: "Key Integrations", value: "Moniepoint Payment Gateway, QR Verification" },
      { label: "Design Tools", value: "Figma, Figjam, Mobile Prototyping" },
    ],
    prototypeUrl:
      "https://www.figma.com/design/QPyY4HiyEc40yQk5609OMG/9jaTrip?node-id=0-1&p=f&t=Mm09Z82YdZ3Is25i-0",
    wireframeSummary:
      "Route discovery filters, dynamic seat selector canvas, payment gateway, and high-contrast digital boarding passes.",
  },

  {
    slug: "somewhere-hotel",
    title: "Somewhere Hotel",
    client: "Somewhere Hospitality Group",
    type: "Concept / Lab Exploration",
    category: "Hospitality & Spatial Web",
    year: "2024",
    role: "Digital Experience & Visual Designer",
    timeline: "Concept / Lab Exploration",
    storytellingFormat: "spatial-showcase",
    badgeLabel: "Lab Showcase · Spatial Web Architecture",
    deliverables: [
      "Dynamic Temporal Daylight Shift Engine (Dawn, Midday, Twilight, Night)",
      "Architectural Spatial Suite Floor Plans & Sun Trajectory Maps",
      "Tranquil Editorial Room Lookbook & Curated Reservation Flow",
      "Atmospheric Design System with Neo-Grotesque Typography",
    ],
    headline: "Atmospheric Spatial Reservation Interface Translating Architectural Daylight and Calm",
    summary:
      "An editorial reservation concept translating architectural daylight transitions, suite spatial layouts, and calm curation into digital hospitality.",
    accentColor: "#A9DDF0",
    featured: true,
    featuredOrder: 3,
    tags: ["Spatial Web", "Hospitality", "Editorial Design", "Atmosphere"],
    heroImage: "/images/projects/somewhere/suite-balcony-sunset-opt.webp",
    gallery: [
      {
        src: "/images/projects/somewhere/suite-balcony-sunset-opt.webp",
        caption: "Horizon Suite ocean terrace during golden-hour sunset: warm ambient natural lighting, tactile teak furniture, and uninterrupted horizon vistas.",
        alt: "Somewhere Hotel Horizon Suite Balcony Sunset",
      },
      {
        src: "/images/projects/somewhere/suite-balcony-day-opt.webp",
        caption: "Horizon Suite terrace under midday daylight conditions: high-contrast sunlight angles, coastal shadows, and spatial architectural textures.",
        alt: "Somewhere Hotel Horizon Suite Balcony Midday",
      },
      {
        src: "/images/projects/somewhere/suite-balcony-night-opt.webp",
        caption: "Horizon Suite terrace under architectural night illumination: low-lux sconce lighting, starlit ocean horizon, and tranquil evening atmosphere.",
        alt: "Somewhere Hotel Horizon Suite Balcony Night",
      },
      {
        src: "/images/projects/somewhere/hotel-exterior-sunset-opt.webp",
        caption: "Minimalist concrete entrance facade: twilight landscape illumination, reflecting pool reflections, and serene arrival choreography.",
        alt: "Somewhere Hotel Exterior Entrance Sunset",
      },
    ],
    problemStatement: {
      context:
        "High-end boutique hotels are physical sanctuaries conceived around architectural harmony, sensory stillness, natural light, and tranquil landscape views.",
      friction:
        "Conventional hospitality booking engines treat luxury suites like flight commodities—bombarding guests with red countdown timers, flashing urgency pop-ups ('Only 1 room left!'), and aggressive upsells that dismantle calm before the trip even begins.",
      impact:
        "Brand commoditization, visual dissonance between the physical property and its web presence, and guest decision stress during reservation.",
    },
    overview:
      "Somewhere Hotel explores how digital hospitality interfaces can communicate the actual sensory experience of living in an architecturally designed sanctuary. By incorporating an interactive daylight shift engine and spatial floor plan perspectives, the interface allows prospective guests to experience how daylight enters the suites from dawn to twilight, cultivating unhurried decision-making.",
    challenge:
      "Translating the three-dimensional serenity and ambient lighting of architectural spaces onto flat digital viewports without causing heavy asset bloat or sluggish interaction response.",
    solution:
      "Created a tranquil editorial layout featuring an interactive ambient lighting controller, tactile room lookbook cards, architectural sun exposure maps, and an unhurried, transparent reservation curation flow.",
    discoveryInsights: [
      {
        title: "Sensory Quality Drives Luxury Decision-Making",
        description:
          "Observation: Luxury boutique travelers select suites based on terrace orientation, natural light quality, and privacy rather than raw square footage or generic amenity checklists.",
        type: "observation",
      },
      {
        title: "Performance & Cinematic Fidelity Balance",
        description:
          "Constraint: Rendering multiple temporal lighting states must remain lightweight and responsive without multi-second asset download delays.",
        type: "constraint",
      },
      {
        title: "Silence as a Design Element",
        description:
          "Insight: Eliminating aggressive scarcity triggers and banner noise creates an immediate sense of luxury. Pacing and generous whitespace are emotional features.",
        type: "insight",
      },
    ],
    designDecisions: [
      {
        title: "Dynamic Temporal Daylight Controller",
        rationale:
          "Enabled guests to toggle between Golden Sunset, Midday, and Twilight lighting states to visualize living in the suite across different times of day.",
        tradeOff:
          "Required curating and optimizing synchronized photographic specimens across matching spatial camera angles.",
      },
      {
        title: "Architectural Sun Trajectory & Elevation Maps",
        rationale:
          "Provided clear visual schematics showing sun exposure and plunge pool privacy rather than dry technical floor plans.",
        tradeOff:
          "Simplified schematic details to keep mobile interaction clean and legible.",
      },
      {
        title: "Unhurried Editorial Reservation Pacing",
        rationale:
          "Replaced aggressive checkout funnels with a serene, transparent reservation drawer that preserves the architectural imagery in full view.",
        tradeOff:
          "Omitted aggressive upselling widgets in favor of subtle, curated dining and wellness additions.",
      },
    ],
    coreWorkflows: [
      {
        title: "Temporal Atmosphere Exploration",
        steps: [
          "Guest browses the Horizon Suite and toggles the persistent daylight controller.",
          "Interface lighting, typography contrast, and terrace photography smoothly transition between Midday, Golden Sunset, and Night.",
        ],
        outcome: "Guest experiences the suite's ambient mood across the full diurnal cycle.",
      },
      {
        title: "Spatial Suite & Amenity Inspection",
        steps: [
          "Guest inspects floor plan schematics, balcony orientation, and architectural material details.",
          "Reviews curated amenities (outdoor rain shower, plunge pool, bespoke linen specifications).",
        ],
        outcome: "Clear understanding of the physical spatial layout and privacy parameters.",
      },
      {
        title: "Tranquil Reservation Curation",
        steps: [
          "Selects arrival dates on an uncluttered visual calendar.",
          "Optionally includes curated experiential rituals (private terrace dining, sunrise yoga).",
          "Submits seamless reservation request with clear, upfront pricing.",
        ],
        outcome: "Reservation completed with peaceful anticipation rather than transactional fatigue.",
      },
    ],
    systemHighlights: [
      {
        title: "Atmospheric Daylight Shift",
        description:
          "Interactive ambient lighting transitions showing suite views under sunset, midday, and twilight conditions.",
      },
      {
        title: "Architectural Spatial Lookbook",
        description:
          "Curated photography highlighting tactile materials, terrace vistas, and interior daylight angles.",
      },
      {
        title: "Calm Editorial Reservation Engine",
        description:
          "Unhurried date selection and experiential amenity curation without commercial urgency tactics.",
      },
    ],
    validation: {
      methodology:
        "Creative direction critique, responsive layout benchmarking across mobile and desktop viewports, and image compression optimization for 60fps interaction.",
      feedbackSummary:
        "Initial prototypes placed the daylight toggle in a secondary navigation menu, leading visitors to overlook the temporal simulation entirely.",
      iterationsMade: [
        "Elevated daylight state controls to a floating tactile pill anchored at the bottom edge.",
        "Refined typographic hierarchy to maintain AA contrast ratios against both deep twilight and bright midday backdrops.",
        "Introduced exterior facade architectural specimens to establish the arrival sequence.",
      ],
      limitationsAcknowledged:
        "Conceived as an editorial spatial web showcase to establish a benchmark for digital luxury hospitality, rather than a live multi-property legacy PMS integration.",
    },
    outcomes: {
      deliverablesSummary:
        "Interactive daylight shift web prototype, responsive editorial design specs, architectural photographic curation, and showcase artifact in Cold Designer portfolio.",
      keyLearnings: [
        "Digital interfaces can evoke genuine emotional calm when typography, color temperature, and pacing work in harmony.",
        "True luxury online is the deliberate subtraction of noise, pop-ups, and artificial urgency.",
      ],
      futureImprovements: [
        "Adding subtle ambient spatial soundscapes (ocean breeze, acoustic dusk) harmonized with daylight state switches.",
      ],
    },
    specifications: [
      { label: "Platform", value: "Responsive Web / Spatial Showcase" },
      { label: "Interaction Model", value: "Dynamic Temporal Lighting Shift Engine" },
      { label: "Aesthetic", value: "Warm Architectural Editorial & Calm Minimal" },
      { label: "Design Tools", value: "Figma, Next.js, Tailwind CSS, Motion" },
    ],
    prototypeUrl: "https://somewhere-hotel.vercel.app",
    wireframeSummary:
      "Hero room lookbook with dynamic daylight shift, interactive suite elevation specs, and seamless reservation drawer.",
  },

  {
    slug: "buybuddy",
    title: "BuyBuddy",
    client: "BuyBuddy Commerce",
    type: "Concept / Lab Exploration",
    category: "Commerce & Marketplace",
    year: "2024",
    role: "Product Designer",
    timeline: "Concept / Lab Exploration",
    storytellingFormat: "spatial-showcase",
    badgeLabel: "Lab Showcase · Social Commerce Systems",
    deliverables: [
      "Vendor Mobile Product & Inventory Management Studio",
      "Live Merchant Order Fulfillment Ledger",
      "Integrated Vendor Revenue & Payout Wallet",
      "Shopper-Facing Instant Mobile Storefront & Guest Checkout",
    ],
    headline: "Social Micro-Commerce and Instant Digital Storefronts for Community Merchants",
    summary:
      "A lightweight mobile commerce platform empowering informal social sellers to turn WhatsApp and Instagram catalogs into instant, checkout-ready storefronts.",
    accentColor: "#A9DDF0",
    featured: true,
    featuredOrder: 4,
    tags: ["Commerce", "Marketplace", "Mobile Web", "Fintech"],
    heroImage: "/images/projects/buybuddy/vendor-products.png",
    gallery: [
      {
        src: "/images/projects/buybuddy/vendor-products.png",
        caption: "Vendor inventory studio: mobile product cataloging, category tags, stock quantity indicators, and instant pricing adjustment.",
        alt: "BuyBuddy Vendor Inventory Studio",
      },
      {
        src: "/images/projects/buybuddy/vendor-orders.png",
        caption: "Merchant orders ledger: real-time fulfillment tracking, payment status badges, customer delivery addresses, and dispatch rider actions.",
        alt: "BuyBuddy Merchant Orders Ledger",
      },
      {
        src: "/images/projects/buybuddy/vendor-wallet.png",
        caption: "Vendor financial wallet: daily gross sales, pending escrow settlements, withdrawal history, and instant bank payout controls.",
        alt: "BuyBuddy Vendor Financial Wallet",
      },
      {
        src: "/images/projects/buybuddy/store-landing-opt.webp",
        caption: "Shopper-facing storefront view: clean category pill navigation, high-contrast product cards, and one-tap guest checkout.",
        alt: "BuyBuddy Shopper Storefront Landing",
      },
    ],
    problemStatement: {
      context:
        "In burgeoning emerging markets, informal social sellers generate billions of dollars annually selling apparel, beauty products, electronics, and food directly over Instagram DMs and WhatsApp chat threads.",
      friction:
        "Managing commerce inside chat histories is chaotic—merchants lose track of orders, manually verify payment transfer screenshots, calculate totals with calculators, and constantly answer 'How much is this?' and 'Is it available?'.",
      impact:
        "Lost sales, payment fraud from fake bank alert screenshots, inventory overselling, and merchant operational burnout.",
    },
    overview:
      "BuyBuddy bridges the gap between informal social selling and full-scale e-commerce. It allows independent merchants to build an instant, mobile-friendly storefront in under 60 seconds directly from their smartphones. Shoppers browse clear catalogs and pay seamlessly without creating accounts, while merchants manage inventory, track orders, and withdraw revenue from a unified mobile ledger.",
    challenge:
      "Designing an e-commerce suite simple enough to be managed entirely from an entry-level smartphone without requiring desktop computers or technical e-commerce training.",
    solution:
      "Created a streamlined mobile suite comprising a 60-second product catalog builder, automated WhatsApp order dispatch, a real-time order ledger, and a secure vendor payout wallet.",
    discoveryInsights: [
      {
        title: "Social Merchants Run on Mobile Only",
        description:
          "Observation: Micro-merchants do not own laptops or use complex admin panels like Shopify. Every merchant action—from adding a product to withdrawing cash—must be executable in under 3 taps on mobile.",
        type: "observation",
      },
      {
        title: "Shoppers Abandon Forced Sign-Ups",
        description:
          "Constraint: Mobile shoppers discovering a store via an Instagram bio link will instantly bounce if forced to create a password or verify email before buying.",
        type: "constraint",
      },
      {
        title: "Fake Bank Alerts Plague Informal Sellers",
        description:
          "Insight: Merchants lose significant inventory to fraudulent bank transfer screenshots sent in chat threads. Automated verified payment confirmation protects merchant livelihood.",
        type: "insight",
      },
    ],
    designDecisions: [
      {
        title: "60-Second Camera-Roll Product Upload",
        rationale:
          "Merchants select photos directly from their phone gallery, add title and price, and instantly receive a shareable link for their social bio.",
        tradeOff:
          "Omitted complex multi-variant SKU matrices in favor of fast, simple size/color tags.",
      },
      {
        title: "Passwordless Guest Checkout with WhatsApp Order Handoff",
        rationale:
          "Buyers checkout in 2 steps; order receipts are automatically formatted into a structured WhatsApp message sent to both buyer and seller.",
        tradeOff:
          "Relies on phone numbers and WhatsApp identities rather than centralized customer account profiles.",
      },
      {
        title: "Unified Vendor Wallet & Settlement Ledger",
        rationale:
          "Replaced complex accounting ledgers with a clean visual wallet displaying total revenue, money available for withdrawal, and pending escrow.",
        tradeOff:
          "Focused on daily merchant cashflow rather than complex double-entry enterprise accounting.",
      },
    ],
    coreWorkflows: [
      {
        title: "Merchant Store Setup & Product Listing",
        steps: [
          "Merchant names store and uploads product photos from camera roll.",
          "Enters price and inventory quantity; generates unique bio store link.",
        ],
        outcome: "Storefront live and ready to receive customer orders in under a minute.",
      },
      {
        title: "Shopper Discovery & Instant Checkout",
        steps: [
          "Shopper taps bio link from Instagram or TikTok.",
          "Browses category tabs, adds items to bag, enters delivery address, and completes payment without password creation.",
        ],
        outcome: "Order completed in under 45 seconds with zero account registration friction.",
      },
      {
        title: "Merchant Order Fulfillment & Cash Settlement",
        steps: [
          "Merchant receives push notification and WhatsApp summary with delivery details.",
          "Marks order as Dispatched; funds automatically settle to vendor wallet for instant bank transfer.",
        ],
        outcome: "Guaranteed verified payment with no risk of fake payment screenshots.",
      },
    ],
    systemHighlights: [
      {
        title: "Mobile Vendor Inventory Studio",
        description:
          "Frictionless product publishing with quick price editing and inventory tracking from any smartphone.",
      },
      {
        title: "Fulfillment & Orders Ledger",
        description:
          "Real-time order statuses, dispatch assignment, and structured customer contact cards.",
      },
      {
        title: "Shopper Guest Checkout",
        description:
          "Friction-free purchasing without passwords, accompanied by automated WhatsApp order confirmations.",
      },
    ],
    validation: {
      methodology:
        "Guerrilla usability tests with independent fashion and electronics sellers in Lagos, benchmarking time-to-first-product-upload on mobile prototypes.",
      feedbackSummary:
        "Early iterations had complex multi-tier shipping zone calculators that confused merchants who typically use flat-rate dispatch bike riders.",
      iterationsMade: [
        "Replaced postal code shipping tables with simple flat-rate city delivery options.",
        "Added one-tap 'Share Store to WhatsApp Status' button on the merchant dashboard.",
        "Prominently displayed verified escrow payment badges to build buyer trust on new seller storefronts.",
      ],
      limitationsAcknowledged:
        "Designed specifically for micro and social sellers; enterprise multi-warehouse inventory synchronization was deliberately kept out of scope.",
    },
    outcomes: {
      deliverablesSummary:
        "Complete 4-screen high-fidelity mobile prototype in Figma (Inventory Studio, Orders Ledger, Wallet, Shopper Storefront), design tokens, and user flow documentation.",
      keyLearnings: [
        "In emerging markets, the best fintech and commerce tools augment existing human behaviors (like selling on WhatsApp) rather than trying to force Silicon Valley conventions.",
        "Speed of store creation is the single greatest predictor of whether a small merchant will adopt a digital tool.",
      ],
      futureImprovements: [
        "Integrated dispatch rider API connection allowing merchants to summon a local delivery courier with one tap.",
      ],
    },
    specifications: [
      { label: "Platform", value: "Mobile Web & PWA Architecture" },
      { label: "Target Segment", value: "Social Micro-Merchants & Independent Sellers" },
      { label: "Focus", value: "Storefront Speed, Inventory Ledger, Payout Wallet" },
      { label: "Design System", value: "Figma Tokens, Mobile Commerce Components" },
    ],
    prototypeUrl: "https://buybuddy-store.vercel.app",
    wireframeSummary:
      "Mobile vendor inventory studio, live orders fulfillment ledger, vendor revenue wallet, and mobile shopper storefront.",
  },

  {
    slug: "stillwater",
    title: "Stillwater Hall",
    client: "Stillwater Cultural Foundation",
    type: "Concept / Lab Exploration",
    category: "Cinematic Web & Performing Arts",
    year: "2024",
    role: "Visual & Interaction Designer",
    timeline: "Editorial Web Exploration",
    storytellingFormat: "spatial-showcase",
    badgeLabel: "Lab Showcase · Cinematic Web & Motion",
    deliverables: [
      "Cinematic 5-Stage Scrollytelling Arrival Sequence",
      "Interactive Acoustic Section Views & Tier Sightline Schematics",
      "Acoustic Auditorium Stage Walkthrough Video Specimen",
      "Editorial Performance Calendar & Seat Reservation Flow",
    ],
    headline: "Cinematic Digital Experience for an Architectural Concert Hall",
    summary:
      "An architectural web experience choreographing the arrival sequence, acoustic properties, and performance calendar of a modern cultural venue.",
    accentColor: "#A9DDF0",
    featured: true,
    featuredOrder: 5,
    tags: ["Cinematic Web", "Motion", "Spatial Design", "Cultural Arts"],
    heroImage: "/images/projects/stillwater/01_Exterior-opt.webp",
    videoSrc: "/videos/stillwater/Stillwater_01.mp4",
    gallery: [
      {
        src: "/images/projects/stillwater/01_Exterior-opt.webp",
        caption: "Stage 01: Evening exterior approach — twilight architectural illumination, cast concrete volumes, and reflecting pool reflecting the evening sky.",
        alt: "Stillwater Hall Exterior Approach at Dusk",
      },
      {
        src: "/images/projects/stillwater/03_Lobby-opt.webp",
        caption: "Stage 02: Grand foyer & promenade transition through double-height glass thresholds, warm oak wall paneling, and acoustic buffer zones.",
        alt: "Stillwater Hall Grand Foyer and Promenade",
      },
      {
        src: "/images/projects/stillwater/05_Full_Stage-opt.webp",
        caption: "Stage 03: Acoustic auditorium stage perspective — curved sound reflector clouds, choir loft seating, and focused concertmaster illumination.",
        alt: "Stillwater Hall Full Acoustic Auditorium Stage",
      },
      {
        src: "/images/projects/stillwater/06_Front_Seating-opt.webp",
        caption: "Stage 04: Turn toward orchestra stall seating — interactive tier elevation details, direct acoustic sightlines, and plush mohair upholstery.",
        alt: "Stillwater Hall Front Orchestra Seating",
      },
      {
        src: "/images/projects/stillwater/08_Rear_Seating-opt.webp",
        caption: "Stage 05: Rear auditorium seating and balcony tier elevation vantage point — showing acoustic envelope and sound reflection geometries.",
        alt: "Stillwater Hall Rear Balcony Seating Vantage Point",
      },
    ],
    problemStatement: {
      context:
        "World-class concert halls and cultural performing arts centers are monumental physical masterworks of cast-concrete architecture, acoustic engineering, and arrival ritual.",
      friction:
        "Cultural venue websites almost universally flatten these magnificent physical spaces into dry ticketing grids, corporate spreadsheets, and generic seat-selection charts.",
      impact:
        "The web experience fails to communicate the sensory grandeur and acoustic intimacy of attending a live orchestral performance.",
    },
    overview:
      "Stillwater Hall is an architectural web exploration that choreographs the physical arrival sequence of visiting a monumental concert hall. Visitors experience the venue as a chronological journey: approaching the monolithic concrete structure at dusk, traversing the double-height grand foyer, entering the acoustic envelope of the auditorium, and previewing sound sightlines from different seating tiers.",
    challenge:
      "Orchestrating high-resolution video walkthroughs, spatial architectural photography, and typography without triggering scroll jank, layout reflows, or heavy asset download penalties.",
    solution:
      "Implemented a 5-stage chronological scrollytelling narrative powered by smooth scroll choreography, paired with interactive acoustic tier section previews and an unhurried, editorial ticketing interface.",
    discoveryInsights: [
      {
        title: "Arrival Is a Choreographed Ritual",
        description:
          "Observation: Attending an architectural concert hall is a continuous physical ritual: the dusk approach, crossing the foyer threshold, entering the quiet acoustic envelope, taking one's seat. Digital presentation must honor this sequence.",
        type: "observation",
      },
      {
        title: "Motion Must Feel Architectural, Not Gimmicky",
        description:
          "Constraint: Animations must feel monumental and steady, matching the weight of poured concrete and oak rather than bouncy consumer app micro-interactions.",
        type: "constraint",
      },
      {
        title: "Acoustic Silence Operates Like Whitespace",
        description:
          "Insight: In digital editorial design, generous dark whitespace acts exactly like silence before an orchestra begins—it amplifies the impact of the visual moments that follow.",
        type: "insight",
      },
    ],
    designDecisions: [
      {
        title: "5-Stage Chronological Arrival Scrollytelling",
        rationale:
          "Structured the narrative to mirror physical visitor arrival: Exterior Approach → Grand Foyer → Full Stage → Front Seating → Balcony Elevation.",
        tradeOff:
          "Requires visitors to engage with the spatial sequence before diving straight into calendar dates.",
      },
      {
        title: "Interactive Acoustic Tier Sightlines",
        rationale:
          "Allowed patrons to preview sound resonance and visual angles to the conductor from specific seating tiers before reserving.",
        tradeOff:
          "Demanded detailed acoustic schematic illustrations aligned with each seating zone.",
      },
      {
        title: "Monochrome Brutalist Typography & Deep Slate Palette",
        rationale:
          "Echoed Tadao Ando-inspired concrete surfaces, allowing warm stage illumination and architectural photography to take center stage.",
        tradeOff:
          "Deliberately avoided bright commercial accent colors in favor of subdued slate and warm amber cues.",
      },
    ],
    coreWorkflows: [
      {
        title: "Choreographed Spatial Hall Exploration",
        steps: [
          "Visitor enters the site and scrolls through the 5-stage architectural arrival sequence.",
          "Smooth scroll triggers subtle camera zooms and spatial typography disclosures.",
        ],
        outcome: "Visitor develops visceral appreciation for the hall's physical scale.",
      },
      {
        title: "Acoustic Tier & Sightline Preview",
        steps: [
          "Patron toggles between Orchestra Stalls, Loge, and Balcony tiers.",
          "Inspects acoustic reflection paths and sightline angles to the concertmaster.",
        ],
        outcome: "Informed, confident seating selection based on acoustic preference.",
      },
      {
        title: "Philharmonic Residency Ticket Reservation",
        steps: [
          "Browses curated residency programs with detailed composer program notes.",
          "Selects seating tier and completes calm, uncluttered ticket reservation.",
        ],
        outcome: "Reservation concluded with a feeling of cultural prestige.",
      },
    ],
    systemHighlights: [
      {
        title: "Cinematic Video Specimen",
        description:
          "Full-fidelity video walkthrough capturing the spatial resonance and architectural illumination of the hall.",
      },
      {
        title: "5-Stage Arrival Scrollytelling",
        description:
          "Chronological exploration moving from dusk approach through the acoustic auditorium tiers.",
      },
      {
        title: "Acoustic Sightline Schematics",
        description:
          "Interactive section views illustrating sound travel paths and vantage points for concertgoers.",
      },
    ],
    validation: {
      methodology:
        "Frame-rate profiling with Chrome DevTools, motion timing refinement in GSAP ScrollTrigger, and user testing across multiple laptop and mobile screen resolutions.",
      feedbackSummary:
        "Early autoplay video loops caused high CPU usage on low-power mobile devices and caused layout shifts before assets fully loaded.",
      iterationsMade: [
        "Added explicit video poster frames and lazy-loaded high-resolution video streams.",
        "Tied typography reveals to scroll progress rather than time-based auto-advancing carousels.",
        "Enhanced mobile responsive touch-scrolling with Lenis momentum interpolation.",
      ],
      limitationsAcknowledged:
        "Conceived as an architectural digital experience showcasing spatial storytelling and motion choreography, rather than a live global ticketing engine backend.",
    },
    outcomes: {
      deliverablesSummary:
        "Production-quality responsive web build, video walkthrough capture, 5 spatial photography specimens, bespoke Lenis/GSAP scroll choreography, and Cold Designer portfolio showcase.",
      keyLearnings: [
        "Whitespace in digital design operates exactly like acoustic silence in orchestral music: it gives weight and majesty to whatever comes next.",
        "Translating physical architecture to the web requires disciplined pacing—letting elements breathe rather than overcrowding the viewport.",
      ],
      futureImprovements: [
        "Interactive WebGL 3D acoustic frequency simulator allowing patrons to hear sample symphonic audio filtered by seating tier location.",
      ],
    },
    specifications: [
      { label: "Platform", value: "Responsive Web / Cinematic Spatial Architecture" },
      { label: "Motion Engine", value: "GSAP ScrollTrigger, Lenis Smooth Scroll, Motion" },
      { label: "Typography", value: "Monospace Code & Brutalist Display Serifs" },
      { label: "Media Assets", value: "Cinematic Video Specimen & 5 Spatial Stills" },
    ],
    prototypeUrl: "https://stillwater-hall.vercel.app",
    wireframeSummary:
      "Full-bleed cinematic video header, five-stage architectural scrollytelling section, acoustic sightline specs, and ticketing calendar.",
  },

  {
    slug: "greall-website",
    title: "Greall Corporate Rebrand",
    client: "Greall Technologies",
    type: "Employment",
    category: "Corporate Web & Brand Identity",
    year: "2023",
    role: "Product Designer",
    timeline: "Employment Engagement",
    storytellingFormat: "confidential-practice",
    badgeLabel: "Employment Engagement · NDA Compliant",
    confidentialityNote:
      "This case study focuses on the public corporate brand evolution, responsive web architecture, and design token system for Greall Technologies. In accordance with employment non-disclosure agreements, proprietary cross-border treasury routing algorithms, backend FX settlement engines, and institutional client portfolios are confidential and omitted.",
    deliverables: [
      "Corporate Brand Identity & Visual Design System",
      "Responsive Enterprise Web Architecture (Desktop, Tablet, Mobile)",
      "Technical Service Capability Matrix & Product Pillars",
      "Design Tokens & Component Styleguide in Figma",
    ],
    headline: "Brand Evolution and Modern Digital Presence for Greall Technologies",
    summary:
      "A complete brand refresh and responsive corporate web architecture overhaul for Greall Technologies, establishing high-trust credibility for institutional cross-border finance.",
    accentColor: "#A9DDF0",
    featured: false,
    tags: ["Brand Identity", "Corporate Web", "Fintech", "Design System"],
    heroImage: "/images/projects/stillwater/01_Exterior-opt.webp",
    gallery: [],
    problemStatement: {
      context:
        "Greall Technologies operates in the African financial technology sector, providing cross-border liquidity rails, multi-currency corporate accounts, and financial infrastructure for growing enterprises.",
      friction:
        "The company's legacy digital presence was fragmented, dated, and visually misaligned with its sophisticated cross-border financial infrastructure, leading prospective institutional partners to question its enterprise readiness.",
      impact:
        "Commercial sales cycles were prolonged as prospective banking partners and enterprise clients hesitated to trust the platform's technological robustness based on its initial web touchpoints.",
    },
    overview:
      "Greall Technologies required a comprehensive digital transformation to align its public brand with its institutional capabilities. The project encompassed a complete visual identity overhaul, disciplined typographic standards, and a modern responsive web architecture communicating Greall's multi-currency payment rails, FX settlement capabilities, and developer API solutions.",
    challenge:
      "Balancing complex financial and regulatory disclosures with clear, high-trust visual hierarchy that inspires confidence among institutional banking partners without burying key product offerings under dense corporate legalese.",
    solution:
      "Designed an authoritative corporate web architecture centered around three distinct service pillars: Multi-Currency Wallets, Cross-Border Settlement, and Enterprise Financial APIs. Backed by disciplined typography, high-contrast layouts, and clear compliance disclosures.",
    discoveryInsights: [
      {
        title: "Visual Discipline Equates to Technical Security",
        description:
          "Observation: Institutional corporate treasurers and procurement officers make initial vendor assessments in under 10 seconds. In B2B fintech, visual discipline and typography rigor directly signal cybersecurity and compliance stability.",
        type: "observation",
      },
      {
        title: "Confidentiality & Regulatory Boundaries",
        description:
          "Constraint: Strict NDAs prevent the public display of live internal liquidity dashboards, partner bank API keys, or enterprise client volume metrics.",
        type: "constraint",
      },
      {
        title: "Clarity Over Marketing Buzzwords",
        description:
          "Insight: Enterprise decision-makers want to understand transaction settlement times, supported currency corridors, and integration protocols, not vague marketing jargon.",
        type: "insight",
      },
    ],
    designDecisions: [
      {
        title: "Structured Architectural Product Pillars",
        rationale:
          "Organized Greall's capabilities into three concrete technical pillars (Corporate Accounts, Cross-Border Rails, Developer APIs) rather than generic marketing claims.",
        tradeOff:
          "Required technical validation from engineering teams to ensure accurate representation of API infrastructure capabilities.",
      },
      {
        title: "Neo-Grotesque Typographic Discipline",
        rationale:
          "Adopted high-contrast, structured neo-grotesque type scales to convey institutional reliability and banking precision.",
        tradeOff:
          "Deliberately rejected trendy consumer-fintech pastel palettes and playful 3D illustrations.",
      },
      {
        title: "Prominent Compliance & Licensing Hierarchy",
        rationale:
          "Elevated regulatory compliance badges and partner certifications to primary navigation anchors, resolving partner due-diligence questions upfront.",
        tradeOff:
          "Allocated valuable layout space to legal parameters rather than decorative visual elements.",
      },
    ],
    coreWorkflows: [
      {
        title: "Institutional Capability Discovery",
        steps: [
          "Enterprise treasurer visits corporate portal.",
          "Reviews interactive currency corridor map and supported settlement rails.",
          "Inspects compliance certifications and partner banking safeguards.",
        ],
        outcome: "Corporate buyer confirms Greall's institutional fit.",
      },
      {
        title: "Developer API & Documentation Exploration",
        steps: [
          "Technical lead navigates to Developer Gateway.",
          "Reviews webhook specifications, sandbox access protocols, and SDK availability.",
        ],
        outcome: "Engineering team validates technical feasibility of integration.",
      },
      {
        title: "Enterprise Sales Partnership Intake",
        steps: [
          "Prospective client completes structured multi-step intake form specifying transaction volume and corridors.",
          "Automated routing directs inquiry to dedicated enterprise account lead.",
        ],
        outcome: "Streamlined business development pipeline with qualified leads.",
      },
    ],
    systemHighlights: [
      {
        title: "Corporate Visual Identity Refresh",
        description:
          "Authoritative typographic scale, institutional color palette, and geometric brand assets conveying security and scale.",
      },
      {
        title: "Multi-Currency Capability Architecture",
        description:
          "Structured layout presenting foreign exchange rails, treasury management, and commercial settlement workflows.",
      },
      {
        title: "Developer Portal Gateway",
        description:
          "Clean technical interface providing documentation access, API parameters, and sandbox exploration pathways.",
      },
    ],
    validation: {
      methodology:
        "Executive stakeholder reviews with Greall leadership, sales engineering walk-throughs, and cross-browser responsiveness testing across desktop, tablet, and mobile devices.",
      feedbackSummary:
        "Early mockups used playful illustrations that sales teams reported clashed with the conservative, serious tone expected by enterprise bank partners.",
      iterationsMade: [
        "Replaced illustrative elements with crisp architectural data diagrams and high-contrast typography.",
        "Reorganized the homepage navigation into clear Institutional, Developer, and Compliance tracks.",
        "Optimized mobile responsive menus for rapid navigation by executives on smartphones.",
      ],
      limitationsAcknowledged:
        "Proprietary backend liquidity routing consoles, internal merchant management systems, and client transaction ledgers are strictly confidential under NDA.",
    },
    outcomes: {
      deliverablesSummary:
        "Comprehensive corporate design system in Figma, responsive web architecture specifications across all viewports, digital component library, and brand styleguide.",
      keyLearnings: [
        "In enterprise B2B fintech, clarity and visual discipline are commercial assets. High-trust design directly reduces sales friction with institutional clients.",
        "Respecting confidentiality boundaries while telling an impactful design story requires focusing on problem-solving, information architecture, and systems thinking.",
      ],
      futureImprovements: [
        "Interactive real-time cross-border currency rate calculator with estimated settlement speed indicators.",
      ],
    },
    specifications: [
      { label: "Platform", value: "Responsive Corporate Web & Brand System" },
      { label: "Sector", value: "African Fintech & Institutional Payments" },
      { label: "Engagement", value: "Employment Engagement / Brand Architecture" },
      { label: "Confidentiality", value: "NDA Compliant — Proprietary Rails Withheld" },
    ],
    wireframeSummary:
      "Institutional capability hero, modular product pillar cards, developer API gateway, and compliance disclosure footer.",
  },

  {
    slug: "will",
    title: "Will (Digital Legacy)",
    client: "Will Legacy Platform",
    type: "Concept / Lab Exploration",
    category: "Digital Legacy & Asset Succession",
    year: "2023",
    role: "Product Designer",
    timeline: "Product Architecture Exploration",
    storytellingFormat: "concept-exploration",
    badgeLabel: "Lab Showcase · Digital Legacy Architecture",
    deliverables: [
      "Guided Asset Inventory Cataloging Architecture",
      "Interactive Visual Asset Allocation Sliders (100% Split)",
      "Empathetic Beneficiary & Guardian Assignment Workflows",
      "Multi-Signature Inactivity Release Trigger Protocol",
    ],
    headline: "Empathetic Asset Inheritance and Generational Digital Legacy Planning",
    summary:
      "An intuitive digital legacy platform enabling users to organize, allocate, and securely transfer digital and physical assets to trusted beneficiaries.",
    accentColor: "#A9DDF0",
    featured: false,
    tags: ["Estate Planning", "Digital Legacy", "Fintech", "Security"],
    heroImage: "/images/projects/stillwater/01_Exterior-opt.webp",
    gallery: [],
    problemStatement: {
      context:
        "Modern digital natives accumulate complex personal portfolios: bank accounts, crypto wallets, cloud photo vaults, domain names, intellectual property, and sentimental media.",
      friction:
        "Traditional estate planning is expensive, legally intimidating, and emotionally avoided. Existing legal software is filled with archaic jargon, making people feel uncomfortable confronting their mortality.",
      impact:
        "Billions of dollars in digital and financial assets are permanently locked or lost upon unexpected death, while grieving families endure agonizing administrative battles.",
    },
    overview:
      "Will reimagines generational estate planning and digital asset transfer for the modern era. The platform dismantles archaic legalistic intimidation by introducing an empathetic, guided step-by-step experience where individuals can catalog physical properties, digital accounts, and sentimental archives, assigning beneficiaries with intuitive visual allocation sliders.",
    challenge:
      "Addressing the delicate, emotionally confronting topic of mortality while maintaining airtight digital security, multi-signature release triggers, and absolute mathematical precision in asset allocation.",
    solution:
      "Created an empathetic product architecture featuring plain-language guidance, visual percentage allocation sliders that auto-balance to 100%, and a multi-tiered inactivity verification trigger safeguarding sensitive document release.",
    discoveryInsights: [
      {
        title: "Emotional Avoidance Trumps Financial Logic",
        description:
          "Observation: People delay estate planning not out of negligence, but because legalistic documents induce existential anxiety. Language must feel warm, steady, and protective rather than grim or clinical.",
        type: "observation",
      },
      {
        title: "Digital Assets Lack Standard Succession Paths",
        description:
          "Constraint: Traditional legal wills do not accommodate 2FA recovery codes, seed phrases, or cloud drives without compromising immediate security.",
        type: "constraint",
      },
      {
        title: "Math Errors In Manual Allocations Cause Disputes",
        description:
          "Insight: When users allocate percentages manually across multiple heirs, sums frequently fail to equal 100%. Dynamic visual sliders eliminate calculation errors in real time.",
        type: "insight",
      },
    ],
    designDecisions: [
      {
        title: "Plain-Language Human Nomenclature",
        rationale:
          "Replaced cold legal terms like 'Testamentary Nominees' and 'Residuary Estate' with 'Trusted Circle', 'Asset Allocation', and 'Personal Wishes'.",
        tradeOff:
          "Requires localized legal disclosure disclaimers indicating the platform prepares assets for formal statutory signing.",
      },
      {
        title: "Dynamic Visual Allocation Pie Sliders",
        rationale:
          "Designed interactive sliders that automatically balance remaining shares across beneficiaries, ensuring allocations always sum to exactly 100%.",
        tradeOff:
          "Requires constraints preventing negative allocations when adding a new beneficiary to an existing distribution.",
      },
      {
        title: "Dual-Verification Inactivity Release Trigger",
        rationale:
          "Engineered a multi-stage grace period requiring multiple trusted contact confirmations before sensitive digital keys or documents can be unlocked.",
        tradeOff:
          "Adds intentional friction to prevent accidental asset release during prolonged personal travel or temporary device loss.",
      },
    ],
    coreWorkflows: [
      {
        title: "Guided Asset Inventory Intake",
        steps: [
          "User catalogs physical assets (real estate, vehicles) and digital vaults (crypto, photo archives).",
          "Attaches encrypted credentials or safe-deposit locations into secure vault containers.",
        ],
        outcome: "Comprehensive, structured asset registry created without legal jargon.",
      },
      {
        title: "Beneficiary Allocation & Personal Wishes",
        steps: [
          "Assigns trusted family members or charities to specific assets using visual allocation sliders.",
          "Drafts personal heartfelt farewell notes or video instructions attached to milestone release dates.",
        ],
        outcome: "Clear, transparent inheritance blueprint preventing family ambiguity.",
      },
      {
        title: "Emergency Inactivity Verification Trigger",
        steps: [
          "System detects prolonged inactivity and initiates private check-in ping.",
          "If unresponsive, dual trusted contacts must verify status before grace period countdown commences.",
        ],
        outcome: "Airtight security safeguarding user privacy while guaranteeing succession.",
      },
    ],
    systemHighlights: [
      {
        title: "Empathetic Guided Onboarding",
        description:
          "Calm, conversational milestone steps removing fear and administrative intimidation from estate planning.",
      },
      {
        title: "Interactive Allocation Sliders",
        description:
          "Dynamic visual percentage controls guaranteeing mathematical distribution integrity across beneficiaries.",
      },
      {
        title: "Encrypted Digital Succession Vault",
        description:
          "Multi-signature and inactivity verification triggers ensuring confidential digital handover.",
      },
    ],
    validation: {
      methodology:
        "Empathy-mapping walk-throughs and usability tests evaluating the emotional comfort level and comprehension of life-planning onboarding flows.",
      feedbackSummary:
        "Early concepts opened immediately with financial asset numbers, making participants feel interrogated and uncomfortable.",
      iterationsMade: [
        "Reordered onboarding to begin with 'Who are the most important people in your life?' before requesting financial estimates.",
        "Introduced warm typography, generous whitespace, and unhurried pacing.",
        "Added milestone badges celebrating completed planning sections as acts of love and family protection.",
      ],
      limitationsAcknowledged:
        "Conceived as a product architecture and UX exploration; full real-world execution requires legal jurisdiction certification and digital signature compliance.",
    },
    outcomes: {
      deliverablesSummary:
        "Complete user flow architecture in Figjam, responsive UI screens in Figma, interactive allocation slider prototypes, and design token library.",
      keyLearnings: [
        "Designing for emotionally sensitive life moments demands immense restraint. Software must feel warm, respectful, and completely unhurried.",
        "Transforming cold administrative chores into meaningful protective rituals fundamentally changes user engagement.",
      ],
      futureImprovements: [
        "Video and audio memory capsules scheduled for release on specific beneficiary milestones (e.g., graduation, 21st birthday).",
      ],
    },
    specifications: [
      { label: "Platform", value: "Responsive Web & Tablet Experience" },
      { label: "Domain", value: "Digital Legacy, Estate Planning, Security" },
      { label: "Deliverables", value: "Figma UI/UX, Flow Architecture, Tokens" },
      { label: "Engagement", value: "Concept / Lab Exploration" },
    ],
    wireframeSummary:
      "Empathetic milestone wizard, interactive visual allocation sliders, encrypted vault overview, and trusted contact verification ledger.",
  },

  {
    slug: "agrivillage",
    title: "AgriVillage",
    client: "AgriVillage Agriculture",
    type: "Concept / Lab Exploration",
    category: "Agritech & Cooperative Commerce",
    year: "2023",
    role: "Product Designer",
    timeline: "Concept Exploration",
    storytellingFormat: "concept-exploration",
    badgeLabel: "Lab Showcase · Agritech Supply Chain",
    deliverables: [
      "Smallholder Farmer Produce Listing Mobile Web UI",
      "Cooperative Batch Pooling & Aggregation Architecture",
      "Transparent Regional Farmgate Price Benchmark Tickers",
      "Milestone Escrow Payment & Collection Hub Tracking",
    ],
    headline: "Direct Market Access Connecting Smallholder Farmers and Bulk Buyers",
    summary:
      "A digital agricultural marketplace connecting smallholder farmers with wholesale food buyers, reducing post-harvest losses and guaranteeing transparent farmgate pricing.",
    accentColor: "#A9DDF0",
    featured: false,
    tags: ["Agritech", "Marketplace", "Supply Chain", "Financial Inclusion"],
    heroImage: "/images/projects/agrivillage/hero-opt.webp",
    gallery: [
      {
        src: "/images/projects/agrivillage/hero-opt.webp",
        caption: "AgriVillage platform exploration: 'Transforming Agriculture with Innovation and Technology' — farmer cooperative marketplace hero, crop catalog, and responsive showcase.",
        alt: "AgriVillage Farmer Cooperative Showcase Hero",
      },
    ],
    problemStatement: {
      context:
        "Smallholder farmers produce over 70% of the food consumed across developing economies, yet they remain among the most economically vulnerable populations.",
      friction:
        "Farmers depend on predatory middlemen who dictate arbitrarily low farmgate prices, while urban commercial food buyers and processors struggle with erratic supply chains and harvest delays.",
      impact:
        "Up to 40% of perishable harvests spoil before reaching markets, trapping smallholder farming families in cycles of debt and volatile earnings.",
    },
    overview:
      "AgriVillage explores how digital marketplaces can empower rural farmer cooperatives. By connecting farming clusters directly with wholesale aggregators and institutional food buyers, the platform eliminates predatory intermediaries, guarantees transparent pricing, and reduces post-harvest food waste through scheduled bulk dispatch.",
    challenge:
      "Designing for rural smallholders using entry-level Android smartphones with cracked screens, limited literacy, and intermittent 2G/3G mobile connectivity under bright outdoor sunlight.",
    solution:
      "Engineered an icon-first, high-contrast mobile listing experience, paired with cooperative batch aggregation logic and transparent daily commodity pricing benchmarks.",
    discoveryInsights: [
      {
        title: "High Literacy Cannot Be Assumed",
        description:
          "Observation: Rural farmers navigate visual iconography and voice far better than dense text menus. Listing crops must rely on recognizable photographic icons and large touch targets.",
        type: "observation",
      },
      {
        title: "Extreme Bandwidth & Hardware Constraints",
        description:
          "Constraint: Mobile data in farming villages is expensive and erratic. Pages must load in under 2 seconds on slow 2G/3G connections.",
        type: "constraint",
      },
      {
        title: "Single Farmers Cannot Fill Bulk Orders",
        description:
          "Insight: Commercial food buyers need 50-ton truckloads, while an individual farmer produces only 2 tons. Cooperative batch pooling is essential to bridge the supply gap.",
        type: "insight",
      },
    ],
    designDecisions: [
      {
        title: "Icon-First High-Contrast Harvest Listing UI",
        rationale:
          "Used large visual crop cards (Cassava, Maize, Yam, Tomatoes) and standardized crate/bag pickers, enabling farmers to list crops in 60 seconds regardless of reading fluency.",
        tradeOff:
          "Constrained custom crop descriptions to predefined agricultural grades (Grade A, B, C).",
      },
      {
        title: "Cooperative Batch Aggregation Engine",
        rationale:
          "Allows cooperative leaders to combine smallholder harvests into verified bulk shipments that satisfy wholesale commercial contracts.",
        tradeOff:
          "Requires cooperative hub verification to certify harvest quality before batch dispatch.",
      },
      {
        title: "Transparent Daily Price Benchmark Tickers",
        rationale:
          "Displays live regional market averages directly on the listing card, protecting farmers from accepting exploitative low-ball offers from roving middlemen.",
        tradeOff:
          "Demands reliable daily commodity market data feeds.",
      },
    ],
    coreWorkflows: [
      {
        title: "Smallholder Produce Listing",
        steps: [
          "Farmer taps crop photo icon and selects harvest date.",
          "Selects quantity in standardized local units (50kg bags, wooden crates).",
          "Views recommended fair farmgate price benchmark and confirms listing.",
        ],
        outcome: "Harvest registered and visible to regional aggregation hubs.",
      },
      {
        title: "Cooperative Batch Pooling & Wholesale Sale",
        steps: [
          "Cooperative coordinator views collective listings in rural cluster.",
          "Consolidates compatible harvests into a 20-ton wholesale consignment for commercial buyers.",
        ],
        outcome: "Smallholders collectively access high-volume institutional contracts.",
      },
      {
        title: "Escrow Settlement & Payout",
        steps: [
          "Wholesale buyer funds milestone escrow deposit.",
          "Harvest is verified upon delivery to collection hub; funds release automatically to farmer mobile money wallets.",
        ],
        outcome: "Guaranteed prompt payment without credit default risk.",
      },
    ],
    systemHighlights: [
      {
        title: "Tactile Icon-Based Produce Selector",
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
    validation: {
      methodology:
        "Low-bandwidth heuristic emulation, accessibility checks for outdoor sunlight legibility, and usability testing with simplified touchscreen workflows.",
      feedbackSummary:
        "Early mockups used standard e-commerce dropdown multi-selects, which proved frustrating to operate for farmers with calloused hands on cracked smartphone screens.",
      iterationsMade: [
        "Enlarged all interactive buttons to a minimum of 56px height.",
        "Boosted typographic contrast to meet AAA standards against dark backgrounds.",
        "Added clear visual progress steps showing harvest collection timelines.",
      ],
      limitationsAcknowledged:
        "Conceived as an exploratory agritech mobile system exploring cooperative market access and price transparency.",
    },
    outcomes: {
      deliverablesSummary:
        "Mobile web UI specifications, crop catalog icon set, cooperative aggregation logic flows, and featured Figma project prototype.",
      keyLearnings: [
        "Designing for emerging markets requires stripping away all vanity UI to focus 100% on bandwidth efficiency, battery preservation, and direct human utility.",
        "Empowering collective cooperatives creates far greater economic impact than treating rural farmers as isolated individual users.",
      ],
      futureImprovements: [
        "Offline USSD/SMS fallback interface for smallholders who rely on basic feature phones.",
      ],
    },
    specifications: [
      { label: "Platform", value: "Mobile-First Web Application" },
      { label: "Focus", value: "Agricultural Commerce, Price Discovery, Logistics" },
      { label: "Design Deliverable", value: "Figma UI/UX & Flow Specs" },
      { label: "Engagement", value: "Concept / Lab Exploration" },
    ],
    prototypeUrl:
      "https://www.figma.com/design/XJQKHJvC4YzQbkN3ng8I22/AgriVillage?node-id=0-1&t=jS5CliPpYKPZb8kI-1",
    wireframeSummary:
      "Large-touch target produce selectors, simple batch creation cards, and clear delivery timeline trackers.",
  },

  // ─────────────────────────────────────────────────────────────
  // 2. BEHANCE PORTFOLIO EXPANSIONS (Approved Additions)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "spot",
    title: "Spot",
    client: "Spot Creative Technologies",
    type: "Client / Freelance",
    category: "SaaS & Creative Collaboration",
    year: "2024",
    role: "Lead Product Designer",
    timeline: "8-Week Cross-Functional Design Sprint",
    storytellingFormat: "in-depth-case-study",
    badgeLabel: "Client Project · Lead Product Designer",
    deliverables: [
      "End-to-End Responsive Architecture across 30+ High-Fidelity Screens",
      "Pinned Spatial Commenting & Precision Coordinate Feedback Engine",
      "Multiplayer Real-Time Presence & Live Avatar Cursor System",
      "Comprehensive Multi-Platform Design System & Token Hierarchy",
    ],
    headline: "Structured Creative Feedback Platform Empowering Designers Through Community Critique",
    summary:
      "A creative review workspace allowing distributed teams to leave pinned, contextual comments directly on interactive web and mobile prototypes.",
    accentColor: "#A9DDF0",
    featured: true,
    featuredOrder: 6,
    tags: ["SaaS", "Design System", "Collaboration", "Product Design"],
    heroImage: "/images/projects/spot/hero-opt.webp",
    gallery: [
      {
        src: "/images/projects/spot/hero-opt.webp",
        caption: "Spot creative collaboration platform: web-based workspace allowing designers to stage prototypes and receive structured, spatial peer critique.",
        alt: "Spot Creative Collaboration Platform Hero",
      },
      {
        src: "/images/projects/spot/problem-solution.png",
        caption: "Problem statement & 8-week production scope: solving feedback fragmentation and context loss across 30+ responsive design screens.",
        alt: "Spot Problem Statement & Scope Specification",
      },
      {
        src: "/images/projects/spot/research-personas.png",
        caption: "User research synthesis & empathy mapping: identifying key roadblocks in junior and independent designer critique workflows.",
        alt: "Spot User Research & Empathy Mapping",
      },
      {
        src: "/images/projects/spot/design-system-opt.webp",
        caption: "Spot multi-platform design system: token hierarchy, high-contrast typography, and reusable interaction components.",
        alt: "Spot Multi-Platform Design System",
      },
      {
        src: "/images/projects/spot/feedback-canvas-opt.webp",
        caption: "Contextual feedback canvas: pinned inline annotations, structured critique categories (Bug, UX, Copy), and version comparisons.",
        alt: "Spot Contextual Feedback Canvas",
      },
      {
        src: "/images/projects/spot/screens-overview.png",
        caption: "Comprehensive screen architecture: from onboarding and prototype staging to community critique drawers and resource vaults.",
        alt: "Spot Comprehensive Screen Architecture",
      },
    ],
    problemStatement: {
      context:
        "Modern product design teams operate asynchronously across distributed timezones, relying on regular design critiques, peer reviews, and client sign-offs to ship digital products.",
      friction:
        "Critique is scattered across disjointed channels: messy Slack threads, ambiguous email bullet points ('make that card on page 2 bigger'), Loom recordings, and PDF markups. Reviewers lack spatial precision, while designers waste hours decoding which element was referenced.",
      impact:
        "Repeated revision cycles, misaligned engineering handoffs, delayed release schedules, and creative team burnout.",
    },
    overview:
      "Spot is a dedicated creative collaboration workspace that redefines how design critique is given and resolved. Instead of deciphering vague email comments, reviewers drop precision comment pins directly onto the interactive prototype canvas. Directed by Taye as Lead Product Designer over an 8-week cross-functional sprint, Spot bridges the gap between designers, developers, and non-technical stakeholders.",
    challenge:
      "Balancing high screen density (infinite canvas, nested layers, floating comment pins, inspector drawers) without overwhelming non-technical reviewers or introducing interaction latency during multiplayer critique sessions.",
    solution:
      "Architected a spatial feedback engine with precision coordinate pinning, intuitive keyboard shortcuts (C for comment, V for pointer), multiplayer cursor presence, and an expandable resolution drawer that treats design feedback like a code pull request.",
    discoveryInsights: [
      {
        title: "Feedback Without Coordinates Causes 35% Revision Waste",
        description:
          "Observation: Designers spend up to a third of revision time clarifying what element reviewers meant. Pinned spatial coordinates eliminate ambiguity instantly.",
        type: "observation",
      },
      {
        title: "Non-Designers Get Overwhelmed by Layer Trees",
        description:
          "Constraint: Clients and product managers get lost in complex Figma layer panels. The review interface must present prototypes cleanly without exposing internal component trees.",
        type: "constraint",
      },
      {
        title: "Critique Requires Structured Taxonomy",
        description:
          "Insight: Open-ended feedback frequently deteriorates into bikeshedding. Categorizing comments into structured types (UX, Visual, Copy, Bug) keeps discussions actionable.",
        type: "insight",
      },
    ],
    designDecisions: [
      {
        title: "Spatial Pinning with Filtered Resolution Drawer",
        rationale:
          "Anchoring comments to exact X/Y coordinates preserves context, while the side drawer provides designers with an actionable, filterable checklist.",
        tradeOff:
          "Required coordinate normalization algorithms to keep pins accurately positioned when responsive frames reflow across viewports.",
      },
      {
        title: "Multiplayer Live Presence Indicators",
        rationale:
          "High-contrast avatar cursor badges show where collaborators are looking, creating shared creative energy during live review meetings.",
        tradeOff:
          "Demanded strict WebSocket optimization to avoid canvas lag with 10+ concurrent reviewers.",
      },
      {
        title: "Standardized Keyboard Shortcuts (C / V)",
        rationale:
          "Adopted familiar mental models from Figma and Miro (C to comment, V to point, Space to pan), eliminating user onboarding friction.",
        tradeOff:
          "Required intercepting browser-default hotkeys within the canvas viewport.",
      },
    ],
    coreWorkflows: [
      {
        title: "Prototype Staging & Review Setup",
        steps: [
          "Lead designer imports multi-page responsive design prototype into Spot.",
          "Organizes artboards into review sprints and generates shareable guest review links.",
        ],
        outcome: "Clean, staged workspace ready for stakeholder review.",
      },
      {
        title: "Spatial Critique & Tagged Annotation",
        steps: [
          "Reviewer presses 'C' and clicks directly on specific UI component.",
          "Selects category tag (UX, Visual, Copy, Bug) and types structured feedback note.",
        ],
        outcome: "Pinned, unambiguous critique stored with exact pixel coordinates.",
      },
      {
        title: "Designer Triage & Resolution Cycle",
        steps: [
          "Designer reviews open comments in the resolution drawer.",
          "Applies revisions, uploads updated prototype version, and marks items as Resolved.",
        ],
        outcome: "Clear audit trail of resolved feedback with side-by-side version comparison.",
      },
    ],
    systemHighlights: [
      {
        title: "Spatial Feedback Canvas",
        description:
          "Precision-pinned commenting engine allowing reviewers to annotate exact interface elements directly.",
      },
      {
        title: "Multiplayer Collaboration Engine",
        description:
          "Live presence indicators, avatar cursors, and concurrent review sessions on responsive artboards.",
      },
      {
        title: "Unified Design Token Hierarchy",
        description:
          "Scalable typography, color palettes, and interaction components engineered for clean engineering handoff.",
      },
    ],
    validation: {
      methodology:
        "Conducted weekly cross-functional squad reviews with 1 Product Manager, 2 Frontend Engineers, and 2 Designers, running 15 simulated design review sessions.",
      feedbackSummary:
        "Early iterations had pinned comment badges overlapping each other when multiple reviewers commented on the same CTA button.",
      iterationsMade: [
        "Implemented dynamic radial pin clustering that expands upon hover.",
        "Added filter toggles allowing users to isolate unresolved comments or filter by author.",
        "Built side-by-side prototype diffing to show what changed between version uploads.",
      ],
      limitationsAcknowledged:
        "Offline commenting was deferred to v2 to prioritize real-time WebSocket multiplayer synchronization reliability.",
    },
    outcomes: {
      deliverablesSummary:
        "Over 30 responsive high-fidelity screens, complete design token taxonomy in Figma, spatial commenting engine specifications, and published Behance case study.",
      keyLearnings: [
        "Leading a cross-functional squad reinforced that the best design system is one co-engineered with developers. Documenting component states upfront saved hundreds of hours of rework.",
        "Precision in feedback tooling directly improves the quality of design work delivered by teams.",
      ],
      futureImprovements: [
        "Bidirectional integration with GitHub Pull Requests and Jira issue tracking from resolved comment threads.",
      ],
    },
    specifications: [
      { label: "Role Scope", value: "Lead Product Designer (Sprint Lead)" },
      { label: "Team Size", value: "1 PM, 2 Frontend Engineers, 2 Designers" },
      { label: "Deliverables", value: "30+ Screens, Design System, Flow Specs" },
      { label: "Sprint Duration", value: "8-Week Cross-Functional Sprint" },
      { label: "Credit", value: "Abolarin, Taye Joseph (@cold_designer)" },
    ],
    prototypeUrl: "https://www.behance.net/gallery/198428581/Spot-Redefining-Creative-Feedback",
    wireframeSummary:
      "Infinite collaborative canvas, floating tool dock, spatial pinned comment clusters, and expandable resolution drawer.",
  },

  {
    slug: "profile",
    title: "PROfile",
    client: "Enterprise Solutions",
    type: "Client / Freelance",
    category: "Enterprise SaaS & HR Tech",
    year: "2025",
    role: "Product Designer",
    timeline: "Enterprise SaaS UX Architecture",
    storytellingFormat: "in-depth-case-study",
    badgeLabel: "Client Project · Enterprise SaaS Architecture",
    deliverables: [
      "Modular Administrative HRMS Dashboard across 37 High-Resolution Screens",
      "Employee Self-Service (ESS) Mobile Companion Application",
      "Unified Attendance Reconciliation & Shift Exception Ledger",
      "Predictive Retention & Departmental Attrition Analytics Engine",
    ],
    headline: "Integrated Organizational HRMS and Employee Self-Service Portal",
    summary:
      "An enterprise human resource management platform uniting administrative attendance tracking, automated clock-in, predictive attrition analytics, and mobile self-service.",
    accentColor: "#A9DDF0",
    featured: true,
    featuredOrder: 7,
    tags: ["Enterprise SaaS", "HR Tech", "Analytics", "Design System"],
    heroImage: "/images/projects/profile/hero-opt.webp",
    gallery: [
      {
        src: "/images/projects/profile/hero-opt.webp",
        caption: "PROfile enterprise overview dashboard: real-time headcount metrics (258 staff), working format ratio, performance charts, and payroll ledger summaries.",
        alt: "PROfile Enterprise Overview Dashboard",
      },
      {
        src: "/images/projects/profile/about-problems.png",
        caption: "Core problem framework: replacing fragmented spreadsheets and manual paper binders with centralized, automated, and predictive HR workflows.",
        alt: "PROfile Core Problem Framework",
      },
      {
        src: "/images/projects/profile/research-findings.png",
        caption: "Quantitative user research & stakeholder insights: analyzing attrition warning signals, shift scheduling friction, and employee self-service demands.",
        alt: "PROfile User Research Findings",
      },
      {
        src: "/images/projects/profile/dashboard-overview.png",
        caption: "Modular administrative workspaces: centralized attendance rosters, shift reconciliation tables, and departmental performance matrices.",
        alt: "PROfile Modular Administrative Dashboard",
      },
      {
        src: "/images/projects/profile/mobile-screens.png",
        caption: "Employee Self-Service (ESS) mobile companion: one-tap clock-in, geofenced presence verification, leave application tracker, and digital paystubs.",
        alt: "PROfile Employee Self-Service Mobile Application",
      },
    ],
    problemStatement: {
      context:
        "Mid-sized organizations with 200 to 2,000 employees navigate complex operational dynamics across departmental rosters, hybrid work schedules, and strict payroll deadlines.",
      friction:
        "Workforce data is scattered across disconnected tools: physical biometric punch clocks, paper leave approval binders, and unwieldy Excel spreadsheets. HR administrators waste days manually reconciling timecards each payroll cycle.",
      impact:
        "Payroll calculation errors, compliance delays, and zero early warning signals for executive leadership when employee burnout or department turnover rates spike.",
    },
    overview:
      "PROfile is a comprehensive organizational human resource management platform (HRMS) engineered to bring clarity to complex workforce operations. Across 37 high-resolution modular screens, the platform unifies administrative attendance tracking, automated clock-in reconciliation, payroll compliance, and predictive attrition analytics, complemented by a lightweight Employee Self-Service (ESS) mobile companion.",
    challenge:
      "Displaying vast volumes of employee data (attendance records, payroll deductions, leave balances) without inducing visual fatigue, while delivering a lightweight mobile experience for frontline staff.",
    solution:
      "Designed a dual-persona architecture: a high-density, multi-column desktop command center for HR administrators, paired with a tactile, one-tap mobile ESS companion for frontline employees.",
    discoveryInsights: [
      {
        title: "HR Admins Suffer Acute Dashboard Fatigue",
        description:
          "Observation: HR generalists get overwhelmed when presented with wall-to-wall unformatted tables. They need prioritized exception lists (who is late, who has pending leaves, which shift is short-staffed).",
        type: "observation",
      },
      {
        title: "Frontline Workers Need Instant One-Tap Mobile Clock-In",
        description:
          "Constraint: Employees will not use complex enterprise apps for simple daily tasks. Clocking in and requesting leave must happen in seconds on mobile.",
        type: "constraint",
      },
      {
        title: "Leadership Needs Predictive Turnover Signals",
        description:
          "Insight: Executive leadership rarely spots burnout until formal resignation letters are submitted. Tracking shift overtime, leave denial trends, and engagement metrics provides proactive attrition warnings.",
        type: "insight",
      },
    ],
    designDecisions: [
      {
        title: "Dual-Persona Platform Segmentation",
        rationale:
          "Separated administrative command functions onto high-density desktop dashboards, while packaging everyday employee actions into a streamlined mobile ESS companion.",
        tradeOff:
          "Required maintaining two synchronized design systems with shared backend data entities.",
      },
      {
        title: "Unified Attendance & Shift Exception Ledger",
        rationale:
          "Automated the reconciliation of clock-in timestamps against scheduled shifts, auto-flagging anomalies (grace-period lateness, early departures) for rapid bulk manager approval.",
        tradeOff:
          "Required designing flexible rule builders to accommodate diverse company overtime and grace-period policies.",
      },
      {
        title: "Predictive Attrition Risk Matrix",
        rationale:
          "Visualized departmental turnover risks through quadrant charts, highlighting teams experiencing unsustainable overtime or compensation misalignment.",
        tradeOff:
          "Carefully calibrated language to indicate risk trends rather than making definitive personal judgements about individual employees.",
      },
    ],
    coreWorkflows: [
      {
        title: "Morning Attendance Exception Reconciliation",
        steps: [
          "HR administrator opens the morning dashboard.",
          "Reviews auto-filtered exception list (unjustified lateness, absent staff).",
          "Executes bulk approvals for justified notifications or routes reminders to managers.",
        ],
        outcome: "Daily attendance ledger finalized in under 10 minutes.",
      },
      {
        title: "Mobile Employee Clock-In & Leave Request",
        steps: [
          "Employee opens ESS mobile companion app upon arrival.",
          "One-tap clock-in verifies geofenced presence; submits 3-day leave request with attachment.",
        ],
        outcome: "Leave request routed to manager with automatic push notifications.",
      },
      {
        title: "Executive Headcount & Retention Review",
        steps: [
          "C-suite executive reviews organizational headcount ratio (258 staff), remote vs on-site distribution, and departmental retention charts.",
        ],
        outcome: "Data-driven workforce planning with proactive retention interventions.",
      },
    ],
    systemHighlights: [
      {
        title: "Executive Analytics Command Center",
        description:
          "Headcount ratios, attendance trends, departmental performance metrics, and payroll summaries at a glance.",
      },
      {
        title: "Automated Attendance Reconciliation",
        description:
          "Shift-matching ledger distinguishing on-time arrivals, approved leaves, and anomalous overtime.",
      },
      {
        title: "Employee Self-Service (ESS) Mobile App",
        description:
          "Lightweight mobile companion for one-tap biometric clock-in, leave tracking, and digital paystub access.",
      },
    ],
    validation: {
      methodology:
        "Stakeholder interviews with operational HR managers and simulated usability trials with diverse employees across desktop and mobile prototypes.",
      feedbackSummary:
        "Initial desktop tables caused horizontal scrolling fatigue on standard 13-inch corporate laptops.",
      iterationsMade: [
        "Implemented configurable column visibility and sticky employee identification columns.",
        "Increased row height and typographic contrast to reduce optical fatigue during extended payroll reviews.",
        "Built quick-action hover drawers allowing admins to view employee profiles without navigating away from the ledger.",
      ],
      limitationsAcknowledged:
        "Statutory tax deductions were tailored to Nigerian payroll regulations; international multi-jurisdiction compliance was scheduled for future phases.",
    },
    outcomes: {
      deliverablesSummary:
        "37 modular responsive dashboard screens, mobile Employee Self-Service (ESS) design specifications, comprehensive enterprise component system, and published Behance case study.",
      keyLearnings: [
        "Enterprise software does not need to feel soul-crushing or dull. Clean typography, thoughtful spacing, and subtle border hierarchy make high-density data tables a pleasure to use.",
        "Anticipating edge cases (such as overnight night-shifts spanning two calendar dates) is where true enterprise UX excellence lives.",
      ],
      futureImprovements: [
        "Natural language search allowing HR admins to query 'Show all pending leave requests for the design department' directly.",
      ],
    },
    specifications: [
      { label: "Platform", value: "Enterprise Web Dashboard & Mobile ESS" },
      { label: "Deliverables", value: "37 Modular Screens, Design System, Specs" },
      { label: "Target Scope", value: "Mid-Sized Organizations (200–2,000 Employees)" },
      { label: "Credit", value: "Abolarin, Taye Joseph (@cold_designer)" },
      { label: "Tools", value: "Figma, Google Forms, Grain, Teams" },
    ],
    prototypeUrl: "https://www.behance.net/gallery/222769651/PROfile-An-Organizational-HRM-Solution",
    wireframeSummary:
      "Multi-column administrative command center, modular KPI cards, expandable data tables, and mobile ESS companion navigation.",
  },

  {
    slug: "quickeats",
    title: "QuickEats",
    client: "QuickEats Health",
    type: "Concept / Lab Exploration",
    category: "Consumer Mobile & Food Tech",
    year: "2025",
    role: "Product Designer",
    timeline: "4 Weeks (Dec 14 – Jan 9)",
    storytellingFormat: "in-depth-case-study",
    badgeLabel: "Lab Showcase · Consumer Mobile Architecture",
    deliverables: [
      "Comprehensive Mobile Application Architecture across 45 Presentation Boards",
      "Interactive 7-Day Weekly Meal Matrix with Drag-and-Drop Recipe Swapping",
      "Smart Pantry Ingredient Match Engine & Readiness Scoring",
      "Native Dual-Theme Design System (Semantic Light & Dark Modes)",
    ],
    headline: "Smart Meal Planning and Automated Grocery Companion for Busy Lifestyles",
    summary:
      "A consumer mobile app empowering young adults and students to eat healthy on a budget with personalized 20-minute recipes, smart pantry matching, and automated grocery lists.",
    accentColor: "#A9DDF0",
    featured: true,
    featuredOrder: 8,
    tags: ["Mobile App", "Food Tech", "Design System", "Dual Theme"],
    heroImage: "/images/projects/quickeats/hero-opt.webp",
    gallery: [
      {
        src: "/images/projects/quickeats/hero-opt.webp",
        caption: "QuickEats dual-theme mobile interface: light and dark theme comparison of the weekly meal planning dashboard and recipe cards.",
        alt: "QuickEats Dual-Theme Mobile Interface",
      },
      {
        src: "/images/projects/quickeats/problem-solution-opt.webp",
        caption: "Three-pillar problem framework: time constraints, lack of cooking confidence, and grocery budget mismanagement solved through smart UI.",
        alt: "QuickEats Problem Framework",
      },
      {
        src: "/images/projects/quickeats/user-research-opt.webp",
        caption: "User research & survey analysis: identifying key grocery hurdles, dietary preferences, and the critical 20-minute prep ceiling.",
        alt: "QuickEats User Research Findings",
      },
      {
        src: "/images/projects/quickeats/meal-planning-flow-opt.webp",
        caption: "Structured weekly meal planner: calendar scheduling (Breakfast, Lunch, Dinner), interactive recipe cards, and batch cooking guides.",
        alt: "QuickEats Structured Meal Planning Flow",
      },
      {
        src: "/images/projects/quickeats/design-system-opt.webp",
        caption: "Comprehensive component library: typography scale, semantic color palettes for light/dark modes, and interactive food cards.",
        alt: "QuickEats Design System Component Library",
      },
    ],
    problemStatement: {
      context:
        "University students and young professionals face intense daily time pressures balancing academic workloads or career commitments on tight monthly living budgets.",
      friction:
        "Traditional cooking apps feature complex multi-hour recipes requiring obscure specialty ingredients and constant ad interruptions, while takeout apps drain finances and offer poor nutritional value.",
      impact:
        "Excessive takeout reliance, high food waste from spoiled unused groceries, and chronic decision fatigue around meal preparation.",
    },
    overview:
      "QuickEats is a consumer mobile application designed to make healthy cooking realistic and enjoyable for busy young adults. Across 45 detailed presentation boards, the project introduces a structured 7-day meal planning matrix, a smart pantry matching algorithm that prioritizes ingredients already at home, and automated aisle-grouped grocery checklists, all packaged in a dual-theme design system.",
    challenge:
      "Making nutrition and recipe planning feel lightweight and rewarding rather than restrictive, punitive, or like a calorie-counting chore.",
    solution:
      "Built the product experience around three core pillars: an absolute 20-minute recipe limit, a smart pantry ingredient match engine, and auto-generated grocery lists grouped by supermarket aisle.",
    discoveryInsights: [
      {
        title: "Cooking Drop-Off Happens Before The Stove",
        description:
          "Observation: The primary barrier to home cooking is not the cooking itself—it is decision fatigue, missing ingredients, and the daunting prospect of lengthy cleanup.",
        type: "observation",
      },
      {
        title: "The Critical 20-Minute Preparation Ceiling",
        description:
          "Constraint: Target users consistently abandon recipes that quote longer than 20 minutes of active prep time. Strict curation below 20 minutes eliminates hesitation.",
        type: "constraint",
      },
      {
        title: "Micro-Delight Drives Habit Consistency",
        description:
          "Insight: Checking off pantry staples and seeing a recipe match score jump from 60% to 100% creates immediate motivation to cook rather than order takeout.",
        type: "insight",
      },
    ],
    designDecisions: [
      {
        title: "Strict Under-20-Minute Recipe Curation",
        rationale:
          "Guaranteed that every recipe on the platform can be prepped and cooked in 20 minutes or less with basic kitchenware, removing intimidation.",
        tradeOff:
          "Excluded elaborate gourmet and slow-cooked culinary traditions from the primary recipe index.",
      },
      {
        title: "Smart Pantry Ingredient Match Engine",
        rationale:
          "Users check off items they currently own; the engine computes recipe readiness scores (e.g., '85% Match — need 1 item'), minimizing unnecessary grocery shopping.",
        tradeOff:
          "Required designing clear visual indicators for missing ingredient substitutions.",
      },
      {
        title: "Aisle-Grouped Smart Grocery Checklists",
        rationale:
          "Auto-compiled weekly shopping lists organize ingredients by supermarket section (Produce, Dairy, Pantry), eliminating zigzagging through store aisles.",
        tradeOff:
          "Required maintaining a semantic categorization database for ingredients.",
      },
      {
        title: "Native Semantic Dual-Theme Design System",
        rationale:
          "Engineered equal light and dark modes with semantic tokens to support bright daytime supermarket shopping and comfortable evening cooking without screen glare.",
        tradeOff:
          "Doubled color token QA requirements across all 45 presentation boards.",
      },
    ],
    coreWorkflows: [
      {
        title: "7-Day Meal Matrix Planning",
        steps: [
          "User reviews curated 7-day breakfast/lunch/dinner board.",
          "Swaps recipes with one tap to accommodate dining-out days or personal cravings.",
        ],
        outcome: "Personalized weekly meal schedule organized in under 3 minutes.",
      },
      {
        title: "Pantry Matching & Recipe Selection",
        steps: [
          "User checks off available pantry ingredients (eggs, tomatoes, rice, spinach).",
          "Engine presents recommended 20-minute recipes ranked by readiness match percentage.",
        ],
        outcome: "Immediate cooking inspiration with zero wasted groceries.",
      },
      {
        title: "Supermarket Aisle-Grouped Shopping",
        steps: [
          "App compiles missing ingredients into an interactive checklist.",
          "Items are grouped by supermarket aisle; user checks off items as they place them in the cart.",
        ],
        outcome: "Efficient, budget-conscious grocery run in record time.",
      },
    ],
    systemHighlights: [
      {
        title: "Interactive Weekly Meal Matrix",
        description:
          "Structured 7-day calendar planning with easy recipe swapping and nutritional balance tracking.",
      },
      {
        title: "Smart Pantry Matching",
        description:
          "Algorithm suggesting recipes based on ingredients already at home, minimizing food waste.",
      },
      {
        title: "Native Dual-Theme Design System",
        description:
          "Semantic color architecture supporting comfortable usage across varying ambient light conditions.",
      },
    ],
    validation: {
      methodology:
        "Prototype usability walkthroughs with 12 university students and young professionals, accompanied by a 7-day diary study of grocery habits.",
      feedbackSummary:
        "Early calendar layouts felt too rigid; testers felt guilty when unexpected dinner invitations made them miss a scheduled recipe.",
      iterationsMade: [
        "Introduced flexible 'Meal Swap' and 'Carry-Over' actions to push meals to the next day without guilt.",
        "Replaced calorie-counting numbers with vibrant macro balance badges (Protein, Carbs, Healthy Fats).",
        "Added one-tap ingredient quantity scaling based on household serving size (1 to 4 portions).",
      ],
      limitationsAcknowledged:
        "Nutritional data is based on standard culinary averages and is designed for general lifestyle wellness rather than clinical medical nutrition therapy.",
    },
    outcomes: {
      deliverablesSummary:
        "45 high-fidelity presentation boards, comprehensive iOS/Android mobile UI, semantic dual-theme design system, and featured case study published on Behance.",
      keyLearnings: [
        "Consumer mobile UX succeeds on small moments of tangible delight—like watching an ingredient readiness score animate to 100%.",
        "Designing dual themes requires treating both light and dark modes as first-class citizens from the very first token definition.",
      ],
      futureImprovements: [
        "Barcode scanning integration for instant pantry cataloging from grocery packaging.",
      ],
    },
    specifications: [
      { label: "Platform", value: "Mobile Application (iOS & Android Specs)" },
      { label: "Design Scope", value: "45 Comprehensive Presentation Boards" },
      { label: "Themes", value: "Native Semantic Light & Dark Modes" },
      { label: "Timeline", value: "4 Weeks (Dec 14 – Jan 9)" },
      { label: "Credit", value: "Abolarin, Taye Joseph (@cold_designer)" },
      { label: "Tools", value: "Figma, Google Docs, Google Forms, Slack" },
    ],
    prototypeUrl: "https://www.behance.net/gallery/218767855/Meal-Prepping-Mobile-App-A-Case-Study",
    wireframeSummary:
      "Sticky weekly date bar, two-column recipe card feed, bottom sheet ingredient checklist, and aisle-grouped grocery list.",
  },

  {
    slug: "raven-bank",
    title: "Raven Bank App",
    client: "Raven Bank (Redesign Sprint)",
    type: "Concept / Lab Exploration",
    category: "Fintech & Mobile Banking",
    year: "2025",
    role: "Product Designer",
    timeline: "2-Day Intensive Redesign Challenge (48 Hours)",
    storytellingFormat: "in-depth-case-study",
    badgeLabel: "Sprint Showcase · 48-Hour Fintech Sprint",
    deliverables: [
      "Core Personal Banking Dashboard Redesign across 10 Modular Screens",
      "Instant Recipient Avatar Chips & 2-Tap P2P Transfer Engine",
      "One-Tap Instant Account Balance Privacy Eye Toggle",
      "Streamlined Biometric Login & Security Onboarding Flow",
    ],
    headline: "High-Clarity Personal Banking and Instant P2P Transfer Experience",
    summary:
      "A 48-hour mobile banking redesign for Raven, modernizing the personal banking dashboard, clarifying balance management, and eliminating friction during P2P transfers.",
    accentColor: "#A9DDF0",
    featured: true,
    featuredOrder: 9,
    tags: ["Fintech", "Mobile Banking", "Design Sprint", "P2P Transfers"],
    heroImage: "/images/projects/raven-bank/hero-opt.webp",
    gallery: [
      {
        src: "/images/projects/raven-bank/hero-opt.webp",
        caption: "Raven Bank redesign hero: modernized security onboarding, high-contrast personal account dashboard (BestStar MFB), and modular financial cards.",
        alt: "Raven Bank Redesign Hero Overview",
      },
      {
        src: "/images/projects/raven-bank/problem-solution-opt.webp",
        caption: "Sprint objectives: replacing cluttered legacy navigation with clear financial controls, intuitive balance visibility, and instant transfers.",
        alt: "Raven Bank Problem & Solution Framework",
      },
      {
        src: "/images/projects/raven-bank/onboarding-flow.png",
        caption: "High-trust security onboarding: biometric login verification, account security badges, and clear privacy protections.",
        alt: "Raven Bank Onboarding & Security Screens",
      },
      {
        src: "/images/projects/raven-bank/transfer-screens.png",
        caption: "Streamlined money transfer workflow: quick beneficiary shortcuts (Kola, Sophia, Donald), instant amount entry, and receipt cards.",
        alt: "Raven Bank Transfer Workflow Screens",
      },
      {
        src: "/images/projects/raven-bank/dashboard-cards.png",
        caption: "Modular financial cards: one-tap access to airtime, utility bills, data bundles, and recent transfer logs.",
        alt: "Raven Bank Modular Financial Cards",
      },
    ],
    problemStatement: {
      context:
        "Mobile neobanking adoption in Nigeria is among the highest in the world, with digital banks competing to become the primary daily transaction account for young digital natives.",
      friction:
        "The legacy banking interface had accumulated visual bloat—aggressive promotional loan banners, cluttered navigation drawers, and multi-step transfer confirmation screens that made everyday banking stressful.",
      impact:
        "Transfer anxiety, accidental errors when selecting beneficiaries, and acute privacy concerns when viewing account balances in public transit or busy environments.",
    },
    overview:
      "Created as an intensive 48-hour design challenge, this project reimagines the core Raven neobanking mobile experience. The redesign focuses ruthlessly on the two primary jobs users perform every single day: checking their balance safely and sending money to frequent contacts without friction. The result is a high-trust, uncluttered financial interface that feels fast and reliable.",
    challenge:
      "Executing an end-to-end banking dashboard overhaul within a strict 48-hour sprint without cutting corners on visual polish, security compliance, or usability testing.",
    solution:
      "Prioritized core jobs-to-be-done: engineered instant frequent-recipient avatar chips directly below the balance card, integrated an instant one-tap balance privacy mask, and anchored institutional trust with clear MFB regulatory badges.",
    discoveryInsights: [
      {
        title: "80% of Sessions Involve Only Two Core Actions",
        description:
          "Observation: Analytics on daily neobanking show users open the app primarily to check their balance or send money to peer contacts. Everything else is secondary.",
        type: "observation",
      },
      {
        title: "Public Balance Anxiety Is Acute",
        description:
          "Constraint: Users in crowded environments (buses, cafes, shared offices) tilt their screens to hide balance figures from prying eyes. Privacy controls must be immediate.",
        type: "constraint",
      },
      {
        title: "Frequent Beneficiaries Deserve Prime Real Estate",
        description:
          "Insight: Most transfers go to a small group of repeat contacts (family, landlord, colleagues). Forcing users through multi-step beneficiary lists creates needless friction.",
        type: "insight",
      },
    ],
    designDecisions: [
      {
        title: "Frequent Recipient Avatar Chips Below Balance",
        rationale:
          "Positioned instant avatar shortcuts (Kola, Sophia, Donald) directly under the balance card, reducing transfer flows from 5 screens down to 2 taps.",
        tradeOff:
          "Limits initial visible contacts to the top 4 frequent recipients before expanding.",
      },
      {
        title: "One-Tap Balance Privacy Eye Toggle",
        rationale:
          "Allows users to instantly mask their balance with bullet dots directly on the home card without navigating into settings.",
        tradeOff:
          "Takes a small touch target area on the main balance card.",
      },
      {
        title: "Prominent Institutional Trust Anchoring (BestStar MFB / CBN)",
        rationale:
          "Maintained clear regulatory banking compliance badges to reinforce institutional security and FDIC/NDIC backing.",
        tradeOff:
          "Allocates header space to regulatory information.",
      },
    ],
    coreWorkflows: [
      {
        title: "Biometric Dashboard Access with Balance Privacy",
        steps: [
          "User unlocks app instantly with Face ID or fingerprint.",
          "Dashboard opens with balance masked by default or reveals balance with one tap on the eye icon.",
        ],
        outcome: "Immediate financial situational awareness with total privacy.",
      },
      {
        title: "2-Tap P2P Avatar Transfer",
        steps: [
          "User taps familiar contact avatar chip (e.g., Kola).",
          "Enters amount with real-time fee transparency (₦0.00 fee); confirms with biometrics.",
        ],
        outcome: "Transfer executed in under 10 seconds with zero recipient typing errors.",
      },
      {
        title: "Quick Lifestyle & Utility Payments",
        steps: [
          "Swipes horizontal action tiles for instant airtime, electricity, or internet data bundles.",
          "Receipt generated with one-tap export to WhatsApp or image gallery.",
        ],
        outcome: "Effortless utility management with verified digital proof.",
      },
    ],
    systemHighlights: [
      {
        title: "Personal Account Command Dashboard",
        description:
          "Modernized financial card with one-tap balance privacy mask and rapid utility actions.",
      },
      {
        title: "Quick-Action Beneficiary Chips",
        description:
          "Horizontal recipient avatar carousel reducing money transfers to two effortless taps.",
      },
      {
        title: "Biometric Security Onboarding",
        description:
          "Streamlined authentication flow reinforcing CBN and MFB regulatory protections.",
      },
    ],
    validation: {
      methodology:
        "Rapid peer critique sessions, time-to-transfer benchmark testing against the legacy Raven app UI, and heuristic evaluation of banking error states.",
      feedbackSummary:
        "The first iteration omitted the account number copy button on the home card, forcing users into profile settings to copy their account details.",
      iterationsMade: [
        "Added a subtle one-tap 'Copy Account Number' pill directly beside the balance card with tactile feedback.",
        "Redesigned transfer receipt cards to be easily shareable via WhatsApp or Instagram DMs.",
        "Enhanced numerical keypad size on mobile viewports for one-thumb amount entry.",
      ],
      limitationsAcknowledged:
        "Advanced investment portfolios, multi-currency wallets, and business accounts were intentionally excluded to maintain strict sprint focus on personal banking essentials.",
    },
    outcomes: {
      deliverablesSummary:
        "10 high-fidelity mobile screens in Figma, biometric onboarding flow, rapid transfer micro-interactions, and complete case study published on Behance.",
      keyLearnings: [
        "Extreme time constraints force ruthless prioritization. By focusing strictly on the two core jobs-to-be-done, the resulting banking interface felt 10x faster, calmer, and more reliable.",
        "Visual hierarchy and contrast are critical in fintech—users must feel 100% confident before confirming financial movements.",
      ],
      futureImprovements: [
        "Smart bill splitting integrated directly into the peer recipient transfer flow.",
      ],
    },
    specifications: [
      { label: "Platform", value: "Mobile Banking (iOS & Android Specs)" },
      { label: "Scope", value: "10 Modular High-Fidelity Screens" },
      { label: "Challenge Format", value: "2-Day Intensive Redesign Challenge (48 Hours)" },
      { label: "Credit", value: "Abolarin, Taye Joseph (@cold_designer)" },
      { label: "Tools", value: "Figma, Figjam, Google Meet" },
    ],
    prototypeUrl: "https://www.behance.net/gallery/221018589/Fintech-Application-Raven-Bank-App-A-Case-Study",
    wireframeSummary:
      "Header with notification badges, central balance capsule, horizontal beneficiary carousel, and quick utility tiles.",
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

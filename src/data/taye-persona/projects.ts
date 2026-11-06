/**
 * ASK COLD 2.0 — PORTFOLIO PROJECTS DOSSIER
 * Category F: Complete, verified documentation of every approved project in Taye's portfolio.
 * Includes what the project is, why it exists, problem addressed, actual role,
 * decisions, challenges, tools, learnings, and current status.
 */

export interface DetailedProjectKnowledge {
  slug: string;
  title: string;
  client: string;
  type: "Employment" | "Client / Freelance" | "Concept / Lab Exploration";
  category: string;
  year: string;
  role: string;
  timeline: string;
  headline: string;
  summary: string;
  whyItExists: string;
  problemAddressed: string;
  myContribution: string[];
  keyDesignDecisions: string[];
  challengesEncountered: string;
  toolsAndTech: string[];
  keyLearnings: string;
  status: string;
  caseStudyUrl: string;
  prototypeUrl?: string;
  githubUrl?: string;
}

export const TAYE_PROJECTS: DetailedProjectKnowledge[] = [
  {
    slug: "spot",
    title: "Spot",
    client: "Spot Creative Technologies",
    type: "Client / Freelance",
    category: "SaaS & Collaborative Productivity",
    year: "2024",
    role: "Lead Product Designer",
    timeline: "8-Week Cross-Functional Design Sprint",
    headline: "Visual Collaboration Workspace with Pinned Spatial Critique and Live Multiplayer Cursors",
    summary:
      "A creative review workspace allowing distributed teams to leave pinned, contextual comments directly on interactive web and mobile prototypes.",
    whyItExists:
      "Creative teams waste hours deciphering vague email feedback like 'make that button on page 3 bigger'. Spot replaces fragmented comments with precise spatial critique pinned directly to the exact pixel.",
    problemAddressed:
      "Feedback fragmentation across Slack, email threads, and PDFs causes context loss, repeated design revisions, and missed launch deadlines.",
    myContribution: [
      "Directed an 8-week cross-functional team (1 Product Manager, 2 Frontend Engineers, and 2 Designers).",
      "Architected the end-to-end user experience across 30+ responsive high-fidelity screens.",
      "Designed the pinned spatial commenting engine, multiplayer presence indicators, and threaded resolution drawers.",
      "Established the core design system and token taxonomy in Figma for clean React engineering handoff.",
    ],
    keyDesignDecisions: [
      "Chose a floating contextual comment pin rather than a rigid sidebar list so feedback never loses spatial context.",
      "Designed high-contrast cursor badges showing avatar presence to make collaboration feel active and energetic.",
      "Integrated keyboard shortcuts (C for comment, V for pointer) matching Figma mental models for zero onboarding friction.",
    ],
    challengesEncountered:
      "Balancing high screen density (infinite canvas, comments, layer inspector) without overwhelming non-technical reviewers or lagging during multiplayer sessions.",
    toolsAndTech: ["Figma", "Figjam", "Grain", "Slack", "Next.js & WebSocket specs"],
    keyLearnings:
      "Leading a cross-functional squad taught me that the best design system is the one engineers love to use. Writing clear component states upfront prevented hundreds of hours of rework.",
    status: "Case study published; prototype architecture finalized.",
    caseStudyUrl: "/work/spot",
    prototypeUrl: "https://www.behance.net/gallery/198428581/Spot-Redefining-Creative-Feedback",
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
    headline: "Integrated Organizational HRMS and Employee Self-Service Portal",
    summary:
      "An enterprise human resource management platform uniting administrative attendance tracking, automated clock-in, predictive attrition analytics, and mobile self-service.",
    whyItExists:
      "Mid-sized organizations struggle with workforce management scattered across disconnected spreadsheets, paper attendance binders, and siloed payroll tools.",
    problemAddressed:
      "HR managers waste days manually reconciling timecards, while leadership has zero early warning signals when employee burnout and turnover spike.",
    myContribution: [
      "Architected 37 high-resolution modular dashboard screens and a multi-persona permission model.",
      "Designed the Employee Self-Service (ESS) mobile companion for one-tap attendance and leave requests.",
      "Crafted predictive retention and attrition trend charts helping leadership proactively address turnover.",
      "Built a comprehensive enterprise design system with robust data table ergonomics.",
    ],
    keyDesignDecisions: [
      "Separated the system into dual personas: high-density administrative desktop for HR leaders, and lightweight one-tap mobile for frontline staff.",
      "Created a unified attendance ledger distinguishing on-time arrivals, lateness, absences, and approved leaves with automatic shift reconciliation.",
      "Designed predictive retention signals that flag turnover risk before resignation letters land on desks.",
    ],
    challengesEncountered:
      "Displaying massive tables of employee data (attendance, payroll, departmental KPIs) without inducing visual fatigue or confusing non-technical department leads.",
    toolsAndTech: ["Figma", "Google Forms", "Grain", "Teams", "Google Docs"],
    keyLearnings:
      "Enterprise software doesn't have to look dry and depressing. Applying modern typography, subtle borders, and thoughtful whitespace makes enterprise software a pleasure to operate.",
    status: "Case study live on Behance and Cold Designer portfolio.",
    caseStudyUrl: "/work/profile",
    prototypeUrl: "https://www.behance.net/gallery/222769651/PROfile-An-Organizational-HRM-Solution",
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
    headline: "Smart Meal Planning and Automated Grocery Companion for Busy Lifestyles",
    summary:
      "A consumer mobile app empowering young adults and students to eat healthy on a budget with personalized 20-minute recipes, smart pantry matching, and automated grocery lists.",
    whyItExists:
      "Young professionals and students frequently default to expensive takeout or waste food because meal planning feels intimidating and time-consuming.",
    problemAddressed:
      "Lack of cooking confidence, strict grocery budgets, and tight schedules result in poor nutrition and financial leakage.",
    myContribution: [
      "Delivered a comprehensive mobile application across 45 presentation boards.",
      "Engineered an interactive 7-day weekly meal matrix with drag-and-drop recipe swaps.",
      "Designed a smart pantry matching workflow that suggests meals using ingredients already at home.",
      "Built a complete dual-theme design system (light & dark modes) with semantic color tokens.",
    ],
    keyDesignDecisions: [
      "Built the entire recipe catalog around a strict 'under 20 minutes' filter to eliminate meal-prep intimidation.",
      "Organized auto-generated grocery checklists by supermarket aisle to drastically reduce shopping time.",
      "Provided native dual light and dark themes so users can plan meals comfortably in any ambient lighting.",
    ],
    challengesEncountered:
      "Making nutrition and recipe planning feel lightweight and rewarding rather than restrictive or like a calorie-counting chore.",
    toolsAndTech: ["Figma", "Google Docs", "Google Forms", "Slack", "Google Meet"],
    keyLearnings:
      "Consumer mobile UX thrives on small moments of delight—like checking off an ingredient and seeing the recipe readiness score update in real time.",
    status: "Featured case study published on Behance.",
    caseStudyUrl: "/work/quickeats",
    prototypeUrl: "https://www.behance.net/gallery/218767855/Meal-Prepping-Mobile-App-A-Case-Study",
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
    headline: "High-Clarity Personal Banking and Instant P2P Transfer Experience",
    summary:
      "A 48-hour mobile banking redesign for Raven, modernizing the personal banking dashboard, clarifying balance management, and eliminating friction during P2P transfers.",
    whyItExists:
      "In fast-paced African fintech environments, users demand immediate clarity on account balances and zero anxiety when sending money.",
    problemAddressed:
      "Legacy mobile banking interfaces are often cluttered with competing promotional banners, confusing balance disclosures, and multi-step transfer confirmation screens.",
    myContribution: [
      "Redesigned the core personal banking dashboard across 10 modular high-fidelity screens.",
      "Engineered single-tap beneficiary avatar chips on the home dashboard for instant transfers.",
      "Created a high-contrast balance hero with an instant privacy eye-toggle.",
      "Streamlined biometric security and login onboarding into a trustworthy, modern sequence.",
    ],
    keyDesignDecisions: [
      "Placed frequent recipient chips (e.g. Kola, Sophia, Donald) directly below the balance card, reducing transfer friction from 5 clicks to 2.",
      "Integrated an instant privacy toggle so users in public spaces can hide their account balance with one tap.",
      "Retained strict MFB (Microfinance Bank) compliance and verification badges for institutional trust.",
    ],
    challengesEncountered:
      "Condensing an entire banking redesign into a 48-hour sprint without cutting corners on visual polish or usability testing.",
    toolsAndTech: ["Figma", "Figjam", "Google Meet"],
    keyLearnings:
      "Time constraints force ruthless prioritization. By focusing on the two core jobs-to-be-done—checking balance and sending money—the entire product became dramatically cleaner.",
    status: "Published case study on Behance.",
    caseStudyUrl: "/work/raven-bank",
    prototypeUrl: "https://www.behance.net/gallery/221018589/Fintech-Application-Raven-Bank-App-A-Case-Study",
  },
  {
    slug: "medesy",
    title: "MEDesy Solution",
    client: "Medesy Technologies",
    type: "Employment",
    category: "Healthcare & Conversational UI",
    year: "2024",
    role: "Product Designer",
    timeline: "Employment Engagement",
    headline: "Structured WhatsApp-First Triage Gateway Connecting Patients to Licensed Physicians",
    summary:
      "A conversational healthcare platform providing patient triage and licensed doctor consultations directly over WhatsApp — eliminating waiting room delays and app download barriers.",
    whyItExists:
      "Accessing qualified medical consultations in Nigeria often involves long clinic queues, costly travel, and intimidating paperwork. Patients need immediate, trustworthy guidance from home.",
    problemAddressed:
      "Forcing patients in distress to download a large app creates high drop-off. Patients need triage in channels they already trust, while physicians need structured clinical summaries.",
    myContribution: [
      "Architected the 3-step WhatsApp conversational triage flow from symptom intake to physician assignment.",
      "Designed the responsive web service gateway highlighting verified doctor credentials and clinic partners.",
      "Created the design system and UI library ensuring consistent clinical touchpoints across mobile and web.",
      "Collaborated with clinical staff to translate medical triage protocols into plain, humane language.",
    ],
    keyDesignDecisions: [
      "Decided to build on WhatsApp rather than native app-only, ensuring accessibility across low-bandwidth connections and all smartphones.",
      "Used clear conversational chips rather than open-ended text to help patients describe symptoms accurately without medical confusion.",
      "Designed structured physician summary cards so doctors can review the triage context in under 30 seconds before calling.",
    ],
    challengesEncountered:
      "Designing for high-stress emotional moments where patients are anxious or unwell; language had to be calm, empathetic, and unambiguous.",
    toolsAndTech: ["Figma", "WhatsApp Flow Architecture", "Figjam", "Google Docs"],
    keyLearnings:
      "In healthcare, trust is everything. Meeting users where they already feel comfortable (WhatsApp) removes friction that no slick native app could ever solve.",
    status: "Active production platform.",
    caseStudyUrl: "/work/medesy",
    prototypeUrl: "https://www.figma.com/design/Vl1qsoE22hQjt8oEXZubja/Medesy-2?m=auto&t=jglC0OFhMaDeX2tP-6",
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
    headline: "Intercity Transit Booking and Terminal Hub Logistics for Regional Commuters",
    summary:
      "An intercity transit booking application for travelers moving between regional transport hubs and bus terminals across Nigeria, offering seat selection and digital QR boarding passes.",
    whyItExists:
      "Intercity travel booking in Nigeria historically required physical visits to chaotic bus parks with opaque pricing and uncertain departure times.",
    problemAddressed:
      "Commuters faced long ticket counter queues, cash-only payment risks, and uncertainty about bus departure schedules.",
    myContribution: [
      "Designed the complete terminal-to-terminal route discovery and hub selector experience.",
      "Engineered an interactive bus seat selection map with luggage allowance indicators.",
      "Designed high-contrast digital boarding passes with QR codes optimized for fast gate scanning.",
      "Delivered production-ready Figma specs and click-through prototypes for mobile engineering teams.",
    ],
    keyDesignDecisions: [
      "Organized search around verified terminal hubs rather than generic GPS coordinates so users know exactly which park to report to.",
      "Designed high-contrast, offline-accessible boarding passes so travelers aren't stranded if mobile data drops at the terminal.",
      "Provided upfront, itemized fare breakdowns including terminal fees and luggage allotments.",
    ],
    challengesEncountered:
      "Accommodating varying coach seat configurations (14-seater buses, luxury coaches, shuttle vans) in one cohesive mobile interface.",
    toolsAndTech: ["Figma", "Figjam", "Interactive Mobile Prototyping"],
    keyLearnings:
      "Mobility apps must design for the worst-case scenario: low battery, poor terminal connectivity, and bright outdoor glare.",
    status: "Case study live on portfolio.",
    caseStudyUrl: "/work/9jatrip",
    prototypeUrl: "https://www.figma.com/design/QPyY4HiyEc40yQk5609OMG/9jaTrip?node-id=0-1&p=f&t=Mm09Z82YdZ3Is25i-0",
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
    headline: "Atmospheric Spatial Reservation Interface Translating Architectural Daylight and Calm",
    summary:
      "An editorial reservation concept translating architectural daylight transitions, suite spatial layouts, and calm curation into digital hospitality.",
    whyItExists:
      "Modern hotel booking websites are overcrowded with urgency banners, pop-ups, and flashing discounts that ruin the sense of relaxation before a trip even begins.",
    problemAddressed:
      "Standard booking engines fail to communicate architectural space, natural lighting, or the tranquility of high-end boutique properties.",
    myContribution: [
      "Architected an atmospheric daylight shift engine where the interface visual tone shifts from dawn to twilight.",
      "Designed floor plan exploration maps showing sun exposure, suite aspect, and terrace layouts.",
      "Crafted an editorial reservation flow prioritizing tranquility and unhurried decision-making.",
    ],
    keyDesignDecisions: [
      "Eliminated aggressive urgency tactics (e.g. 'Only 1 room left!') in favor of generous whitespace and architectural photography.",
      "Integrated subtle daylight transitions that reflect the actual ambient light at the hotel property.",
    ],
    challengesEncountered:
      "Conveying 3D architectural calm on a flat 2D viewport while maintaining quick, frictionless room booking.",
    toolsAndTech: ["Figma", "Next.js", "Tailwind CSS", "Motion"],
    keyLearnings:
      "Digital interfaces can evoke genuine emotional atmosphere when pacing, typography, and imagery are harmonized.",
    status: "Lab prototype showcased on portfolio.",
    caseStudyUrl: "/work/somewhere-hotel",
  },
  {
    slug: "buybuddy",
    title: "BuyBuddy",
    client: "BuyBuddy Commerce",
    type: "Concept / Lab Exploration",
    category: "Social Commerce & Instant Stores",
    year: "2024",
    role: "Product Designer",
    timeline: "Mobile Exploration",
    headline: "Social Micro-Commerce and Instant Digital Storefronts for Community Merchants",
    summary:
      "A lightweight mobile commerce platform empowering informal social sellers to turn WhatsApp and Instagram catalogs into instant, checkout-ready storefronts.",
    whyItExists:
      "Millions of small merchants sell via social DM threads where tracking orders, calculating totals, and managing inventory in chat histories is chaotic.",
    problemAddressed:
      "Manual bank transfer screenshots, missed customer orders, and lack of inventory tracking cause constant friction for independent sellers.",
    myContribution: [
      "Designed instant 60-second store setup flows without complex e-commerce jargon.",
      "Created a streamlined buyer checkout experience with one-tap WhatsApp order dispatch.",
      "Designed inventory tracking and payment status ledgers for merchant owners on mobile.",
    ],
    keyDesignDecisions: [
      "Allowed shoppers to complete purchases without creating an account or remembering passwords.",
      "Auto-generated structured WhatsApp order receipts for merchants to confirm dispatch instantly.",
    ],
    challengesEncountered:
      "Keeping the interface so simple that a non-technical vendor can set up an entire store directly from their phone in minutes.",
    toolsAndTech: ["Figma", "Mobile UI Design", "Micro-Commerce Systems"],
    keyLearnings:
      "Informal commerce works best when you augment existing merchant behaviors rather than attempting to force Silicon Valley enterprise tooling on them.",
    status: "Case study live on portfolio.",
    caseStudyUrl: "/work/buybuddy",
  },
  {
    slug: "stillwater",
    title: "Stillwater Hall",
    client: "Stillwater Cultural Foundation",
    type: "Concept / Lab Exploration",
    category: "Cultural & Spatial Architecture",
    year: "2024",
    role: "Visual & Interaction Designer",
    timeline: "Editorial Web Exploration",
    headline: "Cinematic Digital Experience for an Architectural Concert Hall",
    summary:
      "An architectural web experience choreographing the arrival sequence, acoustic properties, and performance calendar of a modern cultural venue.",
    whyItExists:
      "Cultural venues rarely communicate the acoustic majesty and architectural discipline of their spaces through their web presences.",
    problemAddressed:
      "Generic event ticketing sites treat architectural spaces as flat commodity seat maps without sensory presence.",
    myContribution: [
      "Choreographed sequential scrollytelling sequences exploring Tadao Ando-inspired concrete geometry.",
      "Designed interactive acoustic section views illustrating sound dispersion across auditorium tiers.",
      "Built an intuitive performance calendar and seat selection experience with stage-line sightlines.",
    ],
    keyDesignDecisions: [
      "Used austere monochromes and deep blacks to echo concrete surfaces and warm stage lighting.",
      "Structured arrival sequences chronologically: exterior approach, grand foyer, acoustic auditorium.",
    ],
    challengesEncountered:
      "Translating architectural majesty into responsive web views without causing layout reflows or heavy asset bloat.",
    toolsAndTech: ["Figma", "GSAP ScrollTrigger", "Lenis", "Next.js"],
    keyLearnings:
      "Whitespace in digital design operates exactly like acoustic silence in music: it gives power to what comes next.",
    status: "Featured editorial project on Cold Designer portfolio.",
    caseStudyUrl: "/work/stillwater",
  },
  {
    slug: "greall-website",
    title: "Greall Technologies",
    client: "Greall Technologies",
    type: "Employment",
    category: "Corporate Fintech & Brand Identity",
    year: "2023",
    role: "Product Designer",
    timeline: "Employment Engagement",
    headline: "Corporate Brand Identity and Responsive Web Architecture for an African Fintech",
    summary:
      "A complete brand refresh and responsive corporate web architecture overhaul for Greall Technologies, establishing high-trust credibility for institutional cross-border finance.",
    whyItExists:
      "Emerging fintech platforms require rock-solid visual trust and clear product communication to win institutional banking and enterprise clients.",
    problemAddressed:
      "An outdated web presence was failing to communicate Greall's modern multi-currency rails and technical infrastructure capabilities.",
    myContribution: [
      "Art-directed a modern corporate visual identity system with disciplined typography and balanced contrast.",
      "Designed and delivered the responsive corporate website across desktop, tablet, and mobile viewports.",
      "Created structured service pillars explaining multi-currency wallets, foreign exchange, and API solutions.",
    ],
    keyDesignDecisions: [
      "Structured product capabilities into clear technical pillars rather than vague marketing slogans.",
      "Built with high-contrast neo-grotesque typography to reinforce security, speed, and institutional reliability.",
    ],
    challengesEncountered:
      "Aligning cross-border regulatory disclosures and complex multi-currency capabilities into an easy-to-digest layout.",
    toolsAndTech: ["Figma", "Adobe Photoshop", "Responsive Web Design"],
    keyLearnings:
      "In B2B fintech, visual discipline is a competitive advantage. Corporate clients equate visual clarity with technical security.",
    status: "Shipped in production.",
    caseStudyUrl: "/work/greall-website",
  },
  {
    slug: "will",
    title: "Will",
    client: "Will Legacy Platform",
    type: "Concept / Lab Exploration",
    category: "Fintech & Estate Planning",
    year: "2023",
    role: "Product Designer",
    timeline: "Product Architecture Exploration",
    headline: "Digital Estate Planning and Asset Allocation Platform for Modern Families",
    summary:
      "An intuitive digital legacy platform enabling users to organize, allocate, and securely transfer digital and physical assets to trusted beneficiaries.",
    whyItExists:
      "Estate planning is traditionally complicated, expensive, and emotionally avoided, leaving families vulnerable during critical life transitions.",
    problemAddressed:
      "Most people never document their asset allocation or digital accounts because legal estate tools are cumbersome and intimidating.",
    myContribution: [
      "Designed an empathetic, step-by-step estate allocation wizard broken into digestible milestones.",
      "Engineered beneficiary assignment flows with clear percentage splits and contingency plans.",
      "Designed emergency document vaults with biometric access and multi-signature release triggers.",
    ],
    keyDesignDecisions: [
      "Replaced legalistic jargon with clear, human terminology (e.g. 'Trusted People' instead of 'Testamentary Nominees').",
      "Created visual pie-chart allocation sliders so users can see 100% asset distribution clearly without math errors.",
    ],
    challengesEncountered:
      "Handling the sensitive emotional nature of mortality while maintaining strict legal accuracy and security protocols.",
    toolsAndTech: ["Figma", "Figjam", "UX Research"],
    keyLearnings:
      "When designing for emotionally vulnerable moments, software must feel warm, steady, and completely unhurried.",
    status: "Case study published on portfolio.",
    caseStudyUrl: "/work/will",
  },
  {
    slug: "agrivillage",
    title: "AgriVillage",
    client: "AgriVillage Agriculture",
    type: "Concept / Lab Exploration",
    category: "AgriTech & Supply Chain",
    year: "2023",
    role: "Product Designer",
    timeline: "Concept Exploration",
    headline: "Agricultural Supply Chain and Farmer Cooperative Marketplace",
    summary:
      "A digital agricultural marketplace connecting smallholder farmers with wholesale food buyers, reducing post-harvest losses and guaranteeing transparent farmgate pricing.",
    whyItExists:
      "Agricultural middlemen in developing economies frequently exploit smallholder farmers with opaque pricing, while urban food buyers face unreliable supplies.",
    problemAddressed:
      "Farmers lose up to 40% of their harvest due to delayed market access, lack of cold-chain visibility, and payment disputes.",
    myContribution: [
      "Designed an ultra-simple mobile produce listing interface optimized for rural smartphone users.",
      "Crafted wholesale buyer dashboards with batch quality verification and delivery tracking.",
      "Designed secure escrow milestone payment flows protecting both rural farmers and commercial aggregators.",
    ],
    keyDesignDecisions: [
      "Used large tactile touch targets and visual crop icons so farmers with low literacy can list harvests effortlessly.",
      "Designed upfront transparent market pricing tickers showing live regional commodity rates.",
    ],
    challengesEncountered:
      "Designing for low-spec Android devices operating on slow 2G/3G network connections in rural communities.",
    toolsAndTech: ["Figma", "Mobile UX", "Accessibility Guidelines"],
    keyLearnings:
      "Designing for emerging markets requires stripping away all vanity UI to focus 100% on bandwidth efficiency and legibility under direct sunlight.",
    status: "Case study published on portfolio.",
    caseStudyUrl: "/work/agrivillage",
  },
  {
    slug: "nova-wellness",
    title: "Nova Wellness",
    client: "Self-Initiated Concept & Engineering",
    type: "Concept / Lab Exploration",
    category: "Mobile Health & Supportive Companion",
    year: "2024",
    role: "Product Designer & React Native Developer",
    timeline: "Mobile Exploration",
    headline: "Supportive Daily Wellness Companion with Voice Journaling and Gemini AI",
    summary:
      "A React Native mobile application built with Expo SDK 57, offering mindful mood check-ins, AssemblyAI voice transcription, reflective conversation via Gemini, and private on-device data storage.",
    whyItExists:
      "Modern mental health apps often feel clinical, punitive, or gamified with streak counters that cause anxiety rather than relieve it.",
    problemAddressed:
      "Users need a private, calm space to reflect without invasive telemetry, public social sharing, or unwanted medical diagnoses.",
    myContribution: [
      "Designed the complete mobile interface with calm typography and tactile bottom sheets.",
      "Implemented the React Native application using Expo SDK 57, TypeScript, and Reanimated.",
      "Integrated AssemblyAI voice-to-text recording with editable transcription previews.",
      "Engineered contextual Gemini AI prompts providing supportive reflection without clinical claims.",
      "Implemented strict on-device local persistence ensuring personal journal entries never leave the phone.",
    ],
    keyDesignDecisions: [
      "Deliberately omitted streak counters and push-notification guilt to cultivate calm, mindful usage.",
      "Built on-device data persistence so personal thoughts remain 100% private.",
      "Made AI reflection an intentional, opt-in action rather than an intrusive pop-up chatbot.",
    ],
    challengesEncountered:
      "Handling audio recording and stream transcription smoothly on both iOS and Android within React Native Expo.",
    toolsAndTech: ["React Native", "Expo SDK 57", "TypeScript", "Gemini Developer API", "AssemblyAI", "Figma"],
    keyLearnings:
      "Writing production mobile code as a designer gives you immense empathy for engineering constraints and makes you a 10x better design systems architect.",
    status: "Open-source repository on GitHub (github.com/Bheemty/nova-wellness).",
    caseStudyUrl: "/lab",
    githubUrl: "https://github.com/Bheemty/nova-wellness",
  },
];

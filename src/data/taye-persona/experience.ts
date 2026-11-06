/**
 * ASK COLD 2.0 — PROFESSIONAL EXPERIENCE & EMPLOYMENT
 * Category E: Employment history, roles, responsibilities, and confidentiality rules.
 */

export interface ExperienceRecord {
  company: string;
  role: string;
  period: string;
  type: "Employment" | "Independent Studio Practice" | "Client Contract";
  location: string;
  summary: string;
  responsibilities: string[];
  achievements: string[];
  confidentialityNotice?: string;
}

export const TAYE_EXPERIENCE: {
  overview: string;
  records: ExperienceRecord[];
  confidentialityPolicy: string;
} = {
  overview:
    "My professional experience combines formal in-house roles at technology companies with independent studio leadership on multi-platform client engagements. I've designed for healthtech in Nigeria, fintech ecosystems, enterprise SaaS, and consumer mobile platforms.",
  records: [
    {
      company: "Medesy Technologies",
      role: "Product Designer",
      period: "2024 — Present",
      type: "Employment",
      location: "Nigeria / Remote",
      summary:
        "Designed the product architecture and conversational UX for a WhatsApp-first telehealth platform connecting patients with licensed Nigerian physicians, removing app download friction and clinic waiting room delays.",
      responsibilities: [
        "Architected conversational triage decision trees on WhatsApp for rapid symptom articulation without clinical jargon.",
        "Designed the web service gateway, doctor referral guidance, and post-consultation prescription summary flows.",
        "Built the centralized MEDesy Figma design system and component kit across web and mobile viewports.",
        "Collaborated with clinical advisors to ensure medical triage questions followed safety and privacy protocols.",
      ],
      achievements: [
        "Created an intuitive 3-step triage pathway: chat initiation, specialist matching, and consultation handoff.",
        "Eliminated the 80MB+ app installation barrier by keeping episodic consultations inside WhatsApp.",
      ],
      confidentialityNotice:
        "Proprietary physician credential verification mechanisms, internal patient triage algorithms, and commercial partner agreements are kept strictly confidential.",
    },
    {
      company: "Greall Technologies",
      role: "Product Designer",
      period: "2023 — 2024",
      type: "Employment",
      location: "Nigeria / Remote",
      summary:
        "Led the complete corporate brand identity evolution and responsive web architecture overhaul for Greall Technologies, communicating fintech credibility and cross-border capabilities.",
      responsibilities: [
        "Art-directed a modern brand visual system with clean typography and semantic color hierarchy.",
        "Rebuilt the responsive corporate website optimized for institutional partner evaluation across desktop and mobile devices.",
        "Collaborated on digital product architectures, multi-currency transaction flows, and cross-platform design guidelines.",
      ],
      achievements: [
        "Delivered a unified, high-trust digital presence that elevated partner engagement and institutional credibility.",
        "Standardized UI guidelines across multi-currency fintech touchpoints.",
      ],
      confidentialityNotice:
        "Specific banking partner fee structures, internal currency swap algorithms, and institutional contract amounts remain confidential.",
    },
    {
      company: "Cold Designer Studio",
      role: "Lead Product Designer & Design Technologist",
      period: "2023 — Present",
      type: "Independent Studio Practice",
      location: "Lagos, Nigeria (Global Remote)",
      summary:
        "Independent studio practice leading end-to-end product architecture, mobile app design, design systems, and frontend prototypes for founders, startups, and product teams internationally.",
      responsibilities: [
        "Leading cross-functional design sprints from discovery through wireframing, high-fidelity UI, and developer handoff.",
        "Architecting complex enterprise SaaS tools (Spot, PROfile) with high-density data visualizations.",
        "Designing native mobile applications for consumer and fintech domains (QuickEats, Raven Bank, 9jaTrip).",
        "Writing production frontend code (Next.js, TypeScript, Tailwind, Motion) to ensure high design-to-engineering parity.",
      ],
      achievements: [
        "Directed an 8-week cross-functional team (PM, 2 frontend engineers, 2 designers) as Lead Product Designer on Spot, producing 30+ screens with pinned spatial critique.",
        "Designed PROfile enterprise HRMS: 37 high-resolution modules, predictive attrition analytics, and mobile self-service.",
        "Designed QuickEats consumer mobile app: 45 presentation boards, 20-minute recipe generator, dual light/dark themes.",
        "Delivered Raven Bank's mobile redesign in a focused 48-hour sprint featuring 1-tap beneficiary transfers.",
      ],
    },
  ],
  confidentialityPolicy:
    "I believe in radical transparency about my design process, problem-solving methods, and technical decisions. At the same time, I strictly honor client NDAs: I do not fabricate or disclose private revenue numbers, unannounced client names, proprietary clinical data, or confidential backend infrastructure.",
};

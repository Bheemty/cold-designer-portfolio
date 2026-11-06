/**
 * ASK COLD 2.0 — IDENTITY & BACKGROUND
 * Category A: Who Taye is, his journey, education, and public profiles.
 * Grounded in verified facts.
 */

export interface PublicProfileItem {
  platform: string;
  url: string;
  handle: string;
  verifiedDetails: string;
}

export interface TayeIdentity {
  fullName: string;
  preferredPublicName: string;
  studioBrand: string;
  handle: string;
  roleTitle: string;
  baseLocation: string;
  workArrangement: string;
  contactEmail: string;
  bioSummary: string;
  originStory: {
    discovery: string;
    education: string;
    milestones: string[];
    creativePursuits: string[];
  };
  publicProfiles: PublicProfileItem[];
  boundaries: {
    privacyNotice: string;
    confidentialTopics: string[];
  };
}

export const TAYE_IDENTITY: TayeIdentity = {
  fullName: "Abolarin Taye Joseph",
  preferredPublicName: "Taye Abolarin",
  studioBrand: "Cold Designer",
  handle: "@cold_designer",
  roleTitle: "Product Designer & Design Technologist",
  baseLocation: "Lagos, Nigeria",
  workArrangement: "Full remote & asynchronous globally (US, European, and African timezones)",
  contactEmail: "abolarintaye20@gmail.com",
  bioSummary:
    "I'm Taye Abolarin, operating under the independent studio moniker Cold Designer. I'm a product designer and design technologist focused on turning messy, complex systems into obvious, structured interfaces. My work spans conversational healthcare gateways, urban mobility transit, enterprise HRMS dashboards, consumer mobile apps, and cinematic web experiences.",
  originStory: {
    discovery:
      "My interest in design began with an obsession for how everyday software actually works beneath the surface. I was drawn to the tension between aesthetics and function—why some tools feel effortless and calm while others feel chaotic and exhausting. I started by teaching myself the fundamentals of visual layout and interaction, deconstructing digital products, and building working prototypes.",
    education:
      "I sharpened my product and UI/UX design discipline through intensive design training at Vephla University (VephlaUni Africa) along with relentless self-directed study in interaction design, typography systems, and frontend technologies. Vephla recognized my transition as one of their featured success stories when I broke into the industry as a working Product Designer.",
    milestones: [
      "Transitioned into full-time product design through intensive study and project sprints at VephlaUni Africa.",
      "Joined Greall Technologies as Product Designer, spearheading their corporate brand identity overhaul and fintech web architecture.",
      "Joined Medesy Technologies as Product Designer, architecting a WhatsApp-first conversational triage healthcare gateway connecting patients with licensed Nigerian doctors.",
      "Founded Cold Designer Studio, directing high-impact product architecture and mobile apps including Spot, PROfile, QuickEats, Raven Bank redesign sprint, and 9jaTrip.",
      "Expanded into design technologist practices, integrating Next.js, React Native, GSAP, and tactile Web Audio micro-interactions directly into production prototypes.",
    ],
    creativePursuits: [
      "Exploring architectural reductionism (inspired by Tadao Ando and Dieter Rams).",
      "Studying Swiss typography and grid systems (Josef Müller-Brockmann).",
      "Prototyping fluid micro-interactions and tactile audio-visual web experiences.",
      "Creating educational design content, breakdown videos, and UI walkthroughs on TikTok and professional social channels.",
    ],
  },
  publicProfiles: [
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/taye-abolarin-b503b0240/",
      handle: "taye-abolarin-b503b0240",
      verifiedDetails: "Product Designer; documented roles at Medesy Technologies, Greall Technologies, and independent studio practice.",
    },
    {
      platform: "Behance",
      url: "https://www.behance.net/Abolarin_Taye_Joseph",
      handle: "Abolarin_Taye_Joseph",
      verifiedDetails: "Comprehensive case studies for PROfile HRMS, QuickEats Meal Prepping App, Raven Bank App Redesign Sprint, and Spot.",
    },
    {
      platform: "TikTok",
      url: "https://www.tiktok.com/@taye_abolarin2",
      handle: "@taye_abolarin2",
      verifiedDetails: "Public design discussions, UI showcases, process breakdowns, and creative technology experiments.",
    },
    {
      platform: "Linktree",
      url: "https://linktr.ee/Abolarin_Taye_Joseph",
      handle: "Abolarin_Taye_Joseph",
      verifiedDetails: "Central public link directory uniting social profiles, Behance case studies, and scheduling touchpoints.",
    },
    {
      platform: "GitHub",
      url: "https://github.com/Bheemty",
      handle: "Bheemty",
      verifiedDetails: "Open-source repositories including Nova Wellness (React Native mobile companion with Gemini and AssemblyAI).",
    },
    {
      platform: "VephlaUni Africa",
      url: "https://vephlauni.com",
      handle: "Abolarin, Taye Joseph",
      verifiedDetails: "Documented alumnus and featured tech career transition success story (Product Designer).",
    },
  ],
  boundaries: {
    privacyNotice:
      "I share my design thinking, methodology, verified projects, and professional background openly. However, I respect client NDAs, proprietary patient triage data, internal company metrics, and personal family life.",
    confidentialTopics: [
      "Proprietary clinical backend algorithms for Medesy healthcare partners.",
      "Internal corporate revenue, contract pricing terms, or non-public partner agreements for Greall Technologies.",
      "Private personal credentials, financial bank balances, or personal phone numbers (use email abolarintaye20@gmail.com for contact).",
    ],
  },
};

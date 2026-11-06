/**
 * ASK COLD 2.0 — SKILLS & EXPERTISE
 * Category D: Established skills, developing competencies, tools, and domain specializations.
 */

export interface SkillCategory {
  level: "Established Core" | "Developing Technical" | "Exploratory / Interest";
  skills: {
    name: string;
    description: string;
    evidence: string;
  }[];
}

export interface TayeSkills {
  summary: string;
  tools: {
    primary: string[];
    secondary: string[];
  };
  categories: {
    productAndSystems: SkillCategory;
    interactionAndMotion: SkillCategory;
    engineeringFluency: SkillCategory;
    exploratoryDomains: SkillCategory;
  };
}

export const TAYE_SKILLS: TayeSkills = {
  summary:
    "My primary discipline is Product & UI/UX Design, backed by engineering fluency in modern frontend stacks. I specialize in complex systems: multi-persona enterprise dashboards, conversational UX gateways, mobile applications (iOS/Android), and production-grade Figma design systems.",
  tools: {
    primary: [
      "Figma (Auto-Layout 5.0, Variables, Component Properties, Token Architectures)",
      "Figjam (User Journey Mapping, Information Architecture, Collaborative Brainstorming)",
      "Adobe Photoshop (Image Manipulation, Textures, Spatial Assets)",
      "Canva (Rapid Marketing Collateral, Social Layouts, Pitch Deck Slides)",
    ],
    secondary: [
      "Slack / Microsoft Teams / Google Meet (Asynchronous & Synchronous Communication)",
      "Grain (User Interview Transcription & Customer Research Tagging)",
      "Google Docs / Google Forms (Quantitative Survey Design & Research Synthesis)",
      "Git / GitHub (Version Control, Branching, Collaborative Workflows)",
      "VS Code / Cursor (Frontend Development & Rapid Prototyping)",
    ],
  },
  categories: {
    productAndSystems: {
      level: "Established Core",
      skills: [
        {
          name: "End-to-End Product Discovery & User Journey Mapping",
          description: "Synthesizing stakeholder needs, conducting qualitative user interviews, and defining functional architecture.",
          evidence: "PROfile HRMS user survey analysis; QuickEats 45 presentation boards across consumer meal prep.",
        },
        {
          name: "Design Systems & Token Governance",
          description: "Architecting atomic component libraries in Figma, defining semantic color tokens, typography scales, and light/dark theme aliases.",
          evidence: "QuickEats dual-theme UI kit; Medesy multi-platform component library; PROfile 37 modular modules.",
        },
        {
          name: "Conversational UX & Decision Trees",
          description: "Designing non-linear conversational triage pathways, fallback branches, and handoffs on platforms like WhatsApp.",
          evidence: "Medesy Technologies healthcare triage gateway connecting patients with licensed physicians.",
        },
        {
          name: "Enterprise SaaS & Dashboard Architecture",
          description: "High-density data visualization, multi-role permission matrices, and operational administrative workflows.",
          evidence: "Spot creative critique platform; PROfile attendance, payroll, and predictive attrition dashboard.",
        },
        {
          name: "Mobile Application Ergonomics (iOS & Android)",
          description: "Designing touch-friendly mobile layouts, bottom sheet interactions, one-tap gestures, and platform-specific guidelines.",
          evidence: "Raven Bank personal app sprint; 9jaTrip transit ticket booking; QuickEats recipe companion.",
        },
      ],
    },
    interactionAndMotion: {
      level: "Established Core",
      skills: [
        {
          name: "Fluid Transition Choreography (Motion & GSAP)",
          description: "Engineering spring-physics transitions, directional hover tabs, scroll-linked animations, and morphing dialogs.",
          evidence: "Cold Designer portfolio custom choreography, Directional Tabs, Morphing Dialogs, and ScrollReveal systems.",
        },
        {
          name: "Smooth Inertia Scrolling & Pacing (Lenis)",
          description: "Configuring buttery-smooth momentum scrolling, locking background bleed, and coordinating touch gestures.",
          evidence: "Portfolio-wide Lenis integration with non-destructive mobile background scroll locks.",
        },
        {
          name: "Audio-Visual Tactile Feedback (Web Audio API)",
          description: "Synthesizing subtle, non-intrusive mechanical sound clicks and haptic confirmations directly in the browser.",
          evidence: "Integrated procedural audio engine in the portfolio (`src/lib/sounds.ts`) confirming launcher, menu, and modal actions.",
        },
      ],
    },
    engineeringFluency: {
      level: "Developing Technical",
      skills: [
        {
          name: "Next.js App Router & React 19",
          description: "Building production web interfaces with server components, client interactivity, and clean component modularity.",
          evidence: "This portfolio codebase itself; Greall Technologies corporate web architecture.",
        },
        {
          name: "TypeScript & Strict Type Safety",
          description: "Writing strongly typed interfaces, data structures, and state logic to prevent runtime exceptions.",
          evidence: "Full TypeScript integration across portfolio data, projects, and Ask Cold engines.",
        },
        {
          name: "Tailwind CSS & Modern CSS Layouts",
          description: "Responsive flexbox/grid compositions, CSS custom properties, backdrop-filter glass refraction, and media queries.",
          evidence: "Tailwind v4 architectures, Apple-level Cold Glass shaders, and mobile responsive containers.",
        },
        {
          name: "React Native & Expo SDK",
          description: "Prototyping and building native mobile applications with cross-platform UI and device hardware integrations.",
          evidence: "Nova Wellness mobile companion repository built with Expo SDK 57.",
        },
      ],
    },
    exploratoryDomains: {
      level: "Exploratory / Interest",
      skills: [
        {
          name: "Spatial Web & Daylight Responsive Lighting",
          description: "Atmospheric interfaces that dynamically shift visual moods and lighting based on the user's local daylight cycle.",
          evidence: "Somewhere Hotel conceptual spatial reservation system.",
        },
        {
          name: "Conversational & Generative AI Integration",
          description: "Integrating LLM developer APIs (Gemini, AssemblyAI) into supportive companions with bounded, private contexts.",
          evidence: "Nova Wellness reflective voice journal; Ask Cold 2.0 digital representative.",
        },
      ],
    },
  },
};

/**
 * ASK COLD 2.0 — INTERESTS & AMBITIONS
 * Category H: What Taye is currently learning, his career ambitions,
 * problems he loves solving, and personal interests outside product design.
 */

export interface TayeAmbitions {
  problemsHeLovesSolving: string[];
  currentlyLearning: {
    technology: string;
    description: string;
    stage: "Actively Practicing" | "Early Exploration";
  }[];
  longTermDirection: {
    vision: string;
    strategicMilestones: string[];
  };
  interestsOutsideDesign: {
    interest: string;
    description: string;
  }[];
}

export const TAYE_AMBITIONS: TayeAmbitions = {
  problemsHeLovesSolving: [
    "High-friction bottlenecks where confusing software wastes human time (e.g. clinic waiting rooms, transit park chaos, bureaucratic spreadsheets).",
    "Translating complex multi-persona platforms into obvious, calm interfaces that non-technical users can navigate without a manual.",
    "Designing tactile, multi-sensory digital systems with procedural audio, glass refraction, and physics-based inertia.",
  ],
  currentlyLearning: [
    {
      technology: "Advanced Shaders & WebGL / WebGPU Interaction",
      description:
        "Deepening knowledge of canvas shaders, 3D spatial surfaces, and performant web graphics (such as Cobe Globe and SVG displacement filters) that elevate digital products without battery drain.",
      stage: "Actively Practicing",
    },
    {
      technology: "Cross-Platform React Native Architecture",
      description:
        "Building deeper fluency in React Native Reanimated 3, native audio bridges, and local SQLite data architectures on mobile.",
      stage: "Actively Practicing",
    },
    {
      technology: "AI Agentic UX & Conversational Interfaces",
      description:
        "Exploring how intelligent AI representations and autonomous agents should be designed—creating experiences that feel human and grounded without falling into the uncanny valley or being annoying.",
      stage: "Actively Practicing",
    },
  ],
  longTermDirection: {
    vision:
      "To build Cold Designer into an internationally renowned independent digital product studio known for ruthless clarity, atmospheric craft, and human-centered ergonomics. Long-term, I aspire to direct product design for transformative platforms that touch millions of lives globally.",
    strategicMilestones: [
      "Continue partnering with ambitious founders on 0-to-1 product launches across Africa, Europe, and North America.",
      "Ship high-impact mobile and web products with deep technical design systems.",
      "Publish open-source design tools, component libraries, and interactive case studies that help elevate the next generation of designers.",
      "Expand my studio practice into specialized product incubation.",
    ],
  },
  interestsOutsideDesign: [
    {
      interest: "Architectural & Industrial Design Studies",
      description:
        "I spend hours studying physical architecture—particularly brutalism, modern concrete structures, and the way daylight sculpts physical spaces. Tadao Ando's work is a constant inspiration.",
    },
    {
      interest: "Sound Design & Music Pacing",
      description:
        "I have a deep fascination with acoustic rhythm and ambient soundscapes. I often experiment with subtle procedural audio feedback and how sound cues can make digital interfaces feel tangible.",
    },
    {
      interest: "Creative Content Creation & Design Education",
      description:
        "Sharing design breakdowns, Figma tips, and UI critiques on social platforms like TikTok and LinkedIn to demystify product design for aspiring creators.",
    },
    {
      interest: "Coffee & Minimalist Workspaces",
      description:
        "Curating a distraction-free, disciplined workspace environment where deep focus and creative flow come naturally.",
    },
  ],
};

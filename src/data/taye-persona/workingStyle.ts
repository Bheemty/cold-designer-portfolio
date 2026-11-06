/**
 * ASK COLD 2.0 — WORKING STYLE & COLLABORATION
 * Category G: How Taye approaches new projects, collaborates with clients and teams,
 * receives and handles feedback, conducts research, and meets deadlines.
 */

export interface WorkingPractice {
  phase: string;
  howTayeApproachesIt: string;
  clientExperience: string;
}

export interface TayeWorkingStyle {
  philosophy: string;
  projectPhases: WorkingPractice[];
  feedbackPolicy: {
    perspective: string;
    whatIfClientDislikesDesign: string;
    egoFreeCommitment: string;
  };
  communicationCadence: {
    channels: string[];
    syncFrequency: string;
    timezoneHandling: string;
  };
  deadlineAndDelivery: {
    approachToEstimates: string;
    handlingDelaysOrScopeCreep: string;
    commitmentToQuality: string;
  };
}

export const TAYE_WORKING_STYLE: TayeWorkingStyle = {
  philosophy:
    "I view client collaboration as a partnership between problem domain experts (the client and team) and interface systems experts (myself). I don't work in a secluded vacuum and then perform a dramatic 'grand reveal'. I work iteratively in the open with continuous validation.",
  projectPhases: [
    {
      phase: "01. Discovery & Alignment",
      howTayeApproachesIt:
        "Before touching Figma, I obsess over the problem definition. I interview stakeholders, review user feedback, map competitive benchmarks, and write down clear success metrics.",
      clientExperience:
        "You get a structured brief, user journey maps, and an agreed-upon scope that prevents costly misunderstandings later.",
    },
    {
      phase: "02. Wireframing & Structural Validation",
      howTayeApproachesIt:
        "I iterate rapidly on low-fidelity wireframes to validate interaction paths, mental models, and information hierarchy without getting sidetracked by colors or fonts.",
      clientExperience:
        "You test clickable wireframes early, ensuring the user flow is bulletproof before investing time into visual polish.",
    },
    {
      phase: "03. High-Fidelity Design & Systems Architecture",
      howTayeApproachesIt:
        "I build production-ready UI screens using modern Figma auto-layout, atomic components, and dual light/dark theme color tokens.",
      clientExperience:
        "You see the product come alive with refined typography, balanced contrast, and reusable components that scale effortlessly.",
    },
    {
      phase: "04. Interactive Prototyping & Motion",
      howTayeApproachesIt:
        "I prototype realistic click-through flows, micro-interactions, and state transitions to test ergonomics on actual devices.",
      clientExperience:
        "You and your stakeholders can tap and click through realistic mobile and desktop prototypes on your own phones and browsers.",
    },
    {
      phase: "05. Developer Handoff & Implementation QA",
      howTayeApproachesIt:
        "Because I speak code, my handoffs include pixel-precise redlines, token specs (JSON/CSS), responsive breakpoint rules, and direct collaboration with your engineers.",
      clientExperience:
        "Your engineering team ships faster with zero guesswork and no painful 'design vs code' debates.",
    },
  ],
  feedbackPolicy: {
    perspective:
      "Feedback is not an attack on the designer; it is diagnostic data about the product. If something isn't working for a user or a stakeholder, that's valuable insight.",
    whatIfClientDislikesDesign:
      "If you don't like an initial direction, we don't argue or get defensive. We step back to the objective problem definition: What specific element isn't serving the user or brand? Is it the density, the tone, or an interaction hurdle? Because we work iteratively in wireframes first, major surprises are rare; but when a pivot is needed, we iterate constructively until we nail it.",
    egoFreeCommitment:
      "I leave my ego at the door. My goal is to build an interface that succeeds in the real world, not to win an argument.",
  },
  communicationCadence: {
    channels: [
      "Slack / Microsoft Teams / Discord for daily asynchronous messaging and quick queries.",
      "Figma comments for pinned, spatial feedback directly on screens.",
      "Google Meet / Zoom for focused weekly strategy syncs and milestone walkthroughs.",
      "Loom async videos for screen recordings and rationale explanations across timezones.",
    ],
    syncFrequency:
      "Typically 1 dedicated weekly video sync, supplemented by proactive async updates 2-3 times per week.",
    timezoneHandling:
      "Based in Lagos (GMT+1), I routinely collaborate asynchronously with teams across US Eastern/Pacific, UK/European, and African time zones with dedicated overlap hours.",
  },
  deadlineAndDelivery: {
    approachToEstimates:
      "I provide realistic milestone estimates based on deliverable depth rather than optimistic guesswork. I'd rather under-promise and beat the schedule than rush out sloppy work.",
    handlingDelaysOrScopeCreep:
      "If new requirements emerge mid-sprint that threaten the target launch, I raise them immediately with trade-off choices: adjust the milestone date, prioritize phase-1 essentials, or allocate additional sprint capacity.",
    commitmentToQuality:
      "I never sacrifice usability, responsive responsiveness, or design-to-code integrity to cut corners.",
  },
};

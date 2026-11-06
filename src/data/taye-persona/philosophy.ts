/**
 * ASK COLD 2.0 — DESIGN PHILOSOPHY & ETHOS
 * Category C: What good design means to Taye, the doctrine of "Cold",
 * views on usability, aesthetics vs function, and creative influences.
 */

export interface DesignPhilosophy {
  coreCreed: string;
  meaningOfCold: string;
  principles: {
    title: string;
    statement: string;
    elaboration: string;
  }[];
  influences: {
    domain: string;
    figuresAndMovements: string;
    impactOnTaye: string;
  }[];
  subjectiveViews: {
    topic: string;
    tayePerspective: string;
  }[];
}

export const TAYE_PHILOSOPHY: DesignPhilosophy = {
  coreCreed:
    "An interface should feel obvious, not because it is trivial to design, but because every layer of confusion has been stripped away.",
  meaningOfCold:
    "In a digital world oversaturated with sensory clutter, flashing banners, and generic templates, 'Cold' represents an intentional commitment to clarity. Cold is not emotional detachment. Cold is the temperature of clear thinking. It is the disciplined elimination of non-essential noise until an interface feels effortless, functional, and grounded in human reality.",
  principles: [
    {
      title: "Clarity as a Discipline",
      statement: "Good design is about subtraction, not decoration.",
      elaboration:
        "Every element on a screen must justify its presence. If a border, shadow, or piece of copy doesn't help the user understand what to do next or reduce cognitive load, it's noise. Clarity requires the courage to leave things out.",
    },
    {
      title: "Aesthetics and Function are Inseparable",
      statement: "Aesthetics create trust; functionality delivers respect.",
      elaboration:
        "Visual craft isn't mere dressing. When typography is balanced, spacing is rhythmic, and hierarchy is deliberate, users feel an immediate sense of safety and competence. But beauty without reliable workflow is hollow. I design interfaces that look refined on the surface because they are engineered rigorously underneath.",
    },
    {
      title: "Meet Users in Their Reality",
      statement: "Don't force users to bend to your product architecture.",
      elaboration:
        "In projects like MEDesy, patients in Nigeria with episodic medical questions shouldn't have to download a bulky, unfamiliar 80MB application just to consult a doctor. By architecting a structured triage gateway inside WhatsApp, we met them where their habits and data realities already exist.",
    },
    {
      title: "Tactile Interaction and Motion with Purpose",
      statement: "Motion should explain spatial relationships, never perform for applause.",
      elaboration:
        "I love micro-interactions, inertia scrolling (Lenis), and spring physics (Motion), but only when they provide informative feedback—confirming a click, illustrating where a panel emerged from, or pacing a long narrative. Motion without informational purpose is just lag.",
    },
    {
      title: "Design-to-Code Fidelity",
      statement: "A design only truly exists when a real user interacts with the shipped code.",
      elaboration:
        "Too many Figma files look pristine in mockups but fall apart in production when confronted with dynamic data, slow network connections, or different viewport sizes. Because I write frontend code, I design with token governance, layout resilience, and developer handoff in mind from day one.",
    },
  ],
  influences: [
    {
      domain: "Architecture",
      figuresAndMovements: "Tadao Ando, Dieter Rams, Kenneth Frampton (Critical Regionalism)",
      impactOnTaye:
        "Tadao Ando's mastery of raw concrete, natural light, and quiet structural honesty deeply influences how I approach whitespace, visual weight, and spatial hierarchy. Dieter Rams's 10 principles of good design—especially 'good design is as little design as possible'—are fundamental to my daily work.",
    },
    {
      domain: "Typography & Information Design",
      figuresAndMovements: "Swiss International Typographic Style, Josef Müller-Brockmann, Edward Tufte",
      impactOnTaye:
        "Strict mathematical grid discipline, high-contrast neo-grotesque type hierarchies, and clear information mapping. Typography is 90% of user interface design; if the type hierarchy is broken, the product is broken.",
    },
    {
      domain: "Digital Craft & Ergonomics",
      figuresAndMovements: "Apple Human Interface Guidelines, linear.app product craft, Vercel design engineering",
      impactOnTaye:
        "Subtle tactile micro-feedback, keyboard shortcuts, keyboard-safe bottom sheets on mobile, and zero layout shift.",
    },
  ],
  subjectiveViews: [
    {
      topic: "What makes a designer 'good' or 'talented'?",
      tayePerspective:
        "I believe a good designer is someone who takes the craft seriously and listens more than they talk. Talent in design isn't about artistic flair or making pretty Dribbble shots; it's about empathy, structural problem-solving, and the stamina to refine an interaction until all confusion dissolves.",
    },
    {
      topic: "Is design more important than engineering?",
      tayePerspective:
        "Neither is more important; they are two sides of the same coin. Great design without solid engineering is just a pretty picture; great engineering without thoughtful design is a machine nobody knows how to operate. The best work happens when designers and engineers speak each other's languages.",
    },
    {
      topic: "What is your stance on design trends like brutalism, skeuomorphism, or flat design?",
      tayePerspective:
        "Trends come and go. I appreciate brutalism's honesty and skeuomorphism's tactile affordances (like the glass refraction we use in Cold Glass), but I never apply a visual style purely because it's trending on Twitter. The domain, the user, and the problem dictate the visual language.",
    },
  ],
};

import { ASK_COLD_KNOWLEDGE, KnowledgeProject } from "@/data/askColdKnowledge";

export interface RetrievedContext {
  primarySubject:
    | "profile"
    | "project"
    | "lab"
    | "hiring"
    | "resume"
    | "services"
    | "pricing"
    | "employment"
    | "mobile"
    | "general";
  relevantProjects: KnowledgeProject[];
  profileExcerpt: string;
  suggestedFollowUps: string[];
  groundedSummary: string;
}

export interface ChatHistoryItem {
  role: string;
  text: string;
}

/**
 * Normalizes input string for search
 */
function normalize(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
}

/**
 * Resolves previously discussed project from conversation history
 */
function extractTargetProjectFromHistory(
  history: ChatHistoryItem[] = []
): KnowledgeProject | null {
  if (!history || history.length === 0) return null;

  // Search recent history backwards
  for (let i = history.length - 1; i >= 0; i--) {
    const item = history[i];
    if (!item || typeof item.text !== "string") continue;
    const norm = normalize(item.text);

    for (const proj of ASK_COLD_KNOWLEDGE.projects) {
      const slugNorm = normalize(proj.slug);
      const titleNorm = normalize(proj.title);
      if (norm.includes(slugNorm) || norm.includes(titleNorm)) {
        return proj;
      }
    }

    if (norm.includes("medesy")) return ASK_COLD_KNOWLEDGE.projects.find((p) => p.slug === "medesy") || null;
    if (norm.includes("9jatrip") || norm.includes("9ja trip")) return ASK_COLD_KNOWLEDGE.projects.find((p) => p.slug === "9jatrip") || null;
    if (norm.includes("spot")) return ASK_COLD_KNOWLEDGE.projects.find((p) => p.slug === "spot") || null;
    if (norm.includes("profile") || norm.includes("hrm")) return ASK_COLD_KNOWLEDGE.projects.find((p) => p.slug === "profile") || null;
    if (norm.includes("quickeats") || norm.includes("quick eat") || norm.includes("meal prep")) return ASK_COLD_KNOWLEDGE.projects.find((p) => p.slug === "quickeats") || null;
    if (norm.includes("raven")) return ASK_COLD_KNOWLEDGE.projects.find((p) => p.slug === "raven-bank") || null;
    if (norm.includes("greall")) return ASK_COLD_KNOWLEDGE.projects.find((p) => p.slug === "greall-website") || null;
    if (norm.includes("somewhere")) return ASK_COLD_KNOWLEDGE.projects.find((p) => p.slug === "somewhere-hotel") || null;
    if (norm.includes("buybuddy")) return ASK_COLD_KNOWLEDGE.projects.find((p) => p.slug === "buybuddy") || null;
    if (norm.includes("stillwater")) return ASK_COLD_KNOWLEDGE.projects.find((p) => p.slug === "stillwater") || null;
    if (norm.includes("will")) return ASK_COLD_KNOWLEDGE.projects.find((p) => p.slug === "will") || null;
    if (norm.includes("agrivillage") || norm.includes("farmer")) return ASK_COLD_KNOWLEDGE.projects.find((p) => p.slug === "agrivillage") || null;
  }

  return null;
}

/**
 * Retrieves the most relevant portfolio knowledge based on user query & current page
 */
export function retrieveContext(query: string, currentPath: string = "/"): RetrievedContext {
  const normQuery = normalize(query);
  const words = normQuery.split(/\s+/).filter(Boolean);

  // Check for project mentions
  const scoredProjects: { project: KnowledgeProject; score: number }[] = [];

  for (const proj of ASK_COLD_KNOWLEDGE.projects) {
    let score = 0;
    const titleNorm = normalize(proj.title);
    const slugNorm = normalize(proj.slug);
    const categoryNorm = normalize(proj.category);
    const summaryNorm = normalize(proj.summary);
    const tagsNorm = normalize(proj.tags.join(" "));

    // Exact title or slug match
    if (normQuery.includes(titleNorm) || normQuery.includes(slugNorm)) score += 10;
    if (slugNorm === "quickeats" && (normQuery.includes("quick eat") || normQuery.includes("quickeats") || normQuery.includes("meal prep") || normQuery.includes("food tech") || normQuery.includes("pantry"))) score += 10;
    if (slugNorm === "spot" && (normQuery.includes("spot") || normQuery.includes("feedback") || normQuery.includes("critique"))) score += 10;
    if (slugNorm === "profile" && (normQuery.includes("profile") || normQuery.includes("hrm") || normQuery.includes("human resource") || normQuery.includes("attendance"))) score += 10;
    if (slugNorm === "raven-bank" && (normQuery.includes("raven") || normQuery.includes("raving") || normQuery.includes("bank") || normQuery.includes("fintech"))) score += 10;
    if (slugNorm === "medesy" && (normQuery.includes("medesy") || normQuery.includes("health") || normQuery.includes("doctor") || normQuery.includes("whatsapp"))) score += 10;
    if (slugNorm === "9jatrip" && (normQuery.includes("9ja") || normQuery.includes("trip") || normQuery.includes("transit") || normQuery.includes("bus") || normQuery.includes("coach"))) score += 10;
    if (slugNorm === "will" && (normQuery.includes("will") || normQuery.includes("legacy") || normQuery.includes("estate") || normQuery.includes("asset"))) score += 10;
    if (slugNorm === "agrivillage" && (normQuery.includes("agri") || normQuery.includes("farm") || normQuery.includes("produce") || normQuery.includes("cooperative"))) score += 10;

    // Keyword matches
    for (const w of words) {
      if (w.length < 3) continue;
      if (titleNorm.includes(w)) score += 3;
      if (categoryNorm.includes(w)) score += 2;
      if (tagsNorm.includes(w)) score += 2;
      if (summaryNorm.includes(w)) score += 1;
    }

    // Boost if currently browsing this specific project page
    if (currentPath.includes(proj.slug)) {
      score += 4;
    }

    if (score > 0) {
      scoredProjects.push({ project: proj, score });
    }
  }

  scoredProjects.sort((a, b) => b.score - a.score);
  const relevantProjects = scoredProjects.slice(0, 3).map((s) => s.project);

  // Intent classification
  const isAvailability = /availab|gig|freelance|contract|hire|taking on|open for work|new client/i.test(normQuery);
  const isPricing = /how much|pricing|price|rate|cost|quote|budget|fee|charge|hourly|day rate/i.test(normQuery);
  const isServices = /service|what do you do|what does taye offer|offerings|capabilities|specialt|what can you design/i.test(normQuery);
  const isMobile = /mobile|app design|ios|android|mobile app/i.test(normQuery);
  const isEmployment = /employment|work history|where has he worked|experience|career|companies/i.test(normQuery);
  const isResume = /resume|cv|curriculum|download|qualification|education/i.test(normQuery);
  const isLab = /lab|experiment|playground|interactive|codex/i.test(normQuery);
  const isAbout = /who is|about taye|background|designer|philosophy|approach|cold designer/i.test(normQuery);

  let primarySubject: RetrievedContext["primarySubject"] = "general";
  if (isAvailability) {
    primarySubject = "hiring";
  } else if (isPricing) {
    primarySubject = "pricing";
  } else if (isServices) {
    primarySubject = "services";
  } else if (isMobile) {
    primarySubject = "mobile";
  } else if (isEmployment) {
    primarySubject = "employment";
  } else if (relevantProjects.length > 0) {
    primarySubject = "project";
  } else if (isResume) {
    primarySubject = "resume";
  } else if (isLab) {
    primarySubject = "lab";
  } else if (isAbout) {
    primarySubject = "profile";
  }

  // Construct grounded summary for LLM prompt context
  let groundedSummary = `PUBLIC IDENTITY & PROFESSIONAL PROFILE:
Name: ${ASK_COLD_KNOWLEDGE.profile.publicName} (${ASK_COLD_KNOWLEDGE.profile.brandName}, ${ASK_COLD_KNOWLEDGE.profile.handle})
Title: ${ASK_COLD_KNOWLEDGE.profile.title}
Location: ${ASK_COLD_KNOWLEDGE.profile.location}
Remote Preference: ${ASK_COLD_KNOWLEDGE.profile.remotePreference}
Summary: ${ASK_COLD_KNOWLEDGE.profile.summary}
Philosophy: "${ASK_COLD_KNOWLEDGE.profile.philosophy}"
Design Tools: ${ASK_COLD_KNOWLEDGE.profile.technicalTools.join(", ")}
Engineering Skills: ${ASK_COLD_KNOWLEDGE.profile.engineeringSkills.join(", ")}
Contact Email: ${ASK_COLD_KNOWLEDGE.profile.contactEmail}
Resume URL: ${ASK_COLD_KNOWLEDGE.profile.resumeUrl}
Socials: LinkedIn (${ASK_COLD_KNOWLEDGE.profile.socialLinks.linkedin}), Behance (${ASK_COLD_KNOWLEDGE.profile.socialLinks.behance}), TikTok (${ASK_COLD_KNOWLEDGE.profile.socialLinks.tiktok})

AVAILABILITY & ENGAGEMENT:
Status: ${ASK_COLD_KNOWLEDGE.availability.status}
Open For: ${ASK_COLD_KNOWLEDGE.availability.openFor.join("; ")}
Timeframe: ${ASK_COLD_KNOWLEDGE.availability.timeframe}
Collaboration Model: ${ASK_COLD_KNOWLEDGE.availability.collaborationModel}
Guidance: ${ASK_COLD_KNOWLEDGE.availability.bookingGuidance}

PRICING POLICY:
Model: ${ASK_COLD_KNOWLEDGE.pricingPolicy.model}
Policy: ${ASK_COLD_KNOWLEDGE.pricingPolicy.policy}
Explanation: ${ASK_COLD_KNOWLEDGE.pricingPolicy.explanation}
Guidance: ${ASK_COLD_KNOWLEDGE.pricingPolicy.guidance}

FULL SERVICES CATALOG:
${ASK_COLD_KNOWLEDGE.services.map((s) => `- ${s.title} (${s.category}): ${s.headline} Deliverables: ${s.deliverables.join(", ")} Ideal for: ${s.idealFor}`).join("\n")}

EMPLOYMENT HISTORY:
${ASK_COLD_KNOWLEDGE.employmentHistory.map((e) => `- ${e.company} (${e.role}, ${e.period}, ${e.type}): ${e.summary} Key contributions: ${e.keyContributions.join("; ")}`).join("\n")}

DESIGN PROCESS:
${ASK_COLD_KNOWLEDGE.designProcess.map((p) => `${p.step}. ${p.phase}: ${p.description}`).join("\n")}
`;

  if (relevantProjects.length > 0) {
    groundedSummary += `\nRELEVANT PORTFOLIO PROJECTS:\n`;
    for (const p of relevantProjects) {
      groundedSummary += `- [${p.title}](${p.caseStudyUrl}): ${p.category} (${p.year}). Role: ${p.role}. Headline: ${p.headline}. Summary: ${p.summary} Problem: ${p.challenge} Solution: ${p.solution} Deliverables: ${p.deliverables.join(", ")}\n`;
    }
  }

  // Context-tailored follow-ups
  const suggestedFollowUps: string[] = [];
  if (primarySubject === "hiring" || primarySubject === "pricing") {
    suggestedFollowUps.push("Start a project enquiry with Taye");
    suggestedFollowUps.push("Download Taye's PDF Resume");
    suggestedFollowUps.push("Explore verified case studies");
  } else if (primarySubject === "services" || primarySubject === "mobile") {
    suggestedFollowUps.push("Inspect QuickEats (Mobile Food Tech)");
    suggestedFollowUps.push("Inspect Raven Bank (Mobile Fintech)");
    suggestedFollowUps.push("Start a mobile project enquiry");
  } else if (primarySubject === "project" && relevantProjects.length > 0) {
    suggestedFollowUps.push(`View ${relevantProjects[0].title} case study`);
    suggestedFollowUps.push("What was Taye's role on this project?");
    suggestedFollowUps.push("Discuss a similar project with Taye");
  } else if (primarySubject === "resume") {
    suggestedFollowUps.push("Download PDF Resume");
    suggestedFollowUps.push("Connect on LinkedIn");
    suggestedFollowUps.push("Explore top featured projects");
  } else {
    suggestedFollowUps.push("Are you available for a gig?");
    suggestedFollowUps.push("Explore verified case studies");
    suggestedFollowUps.push("What services does Taye offer?");
  }

  return {
    primarySubject,
    relevantProjects,
    profileExcerpt: ASK_COLD_KNOWLEDGE.profile.summary,
    suggestedFollowUps,
    groundedSummary,
  };
}

/**
 * Generate intelligent deterministic local responses grounded in verified portfolio knowledge
 */
export function generateLocalMockResponse(
  query: string,
  currentPath: string = "/",
  history: ChatHistoryItem[] = []
): {
  text: string;
  actionChips?: { label: string; href?: string; action?: "enquiry" | "resume" | "link" }[];
} {
  const norm = normalize(query);

  // 1. Check for multi-turn follow-up context (e.g. "What was his role there?", "Show me the prototype", "Can I see it?")
  const isFollowUpPronoun = /his role there|his role on this|what did he do there|what was his role|the prototype|show me the case study|case study link|tell me more about it|how long did it take|what were the deliverables/i.test(norm);
  const targetProject = extractTargetProjectFromHistory(history);

  if (isFollowUpPronoun && targetProject) {
    if (/role|what did he do|his position/i.test(norm)) {
      return {
        text: `On **${targetProject.title}**, Taye served as **${targetProject.role}** (${targetProject.timeline}).\n\n${targetProject.overview}\n\n**Key Deliverables:**\n${targetProject.deliverables.map((d) => `- ${d}`).join("\n")}`,
        actionChips: [
          { label: `View ${targetProject.title} Case Study`, href: targetProject.caseStudyUrl },
          ...(targetProject.prototypeUrl
            ? [{ label: "Open Prototype / External Spec", href: targetProject.prototypeUrl }]
            : []),
          { label: "Discuss Similar Project", action: "enquiry" },
        ],
      };
    }

    if (/prototype|figma|behance|live url|link/i.test(norm)) {
      const url = targetProject.prototypeUrl || targetProject.liveUrl || targetProject.caseStudyUrl;
      return {
        text: `You can explore the verified prototype and documentation for **${targetProject.title}** directly:\n\n- [${targetProject.title} Case Study](${targetProject.caseStudyUrl})\n${targetProject.prototypeUrl ? `- [Figma / Behance Artifact](${targetProject.prototypeUrl})\n` : ""}`,
        actionChips: [
          { label: `Open ${targetProject.title}`, href: url },
          { label: "View All Projects", href: "/work" },
        ],
      };
    }

    return {
      text: `**${targetProject.title}** (${targetProject.category}, ${targetProject.year}):\n\n${targetProject.headline}\n\n**Challenge:** ${targetProject.challenge}\n\n**Solution:** ${targetProject.solution}`,
      actionChips: [
        { label: `View ${targetProject.title} Case Study`, href: targetProject.caseStudyUrl },
        { label: "Start Project Enquiry", action: "enquiry" },
      ],
    };
  }

  // 2. Route-aware context inquiry
  if (currentPath.startsWith("/work/") && /this project|this case study|about this|current page/i.test(norm)) {
    const slug = currentPath.replace("/work/", "");
    const proj = ASK_COLD_KNOWLEDGE.projects.find((p) => p.slug === slug);
    if (proj) {
      return {
        text: `You're currently viewing **${proj.title}** (${proj.category}, ${proj.year}). ${proj.headline}\n\n**Role:** ${proj.role}\n\n${proj.summary}`,
        actionChips: [
          { label: "View All Projects", href: "/work" },
          { label: "Start Project Enquiry", action: "enquiry" },
        ],
      };
    }
  }

  // 3. Availability / Freelance Gigs / Hiring Inquiry
  if (/availab|gig|freelance|contract|hire|hiring|open for work|take on work|taking on|collaborat|work together/i.test(norm)) {
    return {
      text: `Yes! Taye is currently **open for select freelance gigs, contract product design roles (3–6+ months), and design consultations**.\n\nHe collaborates with founders, product leaders, and engineering teams globally on complex SaaS architectures, consumer/fintech mobile apps, and design systems. His engagement model is fully remote and asynchronous across US, European, and African time zones with dedicated weekly syncs.\n\nTo discuss your project scope or get started, click **Start Project Enquiry** below or email him directly at [abolarintaye20@gmail.com](mailto:abolarintaye20@gmail.com).`,
      actionChips: [
        { label: "Start Project Enquiry", action: "enquiry" },
        { label: "Email Taye Directly", href: "mailto:abolarintaye20@gmail.com" },
        { label: "Explore Verified Work", href: "/work" },
      ],
    };
  }

  // 4. Pricing / Rates / Project Costs
  if (/how much|pricing|price|rate|cost|quote|budget|fee|charge|hourly|day rate/i.test(norm)) {
    return {
      text: `Taye uses **value- and scope-based pricing** rather than generic flat rates or arbitrary hourly figures. Every digital product has distinct architectural complexity, platform requirements, and delivery milestones.\n\nPricing is determined by:\n- **Scope & Platform Breadth**: Web SaaS vs. native iOS/Android applications vs. multi-platform systems.\n- **Deliverable Depth**: From user research and wireframing to high-fidelity Figma components, design tokens, and coded prototypes.\n- **Timeline & Cadence**: Dedicated sprint cycles vs. multi-month embedded contract engagements.\n\nTo receive an accurate estimate or proposal, share a high-level summary of your project goals, scope, and timeline using **Start Project Enquiry** or email [abolarintaye20@gmail.com](mailto:abolarintaye20@gmail.com).`,
      actionChips: [
        { label: "Start Project Enquiry", action: "enquiry" },
        { label: "Email for Estimate", href: "mailto:abolarintaye20@gmail.com" },
        { label: "View Design Process", href: "/about" },
      ],
    };
  }

  // 5. Full Service Catalog
  if (/services|what do you do|what does taye offer|offerings|capabilities|specialt|what can you design/i.test(norm)) {
    return {
      text: `Taye provides end-to-end product design and design technologist services across 6 core pillars:\n\n1. **Enterprise SaaS & Web Applications**: Complex multi-persona platforms, data-dense dashboards, and operational workflows (e.g. [Spot](/work/spot), [PROfile](/work/profile)).\n2. **Mobile App Design (iOS & Android)**: Platform-native ergonomics, rapid checkout/booking flows, and dual light/dark themes (e.g. [QuickEats](/work/quickeats), [Raven Bank](/work/raven-bank), [9jaTrip](/work/9jatrip)).\n3. **Conversational UX & Triage Gateways**: Zero-barrier conversational flows on WhatsApp and web channels (e.g. [MEDesy](/work/medesy)).\n4. **Design Systems & Token Architecture**: Production-grade Figma component libraries, semantic tokens (JSON/CSS), and light/dark theme aliases.\n5. **UX Audits & Heuristic Evaluation**: Drop-off diagnosis, typographic scanning improvements, and conversion teardowns.\n6. **Design Technologist Prototyping**: Bridging design and engineering with functional React, Next.js, and GSAP motion prototypes.`,
      actionChips: [
        { label: "Explore Case Studies", href: "/work" },
        { label: "Start Project Enquiry", action: "enquiry" },
        { label: "Download Resume", href: "/Taye%20Abolarin-Product%20Designer-Resume.pdf", action: "resume" },
      ],
    };
  }

  // 6. Mobile App Design Capabilities
  if (/mobile|app design|ios|android|mobile app/i.test(norm)) {
    return {
      text: `Yes, **mobile application design is one of Taye's core specializations** across both iOS and Android. He designs with platform-native ergonomics, responsive layout hierarchies, and dual light/dark themes.\n\nFeatured mobile case studies:\n- [QuickEats](/work/quickeats): 45-presentation-board consumer mobile app with 20-minute meal planning, pantry ingredient matching, and dual light/dark themes.\n- [Raven Bank](/work/raven-bank): High-clarity fintech personal banking app redesigned in an intensive 48-hour sprint featuring 1-tap beneficiary transfers.\n- [9jaTrip](/work/9jatrip): Intercity transit booking app with terminal hub selection, seat maps, and QR boarding passes.\n- [PROfile](/work/profile): Mobile companion for enterprise employees featuring one-tap clock-in, attendance ledgers, and leave management.`,
      actionChips: [
        { label: "Inspect QuickEats", href: "/work/quickeats" },
        { label: "Inspect Raven Bank", href: "/work/raven-bank" },
        { label: "Inspect 9jaTrip", href: "/work/9jatrip" },
      ],
    };
  }

  // 7. Employment History / Work Experience
  if (/employment|work history|where has he worked|experience|career|companies|medesy technologies|greall technologies/i.test(norm)) {
    return {
      text: `Taye Abolarin's professional product design journey includes:\n\n- **Medesy Technologies (2024)** — Product Designer (Employment): Designed the structured WhatsApp-first healthcare triage gateway and web service portal connecting patients in Nigeria with licensed doctors.\n- **Greall Technologies (2023)** — Product Designer (Employment): Art-directed the corporate brand identity evolution, responsive web architecture, and digital visual system.\n- **Cold Designer Studio / Independent Practice (2023–Present)** — Lead Product Designer & Design Technologist: Directing complex SaaS architectures, consumer mobile apps, and design systems for global clients, including [Spot](/work/spot) (8-week cross-functional lead), [PROfile](/work/profile), [QuickEats](/work/quickeats), and [Raven Bank](/work/raven-bank).`,
      actionChips: [
        { label: "Download Full Resume (PDF)", href: "/Taye%20Abolarin-Product%20Designer-Resume.pdf", action: "resume" },
        { label: "Connect on LinkedIn", href: ASK_COLD_KNOWLEDGE.profile.socialLinks.linkedin },
        { label: "Explore Case Studies", href: "/work" },
      ],
    };
  }

  // 8. Design Process & Collaboration
  if (/process|workflow|how do you work|collaboration|steps|phases/i.test(norm)) {
    return {
      text: `Taye follows a structured 5-stage product design workflow:\n\n1. **Discovery & Strategy Alignment**: Defining business goals, user personas, technical constraints, and success criteria.\n2. **System Architecture & Wireframing**: Rapid structural iteration, user journeys, and low-fi flows to validate interaction paths.\n3. **High-Fidelity UI & Design Systems**: Production-grade Figma components, typography scales, and dual light/dark tokens.\n4. **Interactive Prototyping & Motion**: Usability click-throughs, transition choreography, and haptic/audio micro-interactions.\n5. **Engineering Handoff & QA**: Detailed token documentation, auto-layout verification, and direct developer collaboration.`,
      actionChips: [
        { label: "Start Project Enquiry", action: "enquiry" },
        { label: "Explore Case Studies", href: "/work" },
      ],
    };
  }

  // 9. Specific Project Inquiries
  if (/quick\s*eat|quickeats|meal prep|pantry\s*match|food\s*tech/i.test(norm)) {
    return {
      text: `**QuickEats** is an end-to-end consumer mobile app case study designed by Taye across 45 presentation boards. It empowers busy young adults and students to eat healthy on a budget through 20-minute personalized recipes, smart pantry matching that uses ingredients already at home, and auto-consolidated grocery lists. It features complete native dual light and dark theme systems.`,
      actionChips: [
        { label: "Inspect QuickEats Case Study", href: "/work/quickeats" },
        { label: "View Behance Prototype", href: "https://www.behance.net/gallery/218767855/Meal-Prepping-Mobile-App-A-Case-Study" },
        { label: "View All Projects", href: "/work" },
      ],
    };
  }

  if (/spot|feedback|critique|creative community/i.test(norm)) {
    return {
      text: `**Spot** is a web-based creative collaboration platform where Taye served as **Lead Product Designer**, directing an 8-week cross-functional team (1 PM, 2 frontend engineers, and 2 junior designers). It features a spatial commenting canvas with coordinate-pinned critique, design asset vaults, and community discussion forums spanning 30+ high-fidelity screens.`,
      actionChips: [
        { label: "Inspect Spot Case Study", href: "/work/spot" },
        { label: "View Behance Case Study", href: "https://www.behance.net/gallery/214429537/Spot-Redefining-Creative-Feedback-A-Case-Study" },
        { label: "View All Projects", href: "/work" },
      ],
    };
  }

  if (/profile|hrm|attendance|human resource|attrition|clock in/i.test(norm)) {
    return {
      text: `**PROfile** is an enterprise HRMS and Employee Self-Service (ESS) platform designed by Taye across 37 high-resolution modules. It unifies administrative attendance tracking (258 employees), automated clock-in, predictive attrition risk signals, and a mobile self-service companion for one-tap leave requests and shift reconciliation.`,
      actionChips: [
        { label: "Inspect PROfile Case Study", href: "/work/profile" },
        { label: "View Behance Spec", href: "https://www.behance.net/gallery/222769651/PROfile-An-Organizational-HRM-Solution" },
        { label: "View All Projects", href: "/work" },
      ],
    };
  }

  if (/raven|bank|fintech|p2p transfer/i.test(norm)) {
    return {
      text: `**Raven Bank App** was an intensive 2-day rapid mobile banking redesign sprint completed under Taye's alias **@cold_designer**. It restructured personal balance visibility, introduced single-tap beneficiary avatar chips for instant P2P transfers, and simplified biometric security into a frictionless experience.`,
      actionChips: [
        { label: "Inspect Raven Bank Case Study", href: "/work/raven-bank" },
        { label: "View Behance Presentation", href: "https://www.behance.net/gallery/221018589/Fintech-Application-Raven-Bank-App-A-Case-Study" },
        { label: "View Fintech Projects", href: "/work" },
      ],
    };
  }

  if (/medesy|doctor|whatsapp|health|triage/i.test(norm)) {
    return {
      text: `**MEDesy** is a production healthcare platform where Taye designed a structured WhatsApp-first conversational triage gateway. Patients describe symptoms in ordinary language and connect directly with licensed Nigerian physicians, eliminating waiting room friction and app installation barriers.`,
      actionChips: [
        { label: "Inspect MEDesy Case Study", href: "/work/medesy" },
        { label: "View Figma Prototype", href: "https://www.figma.com/design/Vl1qsoE22hQjt8oEXZubja/Medesy-2?m=auto&t=jglC0OFhMaDeX2tP-6" },
        { label: "View All Projects", href: "/work" },
      ],
    };
  }

  if (/9ja|trip|transit|bus|coach|terminal/i.test(norm)) {
    return {
      text: `**9jaTrip** is an intercity mobility platform replacing informal bus park queues with verified hub-to-hub seat booking, transparent route pricing, and digital QR boarding passes for regional commuters across Nigeria.`,
      actionChips: [
        { label: "Inspect 9jaTrip Case Study", href: "/work/9jatrip" },
        { label: "View Figma Design", href: "https://www.figma.com/design/QPyY4HiyEc40yQk5609OMG/9jaTrip?node-id=0-1&p=f&t=Mm09Z82YdZ3Is25i-0" },
        { label: "View All Projects", href: "/work" },
      ],
    };
  }

  if (/greall|corporate identity|corporate rebrand/i.test(norm)) {
    return {
      text: `**Greall Corporate Rebrand** is an employment engagement where Taye led the digital identity overhaul for Greall Technologies. He established a clean corporate visual system, responsive web architecture, and structured service ecosystem messaging communicating technical credibility to institutional enterprise partners.`,
      actionChips: [
        { label: "Inspect Greall Case Study", href: "/work/greall-website" },
        { label: "View Corporate Prototype", href: "https://www.figma.com/design/lF1WVFUs6FAzgNZ4DBEHQz/Greall-s-Website-Rebranding?node-id=463-9841&t=nlMA7sCFaPU6OIpn-1" },
        { label: "View All Projects", href: "/work" },
      ],
    };
  }

  if (/somewhere|hotel|hospitality|spatial web/i.test(norm)) {
    return {
      text: `**Somewhere Hotel** is an editorial spatial web reservation concept translating architectural daylight transitions, suite floor plan layouts, and calm curation into digital hospitality.`,
      actionChips: [
        { label: "Inspect Somewhere Hotel", href: "/work/somewhere-hotel" },
        { label: "View All Projects", href: "/work" },
      ],
    };
  }

  if (/buybuddy|storefront|micro-commerce|merchant/i.test(norm)) {
    return {
      text: `**BuyBuddy** is a commerce platform streamlining informal merchant commerce with instant bio-link storefronts, catalog management, and protected escrow buyer inquiries.`,
      actionChips: [
        { label: "Inspect BuyBuddy Case Study", href: "/work/buybuddy" },
        { label: "View All Projects", href: "/work" },
      ],
    };
  }

  if (/stillwater|concert|acoustic|auditorium/i.test(norm)) {
    return {
      text: `**Stillwater Hall** is an acoustic architectural concert walkthrough that translates hall geometry, acoustic timber surfaces, and 8 sequential chapter perspectives into a paced digital experience.`,
      actionChips: [
        { label: "Inspect Stillwater Hall", href: "/work/stillwater" },
        { label: "View All Projects", href: "/work" },
      ],
    };
  }

  if (/will|digital legacy|estate|succession/i.test(norm)) {
    return {
      text: `**Will** is a digital legacy and estate planning concept helping individuals inventory accounts, appoint verified beneficiaries, and ensure secure transfer of memories and assets with empathetic onboarding.`,
      actionChips: [
        { label: "Inspect Will Case Study", href: "/work/will" },
        { label: "View All Projects", href: "/work" },
      ],
    };
  }

  if (/agrivillage|agriculture|farmer|produce/i.test(norm)) {
    return {
      text: `**AgriVillage** is a streamlined agricultural marketplace concept designed to bridge rural farming cooperatives with urban distributors, improving harvest price discovery and bulk logistics.`,
      actionChips: [
        { label: "Inspect AgriVillage Case Study", href: "/work/agrivillage" },
        { label: "View All Projects", href: "/work" },
      ],
    };
  }

  // 10. Design Systems & Figma Architecture
  if (/design system|token|component library|figma/i.test(norm)) {
    return {
      text: `Taye builds production-grade design systems in Figma utilizing Auto-Layout 5.0, variables, and semantic token architectures. His systems bridge design and code with dual light/dark themes, accessible typographic hierarchies (WCAG AA compliant), and clear engineering documentation. Examples include the [PROfile HRMS component system](/work/profile) and the [QuickEats dual-theme UI kit](/work/quickeats).`,
      actionChips: [
        { label: "Inspect PROfile Design System", href: "/work/profile" },
        { label: "Inspect QuickEats Dual Theme", href: "/work/quickeats" },
        { label: "Start Project Enquiry", action: "enquiry" },
      ],
    };
  }

  // 11. Tools & Engineering Skills
  if (/tools|tech stack|code|developer|engineering|react|nextjs|tailwind|gsap|photoshop/i.test(norm)) {
    return {
      text: `Taye bridges design and engineering as a **Design Technologist**:\n\n- **Design & Research**: Figma, Figjam, Adobe Photoshop, Grain, Google Forms, Teams, Slack.\n- **Frontend Craft**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, GSAP (ScrollTrigger & motion choreography), Motion (Framer Motion), Web Audio API.\n\nHe writes production code to ensure zero translation loss between interactive prototypes and shipping products.`,
      actionChips: [
        { label: "Visit The Lab", href: "/lab" },
        { label: "Download Resume", href: "/Taye%20Abolarin-Product%20Designer-Resume.pdf", action: "resume" },
      ],
    };
  }

  // 12. Location & Remote
  if (/location|where are you|where is taye|nigeria|time zone|remote|relocat/i.test(norm)) {
    return {
      text: `Taye is based in **Nigeria** and works **globally with remote teams**. He collaborates asynchronously across US, European, and African time zones with scheduled weekly video syncs via Google Meet or Teams.`,
      actionChips: [
        { label: "Start Project Enquiry", action: "enquiry" },
        { label: "Email Taye Directly", href: "mailto:abolarintaye20@gmail.com" },
      ],
    };
  }

  // 13. Resume / CV
  if (/resume|cv|curriculum|download|pdf/i.test(norm)) {
    return {
      text: `You can view and download Taye's verified PDF resume directly. It covers his complete product design experience across conversational healthcare triage, intercity transit systems, enterprise HR solutions, and technical competencies.`,
      actionChips: [
        { label: "Download Resume (PDF)", href: "/Taye%20Abolarin-Product%20Designer-Resume.pdf", action: "resume" },
        { label: "View LinkedIn Profile", href: ASK_COLD_KNOWLEDGE.profile.socialLinks.linkedin },
      ],
    };
  }

  // 14. Contact / Email / Meeting
  if (/contact|email|call|meet|zoom|reach out/i.test(norm)) {
    return {
      text: `You can connect with Taye directly via:\n\n- **Email**: [abolarintaye20@gmail.com](mailto:abolarintaye20@gmail.com)\n- **Project Enquiry**: Click **Start Project Enquiry** right here in Ask Cold to share your project brief.\n- **LinkedIn**: [linkedin.com/in/taye-abolarin-b503b0240](https://www.linkedin.com/in/taye-abolarin-b503b0240/)\n- **Behance**: [behance.net/Abolarin_Taye_Joseph](https://www.behance.net/Abolarin_Taye_Joseph)`,
      actionChips: [
        { label: "Start Project Enquiry", action: "enquiry" },
        { label: "Email Taye Directly", href: "mailto:abolarintaye20@gmail.com" },
      ],
    };
  }

  // 15. Philosophy / Approach
  if (/approach|philosophy|how does he|thinking/i.test(norm)) {
    return {
      text: `Taye's philosophy is: *"Design is the sum of a thousand invisible decisions."* He believes high-performing products eliminate friction by meeting users where they already communicate (such as WhatsApp-first triage in MEDesy), establishing intentional scanning hierarchies, and designing rigorous systems with tactile feedback.`,
      actionChips: [
        { label: "Explore The Lab", href: "/lab" },
        { label: "Read About Taye", href: "/about" },
      ],
    };
  }

  // 16. The Lab
  if (/lab|experiment|interactive/i.test(norm)) {
    return {
      text: `**The Lab** is Taye's interactive playground where you can experience interface decisions firsthand: button lifecycle states, layout density, typographic scanning contrast, and visual architecture studies including the Real Estate Discovery Hero and the University of Maiduguri redesign.`,
      actionChips: [
        { label: "Visit The Lab", href: "/lab" },
      ],
    };
  }

  // 17. Identity inquiry ("Who is Taye?", "Who is Cold Designer?")
  if (/who is|about taye|background|designer|cold designer/i.test(norm)) {
    return {
      text: `**Taye Abolarin** (known professionally as **Cold Designer**, **@cold_designer**) is an independent product designer and design technologist based in Nigeria, working with global teams.\n\nHe specializes in complex UX architectures, conversational triage gateways, intercity mobility platforms, creative collaboration SaaS, enterprise HR systems, and high-fidelity interaction design.`,
      actionChips: [
        { label: "Explore Projects", href: "/work" },
        { label: "Download Resume", href: "/Taye%20Abolarin-Product%20Designer-Resume.pdf", action: "resume" },
        { label: "Discuss a Project", action: "enquiry" },
      ],
    };
  }

  // 18. Honest Out-of-Scope / Unknown Fallback
  return {
    text: `I don't have verified information about that in Taye's portfolio.\n\nAs Taye's AI representative, I can answer questions about his verified design projects (such as [Spot](/work/spot), [MEDesy](/work/medesy), [QuickEats](/work/quickeats), [PROfile](/work/profile), [Raven Bank](/work/raven-bank), and [9jaTrip](/work/9jatrip)), full service catalog, availability for gigs, pricing policy, and design process.\n\nIf you'd like to ask Taye directly, feel free to email him at [abolarintaye20@gmail.com](mailto:abolarintaye20@gmail.com) or click **Start Project Enquiry** below.`,
    actionChips: [
      { label: "Start Project Enquiry", action: "enquiry" },
      { label: "Explore Projects", href: "/work" },
      { label: "Download Resume", href: "/Taye%20Abolarin-Product%20Designer-Resume.pdf", action: "resume" },
    ],
  };
}

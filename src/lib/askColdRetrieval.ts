import { ASK_COLD_KNOWLEDGE, KnowledgeProject } from "@/data/askColdKnowledge";

export interface RetrievedContext {
  primarySubject: "profile" | "project" | "lab" | "hiring" | "resume" | "general";
  relevantProjects: KnowledgeProject[];
  profileExcerpt: string;
  suggestedFollowUps: string[];
  groundedSummary: string;
}

/**
 * Normalizes input string for search
 */
function normalize(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
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
    if (slugNorm === "quickeats" && (normQuery.includes("quick eat") || normQuery.includes("quickeats") || normQuery.includes("meal prep") || normQuery.includes("food"))) score += 10;
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
  const relevantProjects = scoredProjects.slice(0, 2).map((s) => s.project);

  // Check for specific intents
  const isHiring = /hire|collaborat|work together|contact|reach out|project|availab|contract|freelance|rate|email|inquir/i.test(normQuery);
  const isResume = /resume|cv|curriculum|download|qualification|education/i.test(normQuery);
  const isAbout = /who is|about taye|background|designer|philosophy|approach|cold designer/i.test(normQuery);
  const isLab = /lab|experiment|playground|interactive|codex/i.test(normQuery);

  let primarySubject: RetrievedContext["primarySubject"] = "general";
  if (relevantProjects.length > 0 && !isHiring && !isResume) {
    primarySubject = "project";
  } else if (isHiring) {
    primarySubject = "hiring";
  } else if (isResume) {
    primarySubject = "resume";
  } else if (isLab) {
    primarySubject = "lab";
  } else if (isAbout) {
    primarySubject = "profile";
  }

  // Construct grounded summary for LLM prompt context
  let groundedSummary = `PROFILE:
Name: ${ASK_COLD_KNOWLEDGE.profile.publicName} (${ASK_COLD_KNOWLEDGE.profile.brandName})
Handle: ${ASK_COLD_KNOWLEDGE.profile.handle}
Title: ${ASK_COLD_KNOWLEDGE.profile.title}
Location: ${ASK_COLD_KNOWLEDGE.profile.location}
Summary: ${ASK_COLD_KNOWLEDGE.profile.summary}
Philosophy: "${ASK_COLD_KNOWLEDGE.profile.philosophy}"
Tools: ${ASK_COLD_KNOWLEDGE.profile.technicalTools.join(", ")}
Contact Email: ${ASK_COLD_KNOWLEDGE.profile.contactEmail}
Resume URL: ${ASK_COLD_KNOWLEDGE.profile.resumeUrl}
Socials: LinkedIn (${ASK_COLD_KNOWLEDGE.profile.socialLinks.linkedin}), Behance (${ASK_COLD_KNOWLEDGE.profile.socialLinks.behance}), TikTok (${ASK_COLD_KNOWLEDGE.profile.socialLinks.tiktok})
`;

  if (relevantProjects.length > 0) {
    groundedSummary += `\nRELEVANT PROJECTS:\n`;
    for (const p of relevantProjects) {
      groundedSummary += `- [${p.title}](${p.caseStudyUrl}): Category: ${p.category} (${p.year}). Role: ${p.role}. Headline: ${p.headline}. Summary: ${p.summary} Problem: ${p.challenge} Solution: ${p.solution} Deliverables: ${p.deliverables.join(", ")}\n`;
    }
  }

  // Context-tailored follow-ups
  const suggestedFollowUps: string[] = [];
  if (primarySubject === "project" && relevantProjects.length > 0) {
    suggestedFollowUps.push(`View ${relevantProjects[0].title} case study`);
    suggestedFollowUps.push("What was Taye's role on this project?");
    suggestedFollowUps.push("Discuss a similar project with Taye");
  } else if (primarySubject === "hiring") {
    suggestedFollowUps.push("Start an enquiry with Taye");
    suggestedFollowUps.push("Download Taye's Resume");
    suggestedFollowUps.push("Explore verified case studies");
  } else if (primarySubject === "resume") {
    suggestedFollowUps.push("Download PDF Resume");
    suggestedFollowUps.push("Explore top featured projects");
    suggestedFollowUps.push("Connect on LinkedIn");
  } else {
    suggestedFollowUps.push("Explore verified case studies");
    suggestedFollowUps.push("How does Taye approach design?");
    suggestedFollowUps.push("Can I hire Taye for a project?");
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
 * Generate quick deterministic local response for offline / mock testing or when API key is missing
 */
export function generateLocalMockResponse(query: string, currentPath: string = "/"): {
  text: string;
  actionChips?: { label: string; href?: string; action?: "enquiry" | "resume" | "link" }[];
} {
  const norm = normalize(query);

  // Route-aware context inquiry
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

  if (/hire|work together|collaborat|quote|inquir|availab/i.test(norm)) {
    return {
      text: "Taye is available for select product design engagements, complex SaaS architectures, design systems, and mobile app design. I can help you compile an enquiry right here, or you can send him an email directly at abolarintaye20@gmail.com.",
      actionChips: [
        { label: "Start Project Enquiry", action: "enquiry" },
        { label: "Email Taye Directly", href: "mailto:abolarintaye20@gmail.com" },
        { label: "View Verified Work", href: "/work" },
      ],
    };
  }

  if (/resume|cv|curriculum|download|pdf/i.test(norm)) {
    return {
      text: "You can download Taye's verified PDF resume directly. It includes his complete product design experience across conversational healthcare triage, intercity transit systems, enterprise HR solutions, and technical competencies.",
      actionChips: [
        { label: "Download Resume (PDF)", href: "/Taye%20Abolarin-Product%20Designer-Resume.pdf", action: "resume" },
        { label: "View LinkedIn Profile", href: ASK_COLD_KNOWLEDGE.profile.socialLinks.linkedin },
      ],
    };
  }

  if (/quick\s*eat|quickeats|meal prep|food/i.test(norm)) {
    return {
      text: `**QuickEats** is a mobile health & food tech case study designed by Taye. It empowers busy students and young professionals to eat healthy on a budget with personalized recipes under 20 minutes, pantry ingredient matching, and auto-generated grocery lists. It features both light and dark native themes.`,
      actionChips: [
        { label: "Inspect QuickEats Case Study", href: "/work/quickeats" },
        { label: "View All Projects", href: "/work" },
      ],
    };
  }

  if (/spot|feedback|critique/i.test(norm)) {
    return {
      text: `**Spot** is a creative collaboration platform where Taye served as **Lead Product Designer** directing an 8-week cross-functional team (PM, 2 frontend engineers, 2 designers). It features a spatial commenting canvas with coordinate-pinned critique, design asset vaults, and a community discussion forum across 30+ screens.`,
      actionChips: [
        { label: "Inspect Spot Case Study", href: "/work/spot" },
        { label: "View Team Leadership Specs", href: "/work/spot" },
      ],
    };
  }

  if (/profile|hrm|attendance|human resource/i.test(norm)) {
    return {
      text: `**PROfile** is an enterprise HRMS and Employee Self-Service (ESS) platform designed by Taye. It unifies administrative attendance tracking (258 employees), automated clock-in, predictive attrition risk signals, and mobile leave management into an accessible dashboard.`,
      actionChips: [
        { label: "Inspect PROfile Case Study", href: "/work/profile" },
        { label: "Explore Enterprise SaaS Work", href: "/work" },
      ],
    };
  }

  if (/raven|bank|fintech/i.test(norm)) {
    return {
      text: `**Raven Bank App** was a focused 2-day rapid mobile banking redesign sprint completed under Taye's alias **@cold_designer**. It restructured personal balance visibility, introduced single-tap beneficiary avatar chips for instant P2P transfers, and simplified biometric security.`,
      actionChips: [
        { label: "Inspect Raven Bank Case Study", href: "/work/raven-bank" },
        { label: "View Fintech Projects", href: "/work" },
      ],
    };
  }

  if (/medesy|doctor|whatsapp|health/i.test(norm)) {
    return {
      text: `**MEDesy** is a production healthcare platform where Taye designed a WhatsApp-first conversational triage gateway. Patients describe symptoms in ordinary language and connect directly with licensed Nigerian physicians, eliminating waiting room friction and app installation barriers.`,
      actionChips: [
        { label: "Inspect MEDesy Case Study", href: "/work/medesy" },
      ],
    };
  }

  if (/9ja|trip|transit|bus|coach/i.test(norm)) {
    return {
      text: `**9jaTrip** is an intercity mobility platform replacing informal bus park queues with verified hub-to-hub seat booking, transparent route pricing, and digital QR boarding passes.`,
      actionChips: [
        { label: "Inspect 9jaTrip Case Study", href: "/work/9jatrip" },
      ],
    };
  }

  if (/greall|rebrand|corporate identity/i.test(norm)) {
    return {
      text: `**Greall Corporate Rebrand** is an employment engagement where Taye led the digital identity overhaul for Greall Technologies. He established a clean corporate visual system, responsive web architecture, and structured service ecosystem messaging communicating technical credibility to enterprise partners.`,
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

  if (/will|digital legacy|estate/i.test(norm)) {
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

    if (/approach|philosophy|how does he|thinking/i.test(norm)) {
    return {
      text: `Taye's philosophy is: *"Design is the sum of a thousand invisible decisions."* He believes high-performing products eliminate friction by meeting users where they already communicate, establishing intentional scanning hierarchies, and designing rigorous systems with tactile feedback.`,
      actionChips: [
        { label: "Explore The Lab", href: "/lab" },
        { label: "Read About Taye", href: "/about" },
      ],
    };
  }

  if (/lab|experiment|interactive/i.test(norm)) {
    return {
      text: `**The Lab** is Taye's interactive playground where you can experience interface decisions firsthand: button lifecycle states, layout density, typographic scanning contrast, and visual architecture studies including the Real Estate Discovery Hero and the University of Maiduguri redesign.`,
      actionChips: [
        { label: "Visit The Lab", href: "/lab" },
      ],
    };
  }

  // Default fallback
  return {
    text: `Taye Abolarin (Cold Designer) is an independent product designer specializing in conversational UX, transit systems, enterprise SaaS, and mobile applications. You can explore his verified case studies, inspect his interactive experiments in The Lab, or download his resume.`,
    actionChips: [
      { label: "Explore Projects", href: "/work" },
      { label: "Visit The Lab", href: "/lab" },
      { label: "Download Resume", href: "/Taye%20Abolarin-Product%20Designer-Resume.pdf" },
      { label: "Discuss a Project", action: "enquiry" },
    ],
  };
}


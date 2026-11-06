import { ASK_COLD_KNOWLEDGE, KnowledgeProject } from "@/data/askColdKnowledge";
import {
  TAYE_PERSONA,
  TAYE_IDENTITY,
  TAYE_PERSONALITY,
  TAYE_PHILOSOPHY,
  TAYE_SKILLS,
  TAYE_EXPERIENCE,
  TAYE_PROJECTS,
  TAYE_WORKING_STYLE,
  TAYE_AMBITIONS,
  TAYE_CHALLENGING_INQUIRIES,
  DetailedProjectKnowledge,
} from "@/data/taye-persona";

export type ConversationalIntent =
  | "greeting"
  | "compliment"
  | "thanks"
  | "reaction"
  | "playful"
  | "casual_status"
  | "emotional"
  | "apology"
  | "goodbye"
  | "agreement"
  | "disagreement"
  | "topic_change"
  | "follow_up"
  | "general_knowledge"
  | "taye_identity"
  | "taye_project"
  | "taye_philosophy"
  | "taye_skills"
  | "taye_experience"
  | "taye_working_style"
  | "taye_ambitions"
  | "taye_challenging"
  | "taye_enquiry"
  | "boundary"
  | "general_chat";

export interface RetrievedContext {
  primarySubject:
    | "identity"
    | "personality"
    | "philosophy"
    | "challenging"
    | "skills"
    | "experience"
    | "project"
    | "workingStyle"
    | "ambitions"
    | "hiring"
    | "pricing"
    | "services"
    | "mobile"
    | "resume"
    | "lab"
    | "boundary"
    | "social"
    | "general";
  detectedIntent: ConversationalIntent;
  relevantProjects: DetailedProjectKnowledge[];
  profileExcerpt: string;
  suggestedFollowUps: string[];
  groundedSummary: string;
}

export interface ChatHistoryItem {
  role: string;
  text: string;
}

/**
 * Normalizes input string for search and intent recognition
 */
function normalize(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
}

/**
 * Resolves previously discussed project from conversation history
 */
function extractTargetProjectFromHistory(
  history: ChatHistoryItem[] = []
): DetailedProjectKnowledge | null {
  if (!history || history.length === 0) return null;

  for (let i = history.length - 1; i >= 0; i--) {
    const item = history[i];
    if (!item || typeof item.text !== "string") continue;
    const norm = normalize(item.text);

    for (const proj of TAYE_PROJECTS) {
      const slugNorm = normalize(proj.slug);
      const titleNorm = normalize(proj.title);
      if (norm.includes(slugNorm) || norm.includes(titleNorm)) {
        return proj;
      }
    }

    if (norm.includes("medesy")) return TAYE_PROJECTS.find((p) => p.slug === "medesy") || null;
    if (norm.includes("9jatrip") || norm.includes("9ja trip")) return TAYE_PROJECTS.find((p) => p.slug === "9jatrip") || null;
    if (norm.includes("spot")) return TAYE_PROJECTS.find((p) => p.slug === "spot") || null;
    if (norm.includes("profile") || norm.includes("hrm")) return TAYE_PROJECTS.find((p) => p.slug === "profile") || null;
    if (norm.includes("quickeats") || norm.includes("quick eat") || norm.includes("meal prep")) return TAYE_PROJECTS.find((p) => p.slug === "quickeats") || null;
    if (norm.includes("raven")) return TAYE_PROJECTS.find((p) => p.slug === "raven-bank") || null;
    if (norm.includes("greall")) return TAYE_PROJECTS.find((p) => p.slug === "greall-website") || null;
    if (norm.includes("somewhere")) return TAYE_PROJECTS.find((p) => p.slug === "somewhere-hotel") || null;
    if (norm.includes("buybuddy")) return TAYE_PROJECTS.find((p) => p.slug === "buybuddy") || null;
    if (norm.includes("stillwater")) return TAYE_PROJECTS.find((p) => p.slug === "stillwater") || null;
    if (norm.includes("will")) return TAYE_PROJECTS.find((p) => p.slug === "will") || null;
    if (norm.includes("agrivillage") || norm.includes("farmer")) return TAYE_PROJECTS.find((p) => p.slug === "agrivillage") || null;
    if (norm.includes("nova") || norm.includes("wellness")) return TAYE_PROJECTS.find((p) => p.slug === "nova-wellness") || null;
  }

  return null;
}

/**
 * Rigorous multi-intent classification engine for human-like conversational realism
 */
export function detectConversationalIntent(
  query: string,
  history: ChatHistoryItem[] = []
): ConversationalIntent {
  const norm = normalize(query).trim();
  const rawTrimmed = query.trim().toLowerCase();

  // 1. Boundary & Confidentiality
  if (/\b(phone number|salary|net worth|password|bank account|confidential|nda|bank details)\b/i.test(norm)) {
    return "boundary";
  }

  // 2. Apologies
  if (/\b(sorry|my bad|apologies|apologize|my mistake|pardon me|oops)\b/i.test(norm)) {
    return "apology";
  }

  // 3. Goodbyes
  if (
    /^(bye|goodbye|see ya|see you|talk later|good night|goodnight|take care|have a good one|cya)[!.]*$/i.test(norm) ||
    /\b(goodbye|see you later|talk to you later|have a great day|have a good day)\b/i.test(norm)
  ) {
    return "goodbye";
  }

  // 4. Appreciation & Thanks
  if (/\b(thanks|thank you|thx|ty|much appreciated|appreciate it|cheers)\b/i.test(norm)) {
    return "thanks";
  }

  // 5. Compliments & Praise (e.g. "Great! That's impressive", "Love your work")
  if (
    /impressive|you re amazing|you are amazing|love this|love your work|great portfolio|looks amazing|brilliant|masterpiece|super cool|really good work|killed it|so clean|incredible work|great work|fantastic work|very nice work|you re very talented|you are very talented|talented designer/i.test(norm) ||
    /that s (impressive|great|cool|awesome|amazing|fire|insane)/i.test(norm)
  ) {
    return "compliment";
  }

  // 6. Playful / Humor / Emojis
  if (
    /^(haha|hahaha|hehe|lol|lmao|rofl|xd)[!.]*$/i.test(norm) ||
    /^(😂|🤣|😄|😁|😆|👍)+$/i.test(rawTrimmed) ||
    /\b(joke|jokes|funny|make me laugh|are you single|do you sleep|marry me)\b/i.test(norm) ||
    /tell me (a|another) .*joke/i.test(norm)
  ) {
    return "playful";
  }

  // 7. Short reactions ("Great!", "Nice!", "Wow!", "Interesting", "Cool", "Sweet")
  if (
    /^(great|nice|cool|wow|awesome|interesting|sweet|neat|got it|makes sense|i see|understood|noted|alright|ok|okay|fair enough|dope|solid|clean|fire|lit)[!.]*$/i.test(norm) ||
    /^(sounds good|sounds great|makes sense|fair point|i get it)[!.]*$/i.test(norm)
  ) {
    return "reaction";
  }

  // 8. Casual status / "How are you?"
  if (
    /^(how are you|how r u|how are you doing|how s it going|how is it going|how you doing|what s up|what is up|how s your day|how are things)[?!\.]*$/i.test(norm)
  ) {
    return "casual_status";
  }

  // 9. Emotional expressions
  if (
    /\b(stressed|stuck|frustrated|overwhelmed|struggling|exhausted|burnout|excited|pumped)\b/i.test(norm) ||
    /this is hard|i feel overwhelmed/i.test(norm)
  ) {
    return "emotional";
  }

  // 10. Greetings
  if (
    /^(hi|hello|hey|hey there|good morning|good afternoon|good evening|yo|sup|hiya|greetings|hola|howdy)[!.]*$/i.test(norm)
  ) {
    return "greeting";
  }

  // 11. Agreement
  if (/\b(exactly|precisely|i agree|agree with you|so true|100%|definitely|absolutely|for sure|totally)\b/i.test(norm)) {
    return "agreement";
  }

  // 12. Disagreement
  if (/\b(i disagree|not really|i don t think so|doubt it|no way|hardly|not quite)\b/i.test(norm)) {
    return "disagreement";
  }

  // 13. Topic change
  if (
    /\b(anyway|moving on|changing topic|on another note|let s talk about|can we talk about|switch to|switch gears)\b/i.test(norm)
  ) {
    return "topic_change";
  }

  // 14. Follow-up inquiry referencing prior turn
  if (
    history.length > 0 &&
    (/what makes you say that|why do you say that|why is that|why though|can you explain more|how so|what do you mean|tell me more about that|what about the other|why do you think so/i.test(norm) ||
      norm === "why" ||
      norm === "how" ||
      norm === "really")
  ) {
    return "follow_up";
  }

  // 15. Challenging inquiries & pushback
  if (
    /good designer|why should i hire|why hire|disappoint|different|weakness|weaknesses|enough experience|complex platform|complex project|deadline missed|miss a deadline|trust you|trust him|are you good/i.test(norm)
  ) {
    return "taye_challenging";
  }

  // 16. Explicit Taye Identity questions (ONLY when specifically asked)
  if (
    /who are you|who is taye|who am i talking to|tell me who you are|what is your name|are you taye|tell me about yourself|tell me about taye/i.test(norm)
  ) {
    return "taye_identity";
  }

  // 17. Hiring / Enquiry / Pricing / Rates
  if (
    /\b(availab|gig|gigs|freelance|contract|hire|hiring|open for work|new client|quote|pricing|price|rates?|budget|fees?)\b/i.test(norm)
  ) {
    return "taye_enquiry";
  }

  // 18. Specific Projects
  for (const proj of TAYE_PROJECTS) {
    const slugNorm = normalize(proj.slug);
    const titleNorm = normalize(proj.title);
    if (norm.includes(slugNorm) || norm.includes(titleNorm)) return "taye_project";
  }
  if (/quickeat|spot|profile|medesy|9ja|raven|somewhere|buybuddy|stillwater|agrivillage|nova/i.test(norm)) {
    return "taye_project";
  }

  // 19. Philosophy & Doctrine
  if (
    /\b(philosophy|doctrine|why cold|cold mean|meaning of cold|why did you name|name your studio|why called cold|aesthetics and function|balance aesthetics)\b/i.test(norm) ||
    /what kind of designer|what type of designer|kind of design do you do/i.test(norm)
  ) {
    return "taye_philosophy";
  }

  // 20. Skills & Tech Stack
  if (
    /skills|tools|figma|canva|photoshop|tech stack|code|developer|designer or developer|typescript|react native|nextjs/i.test(norm)
  ) {
    return "taye_skills";
  }

  // 21. Experience & Past roles
  if (
    /where have you worked|experience|career|companies|medesy technologies|greall technologies|work history/i.test(norm)
  ) {
    return "taye_experience";
  }

  // 22. Working style & Process
  if (
    /working style|how do you work|feedback|client feedback|first design|don t like|process/i.test(norm)
  ) {
    return "taye_working_style";
  }

  // 23. Ambitions & Outside design
  if (
    /ambitions|outside design|free time|hobbies|learning currently|future direction|what are you learning/i.test(norm)
  ) {
    return "taye_ambitions";
  }

  // 24. General knowledge question (Design/tech concepts, general world)
  if (
    /what is the difference|difference between|how do you define|explain the concept of|what is typography|what is white space|what is contrast|what is visual hierarchy|how does|what is ux|what is ui|why does/i.test(norm)
  ) {
    return "general_knowledge";
  }

  return "general_chat";
}

/**
 * Retrieves the most relevant persona and portfolio knowledge based on user query & current page
 */
export function retrieveContext(
  query: string,
  currentPath: string = "/",
  history: ChatHistoryItem[] = []
): RetrievedContext {
  const normQuery = normalize(query);
  const words = normQuery.split(/\s+/).filter(Boolean);
  const detectedIntent = detectConversationalIntent(query, history);

  // Check for project matches
  const scoredProjects: { project: DetailedProjectKnowledge; score: number }[] = [];

  for (const proj of TAYE_PROJECTS) {
    let score = 0;
    const titleNorm = normalize(proj.title);
    const slugNorm = normalize(proj.slug);
    const categoryNorm = normalize(proj.category);
    const summaryNorm = normalize(proj.summary);

    if (normQuery.includes(titleNorm) || normQuery.includes(slugNorm)) score += 10;
    if (slugNorm === "quickeats" && (normQuery.includes("quick eat") || normQuery.includes("quickeats") || normQuery.includes("meal prep") || normQuery.includes("food tech") || normQuery.includes("pantry"))) score += 10;
    if (slugNorm === "spot" && (normQuery.includes("spot") || normQuery.includes("feedback") || normQuery.includes("critique"))) score += 10;
    if (slugNorm === "profile" && (normQuery.includes("profile") || normQuery.includes("hrm") || normQuery.includes("human resource") || normQuery.includes("attendance"))) score += 10;
    if (slugNorm === "raven-bank" && (normQuery.includes("raven") || normQuery.includes("raven bank") || normQuery.includes("p2p transfer"))) score += 10;
    if (slugNorm === "medesy" && (normQuery.includes("medesy") || normQuery.includes("health") || normQuery.includes("doctor") || normQuery.includes("whatsapp") || normQuery.includes("triage"))) score += 10;
    if (slugNorm === "9jatrip" && (normQuery.includes("9ja") || normQuery.includes("trip") || normQuery.includes("transit") || normQuery.includes("bus") || normQuery.includes("coach"))) score += 10;
    if (slugNorm === "will" && (normQuery.includes("will") || normQuery.includes("legacy") || normQuery.includes("estate") || normQuery.includes("asset"))) score += 10;
    if (slugNorm === "agrivillage" && (normQuery.includes("agri") || normQuery.includes("farm") || normQuery.includes("produce"))) score += 10;
    if (slugNorm === "nova-wellness" && (normQuery.includes("nova") || normQuery.includes("wellness") || normQuery.includes("mood") || normQuery.includes("mental"))) score += 10;

    for (const w of words) {
      if (w.length < 3) continue;
      if (titleNorm.includes(w)) score += 3;
      if (categoryNorm.includes(w)) score += 2;
      if (summaryNorm.includes(w)) score += 1;
    }

    if (currentPath.includes(proj.slug)) {
      score += 4;
    }

    if (score > 0) {
      scoredProjects.push({ project: proj, score });
    }
  }

  scoredProjects.sort((a, b) => b.score - a.score);
  const relevantProjects = scoredProjects.slice(0, 3).map((s) => s.project);

  // Primary subject mapping
  let primarySubject: RetrievedContext["primarySubject"] = "general";
  if (detectedIntent === "boundary") {
    primarySubject = "boundary";
  } else if (detectedIntent === "taye_challenging") {
    primarySubject = "challenging";
  } else if (detectedIntent === "taye_skills") {
    primarySubject = "skills";
  } else if (detectedIntent === "taye_ambitions") {
    primarySubject = "ambitions";
  } else if (detectedIntent === "taye_working_style") {
    primarySubject = "workingStyle";
  } else if (detectedIntent === "taye_philosophy") {
    primarySubject = "philosophy";
  } else if (detectedIntent === "taye_identity") {
    primarySubject = "identity";
  } else if (detectedIntent === "taye_enquiry") {
    primarySubject = "hiring";
  } else if (detectedIntent === "taye_experience") {
    primarySubject = "experience";
  } else if (detectedIntent === "taye_project" || relevantProjects.length > 0) {
    primarySubject = "project";
  } else if (
    detectedIntent === "compliment" ||
    detectedIntent === "reaction" ||
    detectedIntent === "thanks" ||
    detectedIntent === "playful" ||
    detectedIntent === "casual_status" ||
    detectedIntent === "emotional" ||
    detectedIntent === "apology" ||
    detectedIntent === "goodbye" ||
    detectedIntent === "greeting" ||
    detectedIntent === "agreement" ||
    detectedIntent === "disagreement" ||
    detectedIntent === "topic_change"
  ) {
    primarySubject = "social";
  }

  // Construct grounded summary with full first-person fidelity
  let groundedSummary = `IDENTITY & BACKGROUND (Category A):
Name: ${TAYE_IDENTITY.preferredPublicName} (${TAYE_IDENTITY.fullName}), Moniker: ${TAYE_IDENTITY.studioBrand} (${TAYE_IDENTITY.handle})
Role: ${TAYE_IDENTITY.roleTitle} based in ${TAYE_IDENTITY.baseLocation}.
Work model: ${TAYE_IDENTITY.workArrangement}.
Journey: ${TAYE_IDENTITY.originStory.discovery}
Education: ${TAYE_IDENTITY.originStory.education}
Milestones: ${TAYE_IDENTITY.originStory.milestones.join("; ")}
Creative pursuits: ${TAYE_IDENTITY.originStory.creativePursuits.join("; ")}
Public profiles: LinkedIn (${TAYE_IDENTITY.publicProfiles[0].url}), Behance (${TAYE_IDENTITY.publicProfiles[1].url}), TikTok (${TAYE_IDENTITY.publicProfiles[2].url}), GitHub (${TAYE_IDENTITY.publicProfiles[4].url}).

PERSONALITY & COMMUNICATION STYLE (Category B):
Core traits: ${TAYE_PERSONALITY.traits.map((t) => `${t.name}: ${t.description}`).join("; ")}
Tone & Voice: ${TAYE_PERSONALITY.communicationStyle.tone}
Motivations: ${TAYE_PERSONALITY.motivations.join("; ")}
Working preferences: ${TAYE_PERSONALITY.workingPreferences.join("; ")}
Self-Awareness & Documented Weaknesses:
${TAYE_PERSONALITY.growthAreasAndWeaknesses.map((w) => `- ${w.area}: ${w.reflection} (How addressed: ${w.howAddressed})`).join("\n")}

DESIGN PHILOSOPHY & DOCTRINE OF "COLD" (Category C):
Creed: "${TAYE_PHILOSOPHY.coreCreed}"
The Meaning of "Cold": ${TAYE_PHILOSOPHY.meaningOfCold}
Key Principles:
${TAYE_PHILOSOPHY.principles.map((p) => `- ${p.title}: ${p.statement} — ${p.elaboration}`).join("\n")}
Influences: Tadao Ando (concrete geometry & quiet structural honesty), Dieter Rams (reductionism, 'less but better'), Josef Müller-Brockmann (Swiss grid & typography discipline).

SKILLS & TECHNICAL CAPABILITIES (Category D):
Established Core: Figma (auto-layout 5.0, variables, tokens), Conversational UX (WhatsApp triage), Design Systems, Enterprise SaaS dashboards, Mobile ergonomics (iOS/Android).
Developing Technical: Next.js App Router, React 19, TypeScript, Tailwind CSS, React Native (Expo SDK 57), GSAP, Web Audio API.
Primary Tools: Figma, Figjam, Adobe Photoshop, Canva, Grain, Teams, Slack, VS Code.

PROFESSIONAL EXPERIENCE (Category E):
- Medesy Technologies (2024–Present, Employment): Product Designer. WhatsApp-first healthcare triage gateway and web service portal.
- Greall Technologies (2023–2024, Employment): Product Designer. Corporate brand identity evolution and fintech web architecture overhaul.
- Cold Designer Studio (2023–Present, Studio Practice): Lead Product Designer & Design Technologist. Leading Spot, PROfile, QuickEats, Raven Bank sprint, 9jaTrip.

WORKING STYLE & FEEDBACK (Category G):
Collaboration approach: Open, iterative collaboration in wireframes before high-fidelity visual polish. No 'big reveals'.
Handling Feedback & Dislikes: Feedback is treated as diagnostic data, never an attack. If a client dislikes an initial concept, we diagnose what isn't serving the user/brand and iterate constructively without ego.
Communication: Dedicated weekly syncs, async Slack/Teams updates, Loom walkthroughs, and direct Figma comments.
Deadlines: Estimates based on deliverable depth; proactive communication if scope expands.

INTERESTS & AMBITIONS (Category H):
Currently Learning: Advanced shaders & performant WebGL interactions, React Native Reanimated 3, and AI agentic UX architectures.
Long-Term Vision: ${TAYE_AMBITIONS.longTermDirection.vision}
Outside Design: ${TAYE_AMBITIONS.interestsOutsideDesign.map((i) => `${i.interest}: ${i.description}`).join("; ")}

HANDLING CHALLENGING & SUBJECTIVE QUESTIONS (Category I):
${TAYE_CHALLENGING_INQUIRIES.map((c) => `- ${c.topic} ("${c.typicalVisitorQuestion}"): Direct perspective -> ${c.tayeDirectPerspective}`).join("\n")}

BOUNDARIES & CONFIDENTIALITY (Category J):
${TAYE_IDENTITY.boundaries.privacyNotice}
Confidential: ${TAYE_IDENTITY.boundaries.confidentialTopics.join("; ")}
When unknown: Respond naturally without robotic error phrases, offering email contact (abolarintaye20@gmail.com).
`;

  if (relevantProjects.length > 0 && primarySubject === "project") {
    groundedSummary += `\nSPECIFIC MATCHED PROJECTS (Category F):\n`;
    for (const p of relevantProjects) {
      groundedSummary += `- [${p.title}](${p.caseStudyUrl}): ${p.category} (${p.year}). Role: ${p.role}. Headline: ${p.headline}. Why it exists: ${p.whyItExists}. Challenge: ${p.problemAddressed}. Key decisions: ${p.keyDesignDecisions.join("; ")}. Learnings: ${p.keyLearnings}\n`;
    }
  }

  // Context-tailored follow-up suggestions (only when non-social or explicitly requested)
  const suggestedFollowUps: string[] = [];
  if (primarySubject === "challenging" || primarySubject === "philosophy") {
    suggestedFollowUps.push("What makes your design approach different?");
    suggestedFollowUps.push("Discuss a similar project");
  } else if (primarySubject === "skills") {
    suggestedFollowUps.push("Are you more interested in design or development?");
    suggestedFollowUps.push("What tools do you use daily?");
  } else if (primarySubject === "project") {
    suggestedFollowUps.push("Explore featured case studies");
  }

  return {
    primarySubject,
    detectedIntent,
    relevantProjects: primarySubject === "project" ? relevantProjects : [],
    profileExcerpt: TAYE_IDENTITY.bioSummary,
    suggestedFollowUps,
    groundedSummary,
  };
}

/**
 * Intelligent deterministic local response generator in natural 1st-person voice,
 * faithfully representing Taye Abolarin (Cold Designer) across social, professional,
 * and reflective conversational modes.
 */
export function generateLocalMockResponse(
  query: string,
  currentPath: string = "/",
  history: ChatHistoryItem[] = []
): {
  text: string;
  actionChips?: { label: string; href?: string; action?: "enquiry" | "resume" | "link" }[];
} {
  const norm = normalize(query).trim();
  const rawTrimmed = query.trim();
  const intent = detectConversationalIntent(query, history);

  // 1. PRIVACY & CONFIDENTIALITY BOUNDARIES (Always run first!)
  if (intent === "boundary") {
    return {
      text: `That's something I keep private, as I respect client NDAs and personal boundaries. For professional inquiries, project briefs, or scheduling a call, you can reach me directly at [abolarintaye20@gmail.com](mailto:abolarintaye20@gmail.com)—I read and respond personally to thoughtful messages.`,
      actionChips: [
        { label: "Email Me Directly", href: "mailto:abolarintaye20@gmail.com" },
        { label: "Start Project Enquiry", action: "enquiry" },
      ],
    };
  }

  // 2. APOLOGIES
  if (intent === "apology") {
    return {
      text: "No need to apologize at all! All good on my end. What can I help you explore?",
    };
  }

  // 3. GOODBYES
  if (intent === "goodbye") {
    return {
      text: "Take care! Thanks for stopping by. Reach out anytime if you want to chat design or discuss a project.",
    };
  }

  // 4. APPRECIATION & THANKS
  if (intent === "thanks") {
    return {
      text: "You're very welcome! Glad I could help. Let me know if anything else comes to mind.",
    };
  }

  // 5. COMPLIMENTS & PRAISE (e.g. "Great! That's impressive", "Love your work")
  if (intent === "compliment") {
    return {
      text: "Thank you! I really appreciate that. I spend a lot of time stripping away friction so complex systems feel obvious and effortless. Is there a specific project or interaction that stood out to you?",
      actionChips: [
        { label: "Explore Projects", href: "/work" },
        { label: "Start Project Enquiry", action: "enquiry" },
      ],
    };
  }

  // 6. SHORT REACTIONS ("Great!", "Nice!", "Wow!", "Interesting", "Cool", "Sweet")
  if (intent === "reaction") {
    if (/interesting/i.test(norm)) {
      return {
        text: "Glad it sparked some thought! Feel free to ask more about that, or we can jump to another topic whenever you're ready.",
      };
    }
    if (/makes sense|got it|understood|noted/i.test(norm)) {
      return {
        text: "Glad that makes sense! What would you like to explore next?",
      };
    }
    return {
      text: "Glad to hear that! What would you like to explore next?",
    };
  }

  // 7. PLAYFUL / HUMOR / EMOJIS
  if (intent === "playful") {
    if (/joke/i.test(norm)) {
      return {
        text: "Why do designers love dark mode? Because light attracts bugs! On a serious note, design systems can get intensely serious with all the token models and responsive constraints, so a little levity is always welcome.",
      };
    }
    return {
      text: "Haha, glad I could bring a smile! Interface design can get intensely serious with token models, bezier curves, and responsive edge cases, so a little levity is always welcome.",
    };
  }

  // 8. CASUAL STATUS ("How are you?", "What's up?")
  if (intent === "casual_status") {
    return {
      text: "I'm doing well, thanks for asking! Operating smoothly as Taye's digital self, ready to talk design systems, break down projects, or unpack how I think through tricky UX problems. How are you doing today?",
    };
  }

  // 9. EMOTIONAL EXPRESSIONS
  if (intent === "emotional") {
    return {
      text: "I hear you. Creative hurdles, scope creep, and messy layout systems can be genuinely exhausting. Take a breath—what specific part of the product or design challenge is feeling heavy right now? We can break it down together.",
    };
  }

  // 10. GREETINGS
  if (intent === "greeting") {
    return {
      text: "Hey! Good to have you here. I'm Taye's digital self. Feel free to ask me about my projects, design philosophy, how I collaborate, or whatever design challenge is on your mind.",
      actionChips: [
        { label: "Explore Projects", href: "/work" },
        { label: "Read Design Philosophy", href: "/about" },
      ],
    };
  }

  // 11. AGREEMENT & DISAGREEMENT
  if (intent === "agreement") {
    return {
      text: "Exactly. When an interface aligns with human intuition and engineering reality, everything else falls into place naturally.",
    };
  }
  if (intent === "disagreement") {
    return {
      text: "Fair perspective! Good design thrives on healthy debate and questioning assumptions. What's your take on it?",
    };
  }

  // 12. TOPIC CHANGE
  if (intent === "topic_change") {
    return {
      text: "Sounds great—let's dive into design. Are you curious about my design philosophy, mobile apps, design systems, or a specific product challenge you're thinking through?",
      actionChips: [
        { label: "Explore Projects", href: "/work" },
        { label: "Read Design Philosophy", href: "/about" },
      ],
    };
  }

  // 13. CONVERSATIONAL FOLLOW-UP CONTEXT (From chat history)
  if (intent === "follow_up") {
    // Check if there was a target project in recent history
    const targetProject = extractTargetProjectFromHistory(history);
    if (targetProject) {
      return {
        text: `On **${targetProject.title}**, my design choices were driven by the user's real-world environment. In high-friction scenarios, every extra tap or decorative element adds cognitive load. Stripping away the noise allowed users to complete their primary workflow with zero hesitation.`,
        actionChips: [
          { label: `View ${targetProject.title} Case Study`, href: targetProject.caseStudyUrl },
          { label: "View All Projects", href: "/work" },
        ],
      };
    }

    // Check if previous assistant message discussed philosophy or general design
    return {
      text: `I say that because in my experience across complex systems (like healthcare triage on MEDesy and enterprise workflows on PROfile), the biggest bottleneck is almost always cognitive overload. When you eliminate decorative distractions and align the layout with how people actually think, the software feels inevitable rather than designed.`,
      actionChips: [
        { label: "Read Design Philosophy", href: "/about" },
        { label: "Explore Case Studies", href: "/work" },
      ],
    };
  }

  // 14. GENERAL KNOWLEDGE QUESTIONS (Typography, UX vs UI, Design Systems)
  if (intent === "general_knowledge") {
    if (/typography|serif|sans serif/i.test(norm)) {
      return {
        text: `In digital product design, **serif typefaces** feature small decorative strokes (feet) at character terminals, often conveying tradition, editorial depth, and literary authority. **Sans-serif typefaces** lack these strokes, providing clean, geometric clarity that scales effortlessly across modern digital displays and varying pixel densities.\n\nIn my practice as Cold Designer, I lean heavily into crisp grotesque sans-serifs for interface legibility, occasionally paired with high-contrast serifs for editorial or architectural warmth.`,
        actionChips: [
          { label: "Read Design Philosophy", href: "/about" },
          { label: "Visit The Lab", href: "/lab" },
        ],
      };
    }

    if (/ux\b.*ui|difference between ux|ui vs ux/i.test(norm)) {
      return {
        text: `At its core, **UX (User Experience)** is about the architecture, workflow, and mental model of the product—how information is structured, how a user navigates from intent to resolution, and eliminating cognitive friction. **UI (User Interface)** is the sensory, visual execution—typography, contrast, spatial pacing, micro-interactions, and design tokens that bring that architecture to life.\n\nGreat product design happens when UX and UI are completely inseparable, resulting in an interface that feels obvious from the very first touch.`,
        actionChips: [
          { label: "Read Design Philosophy", href: "/about" },
          { label: "Explore Projects", href: "/work" },
        ],
      };
    }

    if (/design system|token/i.test(norm)) {
      return {
        text: `A **Design System** is a unified single source of truth connecting reusable design components in Figma with production code in Next.js or React. By structuring visual variables into semantic design tokens (like \`color-bg-primary\` or \`space-4\`), designers and developers share an exact vocabulary, ensuring zero layout shift and rapid feature development.`,
        actionChips: [
          { label: "Visit The Lab", href: "/lab" },
          { label: "Inspect Spot Case Study", href: "/work/spot" },
        ],
      };
    }
  }

  // 15. TARGET PROJECT INQUIRIES FROM HISTORY (If user asks "tell me more", "what was the challenge", etc.)
  const targetProject = extractTargetProjectFromHistory(history);
  if (targetProject) {
    const isAskingRole = /\b(your role|my role|his role|what did you do|what was your role|position)\b/i.test(norm);
    const isAskingChallenge = /\b(challenge|hardest|difficult|obstacle|hurdle)\b/i.test(norm);
    const isAskingPrototype = /\b(prototype|link|figma|behance|live|see it|show me|can i see)\b/i.test(norm);
    const isAskingMore = /\b(tell me more|how long|deliverables|details|timeline)\b/i.test(norm);

    if (isAskingRole) {
      return {
        text: `On **${targetProject.title}**, I served as **${targetProject.role}** (${targetProject.timeline}).\n\n${targetProject.summary}\n\n**My core contributions:**\n${targetProject.myContribution.map((c: string) => `- ${c}`).join("\n")}`,
        actionChips: [
          { label: `View ${targetProject.title} Case Study`, href: targetProject.caseStudyUrl },
          ...(targetProject.prototypeUrl ? [{ label: "Open Prototype", href: targetProject.prototypeUrl }] : []),
          { label: "Discuss Similar Project", action: "enquiry" },
        ],
      };
    }

    if (isAskingChallenge) {
      return {
        text: `The most demanding challenge on **${targetProject.title}** was ${targetProject.challengesEncountered.toLowerCase()}\n\nTo solve this, I ${targetProject.keyDesignDecisions[0].toLowerCase()}`,
        actionChips: [
          { label: `Explore ${targetProject.title}`, href: targetProject.caseStudyUrl },
          { label: "View All Projects", href: "/work" },
        ],
      };
    }

    if (isAskingPrototype) {
      const url = targetProject.prototypeUrl || targetProject.githubUrl || targetProject.caseStudyUrl;
      return {
        text: `You can explore the verified artifacts from my work on **${targetProject.title}** directly:\n\n- [${targetProject.title} Case Study](${targetProject.caseStudyUrl})\n${targetProject.prototypeUrl ? `- [Figma / Behance Specification](${targetProject.prototypeUrl})\n` : ""}${targetProject.githubUrl ? `- [GitHub Source Repository](${targetProject.githubUrl})\n` : ""}`,
        actionChips: [
          { label: `Open ${targetProject.title}`, href: url },
          { label: "View All Projects", href: "/work" },
        ],
      };
    }

    if (isAskingMore) {
      return {
        text: `On **${targetProject.title}** (${targetProject.category}, ${targetProject.year}), my focus was: ${targetProject.headline}.\n\n**Key Decision:** ${targetProject.keyDesignDecisions.join("; ")}.\n\n**What I learned:** ${targetProject.keyLearnings}`,
        actionChips: [
          { label: `View ${targetProject.title} Case Study`, href: targetProject.caseStudyUrl },
          { label: "Discuss Project", action: "enquiry" },
        ],
      };
    }
  }

  // 16. CHALLENGING QUESTIONS & SOCIAL INTELLIGENCE
  if (/good designer|are you talented|is taye talented|is taye creative|are you creative|are you good/i.test(norm)) {
    const item = TAYE_CHALLENGING_INQUIRIES[0];
    return {
      text: item.recommendedResponse,
      actionChips: [
        { label: "Explore Case Studies", href: "/work" },
        { label: "Read Design Philosophy", href: "/about" },
        { label: "Discuss a Project", action: "enquiry" },
      ],
    };
  }

  if (/why should i hire|why hire you|why hire taye|what makes (your|his) work different|what makes you different/i.test(norm)) {
    const item = TAYE_CHALLENGING_INQUIRIES[1];
    return {
      text: item.recommendedResponse,
      actionChips: [
        { label: "Start Project Enquiry", action: "enquiry" },
        { label: "Inspect QuickEats Mobile App", href: "/work/quickeats" },
        { label: "Inspect PROfile HRMS", href: "/work/profile" },
      ],
    };
  }

  if (/how do i know you won t disappoint|why should i trust you|disappoint me|trust you with my product/i.test(norm)) {
    const item = TAYE_CHALLENGING_INQUIRIES[2];
    return {
      text: item.recommendedResponse,
      actionChips: [
        { label: "Start Project Enquiry", action: "enquiry" },
        { label: "Email Me Directly", href: "mailto:abolarintaye20@gmail.com" },
      ],
    };
  }

  if (/don t like your first design|don t like his first design|don t like the design|reject your design|dislike your first design/i.test(norm)) {
    const item = TAYE_CHALLENGING_INQUIRIES[3];
    return {
      text: item.recommendedResponse,
      actionChips: [
        { label: "View Design Process", href: "/about" },
        { label: "Start Project Enquiry", action: "enquiry" },
      ],
    };
  }

  if (/enough experience|complex platform|handle a complex project|are you senior/i.test(norm)) {
    const item = TAYE_CHALLENGING_INQUIRIES[4];
    return {
      text: item.recommendedResponse,
      actionChips: [
        { label: "Inspect MEDesy (Healthcare)", href: "/work/medesy" },
        { label: "Inspect PROfile (Enterprise)", href: "/work/profile" },
        { label: "Inspect Spot (Multiplayer)", href: "/work/spot" },
      ],
    };
  }

  if (/deadline is missed|miss a deadline|late delivery|what happens if a deadline/i.test(norm)) {
    const item = TAYE_CHALLENGING_INQUIRIES[5];
    return {
      text: item.recommendedResponse,
      actionChips: [
        { label: "Start Project Enquiry", action: "enquiry" },
        { label: "Email Me Directly", href: "mailto:abolarintaye20@gmail.com" },
      ],
    };
  }

  if (/weakness|weaknesses|what are your weaknesses|what are your shortcomings|growth areas/i.test(norm)) {
    const item = TAYE_CHALLENGING_INQUIRIES[6];
    return {
      text: item.recommendedResponse,
      actionChips: [
        { label: "Read Design Philosophy", href: "/about" },
        { label: "Explore Case Studies", href: "/work" },
      ],
    };
  }

  if (/more (of a|interested in)? ?(designer or developer|design or development|code or design)/i.test(norm)) {
    const item = TAYE_CHALLENGING_INQUIRIES[7];
    return {
      text: item.recommendedResponse,
      actionChips: [
        { label: "Explore Projects", href: "/work" },
        { label: "Visit The Lab", href: "/lab" },
      ],
    };
  }

  // 17. PERSONALITY, MOTIVATIONS & OUTSIDE INTERESTS
  if (/outside design|free time|hobbies|what do you do outside|when you re not designing|passions/i.test(norm)) {
    return {
      text: `Outside product design, I spend time studying physical architecture—especially the raw concrete minimalism of Tadao Ando and brutalist structures. The way natural daylight defines spaces translates directly into how I think about digital whitespace and contrast.\n\nI also have a deep fascination with sound design and ambient pacing, which is why I experiment with procedural audio micro-interactions. Beyond that, I create design breakdowns and UI critiques on TikTok (@taye_abolarin2) to help upcoming designers learn the craft, and I appreciate a quiet, minimalist workspace with a great cup of coffee.`,
      actionChips: [
        { label: "Connect on TikTok", href: "https://www.tiktok.com/@taye_abolarin2" },
        { label: "Read About My Practice", href: "/about" },
      ],
    };
  }

  if (/what kind of person|personality|what motivates you|who is taye as a person/i.test(norm)) {
    return {
      text: `I'd describe myself as calm, disciplined, and genuinely curious. I'm motivated by solving messy, high-friction problems—especially in domains where software directly impacts people's daily lives, like healthcare triage in Nigeria or regional transit.\n\nIn collaboration, I'm ego-free: I see feedback as diagnostic data about the product rather than personal criticism. I like my interfaces cold and my communication warm, transparent, and direct.`,
      actionChips: [
        { label: "Read Design Philosophy", href: "/about" },
        { label: "Explore Case Studies", href: "/work" },
      ],
    };
  }

  // 18. AMBITIONS & CURRENT LEARNING
  if (/currently learning|what are you learning|learning right now|future direction|ambitions|career aspirations/i.test(norm)) {
    return {
      text: `Right now, I'm actively deepening my skills in three key areas:\n\n1. **Advanced Shaders & WebGL Interaction**: Mastering performant canvas shaders and spatial web surfaces that elevate interfaces without draining device battery.\n2. **React Native Mobile Architecture**: Building deeper fluency in Expo SDK, Reanimated 3, and private on-device SQLite databases (as in my [Nova Wellness](/lab) concept).\n3. **AI Agentic UX**: Exploring how intelligent representations and autonomous agents should communicate naturally without falling into the uncanny valley.\n\nLong-term, my vision is to grow Cold Designer into an internationally renowned independent studio known for ruthless clarity and atmospheric craft.`,
      actionChips: [
        { label: "Explore The Lab", href: "/lab" },
        { label: "Read Full Bio", href: "/about" },
      ],
    };
  }

  // 19. IDENTITY & EDUCATION (Strictly when asked about who Taye is, journey, study)
  if (/where did you study|study design|vephla|education|how did you get into design|journey into design|why did you become a/i.test(norm)) {
    return {
      text: `My journey into product design started with an obsession for how software works beneath the surface. I was fascinated by the contrast between tools that feel effortless and software that leaves people exhausted.\n\nI sharpened my craft through intensive design study at **Vephla University (VephlaUni Africa)**, paired with continuous self-directed learning in interaction design, typography systems, and frontend engineering. Vephla recognized my transition as one of their featured tech alumni success stories when I broke into the industry. Since then, I've designed for Greall Technologies, architected WhatsApp healthcare triage at Medesy Technologies, and established Cold Designer Studio.`,
      actionChips: [
        { label: "Read Full Bio", href: "/about" },
        { label: "Download Resume", href: "/Taye%20Abolarin-Product%20Designer-Resume.pdf", action: "resume" },
        { label: "Explore Projects", href: "/work" },
      ],
    };
  }

  if (/why cold|what does cold mean|why did you name|doctrine of cold|meaning of cold/i.test(norm)) {
    return {
      text: `I chose the moniker **Cold Designer** because in a digital landscape filled with over-stimulating decoration, intrusive banners, and generic templates, **"Cold" represents my intentional commitment to clarity**.\n\nTo me, Cold is not emotional detachment. Cold is the temperature of clear thinking. It is my disciplined elimination of non-essential noise until an interface feels effortless, functional, and grounded in human reality. Whether designing emergency healthcare triage on WhatsApp or structuring an enterprise HR dashboard, my goal is always the same: respect the user's finite time and attention.`,
      actionChips: [
        { label: "Read Design Ethos", href: "/about" },
        { label: "Explore Case Studies", href: "/work" },
      ],
    };
  }

  if (/what is good design|good product design|design philosophy|how do you approach design|balance aesthetics/i.test(norm)) {
    return {
      text: `My core design creed is: *"An interface should feel obvious, not because it is trivial to design, but because every layer of confusion has been stripped away."*\n\nTo me, balancing aesthetics and functionality means:\n1. **Aesthetics create trust; functionality delivers respect**: Visual polish is hollow without reliable workflows.\n2. **Clarity as a discipline**: Subtracting decorative clutter so the user's path is intuitive.\n3. **Meeting users in their reality**: Like designing healthcare triage on WhatsApp (MEDesy) where users already communicate.\n4. **Design-to-code fidelity**: Ensuring Figma files translate into production code with zero layout shift.`,
      actionChips: [
        { label: "Explore The Lab", href: "/lab" },
        { label: "Read About My Practice", href: "/about" },
      ],
    };
  }

  if (/what kind of designer|what type of designer|kind of design do you do/i.test(norm)) {
    return {
      text: `I'm a **Product Designer and Design Technologist** who bridges systems thinking with frontend engineering reality. I specialize in turning complex, high-friction digital workflows (like emergency healthcare triage on [MEDesy](/work/medesy) or enterprise HR on [PROfile](/work/profile)) into clean, intuitive products where every layer of confusion has been stripped away.\n\nI focus on mobile ergonomics, design token architectures, and building interfaces that feel obvious from the very first touch.`,
      actionChips: [
        { label: "Read Design Philosophy", href: "/about" },
        { label: "Explore Case Studies", href: "/work" },
        { label: "Start Project Enquiry", action: "enquiry" },
      ],
    };
  }

  // 20. WORKING STYLE & FEEDBACK
  if (/handle (client )?feedback|feedback during a project|how do you collaborate|working style|how do you work/i.test(norm)) {
    return {
      text: `I approach client collaboration as an open partnership. I don't work in isolation for weeks and then do a theatrical 'grand reveal'.\n\n- **Iterative Validation**: We align on problem discovery and validate clickable wireframes together before polishing pixels.\n- **Feedback as Diagnostic Data**: If an interaction isn't working for a user or stakeholder, that's valuable insight. I leave my ego at the door.\n- **Communication Cadence**: I hold dedicated weekly strategy syncs, share async video walkthroughs (Loom), and coordinate daily via Slack or Teams.`,
      actionChips: [
        { label: "View Design Process", href: "/about" },
        { label: "Start Project Enquiry", action: "enquiry" },
      ],
    };
  }

  // 21. EMPLOYMENT HISTORY
  if (/where have you worked|employment history|work history|where has he worked|past roles|experience at medesy/i.test(norm)) {
    return {
      text: `My verified professional experience includes:\n\n- **Medesy Technologies (2024–Present, Employment)**: Product Designer. Architected a structured WhatsApp-first healthcare triage gateway and web service portal connecting patients with licensed Nigerian doctors.\n- **Greall Technologies (2023–2024, Employment)**: Product Designer. Art-directed corporate brand evolution and responsive fintech web architecture.\n- **Cold Designer Studio (2023–Present, Studio Practice)**: Lead Product Designer & Design Technologist. Directing [Spot](/work/spot) (8-week cross-functional lead), [PROfile](/work/profile), [QuickEats](/work/quickeats), and [Raven Bank](/work/raven-bank).`,
      actionChips: [
        { label: "Download Resume (PDF)", href: "/Taye%20Abolarin-Product%20Designer-Resume.pdf", action: "resume" },
        { label: "Connect on LinkedIn", href: "https://www.linkedin.com/in/taye-abolarin-b503b0240/" },
        { label: "Explore Projects", href: "/work" },
      ],
    };
  }

  // 22. MOBILE APP DESIGN (Only if not asking about a specific project)
  if (!/raven|quickeat|spot|profile|medesy|9ja|nova/i.test(norm) && /\b(mobile|mobile app|mobile apps|ios|android)\b/i.test(norm)) {
    return {
      text: `Yes, **mobile application design is one of my core specializations** across iOS and Android. I focus on platform-native ergonomics, responsive layout hierarchies, and dual light/dark themes.\n\nFeatured mobile case studies:\n- [QuickEats](/work/quickeats): 45-board consumer mobile app with 20-minute meal planning, smart pantry matching, and dual light/dark themes.\n- [Raven Bank](/work/raven-bank): Rapid 48-hour mobile banking sprint featuring single-tap P2P beneficiary transfers.\n- [9jaTrip](/work/9jatrip): Intercity transit booking app with terminal hub selection, seat maps, and QR boarding passes.\n- [PROfile](/work/profile): Mobile companion for enterprise employees featuring one-tap clock-in and leave management.`,
      actionChips: [
        { label: "Inspect QuickEats", href: "/work/quickeats" },
        { label: "Inspect Raven Bank", href: "/work/raven-bank" },
        { label: "Inspect 9jaTrip", href: "/work/9jatrip" },
      ],
    };
  }

  // 23. SPECIFIC PROJECT INQUIRIES
  if (/quick\s*eat|quickeats|meal prep|pantry\s*match|food\s*tech/i.test(norm)) {
    return {
      text: `**QuickEats** is a consumer mobile application I designed across 45 presentation boards. It solves meal-prep intimidation for students and busy young professionals through personalized 20-minute recipes, smart pantry matching using ingredients already in the kitchen, and auto-generated grocery lists sorted by supermarket aisle. It includes complete dual light and dark theme UI kits.`,
      actionChips: [
        { label: "Inspect QuickEats Case Study", href: "/work/quickeats" },
        { label: "View Behance Prototype", href: "https://www.behance.net/gallery/218767855/Meal-Prepping-Mobile-App-A-Case-Study" },
        { label: "View All Projects", href: "/work" },
      ],
    };
  }

  if (/spot|feedback|critique|creative community/i.test(norm)) {
    return {
      text: `On **Spot**, I served as **Lead Product Designer**, directing an 8-week cross-functional team (1 Product Manager, 2 Frontend Engineers, and 2 Designers). We built a collaborative workspace spanning 30+ screens where teams leave coordinate-pinned feedback directly on interactive prototypes, eliminating confusing email threads and context loss.`,
      actionChips: [
        { label: "Inspect Spot Case Study", href: "/work/spot" },
        { label: "View Behance Case Study", href: "https://www.behance.net/gallery/198428581/Spot-Redefining-Creative-Feedback" },
        { label: "View All Projects", href: "/work" },
      ],
    };
  }

  if (/profile|hrm|attendance|human resource|attrition|clock in/i.test(norm)) {
    return {
      text: `**PROfile** is an enterprise HRMS and Employee Self-Service (ESS) platform I designed across 37 modular screens. It unites administrative attendance tracking, automated clock-in, predictive attrition risk signals, and a mobile self-service app for one-tap leave requests and shift reconciliation, replacing fragmented spreadsheets with centralized operational clarity.`,
      actionChips: [
        { label: "Inspect PROfile Case Study", href: "/work/profile" },
        { label: "View Behance Spec", href: "https://www.behance.net/gallery/222769651/PROfile-An-Organizational-HRM-Solution" },
        { label: "View All Projects", href: "/work" },
      ],
    };
  }

  if (/raven|bank app|p2p transfer|beststar/i.test(norm)) {
    return {
      text: `**Raven Bank App** was a rapid 48-hour mobile banking redesign sprint I executed under my imprint **@cold_designer**. I modernized the personal banking dashboard, created single-tap beneficiary avatar chips for instant P2P transfers, integrated an instant privacy toggle for account balances, and streamlined biometric onboarding.`,
      actionChips: [
        { label: "Inspect Raven Bank Case Study", href: "/work/raven-bank" },
        { label: "View Behance Sprint", href: "https://www.behance.net/gallery/221018589/Fintech-Application-Raven-Bank-App-A-Case-Study" },
      ],
    };
  }

  if (/medesy|doctor|whatsapp|health|triage/i.test(norm)) {
    return {
      text: `**MEDesy** is a healthcare platform where I designed a structured WhatsApp-first conversational triage gateway. Rather than forcing patients in distress to download a bulky app, patients articulate symptoms in ordinary language over WhatsApp and connect with licensed Nigerian physicians, eliminating clinic waiting room delays.`,
      actionChips: [
        { label: "Inspect MEDesy Case Study", href: "/work/medesy" },
        { label: "View Figma Prototype", href: "https://www.figma.com/design/Vl1qsoE22hQjt8oEXZubja/Medesy-2?m=auto&t=jglC0OFhMaDeX2tP-6" },
      ],
    };
  }

  if (/9ja|trip|transit|bus|coach|terminal/i.test(norm)) {
    return {
      text: `**9jaTrip** is an intercity mobility platform I designed for commuters across Nigeria. It replaces chaotic bus park queues with verified hub-to-hub terminal route searches, real-time seat selection, transparent upfront pricing, and high-contrast digital QR boarding passes for quick terminal gate scanning.`,
      actionChips: [
        { label: "Inspect 9jaTrip Case Study", href: "/work/9jatrip" },
        { label: "View Figma Design", href: "https://www.figma.com/design/QPyY4HiyEc40yQk5609OMG/9jaTrip?node-id=0-1&p=f&t=Mm09Z82YdZ3Is25i-0" },
      ],
    };
  }

  if (/nova|wellness|mood|journal/i.test(norm)) {
    return {
      text: `**Nova Wellness** is a supportive mobile companion I designed and built using React Native (Expo SDK 57). It features mindful mood check-ins, AssemblyAI voice journaling with editable transcriptions, reflective conversation via Gemini, and strict on-device data persistence so personal entries remain completely confidential.`,
      actionChips: [
        { label: "View GitHub Repository", href: "https://github.com/Bheemty/nova-wellness" },
        { label: "Explore The Lab", href: "/lab" },
      ],
    };
  }

  // 24. TOOLS & TECHNICAL STACK
  if (/tools|skills|figma|canva|photoshop|tech stack|code|developer|engineering|react|nextjs|tailwind/i.test(norm)) {
    return {
      text: `My primary toolkit centers on **Figma** (Auto-Layout 5.0, variables, component properties, token architectures), **Figjam** for discovery and user journeys, and **Adobe Photoshop** / **Canva** for visual and marketing assets.\n\nAs a Design Technologist, I also write production frontend code in **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, and **React Native (Expo SDK 57)**, using **GSAP** and **Motion** for physics-based transitions. This technical fluency ensures everything I design translates to code with pixel precision.`,
      actionChips: [
        { label: "Visit The Lab", href: "/lab" },
        { label: "Download Resume", href: "/Taye%20Abolarin-Product%20Designer-Resume.pdf", action: "resume" },
      ],
    };
  }

  // 25. AVAILABILITY & GIGS
  if (/availab|gig|freelance|contract|hire|hiring|open for work|take on work|taking on|collaborat|work together/i.test(norm)) {
    return {
      text: `Yes, I am currently **open for select freelance gigs, contract product design roles (3–6+ months), and design systems consultations**.\n\nI partner with founders, engineering teams, and product leaders globally on complex SaaS platforms, native iOS/Android apps, and multi-platform design systems. My collaboration model is fully remote and asynchronous across US, European, and African time zones with dedicated weekly syncs.\n\nTo get in touch, you can start an enquiry right here through Ask Cold or email me directly at [abolarintaye20@gmail.com](mailto:abolarintaye20@gmail.com).`,
      actionChips: [
        { label: "Start Project Enquiry", action: "enquiry" },
        { label: "Email Me Directly", href: "mailto:abolarintaye20@gmail.com" },
        { label: "Explore Verified Work", href: "/work" },
      ],
    };
  }

  // 26. PRICING & RATES
  if (/\b(pricing|price|rate|rates|cost|quote|budget|fee|fees|hourly|day rate)\b/i.test(norm)) {
    return {
      text: `I use **value- and scope-based pricing** rather than arbitrary flat fees or generic hourly quotes. Every product has distinct architectural complexity, platform breadth, and deliverable depth.\n\nPricing depends on:\n- **Scope & Platforms**: Web SaaS vs. native iOS/Android applications vs. multi-platform systems.\n- **Deliverable Depth**: From initial user research and wireframing to high-fidelity Figma components, design tokens, and coded prototypes.\n- **Engagement Format**: Dedicated sprint cycles vs. multi-month contract roles.\n\nShare a high-level summary of your project goals, scope, and target timeline via **Start Project Enquiry** or email me at [abolarintaye20@gmail.com](mailto:abolarintaye20@gmail.com), and I'll provide an accurate proposal.`,
      actionChips: [
        { label: "Start Project Enquiry", action: "enquiry" },
        { label: "Email for Estimate", href: "mailto:abolarintaye20@gmail.com" },
      ],
    };
  }

  // 27. LOCATION & REMOTE
  if (/location|where are you|where is taye|nigeria|lagos|time zone|remote/i.test(norm)) {
    return {
      text: `I'm based in **Lagos, Nigeria**, and I work **globally with remote teams**. My workflow is designed for asynchronous collaboration across US, European, and African time zones, with scheduled weekly video syncs via Google Meet or Teams.`,
      actionChips: [
        { label: "Start Project Enquiry", action: "enquiry" },
        { label: "Email Me Directly", href: "mailto:abolarintaye20@gmail.com" },
      ],
    };
  }

  // 28. RESUME & DOWNLOAD
  if (/resume|cv|curriculum|download|pdf/i.test(norm)) {
    return {
      text: `You can download my verified PDF résumé directly. It summarizes my product design engagements across conversational healthcare triage (MEDesy), enterprise HRMS (PROfile), intercity transit (9jaTrip), and technical toolkits.`,
      actionChips: [
        { label: "Download Resume (PDF)", href: "/Taye%20Abolarin-Product%20Designer-Resume.pdf", action: "resume" },
        { label: "Connect on LinkedIn", href: "https://www.linkedin.com/in/taye-abolarin-b503b0240/" },
      ],
    };
  }

  // 29. THE LAB
  if (/lab|experiment|playground|codex/i.test(norm)) {
    return {
      text: `**The Lab** is my interactive experimental playground where I test micro-interactions, layout density, and UI state transitions firsthand. It features interactive experiments like the Real Estate Discovery Hero, button lifecycle states, and the University of Maiduguri redesign study.`,
      actionChips: [
        { label: "Visit The Lab", href: "/lab" },
        { label: "Explore Projects", href: "/work" },
      ],
    };
  }

  // 30. EXPLICIT IDENTITY REQUEST (Only when the visitor specifically asks who Taye is!)
  if (intent === "taye_identity" || /who are you|who is taye|tell me about yourself/i.test(norm)) {
    return {
      text: `I'm **Taye Abolarin** (operating as **Cold Designer**). I'm an independent product designer and design technologist based in Lagos, focused on turning complex digital systems into clear, intuitive products.\n\nMy practice bridges deep interaction design with frontend engineering fluency. Feel free to ask me about my journey from Vephla University, my case studies (like [Spot](/work/spot), [MEDesy](/work/medesy), [QuickEats](/work/quickeats), or [PROfile](/work/profile)), or how I collaborate with product teams!`,
      actionChips: [
        { label: "Explore Projects", href: "/work" },
        { label: "Download Resume", href: "/Taye%20Abolarin-Product%20Designer-Resume.pdf", action: "resume" },
        { label: "Start Project Enquiry", action: "enquiry" },
      ],
    };
  }

  // 31. GENERAL CONVERSATIONAL FALLBACK (No unsolicited identity dump!)
  return {
    text: `I'm with you. What would you like to explore—my design work, a project you're building, or how I approach product problems?`,
    actionChips: [
      { label: "Explore Projects", href: "/work" },
      { label: "Read Design Philosophy", href: "/about" },
    ],
  };
}

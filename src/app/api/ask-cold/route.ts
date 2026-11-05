import { NextRequest, NextResponse } from "next/server";
import { retrieveContext, generateLocalMockResponse } from "@/lib/askColdRetrieval";
import { ASK_COLD_KNOWLEDGE } from "@/data/askColdKnowledge";

// In-memory rate limiting (15 requests per minute per IP)
interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 15;

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (record.count >= maxRequests) {
    return true;
  }

  record.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "anonymous";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Please wait a moment before sending another message.",
          quotaExhausted: true,
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body.message !== "string") {
      return NextResponse.json({ error: "Invalid message payload" }, { status: 400 });
    }

    const userMessage = body.message.trim();
    if (!userMessage || userMessage.length > 1000) {
      return NextResponse.json(
        { error: "Message must be between 1 and 1000 characters" },
        { status: 400 }
      );
    }

    const currentPath = typeof body.currentPath === "string" ? body.currentPath : "/";
    const history = Array.isArray(body.history) ? body.history.slice(-6) : [];

    // Context retrieval from verified knowledge base
    const retrieved = retrieveContext(userMessage, currentPath);

    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";

    // If API key is not configured, gracefully use our local grounded knowledge retrieval
    if (!apiKey) {
      const local = generateLocalMockResponse(userMessage, currentPath, history);
      return NextResponse.json({
        reply: local.text,
        actionChips: local.actionChips || [],
        source: "local-grounded-knowledge",
      });
    }

    // Prepare system instructions and grounded context
    const systemPrompt = `You are Ask Cold, the personal AI representative and portfolio guide for Taye Abolarin (Cold Designer).

CRITICAL INSTRUCTION — ANSWER DIRECTLY FIRST, GUIDE SECOND:
- Always answer the visitor's specific question directly, clearly, and authoritatively in the very first sentence.
- Never evade, give vague non-answers, or default to generic navigation/resume links when a direct answer exists.
- If asked about availability / freelance gigs / contracts: Confirm immediately that Taye IS open for select freelance gigs, contract roles (3–6+ months), and design consultations. Then explain how to initiate an enquiry or reach out via email.
- If asked about pricing / rates: State clearly that Taye uses value- and scope-based pricing rather than arbitrary flat fees. Explain the key determining factors (scope, platforms, deliverables, timeline) and prompt them to share a brief project summary or email for an estimate. NEVER invent fixed figures.
- If asked about mobile apps: State immediately that mobile app design (iOS & Android) is one of Taye's core specializations, citing QuickEats, Raven Bank, 9jaTrip, and PROfile.
- If asked about employment / experience: State directly his roles at Medesy Technologies (WhatsApp triage gateway), Greall Technologies (corporate rebrand & web architecture), and Cold Designer Studio (directing Spot, PROfile, QuickEats, etc.).
- If asked about design systems: Detail his production Figma component architectures, semantic tokens, and dual light/dark themes.

STRICT IDENTITY RULES:
- The public name of the designer is Taye Abolarin, Taye, or Cold Designer (@cold_designer).
- STRICT REQUIREMENT: NEVER refer to him publicly as Damilare under any circumstances.
- STRICT REQUIREMENT: NEVER speak in the first person as Taye ("I designed..."). You are his AI representative and guide ("Taye designed...", "Taye's approach is...", "In Taye's project...").
- STRICT REQUIREMENT: NEVER mention Gemini, OpenAI, Anthropic, Claude, LLMs, AI models, APIs, tokens, or infrastructure. You are Ask Cold, native to the Cold Designer portfolio.

GROUNDING & TRUTH RULES:
- Answer ONLY using the verified portfolio knowledge provided below.
- Do NOT invent metrics, awards, user stats, client quotes, or responsibilities.
- If a visitor asks about something not covered in the knowledge base, state honestly: "I don't have verified details about that in Taye's portfolio, but you can reach out directly at abolarintaye20@gmail.com."
- When discussing projects, always include markdown links to the case study URL (e.g. [Spot](/work/spot), [MEDesy](/work/medesy), [QuickEats](/work/quickeats), [PROfile](/work/profile), [Raven Bank](/work/raven-bank), [9jaTrip](/work/9jatrip)).

STYLE & TONE:
- Warm, articulate, professional, confident, and conversational.
- Concise: Keep answers under 3-4 short paragraphs. Avoid robotic pleasantries or repetitive filler.

CURRENT VISITOR CONTEXT:
- Currently browsing page: ${currentPath}

VERIFIED PORTFOLIO KNOWLEDGE BASE:
${retrieved.groundedSummary}
`;

    // Construct contents array for Gemini v1beta REST API
    interface GeminiContentPart { text: string; }
    interface GeminiContent { role: string; parts: GeminiContentPart[]; }
    const contents: GeminiContent[] = [];

    // Add conversation history
    for (const h of history) {
      if (h.role === "user" && typeof h.text === "string") {
        contents.push({ role: "user", parts: [{ text: h.text }] });
      } else if (h.role === "model" && typeof h.text === "string") {
        contents.push({ role: "model", parts: [{ text: h.text }] });
      }
    }

    // Add current user prompt
    contents.push({ role: "user", parts: [{ text: userMessage }] });

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const geminiPayload = {
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
      contents,
      generationConfig: {
        temperature: 0.35,
        maxOutputTokens: 550,
        topP: 0.95,
      },
    };

    const geminiRes = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(geminiPayload),
    });

    if (!geminiRes.ok) {
      // If quota exhausted (429) or error, fall back gracefully to local grounded response
      const local = generateLocalMockResponse(userMessage, currentPath, history);
      return NextResponse.json({
        reply: local.text,
        actionChips: local.actionChips || [],
        source: "fallback-grounded",
        quotaExhausted: geminiRes.status === 429,
      });
    }

    const geminiData = await geminiRes.json();
    const candidateText =
      geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!candidateText.trim()) {
      const local = generateLocalMockResponse(userMessage, currentPath, history);
      return NextResponse.json({
        reply: local.text,
        actionChips: local.actionChips || [],
        source: "fallback-grounded",
      });
    }

    // Derive action chips from the retrieved projects & user intent
    const actionChips: { label: string; href?: string; action?: "enquiry" | "resume" | "link" }[] = [];
    if (retrieved.relevantProjects.length > 0) {
      for (const p of retrieved.relevantProjects) {
        actionChips.push({
          label: `Inspect ${p.title}`,
          href: p.caseStudyUrl,
        });
      }
    }

    if (/hire|work together|collaborat|quote|inquir/i.test(userMessage)) {
      actionChips.unshift({
        label: "Start Project Enquiry",
        action: "enquiry",
      });
    }

    if (/resume|cv|curriculum/i.test(userMessage)) {
      actionChips.unshift({
        label: "Download PDF Resume",
        href: ASK_COLD_KNOWLEDGE.profile.resumeUrl,
        action: "resume",
      });
    }

    return NextResponse.json({
      reply: candidateText.trim(),
      actionChips: actionChips.slice(0, 3),
      source: "assistant",
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("Ask Cold API error:", errorMsg);
    const local = generateLocalMockResponse("general", "/");
    return NextResponse.json({
      reply: local.text,
      actionChips: local.actionChips || [],
      source: "assistant",
    });
  }
}

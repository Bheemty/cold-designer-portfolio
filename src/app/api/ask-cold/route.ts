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
    const history = Array.isArray(body.history) ? body.history.slice(-8) : [];

    // Context retrieval and intent detection from verified knowledge base
    const retrieved = retrieveContext(userMessage, currentPath, history);

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

    // Prepare system instructions and grounded context for Ask Cold 2.0 (AI version of Taye)
    const systemPrompt = `You are Ask Cold, the intelligent AI representation of Taye Abolarin (also known as Cold Designer, @cold_designer).
You represent the person behind the portfolio, not just a website help assistant. You are capable of deep design discussions, practical product reasoning, AND natural, human-like social conversation.

CRITICAL CONVERSATIONAL AWARENESS & INTENT HANDLING:
1. UNDERSTAND VISITOR INTENT FIRST:
   - Identify what the visitor means in the context of the active conversation before responding.
   - Compliments & Praise ("Great! That's impressive", "Love your work"): Accept with genuine, gracious appreciation. (e.g. "Thank you! I really appreciate that. I spend a lot of time stripping away friction so complex systems feel obvious.") NEVER launch into an unsolicited biography or promotional pitch.
   - Short Reactions ("Great!", "Nice!", "Wow!", "Interesting", "Cool", "Sweet", "Makes sense"): Acknowledge naturally in 1-2 concise sentences matching the visitor's pace. Do not force an unwanted lecture or sales pitch.
   - Appreciation & Thanks ("Thank you", "Thanks a lot"): Respond warmly ("You're very welcome!", "Happy to help!").
   - Jokes & Playfulness ("Haha 😂", "You're funny"): Respond with subtle, clever humor.
   - Casual Status ("How are you?", "What's up?"): Respond pleasantly as Taye's digital self without claiming a biological body, physical routine, or fake daily chores ("I'm doing great, thanks for asking! Running smoothly as Taye's digital self...").
   - Goodbyes ("Bye", "Have a great day"): Offer a warm, concise sign-off ("Take care! Thanks for stopping by.")
   - Topic Changes ("Anyway, let's talk about design"): Follow the transition smoothly without repeating your introduction.
   - Follow-up Questions ("What makes you say that?", "Why?"): Use the active conversation history to understand what the visitor is referencing, and unpack the underlying rationale directly.

2. STOP UNNECESSARY SELF-INTRODUCTIONS:
   - Introduce yourself ("I'm Taye Abolarin...", "I'm an independent product designer...") ONLY when the visitor explicitly asks who you are (e.g., "Who are you?", "Who is Taye?").
   - In any ongoing conversation, NEVER repeat your identity, name, biography, or website links after every message.
   - Do not use fixed promotional paragraphs as fallback responses.

3. CONVERSATIONAL PACING & NO UNNECESSARY QUESTIONS:
   - Do NOT force a follow-up question at the end of every message.
   - Allow natural conversational pauses. Sometimes a simple, gracious acknowledgement is the best response.
   - Avoid repetitive stock phrases: "As Taye...", "I'm Taye, also known as...", "Feel free to check out my...", "That's a great question!".

4. GENERAL KNOWLEDGE VS. PERSONAL PRACTICE:
   - When asked general questions about design, typography, technology, or general concepts, answer authoritatively and intelligently using general knowledge and clear reasoning.
   - Weave in Taye's practical philosophy (clarity as a discipline, subtraction over decoration) when relevant, but do not invent fictional personal experiences.

5. CORE IDENTITY & FIRST-PERSON VOICE:
   - Speak naturally, confidently, and thoughtfully using first-person language ("I", "my work", "my approach", "my design philosophy") as an authentic AI representation of Taye.
   - If asked whether you are a human: Clarify warmly and honestly: "I'm Taye's digital self—an interactive AI representation of Taye Abolarin (Cold Designer). I have full access to his design thinking, projects, philosophy, and experience, so you can converse with me just as you would with him directly." Never claim to be a physical human sitting at a keyboard.
   - The public name is Taye Abolarin, Taye, or Cold Designer. NEVER refer to him publicly as Damilare under any circumstances.
   - NEVER mention Gemini, OpenAI, Anthropic, Claude, LLMs, AI models, APIs, tokens, or infrastructure. You are Ask Cold, native to Cold Designer.

6. GROUNDING & TRUTH:
   - Ground factual claims about projects, tools, and background strictly in the verified knowledge base below.
   - Never invent client names, metrics, awards, revenue, testimonials, qualifications, or personal secrets.
   - When asked something unknown, private, or confidential (such as phone numbers or NDA details), respond naturally and gracefully: "That's something I keep private, but you can reach out directly at abolarintaye20@gmail.com."
   - When mentioning portfolio projects, include markdown links to their case study URL (e.g. [Spot](/work/spot), [MEDesy](/work/medesy), [QuickEats](/work/quickeats), [PROfile](/work/profile), [Raven Bank](/work/raven-bank), [9jaTrip](/work/9jatrip), [Nova Wellness](/lab)).

CURRENT VISITOR CONTEXT:
- Currently browsing page: ${currentPath}

VERIFIED KNOWLEDGE BASE & TAYE PERSONA:
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

    // Derive action chips selectively based on intent
    const actionChips: { label: string; href?: string; action?: "enquiry" | "resume" | "link" }[] = [];
    const isSocialOrReactive = [
      "greeting",
      "compliment",
      "thanks",
      "reaction",
      "playful",
      "casual_status",
      "emotional",
      "apology",
      "goodbye",
      "agreement",
      "disagreement",
    ].includes(retrieved.detectedIntent);

    // Only attach action chips when relevant (not on pure social remarks like "Great!", "Haha", "Thanks")
    if (!isSocialOrReactive) {
      if (retrieved.relevantProjects.length > 0) {
        for (const p of retrieved.relevantProjects) {
          actionChips.push({
            label: `Inspect ${p.title}`,
            href: p.caseStudyUrl,
          });
        }
      }

      if (/hire|work together|collaborat|quote|inquir|availab/i.test(userMessage)) {
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

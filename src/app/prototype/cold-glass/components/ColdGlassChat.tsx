"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ColdGlassSurface, useColdGlass } from "./ColdGlassEngine";
import {
  Sparkles,
  X,
  Send,
  Mic,
  Square,
  Bot,
  User,
  ShieldCheck,
  ChevronDown,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  chips?: string[];
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    sender: "bot",
    text: "Hello! I am Cold, Taye Abolarin's AI Portfolio Representative. Welcome to the Cold Glass material validation prototype.",
    timestamp: "10:42 AM",
    chips: ["Optical Refraction", "Theme Switching", "Independent Scroll"],
  },
  {
    id: "msg-2",
    sender: "user",
    text: "What makes Cold Glass different from ordinary glassmorphism?",
    timestamp: "10:43 AM",
  },
  {
    id: "msg-3",
    sender: "bot",
    text: "Ordinary glassmorphism relies solely on `backdrop-filter: blur()` and flat white overlays. Cold Glass uses an authentic Signed Distance Field (SDF) displacement map to physically bend background rays around the meniscus rim (Snell's Law) while preserving 100% optical clarity in the center.",
    timestamp: "10:43 AM",
    chips: ["Show SDF Math", "Test Scrolling"],
  },
  {
    id: "msg-4",
    sender: "user",
    text: "Can I scroll through a long conversation without the background page scrolling?",
    timestamp: "10:44 AM",
  },
  {
    id: "msg-5",
    sender: "bot",
    text: "Yes! Notice that this conversation container has strict layout bounds: `min-height: 0`, `overflow-y: auto`, `overscroll-behavior: contain`, and Lenis scroll prevention. Try scrolling up and down rapidly right now — the webpage behind this window remains completely stationary.",
    timestamp: "10:44 AM",
  },
  {
    id: "msg-6",
    sender: "bot",
    text: "Here are additional test items to make this thread long enough to scroll:\n\n1. Optical Meniscus Beveling\n2. Double-Bounce Specular Caustics\n3. Dynamic Cursor Sheen\n4. Dual-Theme Light/Dark Adaptation\n5. Fluid Geometry Morphing",
    timestamp: "10:45 AM",
  },
  {
    id: "msg-7",
    sender: "user",
    text: "How does the light theme ensure high contrast?",
    timestamp: "10:45 AM",
  },
  {
    id: "msg-8",
    sender: "bot",
    text: "In light theme, user messages render as solid midnight obsidian bubbles (#0f172a) with pure white text, while bot responses use crisp quartz glass cards with deep obsidian typography (#0f131a). This completely eliminates the washed-out white-on-white defect.",
    timestamp: "10:46 AM",
    chips: ["Toggle Theme", "Inspect Inspector"],
  },
  {
    id: "msg-9",
    sender: "user",
    text: "Tell me about Taye's background and key projects.",
    timestamp: "10:47 AM",
  },
  {
    id: "msg-10",
    sender: "bot",
    text: "Taye Abolarin (Cold) is a Senior Design Engineer specializing in editorial portfolios, design systems, and high-performance interactive architectures. Notable projects include Kokil, Ray-Ban Meta editorial experience, and hyper-fluid web canvas systems.",
    timestamp: "10:47 AM",
    chips: ["View Kokil", "Design Engineering"],
  },
  {
    id: "msg-11",
    sender: "user",
    text: "How does this prototype ensure zero interference with the live website?",
    timestamp: "10:48 AM",
  },
  {
    id: "msg-12",
    sender: "bot",
    text: "All prototype files live exclusively inside /src/app/prototype/cold-glass/. Not a single production file, route, or animation was modified. Git working tree for live portfolio remains 100% clean.",
    timestamp: "10:48 AM",
  },
];

export function ColdGlassChat() {
  const { theme, toggleTheme } = useColdGlass();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as unknown as { __toggleColdGlassChat?: (open?: boolean) => void }).__toggleColdGlassChat = (
        open?: boolean
      ) => {
        setIsOpen((prev) => (open !== undefined ? open : !prev));
      };
    }
  }, []);

  const isDark = theme === "dark";

  // Auto-scroll to bottom of conversation
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      let replyText = `Thanks for testing Cold Glass! You asked: "${text}". The refractive engine adapts smoothly to live user input without redrawing or dropping frames.`;
      if (text.toLowerCase().includes("scroll")) {
        replyText = "Scroll isolation is verified. Notice the track scrollbar is contained inside this viewport, and wheel events do not leak to the document.";
      } else if (text.toLowerCase().includes("theme")) {
        toggleTheme();
        replyText = "Theme toggled! All glass surfaces, borders, shadows, and text colors have adapted instantly.";
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        chips: ["Test Scroll Again", "Switch Theme"],
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* ── FLUID LAUNCHER PILL ── */
          <motion.div
            key="cold-launcher"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
          >
            <button
              type="button"
              id="cold-glass-launcher-btn"
              onClick={() => setIsOpen(true)}
              className="cursor-pointer border-none bg-transparent p-0 text-left outline-none block"
              aria-label="Open Ask Cold chatbot"
            >
              <ColdGlassSurface
                shape="pill"
                elevation="panel"
                interactive={true}
                className="px-4 py-3 group flex items-center gap-3 select-none"
              >
                {/* Icon badge */}
                <div
                  className={`relative flex items-center justify-center w-8 h-8 rounded-full font-bold transition-transform duration-300 group-hover:scale-110 ${
                    isDark
                      ? "bg-[#0284c7] text-white shadow-[0_0_16px_rgba(2,132,199,0.5)]"
                      : "bg-[#0f172a] text-white shadow-[0_4px_12px_rgba(15,23,42,0.3)]"
                  }`}
                >
                  <Sparkles size={16} />
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-black" />
                </div>

                {/* Label */}
                <div className="flex flex-col text-left">
                  <span
                    className={`font-display font-bold text-xs tracking-tight ${
                      isDark ? "text-white" : "text-[#0f131a]"
                    }`}
                  >
                    Ask Cold
                  </span>
                  <span
                    className={`font-mono-code text-[10px] ${
                      isDark ? "text-[#94a3b8]" : "text-[#64748b]"
                    }`}
                  >
                    Liquid Glass Rep
                  </span>
                </div>
              </ColdGlassSurface>
            </button>
          </motion.div>
        ) : (
          /* ── EXPANDED CHAT WINDOW (FLUID MORPH) ── */
          <motion.div
            key="cold-chat-window"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 25 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="w-[calc(100vw-3rem)] sm:w-[420px] md:w-[440px] h-[580px] max-h-[85vh] flex flex-col"
          >
            <ColdGlassSurface
              shape="card"
              elevation="panel"
              className="w-full h-full flex flex-col overflow-hidden"
              interactive={false}
            >
              {/* ── FIXED HEADER ── */}
              <div
                className={`px-5 py-3.5 border-b flex items-center justify-between shrink-0 select-none ${
                  isDark
                    ? "border-white/[0.08] bg-white/[0.02]"
                    : "border-black/[0.06] bg-black/[0.02]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`relative flex items-center justify-center w-8 h-8 rounded-full ${
                      isDark
                        ? "bg-[#0284c7] text-white shadow-[0_0_12px_rgba(2,132,199,0.4)]"
                        : "bg-[#0f172a] text-white shadow-[0_4px_12px_rgba(15,23,42,0.2)]"
                    }`}
                  >
                    <Sparkles size={15} />
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-black" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-display font-bold text-sm tracking-tight ${
                          isDark ? "text-white" : "text-[#0f131a]"
                        }`}
                      >
                        Ask Cold
                      </span>
                      <span
                        className={`font-mono-code text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          isDark
                            ? "bg-white/[0.08] text-[#38bdf8] border border-white/10"
                            : "bg-black/[0.06] text-[#0284c7] border border-black/10"
                        }`}
                      >
                        Optical Glass
                      </span>
                    </div>
                    <p
                      className={`font-mono-code text-[10px] ${
                        isDark ? "text-[#94a3b8]" : "text-[#64748b]"
                      }`}
                    >
                      Taye Abolarin&apos;s Portfolio Guide
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setMessages(INITIAL_MESSAGES)}
                    title="Reset conversation"
                    className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                      isDark
                        ? "text-[#94a3b8] hover:text-white hover:bg-white/[0.08]"
                        : "text-[#64748b] hover:text-[#0f131a] hover:bg-black/[0.06]"
                    }`}
                  >
                    <RefreshCw size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Minimize Ask Cold"
                    className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                      isDark
                        ? "text-[#94a3b8] hover:text-white hover:bg-white/[0.08]"
                        : "text-[#64748b] hover:text-[#0f131a] hover:bg-black/[0.06]"
                    }`}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* ── INDEPENDENT CONVERSATION SCROLL AREA ── */}
              {/* strict layout: min-height: 0, flex: 1, overscrollBehavior: contain, data-lenis-prevent */}
              <div
                id="cold-glass-chat-scroll-container"
                ref={scrollContainerRef}
                data-lenis-prevent
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-4 overscroll-contain"
                style={{
                  overscrollBehavior: "contain",
                }}
              >
                {messages.map((msg) => {
                  const isUser = msg.sender === "user";
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                    >
                      {/* Message Bubble with High Contrast */}
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed transition-all ${
                          isUser
                            ? isDark
                              ? "bg-[#0b1329] border border-[#38bdf8]/40 text-white shadow-[0_4px_16px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] rounded-br-xs font-medium"
                              : "bg-[#0f172a] text-white border border-[#1e293b] shadow-[0_4px_14px_rgba(15,23,42,0.25),inset_0_1px_1px_rgba(255,255,255,0.3)] rounded-br-xs font-medium"
                            : isDark
                            ? "bg-white/[0.06] border border-white/[0.12] text-[#f2f1ec] backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_1.5px_rgba(255,255,255,0.15)] rounded-bl-xs"
                            : "bg-white/95 border border-black/[0.08] text-[#0f131a] backdrop-blur-md shadow-[0_4px_16px_rgba(15,23,42,0.08),inset_0_1px_1.5px_rgba(255,255,255,1.0)] rounded-bl-xs font-normal"
                        }`}
                      >
                        <p className="whitespace-pre-line">{msg.text}</p>
                      </div>

                      {/* Interactive Chips */}
                      {msg.chips && msg.chips.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                          {msg.chips.map((chip) => (
                            <button
                              key={chip}
                              type="button"
                              onClick={() => handleSend(chip)}
                              className={`px-2.5 py-1 rounded-full font-mono-code text-[10px] font-medium border transition-all cursor-pointer ${
                                isDark
                                  ? "bg-white/[0.04] hover:bg-white/[0.10] text-[#38bdf8] border-[#38bdf8]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                                  : "bg-black/[0.03] hover:bg-black/[0.08] text-[#0284c7] border-[#0284c7]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]"
                              }`}
                            >
                              {chip} &rarr;
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Timestamp */}
                      <span
                        className={`font-mono-code text-[9px] mt-1 px-1 ${
                          isDark ? "text-[#64748b]" : "text-[#94a3b8]"
                        }`}
                      >
                        {msg.timestamp}
                      </span>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex items-center gap-1.5 px-3 py-2 rounded-full w-fit bg-white/[0.05] border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* ── FIXED COMPOSER ── */}
              <div
                className={`p-3 sm:p-4 border-t shrink-0 select-none ${
                  isDark
                    ? "border-white/[0.08] bg-white/[0.02]"
                    : "border-black/[0.06] bg-black/[0.02]"
                }`}
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className={`flex items-center gap-2 rounded-2xl p-1.5 border transition-all ${
                    isDark
                      ? "bg-white/[0.04] border-white/[0.12] focus-within:border-[#38bdf8]"
                      : "bg-white border-black/[0.12] focus-within:border-[#0284c7] shadow-xs"
                  }`}
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask about refraction, scrolling, or optics..."
                    className={`flex-1 bg-transparent px-3 py-1.5 text-xs font-sans focus:outline-none ${
                      isDark
                        ? "text-white placeholder:text-[#64748b]"
                        : "text-[#0f131a] placeholder:text-[#94a3b8]"
                    }`}
                  />

                  {/* Send Button */}
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    aria-label="Send message"
                    className={`p-2 rounded-xl transition-all font-semibold cursor-pointer disabled:opacity-30 disabled:pointer-events-none ${
                      isDark
                        ? "bg-[#38bdf8] text-[#090b0f] hover:bg-[#7dd3fc]"
                        : "bg-[#0f172a] text-white hover:bg-[#1e293b]"
                    }`}
                  >
                    <Send size={13} />
                  </button>
                </form>

                <div
                  className={`flex items-center justify-between px-2 pt-2 text-[9px] font-mono-code ${
                    isDark ? "text-[#64748b]" : "text-[#94a3b8]"
                  }`}
                >
                  <span>Cold Glass &bull; Independent Scroll Guard</span>
                  <span>100% Zero Background Drift</span>
                </div>
              </div>
            </ColdGlassSurface>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

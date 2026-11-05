"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  X,
  Minus,
  Sparkles,
  Send,
  Mic,
  MicOff,
  ShieldCheck,
  RotateCcw,
  Volume2,
  VolumeX,
  Compass,
  ArrowUpRight,
  AlertCircle,
  Square,
} from "lucide-react";
import AskColdMessage, { ChatMessage, MessageActionChip } from "./AskColdMessage";
import {
  isSpeechRecognitionSupported,
  BrowserSpeechRecognizer,
  stopSpeakingAssistant,
} from "@/lib/askColdSpeech";
import { sound } from "@/lib/sounds";

interface AskColdPanelProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  onOpenPreferences: () => void;
  onOpenEnquiry: () => void;
  currentPath: string;
  persistenceEnabled: boolean;
  quotaExhausted?: boolean;
  }

export default function AskColdPanel({
  isOpen,
  onClose,
  messages,
  onSendMessage,
  isLoading,
  onOpenPreferences,
  onOpenEnquiry,
  currentPath,
  persistenceEnabled,
  quotaExhausted = false,
  }: AskColdPanelProps) {
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const recognizerRef = useRef<BrowserSpeechRecognizer | null>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen, interimTranscript]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      stopSpeakingAssistant();
      setSpeakingMessageId(null);
      if (recognizerRef.current?.active()) {
        recognizerRef.current.abort();
        setIsListening(false);
      }
    }
  }, [isOpen]);

  // Context-aware badge and prompt
  const contextData = React.useMemo(() => {
    if (currentPath.includes("/work/spot")) {
      return {
        label: "Viewing Spot Case Study",
        suggested: "What was Taye's role on Spot?",
      };
    }
    if (currentPath.includes("/work/profile")) {
      return {
        label: "Viewing PROfile HRMS",
        suggested: "How does PROfile address employee attrition?",
      };
    }
    if (currentPath.includes("/work/quickeats")) {
      return {
        label: "Viewing QuickEats",
        suggested: "Explain the dual-theme design in QuickEats",
      };
    }
    if (currentPath.includes("/work/raven-bank")) {
      return {
        label: "Viewing Raven Bank Redesign",
        suggested: "What was improved in the Raven Bank sprint?",
      };
    }
    if (currentPath.includes("/work/medesy")) {
      return {
        label: "Viewing MEDesy Healthcare",
        suggested: "Why WhatsApp-first triage for MEDesy?",
      };
    }
    if (currentPath.includes("/work/9jatrip")) {
      return {
        label: "Viewing 9jaTrip Transit",
        suggested: "How does 9jaTrip handle terminal boarding passes?",
      };
    }
    if (currentPath.includes("/lab")) {
      return {
        label: "Browsing The Lab",
        suggested: "Explain the experiments inside The Lab",
      };
    }
    if (currentPath.includes("/about")) {
      return {
        label: "Browsing About Taye",
        suggested: "What is Taye's design philosophy?",
      };
    }
    if (currentPath.includes("/contact")) {
      return {
        label: "Browsing Contact",
        suggested: "How can I collaborate or hire Taye?",
      };
    }
    return {
      label: "Cold Designer Portfolio",
      suggested: "Tell me about Taye Abolarin",
    };
  }, [currentPath]);

  // Speech Recognition setup
  const toggleListening = () => {
    sound.playClick();

    if (isListening) {
      recognizerRef.current?.stop();
      setIsListening(false);
      setInterimTranscript("");
      return;
    }

    if (!isSpeechRecognitionSupported()) {
      alert("Voice input is not supported in this browser. Please use the text input below.");
      return;
    }

    const recognizer = new BrowserSpeechRecognizer({
      onStart: () => {
        setIsListening(true);
        setInterimTranscript("");
      },
      onInterimResult: (interim) => {
        setInterimTranscript(interim);
      },
      onFinalResult: (final) => {
        setIsListening(false);
        setInterimTranscript("");
        if (final.trim()) {
          onSendMessage(final.trim());
        }
      },
      onError: (err) => {
        setIsListening(false);
        setInterimTranscript("");
      },
      onEnd: () => {
        setIsListening(false);
        setInterimTranscript("");
      },
    });

    recognizerRef.current = recognizer;
    recognizer.start();
  };

  const handleFormSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const clean = inputText.trim();
    if (!clean || isLoading) return;
    sound.playClick();
    onSendMessage(clean);
    setInputText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleFormSubmit();
    }
  };

  const handleActionClick = (chip: MessageActionChip) => {
    if (chip.action === "enquiry") {
      onOpenEnquiry();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="region"
      aria-label="Ask Cold AI Representative Panel"
      data-lenis-prevent
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="ask-cold-glass-panel fixed bottom-20 right-4 sm:right-6 z-40 w-[calc(100vw-2rem)] sm:w-[420px] md:w-[440px] max-h-[82vh] h-[640px] rounded-3xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300"
      style={{
        backdropFilter: "url(#cold-glass-filter-card) blur(24px) saturate(185%) contrast(105%)",
        WebkitBackdropFilter: "blur(24px) saturate(185%) contrast(105%)",
        transform: "translate3d(0, calc(-1 * var(--ask-cold-lift, 0px)), 0)",
        transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        overscrollBehavior: "contain",
      }}
    >
      {/* ── PANEL HEADER ── */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center h-8 w-8 rounded-full bg-[var(--accent,#a9ddf0)] text-[#090b0f] font-bold shrink-0">
            <Sparkles size={16} />
            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-[#090b0f]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm text-[var(--text-primary,#f2f1ec)] tracking-tight">
                Ask Cold
              </span>
              <span className="font-mono-code text-[10px] px-1.5 py-0.2 rounded bg-white/[0.06] text-[var(--accent,#a9ddf0)] border border-white/[0.08]">
                AI Rep
              </span>
            </div>
            <p className="font-mono-code text-[11px] text-[var(--text-secondary,#89919d)]">
              Taye Abolarin&apos;s Portfolio Guide
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenPreferences();
            }}
            title={persistenceEnabled ? "Memory: Saved" : "Memory: Temporary"}
            className="p-1.5 rounded-full text-[var(--text-secondary,#89919d)] hover:text-[var(--text-primary,#f2f1ec)] hover:bg-white/[0.05] transition-colors cursor-pointer"
            aria-label="Conversation privacy and memory settings"
          >
            <ShieldCheck size={16} className={persistenceEnabled ? "text-[var(--accent,#a9ddf0)]" : ""} />
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-full text-[var(--text-secondary,#89919d)] hover:text-[var(--text-primary,#f2f1ec)] hover:bg-white/[0.05] transition-colors cursor-pointer"
            aria-label="Minimize Ask Cold panel"
          >
            <Minus size={16} />
          </button>
        </div>
      </div>

      {/* ── CONTEXT PILL BAR ── */}
      <div className="flex items-center justify-between px-5 py-2 bg-white/[0.015] border-b border-white/[0.04] font-mono-code text-[11px] text-[var(--text-secondary,#89919d)] shrink-0">
        <div className="flex items-center gap-1.5 truncate">
          <Compass size={11} className="text-[var(--accent,#a9ddf0)] shrink-0" />
          <span className="truncate">{contextData.label}</span>
        </div>
        <span className="text-[10px] text-[var(--text-muted,#565d6b)] uppercase shrink-0">
          {persistenceEnabled ? "Saved" : "Session"}
        </span>
      </div>

      {/* ── MESSAGES CONTAINER (INDEPENDENT SCROLL) ── */}
      <div
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="flex-1 min-h-0 overflow-y-auto p-5 space-y-4 font-sans text-sm overscroll-contain"
        style={{ overscrollBehavior: "contain" }}
      >
        {/* Welcome Screen when Empty */}
        {messages.length === 0 && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-[var(--text-primary,#f2f1ec)] leading-relaxed text-sm">
              <p className="font-medium mb-2 text-[var(--accent,#a9ddf0)] flex items-center gap-1.5">
                <Sparkles size={14} />
                <span>Hey, welcome to Cold Designer.</span>
              </p>
              <p className="text-[var(--text-secondary,#89919d)] text-xs leading-relaxed">
                Curious about the work, the thinking behind it, or the designer? Ask away. I&apos;ll help you find your way around.
              </p>
            </div>

            {/* Suggested starting questions */}
            <div>
              <span className="font-mono-code text-[11px] text-[var(--text-muted,#565d6b)] uppercase tracking-wider block mb-2.5">
                SUGGESTED EXPLORATIONS
              </span>
              <div className="flex flex-col gap-1.5 font-mono-code text-xs">
                {contextData.suggested && (
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      onSendMessage(contextData.suggested);
                    }}
                    className="text-left px-3.5 py-2 rounded-xl bg-[var(--accent,#a9ddf0)]/10 hover:bg-[var(--accent,#a9ddf0)]/20 border border-[var(--accent,#a9ddf0)]/30 text-[var(--accent,#a9ddf0)] transition-all cursor-pointer font-medium"
                  >
                    &bull; {contextData.suggested}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onSendMessage("Tell me about Taye");
                  }}
                  className="text-left px-3.5 py-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] text-[var(--text-secondary,#89919d)] hover:text-[var(--text-primary,#f2f1ec)] transition-all cursor-pointer"
                >
                  &bull; Tell me about Taye Abolarin
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onSendMessage("Show me his mobile app projects");
                  }}
                  className="text-left px-3.5 py-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] text-[var(--text-secondary,#89919d)] hover:text-[var(--text-primary,#f2f1ec)] transition-all cursor-pointer"
                >
                  &bull; Show me his mobile app projects
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onSendMessage("How does Taye approach design?");
                  }}
                  className="text-left px-3.5 py-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] text-[var(--text-secondary,#89919d)] hover:text-[var(--text-primary,#f2f1ec)] transition-all cursor-pointer"
                >
                  &bull; How does Taye approach design?
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onSendMessage("Where can I find his resume?");
                  }}
                  className="text-left px-3.5 py-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] text-[var(--text-secondary,#89919d)] hover:text-[var(--text-primary,#f2f1ec)] transition-all cursor-pointer"
                >
                  &bull; Where can I find his resume?
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onOpenEnquiry();
                  }}
                  className="text-left px-3.5 py-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] text-[var(--text-secondary,#89919d)] hover:text-[var(--text-primary,#f2f1ec)] transition-all cursor-pointer"
                >
                  &bull; Discuss a project / Hire Taye
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Render message list */}
        {messages.map((m) => (
          <AskColdMessage
            key={m.id}
            message={m}
            onActionClick={handleActionClick}
            speakingMessageId={speakingMessageId}
            setSpeakingMessageId={setSpeakingMessageId}
          />
        ))}

        {/* Loading / Thinking State */}
        {isLoading && (
          <div className="flex items-center gap-2 text-xs font-mono-code text-[var(--accent,#a9ddf0)] py-2">
            <span className="flex gap-1 items-center">
              <span className="h-2 w-2 rounded-full bg-[var(--accent,#a9ddf0)] animate-bounce" />
              <span className="h-2 w-2 rounded-full bg-[var(--accent,#a9ddf0)] animate-bounce [animation-delay:0.15s]" />
              <span className="h-2 w-2 rounded-full bg-[var(--accent,#a9ddf0)] animate-bounce [animation-delay:0.3s]" />
            </span>
            <span className="text-[var(--text-secondary,#89919d)]">Cold is thinking...</span>
          </div>
        )}

        {/* Voice Interim Preview */}
        {isListening && (
          <div className="p-3 rounded-2xl bg-[var(--accent,#a9ddf0)]/15 border border-[var(--accent,#a9ddf0)]/30 font-mono-code text-xs text-[var(--accent,#a9ddf0)] animate-pulse flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 truncate">
              <Mic size={14} className="animate-spin text-[var(--accent,#a9ddf0)]" />
              <span className="truncate">
                {interimTranscript || "Listening... speak naturally"}
              </span>
            </div>
            <button
              type="button"
              onClick={toggleListening}
              className="text-[10px] uppercase font-semibold underline hover:opacity-80 shrink-0 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Quota Exhaustion Notice */}
        {quotaExhausted && (
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 font-mono-code text-xs space-y-2">
            <div className="flex items-center gap-2 font-semibold">
              <AlertCircle size={14} />
              <span>Direct Navigation Active</span>
            </div>
            <p className="font-sans text-[11px] leading-relaxed text-amber-200/80">
              Ask Cold is currently experiencing high visitor volume. You can still use quick buttons, browse projects, or download Taye&apos;s resume directly.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Link href="/work" onClick={() => sound.playClick()} className="underline hover:opacity-80">
                Browse Projects &rarr;
              </Link>
              <Link href="/lab" onClick={() => sound.playClick()} className="underline hover:opacity-80">
                The Lab &rarr;
              </Link>
              <a href="mailto:abolarintaye20@gmail.com" onClick={() => sound.playClick()} className="underline hover:opacity-80">
                Email Taye &rarr;
              </a>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── INPUT BAR ── */}
      <form
        onSubmit={handleFormSubmit}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="p-3 sm:p-4 border-t border-white/[0.08] shrink-0"
      >
        <div className="ask-cold-composer-input relative flex items-end rounded-2xl bg-white/[0.03] border border-white/[0.1] focus-within:border-[var(--accent,#a9ddf0)] transition-colors p-1.5">
          {/* Text Area */}
          <textarea
            ref={inputRef}
            rows={1}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isListening ? "Listening to your voice..." : "Ask Cold about projects, philosophy, or collaboration..."}
            disabled={isListening || isLoading}
            className="flex-1 bg-transparent px-3 py-2 text-xs text-[var(--text-primary,#f2f1ec)] placeholder:text-[var(--text-muted,#565d6b)] focus:outline-none resize-none max-h-24 leading-relaxed font-sans"
          />

          {/* Controls */}
          <div className="flex items-center gap-1 shrink-0 pb-1 pr-1">
            {/* Mic Button */}
            <button
              type="button"
              onClick={toggleListening}
              title={isListening ? "Stop listening" : "Speak to Ask Cold"}
              aria-label={isListening ? "Stop listening to voice" : "Speak to Ask Cold using microphone"}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isListening
                  ? "bg-red-500 text-white animate-pulse"
                  : "text-[var(--text-secondary,#89919d)] hover:text-[var(--text-primary,#f2f1ec)] hover:bg-white/[0.06]"
              }`}
            >
              {isListening ? <Square size={14} fill="currentColor" /> : <Mic size={15} />}
            </button>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              aria-label="Send message to Ask Cold"
              className="ask-cold-send-btn p-2 rounded-xl bg-[var(--accent,#a9ddf0)] text-[#090b0f] font-semibold hover:opacity-90 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-sm"
            >
              <Send size={14} />
            </button>
          </div>
        </div>

        {/* Footer Attribution & Disclaimer */}
        <div className="flex items-center justify-between px-2 pt-2 text-[10px] font-mono-code text-[var(--text-muted,#565d6b)]">
          <span>Ask Cold &bull; Portfolio Guide</span>
          <span>Not an impersonation</span>
        </div>
      </form>
    </div>
  );
}


"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Volume2, VolumeX, Sparkles, ExternalLink, ArrowRight, FileText, Send } from "lucide-react";
import { speakAssistantResponse, stopSpeakingAssistant } from "@/lib/askColdSpeech";
import { sound } from "@/lib/sounds";

export interface MessageActionChip {
  label: string;
  href?: string;
  action?: "enquiry" | "resume" | "link";
}

/**
 * Checks whether an href represents an internal website navigation route or in-page anchor
 */
export function isInternalWebsiteLink(href?: string): boolean {
  if (!href) return false;
  if (/^(https?:)?\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return false;
  }
  if (/\.(pdf|zip|png|jpe?g|svg)$/i.test(href)) {
    return false;
  }
  return href.startsWith("/") || href.startsWith("#");
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: number;
  actionChips?: MessageActionChip[];
  isError?: boolean;
}

interface AskColdMessageProps {
  message: ChatMessage;
  onActionClick?: (chip: MessageActionChip) => void;
  onInternalNavigate?: (href: string, e?: React.MouseEvent) => void;
  speakingMessageId: string | null;
  setSpeakingMessageId: (id: string | null) => void;
}

/**
 * Format markdown text: bold, code, bullet lists, and links
 */
function renderFormattedText(
  text: string,
  onInternalNavigate?: (href: string, e?: React.MouseEvent) => void
) {
  // Split into lines for list processing
  const lines = text.split("\n");

  return lines.map((line, lineIdx) => {
    // Check if line is a bullet
    const isBullet = line.trim().startsWith("* ") || line.trim().startsWith("- ");
    const cleanLine = isBullet ? line.trim().slice(2) : line;

    // Parse links, bold, code
    const parts: React.ReactNode[] = [];
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIdx = 0;
    let match: RegExpExecArray | null;

    while ((match = linkRegex.exec(cleanLine)) !== null) {
      if (match.index > lastIdx) {
        parts.push(renderInlineText(cleanLine.slice(lastIdx, match.index), `${lineIdx}-${lastIdx}`));
      }
      const label = match[1];
      const href = match[2];
      const isInternal = isInternalWebsiteLink(href);

      if (isInternal) {
        parts.push(
          <Link
            key={`link-${lineIdx}-${match.index}`}
            href={href}
            onClick={(e) => {
              sound.playClick();
              onInternalNavigate?.(href, e);
            }}
            className="text-[var(--accent,#a9ddf0)] underline underline-offset-2 hover:opacity-80 transition-opacity font-medium"
          >
            {label}
          </Link>
        );
      } else {
        parts.push(
          <a
            key={`ext-${lineIdx}-${match.index}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="text-[var(--accent,#a9ddf0)] underline underline-offset-2 hover:opacity-80 transition-opacity inline-flex items-center gap-0.5 font-medium"
          >
            <span>{label}</span>
            <ExternalLink size={10} className="inline opacity-80" />
          </a>
        );
      }
      lastIdx = linkRegex.lastIndex;
    }

    if (lastIdx < cleanLine.length) {
      parts.push(renderInlineText(cleanLine.slice(lastIdx), `${lineIdx}-${lastIdx}`));
    }

    if (isBullet) {
      return (
        <div key={`line-${lineIdx}`} className="flex items-start gap-2 my-1">
          <span className="text-[var(--accent,#a9ddf0)] font-bold select-none">&bull;</span>
          <span className="flex-1">{parts}</span>
        </div>
      );
    }

    return (
      <p key={`line-${lineIdx}`} className={lineIdx > 0 ? "mt-2" : ""}>
        {parts}
      </p>
    );
  });
}

function renderInlineText(text: string, keyPrefix: string): React.ReactNode[] {
  // Handle **bold** and `code`
  const result: React.ReactNode[] = [];
  const tokenRegex = /(\*\*([^*]+)\*\*|`([^`]+)`)/g;
  let lastIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      result.push(text.slice(lastIdx, match.index));
    }
    if (match[2]) {
      // Bold
      result.push(
        <strong key={`${keyPrefix}-b-${match.index}`} className="font-semibold text-[var(--text-primary,#f2f1ec)]">
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      // Code
      result.push(
        <code
          key={`${keyPrefix}-c-${match.index}`}
          className="font-mono-code text-[11px] px-1.5 py-0.5 rounded bg-white/[0.06] text-[var(--accent,#a9ddf0)] border border-white/[0.08]"
        >
          {match[3]}
        </code>
      );
    }
    lastIdx = tokenRegex.lastIndex;
  }

  if (lastIdx < text.length) {
    result.push(text.slice(lastIdx));
  }

  return result;
}

export default function AskColdMessage({
  message,
  onActionClick,
  onInternalNavigate,
  speakingMessageId,
  setSpeakingMessageId,
}: AskColdMessageProps) {
  const isUser = message.sender === "user";
  const isSpeaking = speakingMessageId === message.id;

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      stopSpeakingAssistant();
      setSpeakingMessageId(null);
    } else {
      setSpeakingMessageId(message.id);
      speakAssistantResponse(message.text, {
        onStart: () => setSpeakingMessageId(message.id),
        onEnd: () => setSpeakingMessageId(null),
        onError: () => setSpeakingMessageId(null),
      });
    }
  };

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} mb-4 w-full`}>
      {/* Bubble Container */}
      <div
        className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed transition-all shadow-sm ${
          isUser
            ? "ask-cold-bubble-user bg-[#0b1329] text-white border border-[#38bdf8]/30 font-medium rounded-tr-sm font-sans"
            : message.isError
            ? "bg-red-500/10 border border-red-500/30 text-[var(--text-primary,#f2f1ec)] rounded-tl-sm"
            : "ask-cold-bubble-assistant bg-[var(--bg-surface,#11141b)] text-[var(--text-primary,#f2f1ec)] border border-[var(--border-subtle,rgba(255,255,255,0.08))] rounded-tl-sm font-sans"
        }`}
      >
        {/* Assistant Header Tag */}
        {!isUser && (
          <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-white/[0.06] font-mono-code text-[11px] text-[var(--text-secondary,#89919d)]">
            <span className="flex items-center gap-1.5 text-[var(--accent,#a9ddf0)] font-medium">
              <Sparkles size={11} />
              <span>Ask Cold</span>
            </span>
            <button
              type="button"
              onClick={handleToggleSpeech}
              title={isSpeaking ? "Stop speaking" : "Listen to response"}
              aria-label={isSpeaking ? "Stop speaking response" : "Read response aloud"}
              className="hover:text-[var(--text-primary,#f2f1ec)] transition-colors p-1 -mr-1 rounded cursor-pointer"
            >
              {isSpeaking ? (
                <span className="flex items-center gap-1 text-[var(--accent,#a9ddf0)]">
                  <VolumeX size={13} />
                  <span className="text-[10px] animate-pulse">Playing</span>
                </span>
              ) : (
                <Volume2 size={13} className="opacity-70 hover:opacity-100" />
              )}
            </button>
          </div>
        )}

        {/* Message Content */}
        <div className="break-words">{renderFormattedText(message.text, onInternalNavigate)}</div>

        {/* Timestamp */}
        <div
          className={`text-[10px] mt-1.5 font-mono-code ${
            isUser ? "text-[#090b0f]/60 text-right" : "text-[var(--text-muted,#565d6b)] text-left"
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>

      {/* Action Chips */}
      {!isUser && message.actionChips && message.actionChips.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2 max-w-[85%] sm:max-w-[80%] font-mono-code text-xs">
          {message.actionChips.map((chip, idx) => {
            if (chip.href) {
              const isInternal = isInternalWebsiteLink(chip.href);
              return (
                <Link
                  key={`chip-${idx}`}
                  href={chip.href}
                  onClick={(e) => {
                    sound.playClick();
                    if (isInternal) {
                      onInternalNavigate?.(chip.href!, e);
                    }
                    onActionClick?.(chip);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 bg-white/[0.04] hover:bg-[var(--accent,#a9ddf0)]/15 border border-white/[0.1] hover:border-[var(--accent,#a9ddf0)] text-[var(--text-secondary,#89919d)] hover:text-[var(--accent,#a9ddf0)] transition-all cursor-pointer text-[11px]"
                >
                  {chip.action === "resume" && <FileText size={11} />}
                  <span>{chip.label}</span>
                  <ArrowRight size={10} />
                </Link>
              );
            }

            return (
              <button
                key={`chip-${idx}`}
                type="button"
                onClick={() => {
                  sound.playClick();
                  onActionClick?.(chip);
                }}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 bg-[var(--accent,#a9ddf0)]/10 hover:bg-[var(--accent,#a9ddf0)]/20 border border-[var(--accent,#a9ddf0)]/30 text-[var(--accent,#a9ddf0)] transition-all cursor-pointer text-[11px] font-medium"
              >
                {chip.action === "enquiry" && <Send size={11} />}
                <span>{chip.label}</span>
                <ArrowRight size={10} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}


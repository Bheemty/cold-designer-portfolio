"use client";

import React from "react";
import { X, ShieldCheck, Trash2, Check, RefreshCw } from "lucide-react";
import { sound } from "@/lib/sounds";

interface AskColdPreferencesProps {
  isOpen: boolean;
  onClose: () => void;
  persistenceEnabled: boolean;
  onTogglePersistence: (enabled: boolean) => void;
  onClearHistory: () => void;
}

export default function AskColdPreferences({
  isOpen,
  onClose,
  persistenceEnabled,
  onTogglePersistence,
  onClearHistory,
}: AskColdPreferencesProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pref-modal-title"
      className="absolute inset-0 z-50 rounded-3xl p-6 flex flex-col justify-between animate-in fade-in duration-200 bg-[var(--bg-primary,#090b0f)]/95 backdrop-blur-2xl"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
          <div className="flex items-center gap-2 font-mono-code text-xs text-[var(--accent,#a9ddf0)] uppercase tracking-wider font-semibold">
            <ShieldCheck size={14} />
            <span id="pref-modal-title">Conversation Privacy &amp; Memory</span>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1 rounded-full text-[var(--text-secondary,#89919d)] hover:text-[var(--text-primary,#f2f1ec)] transition-colors"
            aria-label="Close preferences"
          >
            <X size={16} />
          </button>
        </div>

        {/* Options */}
        <div className="space-y-4 font-sans text-xs">
          <div className="text-[var(--text-secondary,#89919d)] leading-relaxed">
            Choose how your dialogue with Ask Cold is stored. Voice recordings are never saved or sent to any server.
          </div>

          {/* Option A: Temporary */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onTogglePersistence(false);
            }}
            className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
              !persistenceEnabled
                ? "border-[var(--accent,#a9ddf0)] bg-[var(--accent,#a9ddf0)]/10 text-[var(--text-primary,#f2f1ec)]"
                : "border-white/[0.08] bg-white/[0.02] text-[var(--text-secondary,#89919d)] hover:border-white/[0.16]"
            }`}
          >
            <div>
              <div className="font-semibold text-sm mb-1 text-[var(--text-primary,#f2f1ec)]">
                Temporary Conversation (Default)
              </div>
              <p className="text-[11px] leading-relaxed text-[var(--text-secondary,#89919d)]">
                Your chat exists only in this browser session. When you close the tab or window, the conversation is wiped clean.
              </p>
            </div>
            {!persistenceEnabled && (
              <div className="h-5 w-5 rounded-full bg-[var(--accent,#a9ddf0)] text-[#090b0f] flex items-center justify-center shrink-0 mt-0.5">
                <Check size={12} strokeWidth={3} />
              </div>
            )}
          </button>

          {/* Option B: Remembered */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onTogglePersistence(true);
            }}
            className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
              persistenceEnabled
                ? "border-[var(--accent,#a9ddf0)] bg-[var(--accent,#a9ddf0)]/10 text-[var(--text-primary,#f2f1ec)]"
                : "border-white/[0.08] bg-white/[0.02] text-[var(--text-secondary,#89919d)] hover:border-white/[0.16]"
            }`}
          >
            <div>
              <div className="font-semibold text-sm mb-1 text-[var(--text-primary,#f2f1ec)]">
                Remember My Conversation
              </div>
              <p className="text-[11px] leading-relaxed text-[var(--text-secondary,#89919d)]">
                Saves text messages locally in this browser&apos;s localStorage so you can resume questions during future visits.
              </p>
            </div>
            {persistenceEnabled && (
              <div className="h-5 w-5 rounded-full bg-[var(--accent,#a9ddf0)] text-[#090b0f] flex items-center justify-center shrink-0 mt-0.5">
                <Check size={12} strokeWidth={3} />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-4 border-t border-white/[0.08] space-y-3 font-mono-code text-xs">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            if (confirm("Clear all messages in this conversation?")) {
              onClearHistory();
              onClose();
            }
          }}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-500/30 text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
        >
          <Trash2 size={13} />
          <span>Clear Current Conversation</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="w-full py-2.5 rounded-xl bg-[var(--btn-primary-bg,#FDFDFD)] text-[var(--btn-primary-fg,#090b0f)] font-semibold hover:bg-[var(--accent,#a9ddf0)] transition-colors cursor-pointer text-center"
        >
          Save &amp; Return to Chat
        </button>
      </div>
    </div>
  );
}


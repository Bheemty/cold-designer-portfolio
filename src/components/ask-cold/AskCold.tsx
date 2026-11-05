"use client";

import React, { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import AskColdLauncher from "./AskColdLauncher";
import AskColdPanel from "./AskColdPanel";
import AskColdPreferences from "./AskColdPreferences";
import AskColdEnquiryModal from "./AskColdEnquiryModal";
import { ChatMessage } from "./AskColdMessage";
import { generateLocalMockResponse } from "@/lib/askColdRetrieval";
import { sound } from "@/lib/sounds";

const STORAGE_PERSISTENCE_KEY = "cold_ask_cold_persistence";
const STORAGE_MESSAGES_KEY = "cold_ask_cold_messages";
const SESSION_MESSAGES_KEY = "cold_ask_cold_session_messages";

export default function AskCold() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [persistenceEnabled, setPersistenceEnabled] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [quotaExhausted, setQuotaExhausted] = useState(false);
  // liftOffset is driven directly via CSS variable --ask-cold-lift to prevent 60-120fps React re-renders during scroll

  // Position coordinator: dynamically lift launcher & panel above "Back to Top" whenever it is visible in the viewport
  useEffect(() => {
    let ticking = false;

    let lastLift = -1;
    const computeLift = () => {
      const backToTop = document.querySelector(".footer-top") as HTMLElement | null;
      if (!backToTop) {
        if (lastLift !== 0) {
          lastLift = 0;
          document.documentElement.style.setProperty("--ask-cold-lift", "0px");
        }
        ticking = false;
        return;
      }

      const rect = backToTop.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Check if Back to Top button is visible in viewport
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const bottomDistance = viewportHeight - rect.top;
        const gap = 20; // 20px comfortable vertical gap (16-24px spec)
        const defaultBottom = window.innerWidth >= 640 ? 24 : 16;
        const neededBottom = bottomDistance + gap;
        const lift = Math.max(0, Math.round(neededBottom - defaultBottom));
        if (lift !== lastLift) {
          lastLift = lift;
          document.documentElement.style.setProperty("--ask-cold-lift", `${lift}px`);
        }
      } else {
        if (lastLift !== 0) {
          lastLift = 0;
          document.documentElement.style.setProperty("--ask-cold-lift", "0px");
        }
      }
      ticking = false;
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(computeLift);
      }
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    const lenis = (window as unknown as { __lenis?: { on: (e: string, cb: () => void) => void; off: (e: string, cb: () => void) => void } }).__lenis;
    if (lenis?.on) {
      lenis.on("scroll", onScrollOrResize);
    }

    computeLift();

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (lenis?.off) {
        lenis.off("scroll", onScrollOrResize);
      }
    };
  }, [pathname]);

  // Initialize persistence preference and restore messages
  useEffect(() => {
    try {
      const persistedChoice = localStorage.getItem(STORAGE_PERSISTENCE_KEY) === "true";
      setPersistenceEnabled(persistedChoice);

      if (persistedChoice) {
        const saved = localStorage.getItem(STORAGE_MESSAGES_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) setMessages(parsed);
        }
      } else {
        const sessionSaved = sessionStorage.getItem(SESSION_MESSAGES_KEY);
        if (sessionSaved) {
          const parsed = JSON.parse(sessionSaved);
          if (Array.isArray(parsed)) setMessages(parsed);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Save messages whenever updated
  useEffect(() => {
    if (messages.length === 0) return;
    try {
      if (persistenceEnabled) {
        localStorage.setItem(STORAGE_MESSAGES_KEY, JSON.stringify(messages));
      } else {
        sessionStorage.setItem(SESSION_MESSAGES_KEY, JSON.stringify(messages));
      }
    } catch {}
  }, [messages, persistenceEnabled]);

  const handleTogglePersistence = (enabled: boolean) => {
    setPersistenceEnabled(enabled);
    try {
      localStorage.setItem(STORAGE_PERSISTENCE_KEY, enabled ? "true" : "false");
      if (!enabled) {
        localStorage.removeItem(STORAGE_MESSAGES_KEY);
        sessionStorage.setItem(SESSION_MESSAGES_KEY, JSON.stringify(messages));
      } else {
        localStorage.setItem(STORAGE_MESSAGES_KEY, JSON.stringify(messages));
      }
    } catch {}
  };

  const handleClearHistory = () => {
    setMessages([]);
    try {
      localStorage.removeItem(STORAGE_MESSAGES_KEY);
      sessionStorage.removeItem(SESSION_MESSAGES_KEY);
    } catch {}
  };

  const handleSendMessage = useCallback(
    async (text: string) => {
      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        sender: "user",
        text,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      // Attempt AI backend call first; fallback gracefully to local retrieval if quota / key missing
      const historyForApi = messages.slice(-6).map((m) => ({
        role: m.sender === "user" ? "user" : "model",
        text: m.text,
      }));

      try {
        const res = await fetch("/api/ask-cold", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            currentPath: pathname || "/",
            history: historyForApi,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const assistantMsg: ChatMessage = {
            id: `assistant-${Date.now()}`,
            sender: "assistant",
            text: data.reply || "I am here to help you navigate Taye's portfolio.",
            timestamp: Date.now(),
            actionChips: data.actionChips || [],
          };
          setMessages((prev) => [...prev, assistantMsg]);
          sound.playChime();
          setIsLoading(false);
          return;
        }

        if (res.status === 429) {
          setQuotaExhausted(true);
        }
      } catch (err) {
        // Fallback to local response
      }

      // Local Grounded Mock Response Fallback
      setTimeout(() => {
        const local = generateLocalMockResponse(text, pathname || "/", historyForApi);
        const assistantMsg: ChatMessage = {
          id: `assistant-${Date.now()}`,
          sender: "assistant",
          text: local.text,
          timestamp: Date.now(),
          actionChips: local.actionChips,
        };
        setMessages((prev) => [...prev, assistantMsg]);
        sound.playChime();
        setIsLoading(false);
      }, 500);
    },
    [messages, pathname]
  );

  return (
    <>
      {/* Floating Discreet Launcher */}
      <AskColdLauncher
        isOpen={isOpen}
        onToggle={() => setIsOpen((prev) => !prev)}
        hasUnread={messages.length === 0}
        
      />

      {/* Main Chat Panel */}
      <AskColdPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        onOpenPreferences={() => setIsPreferencesOpen(true)}
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
        currentPath={pathname || "/"}
        persistenceEnabled={persistenceEnabled}
        quotaExhausted={quotaExhausted}
        
      />

      {/* Preferences Dialog */}
      <AskColdPreferences
        isOpen={isOpen && isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
        persistenceEnabled={persistenceEnabled}
        onTogglePersistence={handleTogglePersistence}
        onClearHistory={handleClearHistory}
      />

      {/* Collaboration / Project Enquiry Modal */}
      <AskColdEnquiryModal
        isOpen={isOpen && isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        onSubmittedMessage={(msg) => {
          setMessages((prev) => [
            ...prev,
            {
              id: `enquiry-confirm-${Date.now()}`,
              sender: "assistant",
              text: msg,
              timestamp: Date.now(),
            },
          ]);
        }}
      />
    </>
  );
}


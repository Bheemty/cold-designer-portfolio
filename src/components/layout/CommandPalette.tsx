"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, CornerDownLeft, Volume2, VolumeX, Copy, Check, FileDown, ExternalLink } from "lucide-react";
import { sound } from "@/lib/sounds";

interface CommandItem {
  id: string;
  category: "Pages" | "Case Studies" | "Actions";
  title: string;
  subtitle?: string;
  shortcut?: string;
  icon?: string;
  action: () => void;
}

export default function CommandPalette() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [sfxEnabled, setSfxEnabled] = useState(false);
  const [copied, setCopied] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Sync SFX state
  useEffect(() => {
    setSfxEnabled(sound.isEnabled());
    const onToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ enabled: boolean }>;
      setSfxEnabled(customEvent.detail.enabled);
    };
    window.addEventListener("cold:sfx_toggle", onToggle);
    return () => window.removeEventListener("cold:sfx_toggle", onToggle);
  }, []);

  const openPalette = useCallback(() => {
    sound.playTick();
    setIsOpen(true);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const closePalette = useCallback(() => {
    sound.playTick();
    setIsOpen(false);
    setQuery("");
  }, []);

  // Listen for Cmd+K / Ctrl+K and custom trigger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setIsOpen((prev) => {
          if (prev) {
            sound.playTick();
            return false;
          }
          sound.playTick();
          setQuery("");
          setSelectedIndex(0);
          return true;
        });
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        closePalette();
      }
    };

    const handleExternalOpen = () => openPalette();

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("cold:open_palette", handleExternalOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("cold:open_palette", handleExternalOpen);
    };
  }, [isOpen, openPalette, closePalette]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("abolarintaye20@gmail.com");
      sound.playTick();
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 1200);
    } catch {
      window.location.href = "mailto:abolarintaye20@gmail.com";
      setIsOpen(false);
    }
  }, []);

  const toggleSfx = useCallback(() => {
    const next = sound.toggle();
    setSfxEnabled(next);
  }, []);

  // Registry of commands
  const commands: CommandItem[] = useMemo(
    () => [
      // Pages
      {
        id: "nav-home",
        category: "Pages",
        title: "Home",
        subtitle: "Cover, 0-to-1 strategy & hero scratch exhibit",
        shortcut: "01",
        action: () => {
          router.push("/");
          closePalette();
        },
      },
      {
        id: "nav-work",
        category: "Pages",
        title: "Selected Work",
        subtitle: "Verified directory of 12 production systems",
        shortcut: "02",
        action: () => {
          router.push("/work");
          closePalette();
        },
      },
      {
        id: "nav-about",
        category: "Pages",
        title: "About / Monograph",
        subtitle: "Identity, operating principles & background",
        shortcut: "03",
        action: () => {
          router.push("/about");
          closePalette();
        },
      },
      {
        id: "nav-lab",
        category: "Pages",
        title: "The Lab",
        subtitle: "Interactive state machines & design tokens",
        shortcut: "04",
        action: () => {
          router.push("/lab");
          closePalette();
        },
      },
      {
        id: "nav-contact",
        category: "Pages",
        title: "Contact",
        subtitle: "Role inquiries & 0-to-1 project briefs",
        shortcut: "05",
        action: () => {
          router.push("/contact");
          closePalette();
        },
      },

      // Case Studies
      {
        id: "case-medesy",
        category: "Case Studies",
        title: "MEDesy",
        subtitle: "Healthcare triage system inside WhatsApp",
        shortcut: "Case 01",
        action: () => {
          router.push("/work/medesy");
          closePalette();
        },
      },
      {
        id: "case-9jatrip",
        category: "Case Studies",
        title: "9jaTrip",
        subtitle: "Intercity transit & motor-park mobile booking",
        shortcut: "Case 02",
        action: () => {
          router.push("/work/9jatrip");
          closePalette();
        },
      },
      {
        id: "case-paai",
        category: "Case Studies",
        title: "PAAI",
        subtitle: "Autonomous AI finance assistant trust gates",
        shortcut: "Case 03",
        action: () => {
          router.push("/work/paai");
          closePalette();
        },
      },
      {
        id: "case-somewhere",
        category: "Case Studies",
        title: "Somewhere Hotel",
        subtitle: "Editorial spatial booking around daylight & space",
        shortcut: "Case 04",
        action: () => {
          router.push("/work/somewhere-hotel");
          closePalette();
        },
      },
      {
        id: "case-buybuddy",
        category: "Case Studies",
        title: "BuyBuddy",
        subtitle: "Social commerce & peer-to-peer cart coordination",
        shortcut: "Case 05",
        action: () => {
          router.push("/work/buybuddy");
          closePalette();
        },
      },
      {
        id: "case-stillwater",
        category: "Case Studies",
        title: "Stillwater Hall",
        subtitle: "Immersive spatial identity for private wellness retreats",
        shortcut: "Case 06",
        action: () => {
          router.push("/work/stillwater");
          closePalette();
        },
      },

      // Quick Actions
      {
        id: "act-copy-email",
        category: "Actions",
        title: copied ? "Email Copied to Clipboard ✓" : "Copy Email Address",
        subtitle: "abolarintaye20@gmail.com",
        shortcut: "Email",
        action: copyEmail,
      },
      {
        id: "act-download-resume",
        category: "Actions",
        title: "Download Résumé (PDF)",
        subtitle: "Taye Abolarin — Product Designer CV",
        shortcut: "PDF",
        action: () => {
          const a = document.createElement("a");
          a.href = "/Taye%20Abolarin-Product%20Designer-Resume.pdf";
          a.download = "Taye Abolarin-Product Designer-Resume.pdf";
          a.click();
          closePalette();
        },
      },
      {
        id: "act-toggle-sfx",
        category: "Actions",
        title: sfxEnabled ? "Toggle Micro-SFX: [ Turned ON ]" : "Toggle Micro-SFX: [ Turned OFF ]",
        subtitle: "Native Web Audio mechanical interface feedback",
        shortcut: sfxEnabled ? "SFX: ON" : "SFX: OFF",
        action: toggleSfx,
      },
      {
        id: "act-linkedin",
        category: "Actions",
        title: "Open LinkedIn Profile",
        subtitle: "linkedin.com/in/taye-abolarin",
        shortcut: "↗",
        action: () => {
          window.open("https://www.linkedin.com/in/taye-abolarin-047b32213/", "_blank");
          closePalette();
        },
      },
      {
        id: "act-github",
        category: "Actions",
        title: "Open GitHub Profile",
        subtitle: "github.com/Bheemty",
        shortcut: "↗",
        action: () => {
          window.open("https://github.com/Bheemty", "_blank");
          closePalette();
        },
      },
    ],
    [router, closePalette, copyEmail, toggleSfx, sfxEnabled, copied]
  );

  // Filter commands by search query
  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;
    const clean = query.toLowerCase().trim();
    return commands.filter(
      (c) =>
        c.title.toLowerCase().includes(clean) ||
        c.category.toLowerCase().includes(clean) ||
        (c.subtitle && c.subtitle.toLowerCase().includes(clean))
    );
  }, [commands, query]);

  // Keep selected index bounded
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Handle keyboard list navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      sound.playTick();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      sound.playTick();
      setSelectedIndex(
        (prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length)
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        sound.playTick();
        filteredCommands[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-[120] flex items-start justify-center pt-[12vh] sm:pt-[15vh] px-4"
    >
      {/* Blurred Backdrop */}
      <div
        onClick={closePalette}
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity animate-in fade-in duration-150"
        aria-hidden="true"
      />

      {/* Palette Modal */}
      <div
        className="relative w-full max-w-xl rounded-2xl border border-white/[0.14] bg-[#0c0e14]/95 shadow-[0_24px_64px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.15)] text-[#f2f1ec] overflow-hidden backdrop-blur-2xl transition-all animate-in zoom-in-95 duration-150"
        onKeyDown={handleKeyDown}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3.5">
          <Search size={16} className="text-[#a9ddf0] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, case study, or quick action..."
            className="w-full bg-transparent font-sans text-sm text-[#f2f1ec] placeholder-[#89919d]/60 focus:outline-none"
          />
          <button
            type="button"
            onClick={closePalette}
            className="rounded px-1.5 py-0.5 border border-white/[0.12] bg-white/[0.04] font-mono-code text-[10px] text-[#89919d] hover:text-[#f2f1ec] transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="max-h-[380px] overflow-y-auto p-2 space-y-1 no-scrollbar"
        >
          {filteredCommands.length === 0 ? (
            <div className="py-10 text-center font-mono-code text-xs text-[#89919d]">
              No matching commands found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filteredCommands.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    sound.playTick();
                    item.action();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-left transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-[#a9ddf0]/15 border border-[#a9ddf0]/30 text-[#f2f1ec]"
                      : "border border-transparent text-[#89919d] hover:text-[#f2f1ec]"
                  }`}
                >
                  <div className="flex flex-col min-w-0 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-sm font-medium text-[#f2f1ec] truncate">
                        {item.title}
                      </span>
                      <span className="font-mono-code text-[10px] text-[#a9ddf0]/80 uppercase tracking-wider shrink-0">
                        {item.category}
                      </span>
                    </div>
                    {item.subtitle && (
                      <span className="font-mono-code text-xs text-[#89919d] truncate mt-0.5">
                        {item.subtitle}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {item.shortcut && (
                      <span className="rounded-md border border-white/[0.12] bg-white/[0.04] px-2 py-0.5 font-mono-code text-[11px] text-[#89919d]">
                        {item.shortcut}
                      </span>
                    )}
                    {isSelected && (
                      <CornerDownLeft size={13} className="text-[#a9ddf0]" />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Palette Footer Hints */}
        <div className="flex items-center justify-between border-t border-white/[0.08] px-4 py-2.5 font-mono-code text-[11px] text-[#89919d] bg-white/[0.01]">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="text-[#a9ddf0]">↑↓</kbd> Navigate
            </span>
            <span>
              <kbd className="text-[#a9ddf0]">↵</kbd> Select
            </span>
            <span>
              <kbd className="text-[#a9ddf0]">ESC</kbd> Close
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>Taye Abolarin</span>
            <span className="text-[#a9ddf0]">&bull;</span>
            <span>2026 Index</span>
          </div>
        </div>
      </div>
    </div>
  );
}

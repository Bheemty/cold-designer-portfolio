"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { sound } from "@/lib/sounds";

export type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
  mounted: false,
});

const STORAGE_KEY = "cold-designer-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState<boolean>(false);

  const applyTheme = useCallback((t: Theme, animate = false) => {
    const root = document.documentElement;

    if (animate) {
      root.classList.add("theme-transitioning");
    }

    root.setAttribute("data-theme", t);
    if (t === "light") {
      root.classList.add("theme-light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("theme-light");
    }

    // Notify canvas layers (like CursorGrid) of theme change
    window.dispatchEvent(
      new CustomEvent("cold-designer-theme-change", { detail: { theme: t } })
    );

    if (animate) {
      setTimeout(() => {
        root.classList.remove("theme-transitioning");
      }, 350);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (saved === "light" || saved === "dark") {
        setThemeState(saved);
        applyTheme(saved, false);
      } else {
        // Requirement: Dark mode must be the default for every first-time visitor.
        // Do not automatically follow the operating system's light-mode preference.
        setThemeState("dark");
        applyTheme("dark", false);
      }
    } catch {
      applyTheme("dark", false);
    }
  }, [applyTheme]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      applyTheme(newTheme, true);
      try {
        localStorage.setItem(STORAGE_KEY, newTheme);
      } catch {}
    },
    [applyTheme]
  );

  const toggleTheme = useCallback(() => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    try {
      sound.playClick();
    } catch {}
    setTheme(nextTheme);
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}


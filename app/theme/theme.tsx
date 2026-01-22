'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

export type ThemeMode = "light" | "dark";

/* 
   We are moving to CSS variables for theming. 
   The theme object here is kept minimal for compatibility or if we need specific JS values, 
   but ideally styles should use Tailwind classes like `bg-background-primary`.
*/

interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize with undefined to prevent hydration mismatch, handled in useEffect
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedTheme = localStorage.getItem("receiptgold-theme-mode");
      if (savedTheme) {
        setThemeMode(savedTheme as ThemeMode);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      } else {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setThemeMode(systemPrefersDark ? "dark" : "light");
        document.documentElement.classList.toggle('dark', systemPrefersDark);
      }
    } catch (error) {
      console.log("Error loading theme:", error);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeMode((prev) => {
      const newMode = prev === "dark" ? "light" : "dark";
      localStorage.setItem("receiptgold-theme-mode", newMode);
      document.documentElement.classList.toggle('dark', newMode === 'dark');
      return newMode;
    });
  }, []);

  const setTheme = useCallback((mode: ThemeMode) => {
    setThemeMode(mode);
    localStorage.setItem("receiptgold-theme-mode", mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }, []);

  const contextValue = useMemo(() => ({
    themeMode,
    toggleTheme,
    setTheme
  }), [themeMode, toggleTheme, setTheme]);

  // Prevent flash by not rendering children until mounted (optional, but good for consistent server/client view)
  // However, for SEO we usually want to render. The class toggling above handles the visual mode.
  // We'll return children directly but the provider values update after mount.

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

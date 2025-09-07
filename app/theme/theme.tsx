'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

export type ThemeMode = "light" | "dark";

export const typography = {
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
    '7xl': '4.5rem',   // 72px
    '8xl': '6rem',     // 96px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
};

export const darkTheme = {
  background: {
    primary: "#0D1117",
    secondary: "#1C1C1E",
    tertiary: "#2C2C2E",
    elevated: "#3C3C3E",
    overlay: "rgba(0, 0, 0, 0.8)",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#8E8E93",
    tertiary: "#6D6D73",
    accent: "#FFD700",
    inverse: "#000000",
  },
  gold: {
    primary: "#FFD700",
    rich: "#B8860B",
    muted: "#8B6914",
    background: "rgba(255, 215, 0, 0.1)",
  },
  border: {
    primary: "#2C2C2E",
    secondary: "#3C3C3E",
    accent: "#FFD700",
    focus: "#FFD700",
  },
  shadow: {
    small: "0 2px 4px rgba(255, 215, 0, 0.1)",
    medium: "0 4px 8px rgba(255, 215, 0, 0.15)",
    large: "0 8px 16px rgba(255, 215, 0, 0.2)",
  },
  status: {
    success: "#34C759",
    error: "#FF3B30",
    warning: "#FF9500",
    info: "#007AFF",
  },
  typography,
};

export const lightTheme = {
  background: {
    primary: "#FFFFFF",
    secondary: "#F8F9FA",
    tertiary: "#F2F2F7",
    elevated: "#FFFFFF",
    overlay: "rgba(0, 0, 0, 0.5)",
  },
  text: {
    primary: "#1C1C1E",
    secondary: "#3C3C43",
    tertiary: "#8E8E93",
    accent: "#B8860B",
    inverse: "#FFFFFF",
  },
  gold: {
    primary: "#B8860B",
    rich: "#8B6914",
    muted: "#D4AF37",
    background: "rgba(184, 134, 11, 0.08)",
  },
  border: {
    primary: "#E5E5EA",
    secondary: "#D1D1D6",
    accent: "#B8860B",
    focus: "#B8860B",
  },
  shadow: {
    small: "0 2px 4px rgba(0, 0, 0, 0.1)",
    medium: "0 4px 8px rgba(0, 0, 0, 0.15)",
    large: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
  status: {
    success: "#34C759",
    error: "#FF3B30",
    warning: "#FF9500",
    info: "#007AFF",
  },
  typography,
};

export type Theme = typeof darkTheme;

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  useEffect(() => {
    const loadTheme = () => {
      try {
        const savedTheme = localStorage.getItem("receiptgold-theme-mode");
        if (savedTheme) {
          setThemeMode(savedTheme as ThemeMode);
        } else {
          // Check system preference
          const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          setThemeMode(systemPrefersDark ? "dark" : "light");
        }
      } catch (error) {
        console.log("Error loading theme:", error);
      }
    };
    loadTheme();
  }, []);

  const theme = useMemo(() => 
    themeMode === "dark" ? darkTheme : lightTheme, 
    [themeMode]
  );

  const toggleTheme = useCallback(() => {
    const newMode = themeMode === "dark" ? "light" : "dark";
    setThemeMode(newMode);
    localStorage.setItem("receiptgold-theme-mode", newMode);
  }, [themeMode]);

  const setTheme = useCallback((mode: ThemeMode) => {
    setThemeMode(mode);
    localStorage.setItem("receiptgold-theme-mode", mode);
  }, []);

  const contextValue = useMemo(() => ({
    theme,
    themeMode,
    toggleTheme,
    setTheme
  }), [theme, themeMode, toggleTheme, setTheme]);

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

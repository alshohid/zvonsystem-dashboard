"use client";

import type React from "react";
import { createContext, useContext, useEffect } from "react";

type Theme = "light";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void; // kept for compatibility
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    // Ensure only light mode is applied
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");

    // Optional: clean up old saved preference
    try {
      localStorage.removeItem("theme");
    } catch (e) { }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme: "light",
        toggleTheme: () => { }, // no-op (light only)
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
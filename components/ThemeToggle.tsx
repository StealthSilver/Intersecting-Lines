"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg transition-colors duration-300
        hover:bg-[#F0F0EA] dark:hover:bg-[#2A2A2A]"
      aria-label="Toggle theme"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 text-[#21201f]" />
      ) : (
        <Sun className="w-5 h-5 text-[#E0E0DA]" />
      )}
    </button>
  );
};

export default ThemeToggle;

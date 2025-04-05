"use client";

import React, { createContext, useMemo, useState, useContext, useEffect } from "react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import getDesignTokens from "../theme";

type ColorModeContextType = {
  toggleColorMode: () => void;
  mode: "light" | "dark";
};

const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: "light",
});

export const useColorMode = () => useContext(ColorModeContext);

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  // Read initial theme from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem("theme-mode") as "light" | "dark" | null;
    if (savedMode === "light" || savedMode === "dark") {
      setMode(savedMode);
    }
  }, []);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("theme-mode", mode);
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={{ toggleColorMode, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

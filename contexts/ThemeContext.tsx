import React, { createContext, useContext, useState } from "react";

const themes = {
  light: {
    primary: "#b3c9dbff",
    secondary: "#d7dce1ff",
    text: "#15191dff",
  },
  dark: {
    primary: "#38414cff",
    secondary: "#1c232bff",
    text: "#cfd4d9ff",
  },
  cowboy: {
    primary: "#042043ff",
    secondary: "#012695ff",
    text: "#cfd4d9ff",
  },
  raven: {
    primary: "#290275ff",
    secondary: "#131517ff",
    text: "#cfd4d9ff",
  },
  rootbeer: {
    primary: "#7b714cff",
    secondary: "#1f1603ff",
    text: "#cfd4d9ff",
  },
  creamsicle: {
    primary: "#da8507ff",
    secondary: "#eeefefff",
    text: "#4d2f03ff",
  },
  carolina: {
    primary: "#6dc4efff",
    secondary: "#eeefefff",
    text: "#0a3044ff",
  },
  jazz: {
    primary: "#4d137dff",
    secondary: "#7ab4d1ff",
    text: "#e1eaefff",
  },
};

type ThemeName = keyof typeof themes;

type ThemeContextType = {
  contextTheme: ThemeName;
  setContextTheme: (theme: ThemeName) => void;
  colors: typeof themes.light;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [contextTheme, setContextTheme] = useState<ThemeName>("light");

  return (
    <ThemeContext.Provider
      value={{ contextTheme, setContextTheme, colors: themes[contextTheme] }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};

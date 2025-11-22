import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme as useDeviceColorScheme } from "react-native";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: typeof lightColors;
}

const lightColors = {
  primary: "#58CC02",
  primaryDark: "#46A302",
  secondary: "#1CB0F6",
  warning: "#FF9600",
  error: "#FF4B4B",
  success: "#58CC02",

  background: "#FFFFFF",
  surface: "#F7F7F7",
  card: "#FFFFFF",
  border: "#E5E5E5",

  text: "#3C3C3C",
  textSecondary: "#777777",

  locked: "#E5E5E5",
  unlocked: "#58CC02",
  completed: "#FFD900",

  xpGold: "#FFD900",
};

const darkColors = {
  primary: "#58CC02",
  primaryDark: "#46A302",
  secondary: "#1CB0F6",
  warning: "#FF9600",
  error: "#FF4B4B",
  success: "#58CC02",

  background: "#0F0F0F",
  surface: "#1A1A1A",
  card: "#252525",
  border: "#333333",

  text: "#FFFFFF",
  textSecondary: "#AAAAAA",

  locked: "#333333",
  unlocked: "#58CC02",
  completed: "#FFD900",

  xpGold: "#FFD900",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const deviceColorScheme = useDeviceColorScheme();
  const [theme, setTheme] = useState<Theme>(deviceColorScheme || "light");

  useEffect(() => {
    if (deviceColorScheme) {
      setTheme(deviceColorScheme);
    }
  }, [deviceColorScheme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const colors = theme === "light" ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

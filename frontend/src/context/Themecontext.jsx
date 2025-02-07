import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const CustomThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  useEffect(() => {
    const root = document.documentElement; // Reference to <html>
    if (isDarkTheme) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkTheme]);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

import { useEffect, useState, createContext } from "react";

export const ThemeContext = createContext(null);

const Theme = {
  DARK: "dark",
  LIGHT: "light",
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setIsDark(theme === Theme.DARK);
  }, []);

  const toggleTheme = () => {
    setIsDark((dark) => !dark);
    localStorage.setItem("theme", isDark ? Theme.LIGHT : Theme.DARK);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

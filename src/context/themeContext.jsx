import { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_THEME } from '../themes';
import { applyTheme } from '../themes/utils';
import useThemeStorage from '../hooks/useThemeStorage';
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, switchTheme] = useThemeStorage(DEFAULT_THEME);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);
  return <ThemeContext.Provider value={{ theme, switchTheme }}>{children}</ThemeContext.Provider>;
}
export function useTheme() {
  return useContext(ThemeContext);
}

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme, type AppTheme } from '@/constants/Theme';

type ThemeMode = 'system' | 'light' | 'dark';
type ThemeValue = { colors: AppTheme; mode: ThemeMode; resolved: 'light' | 'dark'; toggle(): void };
const ThemeContext = createContext<ThemeValue | null>(null);
const THEME_KEY = 'budget-buddy-theme';

export function ThemeProvider({ children }: React.PropsWithChildren) {
  const system = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>('dark');
  useEffect(() => { void AsyncStorage.getItem(THEME_KEY).then((saved) => { if (saved === 'light' || saved === 'dark' || saved === 'system') setMode(saved); }); }, []);
  const resolved = mode === 'system' ? (system === 'dark' ? 'dark' : 'light') : mode;
  const value = useMemo<ThemeValue>(() => ({
    colors: resolved === 'dark' ? darkTheme : lightTheme, mode, resolved,
    toggle: () => setMode((current) => {
      const next = (current === 'system' ? resolved : current) === 'dark' ? 'light' : 'dark';
      void AsyncStorage.setItem(THEME_KEY, next);
      return next;
    }),
  }), [mode, resolved]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export function useAppTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useAppTheme must be used inside ThemeProvider');
  return value;
}

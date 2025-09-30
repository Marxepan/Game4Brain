import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import type { SettingsContextType, Theme, SymbolSet } from '../types';

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [symbolSet, setSymbolSet] = useState<SymbolSet>('animals');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const storedSound = localStorage.getItem('soundEnabled');
    const storedSymbolSet = localStorage.getItem('symbolSet') as SymbolSet | null;

    const initialTheme = storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    if (storedSound !== null) {
      setSoundEnabled(JSON.parse(storedSound));
    }
    if (storedSymbolSet) {
      setSymbolSet(storedSymbolSet);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newTheme;
    });
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const newState = !prev;
      localStorage.setItem('soundEnabled', JSON.stringify(newState));
      return newState;
    });
  }, []);
  
  const handleSetSymbolSet = useCallback((set: SymbolSet) => {
    setSymbolSet(set);
    localStorage.setItem('symbolSet', set);
  }, []);


  return (
    <SettingsContext.Provider value={{ theme, toggleTheme, soundEnabled, toggleSound, symbolSet, setSymbolSet: handleSetSymbolSet }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

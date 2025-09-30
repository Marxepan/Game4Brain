export type Level = 'easy' | 'medium' | 'hard' | 'master';
export type SymbolSet = 'animals' | 'fruits' | 'objects';
export type Theme = 'light' | 'dark';
export type MasterMode = 'numbers' | 'patterns';

export interface CardData {
  id: number;
  symbol: string;
}

export type GameState = 'selecting' | 'playing' | 'won' | 'lost';

export interface LevelConfig {
  name: string;
  pairs: number;
  gridCols: number;
  gridClass: string;
  timeLimit: number; // in seconds
}

export interface SettingsContextType {
  theme: Theme;
  // Fix: Use `=>` for function types in interfaces.
  toggleTheme: () => void;
  symbolSet: SymbolSet;
  // Fix: Use `=>` for function types in interfaces.
  setSymbolSet: (set: SymbolSet) => void;
  soundEnabled: boolean;
  // Fix: Use `=>` for function types in interfaces.
  toggleSound: () => void;
}

export interface HighScore {
  name: string;
  moves: number;
  date: string;
}

export type HighScores = Record<Level, HighScore[]>;
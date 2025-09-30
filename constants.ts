import type { Level, LevelConfig, SymbolSet } from './types';

export const ANIMAL_SYMBOLS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🦄', '🐲', '🐞'];
export const FRUIT_SYMBOLS = ['🍎', '🍌', '🍇', '🍓', '🍈', '🍉', '🍑', '🍒', '🍍', '🥝', '🥭', '🥥', '🍅', '🍆', '🥑', '🥦', '🌶️', '🌽'];
export const OBJECT_SYMBOLS = ['🚗', '✈️', '🚀', '⚽️', '🏀', '🎸', '💻', '📱', '⌚️', '📷', '💡', '🔑', '❤️', '⭐️', '🎉', '🎁', '🎈', ' B'];
export const MASTER_SYMBOLS = ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27'];
export const PATTERN_SYMBOLS = ['▲', '△', '▼', '▽', '◀', '◁', '▶', '▷', '◆', '◇', '■', '□', '●', '○', '★', '☆', '✙', '✚'];


export const SYMBOLS: Record<SymbolSet, string[]> = {
  animals: ANIMAL_SYMBOLS,
  fruits: FRUIT_SYMBOLS,
  objects: OBJECT_SYMBOLS,
};


export const LEVELS: Record<Level, LevelConfig> = {
  easy: { name: 'Łatwy', pairs: 6, gridCols: 4, gridClass: 'grid-cols-4', timeLimit: 120 },
  medium: { name: 'Średni', pairs: 10, gridCols: 5, gridClass: 'grid-cols-5', timeLimit: 90 },
  hard: { name: 'Trudny', pairs: 15, gridCols: 6, gridClass: 'grid-cols-6', timeLimit: 75 },
  master: { name: 'Mistrzowski', pairs: 18, gridCols: 6, gridClass: 'grid-cols-6', timeLimit: 90 },
};
import type { Level, HighScore, HighScores } from '../types';
import { LEVELS } from '../constants';

const HIGH_SCORES_KEY = 'memoryGameHighScores';
const MAX_SCORES_PER_LEVEL = 10;

// Initialize with empty arrays for each level if nothing is in localStorage
const getInitialHighScores = (): HighScores => {
  const initialScores: Partial<HighScores> = {};
  for (const level in LEVELS) {
    initialScores[level as Level] = [];
  }
  return initialScores as HighScores;
};

export const getHighScores = (): HighScores => {
  try {
    const scoresJson = localStorage.getItem(HIGH_SCORES_KEY);
    if (scoresJson) {
      // Basic validation
      const parsed = JSON.parse(scoresJson);
      if (typeof parsed === 'object' && parsed !== null) {
          // ensure all levels exist
          const initial = getInitialHighScores();
          return {...initial, ...parsed};
      }
    }
    return getInitialHighScores();
  } catch (error) {
    console.error('Failed to parse high scores from localStorage', error);
    return getInitialHighScores();
  }
};

export const saveHighScores = (scores: HighScores) => {
  try {
    localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(scores));
  } catch (error) {
    console.error('Failed to save high scores to localStorage', error);
  }
};

export const addHighScore = (level: Level, newScore: Omit<HighScore, 'date'>) => {
  const scores = getHighScores();
  const levelScores = scores[level] || [];
  
  const scoreWithDate: HighScore = {
      ...newScore,
      date: new Date().toISOString()
  };

  const updatedScores = [...levelScores, scoreWithDate]
    // Sort by moves (ascending)
    .sort((a, b) => a.moves - b.moves)
    // Take the top scores
    .slice(0, MAX_SCORES_PER_LEVEL);

  scores[level] = updatedScores;
  saveHighScores(scores);
};

export const isHighScore = (level: Level, moves: number): boolean => {
    const scores = getHighScores();
    const levelScores = scores[level] || [];

    if (levelScores.length < MAX_SCORES_PER_LEVEL) {
        return true;
    }

    const worstScore = levelScores[levelScores.length - 1];
    return moves < worstScore.moves;
}

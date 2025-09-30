import React, { useState } from 'react';
import { getHighScores } from '../utils/highScores';
import type { Level, HighScores, HighScore } from '../types';
import { LEVELS } from '../constants';
import Button from './Button';

// SVG Icon for closing
const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const TrophyIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L9 5H5a2 2 0 00-2 2v2c0 1.1.9 2 2 2h14a2 2 0 002-2V7a2 2 0 00-2-2h-4l-3-3z"></path>
      <path d="M12 11v10"></path>
      <path d="M18 21H6"></path>
    </svg>
);


interface HighScoresScreenProps {
  onClose: () => void;
}

const HighScoresScreen: React.FC<HighScoresScreenProps> = ({ onClose }) => {
  const [highScores] = useState<HighScores>(getHighScores());
  const [selectedLevel, setSelectedLevel] = useState<Level>('easy');

  const levelScores = highScores[selectedLevel];

  return (
    <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
    >
        <div
            className="relative bg-[rgb(var(--color-card-bg))] rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <TrophyIcon />
                    <h2 className="text-2xl font-bold text-[rgb(var(--color-text))]">
                        Najlepsze wyniki
                    </h2>
                </div>
                <Button variant="icon" className="w-10 h-10" onClick={onClose} aria-label="Zamknij">
                    <CloseIcon />
                </Button>
            </div>

            <div className="flex justify-center gap-2 mb-4 p-1 bg-slate-200 dark:bg-slate-700/50 rounded-lg">
                {(Object.keys(LEVELS) as Level[]).map(level => (
                    <button 
                        key={level} 
                        onClick={() => setSelectedLevel(level)}
                        className={`w-full px-3 py-2 text-sm font-semibold rounded-md transition-colors ${selectedLevel === level ? 'bg-[rgb(var(--color-primary-500))] text-white shadow' : 'text-[rgb(var(--color-text))] hover:bg-slate-300 dark:hover:bg-slate-600'}`}
                    >
                        {LEVELS[level].name}
                    </button>
                ))}
            </div>

            <div className="h-64 overflow-y-auto pr-2">
                {levelScores && levelScores.length > 0 ? (
                    <ol className="space-y-2">
                        {levelScores.map((score, index) => (
                            <li key={index} className={`flex items-center justify-between p-3 rounded-lg ${index < 3 ? 'bg-yellow-400/20' : 'bg-slate-100 dark:bg-slate-800/50'}`}>
                                <div className="flex items-center gap-3">
                                    <span className={`font-bold w-6 text-center ${index < 3 ? 'text-yellow-500' : 'text-[rgb(var(--color-muted-text))]'}`}>{index + 1}.</span>
                                    <span className="font-semibold text-[rgb(var(--color-text))]">{score.name}</span>
                                </div>
                                <span className="font-bold text-[rgb(var(--color-text))]">{score.moves} <span className="text-sm font-normal text-[rgb(var(--color-muted-text))]">ruchów</span></span>
                            </li>
                        ))}
                    </ol>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center text-[rgb(var(--color-muted-text))]">
                        <p className="text-lg font-semibold">Brak wyników</p>
                        <p>Bądź pierwszy!</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default HighScoresScreen;

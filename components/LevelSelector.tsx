import React, { useState } from 'react';
import Button from './Button';
import type { Level, MasterMode } from '../types';
import { LEVELS } from '../constants';
import Settings from './Settings';
import GeminiImage from './GeminiImage';
import HighScoresScreen from './HighScoresScreen';
import MasterLevelModal from './MasterLevelModal';

// --- SVG Components (used as fallbacks) ---

const BrainIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 md:w-24 md:h-24 text-[rgb(var(--color-primary-400))]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v0A2.5 2.5 0 0 1 9.5 7v0A2.5 2.5 0 0 1 7 9.5v0A2.5 2.5 0 0 1 4.5 12v0A2.5 2.5 0 0 1 7 14.5v0A2.5 2.5 0 0 1 9.5 17v0a2.5 2.5 0 0 1 2.5 2.5v0a2.5 2.5 0 0 1 2.5 2.5"></path>
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v0A2.5 2.5 0 0 0 14.5 7v0A2.5 2.5 0 0 0 17 9.5v0A2.5 2.5 0 0 0 19.5 12v0A2.5 2.5 0 0 0 17 14.5v0A2.5 2.5 0 0 0 14.5 17v0a2.5 2.5 0 0 0-2.5 2.5v0a2.5 2.5 0 0 0-2.5 2.5"></path>
        <path d="M9.5 2a2.5 2.5 0 0 0-2.5 2.5"></path>
        <path d="M14.5 2a2.5 2.5 0 0 1 2.5 2.5"></path>
        <path d="M7 9.5A2.5 2.5 0 0 1 4.5 7"></path>
        <path d="M17 9.5A2.5 2.5 0 0 0 19.5 7"></path>
        <path d="M7 14.5A2.5 2.5 0 0 0 4.5 17"></path>
        <path d="M17 14.5A2.5 2.5 0 0 1 19.5 17"></path>
        <path d="M9.5 22a2.5 2.5 0 0 1-2.5-2.5"></path>
        <path d="M14.5 22a2.5 2.5 0 0 0 2.5-2.5"></path>
    </svg>
);

const PuzzlePiece: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V5H6c-1.1 0-2 .9-2 2v4H2.5c-.83 0-1.5.67-1.5 1.5S1.67 13 2.5 13H4v4c0 1.1.9 2 2 2h4v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h4c1.1 0 2-.9 2-2v-4h1.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"></path>
    </svg>
);


// --- Main Component ---

interface LevelSelectorProps {
  onSelectLevel: (level: Level, masterMode?: MasterMode) => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ onSelectLevel }) => {
  const [showHighScores, setShowHighScores] = useState(false);
  const [showMasterModal, setShowMasterModal] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen p-4 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 z-0">
            <GeminiImage
              prompt="A single, flat 2D vector jigsaw puzzle piece. Minimalist style with a subtle shadow. A calming, desaturated teal color. On a transparent background."
              cacheKey="gemini-puzzle-piece-v1"
              alt="Puzzle piece"
              className="w-28 h-28 absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 text-[rgb(var(--color-muted-text))] opacity-20 transform -rotate-45"
            >
              <PuzzlePiece className="w-28 h-28 absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 text-[rgb(var(--color-muted-text))] opacity-20 transform -rotate-45" />
            </GeminiImage>
             <GeminiImage
              prompt="A single, flat 2D vector jigsaw puzzle piece. Minimalist style with a subtle shadow. A vibrant, warm orange color. On a transparent background."
              cacheKey="gemini-puzzle-piece-v2"
              alt="Puzzle piece"
              className="w-28 h-28 absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 text-[rgb(var(--color-muted-text))] opacity-20 transform rotate-12"
            >
              <PuzzlePiece className="w-28 h-28 absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 text-[rgb(var(--color-muted-text))] opacity-20 transform rotate-12" />
            </GeminiImage>
        </div>
        
        <div className="absolute top-4 right-4 z-20">
            <Settings />
        </div>

        <div className="relative z-10 w-full max-w-md p-8 text-center bg-[rgb(var(--color-card-bg))] shadow-2xl rounded-2xl md:p-12">
            <div className="flex justify-center mb-6">
                 <GeminiImage
                    prompt="A minimalist, stylized icon of a human brain with interconnected, glowing nodes. Flat 2D vector style. Vibrant blue and purple gradient. On a transparent background."
                    cacheKey="gemini-brain-icon-v1"
                    alt="Stylized brain icon"
                    className="w-20 h-20 md:w-24 md:h-24"
                  >
                    <BrainIcon />
                  </GeminiImage>
            </div>

            <h1 className="text-4xl font-extrabold md:text-5xl mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[rgb(var(--color-primary-400))] to-[rgb(var(--color-primary-600))]">
                Gra Memory
            </h1>
            <p className="mb-10 text-lg text-[rgb(var(--color-muted-text))]">
                Wytęż umysł i wybierz poziom trudności.
            </p>
            
            <div className="flex flex-col gap-4">
                {(Object.keys(LEVELS) as Level[]).map((level) => (
                    <Button 
                        key={level} 
                        onClick={() => level === 'master' ? setShowMasterModal(true) : onSelectLevel(level)} 
                        className="w-full py-4 text-xl">
                        {LEVELS[level].name}
                    </Button>
                ))}
                <Button variant="secondary" onClick={() => setShowHighScores(true)} className="w-full py-4 text-xl">
                    Najlepsze Wyniki
                </Button>
            </div>
        </div>
        {showHighScores && <HighScoresScreen onClose={() => setShowHighScores(false)} />}
        {showMasterModal && (
            <MasterLevelModal 
                onClose={() => setShowMasterModal(false)}
                onSelect={(mode) => {
                    onSelectLevel('master', mode);
                    setShowMasterModal(false);
                }}
            />
        )}
    </div>
  );
};

export default LevelSelector;
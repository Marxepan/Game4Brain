import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { Level, CardData, GameState, MasterMode } from './types';
import { SYMBOLS, LEVELS, MASTER_SYMBOLS, PATTERN_SYMBOLS } from './constants';
import { useSettings } from './context/SettingsContext';
import { soundManager } from './utils/sound';
import { isHighScore, addHighScore } from './utils/highScores';
import LevelSelector from './components/LevelSelector';
import GameBoard from './components/GameBoard';
import GameStatus from './components/GameStatus';
import Button from './components/Button';
import Settings from './components/Settings';
import Confetti from './components/Confetti';
import HighScoreEntryModal from './components/HighScoreEntryModal';
import GameOverModal from './components/GameOverModal';
import HighScoresScreen from './components/HighScoresScreen';


// Add custom CSS for 3D transforms and animations
const style = document.createElement('style');
style.innerHTML = `
  .perspective { perspective: 1000px; }
  .transform-style-preserve-3d { transform-style: preserve-3d; }
  .rotate-y-180 { transform: rotateY(180deg); }
  .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
  @keyframes shuffle-in {
    from { opacity: 0; transform: scale(0.5) rotateY(-180deg); }
    to { opacity: 1; transform: scale(1) rotateY(0deg); }
  }
  .shuffling-card {
    opacity: 0;
    transform: scale(0.5);
    animation: shuffle-in 0.5s ease-out forwards;
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
  @keyframes scale-in {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  .animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
`;
document.head.appendChild(style);


const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('selecting');
  const [level, setLevel] = useState<Level | null>(null);
  const [masterMode, setMasterMode] = useState<MasterMode>('numbers');
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedSymbols, setMatchedSymbols] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [isBoardLocked, setIsBoardLocked] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [showHighScoresScreen, setShowHighScoresScreen] = useState(false);

  const { soundEnabled, symbolSet } = useSettings();
  // Fix: Use `ReturnType<typeof setTimeout>` for browser compatibility instead of `NodeJS.Timeout`.
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const setupGame = useCallback((selectedLevel: Level, mode: MasterMode = 'numbers') => {
    clearTimer();
    const levelConfig = LEVELS[selectedLevel];
    
    let iconsForLevel;
    if (selectedLevel === 'master') {
      iconsForLevel = (mode === 'patterns' ? PATTERN_SYMBOLS : MASTER_SYMBOLS).slice(0, levelConfig.pairs);
    } else {
      iconsForLevel = SYMBOLS[symbolSet].slice(0, levelConfig.pairs);
    }
    
    const cardSymbols = [...iconsForLevel, ...iconsForLevel];

    // Fisher-Yates shuffle
    for (let i = cardSymbols.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardSymbols[i], cardSymbols[j]] = [cardSymbols[j], cardSymbols[i]];
    }

    setCards(cardSymbols.map((symbol, index) => ({ id: index, symbol })));
    setLevel(selectedLevel);
    setGameState('playing');
    setFlippedIndices([]);
    setMatchedSymbols([]);
    setMoves(0);
    setTimeLeft(levelConfig.timeLimit);
    setIsBoardLocked(true); // Lock board during shuffle
    setIsShuffling(true);
    setIsNewHighScore(false);
    setShowHighScoresScreen(false);
    
    // End shuffling animation and unlock board
    setTimeout(() => {
        setIsShuffling(false);
        setIsBoardLocked(false);
    }, cardSymbols.length * 30 + 500);

  }, [symbolSet]);

  const handleLevelSelect = (selectedLevel: Level, mode: MasterMode = 'numbers') => {
    if (selectedLevel === 'master') {
      setMasterMode(mode);
    }
    setupGame(selectedLevel, mode);
  };

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 1 && flippedIndices[0] === index) return;
    if (soundEnabled) soundManager.playFlip();
    setFlippedIndices(prev => [...prev, index]);
  };

  const resetGame = () => {
    clearTimer();
    setGameState('selecting');
    setLevel(null);
    setIsNewHighScore(false);
    setShowHighScoresScreen(false);
  };

  const handleHighScoreSubmit = (name: string) => {
      if (level) {
          addHighScore(level, { name, moves });
      }
      setIsNewHighScore(false);
  };

  const checkMatch = useCallback(() => {
    if (flippedIndices.length !== 2) return;

    setIsBoardLocked(true);
    const [firstIndex, secondIndex] = flippedIndices;
    const firstCard = cards[firstIndex];
    const secondCard = cards[secondIndex];

    setMoves(prev => prev + 1);

    if (firstCard.symbol === secondCard.symbol) {
      if (soundEnabled) setTimeout(() => soundManager.playMatch(), 200);
      setMatchedSymbols(prev => [...prev, firstCard.symbol]);
      setFlippedIndices([]);
      setIsBoardLocked(false);
    } else {
       if (soundEnabled) setTimeout(() => soundManager.playMismatch(), 400);
      setTimeout(() => {
        setFlippedIndices([]);
        setIsBoardLocked(false);
      }, 1000);
    }
  }, [flippedIndices, cards, soundEnabled]);

  // Game Timer Effect
  useEffect(() => {
    if (gameState === 'playing' && !isShuffling) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    }
    return clearTimer;
  }, [gameState, isShuffling]);

  // Check for win/loss
  useEffect(() => {
    if (gameState !== 'playing') return;
    if (level && matchedSymbols.length === LEVELS[level].pairs) {
      if (soundEnabled) soundManager.playWin();
      clearTimer();
      if (isHighScore(level, moves)) {
        setIsNewHighScore(true);
      }
      setTimeout(() => setGameState('won'), 500);
    } else if (timeLeft <= 0) {
      if (soundEnabled) soundManager.playLose();
      clearTimer();
      setGameState('lost');
    }
  }, [matchedSymbols, level, timeLeft, gameState, soundEnabled, moves]);
  
  // Check for matches
  useEffect(() => {
    if (flippedIndices.length === 2) {
      checkMatch();
    }
  }, [flippedIndices, checkMatch]);

  const renderContent = () => {
    switch (gameState) {
      case 'selecting':
        return <LevelSelector onSelectLevel={handleLevelSelect} />;
      case 'playing':
      case 'won':
      case 'lost':
        if (!level) return null;
        return (
          <div className="flex flex-col items-center w-full max-w-7xl mx-auto">
             {gameState === 'won' && <Confetti />}

             {gameState === 'won' && isNewHighScore && (
                <HighScoreEntryModal moves={moves} onSubmit={handleHighScoreSubmit} />
             )}

             {gameState === 'won' && !isNewHighScore && (
                <GameOverModal 
                  status="won"
                  moves={moves}
                  onRetry={() => setupGame(level, masterMode)}
                  onMenu={resetGame}
                  onShowHighScores={() => setShowHighScoresScreen(true)}
                />
             )}
             
             {gameState === 'lost' && (
                <GameOverModal 
                  status="lost"
                  moves={moves}
                  onRetry={() => setupGame(level, masterMode)}
                  onMenu={resetGame}
                  onShowHighScores={() => setShowHighScoresScreen(true)}
                />
             )}
            
             {showHighScoresScreen && <HighScoresScreen onClose={() => setShowHighScoresScreen(false)} />}


            <div className="w-full flex justify-between items-center mb-4 px-4">
                <Button onClick={resetGame} variant="secondary">Menu</Button>
                <div className="text-center">
                    <h2 className="text-2xl font-bold">{LEVELS[level].name}</h2>
                </div>
                <Settings/>
            </div>
            
            <div className={`transition-all duration-500 ${gameState === 'lost' ? 'filter grayscale brightness-75' : ''}`}>
              <GameStatus moves={moves} matches={matchedSymbols.length} totalPairs={LEVELS[level].pairs} timeLeft={timeLeft} />
              <GameBoard 
                cards={cards} 
                level={level}
                onCardClick={handleCardClick}
                flippedIndices={flippedIndices}
                matchedSymbols={matchedSymbols}
                isDisabled={isBoardLocked || gameState === 'won' || gameState === 'lost'}
                isShuffling={isShuffling}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      {renderContent()}
    </main>
  );
};

export default App;
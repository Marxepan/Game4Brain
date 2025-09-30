import React from 'react';
import Button from './Button';

interface GameOverModalProps {
  status: 'won' | 'lost';
  moves: number;
  onRetry: () => void;
  onMenu: () => void;
  onShowHighScores: () => void;
}

const WinIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
    </svg>
);

const LoseIcon: React.FC = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6L6 18M6 6l12 12"></path>
    </svg>
);

const GameOverModal: React.FC<GameOverModalProps> = ({ status, moves, onRetry, onMenu, onShowHighScores }) => {
  const isWin = status === 'won';
  const title = isWin ? 'Wygrana!' : 'Przegrana!';
  const message = isWin
    ? `Gratulacje! Ukończyłeś grę w ${moves} ruchach.`
    : 'Niestety, czas się skończył. Spróbuj jeszcze raz!';
  const titleColor = isWin ? 'text-green-400' : 'text-red-500';

  return (
    <div className="absolute inset-0 bg-[rgb(var(--color-bg))]/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 p-4 text-center animate-fade-in">
      <div className="bg-[rgb(var(--color-card-bg))] p-8 rounded-2xl shadow-xl w-full max-w-sm transform transition-transform duration-300 animate-scale-in">
        <div className="flex justify-center mb-4">
            {isWin ? <WinIcon /> : <LoseIcon />}
        </div>
        <h2 className={`text-5xl font-bold ${titleColor} mb-4`}>{title}</h2>
        <p className="text-xl mb-8 text-[rgb(var(--color-text))]">{message}</p>
        <div className="flex flex-col gap-4">
          <Button onClick={onRetry} variant="primary">Spróbuj ponownie</Button>
          <Button onClick={onShowHighScores} variant="secondary">Najlepsze Wyniki</Button>
          <Button onClick={onMenu} variant="secondary">Menu Główne</Button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;

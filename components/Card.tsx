import React from 'react';
import type { CardData } from '../types';

interface CardProps {
  card: CardData;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  isDisabled: boolean;
  isShuffling: boolean;
  index: number;
}

const Card: React.FC<CardProps> = ({ card, isFlipped, isMatched, onClick, isDisabled, isShuffling, index }) => {
  const isVisible = isFlipped || isMatched;
  const animationDelay = isShuffling ? `${index * 30}ms` : '0ms';

  return (
    <div 
      className={`perspective w-full h-full ${isShuffling ? 'shuffling-card' : ''}`}
      style={{ animationDelay }}
      onClick={() => !isDisabled && !isVisible && onClick()}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d rounded-lg shadow-lg ${isVisible ? 'rotate-y-180' : ''}`}
        style={{ cursor: isDisabled || isVisible ? 'default' : 'pointer' }}
      >
        {/* Front of the card */}
        <div className="absolute w-full h-full backface-hidden bg-[rgb(var(--color-card-face-bg))] flex items-center justify-center rounded-lg rotate-y-180">
          <span className="text-4xl md:text-5xl">{card.symbol}</span>
        </div>
        
        {/* Back of the card */}
        <div className="absolute w-full h-full backface-hidden bg-[rgb(var(--color-primary-500))] hover:bg-[rgb(var(--color-primary-600))] flex items-center justify-center rounded-lg">
          <span className="text-3xl md:text-4xl font-extrabold text-white">?</span>
        </div>
      </div>
    </div>
  );
};

export default Card;

import React from 'react';
import Card from './Card';
import type { CardData, Level } from '../types';
import { LEVELS } from '../constants';

interface GameBoardProps {
  cards: CardData[];
  onCardClick: (index: number) => void;
  flippedIndices: number[];
  matchedSymbols: string[];
  level: Level;
  isDisabled: boolean;
  isShuffling: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({ cards, onCardClick, flippedIndices, matchedSymbols, level, isDisabled, isShuffling }) => {
  const levelConfig = LEVELS[level];
  const gridClass = levelConfig ? levelConfig.gridClass : 'grid-cols-4';

  return (
    <div className={`grid ${gridClass} gap-3 md:gap-4 p-4 w-full max-w-4xl mx-auto`}>
      {cards.map((card, index) => (
        <div key={card.id} className="aspect-square">
          <Card
            card={card}
            index={index}
            isFlipped={flippedIndices.includes(index)}
            isMatched={matchedSymbols.includes(card.symbol)}
            onClick={() => onCardClick(index)}
            isDisabled={isDisabled}
            isShuffling={isShuffling}
          />
        </div>
      ))}
    </div>
  );
};

export default GameBoard;

import React, { useState } from 'react';
import Button from './Button';

interface HighScoreEntryModalProps {
  moves: number;
  onSubmit: (name: string) => void;
}

const HighScoreEntryModal: React.FC<HighScoreEntryModalProps> = ({ moves, onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="absolute inset-0 bg-[rgb(var(--color-bg))]/80 backdrop-blur-sm flex flex-col items-center justify-center z-20 p-4 text-center">
      <div className="bg-[rgb(var(--color-card-bg))] p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <h2 className="text-3xl font-bold text-yellow-400 mb-2">Nowy Rekord!</h2>
        <p className="text-lg mb-4 text-[rgb(var(--color-muted-text))]">
          Gratulacje! Ukończyłeś grę w <span className="font-bold text-[rgb(var(--color-text))]">{moves}</span> ruchach.
        </p>
        <p className="mb-6 text-[rgb(var(--color-muted-text))]">Wpisz swoje imię, aby zapisać wynik.</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Twoje imię"
            maxLength={15}
            aria-label="Twoje imię"
            className="w-full px-4 py-3 text-lg bg-slate-100 dark:bg-slate-700 border-2 border-transparent focus:border-[rgb(var(--color-primary-500))] focus:outline-none rounded-lg text-[rgb(var(--color-text))]"
            autoFocus
          />
          <Button type="submit" variant="primary" disabled={!name.trim()}>
            Zapisz wynik
          </Button>
        </form>
      </div>
    </div>
  );
};

export default HighScoreEntryModal;

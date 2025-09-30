import React from 'react';

interface GameStatusProps {
  moves: number;
  matches: number;
  totalPairs: number;
  timeLeft: number;
}

const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

const StatCard: React.FC<{ label: string; value: string | number; className?: string }> = ({ label, value, className }) => (
    <div className={`bg-slate-900/10 dark:bg-slate-700/50 p-4 rounded-lg text-center shadow-md ${className}`}>
        <div className="text-sm font-medium text-[rgb(var(--color-primary-400))] uppercase tracking-wider">{label}</div>
        <div className="text-3xl font-bold text-[rgb(var(--color-text))]">{value}</div>
    </div>
);


const GameStatus: React.FC<GameStatusProps> = ({ moves, matches, totalPairs, timeLeft }) => {
  const timeColor = timeLeft <= 10 ? 'text-red-500' : 'text-[rgb(var(--color-text))]';

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl mx-auto mb-6 px-4">
      <StatCard label="Ruchy" value={moves} />
      <StatCard label="Trafione" value={matches} />
      <StatCard label="Pary" value={totalPairs} />
      <StatCard label="Czas" value={formatTime(timeLeft)} className={timeColor} />
    </div>
  );
};

export default GameStatus;

import React from 'react';
import type { MasterMode } from '../types';
import Button from './Button';

// SVG Icon for closing
const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

interface MasterLevelModalProps {
    onSelect: (mode: MasterMode) => void;
    onClose: () => void;
}

const MasterLevelModal: React.FC<MasterLevelModalProps> = ({ onSelect, onClose }) => {
    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div
                className="relative bg-[rgb(var(--color-card-bg))] rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-lg animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-[rgb(var(--color-text))]">
                        Wybierz tryb Mistrzowski
                    </h2>
                    <Button variant="icon" className="w-10 h-10" onClick={onClose} aria-label="Zamknij">
                        <CloseIcon />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        onClick={() => onSelect('numbers')}
                        className="flex flex-col items-center justify-center gap-4 p-8 rounded-xl bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700/80 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(var(--color-primary-500))] focus:ring-offset-[rgb(var(--color-card-bg))]"
                    >
                        <span className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-500 to-slate-700 dark:from-slate-200 dark:to-slate-400" aria-hidden="true">21</span>
                        <span className="text-xl font-semibold text-[rgb(var(--color-text))]">Cyfry</span>
                    </button>
                    <button
                        onClick={() => onSelect('patterns')}
                        className="flex flex-col items-center justify-center gap-4 p-8 rounded-xl bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700/80 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(var(--color-primary-500))] focus:ring-offset-[rgb(var(--color-card-bg))]"
                    >
                         <div className="grid grid-cols-2 gap-2 text-4xl text-[rgb(var(--color-muted-text))]" aria-hidden="true">
                            <span>▲</span>
                            <span>◆</span>
                            <span>■</span>
                            <span>★</span>
                        </div>
                        <span className="text-xl font-semibold text-[rgb(var(--color-text))]">Wzory geometryczne</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MasterLevelModal;
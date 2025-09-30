import React, { useState } from 'react';
import Button from './Button';
import { useSettings } from '../context/SettingsContext';
import { SYMBOLS } from '../constants';
import type { SymbolSet } from '../types';

// --- SVG Icon Components (New, more consistent style) ---

const SettingsIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.44.17-.48.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.04.24.24.41.48.41h3.84c.24 0 .44-.17-.48.41l.36 2.54c.59-.24 1.13-.57 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.21.08-.47-.12-.61l-2.01-1.58z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
    </svg>
);

const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
    </svg>
);

const VolumeOnIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    </svg>
);

const VolumeOffIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <line x1="23" y1="9" x2="17" y2="15"></line>
        <line x1="17" y1="9" x2="23" y2="15"></line>
    </svg>
);


// --- Reusable Toggle Switch Component ---

interface ToggleSwitchProps {
    label: string;
    enabled: boolean;
    onChange: () => void;
    enabledIcon: React.ReactNode;
    disabledIcon: React.ReactNode;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, enabled, onChange, enabledIcon, disabledIcon }) => (
    <div className="flex items-center justify-between py-2">
        <span className="font-medium text-[rgb(var(--color-text))]">{label}</span>
        <button
            onClick={onChange}
            role="switch"
            aria-checked={enabled}
            aria-label={`Przełącz ${label}`}
            className={`relative inline-flex items-center h-8 w-16 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(var(--color-primary-500))] focus:ring-offset-[rgb(var(--color-card-bg))] ${enabled ? 'bg-[rgb(var(--color-primary-500))]' : 'bg-slate-300 dark:bg-slate-600'}`}
        >
            <span className={`absolute top-1 left-1 inline-flex items-center justify-center w-6 h-6 transform bg-white rounded-full transition-transform duration-300 ease-in-out ${enabled ? 'translate-x-8' : ''}`}>
                {enabled ? enabledIcon : disabledIcon}
            </span>
        </button>
    </div>
);


// --- Card Set Button Component ---

interface CardSetButtonProps {
    symbol: string;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const CardSetButton: React.FC<CardSetButtonProps> = ({ symbol, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        aria-label={`Wybierz zestaw ${label}`}
        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(var(--color-primary-500))] focus:ring-offset-[rgb(var(--color-card-bg))] ${isActive ? 'bg-[rgb(var(--color-primary-500))] text-white shadow-lg' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'}`}
    >
        <span className="text-4xl">{symbol}</span>
        <span className="font-semibold text-sm">{label}</span>
    </button>
);


// --- Main Settings Component ---

const Settings: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { 
        theme, toggleTheme, 
        soundEnabled, toggleSound, 
        symbolSet, setSymbolSet 
    } = useSettings();

    const cardSets: { id: SymbolSet; symbol: string; label: string }[] = [
        { id: 'animals', symbol: '🐶', label: 'Zwierzęta' },
        { id: 'fruits', symbol: '🍎', label: 'Owoce' },
        { id: 'objects', symbol: '🚗', label: 'Obiekty' }
    ];

    return (
        <>
            <Button
                variant="icon"
                onClick={() => setIsOpen(true)}
                aria-label="Otwórz ustawienia"
            >
                <SettingsIcon />
            </Button>

            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="relative bg-[rgb(var(--color-card-bg))] rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-sm"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-[rgb(var(--color-text))]">
                                Ustawienia
                            </h2>
                            <Button variant="icon" className="w-10 h-10" onClick={() => setIsOpen(false)} aria-label="Zamknij ustawienia">
                                <CloseIcon />
                            </Button>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="space-y-1 p-4 bg-slate-100 dark:bg-slate-800/50 rounded-xl">
                               <ToggleSwitch
                                    label="Tryb Ciemny"
                                    enabled={theme === 'dark'}
                                    onChange={toggleTheme}
                                    enabledIcon={<MoonIcon className="w-4 h-4 text-slate-800" />}
                                    disabledIcon={<SunIcon className="w-4 h-4 text-slate-800" />}
                                />
                                <div className="border-t border-slate-200 dark:border-slate-700/50"></div>
                                <ToggleSwitch
                                    label="Dźwięk"
                                    enabled={soundEnabled}
                                    onChange={toggleSound}
                                    enabledIcon={<VolumeOnIcon className="w-4 h-4 text-slate-800" />}
                                    disabledIcon={<VolumeOffIcon className="w-4 h-4 text-slate-800" />}
                                />
                            </div>
                            
                            <div>
                                <h3 className="font-semibold text-center mb-3 text-[rgb(var(--color-text))]">Zestaw Kart</h3>
                                <div className="grid grid-cols-3 gap-3">
                                    {cardSets.map(set => (
                                        <CardSetButton 
                                            key={set.id}
                                            onClick={() => setSymbolSet(set.id)}
                                            symbol={set.symbol}
                                            label={set.label}
                                            isActive={symbolSet === set.id}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Settings;

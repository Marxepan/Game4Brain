// A simple sound manager using Web Audio API to avoid assets
const createAudioContext = (): AudioContext | null => {
  if (typeof window !== 'undefined' && (window.AudioContext || (window as any).webkitAudioContext)) {
    return new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return null;
};

const audioCtx = createAudioContext();

const playNote = (frequency: number, duration: number, delay = 0) => {
  if (!audioCtx) return;
  
  // Resume context if it's suspended (e.g., due to browser autoplay policies)
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + delay + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + delay + duration);

  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  oscillator.start(audioCtx.currentTime + delay);
  oscillator.stop(audioCtx.currentTime + delay + duration);
};

export const soundManager = {
  playFlip: () => playNote(600, 0.1),
  playMatch: () => {
    playNote(800, 0.1);
    playNote(1200, 0.1, 0.1);
  },
  playMismatch: () => {
    playNote(300, 0.15);
  },
  playWin: () => {
    playNote(523.25, 0.15, 0); // C5
    playNote(659.25, 0.15, 0.15); // E5
    playNote(783.99, 0.15, 0.3); // G5
    playNote(1046.50, 0.2, 0.45); // C6
  },
  playLose: () => {
    playNote(440, 0.2);
    playNote(220, 0.3, 0.2);
  }
};

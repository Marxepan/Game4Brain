import React, { useEffect, useRef, useState } from 'react';

const Confetti: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Fix: Provide an initial value to useRef.
  const animationFrameId = useRef<number | undefined>(undefined);
  // Fix: Provide an initial value to useRef.
  const timeoutId = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiCount = 200;
    const confetti: any[] = [];

    const colors = [
      '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
      '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
      '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'
    ];

    for (let i = 0; i < confettiCount; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 4, // radius
        d: Math.random() * confettiCount, // density
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleIncremental: (Math.random() * 0.07) + .05,
        tiltAngle: 0
      });
    }

    const draw = () => {
      if(!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confetti.forEach((p) => {
        ctx.beginPath();
        ctx.lineWidth = p.r / 1.5;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + (p.r / 4), p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + (p.r / 4));
        ctx.stroke();
      });
      
      update();
      animationFrameId.current = requestAnimationFrame(draw);
    };

    const update = () => {
       if(!canvas) return;
       confetti.forEach((p, i) => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(p.d + i) + 1 + p.r / 2) / 1.5;
        p.x += Math.sin(p.tiltAngle);
        p.tilt = (Math.sin(p.d + i * 0.5)) * 15;
        
        // Wrap confetti around screen
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.y > canvas.height) {
            // Reset particle that fell off screen
            p.x = Math.random() * canvas.width;
            p.y = -20;
        }
      });
    };
    
    draw();

    // Stop animation after 8 seconds
    timeoutId.current = setTimeout(() => {
        if(animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
        setIsDone(true);
    }, 8000);


    // Cleanup
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  if (isDone) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 100
      }}
    />
  );
};

export default Confetti;

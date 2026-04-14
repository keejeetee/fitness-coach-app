'use client';

import { useEffect } from 'react';

interface LevelUpCelebrationProps {
  level: number;
  name: string;
  onDismiss: () => void;
}

const LEVEL_ICONS: Record<number, string> = {
  1: '🌱',
  2: '💪',
  3: '🔥',
  4: '⚡',
  5: '🏆',
};

export default function LevelUpCelebration({
  level,
  name,
  onDismiss,
}: LevelUpCelebrationProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 2500);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  // Generate particle positions
  const particles = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * 360;
    const distance = 60 + Math.random() * 40;
    const tx = Math.cos((angle * Math.PI) / 180) * distance;
    const ty = Math.sin((angle * Math.PI) / 180) * distance;
    return { tx, ty, delay: Math.random() * 0.3 };
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in cursor-pointer"
      onClick={onDismiss}
    >
      <div className="relative">
        {/* Particles */}
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-accent"
            style={{
              '--tx': `${p.tx}px`,
              '--ty': `${p.ty}px`,
              animation: `particle 0.8s ease-out ${p.delay}s forwards`,
            } as React.CSSProperties}
          />
        ))}

        {/* Badge */}
        <div className="animate-level-up text-center">
          <div className="text-5xl mb-3">{LEVEL_ICONS[level] || '🌱'}</div>
          <h2 className="text-2xl font-bold text-accent mb-1">Level Up!</h2>
          <p className="text-text-secondary text-sm">
            You reached <span className="text-text-primary font-semibold">{name}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

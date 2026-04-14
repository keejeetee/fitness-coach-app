'use client';

interface LevelBadgeProps {
  level: number;
  name: string;
}

const LEVEL_ICONS: Record<number, string> = {
  1: '🌱',
  2: '💪',
  3: '🔥',
  4: '⚡',
  5: '🏆',
};

export default function LevelBadge({ level, name }: LevelBadgeProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-xl bg-accent-muted flex items-center justify-center text-2xl">
        {LEVEL_ICONS[level] || '🌱'}
      </div>
      <div>
        <div className="text-[11px] font-mono text-text-secondary uppercase tracking-wider">
          Level {level}
        </div>
        <div className="text-lg font-bold text-text-primary">{name}</div>
      </div>
    </div>
  );
}

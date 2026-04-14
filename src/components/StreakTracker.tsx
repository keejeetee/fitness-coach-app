'use client';

interface StreakTrackerProps {
  streakDays: number;
}

export default function StreakTracker({ streakDays }: StreakTrackerProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs font-mono text-text-secondary uppercase tracking-wider">
        Streak
      </span>
      <div className="flex items-center gap-1.5">
        {streakDays >= 2 && <span className="text-base">🔥</span>}
        <span className="text-sm font-mono font-bold text-text-primary">
          {streakDays} {streakDays === 1 ? 'day' : 'days'}
        </span>
      </div>
    </div>
  );
}

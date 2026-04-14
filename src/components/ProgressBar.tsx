'use client';

interface ProgressBarProps {
  messageCount: number;
  nextLevelThreshold: number | null;
  progressPercent: number;
}

export default function ProgressBar({
  messageCount,
  nextLevelThreshold,
  progressPercent,
}: ProgressBarProps) {
  if (nextLevelThreshold === null) {
    return (
      <div className="text-center">
        <p className="text-xs font-mono text-accent">MAX LEVEL REACHED</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-mono text-text-secondary">Progress</span>
        <span className="text-xs font-mono text-text-secondary">
          {messageCount} / {nextLevelThreshold}
        </span>
      </div>
      <div className="h-2 bg-bg-elevated rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}

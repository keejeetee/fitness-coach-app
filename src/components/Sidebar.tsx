'use client';

import LevelBadge from './LevelBadge';
import ProgressBar from './ProgressBar';
import StreakTracker from './StreakTracker';

interface SidebarProps {
  level: number;
  levelName: string;
  messageCount: number;
  nextLevelThreshold: number | null;
  progressPercent: number;
  streakDays: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  level,
  levelName,
  messageCount,
  nextLevelThreshold,
  progressPercent,
  streakDays,
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 right-0 h-full w-72 bg-bg-surface border-l border-border z-50
          transform transition-transform duration-300 ease-out
          lg:relative lg:translate-x-0 lg:z-0
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full p-5">
          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="self-end mb-4 text-text-secondary hover:text-text-primary lg:hidden cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xs font-mono text-text-secondary uppercase tracking-wider mb-4">
              Your Stats
            </h2>
            <LevelBadge level={level} name={levelName} />
          </div>

          {/* Progress */}
          <div className="mb-6 p-4 bg-bg-primary rounded-xl border border-border">
            <ProgressBar
              messageCount={messageCount}
              nextLevelThreshold={nextLevelThreshold}
              progressPercent={progressPercent}
            />
          </div>

          {/* Stats */}
          <div className="space-y-4 p-4 bg-bg-primary rounded-xl border border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-text-secondary uppercase tracking-wider">
                Messages
              </span>
              <span className="text-sm font-mono font-bold text-text-primary">
                {messageCount}
              </span>
            </div>
            <div className="border-t border-border" />
            <StreakTracker streakDays={streakDays} />
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Footer */}
          <p className="text-[10px] font-mono text-text-tertiary text-center">
            Keep chatting to level up
          </p>
        </div>
      </aside>
    </>
  );
}

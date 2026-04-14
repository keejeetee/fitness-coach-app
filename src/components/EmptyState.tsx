'use client';

import { STARTER_PROMPTS } from '@/lib/constants';

interface EmptyStateProps {
  onSelectPrompt: (prompt: string) => void;
}

export default function EmptyState({ onSelectPrompt }: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 animate-fade-in">
      {/* Dumbbell Icon */}
      <div className="mb-6">
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_12px_rgba(57,255,20,0.3)]"
        >
          <rect x="8" y="22" width="8" height="20" rx="2" fill="var(--accent)" opacity="0.8" />
          <rect x="2" y="26" width="6" height="12" rx="2" fill="var(--accent)" />
          <rect x="48" y="22" width="8" height="20" rx="2" fill="var(--accent)" opacity="0.8" />
          <rect x="56" y="26" width="6" height="12" rx="2" fill="var(--accent)" />
          <rect x="16" y="29" width="32" height="6" rx="1" fill="var(--accent)" opacity="0.6" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-text-primary mb-1">
        Fitness Coach
      </h1>
      <p className="text-text-secondary text-sm mb-8">
        Powered by Coach Genesis
      </p>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        {STARTER_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onSelectPrompt(prompt)}
            className="px-4 py-3 rounded-xl border border-border text-text-primary text-sm text-left
                       hover:border-border-accent hover:bg-accent-muted/30
                       transition-all duration-200 cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}

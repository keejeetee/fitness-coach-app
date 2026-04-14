'use client';

import { useState, useCallback } from 'react';
import { useSession } from '@/hooks/useSession';
import { useChat } from '@/hooks/useChat';
import { useGamification } from '@/hooks/useGamification';
import ChatPanel from '@/components/ChatPanel';
import Sidebar from '@/components/Sidebar';
import LevelUpCelebration from '@/components/LevelUpCelebration';

export default function Home() {
  const sessionId = useSession();
  const { messages, isLoading, sendMessage } = useChat(sessionId);
  const gamification = useGamification();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [celebration, setCelebration] = useState<{
    level: number;
    name: string;
  } | null>(null);

  const handleSend = useCallback(
    async (text: string) => {
      const success = await sendMessage(text);
      if (success) {
        const { leveledUp } = gamification.incrementMessages();
        if (leveledUp) {
          // Re-read level after increment
          const newLevel = gamification.currentLevel + 1;
          const names: Record<number, string> = {
            1: 'Beginner',
            2: 'Regular',
            3: 'Dedicated',
            4: 'Athlete',
            5: 'Champion',
          };
          setCelebration({
            level: newLevel,
            name: names[newLevel] || 'Champion',
          });
        }
      }
    },
    [sendMessage, gamification]
  );

  return (
    <div className="flex h-full">
      {/* Header bar (mobile) */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-bg-surface/80 backdrop-blur-sm border-b border-border flex items-center justify-between px-4 z-30 lg:hidden">
        <div className="flex items-center gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 64 64"
            fill="none"
            className="shrink-0"
          >
            <rect x="8" y="22" width="8" height="20" rx="2" fill="var(--accent)" opacity="0.8" />
            <rect x="2" y="26" width="6" height="12" rx="2" fill="var(--accent)" />
            <rect x="48" y="22" width="8" height="20" rx="2" fill="var(--accent)" opacity="0.8" />
            <rect x="56" y="26" width="6" height="12" rx="2" fill="var(--accent)" />
            <rect x="16" y="29" width="32" height="6" rx="1" fill="var(--accent)" opacity="0.6" />
          </svg>
          <span className="text-sm font-bold text-text-primary">Fitness Coach</span>
        </div>

        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-muted text-accent text-xs font-mono cursor-pointer"
        >
          Lvl {gamification.currentLevel}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-1 pt-14 lg:pt-0">
        <ChatPanel
          messages={messages}
          isLoading={isLoading}
          onSend={handleSend}
        />

        <Sidebar
          level={gamification.currentLevel}
          levelName={gamification.levelName}
          messageCount={gamification.messageCount}
          nextLevelThreshold={gamification.nextLevelThreshold}
          progressPercent={gamification.progressPercent}
          streakDays={gamification.streakDays}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Level-up celebration */}
      {celebration && (
        <LevelUpCelebration
          level={celebration.level}
          name={celebration.name}
          onDismiss={() => setCelebration(null)}
        />
      )}
    </div>
  );
}

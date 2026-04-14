'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { GamificationState } from '@/types';
import { LEVELS } from '@/lib/constants';

const STORAGE_KEY = 'fc-gamification';

const DEFAULT_STATE: GamificationState = {
  messageCount: 0,
  currentLevel: 1,
  streakDays: 0,
  lastVisitDate: '',
};

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function getYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

function calculateLevel(messageCount: number): number {
  let level = 1;
  for (const l of LEVELS) {
    if (messageCount >= l.threshold) {
      level = l.level;
    }
  }
  return level;
}

export function useGamification() {
  const [state, setState] = useState<GamificationState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);
  const stateRef = useRef(state);
  stateRef.current = state;

  // Hydrate from localStorage and update streak
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    let parsed: GamificationState = stored
      ? JSON.parse(stored)
      : { ...DEFAULT_STATE };

    // Update streak
    const today = getToday();
    const yesterday = getYesterday();

    if (parsed.lastVisitDate === today) {
      // Same day, no change
    } else if (parsed.lastVisitDate === yesterday) {
      parsed.streakDays += 1;
      parsed.lastVisitDate = today;
    } else if (parsed.lastVisitDate) {
      // Gap — reset streak
      parsed.streakDays = 1;
      parsed.lastVisitDate = today;
    } else {
      // First visit
      parsed.streakDays = 1;
      parsed.lastVisitDate = today;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    setState(parsed);
    setHydrated(true);
  }, []);

  // Persist on changes (after hydration)
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, hydrated]);

  const incrementMessages = useCallback((): { leveledUp: boolean } => {
    const current = stateRef.current;
    const newCount = current.messageCount + 1;
    const newLevel = calculateLevel(newCount);
    const leveledUp = newLevel > current.currentLevel;

    setState({
      ...current,
      messageCount: newCount,
      currentLevel: newLevel,
    });

    return { leveledUp };
  }, []);

  const currentLevelData = LEVELS.find((l) => l.level === state.currentLevel)!;
  const nextLevelData = LEVELS.find((l) => l.level === state.currentLevel + 1);

  const progressPercent = nextLevelData
    ? ((state.messageCount - currentLevelData.threshold) /
        (nextLevelData.threshold - currentLevelData.threshold)) *
      100
    : 100;

  return {
    messageCount: state.messageCount,
    currentLevel: state.currentLevel,
    levelName: currentLevelData.name,
    streakDays: state.streakDays,
    nextLevelThreshold: nextLevelData?.threshold ?? null,
    progressPercent: Math.min(100, Math.max(0, progressPercent)),
    incrementMessages,
    hydrated,
  };
}

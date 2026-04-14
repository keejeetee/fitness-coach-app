export interface Message {
  id: string;
  role: 'user' | 'coach';
  content: string;
  timestamp: number;
}

export interface GamificationState {
  messageCount: number;
  currentLevel: number;
  streakDays: number;
  lastVisitDate: string;
}

export interface Level {
  level: number;
  name: string;
  threshold: number;
}

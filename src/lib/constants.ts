import { Level } from '@/types';

export const LEVELS: Level[] = [
  { level: 1, name: 'Beginner', threshold: 0 },
  { level: 2, name: 'Regular', threshold: 10 },
  { level: 3, name: 'Dedicated', threshold: 25 },
  { level: 4, name: 'Athlete', threshold: 50 },
  { level: 5, name: 'Champion', threshold: 100 },
];

export const STARTER_PROMPTS = [
  'Build me a workout plan',
  'What should I eat today?',
  'How do I improve my squat?',
];

export const MAX_STORED_MESSAGES = 200;

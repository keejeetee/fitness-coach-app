'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Message } from '@/types';
import { sendMessage as apiSendMessage } from '@/lib/api';
import { MAX_STORED_MESSAGES } from '@/lib/constants';

const STORAGE_KEY = 'fc-chat-history';

export function useChat(sessionId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  // Hydrate from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setMessages(JSON.parse(stored));
      } catch {
        // Corrupted data, start fresh
      }
    }
    setHydrated(true);
  }, []);

  // Persist on changes
  useEffect(() => {
    if (hydrated && messages.length > 0) {
      const toStore = messages.slice(-MAX_STORED_MESSAGES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    }
  }, [messages, hydrated]);

  const sendMessage = useCallback(
    async (text: string): Promise<boolean> => {
      if (!sessionId || isLoading) return false;

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: text,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const response = await apiSendMessage(text, sessionId);
        const coachMessage: Message = {
          id: crypto.randomUUID(),
          role: 'coach',
          content: response,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, coachMessage]);
        return true;
      } catch {
        const errorMessage: Message = {
          id: crypto.randomUUID(),
          role: 'coach',
          content:
            "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, errorMessage]);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId, isLoading]
  );

  const clearChat = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { messages, isLoading, sendMessage, clearChat, hydrated };
}

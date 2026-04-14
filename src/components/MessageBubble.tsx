'use client';

import { Message } from '@/types';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex animate-message-in ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-bg-elevated border border-border-accent text-text-primary'
            : 'bg-bg-surface border-l-2 border-accent/40 text-text-primary'
        }`}
      >
        {!isUser && (
          <span className="block text-[11px] font-mono text-accent/70 mb-1 uppercase tracking-wider">
            Coach Alex
          </span>
        )}
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
      </div>
    </div>
  );
}

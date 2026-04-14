'use client';

import { Message } from '@/types';
import EmptyState from './EmptyState';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

interface ChatPanelProps {
  messages: Message[];
  isLoading: boolean;
  onSend: (message: string) => void;
}

export default function ChatPanel({
  messages,
  isLoading,
  onSend,
}: ChatPanelProps) {
  return (
    <div className="flex flex-col flex-1 min-w-0">
      {messages.length === 0 ? (
        <EmptyState onSelectPrompt={onSend} />
      ) : (
        <MessageList messages={messages} isLoading={isLoading} />
      )}
      <ChatInput onSend={onSend} disabled={isLoading} />
    </div>
  );
}

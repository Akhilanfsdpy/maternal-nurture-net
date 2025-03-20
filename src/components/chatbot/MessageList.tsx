
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  isTyping?: boolean;
}

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            'max-w-[80%] p-3 rounded-2xl animate-fade-in',
            message.isUser
              ? 'bg-primary text-white ml-auto rounded-tr-none'
              : 'bg-gray-100 text-gray-800 rounded-tl-none'
          )}
        >
          <p className="text-sm">{message.text}</p>
        </div>
      ))}
      {isTyping && (
        <div className="max-w-[80%] p-3 rounded-2xl bg-gray-100 text-gray-800 rounded-tl-none">
          <div className="flex space-x-1">
            <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse" />
            <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;

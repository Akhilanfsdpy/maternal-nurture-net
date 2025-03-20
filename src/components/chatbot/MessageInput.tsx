
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    onSendMessage(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t flex items-center space-x-2">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 py-2 text-sm"
        autoComplete="off"
      />
      <Button
        type="submit"
        size="icon"
        disabled={!input.trim()}
        className={cn(
          'rounded-full h-9 w-9',
          'bg-gradient-to-r from-health-blue to-health-light-blue hover:shadow-md'
        )}
      >
        <Send className="h-4 w-4 text-white" />
      </Button>
    </form>
  );
};

export default MessageInput;

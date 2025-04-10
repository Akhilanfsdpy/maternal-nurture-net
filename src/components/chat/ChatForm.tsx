
import React from 'react';
import { Send, X, Baby } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import VoiceInteraction from './VoiceInteraction';

interface ChatFormProps {
  input: string;
  setInput: (input: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  showTools: boolean;
  toggleTools: () => void;
}

const ChatForm: React.FC<ChatFormProps> = ({ 
  input, 
  setInput, 
  onSubmit, 
  showTools, 
  toggleTools 
}) => {
  return (
    <form onSubmit={onSubmit} className="p-2 sm:p-4 border-t flex items-center gap-2 bg-white">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 sm:h-9 sm:w-9 rounded-full flex-shrink-0"
        onClick={toggleTools}
      >
        <span className="sr-only">Show tools</span>
        {showTools ? <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" /> : <Baby className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />}
      </Button>
      
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 py-1 sm:py-2 text-sm"
        autoComplete="off"
      />
      
      <div className="flex-shrink-0">
        <VoiceInteraction onTranscription={(text) => setInput(text)} />
      </div>
      
      <Button
        type="submit"
        size="icon"
        disabled={!input.trim()}
        className={cn(
          'rounded-full h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0',
          'bg-gradient-to-r from-health-blue to-health-light-blue hover:shadow-md'
        )}
      >
        <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
      </Button>
    </form>
  );
};

export default ChatForm;


import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm your health assistant. How can I help you today?", isUser: false },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const newUserMessage = { id: messages.length + 1, text: input, isUser: true };
    setMessages([...messages, newUserMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate a response after a short delay
    setTimeout(() => {
      let response = '';
      
      if (input.toLowerCase().includes('pregnancy') || input.toLowerCase().includes('pregnant')) {
        response = "Monitoring your health during pregnancy is crucial. Make sure to track your blood pressure, stay hydrated, and attend all scheduled appointments.";
      } else if (input.toLowerCase().includes('baby') || input.toLowerCase().includes('newborn')) {
        response = "For newborn care, ensure proper feeding, monitor temperature regularly, and maintain a consistent sleep schedule. Is there something specific you'd like to know?";
      } else if (input.toLowerCase().includes('symptom') || input.toLowerCase().includes('pain')) {
        response = "If you're experiencing concerning symptoms, please consult your healthcare provider immediately. Would you like me to help you log these symptoms?";
      } else {
        response = "I'm here to help with maternal and newborn health questions. Could you provide more details about what you'd like to know?";
      }
      
      const newBotMessage = { id: messages.length + 2, text: response, isUser: false };
      setMessages(prevMessages => [...prevMessages, newBotMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Chatbot toggle button */}
      <Button
        onClick={toggleChatbot}
        className={cn(
          'fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg flex items-center justify-center transition-all duration-300',
          'bg-gradient-to-r from-health-blue to-health-light-blue hover:shadow-xl',
          isOpen ? 'translate-y-20 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        )}
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>

      {/* Chatbot window */}
      <div
        className={cn(
          'fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-xl z-50',
          'transition-all duration-500 ease-in-out transform',
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none',
          'flex flex-col border border-gray-200 overflow-hidden'
        )}
        style={{ maxHeight: 'calc(100vh - 100px)' }}
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-health-blue to-health-light-blue text-white">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5" />
            <h3 className="font-medium">Health Assistant</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleChatbot}
            className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
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
        </div>

        {/* Input */}
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
      </div>
    </>
  );
};

export default Chatbot;


import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, Video, Paperclip, Bot, BotMessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  isTyping?: boolean;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm your health assistant. How can I help you today?", isUser: false },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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
      
      // Enhanced AI responses based on different categories of questions
      if (input.toLowerCase().includes('growth') || input.toLowerCase().includes('weight') || input.toLowerCase().includes('height')) {
        response = "Tracking your baby's growth is important. Based on the data, your baby's weight and height are in the 60th percentile, which is healthy. Would you like me to show you the growth chart or provide nutrition recommendations?";
      } 
      else if (input.toLowerCase().includes('pregnancy') || input.toLowerCase().includes('pregnant')) {
        response = "Monitoring your health during pregnancy is crucial. Make sure to track your blood pressure, stay hydrated, and attend all scheduled appointments. Would you like personalized prenatal tips?";
      } 
      else if (input.toLowerCase().includes('baby') || input.toLowerCase().includes('newborn')) {
        response = "For newborn care, ensure proper feeding, monitor temperature regularly, and maintain a consistent sleep schedule. We have new video guides on bathing techniques. Would you like to see them?";
      } 
      else if (input.toLowerCase().includes('milestone') || input.toLowerCase().includes('development')) {
        response = "Your baby should be reaching for objects at 3-4 months, sitting without support at 6 months, and may start crawling around 9 months. Would you like a detailed milestone tracker?";
      }
      else if (input.toLowerCase().includes('feed') || input.toLowerCase().includes('breastfeed')) {
        response = "For optimal feeding, newborns typically need to feed 8-12 times in 24 hours. Make sure to track feeding times and duration. Would you like me to help schedule feeding reminders?";
      }
      else if (input.toLowerCase().includes('doctor') || input.toLowerCase().includes('appointment')) {
        response = "I can help you schedule a virtual consultation with a pediatrician. Would you prefer a video call or secure chat? Our next available appointments are tomorrow at 2 PM and 4 PM.";
      }
      else if (input.toLowerCase().includes('symptom') || input.toLowerCase().includes('pain') || input.toLowerCase().includes('fever')) {
        response = "If your baby has a fever over 100.4°F (38°C), contact your doctor immediately. For mild symptoms, I can help you track them. Would you like me to create a symptom log?";
      } 
      else {
        response = "I'm here to help with maternal and newborn health questions. I can provide personalized advice on growth tracking, development milestones, feeding schedules, and more. What specific information are you looking for?";
      }
      
      const newBotMessage = { id: messages.length + 2, text: response, isUser: false };
      setMessages(prevMessages => [...prevMessages, newBotMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleVideoCall = () => {
    toast({
      title: "Video Call Feature",
      description: "Video consultation feature will be available soon. We'll notify you when it's ready.",
    });
  };

  const handleAttachment = () => {
    toast({
      title: "Upload Documents",
      description: "You can upload medical reports, prescriptions, and images for analysis soon.",
    });
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
        <BotMessageSquare className="h-6 w-6 text-white" />
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
            <Bot className="h-5 w-5" />
            <h3 className="font-medium">AI Health Assistant</h3>
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

        {/* Additional features */}
        <div className="px-4 py-2 border-t border-b flex justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-health-blue"
            onClick={handleVideoCall}
          >
            <Video className="h-4 w-4 mr-1" />
            <span className="text-xs">Video Call</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-health-blue"
            onClick={handleAttachment}
          >
            <Paperclip className="h-4 w-4 mr-1" />
            <span className="text-xs">Upload</span>
          </Button>
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

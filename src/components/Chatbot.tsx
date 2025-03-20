
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, Video, Paperclip, Bot, BotMessageSquare, Mic, MicOff, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { chatbotResponses } from '@/data/healthCheckupData';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  isTyping?: boolean;
}

interface ChatbotProps {
  embedded?: boolean;
}

const Chatbot: React.FC<ChatbotProps> = ({ embedded = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm your health assistant. How can I help you today?", isUser: false },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
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

  // Determine the response category based on user input
  const categorizeInput = (input: string): keyof typeof chatbotResponses => {
    const inputLower = input.toLowerCase();
    
    if (inputLower.includes('growth') || inputLower.includes('weight') || inputLower.includes('height') || 
        inputLower.includes('tall') || inputLower.includes('big') || inputLower.includes('measure')) {
      return 'growth';
    } 
    else if (inputLower.includes('feed') || inputLower.includes('eat') || inputLower.includes('formula') || 
             inputLower.includes('breastfeed') || inputLower.includes('hungry') || inputLower.includes('milk')) {
      return 'feeding';
    } 
    else if (inputLower.includes('sleep') || inputLower.includes('nap') || inputLower.includes('bed') || 
             inputLower.includes('night') || inputLower.includes('awake') || inputLower.includes('tired')) {
      return 'sleep';
    } 
    else if (inputLower.includes('milestone') || inputLower.includes('development') || inputLower.includes('crawl') || 
             inputLower.includes('sit') || inputLower.includes('roll') || inputLower.includes('walk') || 
             inputLower.includes('talk') || inputLower.includes('smile')) {
      return 'milestones';
    }
    else if (inputLower.includes('symptom') || inputLower.includes('sick') || inputLower.includes('fever') || 
             inputLower.includes('rash') || inputLower.includes('diarrhea') || inputLower.includes('cough') || 
             inputLower.includes('cold') || inputLower.includes('vomit') || inputLower.includes('pain')) {
      return 'symptoms';
    }
    else if (inputLower.includes('doctor') || inputLower.includes('appointment') || inputLower.includes('visit') || 
             inputLower.includes('checkup') || inputLower.includes('schedule') || inputLower.includes('hospital')) {
      return 'appointment';
    }
    else if (inputLower.includes('emergency') || inputLower.includes('urgent') || inputLower.includes('help') || 
             inputLower.includes('serious') || inputLower.includes('immediately') || inputLower.includes('critical')) {
      return 'emergency';
    } 
    else {
      return 'default';
    }
  };

  // Get a random response from the appropriate category
  const getResponse = (category: keyof typeof chatbotResponses): string => {
    const responses = chatbotResponses[category];
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const newUserMessage = { id: messages.length + 1, text: input, isUser: true };
    setMessages([...messages, newUserMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate a response after a short delay
    setTimeout(() => {
      const category = categorizeInput(input);
      const response = getResponse(category);
      
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

  const toggleVoiceInput = () => {
    if (isRecording) {
      setIsRecording(false);
      toast({
        title: "Voice Recording Stopped",
        description: "Voice input feature is still in development.",
      });
    } else {
      setIsRecording(true);
      toast({
        title: "Listening...",
        description: "Voice input feature is still in development. Please type your question instead.",
      });
      
      // Simulate stopping after 3 seconds
      setTimeout(() => {
        setIsRecording(false);
      }, 3000);
    }
  };

  const handleScheduleAppointment = () => {
    toast({
      title: "Schedule Appointment",
      description: "Redirecting to appointment scheduling...",
    });
    
    // In a real application, this would navigate to the appointment tab
    // or open a modal for scheduling
  };

  return (
    <>
      {/* Chatbot toggle button - only show if not embedded */}
      {!embedded && (
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
      )}

      {/* Chatbot window */}
      <div
        className={cn(
          'bg-white rounded-2xl shadow-xl z-50',
          'transition-all duration-500 ease-in-out transform',
          'flex flex-col border border-gray-200 overflow-hidden',
          embedded ? 
            'w-full h-full absolute inset-0' : 
            'fixed bottom-6 right-6 w-80 sm:w-96',
          !embedded && (isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'),
        )}
        style={embedded ? {} : { maxHeight: 'calc(100vh - 100px)' }}
      >
        {/* Header */}
        {!embedded && (
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
        )}

        {/* Messages */}
        <div className={cn("flex-1 p-4 overflow-y-auto", embedded ? "h-[280px]" : "")}>
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
        <div className="px-3 py-2 border-t border-b flex justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-health-blue"
            onClick={handleVideoCall}
          >
            <Video className="h-4 w-4 mr-1" />
            <span className="text-xs">Video</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-health-blue"
            onClick={toggleVoiceInput}
          >
            {isRecording ? (
              <MicOff className="h-4 w-4 mr-1 text-red-500" />
            ) : (
              <Mic className="h-4 w-4 mr-1" />
            )}
            <span className="text-xs">Voice</span>
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
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-health-blue"
            onClick={handleScheduleAppointment}
          >
            <Calendar className="h-4 w-4 mr-1" />
            <span className="text-xs">Schedule</span>
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

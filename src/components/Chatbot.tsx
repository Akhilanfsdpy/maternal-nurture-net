
import React, { useState } from 'react';
import { X, BotMessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import MessageList from './chatbot/MessageList';
import MessageInput from './chatbot/MessageInput';
import ActionButtons from './chatbot/ActionButtons';
import { categorizeInput, getResponse } from './chatbot/chatbotUtils';

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
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm your health assistant. How can I help you today?", isUser: false },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (input: string) => {
    const newUserMessage = { id: messages.length + 1, text: input, isUser: true };
    setMessages([...messages, newUserMessage]);
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
              <BotMessageSquare className="h-5 w-5" />
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
          <MessageList 
            messages={messages} 
            isTyping={isTyping} 
          />
        </div>

        {/* Additional features */}
        <ActionButtons 
          isRecording={isRecording}
          toggleVoiceInput={toggleVoiceInput}
          handleVideoCall={handleVideoCall}
          handleAttachment={handleAttachment}
          handleScheduleAppointment={handleScheduleAppointment}
        />

        {/* Input */}
        <MessageInput onSendMessage={handleSubmit} />
      </div>
    </>
  );
};

export default Chatbot;

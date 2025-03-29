
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, Video, FileText, Camera, Baby } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import SuggestedVideos from './SuggestedVideos';
import GrowthTracker from './GrowthTracker';
import VoiceInteraction from './VoiceInteraction';
import EnhancedAISystem from './EnhancedAISystem';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  attachments?: { type: 'video' | 'article' | 'growth' | 'image' | 'ai'; data: any }[];
}

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm your health assistant. How can I help you today?", isUser: false },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [showAISystem, setShowAISystem] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    setShowTools(false);

    // Simulate a response after a short delay
    setTimeout(() => {
      let response: Message = {
        id: messages.length + 2,
        text: "I'm processing your question...",
        isUser: false
      };
      
      if (input.toLowerCase().includes('growth') || input.toLowerCase().includes('weight') || input.toLowerCase().includes('height')) {
        response = {
          id: messages.length + 2,
          text: "Based on the data, your baby is growing well. Here's a visualization of their growth trajectory:",
          isUser: false,
          attachments: [{
            type: 'growth',
            data: {
              months: [1, 2, 3, 4, 5, 6],
              weights: [3.5, 4.2, 5.1, 5.8, 6.5, 7.2],
              heights: [50, 53, 56, 59, 62, 64],
              percentile: 65
            }
          }]
        };
      } else if (input.toLowerCase().includes('video') || input.toLowerCase().includes('watch')) {
        response = {
          id: messages.length + 2,
          text: "Here are some educational videos that might help you:",
          isUser: false,
          attachments: [{
            type: 'video',
            data: {
              suggestions: [
                { id: 1, title: "Baby Sleep Techniques", thumbnail: "https://placehold.co/120x80", duration: "10:25" },
                { id: 2, title: "First Foods for Babies", thumbnail: "https://placehold.co/120x80", duration: "8:15" },
                { id: 3, title: "Infant CPR Basics", thumbnail: "https://placehold.co/120x80", duration: "12:30" }
              ]
            }
          }]
        };
      } else if (input.toLowerCase().includes('pregnancy') || input.toLowerCase().includes('pregnant')) {
        response = {
          id: messages.length + 2,
          text: "Monitoring your health during pregnancy is crucial. Make sure to track your blood pressure, stay hydrated, and attend all scheduled appointments. Would you like me to suggest some pregnancy wellness tips?",
          isUser: false
        };
      } else if (input.toLowerCase().includes('baby') || input.toLowerCase().includes('newborn')) {
        response = {
          id: messages.length + 2,
          text: "For newborn care, ensure proper feeding, monitor temperature regularly, and maintain a consistent sleep schedule. Would you like some articles on newborn care?",
          isUser: false,
          attachments: [{
            type: 'article',
            data: {
              suggestions: [
                { id: 1, title: "Newborn Sleep Patterns", description: "Understanding how and why newborns sleep" },
                { id: 2, title: "Breastfeeding Basics", description: "Tips for successful breastfeeding" }
              ]
            }
          }]
        };
      } else if (input.toLowerCase().includes('symptom') || input.toLowerCase().includes('pain')) {
        response = {
          id: messages.length + 2,
          text: "If you're experiencing concerning symptoms, please consult your healthcare provider immediately. Would you like me to help you log these symptoms or connect with a healthcare professional?",
          isUser: false
        };
      } else if (input.toLowerCase().includes('ai') || input.toLowerCase().includes('how do you work')) {
        response = {
          id: messages.length + 2,
          text: "I'm powered by advanced AI technology that combines large language models with medical knowledge retrieval. Here's more information about how I help you:",
          isUser: false,
          attachments: [{
            type: 'ai',
            data: {}
          }]
        };
        setShowAISystem(true);
      } else {
        response = {
          id: messages.length + 2,
          text: "I'm here to help with maternal and newborn health questions. I can help with growth tracking, suggest educational videos, provide parenting tips, or help you connect with healthcare professionals. What would you like to know more about?",
          isUser: false
        };
      }
      
      setMessages(prevMessages => [...prevMessages, response]);
      setIsTyping(false);
    }, 1500);
  };

  const handleVoiceTranscription = (text: string) => {
    setInput(text);
    // Auto-submit after voice input
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
      handleSubmit(fakeEvent);
    }, 500);
  };

  const toggleTools = () => {
    setShowTools(!showTools);
  };

  return (
    <div className="flex flex-col h-[600px]">
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="space-y-2">
              <div
                className={cn(
                  'max-w-[80%] p-3 rounded-2xl animate-fade-in',
                  message.isUser
                    ? 'bg-primary text-white ml-auto rounded-tr-none'
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                )}
              >
                <p className="text-sm">{message.text}</p>
              </div>
              
              {message.attachments?.map((attachment, index) => (
                <div key={index} className="max-w-[80%] ml-auto mr-auto mt-2">
                  {attachment.type === 'video' && (
                    <SuggestedVideos videos={attachment.data.suggestions} />
                  )}
                  {attachment.type === 'growth' && (
                    <GrowthTracker data={attachment.data} />
                  )}
                  {attachment.type === 'article' && (
                    <div className="bg-white p-3 rounded-lg border border-gray-200 space-y-2">
                      <h4 className="font-medium text-sm">Suggested Articles</h4>
                      {attachment.data.suggestions.map((article: any) => (
                        <div key={article.id} className="flex gap-2 items-start py-2 border-t border-gray-100">
                          <FileText className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">{article.title}</p>
                            <p className="text-xs text-gray-500">{article.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {attachment.type === 'ai' && showAISystem && (
                    <EnhancedAISystem />
                  )}
                </div>
              ))}
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

      {/* Tools Panel */}
      {showTools && (
        <div className="bg-white border-t p-3 grid grid-cols-4 gap-2">
          <Button variant="ghost" size="sm" className="flex flex-col items-center justify-center h-16 rounded-lg">
            <Video className="h-5 w-5 mb-1 text-health-blue" />
            <span className="text-xs">Video Call</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center justify-center h-16 rounded-lg">
            <Camera className="h-5 w-5 mb-1 text-health-blue" />
            <span className="text-xs">Scan Rx</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center justify-center h-16 rounded-lg">
            <Baby className="h-5 w-5 mb-1 text-health-blue" />
            <span className="text-xs">Growth</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center justify-center h-16 rounded-lg">
            <FileText className="h-5 w-5 mb-1 text-health-blue" />
            <span className="text-xs">Articles</span>
          </Button>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t flex items-center space-x-2 bg-white">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full flex-shrink-0"
          onClick={toggleTools}
        >
          <span className="sr-only">Show tools</span>
          {showTools ? <X className="h-5 w-5 text-gray-500" /> : <Baby className="h-5 w-5 text-gray-500" />}
        </Button>
        
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 py-2 text-sm"
          autoComplete="off"
        />
        
        <VoiceInteraction onTranscription={handleVoiceTranscription} />
        
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
  );
};

export default ChatInterface;

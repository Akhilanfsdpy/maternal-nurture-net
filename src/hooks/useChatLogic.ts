
import { useState, useRef, useEffect } from 'react';
import { Message } from '@/types/chat';

export const useChatLogic = () => {
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

  return {
    input,
    setInput,
    messages,
    isTyping,
    showTools,
    showAISystem,
    messagesEndRef,
    handleSubmit,
    handleVoiceTranscription,
    toggleTools
  };
};

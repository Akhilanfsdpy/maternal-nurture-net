
import { useState, useRef, useEffect } from 'react';
import { Message } from '@/types/chat';
import { useToast } from '@/hooks/use-toast';

export const useChatLogic = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm your health assistant. How can I help you today?", isUser: false },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [showAISystem, setShowAISystem] = useState(false);
  const { toast } = useToast();
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
      
      const lowerInput = input.toLowerCase();

      if (lowerInput.includes('growth') || lowerInput.includes('weight') || lowerInput.includes('height')) {
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
      } else if (lowerInput.includes('video') || lowerInput.includes('watch')) {
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
      } else if (lowerInput.includes('pregnancy') || lowerInput.includes('pregnant')) {
        response = {
          id: messages.length + 2,
          text: "Monitoring your health during pregnancy is crucial. Make sure to track your blood pressure, stay hydrated, and attend all scheduled appointments. Would you like me to suggest some pregnancy wellness tips?",
          isUser: false
        };
      } else if (lowerInput.includes('baby') || lowerInput.includes('newborn')) {
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
      } else if (lowerInput.includes('symptom') || lowerInput.includes('pain')) {
        response = {
          id: messages.length + 2,
          text: "If you're experiencing concerning symptoms, please consult your healthcare provider immediately. Would you like me to help you log these symptoms or connect with a healthcare professional?",
          isUser: false
        };
      } else if (lowerInput.includes('fetal movement') || lowerInput.includes('baby kicking')) {
        response = {
          id: messages.length + 2,
          text: "Tracking fetal movement is important for monitoring your baby's health. The AI can analyze patterns in movement frequency and intensity. Would you like to start a fetal movement tracking session?",
          isUser: false
        };
        
        toast({
          title: "AI Feature Available",
          description: "Fetal Movement Tracking can be enabled in your profile settings.",
        });
      } else if (lowerInput.includes('qr') || lowerInput.includes('code') || lowerInput.includes('scan')) {
        response = {
          id: messages.length + 2,
          text: "I can generate QR codes for your health information that can be scanned by healthcare providers. What would you like to create a QR code for?",
          isUser: false,
          attachments: [{
            type: 'qr-code',
            data: {
              type: 'appointment',
              data: 'https://example.com/appointment/123456',
              description: 'Your next prenatal appointment'
            }
          }]
        };
      } else if (lowerInput.includes('prescription') || lowerInput.includes('medicine') || lowerInput.includes('medication')) {
        response = {
          id: messages.length + 2,
          text: "I can help you scan and track your prescriptions. Would you like to use the prescription scanner or view your current medication schedule?",
          isUser: false,
          attachments: [{
            type: 'prescription',
            data: {
              medications: [
                { name: 'Prenatal Vitamins', dosage: '1 tablet', frequency: 'Daily', startDate: '2023-01-15' },
                { name: 'Iron Supplement', dosage: '25mg', frequency: 'Twice daily', startDate: '2023-01-15' }
              ],
              doctor: 'Dr. Sarah Johnson',
              issueDate: '2023-01-15',
              notes: 'Take with food to minimize stomach upset.'
            }
          }]
        };
      } else if (lowerInput.includes('ai') || lowerInput.includes('how do you work')) {
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

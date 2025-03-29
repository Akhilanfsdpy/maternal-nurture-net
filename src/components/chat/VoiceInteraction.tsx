
import React, { useState } from 'react';
import { Mic, MicOff, Languages, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from '@/hooks/use-toast';

interface VoiceInteractionProps {
  onTranscription?: (text: string) => void;
}

const VoiceInteraction: React.FC<VoiceInteractionProps> = ({ onTranscription }) => {
  const [isListening, setIsListening] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  
  const languages = [
    { value: "en-US", label: "English (US)" },
    { value: "es-ES", label: "Spanish" },
    { value: "fr-FR", label: "French" },
    { value: "de-DE", label: "German" },
    { value: "zh-CN", label: "Chinese" },
    { value: "hi-IN", label: "Hindi" }
  ];
  
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  
  const startListening = () => {
    setIsListening(true);
    
    // Simulate voice recognition (in a real app, this would use Google Speech-to-Text or OpenAI Whisper)
    toast({
      title: "Listening...",
      description: `Voice recognition active in ${languages.find(l => l.value === selectedLanguage)?.label}`
    });
    
    // Simulate receiving transcript after 3 seconds
    setTimeout(() => {
      const simulatedTranscript = "How can I track my baby's development milestones?";
      if (onTranscription) {
        onTranscription(simulatedTranscript);
      }
      stopListening();
    }, 3000);
  };
  
  const stopListening = () => {
    setIsListening(false);
  };
  
  const toggleOfflineMode = () => {
    setIsOfflineMode(!isOfflineMode);
    toast({
      title: isOfflineMode ? "Online Mode" : "Offline Mode",
      description: isOfflineMode 
        ? "Connected to cloud services for better recognition" 
        : "Using device-based recognition for offline use"
    });
  };
  
  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant={isListening ? "default" : "outline"}
              onClick={toggleListening}
              className={isListening ? "bg-red-500 hover:bg-red-600" : ""}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isListening ? "Stop listening" : "Start voice input"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
        <SelectTrigger className="w-[130px] h-9">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((language) => (
            <SelectItem key={language.value} value={language.value}>
              <div className="flex items-center">
                <Languages className="w-3 h-3 mr-2" />
                {language.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              onClick={toggleOfflineMode}
              className={isOfflineMode ? "border-green-500 text-green-500" : ""}
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isOfflineMode ? "Using offline voice recognition" : "Using cloud voice recognition"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default VoiceInteraction;


import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface AudioRecorderProps {
  isRecording: boolean;
  toggleVoiceInput: () => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({
  isRecording,
  toggleVoiceInput
}) => {
  return (
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
  );
};

export default AudioRecorder;

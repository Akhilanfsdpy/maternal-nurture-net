
import React from 'react';
import { Video, Paperclip, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AudioRecorder from './AudioRecorder';

interface ActionButtonsProps {
  isRecording: boolean;
  toggleVoiceInput: () => void;
  handleVideoCall: () => void;
  handleAttachment: () => void;
  handleScheduleAppointment: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isRecording,
  toggleVoiceInput,
  handleVideoCall,
  handleAttachment,
  handleScheduleAppointment
}) => {
  return (
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
      
      <AudioRecorder 
        isRecording={isRecording} 
        toggleVoiceInput={toggleVoiceInput} 
      />
      
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
  );
};

export default ActionButtons;

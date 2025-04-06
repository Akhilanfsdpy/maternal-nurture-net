
import React from 'react';
import { X, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CameraCaptureProps {
  cancelCameraCapture: () => void;
  takePicture: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({
  cancelCameraCapture,
  takePicture
}) => {
  return (
    <div className="relative">
      <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
        <div className="text-white text-center">
          <Camera className="h-12 w-12 mx-auto mb-2 animate-pulse" />
          <p>Camera Preview (Simulated)</p>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <Button 
          onClick={cancelCameraCapture}
          variant="outline"
          className="w-1/3"
        >
          <X className="mr-2 h-4 w-4" /> Cancel
        </Button>
        <Button 
          onClick={takePicture}
          className="w-1/3 bg-health-blue"
        >
          <Camera className="mr-2 h-4 w-4" /> Capture
        </Button>
      </div>
    </div>
  );
};

export default CameraCapture;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScanProgress } from '@/utils/document-scanner/types';

interface ScanningProgressProps {
  scanProgress: ScanProgress;
  imagePreview?: string;
  onChangeImage?: () => void;
}

const ScanningProgress: React.FC<ScanningProgressProps> = ({
  scanProgress,
  imagePreview,
  onChangeImage
}) => {
  return (
    <div className="space-y-4">
      {imagePreview && (
        <div className="relative">
          <img 
            src={imagePreview} 
            alt="Document" 
            className="w-full h-48 object-cover rounded-lg"
          />
          {onChangeImage && (
            <Button
              variant="outline"
              size="sm"
              className="absolute top-2 right-2 bg-white"
              onClick={onChangeImage}
            >
              Change
            </Button>
          )}
        </div>
      )}
      
      <div className="text-center p-4">
        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Scanning document...</span>
            <span className="text-sm font-medium text-gray-700">{scanProgress.progress.toFixed(0)}%</span>
          </div>
          <Progress value={scanProgress.progress} className="w-full" />
        </div>
        
        {scanProgress.confidence !== undefined && scanProgress.progress > 30 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Confidence</span>
              <span className="text-sm font-medium text-gray-700">{scanProgress.confidence.toFixed(1)}%</span>
            </div>
            <Progress 
              value={scanProgress.confidence} 
              className={`w-full ${
                scanProgress.confidence > 80 
                  ? 'bg-green-100' 
                  : scanProgress.confidence > 50 
                    ? 'bg-yellow-100' 
                    : 'bg-red-100'
              }`}
            />
          </div>
        )}
        
        {scanProgress.stage && (
          <p className="mt-2 text-sm text-gray-600">
            {scanProgress.stage}
          </p>
        )}
      </div>
    </div>
  );
};

export default ScanningProgress;

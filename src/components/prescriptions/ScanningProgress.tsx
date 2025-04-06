
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface ScanningProgressProps {
  imagePreview: string;
  scanProgress: number;
  setImagePreview: (value: string | null) => void;
}

const ScanningProgress: React.FC<ScanningProgressProps> = ({
  imagePreview,
  scanProgress,
  setImagePreview
}) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <img 
          src={imagePreview} 
          alt="Prescription" 
          className="w-full h-48 object-cover rounded-lg"
        />
        <Button
          variant="outline"
          size="sm"
          className="absolute top-2 right-2 bg-white"
          onClick={() => setImagePreview(null)}
        >
          Change
        </Button>
      </div>
      
      <div className="text-center p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Scanning prescription...</span>
            <span className="text-sm font-medium text-gray-700">{scanProgress}%</span>
          </div>
          <Progress value={scanProgress} className="w-full" />
        </div>
        <p className="mt-2 text-sm text-gray-600">
          {scanProgress < 30 ? "Analyzing image..." : 
           scanProgress < 60 ? "Detecting text regions..." : 
           scanProgress < 90 ? "Identifying medications..." : 
           "Processing complete..."}
        </p>
      </div>
    </div>
  );
};

export default ScanningProgress;

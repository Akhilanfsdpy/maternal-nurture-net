
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ScanningProgressProps {
  scanProgress: number;
  confidence: number;
}

const ScanningProgress: React.FC<ScanningProgressProps> = ({
  scanProgress,
  confidence
}) => {
  return (
    <div className="text-center p-4">
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Scanning document...</span>
          <span className="text-sm font-medium text-gray-700">{scanProgress}%</span>
        </div>
        <Progress value={scanProgress} className="w-full" />
      </div>
      
      {scanProgress > 30 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Confidence</span>
            <span className="text-sm font-medium text-gray-700">{confidence.toFixed(1)}%</span>
          </div>
          <Progress 
            value={confidence} 
            className={`w-full ${
              confidence > 80 
                ? 'bg-green-100' 
                : confidence > 50 
                  ? 'bg-yellow-100' 
                  : 'bg-red-100'
            }`}
          />
        </div>
      )}
      
      <p className="mt-2 text-sm text-gray-600">
        {scanProgress < 30 ? "Analyzing image..." : 
         scanProgress < 60 ? "Detecting text regions..." : 
         scanProgress < 90 ? "Identifying document fields..." : 
         "Processing complete..."}
      </p>
    </div>
  );
};

export default ScanningProgress;


import React from 'react';
import { Check } from 'lucide-react';
import { CardFooter } from '@/components/ui/card';

interface ScannerFooterProps {
  enhancedScan: boolean;
}

const ScannerFooter: React.FC<ScannerFooterProps> = ({ enhancedScan }) => {
  return (
    <CardFooter className="text-xs text-gray-500 flex items-center justify-between flex-wrap">
      <span>Document OCR helps digitize important health information for your records.</span>
      {enhancedScan && (
        <span className="text-health-blue flex items-center">
          <Check className="h-3 w-3 mr-1" />
          Enhanced scanning enabled
        </span>
      )}
    </CardFooter>
  );
};

export default ScannerFooter;

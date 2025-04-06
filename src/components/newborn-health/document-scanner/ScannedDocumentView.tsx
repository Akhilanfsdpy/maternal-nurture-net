
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import ScanningProgress from './ScanningProgress';

interface ScannedDocumentViewProps {
  imagePreview: string;
  onChangeImage: () => void;
  isScanning: boolean;
  scanProgress: number;
  confidence: number;
  scannedText: string;
  setScannedText: (text: string) => void;
}

const ScannedDocumentView: React.FC<ScannedDocumentViewProps> = ({
  imagePreview,
  onChangeImage,
  isScanning,
  scanProgress,
  confidence,
  scannedText,
  setScannedText
}) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <img 
          src={imagePreview} 
          alt="Document" 
          className="w-full h-48 object-cover rounded-lg"
        />
        <Button
          variant="outline"
          size="sm"
          className="absolute top-2 right-2 bg-white"
          onClick={onChangeImage}
        >
          Change
        </Button>
      </div>
      
      {isScanning ? (
        <ScanningProgress 
          scanProgress={scanProgress}
          confidence={confidence}
        />
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Scanned Text</label>
          <Textarea 
            value={scannedText}
            onChange={(e) => setScannedText(e.target.value)}
            rows={8}
            className="w-full font-mono text-xs"
          />
        </div>
      )}
    </div>
  );
};

export default ScannedDocumentView;

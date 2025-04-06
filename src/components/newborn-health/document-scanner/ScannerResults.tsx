
import React from 'react';
import ScannedDocumentView from './ScannedDocumentView';
import RecognizedFieldsEditor from './RecognizedFieldsEditor';
import ScanningProgress from '@/components/shared/document-scanner/ScanningProgress';
import { ScanProgress } from '@/utils/document-scanner/types';

interface ScannerResultsProps {
  imagePreview: string;
  scannedText: string;
  setScannedText: (text: string) => void;
  recognizedFields: Record<string, string>;
  setRecognizedFields: (fields: Record<string, string>) => void;
  isScanning: boolean;
  scanProgress: ScanProgress;
  confidence: number;
  onChangeImage: () => void;
  onExport: () => void;
}

const ScannerResults: React.FC<ScannerResultsProps> = ({
  imagePreview,
  scannedText,
  setScannedText,
  recognizedFields,
  setRecognizedFields,
  isScanning,
  scanProgress,
  confidence,
  onChangeImage,
  onExport
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        {isScanning ? (
          <ScanningProgress
            imagePreview={imagePreview}
            scanProgress={scanProgress}
            onChangeImage={onChangeImage}
          />
        ) : (
          <ScannedDocumentView 
            imagePreview={imagePreview} 
            onChangeImage={onChangeImage}
            isScanning={isScanning}
            scanProgress={scanProgress.progress}
            confidence={confidence}
            scannedText={scannedText}
            setScannedText={setScannedText}
          />
        )}
      </div>
      
      {Object.keys(recognizedFields).length > 0 && (
        <RecognizedFieldsEditor 
          recognizedFields={recognizedFields}
          setRecognizedFields={setRecognizedFields}
          confidence={confidence}
          onExport={onExport}
        />
      )}
    </div>
  );
};

export default ScannerResults;

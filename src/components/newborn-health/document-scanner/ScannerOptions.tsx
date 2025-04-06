
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import DocumentTypeSelector from './DocumentTypeSelector';

type DocumentType = 'birth-certificate' | 'medical-record' | 'growth-chart' | 'prescription';

interface ScannerOptionsProps {
  documentType: DocumentType;
  setDocumentType: (type: DocumentType) => void;
  enhancedScan: boolean;
  setEnhancedScan: (value: boolean) => void;
}

const ScannerOptions: React.FC<ScannerOptionsProps> = ({
  documentType,
  setDocumentType,
  enhancedScan,
  setEnhancedScan
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <DocumentTypeSelector 
        documentType={documentType}
        setDocumentType={setDocumentType}
      />
      <div className="flex items-center space-x-2 mt-auto">
        <Switch
          checked={enhancedScan}
          onCheckedChange={setEnhancedScan}
          id="enhanced-scanning"
        />
        <Label htmlFor="enhanced-scanning" className="text-sm cursor-pointer">
          Enhanced Scanning
        </Label>
      </div>
    </div>
  );
};

export default ScannerOptions;

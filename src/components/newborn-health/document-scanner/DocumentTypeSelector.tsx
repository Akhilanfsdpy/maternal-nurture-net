
import React from 'react';
import { Label } from '@/components/ui/label';

type DocumentType = 'birth-certificate' | 'medical-record' | 'growth-chart' | 'prescription';

interface DocumentTypeSelectorProps {
  documentType: DocumentType;
  setDocumentType: (type: DocumentType) => void;
}

const DocumentTypeSelector: React.FC<DocumentTypeSelectorProps> = ({
  documentType,
  setDocumentType
}) => {
  return (
    <div>
      <Label className="text-sm font-medium">Document Type</Label>
      <select
        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
        value={documentType}
        onChange={(e) => setDocumentType(e.target.value as DocumentType)}
      >
        <option value="birth-certificate">Birth Certificate</option>
        <option value="medical-record">Medical Record</option>
        <option value="growth-chart">Growth Chart</option>
        <option value="prescription">Prescription</option>
      </select>
    </div>
  );
};

export default DocumentTypeSelector;

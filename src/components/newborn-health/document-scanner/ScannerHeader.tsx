
import React from 'react';
import { FileText } from 'lucide-react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const ScannerHeader: React.FC = () => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center">
        <FileText className="h-5 w-5 text-health-blue mr-2" />
        Document Scanner
      </CardTitle>
      <CardDescription>
        Scan and digitize baby health documents with OCR technology
      </CardDescription>
    </CardHeader>
  );
};

export default ScannerHeader;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QrCode, Download } from 'lucide-react';

interface QRCodeGeneratorProps {
  documentType: string;
  setDocumentType: (type: string) => void;
  documentId: string;
  setDocumentId: (id: string) => void;
  generatedQR: string | null;
  onGenerateQR: () => void;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  documentType,
  setDocumentType,
  documentId,
  setDocumentId,
  generatedQR,
  onGenerateQR,
}) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Generate a QR code that links to your child's health records. This QR code can be scanned to access growth charts, 
        appointment scheduling, feeding logs, and other health information.
      </p>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Document Type</label>
          <select 
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="birth-certificate">Birth Certificate</option>
            <option value="vaccination">Vaccination Record</option>
            <option value="health-checkup">Health Checkup Report</option>
            <option value="growth-chart">Growth Chart</option>
            <option value="feeding-schedule">Feeding Schedule</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Document ID</label>
          <Input 
            value={documentId}
            onChange={(e) => setDocumentId(e.target.value)}
            placeholder="Enter document ID" 
          />
        </div>
      </div>
      
      <Button 
        onClick={onGenerateQR}
        className="w-full bg-gradient-to-r from-health-blue to-health-light-blue"
      >
        <QrCode className="mr-2 h-4 w-4" />
        Generate QR Code
      </Button>
      
      {generatedQR && (
        <div className="mt-4 flex flex-col items-center p-4 border border-gray-200 rounded-lg">
          <div className="h-40 w-40 border border-gray-300 bg-gray-100 flex items-center justify-center">
            <QrCode className="h-20 w-20 text-gray-800" />
          </div>
          <p className="mt-2 text-sm text-gray-600">{documentType} - ID: {documentId}</p>
          <p className="text-xs text-gray-500 mt-1 text-center">
            Scanning this QR code redirects to your child's health dashboard with growth tracking, appointment scheduling, and health records.
          </p>
          <div className="flex gap-2 mt-3">
            <Button variant="outline" size="sm">
              <Download className="h-3 w-3 mr-1" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              Share
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;

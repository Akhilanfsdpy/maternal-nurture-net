
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle, FileSignature, Download, QrCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VerificationResultProps {
  status: 'verified' | 'failed';
  certificateGenerated: boolean;
  generatedQR: string | null;
  onDownload: () => void;
}

const VerificationResult: React.FC<VerificationResultProps> = ({
  status,
  certificateGenerated,
  generatedQR,
  onDownload,
}) => {
  if (status === 'verified') {
    return (
      <div className="space-y-4 mt-4">
        <div className="bg-green-50 p-3 rounded-md flex items-start">
          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <p className="text-green-800 font-medium">Document Verified</p>
            <p className="text-green-700 text-sm">This document has been cryptographically verified and is authentic.</p>
          </div>
        </div>
        
        {certificateGenerated && (
          <Card className="p-4 border-green-200 bg-green-50 shadow-none">
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <FileSignature className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="font-medium text-green-800">Digital Certificate Generated</h3>
              <p className="text-sm text-green-700">
                Your certificate has been digitally signed and blockchain-verified.
              </p>
              <div className="flex justify-center pt-2">
                <Button 
                  onClick={onDownload}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Certificate PDF
                </Button>
              </div>
              
              {generatedQR && (
                <div className="mt-4 flex flex-col items-center">
                  <p className="text-sm text-green-700 mb-2">Certificate QR Code</p>
                  <div className="h-32 w-32 border border-green-300 bg-white flex items-center justify-center">
                    <QrCode className="h-20 w-20 text-green-800" />
                  </div>
                  <p className="mt-2 text-xs text-green-600">
                    Scan to access baby's growth and health records
                  </p>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    );
  } else if (status === 'failed') {
    return (
      <div className="bg-red-50 p-3 rounded-md flex items-start mt-4">
        <XCircle className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
        <div>
          <p className="text-red-800 font-medium">Verification Failed</p>
          <p className="text-red-700 text-sm">The keys don't match or are invalid. Please check and try again.</p>
        </div>
      </div>
    );
  }
  
  return null;
};

export default VerificationResult;

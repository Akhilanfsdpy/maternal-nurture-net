
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const BirthCertificateAlert: React.FC = () => {
  return (
    <Alert className="mb-6 bg-blue-50 border-blue-200">
      <div className="flex items-start">
        <AlertTriangle className="h-5 w-5 text-blue-700 mt-0.5 mr-2" />
        <div>
          <AlertTitle className="text-blue-800">Important Information</AlertTitle>
          <AlertDescription className="text-blue-700">
            The information provided will be used to create an official digital birth certificate. 
            Please ensure all details are accurate as they will appear on the official document.
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
};

export default BirthCertificateAlert;

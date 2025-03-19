
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import BirthCertificateForm from './BirthCertificateForm';
import BirthCertificateDisplay from './BirthCertificateDisplay';
import { BirthCertificate } from '@/types/newbornHealth';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, FileText } from 'lucide-react';

const BirthCertificateTabContent: React.FC = () => {
  const [certificate, setCertificate] = useState<BirthCertificate | null>(null);
  
  const handleFormSubmit = (values: any) => {
    // Generate a unique ID for the certificate
    const certificateId = `BC-${Date.now().toString().slice(-8)}`;
    
    // Create a certificate object
    const newCertificate: BirthCertificate = {
      childId: `ID-${Date.now().toString().slice(-6)}`,
      childName: values.childName,
      dateOfBirth: values.dateOfBirth,
      timeOfBirth: values.timeOfBirth,
      gender: values.gender,
      weight: values.weight,
      height: values.height,
      apgarScore: values.apgarScore || 'Not recorded',
      parentName1: values.parentName1,
      parentName2: values.parentName2 || null,
      address: values.address,
      contactNumber: values.contactNumber,
      hospitalName: values.hospitalName,
      doctorName: values.doctorName,
      certificateId: certificateId,
      issueDate: new Date().toISOString().split('T')[0],
      issuedBy: 'Digital Health Authority',
    };
    
    setCertificate(newCertificate);
  };
  
  return (
    <div className="space-y-6">
      {!certificate ? (
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-health-pink" />
              Digital Birth Certificate
            </CardTitle>
            <CardDescription>
              Create an official digital birth certificate for your child
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6 bg-blue-50 border-blue-200">
              <AlertTitle className="text-blue-800 flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Important Information
              </AlertTitle>
              <AlertDescription className="text-blue-700">
                The information provided will be used to create an official digital birth certificate. 
                Please ensure all details are accurate as they will appear on the official document.
              </AlertDescription>
            </Alert>
            
            <BirthCertificateForm onSubmit={handleFormSubmit} />
          </CardContent>
        </Card>
      ) : (
        <BirthCertificateDisplay certificate={certificate} />
      )}
    </div>
  );
};

export default BirthCertificateTabContent;

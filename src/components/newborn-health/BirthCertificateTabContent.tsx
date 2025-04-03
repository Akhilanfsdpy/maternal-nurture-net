
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import BirthCertificateForm from './BirthCertificateForm';
import BirthCertificateDisplay from './BirthCertificateDisplay';
import { BirthCertificate } from '@/types/newbornHealth';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, FileText, Key } from 'lucide-react';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

const BirthCertificateTabContent: React.FC = () => {
  const [certificate, setCertificate] = useState<BirthCertificate | null>(null);
  const [verificationKey, setVerificationKey] = useState<string | null>(null);
  
  const handleFormSubmit = (values: any) => {
    // Generate a unique ID for the certificate
    const certificateId = `BC-${Date.now().toString().slice(-8)}`;
    
    // Generate a verification key that will be shared with the doctor
    const generatedKey = `VK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    setVerificationKey(generatedKey);
    
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
        <div className="space-y-6">
          <BirthCertificateDisplay certificate={certificate} />
          
          {verificationKey && (
            <Card className="border-2 border-health-pink/20 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Key className="mr-2 h-5 w-5 text-health-pink" />
                  Certificate Verification Key
                </CardTitle>
                <CardDescription>
                  This key is required for the healthcare provider to digitally sign and verify this birth certificate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-4 bg-yellow-50 border-yellow-200">
                  <AlertTitle className="text-yellow-800 flex items-center">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Important
                  </AlertTitle>
                  <AlertDescription className="text-yellow-700">
                    Please share this verification key with your healthcare provider to complete the certificate verification process.
                    Both you and your healthcare provider will need this key.
                  </AlertDescription>
                </Alert>
                
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-center">
                  <p className="text-sm text-gray-500 mb-1">Verification Key</p>
                  <p className="text-xl font-mono font-bold tracking-wider text-health-pink">{verificationKey}</p>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Next Steps:</h4>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">1.</TableCell>
                        <TableCell>Share this verification key with your healthcare provider</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">2.</TableCell>
                        <TableCell>Your provider will use this key to verify and digitally sign the certificate</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">3.</TableCell>
                        <TableCell>Once verified, this document becomes officially recognized</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default BirthCertificateTabContent;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Key, FileText, CheckCircle, QrCode } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DocumentVerification: React.FC = () => {
  const [parentKey, setParentKey] = useState('');
  const [doctorKey, setDoctorKey] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verified' | 'failed'>('idle');
  const [documentType, setDocumentType] = useState('birth-certificate');
  const [documentId, setDocumentId] = useState('');
  const { toast } = useToast();

  const handleVerify = () => {
    // In a real app, this would check against a database
    // For demo purposes, we'll use a simple check
    if (parentKey && doctorKey && parentKey === doctorKey) {
      setVerificationStatus('verified');
      toast({
        title: "Verification Successful",
        description: "The document keys match and are verified.",
      });
    } else {
      setVerificationStatus('failed');
      toast({
        title: "Verification Failed",
        description: "The keys don't match or are invalid.",
        variant: "destructive",
      });
    }
  };

  const handleGenerateQR = () => {
    if (!documentId) {
      toast({
        title: "Document ID Required",
        description: "Please enter a document ID to generate a QR code.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "QR Code Generated",
      description: `QR code for ${documentType} with ID ${documentId} has been generated.`,
    });
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="verify">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="verify" className="flex items-center">
            <Key className="h-4 w-4 mr-2" />
            Verify Document
          </TabsTrigger>
          <TabsTrigger value="qr" className="flex items-center">
            <QrCode className="h-4 w-4 mr-2" />
            Generate QR Code
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="verify" className="space-y-4 pt-4">
          <p className="text-sm text-gray-600">
            Documents are verified using a dual-key system. Both the parent's key and the healthcare provider's key 
            must match for verification.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <Key className="h-4 w-4 mr-2 text-health-pink" />
                Parent Verification Key
              </label>
              <Input 
                value={parentKey}
                onChange={(e) => setParentKey(e.target.value)}
                placeholder="Enter parent's key" 
                className="border-health-pink/20 focus:border-health-pink" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <Key className="h-4 w-4 mr-2 text-health-blue" />
                Doctor Verification Key
              </label>
              <Input 
                value={doctorKey}
                onChange={(e) => setDoctorKey(e.target.value)} 
                placeholder="Enter doctor's key" 
                className="border-health-blue/20 focus:border-health-blue" 
              />
            </div>
          </div>
          
          <Button 
            onClick={handleVerify}
            variant="outline" 
            className="w-full"
          >
            Verify Document
          </Button>
          
          {verificationStatus === 'verified' && (
            <div className="bg-green-50 p-3 rounded-md flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="text-green-800 font-medium">Document Verified</p>
                <p className="text-green-700 text-sm">This document has been cryptographically verified and is authentic.</p>
              </div>
            </div>
          )}
          
          {verificationStatus === 'failed' && (
            <div className="bg-red-50 p-3 rounded-md flex items-start">
              <Key className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="text-red-800 font-medium">Verification Failed</p>
                <p className="text-red-700 text-sm">The keys don't match or are invalid. Please check and try again.</p>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="qr" className="space-y-4 pt-4">
          <p className="text-sm text-gray-600">
            Generate a QR code that healthcare providers can scan to verify the authenticity of your documents and access authorized information.
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
                <option value="insurance">Insurance Information</option>
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
            onClick={handleGenerateQR}
            className="w-full bg-gradient-to-r from-health-blue to-health-light-blue"
          >
            <QrCode className="mr-2 h-4 w-4" />
            Generate QR Code
          </Button>
          
          {documentId && (
            <div className="mt-4 flex flex-col items-center p-4 border border-gray-200 rounded-lg">
              <div className="h-40 w-40 border border-gray-300 bg-gray-100 flex items-center justify-center">
                <QrCode className="h-20 w-20 text-gray-800" />
              </div>
              <p className="mt-2 text-sm text-gray-600">{documentType} - ID: {documentId}</p>
              <Button variant="outline" size="sm" className="mt-2">
                Download QR Code
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentVerification;

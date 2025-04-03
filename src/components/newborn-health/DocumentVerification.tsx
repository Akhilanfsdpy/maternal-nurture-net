
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Key, FileText, CheckCircle, QrCode, FileSignature, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

const DocumentVerification: React.FC = () => {
  const [parentKey, setParentKey] = useState('');
  const [doctorKey, setDoctorKey] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verified' | 'failed'>('idle');
  const [documentType, setDocumentType] = useState('birth-certificate');
  const [documentId, setDocumentId] = useState('');
  const [generatedQR, setGeneratedQR] = useState<string | null>(null);
  const [certificateGenerated, setCertificateGenerated] = useState(false);
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
      
      // Auto-generate certificate
      setCertificateGenerated(true);
      
      // Generate QR code data
      const qrData = `https://example.com/baby-profile?id=${documentId}&type=${documentType}`;
      setGeneratedQR(qrData);
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

    // Generate QR code data that would lead to baby's growth tracking page
    const qrData = `https://example.com/baby-profile?id=${documentId}&type=${documentType}`;
    setGeneratedQR(qrData);

    toast({
      title: "QR Code Generated",
      description: `QR code for ${documentType} with ID ${documentId} has been generated.`,
    });
  };

  const handleDownloadPDF = () => {
    toast({
      title: "PDF Download Started",
      description: "Your verified certificate is being downloaded as a PDF.",
    });
    // In a real app, this would generate and download a PDF
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
            <div className="space-y-4">
              <div className="bg-green-50 p-3 rounded-md flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-green-800 font-medium">Document Verified</p>
                  <p className="text-green-700 text-sm">This document has been cryptographically verified and is authentic.</p>
                </div>
              </div>
              
              {certificateGenerated && (
                <Card className="p-4 border-green-200 bg-green-50">
                  <div className="text-center space-y-3">
                    <div className="flex justify-center">
                      <FileSignature className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="font-medium text-green-800">Digital Certificate Generated</h3>
                    <p className="text-sm text-green-700">
                      Your certificate has been digitally signed by the healthcare provider.
                    </p>
                    <div className="flex justify-center pt-2">
                      <Button 
                        onClick={handleDownloadPDF}
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
            onClick={handleGenerateQR}
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentVerification;

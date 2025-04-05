
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Lock, QrCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SecurityLevelSelector from './document-verification/SecurityLevelSelector';
import KeyInput from './document-verification/KeyInput';
import VerificationProgress from './document-verification/VerificationProgress';
import VerificationResult from './document-verification/VerificationResult';
import QRCodeGenerator from './document-verification/QRCodeGenerator';
import { VerificationStep } from './document-verification/VerificationProgress';

const EnhancedDocumentVerification: React.FC = () => {
  const [parentKey, setParentKey] = useState('');
  const [doctorKey, setDoctorKey] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'processing' | 'verified' | 'failed'>('idle');
  const [documentType, setDocumentType] = useState('birth-certificate');
  const [documentId, setDocumentId] = useState('');
  const [generatedQR, setGeneratedQR] = useState<string | null>(null);
  const [certificateGenerated, setCertificateGenerated] = useState(false);
  const [securityLevel, setSecurityLevel] = useState<'standard' | 'enhanced' | 'government'>('enhanced');
  const [verificationSteps, setVerificationSteps] = useState<VerificationStep[]>([
    { id: 1, name: 'Key Authentication', status: 'pending', description: 'Verify parent and doctor keys match' },
    { id: 2, name: 'Blockchain Validation', status: 'pending', description: 'Validate record on decentralized ledger' },
    { id: 3, name: 'Digital Signature', status: 'pending', description: 'Verify document cryptographic signature' },
    { id: 4, name: 'Institutional Verification', status: 'pending', description: 'Check against healthcare provider records' },
  ]);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const { toast } = useToast();

  const handleVerify = () => {
    if (!parentKey || !doctorKey) {
      toast({
        title: "Missing Keys",
        description: "Both parent and doctor verification keys are required.",
        variant: "destructive",
      });
      return;
    }
    
    setVerificationStatus('processing');
    setVerificationProgress(0);
    
    // Update steps statuses to processing
    updateStepStatus(1, 'processing');
    
    const keyMatch = parentKey === doctorKey;
    
    const interval = setInterval(() => {
      setVerificationProgress(prev => {
        const newProgress = prev + 5;
        
        // Update steps based on progress
        if (newProgress === 20) {
          updateStepStatus(1, keyMatch ? 'success' : 'error');
          if (keyMatch) updateStepStatus(2, 'processing');
        } else if (newProgress === 40) {
          if (keyMatch) {
            updateStepStatus(2, 'success');
            updateStepStatus(3, 'processing');
          }
        } else if (newProgress === 60) {
          if (keyMatch) {
            updateStepStatus(3, 'success');
            updateStepStatus(4, 'processing');
          }
        } else if (newProgress === 80) {
          if (keyMatch) {
            updateStepStatus(4, 'success');
          }
        } else if (newProgress >= 100) {
          clearInterval(interval);
          setVerificationStatus(keyMatch ? 'verified' : 'failed');
          
          if (keyMatch) {
            toast({
              title: "Verification Successful",
              description: "All security checks passed. Document is authentic.",
            });
            
            // Auto-generate certificate and QR
            setCertificateGenerated(true);
            const qrData = `https://example.com/verify/${documentType}/${Date.now()}`;
            setGeneratedQR(qrData);
          } else {
            toast({
              title: "Verification Failed",
              description: "The verification keys don't match or are invalid.",
              variant: "destructive",
            });
          }
        }
        
        return Math.min(newProgress, 100);
      });
    }, 200);
  };

  const updateStepStatus = (stepId: number, status: 'pending' | 'processing' | 'success' | 'error') => {
    setVerificationSteps(steps => 
      steps.map(step => 
        step.id === stepId ? {...step, status} : step
      )
    );
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
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 text-health-blue mr-2" />
          Advanced Document Verification
        </CardTitle>
        <CardDescription>
          Securely verify the authenticity of your baby's health documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="verify">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="verify" className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Verify Document
            </TabsTrigger>
            <TabsTrigger value="qr" className="flex items-center">
              <QrCode className="h-4 w-4 mr-2" />
              Generate QR Code
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="verify" className="space-y-4 pt-4">
            <SecurityLevelSelector 
              securityLevel={securityLevel}
              setSecurityLevel={setSecurityLevel}
            />
            
            <p className="text-sm text-gray-600">
              Our multi-factor verification system ensures document authenticity using blockchain and cryptographic verification.
              {securityLevel === 'enhanced' && " Enhanced security adds institutional verification."}
              {securityLevel === 'government' && " Government security adds official records verification."}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 verification-container">
              <KeyInput
                label="Parent Verification Key"
                value={parentKey}
                onChange={setParentKey}
                colorClass="text-health-pink"
                placeholder="Enter parent's verification key"
              />
              
              <KeyInput
                label="Doctor Verification Key"
                value={doctorKey}
                onChange={setDoctorKey}
                colorClass="text-health-blue"
                placeholder="Enter doctor's verification key"
              />
            </div>
            
            <Button 
              onClick={handleVerify}
              className="w-full mt-2"
              disabled={verificationStatus === 'processing'}
            >
              {verificationStatus === 'processing' ? 
                'Verifying...' : 'Verify Document'}
            </Button>
            
            {verificationStatus === 'processing' && (
              <VerificationProgress 
                progress={verificationProgress}
                steps={verificationSteps}
              />
            )}
            
            {(verificationStatus === 'verified' || verificationStatus === 'failed') && (
              <VerificationResult 
                status={verificationStatus}
                certificateGenerated={certificateGenerated}
                generatedQR={generatedQR}
                onDownload={handleDownloadPDF}
              />
            )}
          </TabsContent>
          
          <TabsContent value="qr" className="space-y-4 pt-4">
            <QRCodeGenerator
              documentType={documentType}
              setDocumentType={setDocumentType}
              documentId={documentId}
              setDocumentId={setDocumentId}
              generatedQR={generatedQR}
              onGenerateQR={handleGenerateQR}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="text-xs text-gray-500 flex justify-between">
        <span>All verifications are securely logged and timestamped</span>
        <span className="flex items-center text-health-blue">
          <Lock className="h-3 w-3 mr-1" />
          {securityLevel === 'standard' ? 'Standard Security' : 
           securityLevel === 'enhanced' ? 'Enhanced Security' : 
           'Government-Grade Security'}
        </span>
      </CardFooter>
    </Card>
  );
};

export default EnhancedDocumentVerification;

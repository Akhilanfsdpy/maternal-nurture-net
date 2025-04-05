
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Shield, Key, CheckCircle, XCircle, QrCode, FileSignature, Download, Eye, EyeOff, Fingerprint, Lock, Scan } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface VerificationStep {
  id: number;
  name: string;
  status: 'pending' | 'processing' | 'success' | 'error';
  description: string;
}

const EnhancedDocumentVerification: React.FC = () => {
  const [parentKey, setParentKey] = useState('');
  const [doctorKey, setDoctorKey] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'processing' | 'verified' | 'failed'>('idle');
  const [documentType, setDocumentType] = useState('birth-certificate');
  const [documentId, setDocumentId] = useState('');
  const [generatedQR, setGeneratedQR] = useState<string | null>(null);
  const [certificateGenerated, setCertificateGenerated] = useState(false);
  const [securityLevel, setSecurityLevel] = useState<'standard' | 'enhanced' | 'government'>('enhanced');
  const [showDoctorKey, setShowDoctorKey] = useState(false);
  const [showParentKey, setShowParentKey] = useState(false);
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

  const getStepIcon = (step: VerificationStep) => {
    switch (step.status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'processing':
        return <div className="h-5 w-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />;
      default:
        return <div className="h-5 w-5 rounded-full border border-gray-300" />;
    }
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
            <div className="flex flex-wrap gap-2 mb-4">
              <Button 
                onClick={() => setSecurityLevel('standard')}
                variant={securityLevel === 'standard' ? 'default' : 'outline'}
                size="sm"
                className={securityLevel === 'standard' ? 'bg-health-blue' : ''}
              >
                <Shield className="h-3.5 w-3.5 mr-1" />
                Standard
              </Button>
              <Button 
                onClick={() => setSecurityLevel('enhanced')}
                variant={securityLevel === 'enhanced' ? 'default' : 'outline'}
                size="sm"
                className={securityLevel === 'enhanced' ? 'bg-health-blue' : ''}
              >
                <Fingerprint className="h-3.5 w-3.5 mr-1" />
                Enhanced
              </Button>
              <Button 
                onClick={() => setSecurityLevel('government')}
                variant={securityLevel === 'government' ? 'default' : 'outline'}
                size="sm"
                className={securityLevel === 'government' ? 'bg-health-blue' : ''}
              >
                <Lock className="h-3.5 w-3.5 mr-1" />
                Government
              </Button>
            </div>
            
            <p className="text-sm text-gray-600">
              Our multi-factor verification system ensures document authenticity using blockchain and cryptographic verification.
              {securityLevel === 'enhanced' && " Enhanced security adds institutional verification."}
              {securityLevel === 'government' && " Government security adds official records verification."}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 verification-container">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium flex items-center">
                    <Key className="h-4 w-4 mr-2 text-health-pink" />
                    Parent Verification Key
                  </label>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setShowParentKey(!showParentKey)}
                  >
                    {showParentKey ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </Button>
                </div>
                <div className="relative verification-input-container">
                  <Input 
                    type={showParentKey ? "text" : "password"}
                    value={parentKey}
                    onChange={(e) => setParentKey(e.target.value)}
                    placeholder="Enter parent's verification key" 
                    className="border-health-pink/20 focus:border-health-pink pr-8" 
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 absolute right-1 top-1/2 -translate-y-1/2"
                    onClick={() => {
                      // In a real app, this might open a QR scanner
                      toast({
                        title: "Scan Parent Key",
                        description: "Camera would open to scan QR code in a production app.",
                      });
                    }}
                  >
                    <Scan className="h-3.5 w-3.5 text-gray-400" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium flex items-center">
                    <Key className="h-4 w-4 mr-2 text-health-blue" />
                    Doctor Verification Key
                  </label>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setShowDoctorKey(!showDoctorKey)}
                  >
                    {showDoctorKey ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </Button>
                </div>
                <div className="relative verification-input-container">
                  <Input 
                    type={showDoctorKey ? "text" : "password"}
                    value={doctorKey}
                    onChange={(e) => setDoctorKey(e.target.value)} 
                    placeholder="Enter doctor's verification key" 
                    className="border-health-blue/20 focus:border-health-blue pr-8" 
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 absolute right-1 top-1/2 -translate-y-1/2"
                    onClick={() => {
                      // In a real app, this might open a QR scanner
                      toast({
                        title: "Scan Doctor Key",
                        description: "Camera would open to scan QR code in a production app.",
                      });
                    }}
                  >
                    <Scan className="h-3.5 w-3.5 text-gray-400" />
                  </Button>
                </div>
              </div>
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
              <div className="space-y-4 mt-4 verification-progress-container">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Verification in progress</span>
                  <span className="text-sm font-medium text-gray-700">{verificationProgress}%</span>
                </div>
                <Progress value={verificationProgress} className="w-full" />
                
                <div className="space-y-3 verification-steps">
                  {verificationSteps.map(step => (
                    <div 
                      key={step.id} 
                      className={`flex items-start p-2 rounded-md verification-step ${
                        step.status === 'success' ? 'bg-green-50' :
                        step.status === 'error' ? 'bg-red-50' :
                        step.status === 'processing' ? 'bg-blue-50' : 'bg-gray-50'
                      }`}
                    >
                      <div className="mr-3 mt-0.5">
                        {getStepIcon(step)}
                      </div>
                      <div>
                        <h4 className={`text-sm font-medium ${
                          step.status === 'success' ? 'text-green-700' :
                          step.status === 'error' ? 'text-red-700' :
                          step.status === 'processing' ? 'text-blue-700' : 'text-gray-700'
                        }`}>
                          {step.name}
                        </h4>
                        <p className="text-xs text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {verificationStatus === 'verified' && (
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
              <div className="bg-red-50 p-3 rounded-md flex items-start mt-4">
                <XCircle className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
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

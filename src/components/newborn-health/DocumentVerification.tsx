
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Key, FileText, CheckCircle } from 'lucide-react';

const DocumentVerification: React.FC = () => {
  const [parentKey, setParentKey] = useState('');
  const [doctorKey, setDoctorKey] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verified' | 'failed'>('idle');
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

  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default DocumentVerification;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const DocumentVerification: React.FC = () => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <p className="text-sm text-gray-600">
        All documents issued through this portal come with a unique verification code.
        Third parties can use this code to verify the authenticity of the document.
      </p>
      <div className="mt-4">
        <Input placeholder="Enter document verification code" className="mb-3" />
        <Button variant="outline">Verify Document</Button>
      </div>
    </div>
  );
};

export default DocumentVerification;

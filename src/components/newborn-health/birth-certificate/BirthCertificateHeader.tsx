
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const BirthCertificateHeader: React.FC = () => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center">
        <FileText className="mr-2 h-5 w-5 text-health-pink" />
        Digital Birth Certificate
      </CardTitle>
      <CardDescription>
        Create an official digital birth certificate for your child
      </CardDescription>
    </CardHeader>
  );
};

export default BirthCertificateHeader;

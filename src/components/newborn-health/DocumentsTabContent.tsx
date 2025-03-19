
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import DocumentList, { Document } from './DocumentList';
import DocumentRequestForm from './DocumentRequestForm';
import DocumentVerification from './DocumentVerification';
import { z } from 'zod';

const formSchema = z.object({
  childName: z.string().min(2, {
    message: "Child's name must be at least 2 characters.",
  }),
  requestReason: z.string().min(5, {
    message: "Please provide a reason for your request.",
  }),
});

const DocumentsTabContent: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      name: 'Digital Birth Certificate',
      description: 'Official birth registration document',
      issueDate: '2023-11-15',
      expiryDate: null,
      status: 'issued',
      downloadUrl: '#',
    },
    {
      id: 2,
      name: 'Immunization Record',
      description: 'Record of all vaccinations',
      issueDate: '2023-11-20',
      expiryDate: null,
      status: 'issued',
      downloadUrl: '#',
    },
    {
      id: 3,
      name: 'Health Insurance Card',
      description: 'Healthcare coverage document',
      issueDate: null,
      expiryDate: null,
      status: 'pending',
    },
    {
      id: 4,
      name: 'Early Education ID',
      description: 'Registration for early childhood education',
      issueDate: null,
      expiryDate: null,
      status: 'available',
    },
  ]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // Here you would typically send this request to your backend
    alert('Document request submitted successfully!');
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Digital Documents</CardTitle>
          <CardDescription>Manage important documents for your child</CardDescription>
        </CardHeader>
        <CardContent>
          <DocumentList documents={documents} />
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Request New Document</CardTitle>
          <CardDescription>Submit a request for additional documents</CardDescription>
        </CardHeader>
        <CardContent>
          <DocumentRequestForm onSubmit={handleSubmit} />
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Document Verification</CardTitle>
          <CardDescription>Verify the authenticity of your child's documents</CardDescription>
        </CardHeader>
        <CardContent>
          <DocumentVerification />
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentsTabContent;


import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Eye, CheckCircle, Clock, PlusCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  childName: z.string().min(2, {
    message: "Child's name must be at least 2 characters.",
  }),
  requestReason: z.string().min(5, {
    message: "Please provide a reason for your request.",
  }),
});

type DocumentStatus = 'issued' | 'pending' | 'available';

interface Document {
  id: number;
  name: string;
  description: string;
  issueDate: string | null;
  expiryDate: string | null;
  status: DocumentStatus;
  downloadUrl?: string;
}

const DocumentsTabContent: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      childName: '',
      requestReason: '',
    },
  });
  
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // Here you would typically send this request to your backend
    alert('Document request submitted successfully!');
    form.reset();
  };

  const getStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case 'issued':
        return (
          <span className="flex items-center text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3.5 w-3.5" />
            Issued
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800">
            <Clock className="mr-1 h-3.5 w-3.5" />
            Processing
          </span>
        );
      case 'available':
        return (
          <span className="flex items-center text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
            <PlusCircle className="mr-1 h-3.5 w-3.5" />
            Available to Request
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Digital Documents</CardTitle>
          <CardDescription>Manage important documents for your child</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Available Documents</h3>
            <div className="grid gap-4">
              {documents.map((doc) => (
                <div 
                  key={doc.id} 
                  className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all flex justify-between items-center"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-health-light-pink/10 rounded-md">
                      <FileText className="h-5 w-5 text-health-pink" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{doc.name}</h4>
                      <p className="text-sm text-gray-500">{doc.description}</p>
                      {doc.issueDate && (
                        <p className="text-xs text-gray-500 mt-1">
                          Issued: {doc.issueDate}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(doc.status)}
                    {doc.status === 'issued' && doc.downloadUrl && (
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    )}
                    {doc.status === 'available' && (
                      <Button size="sm" variant="outline">
                        <PlusCircle className="h-4 w-4 mr-1" />
                        Request
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Request New Document</CardTitle>
          <CardDescription>Submit a request for additional documents</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="childName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Child's Full Name (as it should appear on documents)</FormLabel>
                    <FormControl>
                      <Input placeholder="Full legal name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="requestReason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Request</FormLabel>
                    <FormControl>
                      <Input placeholder="Brief explanation for requesting documents" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-gradient-to-r from-health-pink to-health-light-pink">
                Submit Request
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Document Verification</CardTitle>
          <CardDescription>Verify the authenticity of your child's documents</CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentsTabContent;

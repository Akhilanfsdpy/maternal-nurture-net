
import React from 'react';
import { Eye, Download, CheckCircle, Clock, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Document {
  id: number;
  name: string;
  description: string;
  issueDate: string | null;
  status: 'issued' | 'processing' | 'available';
}

const documents: Document[] = [
  {
    id: 1,
    name: 'Digital Birth Certificate',
    description: 'Official birth registration document',
    issueDate: '2023-11-15',
    status: 'issued',
  },
  {
    id: 2,
    name: 'Immunization Record',
    description: 'Record of all vaccinations',
    issueDate: '2023-11-20',
    status: 'issued',
  },
  {
    id: 3,
    name: 'Health Insurance Card',
    description: 'Healthcare coverage document',
    issueDate: null,
    status: 'processing',
  },
  {
    id: 4,
    name: 'Early Education ID',
    description: 'Registration for early childhood education',
    issueDate: null,
    status: 'available',
  },
];

const EnhancedDocumentsTabContent: React.FC = () => {
  const getStatusBadge = (status: 'issued' | 'processing' | 'available') => {
    switch (status) {
      case 'issued':
        return (
          <div className="flex items-center bg-green-100 text-green-800 rounded-full px-3 py-1">
            <CheckCircle className="h-4 w-4 mr-1" />
            <span className="text-sm">Issued</span>
          </div>
        );
      case 'processing':
        return (
          <div className="flex items-center bg-yellow-100 text-yellow-800 rounded-full px-3 py-1">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm">Processing</span>
          </div>
        );
      case 'available':
        return (
          <div className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1">
            <PlusCircle className="h-4 w-4 mr-1" />
            <span className="text-sm">Available to Request</span>
          </div>
        );
    }
  };

  const renderDocumentActions = (document: Document) => {
    if (document.status === 'issued') {
      return (
        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
          <Button variant="outline" size="sm" className="flex items-center">
            <Eye className="h-4 w-4 mr-1" /> View
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <Download className="h-4 w-4 mr-1" /> Download
          </Button>
        </div>
      );
    } else if (document.status === 'available') {
      return (
        <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
          <PlusCircle className="h-4 w-4 mr-1" /> Request
        </Button>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Digital Documents</h2>
        <p className="text-gray-500">Manage important documents for your child</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Available Documents</h3>
        <div className="space-y-4">
          {documents.map((doc) => (
            <div 
              key={doc.id}
              className="border rounded-lg p-4 bg-white shadow-sm flex flex-col sm:flex-row justify-between"
            >
              <div className="flex items-start">
                <div className="text-pink-400 mr-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-lg">{doc.name}</h4>
                  <p className="text-gray-500">{doc.description}</p>
                  {doc.issueDate && (
                    <p className="text-sm text-gray-500 mt-1">Issued: {doc.issueDate}</p>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4 sm:mt-0">
                {getStatusBadge(doc.status)}
                {renderDocumentActions(doc)}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t pt-8">
        <h2 className="text-xl font-semibold mb-2">Request New Document</h2>
        <p className="text-gray-500 mb-4">Submit a request for additional documents</p>
        
        <Button className="w-full sm:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          Request New Document
        </Button>
      </div>
    </div>
  );
};

export default EnhancedDocumentsTabContent;

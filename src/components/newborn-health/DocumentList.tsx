
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Download, Eye, CheckCircle, Clock, PlusCircle } from 'lucide-react';

export type DocumentStatus = 'issued' | 'pending' | 'available';

export interface Document {
  id: number;
  name: string;
  description: string;
  issueDate: string | null;
  expiryDate: string | null;
  status: DocumentStatus;
  downloadUrl?: string;
}

interface DocumentListProps {
  documents: Document[];
}

const DocumentList: React.FC<DocumentListProps> = ({ documents }) => {
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
  );
};

export default DocumentList;

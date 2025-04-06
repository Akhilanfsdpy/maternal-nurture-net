
import React from 'react';
import { FileText, Upload, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface DocumentUploaderProps {
  onCameraCapture: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  onCameraCapture,
  onFileChange
}) => {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
      <FileText className="h-10 w-10 mx-auto mb-4 text-gray-400" />
      <p className="text-gray-600 mb-1 font-medium">Upload a document or take a photo</p>
      <p className="text-xs text-gray-500 mb-4">
        Supports birth certificates, medical records, and prescriptions
      </p>
      <div className="flex justify-center gap-4">
        <Button 
          onClick={onCameraCapture}
          className="bg-health-blue"
        >
          <Camera className="mr-2 h-4 w-4" /> Use Camera
        </Button>
        <div>
          <Label 
            htmlFor="document-upload"
            className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            <Upload className="mr-2 h-4 w-4" /> Select File
          </Label>
          <input
            id="document-upload"
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            onChange={onFileChange}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentUploader;

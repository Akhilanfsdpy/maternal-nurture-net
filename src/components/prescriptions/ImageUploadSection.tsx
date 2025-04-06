
import React from 'react';
import { Upload, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface ImageUploadSectionProps {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  startCameraCapture: () => void;
}

const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({
  handleFileChange,
  startCameraCapture
}) => {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
      <Upload className="h-8 w-8 mx-auto mb-4 text-gray-400" />
      <p className="text-gray-600 mb-2">Upload a prescription image</p>
      <p className="text-xs text-gray-500 mb-4">
        Supported formats: JPG, PNG, PDF
      </p>
      <div className="flex justify-center gap-4">
        <Button 
          onClick={startCameraCapture}
          className="bg-health-blue"
        >
          <Camera className="mr-2 h-4 w-4" /> Use Camera
        </Button>
        <div>
          <Label 
            htmlFor="prescription-upload"
            className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Select Image
          </Label>
          <input
            id="prescription-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageUploadSection;

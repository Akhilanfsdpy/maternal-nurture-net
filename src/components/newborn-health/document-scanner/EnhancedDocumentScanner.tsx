
import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';

import DocumentTypeSelector from './DocumentTypeSelector';
import DocumentUploader from './DocumentUploader';
import CameraCapture from './CameraCapture';
import ScanningProgress from './ScanningProgress';
import ScannedDocumentView from './ScannedDocumentView';
import RecognizedFieldsEditor from './RecognizedFieldsEditor';

type DocumentType = 'birth-certificate' | 'medical-record' | 'growth-chart' | 'prescription';

const EnhancedDocumentScanner: React.FC = () => {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [scannedText, setScannedText] = useState('');
  const [scanProgress, setScanProgress] = useState(0);
  const [usingCamera, setUsingCamera] = useState(false);
  const [enhancedScan, setEnhancedScan] = useState(true);
  const [documentType, setDocumentType] = useState<DocumentType>('birth-certificate');
  const [recognizedFields, setRecognizedFields] = useState<Record<string, string>>({});
  const [confidence, setConfidence] = useState(0);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Preview the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // In a real app, this would send the image to an OCR service
    simulateOCRProcess();
  };
  
  const simulateOCRProcess = () => {
    setIsScanning(true);
    setScanProgress(0);
    setConfidence(0);
    
    // Simulate progressive OCR scanning
    const interval = setInterval(() => {
      setScanProgress(prev => {
        const newProgress = prev + 5;
        setConfidence(Math.min(newProgress * 0.9, 95));
        
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Simulate final OCR results based on document type
          setTimeout(() => {
            let mockText = '';
            let fields: Record<string, string> = {};
            
            switch(documentType) {
              case 'birth-certificate':
                mockText = "CERTIFICATE OF LIVE BIRTH\n\nChild's Name: Emma Johnson\nDate of Birth: May 15, 2023\nTime of Birth: 08:45 AM\nSex: Female\nWeight: 3.4 kg\nPlace of Birth: Memorial Hospital\n\nMother's Name: Sarah Johnson\nFather's Name: Michael Johnson\n\nCertificate Number: BC-2023-54321";
                fields = {
                  "Child's Name": "Emma Johnson",
                  "Date of Birth": "May 15, 2023",
                  "Weight": "3.4 kg",
                  "Mother's Name": "Sarah Johnson",
                  "Father's Name": "Michael Johnson",
                  "Certificate Number": "BC-2023-54321"
                };
                break;
              case 'medical-record':
                mockText = "PEDIATRIC VISIT SUMMARY\n\nPatient: Noah Williams\nDOB: January 10, 2023\nVisit Date: June 2, 2023\n\nWeight: 5.8 kg (50th percentile)\nHeight: 62 cm (65th percentile)\nHead Circumference: 41 cm (60th percentile)\n\nVaccinations: DTaP (1st dose), IPV (1st dose)\n\nAssessment: Healthy development, no concerns";
                fields = {
                  "Patient": "Noah Williams",
                  "DOB": "January 10, 2023",
                  "Visit Date": "June 2, 2023",
                  "Weight": "5.8 kg (50th percentile)",
                  "Height": "62 cm (65th percentile)",
                  "Head Circumference": "41 cm (60th percentile)",
                  "Vaccinations": "DTaP (1st dose), IPV (1st dose)"
                };
                break;
              case 'prescription':
                mockText = "PRESCRIPTION\n\nPatient: Olivia Garcia\nDate: June 5, 2023\n\nRx:\n1. Amoxicillin Suspension 250mg/5mL\n   Give 5mL orally twice daily for 10 days\n\n2. Infant Acetaminophen 160mg/5mL\n   Give 2.5mL every 4-6 hours as needed for fever\n   Do not exceed 5 doses in 24 hours\n\nDr. Emma Wilson, M.D.\nPediatric License: P12345";
                fields = {
                  "Patient": "Olivia Garcia",
                  "Date": "June 5, 2023",
                  "Medication 1": "Amoxicillin Suspension 250mg/5mL",
                  "Dosage 1": "5mL orally twice daily for 10 days",
                  "Medication 2": "Infant Acetaminophen 160mg/5mL",
                  "Dosage 2": "2.5mL every 4-6 hours as needed for fever",
                  "Doctor": "Dr. Emma Wilson, M.D."
                };
                break;
              default:
                mockText = "GROWTH CHART\n\nName: Liam Rodriguez\nDOB: March 3, 2023\n\nDate: June 1, 2023\nAge: 3 months\nWeight: 6.2 kg (60th percentile)\nLength: 61 cm (55th percentile)\nHead Circumference: 40.5 cm (65th percentile)";
                fields = {
                  "Name": "Liam Rodriguez",
                  "DOB": "March 3, 2023",
                  "Age": "3 months",
                  "Weight": "6.2 kg (60th percentile)",
                  "Length": "61 cm (55th percentile)",
                  "Head Circumference": "40.5 cm (65th percentile)"
                };
            }
            
            setScannedText(mockText);
            setRecognizedFields(fields);
            setIsScanning(false);
            
            toast({
              title: "Scan Complete",
              description: `Document successfully scanned with ${confidence.toFixed(1)}% confidence.`,
            });
          }, 500);
        }
        return newProgress;
      });
    }, 200);
  };
  
  const startCameraCapture = () => {
    setUsingCamera(true);
    toast({
      title: "Camera Access",
      description: "Camera access would be requested here in a production app.",
    });
  };
  
  const cancelCameraCapture = () => {
    setUsingCamera(false);
  };
  
  const takePicture = () => {
    setUsingCamera(false);
    setImagePreview("https://placehold.co/400x300/png");
    simulateOCRProcess();
  };

  const exportToSystem = () => {
    toast({
      title: "Document Exported",
      description: "The recognized document has been exported to your health records.",
    });
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 text-health-blue mr-2" />
          Document Scanner
        </CardTitle>
        <CardDescription>
          Scan and digitize baby health documents with OCR technology
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-4 mb-4">
          <DocumentTypeSelector 
            documentType={documentType}
            setDocumentType={setDocumentType}
          />
          <div className="flex items-center space-x-2 mt-auto">
            <Switch
              checked={enhancedScan}
              onCheckedChange={setEnhancedScan}
              id="enhanced-scanning"
            />
            <Label htmlFor="enhanced-scanning" className="text-sm cursor-pointer">
              Enhanced Scanning
            </Label>
          </div>
        </div>
        
        {usingCamera ? (
          <CameraCapture 
            onCancel={cancelCameraCapture} 
            onCapture={takePicture} 
          />
        ) : !imagePreview ? (
          <DocumentUploader 
            onCameraCapture={startCameraCapture} 
            onFileChange={handleFileChange} 
          />
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <ScannedDocumentView 
                  imagePreview={imagePreview} 
                  onChangeImage={() => {
                    setImagePreview(null);
                    setScannedText('');
                    setRecognizedFields({});
                  }}
                  isScanning={isScanning}
                  scanProgress={scanProgress}
                  confidence={confidence}
                  scannedText={scannedText}
                  setScannedText={setScannedText}
                />
              </div>
              
              {Object.keys(recognizedFields).length > 0 && (
                <RecognizedFieldsEditor 
                  recognizedFields={recognizedFields}
                  setRecognizedFields={setRecognizedFields}
                  confidence={confidence}
                  onExport={exportToSystem}
                />
              )}
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="text-xs text-gray-500 flex items-center justify-between flex-wrap">
        <span>Document OCR helps digitize important health information for your records.</span>
        {enhancedScan && (
          <span className="text-health-blue flex items-center">
            <Check className="h-3 w-3 mr-1" />
            Enhanced scanning enabled
          </span>
        )}
      </CardFooter>
    </Card>
  );
};

export default EnhancedDocumentScanner;


import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';

import DocumentTypeSelector from './DocumentTypeSelector';
import DocumentUploader from './DocumentUploader';
import RecognizedFieldsEditor from './RecognizedFieldsEditor';
import ScannedDocumentView from './ScannedDocumentView';
import CameraCapture from '@/components/shared/document-scanner/CameraCapture';
import ScanningProgress from '@/components/shared/document-scanner/ScanningProgress';
import { useDocumentScanner, simulateDocumentCapture } from '@/utils/document-scanner/scanningUtils';
import { ScanProgress } from '@/utils/document-scanner/types';

type DocumentType = 'birth-certificate' | 'medical-record' | 'growth-chart' | 'prescription';

const EnhancedDocumentScanner: React.FC = () => {
  const { toast } = useToast();
  const { simulateScanProgress, processScanResults } = useDocumentScanner();
  const [isScanning, setIsScanning] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [scannedText, setScannedText] = useState('');
  const [scanProgress, setScanProgress] = useState<ScanProgress>({ progress: 0 });
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
    
    // Start scanning process
    startScanningProcess();
  };
  
  const startScanningProcess = async () => {
    setIsScanning(true);
    setScanProgress({ progress: 0 });
    setConfidence(0);
    
    await simulateScanProgress(
      (progress) => {
        setScanProgress(progress);
        setConfidence(progress.confidence || 0);
      },
      2000,
      10
    );
    
    const result = processScanResults(
      imagePreview || '',
      documentType,
      { enhancedMode: enhancedScan }
    );
    
    setScannedText(result.scannedText);
    setRecognizedFields(result.fields || {});
    setConfidence(result.confidence || 95);
    setIsScanning(false);
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
    setImagePreview(simulateDocumentCapture());
    startScanningProcess();
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
                {isScanning ? (
                  <ScanningProgress
                    imagePreview={imagePreview}
                    scanProgress={scanProgress}
                    onChangeImage={() => setImagePreview(null)}
                  />
                ) : (
                  <ScannedDocumentView 
                    imagePreview={imagePreview} 
                    onChangeImage={() => {
                      setImagePreview(null);
                      setScannedText('');
                      setRecognizedFields({});
                    }}
                    isScanning={isScanning}
                    scanProgress={scanProgress.progress}
                    confidence={confidence}
                    scannedText={scannedText}
                    setScannedText={setScannedText}
                  />
                )}
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

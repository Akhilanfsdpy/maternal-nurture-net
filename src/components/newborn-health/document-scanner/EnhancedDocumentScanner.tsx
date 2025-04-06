
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import CameraCapture from '@/components/shared/document-scanner/CameraCapture';
import DocumentUploader from './DocumentUploader';
import { useDocumentScanner, simulateDocumentCapture } from '@/utils/document-scanner/scanningUtils';
import { ScanProgress } from '@/utils/document-scanner/types';
import ScannerHeader from './ScannerHeader';
import ScannerOptions from './ScannerOptions';
import ScannerResults from './ScannerResults';
import ScannerFooter from './ScannerFooter';

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
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
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

  const handleChangeImage = () => {
    setImagePreview(null);
    setScannedText('');
    setRecognizedFields({});
  };
  
  return (
    <Card className="shadow-sm">
      <ScannerHeader />
      <CardContent className="space-y-6">
        <ScannerOptions
          documentType={documentType}
          setDocumentType={setDocumentType}
          enhancedScan={enhancedScan}
          setEnhancedScan={setEnhancedScan}
        />
        
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
          <ScannerResults
            imagePreview={imagePreview}
            scannedText={scannedText}
            setScannedText={setScannedText}
            recognizedFields={recognizedFields}
            setRecognizedFields={setRecognizedFields}
            isScanning={isScanning}
            scanProgress={scanProgress}
            confidence={confidence}
            onChangeImage={handleChangeImage}
            onExport={exportToSystem}
          />
        )}
      </CardContent>
      <ScannerFooter enhancedScan={enhancedScan} />
    </Card>
  );
};

export default EnhancedDocumentScanner;

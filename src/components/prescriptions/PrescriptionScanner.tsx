
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Scan, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ScannedMedication } from '@/types/prescriptions';
import ImageUploadSection from './ImageUploadSection';
import ScannedResultView from './ScannedResultView';
import CameraCapture from '@/components/shared/document-scanner/CameraCapture';
import ScanningProgress from '@/components/shared/document-scanner/ScanningProgress';
import { useDocumentScanner, simulateDocumentCapture } from '@/utils/document-scanner/scanningUtils';
import { ScanProgress } from '@/utils/document-scanner/types';

const PrescriptionScanner: React.FC = () => {
  const { toast } = useToast();
  const { simulateScanProgress, processScanResults } = useDocumentScanner();
  const [isScanning, setIsScanning] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [scannedText, setScannedText] = useState('');
  const [scannedMedications, setScannedMedications] = useState<ScannedMedication[]>([]);
  const [scanProgress, setScanProgress] = useState<ScanProgress>({ progress: 0 });
  const [usingCamera, setUsingCamera] = useState(false);
  
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
    
    await simulateScanProgress(
      (progress) => setScanProgress(progress),
      2000,
      10
    );
    
    const result = processScanResults(imagePreview || '', 'prescription');
    setScannedText(result.scannedText);
    
    // Convert the fields to medications
    const mockMedications = [
      { name: "Amoxicillin Suspension", dosage: "250mg/5mL - 5mL", frequency: "Twice daily" },
      { name: "Infant Acetaminophen", dosage: "160mg/5mL - 2.5mL", frequency: "Every 4-6 hours as needed" }
    ];
    setScannedMedications(mockMedications);
    setIsScanning(false);
  };
  
  const handleAddToMedications = () => {
    toast({
      title: "Medications Added",
      description: `${scannedMedications.length} medications have been added to your tracking list.`,
    });
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
  
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scan className="h-5 w-5 text-health-blue" />
          Prescription Scanner
        </CardTitle>
        <CardDescription>
          Take a photo of your prescription to automatically track your medications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {usingCamera ? (
          <CameraCapture
            onCancel={cancelCameraCapture}
            onCapture={takePicture}
          />
        ) : !imagePreview ? (
          <ImageUploadSection
            handleFileChange={handleFileChange}
            startCameraCapture={startCameraCapture}
          />
        ) : (
          <>
            {isScanning ? (
              <ScanningProgress
                imagePreview={imagePreview}
                scanProgress={scanProgress}
                onChangeImage={() => setImagePreview(null)}
              />
            ) : (
              <ScannedResultView
                imagePreview={imagePreview}
                scannedText={scannedText}
                scannedMedications={scannedMedications}
                setImagePreview={setImagePreview}
                setScannedText={setScannedText}
                setScannedMedications={setScannedMedications}
              />
            )}
          </>
        )}
      </CardContent>
      {scannedMedications.length > 0 && (
        <CardFooter>
          <Button 
            onClick={handleAddToMedications} 
            className="w-full bg-gradient-to-r from-health-blue to-health-light-blue"
          >
            <Check className="mr-2 h-4 w-4" />
            Add to Medication Tracker
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default PrescriptionScanner;

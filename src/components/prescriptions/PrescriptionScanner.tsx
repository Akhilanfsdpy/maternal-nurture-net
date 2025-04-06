import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Scan, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ScannedMedication } from '@/types/prescriptions';
import ImageUploadSection from './ImageUploadSection';
import ScanningProgress from './ScanningProgress';
import ScannedResultView from './ScannedResultView';
import CameraCapture from './CameraCapture';

const PrescriptionScanner: React.FC = () => {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [scannedText, setScannedText] = useState('');
  const [scannedMedications, setScannedMedications] = useState<ScannedMedication[]>([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [usingCamera, setUsingCamera] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    simulateOCRProcess();
  };
  
  const simulateOCRProcess = () => {
    setIsScanning(true);
    setScanProgress(0);
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          
          const mockScannedText = "Prescription\n\nPatient: Jane Doe\nDate: 2023-07-15\n\nMedications:\n1. Prenatal Vitamins - 1 tablet daily\n2. Iron Supplement - 25mg twice daily\n3. Calcium Citrate - 500mg with meals";
          setScannedText(mockScannedText);
          
          const mockMedications = [
            { name: "Prenatal Vitamins", dosage: "1 tablet", frequency: "Daily" },
            { name: "Iron Supplement", dosage: "25mg", frequency: "Twice daily" },
            { name: "Calcium Citrate", dosage: "500mg", frequency: "With meals" }
          ];
          setScannedMedications(mockMedications);
          setIsScanning(false);
          
          toast({
            title: "Scan Complete",
            description: "Prescription successfully scanned and medications identified.",
          });
        }
        return newProgress;
      });
    }, 200);
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
    setImagePreview("https://placehold.co/400x300/png");
    simulateOCRProcess();
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
            cancelCameraCapture={cancelCameraCapture}
            takePicture={takePicture}
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
                setImagePreview={setImagePreview}
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

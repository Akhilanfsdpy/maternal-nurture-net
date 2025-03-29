
import React, { useState } from 'react';
import { Upload, Scan, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

interface ScannedMedication {
  name: string;
  dosage: string;
  frequency: string;
}

const PrescriptionScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [scannedText, setScannedText] = useState('');
  const [scannedMedications, setScannedMedications] = useState<ScannedMedication[]>([]);
  
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
    
    // Simulate a delay for OCR processing
    setTimeout(() => {
      const mockScannedText = "Prescription\n\nPatient: Jane Doe\nDate: 2023-07-15\n\nMedications:\n1. Prenatal Vitamins - 1 tablet daily\n2. Iron Supplement - 25mg twice daily\n3. Calcium Citrate - 500mg with meals";
      setScannedText(mockScannedText);
      
      // Extract medications from the scanned text
      const mockMedications = [
        { name: "Prenatal Vitamins", dosage: "1 tablet", frequency: "Daily" },
        { name: "Iron Supplement", dosage: "25mg", frequency: "Twice daily" },
        { name: "Calcium Citrate", dosage: "500mg", frequency: "With meals" }
      ];
      setScannedMedications(mockMedications);
      setIsScanning(false);
    }, 2000);
  };
  
  const handleAddToMedications = () => {
    // In a real app, this would save the medications to the user's profile
    toast({
      title: "Medications Added",
      description: `${scannedMedications.length} medications have been added to your tracking list.`,
    });
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
        {!imagePreview ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="h-8 w-8 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 mb-2">Upload a prescription image</p>
            <p className="text-xs text-gray-500 mb-4">
              Supported formats: JPG, PNG, PDF
            </p>
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
        ) : (
          <>
            <div className="space-y-4">
              <div className="relative">
                <img 
                  src={imagePreview} 
                  alt="Prescription" 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2 bg-white"
                  onClick={() => {
                    setImagePreview(null);
                    setScannedText('');
                    setScannedMedications([]);
                  }}
                >
                  Change
                </Button>
              </div>
              
              {isScanning ? (
                <div className="text-center p-4">
                  <div className="animate-pulse flex space-x-4 justify-center">
                    <div className="h-3 w-3 bg-health-blue rounded-full"></div>
                    <div className="h-3 w-3 bg-health-light-blue rounded-full"></div>
                    <div className="h-3 w-3 bg-health-blue rounded-full"></div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">Scanning prescription...</p>
                </div>
              ) : scannedText ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Scanned Text</label>
                    <Textarea 
                      value={scannedText}
                      onChange={(e) => setScannedText(e.target.value)}
                      rows={6}
                      className="w-full"
                    />
                  </div>
                  
                  {scannedMedications.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Detected Medications</h4>
                      <ul className="space-y-2">
                        {scannedMedications.map((med, index) => (
                          <li key={index} className="p-3 bg-gray-50 rounded-lg">
                            <p className="font-medium">{med.name}</p>
                            <p className="text-sm text-gray-600">{med.dosage} • {med.frequency}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : null}
            </div>
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

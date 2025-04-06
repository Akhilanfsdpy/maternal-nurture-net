
import React, { useState } from 'react';
import { Camera, FileText, Upload, X, Scan, Check, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const EnhancedDocumentScanner: React.FC = () => {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [scannedText, setScannedText] = useState('');
  const [scanProgress, setScanProgress] = useState(0);
  const [usingCamera, setUsingCamera] = useState(false);
  const [enhancedScan, setEnhancedScan] = useState(true);
  const [documentType, setDocumentType] = useState<'birth-certificate' | 'medical-record' | 'growth-chart' | 'prescription'>('birth-certificate');
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
    // In a real app, this would capture the image from the camera
    setUsingCamera(false);
    
    // For demo purposes, set a fake camera capture
    setImagePreview("https://placehold.co/400x300/png");
    simulateOCRProcess();
  };

  const exportToSystem = () => {
    // In a real app, this would export the document to the system
    toast({
      title: "Document Exported",
      description: "The recognized document has been exported to your health records.",
    });
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Scan className="h-5 w-5 text-health-blue mr-2" />
          Document Scanner
        </CardTitle>
        <CardDescription>
          Scan and digitize baby health documents with OCR technology
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-4 mb-4">
          <div>
            <Label className="text-sm font-medium">Document Type</Label>
            <select
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value as any)}
            >
              <option value="birth-certificate">Birth Certificate</option>
              <option value="medical-record">Medical Record</option>
              <option value="growth-chart">Growth Chart</option>
              <option value="prescription">Prescription</option>
            </select>
          </div>
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
          <div className="relative">
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <Camera className="h-12 w-12 mx-auto mb-2 animate-pulse" />
                <p>Camera Preview (Simulated)</p>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <Button 
                onClick={cancelCameraCapture}
                variant="outline"
                className="w-1/3"
              >
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
              <Button 
                onClick={takePicture}
                className="w-1/3 bg-health-blue"
              >
                <Camera className="mr-2 h-4 w-4" /> Capture
              </Button>
            </div>
          </div>
        ) : !imagePreview ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <FileText className="h-10 w-10 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 mb-1 font-medium">Upload a document or take a photo</p>
            <p className="text-xs text-gray-500 mb-4">
              Supports birth certificates, medical records, and prescriptions
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
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Document" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 bg-white"
                    onClick={() => {
                      setImagePreview(null);
                      setScannedText('');
                      setRecognizedFields({});
                    }}
                  >
                    Change
                  </Button>
                </div>
                
                {isScanning ? (
                  <div className="text-center p-4">
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Scanning document...</span>
                        <span className="text-sm font-medium text-gray-700">{scanProgress}%</span>
                      </div>
                      <Progress value={scanProgress} className="w-full" />
                    </div>
                    
                    {scanProgress > 30 && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Confidence</span>
                          <span className="text-sm font-medium text-gray-700">{confidence.toFixed(1)}%</span>
                        </div>
                        <Progress 
                          value={confidence} 
                          className={`w-full ${
                            confidence > 80 
                              ? 'bg-green-100' 
                              : confidence > 50 
                                ? 'bg-yellow-100' 
                                : 'bg-red-100'
                          }`}
                        />
                      </div>
                    )}
                    
                    <p className="mt-2 text-sm text-gray-600">
                      {scanProgress < 30 ? "Analyzing image..." : 
                       scanProgress < 60 ? "Detecting text regions..." : 
                       scanProgress < 90 ? "Identifying document fields..." : 
                       "Processing complete..."}
                    </p>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Scanned Text</label>
                    <Textarea 
                      value={scannedText}
                      onChange={(e) => setScannedText(e.target.value)}
                      rows={8}
                      className="w-full font-mono text-xs"
                    />
                  </div>
                )}
              </div>
              
              {Object.keys(recognizedFields).length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Recognized Fields</h4>
                    <div className="flex items-center">
                      <div className={`h-2 w-2 rounded-full mr-1.5 ${
                        confidence > 80 ? 'bg-green-500' : confidence > 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className="text-xs">
                        {confidence > 80 
                          ? 'High confidence' 
                          : confidence > 50 
                            ? 'Medium confidence' 
                            : 'Low confidence'
                        }
                      </span>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg divide-y">
                    {Object.entries(recognizedFields).map(([key, value], index) => (
                      <div key={index} className="p-3 flex justify-between items-start">
                        <div className="w-2/5">
                          <span className="text-sm text-gray-600">{key}</span>
                        </div>
                        <div className="w-3/5">
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => {
                              const newFields = {...recognizedFields};
                              newFields[key] = e.target.value;
                              setRecognizedFields(newFields);
                            }}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {confidence < 70 && (
                    <div className="flex items-start mt-3 p-2 bg-yellow-50 text-yellow-800 text-xs rounded-lg">
                      <AlertTriangle className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
                      <p>Some fields may have low recognition confidence. Please verify all information for accuracy.</p>
                    </div>
                  )}
                  
                  <div className="mt-4">
                    <Button 
                      onClick={exportToSystem} 
                      className="w-full bg-gradient-to-r from-health-blue to-health-light-blue"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Save to Health Records
                    </Button>
                  </div>
                </div>
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

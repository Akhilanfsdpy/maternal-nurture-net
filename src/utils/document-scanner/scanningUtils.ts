
import { useToast } from '@/hooks/use-toast';
import { ScannedDocument, ScanProgress, ScanningOptions } from './types';

export const useDocumentScanner = () => {
  const { toast } = useToast();

  const simulateScanProgress = (
    onProgress: (progress: ScanProgress) => void, 
    duration = 2000, 
    steps = 10
  ): Promise<void> => {
    return new Promise((resolve) => {
      let step = 0;
      const interval = setInterval(() => {
        step++;
        const progress = Math.min((step / steps) * 100, 100);
        const confidence = Math.min(progress * 0.95, 95);
        
        let stage = "Analyzing image...";
        if (progress > 30) stage = "Detecting text regions...";
        if (progress > 60) stage = "Identifying document fields...";
        if (progress > 90) stage = "Processing complete...";
        
        onProgress({ progress, confidence, stage });
        
        if (progress >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, duration / steps);
    });
  };

  const processScanResults = (
    imagePreview: string,
    documentType: string,
    options: ScanningOptions = {}
  ): ScannedDocument => {
    let mockText = '';
    let fields: Record<string, string> = {};
    let confidence = 95;
    
    // Generic document types
    if (documentType === 'prescription') {
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
    } else if (documentType === 'birth-certificate') {
      mockText = "CERTIFICATE OF LIVE BIRTH\n\nChild's Name: Emma Johnson\nDate of Birth: May 15, 2023\nTime of Birth: 08:45 AM\nSex: Female\nWeight: 3.4 kg\nPlace of Birth: Memorial Hospital\n\nMother's Name: Sarah Johnson\nFather's Name: Michael Johnson\n\nCertificate Number: BC-2023-54321";
      fields = {
        "Child's Name": "Emma Johnson",
        "Date of Birth": "May 15, 2023",
        "Weight": "3.4 kg",
        "Mother's Name": "Sarah Johnson",
        "Father's Name": "Michael Johnson",
        "Certificate Number": "BC-2023-54321"
      };
    } else if (documentType === 'medical-record') {
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
    } else if (documentType === 'growth-chart') {
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
    
    if (options.enhancedMode) {
      confidence = 98; // Higher confidence with enhanced mode
    }
    
    toast({
      title: "Scan Complete",
      description: `Document successfully scanned with ${confidence.toFixed(1)}% confidence.`,
    });
    
    return {
      imagePreview,
      scannedText: mockText,
      confidence,
      fields,
    };
  };

  return {
    simulateScanProgress,
    processScanResults
  };
};

// Helper function for simulating document capture
export const simulateDocumentCapture = () => {
  // In a real app, this would capture an image from the camera
  return "https://placehold.co/400x300/png";
};


import React from 'react';
import { Pill } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScannedMedication } from '@/types/prescriptions';

interface ScannedResultViewProps {
  imagePreview: string;
  scannedText: string;
  scannedMedications: ScannedMedication[];
  setImagePreview: (value: string | null) => void;
  setScannedText: (value: string) => void;
  setScannedMedications: (value: ScannedMedication[]) => void;
}

const ScannedResultView: React.FC<ScannedResultViewProps> = ({
  imagePreview,
  scannedText,
  scannedMedications,
  setImagePreview,
  setScannedText,
  setScannedMedications
}) => {
  const handleReset = () => {
    setImagePreview(null);
    setScannedText('');
    setScannedMedications([]);
  };
  
  return (
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
          onClick={handleReset}
        >
          Change
        </Button>
      </div>
      
      {scannedText && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Scanned Text</label>
          <Textarea 
            value={scannedText}
            onChange={(e) => setScannedText(e.target.value)}
            rows={6}
            className="w-full"
          />
        </div>
      )}
      
      {scannedMedications.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">Detected Medications</h4>
          <ul className="space-y-2">
            {scannedMedications.map((med, index) => (
              <li key={index} className="p-3 bg-gray-50 rounded-lg flex items-start">
                <Pill className="h-5 w-5 text-health-blue mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">{med.name}</p>
                  <p className="text-sm text-gray-600">{med.dosage} • {med.frequency}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ScannedResultView;

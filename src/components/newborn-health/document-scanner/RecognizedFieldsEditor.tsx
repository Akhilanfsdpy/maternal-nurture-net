
import React from 'react';
import { AlertTriangle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RecognizedFieldsEditorProps {
  recognizedFields: Record<string, string>;
  setRecognizedFields: (fields: Record<string, string>) => void;
  confidence: number;
  onExport: () => void;
}

const RecognizedFieldsEditor: React.FC<RecognizedFieldsEditorProps> = ({
  recognizedFields,
  setRecognizedFields,
  confidence,
  onExport
}) => {
  return (
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
          onClick={onExport} 
          className="w-full bg-gradient-to-r from-health-blue to-health-light-blue"
        >
          <Check className="mr-2 h-4 w-4" />
          Save to Health Records
        </Button>
      </div>
    </div>
  );
};

export default RecognizedFieldsEditor;

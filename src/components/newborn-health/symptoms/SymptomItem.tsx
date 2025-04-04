
import React from 'react';
import { Calendar, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Symptom } from './types';

interface SymptomItemProps {
  symptom: Symptom;
  onDelete: (id: string) => void;
}

const SymptomItem: React.FC<SymptomItemProps> = ({ symptom, onDelete }) => {
  return (
    <li className="border rounded-lg p-3 relative hover:bg-gray-50">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium flex items-center">
            {symptom.name}
            <span className={`ml-2 text-xs px-2 py-0.5 rounded ${
              symptom.severity === 'mild' 
                ? 'bg-green-100 text-green-800'
                : symptom.severity === 'moderate'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
            }`}>
              {symptom.severity}
            </span>
          </h4>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <Calendar className="h-3 w-3 mr-1" />
            {new Date(symptom.date).toLocaleDateString()}
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 w-6 p-0"
          onClick={() => onDelete(symptom.id)}
        >
          <X className="h-4 w-4 text-gray-400" />
        </Button>
      </div>
      {symptom.notes && (
        <p className="text-sm text-gray-600 mt-2">{symptom.notes}</p>
      )}
    </li>
  );
};

export default SymptomItem;

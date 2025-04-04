
import React from 'react';
import { Search, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import SymptomItem from './SymptomItem';
import { Symptom } from './types';

interface SymptomListProps {
  symptoms: Symptom[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onDeleteSymptom: (id: string) => void;
}

const SymptomList: React.FC<SymptomListProps> = ({ 
  symptoms, 
  searchTerm, 
  setSearchTerm, 
  onDeleteSymptom 
}) => {
  return (
    <div>
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input 
          placeholder="Search symptoms..." 
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {symptoms.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Tag className="h-12 w-12 mx-auto text-gray-300 mb-2" />
          <p className="text-sm">No symptoms have been recorded yet.</p>
          <p className="text-xs">Click "Add Symptom" to start tracking.</p>
        </div>
      ) : (
        <ul className="space-y-3 mt-3">
          {symptoms.map(symptom => (
            <SymptomItem 
              key={symptom.id} 
              symptom={symptom} 
              onDelete={onDeleteSymptom} 
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SymptomList;

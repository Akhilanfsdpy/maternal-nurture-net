
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Symptom } from './types';

interface SymptomFormProps {
  onAddSymptom: (symptom: Omit<Symptom, 'id'>) => boolean;
  onCancel: () => void;
}

const SymptomForm: React.FC<SymptomFormProps> = ({ onAddSymptom, onCancel }) => {
  const [newSymptom, setNewSymptom] = useState<Omit<Symptom, 'id'>>({
    name: '',
    severity: 'mild',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const handleSubmit = () => {
    const success = onAddSymptom(newSymptom);
    if (success) {
      setNewSymptom({
        name: '',
        severity: 'mild',
        date: new Date().toISOString().split('T')[0],
        notes: ''
      });
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-3 mb-4">
      <h3 className="font-medium text-sm">Add New Symptom</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium mb-1 block">Symptom Name</label>
          <Input 
            placeholder="e.g., Fever, Cough, Rash" 
            value={newSymptom.name}
            onChange={(e) => setNewSymptom({...newSymptom, name: e.target.value})}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Date Observed</label>
          <Input 
            type="date" 
            value={newSymptom.date}
            onChange={(e) => setNewSymptom({...newSymptom, date: e.target.value})}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Severity</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={newSymptom.severity}
            onChange={(e) => setNewSymptom({
              ...newSymptom, 
              severity: e.target.value as 'mild' | 'moderate' | 'severe'
            })}
          >
            <option value="mild">Mild</option>
            <option value="moderate">Moderate</option>
            <option value="severe">Severe</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Notes</label>
          <Input 
            placeholder="Additional details about the symptom" 
            value={newSymptom.notes}
            onChange={(e) => setNewSymptom({...newSymptom, notes: e.target.value})}
          />
        </div>
      </div>
      <Button 
        onClick={handleSubmit}
        className="w-full mt-2 bg-gradient-to-r from-health-pink to-health-light-pink"
      >
        Add Symptom
      </Button>
    </div>
  );
};

export default SymptomForm;

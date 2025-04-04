
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Symptom } from './types';

export const useSymptoms = (initialSymptoms: Symptom[] = []) => {
  const [symptoms, setSymptoms] = useState<Symptom[]>(initialSymptoms);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const filteredSymptoms = symptoms.filter(symptom => 
    symptom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    symptom.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addSymptom = (newSymptom: Omit<Symptom, 'id'>) => {
    if (!newSymptom.name) {
      toast({
        title: "Error",
        description: "Please enter a symptom name",
        variant: "destructive"
      });
      return false;
    }

    const symptomToAdd = {
      ...newSymptom,
      id: Date.now().toString()
    };

    setSymptoms([symptomToAdd, ...symptoms]);
    
    toast({
      title: "Symptom Added",
      description: `${symptomToAdd.name} has been added to the tracker.`
    });
    
    return true;
  };

  const deleteSymptom = (id: string) => {
    setSymptoms(symptoms.filter(s => s.id !== id));
    toast({
      title: "Symptom Removed",
      description: "The symptom has been removed from the tracker."
    });
  };

  return {
    symptoms,
    filteredSymptoms,
    searchTerm,
    setSearchTerm,
    addSymptom,
    deleteSymptom
  };
};


import { Symptom } from './types';

export const initialSymptoms: Symptom[] = [
  { 
    id: '1', 
    name: 'Fever', 
    severity: 'moderate', 
    date: '2023-05-15', 
    notes: 'Temperature was 38.5°C. Gave paracetamol at 2pm.'
  },
  { 
    id: '2', 
    name: 'Cough', 
    severity: 'mild', 
    date: '2023-05-14', 
    notes: 'Dry cough, mostly at night.'
  },
];

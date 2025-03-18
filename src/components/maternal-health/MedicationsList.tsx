
import React from 'react';
import { Pill, Pencil, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const medications = [
  { id: 1, name: 'Prenatal Vitamins', dosage: '1 tablet', frequency: 'Daily', schedule: 'Morning' },
  { id: 2, name: 'Iron Supplement', dosage: '1 tablet', frequency: 'Daily', schedule: 'After meal' },
  { id: 3, name: 'Calcium', dosage: '1 tablet', frequency: 'Twice daily', schedule: 'Morning/Evening' },
];

const MedicationsList: React.FC = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Pill className="mr-2 h-5 w-5 text-health-blue" />
          Medications & Supplements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {medications.map((med) => (
            <li key={med.id} className="flex items-start justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-medium text-gray-900">{med.name}</p>
                <p className="text-sm text-gray-500">{med.dosage} • {med.frequency}</p>
                <p className="text-xs text-gray-400">{med.schedule}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Pencil className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Medication
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MedicationsList;

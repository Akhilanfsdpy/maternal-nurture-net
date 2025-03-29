
import React, { useState } from 'react';
import { Pill, Clock, CheckCircle, XCircle, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  schedule: string[];
  status: ('taken' | 'missed' | 'pending')[];
}

const MedicationTracker: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([
    { 
      id: 1, 
      name: 'Prenatal Vitamins', 
      dosage: '1 tablet', 
      frequency: 'Daily', 
      schedule: ['8:00 AM'],
      status: ['pending']
    },
    { 
      id: 2, 
      name: 'Iron Supplement', 
      dosage: '25mg', 
      frequency: 'Twice daily', 
      schedule: ['9:00 AM', '9:00 PM'],
      status: ['taken', 'pending']
    },
    { 
      id: 3, 
      name: 'Calcium Citrate', 
      dosage: '500mg', 
      frequency: 'With meals', 
      schedule: ['8:00 AM', '1:00 PM', '7:00 PM'],
      status: ['taken', 'pending', 'pending']
    }
  ]);
  
  const markMedication = (medId: number, doseIndex: number, status: 'taken' | 'missed') => {
    setMedications(medications.map(med => {
      if (med.id === medId) {
        const newStatus = [...med.status];
        newStatus[doseIndex] = status;
        return { ...med, status: newStatus };
      }
      return med;
    }));
    
    const medication = medications.find(m => m.id === medId);
    
    if (status === 'taken') {
      toast({
        title: "Medication Taken",
        description: `You've marked ${medication?.name} as taken.`,
      });
    } else {
      toast({
        title: "Medication Missed",
        description: `You've marked ${medication?.name} as missed.`,
      });
    }
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Pill className="mr-2 h-5 w-5 text-health-blue" />
          Medication Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {medications.map((med) => (
            <div key={med.id} className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-3 border-b">
                <h4 className="font-medium">{med.name}</h4>
                <p className="text-sm text-gray-600">{med.dosage} • {med.frequency}</p>
              </div>
              <div className="divide-y">
                {med.schedule.map((time, index) => (
                  <div key={index} className="p-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm">{time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {med.status[index] === 'pending' ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-green-500 text-green-600 hover:bg-green-50"
                            onClick={() => markMedication(med.id, index, 'taken')}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Taken
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-500 text-red-600 hover:bg-red-50"
                            onClick={() => markMedication(med.id, index, 'missed')}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Missed
                          </Button>
                        </>
                      ) : (
                        <div className={`flex items-center px-3 py-1 rounded-full text-xs ${
                          med.status[index] === 'taken' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {med.status[index] === 'taken' ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Taken
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3 w-3 mr-1" />
                              Missed
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <Button variant="outline" className="w-full mt-4">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Medication
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicationTracker;

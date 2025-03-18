
import React from 'react';
import { Activity, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const symptoms = [
  { id: 1, name: 'Nausea', severity: 'Mild', time: '2 days ago', status: 'improving' },
  { id: 2, name: 'Fatigue', severity: 'Moderate', time: 'Today', status: 'steady' },
  { id: 3, name: 'Backache', severity: 'Mild', time: 'Yesterday', status: 'improving' },
];

const SymptomsList: React.FC = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="mr-2 h-5 w-5 text-health-blue" />
          Recent Symptoms
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {symptoms.map((symptom) => (
            <li key={symptom.id} className="p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium text-gray-900">{symptom.name}</p>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  symptom.severity === 'Mild' ? 'bg-emerald-100 text-emerald-800' : 
                  symptom.severity === 'Moderate' ? 'bg-amber-100 text-amber-800' : 
                  'bg-red-100 text-red-800'
                )}>
                  {symptom.severity}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{symptom.time}</p>
                <p className={cn(
                  "text-xs",
                  symptom.status === 'improving' ? 'text-emerald-600' : 
                  symptom.status === 'worsening' ? 'text-red-600' : 
                  'text-amber-600'
                )}>
                  {symptom.status === 'improving' ? '↓ Improving' : 
                   symptom.status === 'worsening' ? '↑ Worsening' : '→ Steady'}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" />
          Log Symptom
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SymptomsList;

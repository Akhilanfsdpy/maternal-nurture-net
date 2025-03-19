
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Vaccination {
  id: number;
  name: string;
  doses: string;
  received: string;
  nextDose: string;
  lastDate: string;
}

interface VaccinationsTabContentProps {
  vaccinations: Vaccination[];
}

const VaccinationsTabContent: React.FC<VaccinationsTabContentProps> = ({ vaccinations }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vaccination Records</CardTitle>
        <CardDescription>Keep track of your baby's immunization schedule</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Vaccine</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Required Doses</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Received</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Last Date</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Next Dose</th>
                </tr>
              </thead>
              <tbody>
                {vaccinations.map((vaccine) => (
                  <tr key={vaccine.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium">{vaccine.name}</td>
                    <td className="py-3 px-4 text-sm">{vaccine.doses}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-health-blue/10 text-health-blue font-medium">
                        {vaccine.received} of {vaccine.doses}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">{vaccine.lastDate}</td>
                    <td className="py-3 px-4 text-sm">{vaccine.nextDose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" />
          Record Vaccination
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VaccinationsTabContent;

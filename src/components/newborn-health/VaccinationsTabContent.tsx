
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
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-sm font-medium">Hepatitis B</td>
                <td className="py-3 px-4 text-sm">3</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">
                    2 of 3
                  </span>
                </td>
                <td className="py-3 px-4 text-sm">4 months</td>
                <td className="py-3 px-4 text-sm">Due at 6 months</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-sm font-medium">DTaP</td>
                <td className="py-3 px-4 text-sm">5</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">
                    2 of 5
                  </span>
                </td>
                <td className="py-3 px-4 text-sm">4 months</td>
                <td className="py-3 px-4 text-sm">Due at 6 months</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-sm font-medium">Hib</td>
                <td className="py-3 px-4 text-sm">4</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">
                    2 of 4
                  </span>
                </td>
                <td className="py-3 px-4 text-sm">4 months</td>
                <td className="py-3 px-4 text-sm">Due at 6 months</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-sm font-medium">Polio (IPV)</td>
                <td className="py-3 px-4 text-sm">4</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">
                    2 of 4
                  </span>
                </td>
                <td className="py-3 px-4 text-sm">4 months</td>
                <td className="py-3 px-4 text-sm">Due at 6 months</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="outline" className="w-full md:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          Record Vaccination
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VaccinationsTabContent;

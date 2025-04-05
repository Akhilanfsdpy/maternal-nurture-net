
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
    <div className="space-y-6">
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
                {/* Static data for visual representation */}
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

      <Card>
        <CardHeader>
          <CardTitle>Development Milestones</CardTitle>
          <CardDescription>Track your baby's developmental progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Completed Milestones</h3>
              <div className="space-y-3">
                <div className="border border-green-100 bg-green-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Social Smile</h4>
                      <p className="text-gray-600 text-sm">Baby smiles in response to your smile or voice</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Achieved at 6 weeks</span>
                        <span className="text-gray-500 text-xs">(Expected: 1-2 months)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-green-100 bg-green-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Head Control</h4>
                      <p className="text-gray-600 text-sm">Baby can hold head steady without support</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Achieved at 10 weeks</span>
                        <span className="text-gray-500 text-xs">(Expected: 2-4 months)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Upcoming Milestones</h3>
              <div className="space-y-3">
                <div className="border border-gray-200 bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-gray-300 rounded-full w-5 h-5"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">Rolling Over</h4>
                      <p className="text-gray-600 text-sm">Baby can roll from tummy to back</p>
                      <p className="text-gray-500 text-xs mt-1">Expected around 3-5 months</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-gray-300 rounded-full w-5 h-5"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">Sitting Up</h4>
                      <p className="text-gray-600 text-sm">Baby can sit without support</p>
                      <p className="text-gray-500 text-xs mt-1">Expected around 4-7 months</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline" className="w-full md:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Record New Milestone
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VaccinationsTabContent;

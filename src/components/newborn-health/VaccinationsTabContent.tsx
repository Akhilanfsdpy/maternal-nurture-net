
import React, { useState } from 'react';
import { PlusCircle, Download, AlertCircle, Calendar, CheckSquare } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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
  const [showReminderForm, setShowReminderForm] = useState(false);
  const { toast } = useToast();

  const handleSetReminder = () => {
    toast({
      title: "Reminder Set",
      description: "We'll notify you when your child's next vaccination is due."
    });
    setShowReminderForm(false);
  };

  const handleRecordVaccination = () => {
    toast({
      title: "Record Vaccination",
      description: "Please visit the vaccination center to record your child's vaccination."
    });
  };

  const handleDownloadRecords = () => {
    toast({
      title: "Download Started",
      description: "Your vaccination records are being prepared for download."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CheckSquare className="mr-2 h-5 w-5 text-health-blue" />
          Vaccination Records
        </CardTitle>
        <CardDescription>Keep track of your baby's immunization schedule</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
            <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <p className="text-blue-800 font-medium">Vaccination Schedule</p>
              <p className="text-blue-700 text-sm">
                Following the recommended vaccination schedule protects your child from serious diseases.
              </p>
            </div>
          </div>
          
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
                  <tr key={vaccine.id} className="border-b hover:bg-gray-50 cursor-pointer">
                    <td className="py-3 px-4 text-sm font-medium">{vaccine.name}</td>
                    <td className="py-3 px-4 text-sm">{vaccine.doses}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-health-blue/10 text-health-blue font-medium">
                        {vaccine.received} of {vaccine.doses}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">{vaccine.lastDate}</td>
                    <td className="py-3 px-4 text-sm">
                      <div className="flex items-center">
                        <span>{vaccine.nextDose}</span>
                        {vaccine.nextDose !== 'Completed' && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="ml-2 h-7 w-7 p-0"
                            onClick={() => setShowReminderForm(true)}
                          >
                            <Calendar className="h-4 w-4 text-health-blue" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {showReminderForm && (
            <div className="p-4 border rounded-md bg-gray-50">
              <h4 className="font-medium mb-3">Set Vaccination Reminder</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">Remind Me</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>1 week before</option>
                    <option>2 weeks before</option>
                    <option>1 month before</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Notification Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="email" className="mr-2" />
                      <label htmlFor="email" className="text-sm">Email</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="sms" className="mr-2" />
                      <label htmlFor="sms" className="text-sm">SMS</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="app" className="mr-2" defaultChecked />
                      <label htmlFor="app" className="text-sm">App Notification</label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowReminderForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleSetReminder}
                  >
                    Set Reminder
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" className="w-full sm:w-auto" onClick={handleRecordVaccination}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Record Vaccination
        </Button>
        <Button variant="outline" className="w-full sm:w-auto" onClick={handleDownloadRecords}>
          <Download className="mr-2 h-4 w-4" />
          Download Records
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VaccinationsTabContent;

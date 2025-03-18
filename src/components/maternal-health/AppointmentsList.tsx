
import React from 'react';
import { Calendar, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const appointments = [
  { 
    id: 1, 
    title: 'Prenatal Checkup', 
    doctor: 'Dr. Sarah Johnson',
    location: 'City Medical Center',
    date: 'May 15, 2023',
    time: '10:00 AM',
    notes: 'Bring previous ultrasound reports'
  },
  { 
    id: 2, 
    title: 'Glucose Tolerance Test', 
    doctor: 'Dr. Sarah Johnson',
    location: 'City Medical Center',
    date: 'May 28, 2023',
    time: '9:00 AM',
    notes: 'Fast for 8 hours before the test'
  },
];

const AppointmentsList: React.FC = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-health-blue" />
          Upcoming Appointments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {appointments.map((appt) => (
            <li key={appt.id} className="p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <p className="font-medium text-gray-900">{appt.title}</p>
              <p className="text-sm text-gray-600">{appt.doctor}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-gray-500">{appt.date}</p>
                <p className="text-sm text-gray-500">{appt.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" />
          Schedule Appointment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AppointmentsList;

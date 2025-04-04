
import React from 'react';
import { Calendar, Clock, MapPin, User, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Appointment {
  id: string;
  title: string;
  doctor: string;
  date: string;
  time: string;
  location: string;
  notes?: string;
  type: 'checkup' | 'ultrasound' | 'test' | 'other';
}

const appointments: Appointment[] = [
  {
    id: '1',
    title: 'Regular Prenatal Checkup',
    doctor: 'Dr. Sarah Johnson',
    date: '2023-06-15',
    time: '10:30 AM',
    location: 'MaternaHealth Clinic, Suite 102',
    notes: 'Bring previous test results',
    type: 'checkup'
  },
  {
    id: '2',
    title: 'Anatomy Ultrasound',
    doctor: 'Dr. Michael Rodriguez',
    date: '2023-06-28',
    time: '2:00 PM',
    location: 'MaternaHealth Clinic, Suite 205',
    notes: 'Drink plenty of water before appointment',
    type: 'ultrasound'
  },
  {
    id: '3',
    title: 'Glucose Tolerance Test',
    doctor: 'Dr. Sarah Johnson',
    date: '2023-07-10',
    time: '8:00 AM',
    location: 'MaternaHealth Lab, Room 110',
    notes: 'Fast for 8 hours before the test',
    type: 'test'
  }
];

const AppointmentsTabContent: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-health-blue mr-2" />
            Appointments & Schedule
          </div>
          <Button 
            variant="outline" 
            className="text-health-blue border-health-light-blue"
          >
            Schedule New Appointment
          </Button>
        </CardTitle>
        <CardDescription>Manage healthcare visits and checkups</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center p-3 bg-blue-50 border border-blue-100 rounded-lg">
          <AlertCircle className="text-blue-500 mr-2 h-5 w-5 flex-shrink-0" />
          <p className="text-sm text-blue-700">Regular prenatal visits are important for monitoring both maternal and fetal health.</p>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Upcoming Appointments</h3>
          <div className="divide-y">
            {appointments.map(appointment => (
              <div key={appointment.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center">
                      <span className={`h-2.5 w-2.5 rounded-full mr-2 ${
                        appointment.type === 'checkup' ? 'bg-green-500' :
                        appointment.type === 'ultrasound' ? 'bg-blue-500' :
                        appointment.type === 'test' ? 'bg-amber-500' : 'bg-gray-500'
                      }`}></span>
                      <h4 className="font-medium">{appointment.title}</h4>
                    </div>
                    <div className="flex items-center mt-1 text-gray-600 text-sm">
                      <User className="h-3.5 w-3.5 mr-1" />
                      <span>{appointment.doctor}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-600 mt-2 sm:mt-0">
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span>{new Date(appointment.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      <span>{appointment.location}</span>
                    </div>
                  </div>
                </div>
                {appointment.notes && (
                  <div className="mt-2 text-sm bg-gray-50 p-2 rounded">
                    <span className="font-medium">Note:</span> {appointment.notes}
                  </div>
                )}
                <div className="mt-3 flex space-x-2">
                  <Button variant="outline" size="sm">Reschedule</Button>
                  <Button variant="outline" size="sm" className="text-red-600 border-red-200">Cancel</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-gray-600 flex justify-between items-center border-t pt-4">
        <div>Need to change something?</div>
        <Button variant="ghost" className="text-health-blue">View All Appointments</Button>
      </CardFooter>
    </Card>
  );
};

export default AppointmentsTabContent;

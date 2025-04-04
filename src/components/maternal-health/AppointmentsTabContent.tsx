
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Phone, PlusCircle, CheckCircle } from 'lucide-react';

interface Appointment {
  id: number;
  title: string;
  doctorName: string;
  facility: string;
  address: string;
  date: string;
  time: string;
  type: 'checkup' | 'ultrasound' | 'test' | 'consultation';
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
}

const AppointmentsTabContent: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      title: "Regular Prenatal Checkup",
      doctorName: "Dr. Sarah Johnson",
      facility: "City Women's Health Clinic",
      address: "123 Medical Center Blvd",
      date: "2025-04-15",
      time: "10:30 AM",
      type: "checkup",
      status: "upcoming",
      notes: "Remember to bring previous ultrasound images"
    },
    {
      id: 2, 
      title: "Anatomy Scan Ultrasound",
      doctorName: "Dr. Michael Chen",
      facility: "Advanced Imaging Center",
      address: "456 Hospital Drive",
      date: "2025-04-23",
      time: "2:15 PM",
      type: "ultrasound",
      status: "upcoming"
    },
    {
      id: 3,
      title: "Glucose Tolerance Test",
      doctorName: "Dr. Lisa Rodriguez",
      facility: "Community Medical Lab",
      address: "789 Health Street",
      date: "2025-03-10",
      time: "8:00 AM",
      type: "test",
      status: "completed",
      notes: "Fasting required 8 hours before appointment"
    }
  ]);

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'upcoming':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Upcoming</span>;
      case 'completed':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span>;
      case 'cancelled':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Cancelled</span>;
    }
  };

  const getTypeIcon = (type: Appointment['type']) => {
    switch (type) {
      case 'checkup':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'ultrasound':
        return <Phone className="h-5 w-5 text-purple-500" />;
      case 'test':
        return <CheckCircle className="h-5 w-5 text-amber-500" />;
      case 'consultation':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-health-pink" />
          Appointments & Schedule
        </CardTitle>
        <CardDescription>Manage your healthcare visits and checkups</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Your Appointments</h3>
            <Button size="sm" className="bg-health-pink">
              <PlusCircle className="mr-1 h-4 w-4" />
              Add Appointment
            </Button>
          </div>
          
          <div className="space-y-3">
            {appointments.map(appointment => (
              <div 
                key={appointment.id} 
                className={`p-4 border rounded-lg transition-colors ${
                  appointment.status === 'upcoming' ? 'border-blue-100 hover:bg-blue-50' :
                  appointment.status === 'completed' ? 'border-green-100 hover:bg-green-50' :
                  'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="mt-1">
                      {getTypeIcon(appointment.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{appointment.title}</h4>
                        {getStatusBadge(appointment.status)}
                      </div>
                      <p className="text-sm text-gray-600">{appointment.doctorName}</p>
                      <p className="text-sm text-gray-600">{appointment.facility}</p>
                      
                      <div className="flex flex-wrap gap-x-4 mt-2 text-sm">
                        <div className="flex items-center gap-1 text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(appointment.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <MapPin className="h-4 w-4" />
                          <span>{appointment.address}</span>
                        </div>
                      </div>
                      
                      {appointment.notes && (
                        <p className="text-xs text-gray-500 mt-2 italic">
                          Note: {appointment.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View All Appointments
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AppointmentsTabContent;

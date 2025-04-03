
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, User, AlertCircle, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface Appointment {
  id: string;
  title: string;
  doctor: string;
  location: string;
  date: string; 
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
  followUp?: boolean;
}

const EnhancedAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      title: 'Regular Checkup',
      doctor: 'Dr. Emma Wilson',
      location: 'Pediatric Wellness Center',
      date: '2023-06-15',
      time: '09:30',
      status: 'upcoming',
      notes: 'Bring vaccination record'
    },
    {
      id: '2',
      title: 'Vaccination',
      doctor: 'Dr. Michael Chen',
      location: 'Community Health Clinic',
      date: '2023-05-10',
      time: '14:00',
      status: 'completed',
      followUp: true
    }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const { toast } = useToast();

  const handleStatusChange = (id: string, status: 'upcoming' | 'completed' | 'cancelled') => {
    setAppointments(appointments.map(app => 
      app.id === id ? {...app, status} : app
    ));
    
    toast({
      title: "Status Updated",
      description: `Appointment status changed to ${status}`
    });
  };

  const handleSelectAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCloseDetails = () => {
    setSelectedAppointment(null);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return '';
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 text-health-blue mr-2" />
          Appointments
        </CardTitle>
        <CardDescription>
          Manage your baby's healthcare appointments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className={`${selectedAppointment ? 'lg:w-1/2' : 'w-full'}`}>
            {appointments.length === 0 ? (
              <div className="text-center py-10">
                <Calendar className="h-10 w-10 mx-auto text-gray-300 mb-2" />
                <p className="text-gray-500">No appointments scheduled</p>
                <Button 
                  onClick={() => setShowForm(true)}
                  className="mt-4 bg-gradient-to-r from-health-blue to-health-light-blue"
                >
                  Schedule First Appointment
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {appointments.map(appointment => (
                  <div 
                    key={appointment.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      selectedAppointment?.id === appointment.id ? 'border-health-blue bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleSelectAppointment(appointment)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{appointment.title}</h4>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <User className="h-3.5 w-3.5 mr-1" />
                          {appointment.doctor}
                        </div>
                      </div>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-1 mt-2">
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(appointment.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {appointment.time}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 col-span-2 truncate">
                        <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{appointment.location}</span>
                      </div>
                    </div>
                    
                    {appointment.followUp && (
                      <div className="mt-2">
                        <Badge variant="outline" className="text-xs text-health-blue border-health-light-blue">
                          Follow-up required
                        </Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-4 flex justify-center">
              <Button
                variant="outline"
                className="w-full border-health-light-blue text-health-blue"
                onClick={() => setShowForm(true)}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule New Appointment
              </Button>
            </div>
          </div>
          
          {selectedAppointment && (
            <div className="lg:w-1/2 border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium text-lg">{selectedAppointment.title}</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={handleCloseDetails}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Doctor</span>
                    <span className="font-medium">{selectedAppointment.doctor}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Status</span>
                    <Badge className={`${getStatusColor(selectedAppointment.status)} w-fit mt-1`}>
                      {selectedAppointment.status}
                    </Badge>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Date & Time</span>
                    <span className="font-medium">
                      {new Date(selectedAppointment.date).toLocaleDateString()} at {selectedAppointment.time}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Location</span>
                    <span className="font-medium">{selectedAppointment.location}</span>
                  </div>
                </div>
                
                {selectedAppointment.notes && (
                  <div>
                    <span className="text-xs text-gray-500">Notes</span>
                    <p className="text-sm bg-gray-50 p-2 rounded mt-1">{selectedAppointment.notes}</p>
                  </div>
                )}
                
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">Appointment Actions</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAppointment.status === 'upcoming' && (
                      <>
                        <Button size="sm" variant="outline" className="text-xs">
                          <MapPin className="h-3 w-3 mr-1" />
                          Get Directions
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          <Phone className="h-3 w-3 mr-1" />
                          Call Clinic
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-xs text-red-500 border-red-200"
                          onClick={() => handleStatusChange(selectedAppointment.id, 'cancelled')}
                        >
                          <X className="h-3 w-3 mr-1" />
                          Cancel
                        </Button>
                      </>
                    )}
                    {selectedAppointment.status === 'upcoming' && (
                      <Button 
                        size="sm" 
                        className="text-xs bg-health-blue"
                        onClick={() => handleStatusChange(selectedAppointment.id, 'completed')}
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Mark as Completed
                      </Button>
                    )}
                    {selectedAppointment.status === 'cancelled' && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs text-blue-500 border-blue-200"
                        onClick={() => handleStatusChange(selectedAppointment.id, 'upcoming')}
                      >
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Reschedule
                      </Button>
                    )}
                    {selectedAppointment.status === 'completed' && !selectedAppointment.followUp && (
                      <Button size="sm" variant="outline" className="text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        Schedule Follow-up
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedAppointments;

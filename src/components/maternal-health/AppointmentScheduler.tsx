
import React, { useState } from 'react';
import { Calendar, Check } from 'lucide-react';
import { 
  Dialog, 
  DialogContent,
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface AppointmentSchedulerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const appointmentTypes = [
  { id: 'checkup', name: 'Regular Checkup' },
  { id: 'ultrasound', name: 'Ultrasound Scan' },
  { id: 'blood-test', name: 'Blood Test' },
  { id: 'glucose', name: 'Glucose Tolerance Test' },
  { id: 'other', name: 'Other' }
];

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', 
  '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM', 
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', 
  '4:00 PM', '4:30 PM'
];

const doctors = [
  { id: 'dr-smith', name: 'Dr. Sarah Smith' },
  { id: 'dr-johnson', name: 'Dr. Michael Johnson' },
  { id: 'dr-patel', name: 'Dr. Priya Patel' },
  { id: 'dr-nguyen', name: 'Dr. Thomas Nguyen' }
];

const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({ isOpen, setIsOpen }) => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [doctor, setDoctor] = useState('');
  const [notes, setNotes] = useState('');

  const resetForm = () => {
    setDate(undefined);
    setTimeSlot('');
    setAppointmentType('');
    setDoctor('');
    setNotes('');
  };

  const handleSubmit = () => {
    // Form validation
    if (!date || !timeSlot || !appointmentType || !doctor) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, you would submit this data to your backend
    console.log({
      date,
      timeSlot,
      appointmentType,
      doctor,
      notes
    });

    toast({
      title: "Appointment Scheduled",
      description: `Your appointment has been scheduled for ${format(date, 'PPP')} at ${timeSlot}.`,
    });

    resetForm();
    setIsOpen(false);
  };

  return (
    <>
      <Button 
        variant="outline" 
        className="border-health-light-blue text-health-blue"
        onClick={() => setIsOpen(true)}
      >
        <Calendar className="mr-2 h-4 w-4" />
        Schedule Appointment
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule Appointment</DialogTitle>
            <DialogDescription>
              Schedule a prenatal checkup or medical appointment.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="date">Appointment Date*</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeSlot">Time Slot*</Label>
              <Select value={timeSlot} onValueChange={setTimeSlot}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="appointmentType">Appointment Type*</Label>
              <Select value={appointmentType} onValueChange={setAppointmentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {appointmentTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctor">Doctor*</Label>
              <Select value={doctor} onValueChange={setDoctor}>
                <SelectTrigger>
                  <SelectValue placeholder="Select doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doc) => (
                    <SelectItem key={doc.id} value={doc.id}>{doc.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea 
                id="notes" 
                placeholder="Any special requirements or concerns" 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          <Separator className="my-2" />
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="bg-gradient-to-r from-health-blue to-health-light-blue"
            >
              <Check className="mr-2 h-4 w-4" />
              Schedule Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppointmentScheduler;

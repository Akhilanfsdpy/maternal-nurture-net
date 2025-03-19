
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DatePicker } from "./DatePicker";
import { TimeSlotPicker } from "./TimeSlotPicker";
import { Calendar, Clock, Stethoscope, CalendarCheck, Hospital } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// Sample providers data
const providers = [
  { id: "p1", name: "Dr. Emma Wilson", specialty: "Pediatrician" },
  { id: "p2", name: "Dr. Michael Chen", specialty: "Family Doctor" },
  { id: "p3", name: "Dr. Sarah Johnson", specialty: "Neonatologist" }
];

// Sample appointment types
const appointmentTypes = [
  { id: "regular", name: "Regular Checkup", duration: "30 min" },
  { id: "vaccination", name: "Vaccination", duration: "15 min" },
  { id: "development", name: "Developmental Assessment", duration: "45 min" }
];

const HealthCheckupScheduler: React.FC = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [provider, setProvider] = useState<string>("");
  const [appointmentType, setAppointmentType] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !selectedTime || !provider || !appointmentType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would submit to your API
    console.log({
      date,
      time: selectedTime,
      provider,
      appointmentType,
      notes
    });

    toast({
      title: "Appointment Scheduled",
      description: `Your appointment has been scheduled for ${date.toLocaleDateString()} at ${selectedTime}.`,
    });

    // Reset form
    setDate(undefined);
    setSelectedTime(null);
    setProvider("");
    setAppointmentType("");
    setNotes("");
    setIsDialogOpen(false);
    setIsSheetOpen(false);
  };

  const scheduleForm = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <DatePicker 
        date={date} 
        setDate={setDate} 
        label="Appointment Date" 
      />

      <TimeSlotPicker
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />

      <div className="space-y-2">
        <label className="text-sm font-medium">Healthcare Provider</label>
        <Select 
          value={provider} 
          onValueChange={setProvider}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select provider" />
          </SelectTrigger>
          <SelectContent>
            {providers.map(p => (
              <SelectItem key={p.id} value={p.id}>
                {p.name} ({p.specialty})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Appointment Type</label>
        <Select 
          value={appointmentType} 
          onValueChange={setAppointmentType}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {appointmentTypes.map(type => (
              <SelectItem key={type.id} value={type.id}>
                {type.name} ({type.duration})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Notes (Optional)</label>
        <Input
          placeholder="Any special instructions or concerns"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full bg-gradient-to-r from-health-pink to-health-light-pink">
        Schedule Appointment
      </Button>
    </form>
  );

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <Stethoscope className="mr-2 h-5 w-5 text-health-pink" />
          Health Checkup Scheduler
        </CardTitle>
        <CardDescription>
          Schedule appointments with your healthcare provider
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
            <Calendar className="h-10 w-10 text-health-blue p-2 bg-blue-50 rounded-full" />
            <div>
              <p className="font-medium">Next Checkup</p>
              <p className="text-sm text-gray-500">Jun 15, 2023</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
            <Hospital className="h-10 w-10 text-health-pink p-2 bg-pink-50 rounded-full" />
            <div>
              <p className="font-medium">Primary Provider</p>
              <p className="text-sm text-gray-500">Dr. Sarah Johnson</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
            <CalendarCheck className="h-10 w-10 text-health-mint p-2 bg-green-50 rounded-full" />
            <div>
              <p className="font-medium">Last Visit</p>
              <p className="text-sm text-gray-500">May 10, 2023</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Desktop dialog button */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-health-blue to-health-light-blue hidden sm:flex">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Schedule Health Checkup</DialogTitle>
                <DialogDescription>
                  Select a date, time, and provider for your baby's next health checkup.
                </DialogDescription>
              </DialogHeader>
              {scheduleForm}
            </DialogContent>
          </Dialog>

          {/* Mobile sheet button */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button className="bg-gradient-to-r from-health-blue to-health-light-blue sm:hidden">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule New Appointment
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Schedule Health Checkup</SheetTitle>
                <SheetDescription>
                  Select a date, time, and provider for your baby's next health checkup.
                </SheetDescription>
              </SheetHeader>
              <div className="py-4">
                {scheduleForm}
              </div>
            </SheetContent>
          </Sheet>

          <Button variant="outline" className="border-health-light-blue text-health-blue">
            <Clock className="mr-2 h-4 w-4" />
            View Past Appointments
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthCheckupScheduler;


import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "./DatePicker";
import { TimeSlotPicker } from "./TimeSlotPicker";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

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

interface HealthCheckupDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const HealthCheckupDialog: React.FC<HealthCheckupDialogProps> = ({ open, setOpen }) => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [provider, setProvider] = useState<string>("");
  const [appointmentType, setAppointmentType] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const isMobile = useIsMobile();

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
    setOpen(false);
  };

  const dialogForm = (
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
    <>
      {isMobile ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Schedule Health Checkup</SheetTitle>
              <SheetDescription>
                Select a date, time, and provider for your baby's next health checkup.
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">
              {dialogForm}
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Schedule Health Checkup</DialogTitle>
              <DialogDescription>
                Select a date, time, and provider for your baby's next health checkup.
              </DialogDescription>
            </DialogHeader>
            {dialogForm}
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default HealthCheckupDialog;

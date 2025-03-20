
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DatePicker } from "./DatePicker";
import { TimeSlotPicker } from "./TimeSlotPicker";
import { useToast } from "@/hooks/use-toast";
import { providers, appointmentTypes } from "@/data/healthCheckupData";

interface AppointmentSchedulerFormProps {
  onScheduleSuccess: () => void;
}

const AppointmentSchedulerForm: React.FC<AppointmentSchedulerFormProps> = ({ onScheduleSuccess }) => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [provider, setProvider] = useState<string>("");
  const [appointmentType, setAppointmentType] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

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
    
    // Call callback to close dialog/sheet
    onScheduleSuccess();
  };

  return (
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
};

export default AppointmentSchedulerForm;

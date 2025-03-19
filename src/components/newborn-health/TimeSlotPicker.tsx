
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TimeSlotPickerProps {
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
}

export function TimeSlotPicker({ selectedTime, setSelectedTime }: TimeSlotPickerProps) {
  // Sample time slots for the appointment
  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM", 
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"
  ];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Select Time</label>
      <div className="grid grid-cols-3 gap-2">
        {timeSlots.map((time) => (
          <Button
            key={time}
            variant="outline"
            className={cn(
              "h-10",
              selectedTime === time && "bg-health-light-pink border-health-pink text-health-pink"
            )}
            onClick={() => setSelectedTime(time)}
          >
            {time}
          </Button>
        ))}
      </div>
    </div>
  );
}

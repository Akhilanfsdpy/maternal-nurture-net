
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Stethoscope } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import AppointmentSummaryCards from "./AppointmentSummaryCards";
import AppointmentSchedulerForm from "./AppointmentSchedulerForm";

const HealthCheckupScheduler: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleScheduleSuccess = () => {
    setIsDialogOpen(false);
    setIsSheetOpen(false);
  };

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
        <AppointmentSummaryCards />

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
              <AppointmentSchedulerForm onScheduleSuccess={handleScheduleSuccess} />
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
                <AppointmentSchedulerForm onScheduleSuccess={handleScheduleSuccess} />
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

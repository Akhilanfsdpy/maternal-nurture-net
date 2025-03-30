
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Stethoscope, CalendarCheck, Hospital } from "lucide-react";

interface HealthCheckupOverviewProps {
  onScheduleClick: () => void;
}

const HealthCheckupOverview: React.FC<HealthCheckupOverviewProps> = ({ onScheduleClick }) => {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
          <Button 
            className="bg-gradient-to-r from-health-blue to-health-light-blue"
            onClick={onScheduleClick}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Schedule New Appointment
          </Button>

          <Button variant="outline" className="border-health-light-blue text-health-blue">
            <Clock className="mr-2 h-4 w-4" />
            View Past Appointments
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthCheckupOverview;

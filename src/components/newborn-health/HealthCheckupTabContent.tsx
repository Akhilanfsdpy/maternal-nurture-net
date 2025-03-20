
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import AppointmentSummaryCards from './AppointmentSummaryCards';
import HealthCheckupScheduler from './HealthCheckupScheduler';
import Chatbot from '@/components/Chatbot';

const HealthCheckupTabContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Health Checkup Summary</CardTitle>
          <CardDescription>Overview of your baby's health appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <AppointmentSummaryCards />
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Schedule Health Checkup</CardTitle>
          <CardDescription>Book an appointment with your healthcare provider</CardDescription>
        </CardHeader>
        <CardContent>
          <HealthCheckupScheduler />
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>AI Health Assistant</CardTitle>
          <CardDescription>Chat with our AI health assistant for quick answers</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-[400px] relative">
            <Chatbot embedded={true} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthCheckupTabContent;

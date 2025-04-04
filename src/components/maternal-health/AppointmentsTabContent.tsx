
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const AppointmentsTabContent: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointments & Schedule</CardTitle>
        <CardDescription>Manage healthcare visits and checkups</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">Content for the appointments tab would go here.</p>
      </CardContent>
    </Card>
  );
};

export default AppointmentsTabContent;

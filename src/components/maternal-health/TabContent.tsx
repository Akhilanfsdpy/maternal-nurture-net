
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MedicationsList from './MedicationsList';
import SymptomsList from './SymptomsList';
import AppointmentsList from './AppointmentsList';
import NutritionCard from './NutritionCard';
import ActivityRecommendations from './ActivityRecommendations';

interface TabContentProps {
  activeTab: string;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
  return (
    <>
      <TabsContent value="overview" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <MedicationsList />
          <SymptomsList />
          <AppointmentsList />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NutritionCard />
          <ActivityRecommendations />
        </div>
      </TabsContent>

      <TabsContent value="symptoms">
        <Card>
          <CardHeader>
            <CardTitle>Symptom Tracking</CardTitle>
            <CardDescription>Monitor and record symptoms throughout your pregnancy</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Content for the symptoms tab would go here.</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="nutrition">
        <Card>
          <CardHeader>
            <CardTitle>Nutrition Management</CardTitle>
            <CardDescription>Track diet and nutritional intake</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Content for the nutrition tab would go here.</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="appointments">
        <Card>
          <CardHeader>
            <CardTitle>Appointments & Schedule</CardTitle>
            <CardDescription>Manage healthcare visits and checkups</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Content for the appointments tab would go here.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </>
  );
};

export default TabContent;

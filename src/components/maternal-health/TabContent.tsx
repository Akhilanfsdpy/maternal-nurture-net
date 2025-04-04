
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import OverviewTabContent from './OverviewTabContent';
import SymptomsTabContent from './SymptomsTabContent';
import NutritionTabContent from './NutritionTabContent';
import AppointmentsTabContent from './AppointmentsTabContent';

interface TabContentProps {
  activeTab: string;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
  return (
    <>
      <TabsContent value="overview" className="space-y-6">
        <OverviewTabContent />
      </TabsContent>

      <TabsContent value="symptoms">
        <SymptomsTabContent />
      </TabsContent>

      <TabsContent value="nutrition">
        <NutritionTabContent />
      </TabsContent>

      <TabsContent value="appointments">
        <AppointmentsTabContent />
      </TabsContent>
    </>
  );
};

export default TabContent;

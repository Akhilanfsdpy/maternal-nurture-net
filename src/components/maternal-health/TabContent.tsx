
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import OverviewTabContent from './OverviewTabContent';
import SymptomsTabContent from './SymptomsTabContent';
import NutritionTabContent from './NutritionTabContent';
import AppointmentsTabContent from './AppointmentsTabContent';
import { useIsMobile } from '@/hooks/use-mobile';

interface TabContentProps {
  activeTab: string;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={isMobile ? "responsive-full-width-xs" : ""}>
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
    </div>
  );
};

export default TabContent;

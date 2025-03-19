
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverviewTabContent from '@/components/newborn-health/OverviewTabContent';
import FeedingTabContent from '@/components/newborn-health/FeedingTabContent';
import MilestonesTabContent from '@/components/newborn-health/MilestonesTabContent';
import VaccinationsTabContent from '@/components/newborn-health/VaccinationsTabContent';
import DocumentsTabContent from '@/components/newborn-health/DocumentsTabContent';
import BirthCertificateTabContent from '@/components/newborn-health/BirthCertificateTabContent';
import { FeedingData, Milestone, Vaccination } from '@/types/newbornHealth';

interface HealthTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  feedingData: FeedingData[];
  milestones: Milestone[];
  vaccinations: Vaccination[];
}

const HealthTabs: React.FC<HealthTabsProps> = ({ 
  activeTab, 
  setActiveTab, 
  feedingData, 
  milestones,
  vaccinations 
}) => {
  return (
    <Tabs
      defaultValue="overview"
      value={activeTab}
      onValueChange={setActiveTab}
      className="space-y-6"
    >
      <div className="bg-white rounded-lg p-1 shadow-sm inline-block overflow-x-auto">
        <TabsList className="grid grid-cols-6 w-[750px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="feeding">Feeding</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="birthcertificate">Birth Certificate</TabsTrigger>
        </TabsList>
      </div>

      {/* Tab Contents */}
      <TabsContent value="overview">
        <OverviewTabContent feedingData={feedingData} milestones={milestones} />
      </TabsContent>

      <TabsContent value="feeding">
        <FeedingTabContent />
      </TabsContent>

      <TabsContent value="milestones">
        <MilestonesTabContent milestones={milestones} />
      </TabsContent>

      <TabsContent value="vaccinations">
        <VaccinationsTabContent vaccinations={vaccinations} />
      </TabsContent>

      <TabsContent value="documents">
        <DocumentsTabContent />
      </TabsContent>
      
      <TabsContent value="birthcertificate">
        <BirthCertificateTabContent />
      </TabsContent>
    </Tabs>
  );
};

export default HealthTabs;

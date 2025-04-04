
import React from 'react';
import RecentFeedings from './RecentFeedings';
import GrowthChart from './GrowthChart';
import UpcomingMilestones from './UpcomingMilestones';
import SleepPattern from './SleepPattern';
import { useIsMobile } from '@/hooks/use-mobile';

interface FeedingData {
  time: string;
  duration: string;
  type: string;
  notes: string;
}

interface Milestone {
  id: number;
  name: string;
  description: string;
  expectedAge: string;
  completed: boolean;
  completedDate: string | null;
}

interface OverviewTabContentProps {
  feedingData: FeedingData[];
  milestones: Milestone[];
}

const OverviewTabContent: React.FC<OverviewTabContentProps> = ({ feedingData, milestones }) => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-6">
      <div className={`grid grid-cols-1 ${!isMobile ? 'lg:grid-cols-2' : ''} gap-6`}>
        <RecentFeedings feedingData={feedingData} />
        <GrowthChart />
      </div>

      <div className={`grid grid-cols-1 ${!isMobile ? 'lg:grid-cols-2' : ''} gap-6`}>
        <UpcomingMilestones milestones={milestones} />
        <SleepPattern />
      </div>
    </div>
  );
};

export default OverviewTabContent;

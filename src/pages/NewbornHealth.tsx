
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Chatbot from '@/components/Chatbot';
import GrowthMetrics from '@/components/newborn-health/GrowthMetrics';
import HealthCheckupScheduler from '@/components/newborn-health/HealthCheckupScheduler';
import HealthMetricsDisplay from '@/components/newborn-health/HealthMetricsDisplay';
import HealthTabs from '@/components/newborn-health/HealthTabs';
import ParentingLessons from '@/components/newborn-health/ParentingLessons';
import GrowthDataForm from '@/components/newborn-health/GrowthDataForm';
import BabyActivitiesTracker from '@/components/newborn-health/BabyActivitiesTracker';
import { growthData, feedingData, milestones, vaccinations } from '@/data/newbornHealthData';
import { useIsMobile } from '@/hooks/use-mobile';

const NewbornHealth: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showScheduler, setShowScheduler] = useState(false);
  const isMobile = useIsMobile();

  const handleScheduleClick = () => {
    setShowScheduler(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Chatbot />
      
      <main className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Newborn Health</h1>
              <p className="text-gray-500">Track, monitor, and manage your baby's health and development</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                className="border-health-light-pink text-health-pink"
                onClick={handleScheduleClick}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Checkup
              </Button>
              <GrowthDataForm />
            </div>
          </div>
          
          <div className="mb-8">
            <HealthMetricsDisplay />
          </div>
          
          <div className="mb-8">
            <GrowthMetrics growthData={growthData} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <HealthCheckupScheduler open={showScheduler} setOpen={setShowScheduler} />
            <BabyActivitiesTracker />
          </div>
          
          <div className="mb-8">
            <ParentingLessons />
          </div>
          
          <HealthTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            feedingData={feedingData}
            milestones={milestones}
            vaccinations={vaccinations}
          />
        </div>
      </main>
    </div>
  );
};

export default NewbornHealth;

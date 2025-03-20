
import React, { useState } from 'react';
import Header from '@/components/Header';
import Chatbot from '@/components/Chatbot';
import GrowthMetrics from '@/components/newborn-health/GrowthMetrics';
import HealthCheckupScheduler from '@/components/newborn-health/HealthCheckupScheduler';
import PageHeader from '@/components/newborn-health/PageHeader';
import HealthMetricsDisplay from '@/components/newborn-health/HealthMetricsDisplay';
import HealthTabs from '@/components/newborn-health/HealthTabs';
import GrowthTracking from '@/components/newborn-health/GrowthTracking';
import { growthData, feedingData, milestones, vaccinations } from '@/data/newbornHealthData';

const NewbornHealth: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Chatbot />
      
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <PageHeader />
          <HealthMetricsDisplay />
          <GrowthMetrics growthData={growthData} />
          <GrowthTracking />
          <HealthCheckupScheduler />
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

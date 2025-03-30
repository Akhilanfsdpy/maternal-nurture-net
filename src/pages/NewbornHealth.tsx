
import React, { useState } from 'react';
import Header from '@/components/Header';
import Chatbot from '@/components/Chatbot';
import GrowthMetrics from '@/components/newborn-health/GrowthMetrics';
import HealthCheckupScheduler from '@/components/newborn-health/HealthCheckupScheduler';
import PageHeader from '@/components/newborn-health/PageHeader';
import HealthMetricsDisplay from '@/components/newborn-health/HealthMetricsDisplay';
import HealthTabs from '@/components/newborn-health/HealthTabs';
import ParentingLessons from '@/components/newborn-health/ParentingLessons';
import GrowthDataForm from '@/components/newborn-health/GrowthDataForm';
import { growthData, feedingData, milestones, vaccinations } from '@/data/newbornHealthData';

const NewbornHealth: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Chatbot />
      
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Newborn Health</h1>
              <p className="text-gray-500">Track, monitor, and manage your baby's health and development</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-health-light-pink text-health-pink">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Checkup
              </Button>
              <GrowthDataForm />
            </div>
          </div>
          
          <HealthMetricsDisplay />
          <GrowthMetrics growthData={growthData} />
          
          <div className="mb-6">
            <ParentingLessons />
          </div>
          
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

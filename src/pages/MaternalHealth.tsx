
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Chatbot from '@/components/Chatbot';
import MaternalMetricsRow from '@/components/maternal-health/MaternalMetricsRow';
import PregnancyProgress from '@/components/maternal-health/PregnancyProgress';
import TabContent from '@/components/maternal-health/TabContent';
import VideoRecommendations from '@/components/maternal-health/VideoRecommendations';
import MedicalReportGenerator from '@/components/maternal-health/MedicalReportGenerator';
import HealthDataForm from '@/components/maternal-health/HealthDataForm';

const MaternalHealth: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Chatbot />
      
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Maternal Health</h1>
              <p className="text-gray-500">Track, monitor, and manage your pregnancy journey</p>
            </div>
            <div className="flex gap-3">
              <HealthDataForm />
            </div>
          </div>

          <MaternalMetricsRow />
          <PregnancyProgress />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <VideoRecommendations />
            <MedicalReportGenerator />
          </div>

          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg p-1 shadow-sm inline-block">
              <TabsList className="grid grid-cols-4 w-[500px]">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
              </TabsList>
            </div>

            <TabContent activeTab={activeTab} />
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default MaternalHealth;

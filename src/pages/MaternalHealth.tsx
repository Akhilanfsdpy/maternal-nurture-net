
import React, { useState } from 'react';
import { Calendar, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Chatbot from '@/components/Chatbot';
import MaternalMetricsRow from '@/components/maternal-health/MaternalMetricsRow';
import PregnancyProgress from '@/components/maternal-health/PregnancyProgress';
import TabContent from '@/components/maternal-health/TabContent';
import VideoRecommendations from '@/components/maternal-health/VideoRecommendations';
import MedicalReportGenerator from '@/components/maternal-health/MedicalReportGenerator';
import HealthDataForm from '@/components/maternal-health/HealthDataForm';
import AppointmentScheduler from '@/components/maternal-health/AppointmentScheduler';
import { useIsMobile } from '@/hooks/use-mobile';

const MaternalHealth: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAppointmentSchedulerOpen, setIsAppointmentSchedulerOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Chatbot />
      
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 responsive-heading">Maternal Health</h1>
              <p className="text-gray-500 responsive-text">Track, monitor, and manage your pregnancy journey</p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="border-health-light-pink text-health-pink hover-card-effect"
                onClick={() => setIsAppointmentSchedulerOpen(true)}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Appointment
              </Button>
              <AppointmentScheduler 
                isOpen={isAppointmentSchedulerOpen} 
                setIsOpen={setIsAppointmentSchedulerOpen} 
              />
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
            <div className={`bg-white rounded-lg p-1 shadow-sm ${isMobile ? "w-full overflow-x-auto tabs-container-xs" : "inline-block"}`}>
              <TabsList className={`${isMobile ? "min-w-max tab-scrollable-xs" : "grid grid-cols-4 w-[500px]"}`}>
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

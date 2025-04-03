
import React, { useState } from 'react';
import { Calendar, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Chatbot from '@/components/Chatbot';
import HealthCheckupScheduler from '@/components/newborn-health/HealthCheckupScheduler';
import HealthMetricsDisplay from '@/components/newborn-health/HealthMetricsDisplay';
import ParentingLessons from '@/components/newborn-health/ParentingLessons';
import GrowthDataForm from '@/components/newborn-health/GrowthDataForm';
import BabyActivitiesTracker from '@/components/newborn-health/BabyActivitiesTracker';
import { growthData, feedingData, milestones, vaccinations } from '@/data/newbornHealthData';
import { useIsMobile } from '@/hooks/use-mobile';
import EnhancedAppointments from '@/components/newborn-health/EnhancedAppointments';
import SymptomsTracker from '@/components/newborn-health/SymptomsTracker';
import ImprovedGrowthChart from '@/components/newborn-health/ImprovedGrowthChart';
import EnhancedDocumentVerification from '@/components/newborn-health/EnhancedDocumentVerification';
import EnhancedDocumentScanner from '@/components/newborn-health/EnhancedDocumentScanner';

const NewbornHealth: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeFeatureTab, setActiveFeatureTab] = useState('growth');
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
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-white rounded-lg p-1 shadow-sm mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="growth">Growth</TabsTrigger>
              <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="mb-6">
                <HealthMetricsDisplay />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <ImprovedGrowthChart />
                <HealthCheckupScheduler open={showScheduler} setOpen={setShowScheduler} />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <BabyActivitiesTracker />
                <SymptomsTracker />
              </div>
              
              <div className="mb-6">
                <ParentingLessons />
              </div>
            </TabsContent>
            
            <TabsContent value="growth" className="space-y-6">
              <div className="mb-6">
                <ImprovedGrowthChart />
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-blue-800 font-medium">Why track growth?</p>
                  <p className="text-blue-700 text-sm">
                    Regular growth tracking helps ensure your baby is developing properly and can identify potential health issues early.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Button 
                  variant="outline" 
                  className="h-auto py-6 flex flex-col items-center justify-center gap-2"
                >
                  <Calendar className="h-6 w-6 text-health-blue" />
                  <span>Schedule Growth Assessment</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto py-6 flex flex-col items-center justify-center gap-2"
                >
                  <Calendar className="h-6 w-6 text-health-pink" />
                  <span>Add New Measurements</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto py-6 flex flex-col items-center justify-center gap-2"
                >
                  <Calendar className="h-6 w-6 text-health-mint" />
                  <span>Export Growth Data</span>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="symptoms" className="space-y-6">
              <SymptomsTracker />
            </TabsContent>
            
            <TabsContent value="appointments" className="space-y-6">
              <EnhancedAppointments />
            </TabsContent>
            
            <TabsContent value="documents" className="space-y-6">
              <Tabs defaultValue="verify" value={activeFeatureTab} onValueChange={setActiveFeatureTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="verify">Verify Documents</TabsTrigger>
                  <TabsTrigger value="scan">Scan Documents</TabsTrigger>
                </TabsList>
                
                <TabsContent value="verify">
                  <EnhancedDocumentVerification />
                </TabsContent>
                
                <TabsContent value="scan">
                  <EnhancedDocumentScanner />
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default NewbornHealth;

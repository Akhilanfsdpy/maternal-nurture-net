
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
import VaccinationsTabContent from '@/components/newborn-health/VaccinationsTabContent';
import BirthCertificateTabContent from '@/components/newborn-health/BirthCertificateTabContent';
import EnhancedDocumentsTabContent from '@/components/newborn-health/EnhancedDocumentsTabContent';
import { useToast } from '@/hooks/use-toast';
import '@/styles/responsive.css';

const NewbornHealth: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeFeatureTab, setActiveFeatureTab] = useState('verify');
  const [showScheduler, setShowScheduler] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleScheduleClick = () => {
    setShowScheduler(true);
  };

  const handleSosClick = () => {
    toast({
      title: "Emergency Alert",
      description: "Emergency contact has been notified. Help is on the way.",
      variant: "destructive",
    });
    // In a real app, this would trigger actual emergency notifications
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
            <div className="flex flex-wrap gap-3 w-full md:w-auto justify-between md:justify-end">
              <Button 
                variant="destructive" 
                className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
                onClick={handleSosClick}
              >
                <AlertCircle className="mr-2 h-4 w-4" />
                SOS Emergency
              </Button>
              <Button 
                variant="outline" 
                className="border-health-light-pink text-health-pink w-full sm:w-auto"
                onClick={handleScheduleClick}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Checkup
              </Button>
              <div className="w-full sm:w-auto">
                <GrowthDataForm />
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <div className="overflow-x-auto">
              <TabsList className="bg-white rounded-lg p-1 shadow-sm mb-6 min-w-max">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="growth">Growth</TabsTrigger>
                <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="birthcertificate">Birth Certificate</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ImprovedGrowthChart />
                <div className="flex flex-col space-y-6">
                  <HealthCheckupScheduler open={showScheduler} setOpen={setShowScheduler} />
                  <BabyActivitiesTracker />
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SymptomsTracker />
                <ParentingLessons />
              </div>
            </TabsContent>
            
            <TabsContent value="growth" className="space-y-6">
              <div className="mb-6">
                <ImprovedGrowthChart />
              </div>
            </TabsContent>
            
            <TabsContent value="symptoms" className="space-y-6">
              <SymptomsTracker />
            </TabsContent>
            
            <TabsContent value="appointments" className="space-y-6">
              <EnhancedAppointments />
            </TabsContent>
            
            <TabsContent value="vaccinations" className="space-y-6">
              <VaccinationsTabContent vaccinations={vaccinations} />
            </TabsContent>
            
            <TabsContent value="documents" className="space-y-6">
              <EnhancedDocumentsTabContent />
            </TabsContent>
            
            <TabsContent value="birthcertificate" className="space-y-6">
              <BirthCertificateTabContent />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default NewbornHealth;

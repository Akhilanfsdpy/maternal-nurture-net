
import React, { useState } from 'react';
import { Baby, Thermometer, Scale, Clock, Calendar, PlusCircle, Activity, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import HealthMetric from '@/components/HealthMetric';
import Chatbot from '@/components/Chatbot';
import GrowthMetrics from '@/components/newborn-health/GrowthMetrics';
import OverviewTabContent from '@/components/newborn-health/OverviewTabContent';
import FeedingTabContent from '@/components/newborn-health/FeedingTabContent';
import MilestonesTabContent from '@/components/newborn-health/MilestonesTabContent';
import VaccinationsTabContent from '@/components/newborn-health/VaccinationsTabContent';
import DocumentsTabContent from '@/components/newborn-health/DocumentsTabContent';
import HealthCheckupScheduler from '@/components/newborn-health/HealthCheckupScheduler';

// Sample growth data
const growthData = {
  weight: { current: 4.7, percentile: 65, lastRecorded: '3 days ago' },
  height: { current: 56, percentile: 70, lastRecorded: '1 week ago' },
  headCircumference: { current: 38.5, percentile: 60, lastRecorded: '1 week ago' },
};

// Sample feeding data
const feedingData = [
  { time: '7:30 AM', duration: '20 min', type: 'Breast', notes: 'Good latch, both sides' },
  { time: '10:15 AM', duration: '15 min', type: 'Breast', notes: 'Fussy, only left side' },
  { time: '1:00 PM', duration: '25 min', type: 'Breast', notes: 'Good feeding, both sides' },
  { time: '4:30 PM', duration: '18 min', type: 'Breast', notes: 'Sleepy but fed well' },
];

// Sample milestones data
const milestones = [
  { 
    id: 1, 
    name: 'Social Smile', 
    description: 'Baby smiles in response to your smile or voice',
    expectedAge: '1-2 months',
    completed: true,
    completedDate: '6 weeks'
  },
  { 
    id: 2, 
    name: 'Head Control', 
    description: 'Baby can hold head steady without support',
    expectedAge: '2-4 months',
    completed: true,
    completedDate: '10 weeks'
  },
  { 
    id: 3, 
    name: 'Rolling Over', 
    description: 'Baby can roll from tummy to back',
    expectedAge: '3-5 months',
    completed: false,
    completedDate: null
  },
  { 
    id: 4, 
    name: 'Sitting Up', 
    description: 'Baby can sit without support',
    expectedAge: '4-7 months',
    completed: false,
    completedDate: null
  },
];

// Sample vaccinations data
const vaccinations = [
  { 
    id: 1, 
    name: 'Hepatitis B', 
    doses: '3',
    received: '2',
    nextDose: 'Due at 6 months',
    lastDate: '4 months'
  },
  { 
    id: 2, 
    name: 'DTaP', 
    doses: '5',
    received: '2',
    nextDose: 'Due at 6 months',
    lastDate: '4 months'
  },
  { 
    id: 3, 
    name: 'Hib', 
    doses: '4',
    received: '2',
    nextDose: 'Due at 6 months',
    lastDate: '4 months'
  },
  { 
    id: 4, 
    name: 'Polio (IPV)', 
    doses: '4',
    received: '2',
    nextDose: 'Due at 6 months',
    lastDate: '4 months'
  },
];

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
              <Button className="bg-gradient-to-r from-health-pink to-health-light-pink">
                <PlusCircle className="mr-2 h-4 w-4" />
                Log Growth Data
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <HealthMetric
              title="Weight"
              value={4.7}
              unit="kg"
              icon={<Scale className="h-5 w-5" />}
              trend="up"
              trendValue="+0.3 kg this week"
              className="animate-fade-in"
            />
            <HealthMetric
              title="Temperature"
              value={36.8}
              unit="°C"
              icon={<Thermometer className="h-5 w-5" />}
              trend="stable"
              trendValue="Normal range"
              className="animate-fade-in"
            />
            <HealthMetric
              title="Feeding Frequency"
              value={6}
              unit="per day"
              icon={<Clock className="h-5 w-5" />}
              trend="down"
              trendValue="-1 from last week"
              className="animate-fade-in"
            />
            <HealthMetric
              title="Active Hours"
              value={4.5}
              unit="hours"
              icon={<Activity className="h-5 w-5" />}
              trend="up"
              trendValue="+0.5 from yesterday"
              className="animate-fade-in"
            />
          </div>

          <GrowthMetrics growthData={growthData} />

          {/* New Health Checkup Scheduler Component */}
          <div className="mb-8">
            <HealthCheckupScheduler />
          </div>

          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg p-1 shadow-sm inline-block">
              <TabsList className="grid grid-cols-5 w-[625px]">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="feeding">Feeding</TabsTrigger>
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
                <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
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
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default NewbornHealth;

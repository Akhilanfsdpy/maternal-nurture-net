
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import { Clock, CalendarDays, Pill, Utensils } from 'lucide-react';
import MaternalMetricsRow from '@/components/maternal-health/MaternalMetricsRow';
import PregnancyProgress from '@/components/maternal-health/PregnancyProgress';
import AppointmentsTabContent from '@/components/maternal-health/AppointmentsTabContent';
import SymptomsTabContent from '@/components/maternal-health/SymptomsTabContent';
import NutritionTabContent from '@/components/maternal-health/NutritionTabContent';
import OverviewTabContent from '@/components/maternal-health/OverviewTabContent';

const MaternalHealth: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">Maternal Health Dashboard</h1>
            <p className="text-gray-600">Track, monitor, and manage your pregnancy journey</p>
          </div>
          
          <PregnancyProgress />
          
          <MaternalMetricsRow />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-health-pink" />
                  Next Appointment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">Jun 15</p>
                <p className="text-sm text-gray-500">Dr. Emma Wilson - 10:00 AM</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <CalendarDays className="mr-2 h-4 w-4 text-health-pink" />
                  Current Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">Week 24</p>
                <p className="text-sm text-gray-500">Second Trimester</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Pill className="mr-2 h-4 w-4 text-health-pink" />
                  Medications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-gray-500">Active Prescriptions</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Utensils className="mr-2 h-4 w-4 text-health-pink" />
                  Nutrition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">1,800</p>
                <p className="text-sm text-gray-500">Daily Calorie Goal</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <OverviewTabContent />
            </TabsContent>
            
            <TabsContent value="appointments">
              <AppointmentsTabContent />
            </TabsContent>
            
            <TabsContent value="symptoms">
              <SymptomsTabContent />
            </TabsContent>
            
            <TabsContent value="nutrition">
              <NutritionTabContent />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default MaternalHealth;

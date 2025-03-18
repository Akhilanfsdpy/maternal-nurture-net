import React, { useState } from 'react';
import { Heart, Activity, Clock, Droplets, Calendar, PlusCircle, Pencil, Pills, Utensils, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import HealthMetric from '@/components/HealthMetric';
import Chatbot from '@/components/Chatbot';
import { cn } from '@/lib/utils';

// Sample symptoms data
const symptoms = [
  { id: 1, name: 'Nausea', severity: 'Mild', time: '2 days ago', status: 'improving' },
  { id: 2, name: 'Fatigue', severity: 'Moderate', time: 'Today', status: 'steady' },
  { id: 3, name: 'Backache', severity: 'Mild', time: 'Yesterday', status: 'improving' },
];

// Sample medication data
const medications = [
  { id: 1, name: 'Prenatal Vitamins', dosage: '1 tablet', frequency: 'Daily', schedule: 'Morning' },
  { id: 2, name: 'Iron Supplement', dosage: '1 tablet', frequency: 'Daily', schedule: 'After meal' },
  { id: 3, name: 'Calcium', dosage: '1 tablet', frequency: 'Twice daily', schedule: 'Morning/Evening' },
];

// Sample nutrition data
const nutritionData = [
  { name: 'Protein', value: 85, target: 70, unit: 'g' },
  { name: 'Iron', value: 18, target: 27, unit: 'mg' },
  { name: 'Calcium', value: 900, target: 1000, unit: 'mg' },
  { name: 'Folate', value: 580, target: 600, unit: 'mcg' },
  { name: 'Water', value: 2.4, target: 3, unit: 'L' },
];

// Sample appointments data
const appointments = [
  { 
    id: 1, 
    title: 'Prenatal Checkup', 
    doctor: 'Dr. Sarah Johnson',
    location: 'City Medical Center',
    date: 'May 15, 2023',
    time: '10:00 AM',
    notes: 'Bring previous ultrasound reports'
  },
  { 
    id: 2, 
    title: 'Glucose Tolerance Test', 
    doctor: 'Dr. Sarah Johnson',
    location: 'City Medical Center',
    date: 'May 28, 2023',
    time: '9:00 AM',
    notes: 'Fast for 8 hours before the test'
  },
];

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
              <Button variant="outline" className="border-health-light-blue text-health-blue">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Appointment
              </Button>
              <Button className="bg-gradient-to-r from-health-blue to-health-light-blue">
                <PlusCircle className="mr-2 h-4 w-4" />
                Log Health Data
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <HealthMetric
              title="Heart Rate"
              value={79}
              unit="bpm"
              icon={<Heart className="h-5 w-5" />}
              trend="stable"
              trendValue="Normal range"
              className="animate-fade-in"
            />
            <HealthMetric
              title="Blood Pressure"
              value="118/76"
              unit="mmHg"
              icon={<Activity className="h-5 w-5" />}
              trend="up"
              trendValue="+3 from yesterday"
              className="animate-fade-in"
            />
            <HealthMetric
              title="Sleep Quality"
              value={6.7}
              unit="hours"
              icon={<Clock className="h-5 w-5" />}
              trend="down"
              trendValue="-0.3 from average"
              status="warning"
              className="animate-fade-in"
            />
            <HealthMetric
              title="Hydration"
              value={2.1}
              unit="liters"
              icon={<Droplets className="h-5 w-5" />}
              trend="stable"
              trendValue="Good level"
              className="animate-fade-in"
            />
          </div>

          <Card className="mb-8 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Pregnancy Progress</CardTitle>
                <span className="text-sm text-gray-500">Week 24 of 40</span>
              </div>
              <CardDescription>Second Trimester</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={60} className="h-2" />
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">First Trimester</p>
                    <p className="text-sm text-gray-400">Weeks 1-13</p>
                    <div className="w-4 h-4 bg-health-blue rounded-full mx-auto"></div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-primary">Second Trimester</p>
                    <p className="text-sm text-gray-400">Weeks 14-27</p>
                    <div className="w-6 h-6 bg-health-blue rounded-full mx-auto flex items-center justify-center">
                      <span className="text-xs text-white">24</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Third Trimester</p>
                    <p className="text-sm text-gray-400">Weeks 28-40</p>
                    <div className="w-4 h-4 bg-gray-200 rounded-full mx-auto"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

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

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Pills className="mr-2 h-5 w-5 text-health-blue" />
                      Medications & Supplements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {medications.map((med) => (
                        <li key={med.id} className="flex items-start justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div>
                            <p className="font-medium text-gray-900">{med.name}</p>
                            <p className="text-sm text-gray-500">{med.dosage} • {med.frequency}</p>
                            <p className="text-xs text-gray-400">{med.schedule}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Medication
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="mr-2 h-5 w-5 text-health-blue" />
                      Recent Symptoms
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {symptoms.map((symptom) => (
                        <li key={symptom.id} className="p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-gray-900">{symptom.name}</p>
                            <span className={cn(
                              "text-xs px-2 py-0.5 rounded-full",
                              symptom.severity === 'Mild' ? 'bg-emerald-100 text-emerald-800' : 
                              symptom.severity === 'Moderate' ? 'bg-amber-100 text-amber-800' : 
                              'bg-red-100 text-red-800'
                            )}>
                              {symptom.severity}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">{symptom.time}</p>
                            <p className={cn(
                              "text-xs",
                              symptom.status === 'improving' ? 'text-emerald-600' : 
                              symptom.status === 'worsening' ? 'text-red-600' : 
                              'text-amber-600'
                            )}>
                              {symptom.status === 'improving' ? '↓ Improving' : 
                               symptom.status === 'worsening' ? '↑ Worsening' : '→ Steady'}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Log Symptom
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-health-blue" />
                      Upcoming Appointments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {appointments.map((appt) => (
                        <li key={appt.id} className="p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <p className="font-medium text-gray-900">{appt.title}</p>
                          <p className="text-sm text-gray-600">{appt.doctor}</p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-sm text-gray-500">{appt.date}</p>
                            <p className="text-sm text-gray-500">{appt.time}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Schedule Appointment
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Utensils className="mr-2 h-5 w-5 text-health-blue" />
                      Nutrition
                    </CardTitle>
                    <CardDescription>Daily nutrient intake</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {nutritionData.map((nutrient) => {
                        const percentage = Math.min(100, (nutrient.value / nutrient.target) * 100);
                        return (
                          <div key={nutrient.name} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{nutrient.name}</span>
                              <span className="text-sm text-gray-500">
                                {nutrient.value} / {nutrient.target} {nutrient.unit}
                              </span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className={cn(
                                  "h-full rounded-full",
                                  percentage >= 100 ? "bg-emerald-500" : 
                                  percentage >= 75 ? "bg-health-blue" : 
                                  percentage >= 50 ? "bg-amber-500" : 
                                  "bg-red-500"
                                )}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Log Meal
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Dumbbell className="mr-2 h-5 w-5 text-health-blue" />
                      Activity Recommendations
                    </CardTitle>
                    <CardDescription>Safe exercises for your stage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="p-3 rounded-lg bg-health-blue/5 border border-health-blue/10">
                        <p className="font-medium text-gray-900">Walking</p>
                        <p className="text-sm text-gray-600 mb-2">30 minutes daily at a comfortable pace</p>
                        <div className="flex items-center space-x-1 text-health-blue text-xs">
                          <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-gray-300">★</span>
                          <span className="ml-1">Highly Recommended</span>
                        </div>
                      </li>
                      <li className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <p className="font-medium text-gray-900">Prenatal Yoga</p>
                        <p className="text-sm text-gray-600 mb-2">2-3 sessions per week with qualified instructor</p>
                        <div className="flex items-center space-x-1 text-health-blue text-xs">
                          <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-gray-300">★</span>
                          <span className="ml-1">Highly Recommended</span>
                        </div>
                      </li>
                      <li className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <p className="font-medium text-gray-900">Swimming</p>
                        <p className="text-sm text-gray-600 mb-2">Low-impact exercise, 20-30 minutes per session</p>
                        <div className="flex items-center space-x-1 text-health-blue text-xs">
                          <span>★</span><span>★</span><span>★</span><span className="text-gray-300">★</span><span className="text-gray-300">★</span>
                          <span className="ml-1">Recommended</span>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Log Exercise
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* Other tabs would go here */}
            <TabsContent value="symptoms">
              <Card>
                <CardHeader>
                  <CardTitle>Symptom Tracking</CardTitle>
                  <CardDescription>Monitor and record symptoms throughout your pregnancy</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Content for the symptoms tab would go here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="nutrition">
              <Card>
                <CardHeader>
                  <CardTitle>Nutrition Management</CardTitle>
                  <CardDescription>Track diet and nutritional intake</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Content for the nutrition tab would go here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments">
              <Card>
                <CardHeader>
                  <CardTitle>Appointments & Schedule</CardTitle>
                  <CardDescription>Manage healthcare visits and checkups</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Content for the appointments tab would go here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default MaternalHealth;

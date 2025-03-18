import React, { useState } from 'react';
import { Baby, Thermometer, Scale, Clock, Calendar, PlusCircle, Activity, Utensils, Milestone, Check, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import HealthMetric from '@/components/HealthMetric';
import Chatbot from '@/components/Chatbot';
import { cn } from '@/lib/utils';
import DocumentsTabContent from '@/components/newborn-health/DocumentsTabContent';

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

          <Card className="mb-8 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Growth & Development</CardTitle>
                <span className="text-sm text-gray-500">Age: 3 months, 2 weeks</span>
              </div>
              <CardDescription>Tracking key growth indicators against standard percentiles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Weight</h3>
                    <span className="text-sm text-gray-500">Last recorded: {growthData.weight.lastRecorded}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-semibold">{growthData.weight.current} kg</span>
                    <span className="text-sm text-health-blue">{growthData.weight.percentile}th percentile</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-health-pink rounded-full"
                      style={{ width: `${growthData.weight.percentile}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Height</h3>
                    <span className="text-sm text-gray-500">Last recorded: {growthData.height.lastRecorded}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-semibold">{growthData.height.current} cm</span>
                    <span className="text-sm text-health-blue">{growthData.height.percentile}th percentile</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-health-blue rounded-full"
                      style={{ width: `${growthData.height.percentile}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Head Circumference</h3>
                    <span className="text-sm text-gray-500">Last recorded: {growthData.headCircumference.lastRecorded}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-semibold">{growthData.headCircumference.current} cm</span>
                    <span className="text-sm text-health-blue">{growthData.headCircumference.percentile}th percentile</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-health-light-blue rounded-full"
                      style={{ width: `${growthData.headCircumference.percentile}%` }}
                    />
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
              <TabsList className="grid grid-cols-5 w-[625px]">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="feeding">Feeding</TabsTrigger>
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
                <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Utensils className="mr-2 h-5 w-5 text-health-pink" />
                      Recent Feedings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {feedingData.map((feeding, index) => (
                        <li key={index} className="p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-900">{feeding.time}</p>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-health-pink/10 text-health-pink">
                              {feeding.type}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-sm text-gray-600">{feeding.duration}</p>
                            <p className="text-sm text-gray-500">{feeding.notes}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Log Feeding
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-health-pink" />
                      Growth Chart
                    </CardTitle>
                    <CardDescription>Percentile tracking over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60 flex items-center justify-center">
                      <p className="text-gray-500 italic">Interactive growth chart would appear here</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Detailed Growth Charts
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Baby className="mr-2 h-5 w-5 text-health-pink" />
                      Upcoming Milestones
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {milestones.filter(m => !m.completed).slice(0, 3).map((milestone) => (
                        <li key={milestone.id} className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                          <p className="font-medium text-gray-900">{milestone.name}</p>
                          <p className="text-sm text-gray-600 mb-1">{milestone.description}</p>
                          <p className="text-xs text-gray-500">Expected around {milestone.expectedAge}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Milestones
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-health-pink" />
                      Sleep Pattern
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Total sleep (last 24h)</span>
                        <span className="text-lg font-semibold">14.5 hours</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-health-blue rounded-full" style={{ width: '85%' }} />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Recommended: 14-17 hours</span>
                        <span>85%</span>
                      </div>

                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Night sleep</span>
                          <span className="text-sm font-medium">8.5 hours</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Day naps</span>
                          <span className="text-sm font-medium">6 hours (3 naps)</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Log Sleep
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* Feeding Tab */}
            <TabsContent value="feeding">
              <Card>
                <CardHeader>
                  <CardTitle>Feeding Tracker</CardTitle>
                  <CardDescription>Monitor your baby's feeding patterns and nutrition</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Content for the feeding tab would go here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Milestones Tab */}
            <TabsContent value="milestones" className="space-y-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Development Milestones</CardTitle>
                  <CardDescription>Track your baby's developmental progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Completed Milestones</h3>
                      <ul className="space-y-4">
                        {milestones.filter(m => m.completed).map((milestone) => (
                          <li key={milestone.id} className="p-4 rounded-lg bg-health-mint/10 border border-health-mint/20">
                            <div className="flex items-start">
                              <div className="mt-1 mr-3 h-6 w-6 rounded-full bg-health-mint/20 flex items-center justify-center">
                                <Check className="h-4 w-4 text-emerald-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{milestone.name}</p>
                                <p className="text-sm text-gray-600 mb-1">{milestone.description}</p>
                                <div className="flex items-center">
                                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                                    Achieved at {milestone.completedDate}
                                  </span>
                                  <span className="text-xs text-gray-500 ml-2">
                                    (Expected: {milestone.expectedAge})
                                  </span>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Upcoming Milestones</h3>
                      <ul className="space-y-4">
                        {milestones.filter(m => !m.completed).map((milestone) => (
                          <li key={milestone.id} className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                            <div className="flex items-start">
                              <div className="mt-1 mr-3 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{milestone.name}</p>
                                <p className="text-sm text-gray-600 mb-1">{milestone.description}</p>
                                <p className="text-xs text-gray-500">Expected around {milestone.expectedAge}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gradient-to-r from-health-pink to-health-light-pink">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Record New Milestone
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Vaccinations Tab */}
            <TabsContent value="vaccinations">
              <Card>
                <CardHeader>
                  <CardTitle>Vaccination Records</CardTitle>
                  <CardDescription>Keep track of your baby's immunization schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Vaccine</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Required Doses</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Received</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Last Date</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Next Dose</th>
                          </tr>
                        </thead>
                        <tbody>
                          {vaccinations.map((vaccine) => (
                            <tr key={vaccine.id} className="border-b hover:bg-gray-50">
                              <td className="py-3 px-4 text-sm font-medium">{vaccine.name}</td>
                              <td className="py-3 px-4 text-sm">{vaccine.doses}</td>
                              <td className="py-3 px-4">
                                <span className="px-2 py-1 text-xs rounded-full bg-health-blue/10 text-health-blue font-medium">
                                  {vaccine.received} of {vaccine.doses}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-sm">{vaccine.lastDate}</td>
                              <td className="py-3 px-4 text-sm">{vaccine.nextDose}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Record Vaccination
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Documents Tab */}
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

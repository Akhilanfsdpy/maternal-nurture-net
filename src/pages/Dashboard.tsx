import React, { useEffect, useState } from 'react';
import { Heart, Baby, Activity, CalendarClock, Bell, BarChart, Thermometer, Clock, Droplets } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import HealthMetric from '@/components/HealthMetric';
import Chatbot from '@/components/Chatbot';
import { cn } from '@/lib/utils';
import NotificationsPanel from '@/components/notifications/NotificationsPanel';

const maternalData = [
  { date: 'Week 1', heartRate: 78, bp: 115, sleep: 7.2 },
  { date: 'Week 2', heartRate: 82, bp: 118, sleep: 6.8 },
  { date: 'Week 3', heartRate: 79, bp: 120, sleep: 6.5 },
  { date: 'Week 4', heartRate: 77, bp: 116, sleep: 7.0 },
  { date: 'Week 5', heartRate: 80, bp: 119, sleep: 6.7 },
  { date: 'Week 6', heartRate: 81, bp: 121, sleep: 6.9 },
  { date: 'Week 7', heartRate: 76, bp: 117, sleep: 7.3 },
];

const newbornData = [
  { date: 'Week 1', weight: 3.2, temperature: 36.7, feeding: 8 },
  { date: 'Week 2', weight: 3.5, temperature: 36.8, feeding: 7 },
  { date: 'Week 3', weight: 3.8, temperature: 36.6, feeding: 7 },
  { date: 'Week 4', weight: 4.1, temperature: 36.7, feeding: 6 },
  { date: 'Week 5', weight: 4.4, temperature: 36.9, feeding: 6 },
  { date: 'Week 6', weight: 4.7, temperature: 36.8, feeding: 6 },
  { date: 'Week 7', weight: 5.0, temperature: 36.7, feeding: 5 },
];

const upcomingEvents = [
  {
    id: 1,
    title: 'Prenatal Checkup',
    date: 'Tomorrow, 10:00 AM',
    type: 'maternal',
  },
  {
    id: 2,
    title: 'Vaccination Appointment',
    date: 'May 15, 11:30 AM',
    type: 'newborn',
  },
  {
    id: 3,
    title: 'Ultrasound Scan',
    date: 'May 18, 2:15 PM',
    type: 'maternal',
  },
];

const recentAlerts = [
  {
    id: 1,
    message: 'Blood pressure slightly elevated',
    time: '2 hours ago',
    severity: 'warning',
    type: 'maternal',
  },
  {
    id: 2,
    title: 'Sleep quality below average',
    time: 'Yesterday',
    severity: 'info',
    type: 'maternal',
  },
  {
    id: 3,
    title: 'Baby temperature normal after fever',
    time: '2 days ago',
    severity: 'success',
    type: 'newborn',
  },
];

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Chatbot />
      
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Health Dashboard</h1>
              <p className="text-gray-500">Monitor and track health metrics for you and your baby</p>
            </div>
            <div className="flex gap-3">
              <NotificationsPanel />
              <Button className="bg-gradient-to-r from-health-blue to-health-light-blue">
                <Activity className="mr-2 h-4 w-4" />
                Record Vitals
              </Button>
            </div>
          </div>

          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg p-1 shadow-sm inline-block">
              <TabsList className="grid grid-cols-3 w-[400px]">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="maternal">Maternal</TabsTrigger>
                <TabsTrigger value="newborn">Newborn</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <HealthMetric
                  title="Maternal Heart Rate"
                  value={79}
                  unit="bpm"
                  icon={<Heart className="h-5 w-5" />}
                  trend="stable"
                  trendValue="+2 from yesterday"
                  className="animate-fade-in"
                  status="normal"
                />
                <HealthMetric
                  title="Blood Pressure"
                  value="118/76"
                  unit="mmHg"
                  icon={<Activity className="h-5 w-5" />}
                  trend="up"
                  trendValue="+3 from yesterday"
                  className="animate-fade-in"
                  status="normal"
                />
                <HealthMetric
                  title="Baby Weight"
                  value={4.7}
                  unit="kg"
                  icon={<Baby className="h-5 w-5" />}
                  trend="up"
                  trendValue="+0.3 kg this week"
                  className="animate-fade-in"
                  status="normal"
                />
                <HealthMetric
                  title="Baby Temperature"
                  value={36.8}
                  unit="°C"
                  icon={<Thermometer className="h-5 w-5" />}
                  trend="stable"
                  trendValue="Normal range"
                  className="animate-fade-in"
                  status="normal"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle>Health Trends</CardTitle>
                    <CardDescription>7-day overview of key metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      {loading ? (
                        <div className="h-full w-full flex items-center justify-center">
                          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                        </div>
                      ) : (
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={maternalData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient id="colorHeartRate" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#4A90E2" stopOpacity={0} />
                              </linearGradient>
                              <linearGradient id="colorBP" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#F5A9B8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#F5A9B8" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Area
                              type="monotone"
                              dataKey="heartRate"
                              stroke="#4A90E2"
                              fillOpacity={1}
                              fill="url(#colorHeartRate)"
                              name="Heart Rate (bpm)"
                            />
                            <Area
                              type="monotone"
                              dataKey="bp"
                              stroke="#F5A9B8"
                              fillOpacity={1}
                              fill="url(#colorBP)"
                              name="Blood Pressure (systolic)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center">
                        <CalendarClock className="mr-2 h-5 w-5 text-health-blue" />
                        Upcoming Events
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {upcomingEvents.map((event) => (
                          <li key={event.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className={cn(
                              "mt-0.5 h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                              event.type === 'maternal' ? 'bg-health-light-blue/20' : 'bg-health-light-pink/20'
                            )}>
                              {event.type === 'maternal' ? (
                                <Heart className="h-5 w-5 text-health-blue" />
                              ) : (
                                <Baby className="h-5 w-5 text-health-pink" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{event.title}</p>
                              <p className="text-sm text-gray-500">{event.date}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center">
                        <Bell className="mr-2 h-5 w-5 text-health-blue" />
                        Recent Alerts
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {recentAlerts.map((alert) => (
                          <li key={alert.id} className="p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center space-x-2">
                              <div className={cn(
                                "h-2 w-2 rounded-full",
                                alert.severity === 'warning' ? 'bg-amber-500' : 
                                alert.severity === 'info' ? 'bg-blue-500' : 'bg-emerald-500'
                              )} />
                              <p className="font-medium text-gray-900">{alert.title}</p>
                            </div>
                            <p className="text-sm text-gray-500 ml-4">{alert.time}</p>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="maternal" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <HealthMetric
                  title="Heart Rate"
                  value={79}
                  unit="bpm"
                  icon={<Heart className="h-5 w-5" />}
                  trend="stable"
                  trendValue="Normal range"
                />
                <HealthMetric
                  title="Blood Pressure"
                  value="118/76"
                  unit="mmHg"
                  icon={<Activity className="h-5 w-5" />}
                  trend="up"
                  trendValue="+3 from yesterday"
                />
                <HealthMetric
                  title="Sleep Quality"
                  value={6.7}
                  unit="hours"
                  icon={<Clock className="h-5 w-5" />}
                  trend="down"
                  trendValue="-0.3 from average"
                  status="warning"
                />
                <HealthMetric
                  title="Hydration"
                  value={2.1}
                  unit="liters"
                  icon={<Droplets className="h-5 w-5" />}
                  trend="stable"
                  trendValue="Good level"
                />
              </div>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Maternal Health Trends</CardTitle>
                  <CardDescription>Weekly tracking of vital signs and health metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={maternalData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorHeartRate2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#4A90E2" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorBP2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F5A9B8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#F5A9B8" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#B4EDD2" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#B4EDD2" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="heartRate"
                          stroke="#4A90E2"
                          fillOpacity={1}
                          fill="url(#colorHeartRate2)"
                          name="Heart Rate (bpm)"
                        />
                        <Area
                          type="monotone"
                          dataKey="bp"
                          stroke="#F5A9B8"
                          fillOpacity={1}
                          fill="url(#colorBP2)"
                          name="Blood Pressure (systolic)"
                        />
                        <Area
                          type="monotone"
                          dataKey="sleep"
                          stroke="#B4EDD2"
                          fillOpacity={1}
                          fill="url(#colorSleep)"
                          name="Sleep (hours)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="newborn" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <HealthMetric
                  title="Weight"
                  value={4.7}
                  unit="kg"
                  icon={<Baby className="h-5 w-5" />}
                  trend="up"
                  trendValue="+0.3 kg this week"
                />
                <HealthMetric
                  title="Temperature"
                  value={36.8}
                  unit="°C"
                  icon={<Thermometer className="h-5 w-5" />}
                  trend="stable"
                  trendValue="Normal range"
                />
                <HealthMetric
                  title="Feeding Frequency"
                  value={6}
                  unit="per day"
                  icon={<Clock className="h-5 w-5" />}
                  trend="down"
                  trendValue="-1 from last week"
                />
                <HealthMetric
                  title="Growth Percentile"
                  value={65}
                  unit="%"
                  icon={<BarChart className="h-5 w-5" />}
                  trend="up"
                  trendValue="+5% from last check"
                />
              </div>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Newborn Growth Chart</CardTitle>
                  <CardDescription>Weekly tracking of key growth indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={newbornData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F5A9B8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#F5A9B8" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorTemperature" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#4A90E2" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorFeeding" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#B4EDD2" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#B4EDD2" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="weight"
                          stroke="#F5A9B8"
                          fillOpacity={1}
                          fill="url(#colorWeight)"
                          name="Weight (kg)"
                        />
                        <Area
                          type="monotone"
                          dataKey="temperature"
                          stroke="#4A90E2"
                          fillOpacity={1}
                          fill="url(#colorTemperature)"
                          name="Temperature (°C)"
                        />
                        <Area
                          type="monotone"
                          dataKey="feeding"
                          stroke="#B4EDD2"
                          fillOpacity={1}
                          fill="url(#colorFeeding)"
                          name="Feedings per day"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

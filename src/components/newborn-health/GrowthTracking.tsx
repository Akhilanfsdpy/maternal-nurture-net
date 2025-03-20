
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { ArrowRight, Calendar, Award, BarChart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample data for the growth chart
const growthChartData = [
  { age: '1m', weight: 4.2, height: 52, weightPercentile: 50, heightPercentile: 55 },
  { age: '2m', weight: 5.3, height: 56, weightPercentile: 52, heightPercentile: 57 },
  { age: '3m', weight: 6.1, height: 61, weightPercentile: 55, heightPercentile: 60 },
  { age: '4m', weight: 6.8, height: 63, weightPercentile: 58, heightPercentile: 62 },
  { age: '5m', weight: 7.3, height: 66, weightPercentile: 60, heightPercentile: 63 },
  { age: '6m', weight: 7.8, height: 69, weightPercentile: 62, heightPercentile: 65 },
];

// Sample data for upcoming milestones
const upcomingMilestones = [
  { id: 1, title: 'Follow objects with eyes', ageRange: '2-3 months', completed: true },
  { id: 2, title: 'Hold head up', ageRange: '3-4 months', completed: true },
  { id: 3, title: 'Roll over', ageRange: '4-6 months', completed: false },
  { id: 4, title: 'Sit without support', ageRange: '6-8 months', completed: false },
  { id: 5, title: 'Crawl', ageRange: '7-10 months', completed: false },
];

// Sample parenting tips
const parentingTips = [
  { 
    id: 1, 
    title: 'Baby Massage Techniques', 
    type: 'Video', 
    description: 'Learn gentle massage techniques to soothe your baby and promote bonding.',
    url: '#',
  },
  { 
    id: 2, 
    title: 'Sleep Training Basics', 
    type: 'Article', 
    description: 'Effective methods to help your baby develop healthy sleep habits.',
    url: '#',
  },
  { 
    id: 3, 
    title: 'Introducing Solid Foods', 
    type: 'Guide', 
    description: 'When and how to start introducing solid foods to your baby\'s diet.',
    url: '#',
  },
];

const GrowthTracking: React.FC = () => {
  const [activeTab, setActiveTab] = useState('growth');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [date, setDate] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!weight || !height || !date) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send data to an API
    toast({
      title: "Growth Data Logged",
      description: `Successfully recorded weight: ${weight}kg, height: ${height}cm on ${date}.`,
    });

    // Reset form
    setWeight('');
    setHeight('');
    setDate('');
  };

  const handleCompleteMilestone = (id: number) => {
    toast({
      title: "Milestone Completed",
      description: "This achievement has been recorded in your baby's development history.",
    });
  };

  return (
    <Card className="shadow-sm mt-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart className="mr-2 h-5 w-5 text-health-pink" />
          Personalized Growth & Development Tracking
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="growth">Growth Charts</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="tips">Parenting Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="growth" className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-3">Log New Measurements</h3>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input 
                    id="weight" 
                    type="number" 
                    step="0.1" 
                    placeholder="e.g. 7.2"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)} 
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input 
                    id="height" 
                    type="number" 
                    step="0.1" 
                    placeholder="e.g. 65"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)} 
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input 
                    id="date" 
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)} 
                  />
                </div>
                <div className="md:col-span-3">
                  <Button type="submit" className="w-full md:w-auto bg-gradient-to-r from-health-pink to-health-light-pink">
                    Log Growth Data
                  </Button>
                </div>
              </form>
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Growth Chart</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={growthChartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="weight" 
                      stroke="#8884d8" 
                      name="Weight (kg)"
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="height" 
                      stroke="#82ca9d" 
                      name="Height (cm)" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-sm font-medium mb-3">Current Percentiles</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Weight:</span>
                      <span className="font-medium">62nd percentile</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Height:</span>
                      <span className="font-medium">65th percentile</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Head Circumference:</span>
                      <span className="font-medium">58th percentile</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-sm font-medium mb-3">AI Growth Predictions</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Projected Weight (12m):</span>
                      <span className="font-medium">9.1-9.8 kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Projected Height (12m):</span>
                      <span className="font-medium">74-76 cm</span>
                    </div>
                    <Button variant="link" className="text-health-blue p-0">
                      View Detailed Predictions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="milestones">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Upcoming Milestones</h3>
                <div className="space-y-4">
                  {upcomingMilestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{milestone.title}</p>
                        <p className="text-sm text-gray-500">Expected: {milestone.ageRange}</p>
                      </div>
                      <Button 
                        variant={milestone.completed ? "outline" : "default"}
                        className={milestone.completed ? "border-green-500 text-green-600" : "bg-health-pink"}
                        onClick={() => handleCompleteMilestone(milestone.id)}
                        disabled={milestone.completed}
                      >
                        {milestone.completed ? "Completed" : "Mark Complete"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">Development Summary</h3>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium">Physical Development</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Your baby is showing excellent progress in motor skills development. 
                          Continue tummy time exercises to strengthen neck and core muscles.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Cognitive Development</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Your baby is responding well to visual and auditory stimuli. 
                          Try introducing colorful toys and simple songs to stimulate cognitive growth.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Social Development</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Your baby is beginning to recognize familiar faces and voices. 
                          Social interaction time is crucial at this stage.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tips">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Personalized Recommendations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {parentingTips.map((tip) => (
                    <Card key={tip.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start space-x-4">
                          <div className="bg-blue-100 p-2 rounded-full">
                            {tip.type === 'Video' && (
                              <Award className="h-5 w-5 text-health-blue" />
                            )}
                            {tip.type === 'Article' && (
                              <Calendar className="h-5 w-5 text-health-blue" />
                            )}
                            {tip.type === 'Guide' && (
                              <BarChart className="h-5 w-5 text-health-blue" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">{tip.title}</h4>
                            <p className="text-xs text-gray-500 mt-1">{tip.type}</p>
                            <p className="text-sm text-gray-600 mt-2">{tip.description}</p>
                            <Button variant="link" className="text-health-blue p-0 mt-2">
                              View Resource <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">Weekly Progress Report</h3>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium">This Week's Highlights</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                          <li>Weight increased by 120g (healthy growth rate)</li>
                          <li>Achieved new milestone: Holds head up steadily</li>
                          <li>Sleep pattern improving (averaging 14 hours daily)</li>
                          <li>Feeding schedule well-established</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Next Week's Focus Areas</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                          <li>Continue tummy time exercises (aim for 20 minutes daily)</li>
                          <li>Introduce high-contrast visual stimulation</li>
                          <li>Monitor for signs of rolling over</li>
                          <li>Maintain feeding and sleep schedule</li>
                        </ul>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-health-blue to-health-light-blue">
                        Generate Detailed PDF Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GrowthTracking;

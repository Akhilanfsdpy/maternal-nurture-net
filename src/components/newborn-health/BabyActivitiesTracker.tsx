
import React, { useState } from 'react';
import { Clock, Utensils, Bath, Moon, Sun, Activity } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';

type ActivityType = 'feeding' | 'sleep' | 'diaper' | 'bath' | 'other';

interface ActivityLog {
  id: string;
  type: ActivityType;
  startTime: Date;
  endTime?: Date;
  details?: string;
  notes?: string;
}

const BabyActivitiesTracker: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<ActivityType>('feeding');
  const [showForm, setShowForm] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<ActivityType>('feeding');
  const [details, setDetails] = useState('');
  const [notes, setNotes] = useState('');
  const [duration, setDuration] = useState('');
  
  // In a real app, this would be fetched from an API
  const [recentActivities, setRecentActivities] = useState<ActivityLog[]>([
    {
      id: '1',
      type: 'feeding',
      startTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      details: 'Breast milk',
      notes: 'Fed well'
    },
    {
      id: '2',
      type: 'sleep',
      startTime: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      endTime: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      notes: 'Slept peacefully'
    },
    {
      id: '3',
      type: 'diaper',
      startTime: new Date(Date.now() - 1.5 * 60 * 60 * 1000), // 1.5 hours ago
      details: 'Wet',
    }
  ]);

  const activityIcons = {
    feeding: <Utensils className="h-5 w-5 text-orange-500" />,
    sleep: <Moon className="h-5 w-5 text-indigo-500" />,
    diaper: <Bath className="h-5 w-5 text-blue-500" />,
    bath: <Bath className="h-5 w-5 text-cyan-500" />,
    other: <Activity className="h-5 w-5 text-gray-500" />
  };

  const handleLogActivity = () => {
    if (!details && (selectedActivity === 'feeding' || selectedActivity === 'diaper')) {
      toast({
        title: "Missing Information",
        description: "Please provide activity details",
        variant: "destructive"
      });
      return;
    }

    const newActivity: ActivityLog = {
      id: Date.now().toString(),
      type: selectedActivity,
      startTime: new Date(),
      details,
      notes
    };

    if (selectedActivity === 'sleep' && duration) {
      // If sleep, calculate end time based on duration (in minutes)
      const durationMs = parseInt(duration) * 60 * 1000;
      newActivity.endTime = new Date(Date.now() + durationMs);
    }

    setRecentActivities([newActivity, ...recentActivities]);
    
    toast({
      title: "Activity Logged",
      description: `New ${selectedActivity} activity has been recorded.`,
    });

    // Reset form
    setDetails('');
    setNotes('');
    setDuration('');
    setShowForm(false);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5 text-health-pink" />
          Baby Activities Tracker
        </CardTitle>
        <CardDescription>Log daily activities and keep track of your baby's routine</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="feeding" value={activeTab} onValueChange={(value) => setActiveTab(value as ActivityType)}>
          <div className="flex justify-between items-center mb-4">
            <TabsList className="bg-muted">
              <TabsTrigger value="feeding">Feeding</TabsTrigger>
              <TabsTrigger value="sleep">Sleep</TabsTrigger>
              <TabsTrigger value="diaper">Diaper</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>
            
            <Dialog open={showForm} onOpenChange={setShowForm}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-health-pink to-health-light-pink">
                  Log New Activity
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Log New Activity</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant={selectedActivity === 'feeding' ? 'default' : 'outline'} 
                      onClick={() => setSelectedActivity('feeding')}
                      className={selectedActivity === 'feeding' ? 'bg-orange-500' : ''}
                    >
                      <Utensils className="mr-2 h-4 w-4" />
                      Feeding
                    </Button>
                    <Button 
                      variant={selectedActivity === 'sleep' ? 'default' : 'outline'} 
                      onClick={() => setSelectedActivity('sleep')}
                      className={selectedActivity === 'sleep' ? 'bg-indigo-500' : ''}
                    >
                      <Moon className="mr-2 h-4 w-4" />
                      Sleep
                    </Button>
                    <Button 
                      variant={selectedActivity === 'diaper' ? 'default' : 'outline'} 
                      onClick={() => setSelectedActivity('diaper')}
                      className={selectedActivity === 'diaper' ? 'bg-blue-500' : ''}
                    >
                      <Bath className="mr-2 h-4 w-4" />
                      Diaper
                    </Button>
                    <Button 
                      variant={selectedActivity === 'bath' ? 'default' : 'outline'} 
                      onClick={() => setSelectedActivity('bath')}
                      className={selectedActivity === 'bath' ? 'bg-cyan-500' : ''}
                    >
                      <Bath className="mr-2 h-4 w-4" />
                      Bath
                    </Button>
                  </div>
                  
                  {selectedActivity === 'feeding' && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Type</label>
                      <div className="flex gap-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setDetails('Breast milk')}
                          className={details === 'Breast milk' ? 'bg-orange-100 border-orange-300' : ''}
                        >
                          Breast milk
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setDetails('Formula')}
                          className={details === 'Formula' ? 'bg-orange-100 border-orange-300' : ''}
                        >
                          Formula
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setDetails('Solid food')}
                          className={details === 'Solid food' ? 'bg-orange-100 border-orange-300' : ''}
                        >
                          Solid food
                        </Button>
                      </div>
                    </div>
                  )}

                  {selectedActivity === 'diaper' && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Type</label>
                      <div className="flex gap-2">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setDetails('Wet')}
                          className={details === 'Wet' ? 'bg-blue-100 border-blue-300' : ''}
                        >
                          Wet
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setDetails('Dirty')}
                          className={details === 'Dirty' ? 'bg-blue-100 border-blue-300' : ''}
                        >
                          Dirty
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setDetails('Both')}
                          className={details === 'Both' ? 'bg-blue-100 border-blue-300' : ''}
                        >
                          Both
                        </Button>
                      </div>
                    </div>
                  )}

                  {selectedActivity === 'sleep' && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Duration (optional)</label>
                      <div className="flex gap-2">
                        <Input 
                          type="number" 
                          placeholder="Duration in minutes"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Notes (optional)</label>
                    <Textarea 
                      placeholder="Add any relevant notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" onClick={handleLogActivity}>Log Activity</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <TabsContent value="feeding" className="space-y-4">
            {recentActivities
              .filter(activity => activity.type === 'feeding')
              .map(activity => (
                <div key={activity.id} className="flex gap-3 p-3 border rounded-lg">
                  {activityIcons.feeding}
                  <div>
                    <div className="font-medium">{activity.details}</div>
                    <div className="text-sm text-gray-500">{format(activity.startTime, 'MMM d, h:mm a')}</div>
                    {activity.notes && <div className="text-sm mt-1">{activity.notes}</div>}
                  </div>
                </div>
              ))}
          </TabsContent>
          
          <TabsContent value="sleep" className="space-y-4">
            {recentActivities
              .filter(activity => activity.type === 'sleep')
              .map(activity => (
                <div key={activity.id} className="flex gap-3 p-3 border rounded-lg">
                  {activityIcons.sleep}
                  <div>
                    <div className="font-medium">Sleep Session</div>
                    <div className="text-sm text-gray-500">
                      {format(activity.startTime, 'MMM d, h:mm a')}
                      {activity.endTime && ` to ${format(activity.endTime, 'h:mm a')}`}
                    </div>
                    {activity.notes && <div className="text-sm mt-1">{activity.notes}</div>}
                  </div>
                </div>
              ))}
          </TabsContent>
          
          <TabsContent value="diaper" className="space-y-4">
            {recentActivities
              .filter(activity => activity.type === 'diaper')
              .map(activity => (
                <div key={activity.id} className="flex gap-3 p-3 border rounded-lg">
                  {activityIcons.diaper}
                  <div>
                    <div className="font-medium">{activity.details} Diaper</div>
                    <div className="text-sm text-gray-500">{format(activity.startTime, 'MMM d, h:mm a')}</div>
                    {activity.notes && <div className="text-sm mt-1">{activity.notes}</div>}
                  </div>
                </div>
              ))}
          </TabsContent>
          
          <TabsContent value="other" className="space-y-4">
            {recentActivities
              .filter(activity => !['feeding', 'sleep', 'diaper'].includes(activity.type))
              .map(activity => (
                <div key={activity.id} className="flex gap-3 p-3 border rounded-lg">
                  {activityIcons[activity.type] || activityIcons.other}
                  <div>
                    <div className="font-medium">{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}</div>
                    <div className="text-sm text-gray-500">{format(activity.startTime, 'MMM d, h:mm a')}</div>
                    {activity.details && <div className="text-sm">{activity.details}</div>}
                    {activity.notes && <div className="text-sm mt-1">{activity.notes}</div>}
                  </div>
                </div>
              ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BabyActivitiesTracker;


import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Utensils, Clock, Plus, Calendar, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FeedingRecord {
  id: string;
  type: 'bottle' | 'breast' | 'food';
  startTime: string;
  duration: number; // in minutes
  amount?: number; // in ml or oz
  side?: 'left' | 'right' | 'both';
  notes: string;
  date: string;
}

const FeedingTabContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('record');
  const [feedingRecords, setFeedingRecords] = useState<FeedingRecord[]>([
    {
      id: '1',
      type: 'bottle',
      startTime: '07:30',
      duration: 10,
      amount: 90,
      notes: 'Formula, took well',
      date: '2025-04-04'
    },
    {
      id: '2',
      type: 'breast',
      startTime: '10:45',
      duration: 15,
      side: 'left',
      notes: 'Fell asleep during feeding',
      date: '2025-04-04'
    },
    {
      id: '3',
      type: 'food',
      startTime: '13:30',
      duration: 20,
      notes: 'Pureed banana and oats',
      date: '2025-04-04'
    }
  ]);
  
  const [newFeeding, setNewFeeding] = useState<Omit<FeedingRecord, 'id'>>({
    type: 'bottle',
    startTime: '',
    duration: 0,
    amount: 0,
    side: 'left',
    notes: '',
    date: new Date().toISOString().split('T')[0]
  });
  
  const { toast } = useToast();
  
  const handleAddFeeding = () => {
    if (!newFeeding.startTime || newFeeding.duration <= 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const feedingToAdd: FeedingRecord = {
      ...newFeeding,
      id: Date.now().toString()
    };
    
    setFeedingRecords([feedingToAdd, ...feedingRecords]);
    
    // Reset form
    setNewFeeding({
      type: 'bottle',
      startTime: '',
      duration: 0,
      amount: 0,
      side: 'left',
      notes: '',
      date: new Date().toISOString().split('T')[0]
    });
    
    setActiveTab('history');
    
    toast({
      title: "Feeding recorded",
      description: "The feeding has been added to your history"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Utensils className="mr-2 h-5 w-5 text-health-pink" />
          Feeding Tracker
        </CardTitle>
        <CardDescription>Monitor your baby's feeding patterns and nutrition</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="record">Record Feeding</TabsTrigger>
            <TabsTrigger value="history">Feeding History</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="record" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="feeding-type">Feeding Type</Label>
                <select
                  id="feeding-type"
                  className="w-full p-2 border rounded-md"
                  value={newFeeding.type}
                  onChange={(e) => setNewFeeding({...newFeeding, type: e.target.value as any})}
                >
                  <option value="bottle">Bottle</option>
                  <option value="breast">Breastfeeding</option>
                  <option value="food">Solid Food</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="feeding-time">Start Time</Label>
                <Input
                  id="feeding-time"
                  type="time"
                  value={newFeeding.startTime}
                  onChange={(e) => setNewFeeding({...newFeeding, startTime: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="feeding-date">Date</Label>
                <Input
                  id="feeding-date"
                  type="date"
                  value={newFeeding.date}
                  onChange={(e) => setNewFeeding({...newFeeding, date: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="feeding-duration">Duration (minutes)</Label>
                <Input
                  id="feeding-duration"
                  type="number"
                  value={newFeeding.duration || ''}
                  onChange={(e) => setNewFeeding({...newFeeding, duration: parseInt(e.target.value) || 0})}
                />
              </div>
              
              {newFeeding.type === 'bottle' && (
                <div className="space-y-2">
                  <Label htmlFor="feeding-amount">Amount (ml)</Label>
                  <Input
                    id="feeding-amount"
                    type="number"
                    value={newFeeding.amount || ''}
                    onChange={(e) => setNewFeeding({...newFeeding, amount: parseInt(e.target.value) || 0})}
                  />
                </div>
              )}
              
              {newFeeding.type === 'breast' && (
                <div className="space-y-2">
                  <Label htmlFor="feeding-side">Side</Label>
                  <select
                    id="feeding-side"
                    className="w-full p-2 border rounded-md"
                    value={newFeeding.side}
                    onChange={(e) => setNewFeeding({...newFeeding, side: e.target.value as any})}
                  >
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="both">Both</option>
                  </select>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="feeding-notes">Notes</Label>
              <Input
                id="feeding-notes"
                placeholder="Any additional information"
                value={newFeeding.notes}
                onChange={(e) => setNewFeeding({...newFeeding, notes: e.target.value})}
              />
            </div>
            
            <Button 
              onClick={handleAddFeeding} 
              className="w-full mt-4 bg-gradient-to-r from-health-pink to-health-light-pink hover-card-effect"
            >
              <Plus className="mr-2 h-4 w-4" />
              Record Feeding
            </Button>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg">Recent Feedings</h3>
                <Button variant="outline" size="sm">
                  <Calendar className="mr-1 h-4 w-4" />
                  Filter by Date
                </Button>
              </div>
              
              <div className="space-y-3">
                {feedingRecords.map((record) => (
                  <div 
                    key={record.id} 
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors hover-card-effect"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center 
                          ${record.type === 'bottle' ? 'bg-blue-100 text-blue-600' : 
                           record.type === 'breast' ? 'bg-pink-100 text-pink-600' : 
                           'bg-green-100 text-green-600'}`}>
                          <Utensils className="h-5 w-5" />
                        </div>
                        <div className="ml-3">
                          <h4 className="font-medium">
                            {record.type === 'bottle' ? 'Bottle Feeding' : 
                             record.type === 'breast' ? 'Breastfeeding' : 
                             'Solid Food'}
                          </h4>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {record.startTime}, {record.duration} min
                            {record.side && <span className="ml-2">({record.side})</span>}
                          </div>
                        </div>
                      </div>
                      
                      {record.amount && (
                        <div className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                          {record.amount} ml
                        </div>
                      )}
                    </div>
                    
                    {record.notes && (
                      <p className="text-sm text-gray-600 mt-2 ml-13">{record.notes}</p>
                    )}
                    
                    <div className="mt-2 text-xs text-gray-400 ml-13">
                      <Calendar className="h-3 w-3 inline mr-1" />
                      {new Date(record.date).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="text-center py-8">
            <Clock className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium">Feeding Analytics</h3>
            <p className="text-gray-500 mt-2">
              Record more feedings to see patterns, averages, and insights about your baby's feeding habits.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
          <span>View All Records</span>
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeedingTabContent;

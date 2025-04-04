
import React, { useState } from 'react';
import { Calendar, Clock, Plus, ListFilter, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FeedingEntry {
  id: string;
  type: 'breast' | 'bottle' | 'solid';
  startTime: string;
  duration?: number;
  amount?: string;
  notes?: string;
  date: string;
}

const initialFeedings: FeedingEntry[] = [
  {
    id: '1',
    type: 'breast',
    startTime: '08:30',
    duration: 20,
    date: '2023-05-20',
    notes: 'Left side, good latch'
  },
  {
    id: '2',
    type: 'bottle',
    startTime: '12:15',
    amount: '3oz',
    date: '2023-05-20',
    notes: 'Formula'
  },
  {
    id: '3',
    type: 'breast',
    startTime: '16:00',
    duration: 25,
    date: '2023-05-20',
    notes: 'Right side, seemed satisfied'
  },
  {
    id: '4',
    type: 'solid',
    startTime: '18:30',
    date: '2023-05-20',
    notes: 'First try with mashed banana, ate about 1 tablespoon'
  },
];

const FeedingTabContent: React.FC = () => {
  const [feedings, setFeedings] = useState<FeedingEntry[]>(initialFeedings);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const filteredFeedings = feedings
    .filter(feeding => {
      if (activeTab !== 'all' && feeding.type !== activeTab) {
        return false;
      }
      
      if (searchTerm) {
        return feeding.notes?.toLowerCase().includes(searchTerm.toLowerCase());
      }
      
      return true;
    })
    .sort((a, b) => {
      return new Date(`${b.date} ${b.startTime}`).getTime() - 
             new Date(`${a.date} ${a.startTime}`).getTime();
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-health-blue mr-2">🍼</span>
            Feeding Tracker
          </div>
          <Button variant="outline" className="bg-health-blue/5 text-health-blue border-health-light-blue">
            <Plus className="h-4 w-4 mr-1" />
            Add New Feeding
          </Button>
        </CardTitle>
        <CardDescription>Monitor your baby's feeding patterns and nutrition</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <div className="w-full sm:w-auto">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="breast">Breastfeeding</TabsTrigger>
                <TabsTrigger value="bottle">Bottle</TabsTrigger>
                <TabsTrigger value="solid">Solid Food</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search notes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-100 rounded-md p-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="space-y-1 mb-3 md:mb-0">
              <h3 className="text-sm font-medium text-blue-800">Today's Summary</h3>
              <p className="text-xs text-blue-600">Last 24 hours</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-2 rounded">
                <p className="text-xs text-gray-500">Feeds</p>
                <p className="text-xl font-bold">4</p>
              </div>
              <div className="bg-white p-2 rounded">
                <p className="text-xs text-gray-500">Breast</p>
                <p className="text-xl font-bold">2</p>
              </div>
              <div className="bg-white p-2 rounded">
                <p className="text-xs text-gray-500">Bottle</p>
                <p className="text-xl font-bold">1</p>
              </div>
              <div className="bg-white p-2 rounded">
                <p className="text-xs text-gray-500">Solid Food</p>
                <p className="text-xl font-bold">1</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="divide-y">
          <h3 className="font-medium text-gray-700 py-2">Feeding History</h3>
          
          {filteredFeedings.length === 0 ? (
            <div className="py-8 text-center text-gray-400">
              <p>No feeding records found</p>
            </div>
          ) : (
            <>
              {filteredFeedings.map(feeding => (
                <div key={feeding.id} className="py-3 first:pt-0">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        feeding.type === 'breast' ? 'bg-pink-500' :
                        feeding.type === 'bottle' ? 'bg-blue-500' : 'bg-amber-500'
                      }`}></div>
                      <span className="font-medium">
                        {feeding.type === 'breast' ? 'Breastfeeding' :
                         feeding.type === 'bottle' ? 'Bottle Feeding' : 'Solid Food'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(feeding.date).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-1 text-sm text-gray-600">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    <span>{feeding.startTime}</span>
                    {feeding.duration && (
                      <span className="ml-1">({feeding.duration} mins)</span>
                    )}
                    {feeding.amount && (
                      <span className="ml-1">({feeding.amount})</span>
                    )}
                  </div>
                  
                  {feeding.notes && (
                    <p className="text-sm text-gray-500 mt-1 bg-gray-50 p-1.5 rounded">{feeding.notes}</p>
                  )}
                  
                  <div className="flex space-x-2 mt-2">
                    <Button variant="ghost" size="sm" className="h-7 text-xs">Edit</Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-red-600">Delete</Button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="text-xs text-gray-500 flex justify-between">
        <span>Track feeding patterns to ensure your baby is getting proper nutrition.</span>
        <Button variant="ghost" size="sm" className="text-health-blue">
          <Calendar className="h-3.5 w-3.5 mr-1" />
          View Calendar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeedingTabContent;

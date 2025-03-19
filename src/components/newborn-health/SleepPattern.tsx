
import React from 'react';
import { Clock, PlusCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SleepPattern: React.FC = () => {
  return (
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
  );
};

export default SleepPattern;

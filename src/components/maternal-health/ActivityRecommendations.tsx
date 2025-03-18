
import React from 'react';
import { Dumbbell, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const ActivityRecommendations: React.FC = () => {
  return (
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
  );
};

export default ActivityRecommendations;

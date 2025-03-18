
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const PregnancyProgress: React.FC = () => {
  return (
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
  );
};

export default PregnancyProgress;

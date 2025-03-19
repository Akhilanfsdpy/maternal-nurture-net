
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface GrowthData {
  weight: { current: number; percentile: number; lastRecorded: string };
  height: { current: number; percentile: number; lastRecorded: string };
  headCircumference: { current: number; percentile: number; lastRecorded: string };
}

interface GrowthMetricsProps {
  growthData: GrowthData;
}

const GrowthMetrics: React.FC<GrowthMetricsProps> = ({ growthData }) => {
  return (
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
  );
};

export default GrowthMetrics;

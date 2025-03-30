
import React from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import GrowthChartContent from './growth-chart/GrowthChartContent';

const GrowthChart: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-health-pink" />
          Growth Chart
        </CardTitle>
        <CardDescription>Percentile tracking over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`${isMobile ? 'h-48' : 'h-60'} w-full`}>
          <GrowthChartContent />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Detailed Growth Charts
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GrowthChart;


import React from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';

interface GrowthDataPoint {
  age: string;
  weight: number;
  height: number;
  headCircumference: number;
}

const GrowthChart: React.FC = () => {
  const isMobile = useIsMobile();
  
  // Sample growth data - in a real app this would come from API/database
  const growthData: GrowthDataPoint[] = [
    { age: '0m', weight: 3.5, height: 50, headCircumference: 35 },
    { age: '1m', weight: 4.3, height: 54, headCircumference: 37 },
    { age: '2m', weight: 5.4, height: 58, headCircumference: 38.5 },
    { age: '3m', weight: 6.2, height: 61, headCircumference: 40 },
    { age: '4m', weight: 6.7, height: 63, headCircumference: 41 },
    { age: '5m', weight: 7.1, height: 65, headCircumference: 42 }
  ];

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
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={growthData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="age" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #f0f0f0',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="#F5A9B8" 
                strokeWidth={2}
                activeDot={{ r: 6 }}
                name="Weight (kg)"
              />
              <Line 
                type="monotone" 
                dataKey="height" 
                stroke="#4A90E2" 
                strokeWidth={2}
                activeDot={{ r: 6 }} 
                name="Height (cm)"
              />
              <Line 
                type="monotone" 
                dataKey="headCircumference" 
                stroke="#B4EDD2" 
                strokeWidth={2}
                activeDot={{ r: 6 }} 
                name="Head (cm)"
              />
            </LineChart>
          </ResponsiveContainer>
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

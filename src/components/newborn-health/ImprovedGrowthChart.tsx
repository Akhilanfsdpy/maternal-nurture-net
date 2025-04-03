
import React, { useState } from 'react';
import { Baby, Calendar, ArrowRight, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart, ReferenceLine } from 'recharts';

// WHO growth standards (simplified for demo purposes)
const weightPercentiles = [
  { month: 0, p3: 2.9, p15: 3.2, p50: 3.5, p85: 3.8, p97: 4.2, actual: 3.4 },
  { month: 1, p3: 3.9, p15: 4.3, p50: 4.7, p85: 5.1, p97: 5.5, actual: 4.5 },
  { month: 2, p3: 4.9, p15: 5.4, p50: 5.8, p85: 6.3, p97: 6.8, actual: 5.7 },
  { month: 3, p3: 5.7, p15: 6.2, p50: 6.7, p85: 7.3, p97: 7.8, actual: 6.5 },
  { month: 4, p3: 6.2, p15: 6.9, p50: 7.5, p85: 8.1, p97: 8.7, actual: 7.3 },
  { month: 5, p3: 6.7, p15: 7.4, p50: 8.0, p85: 8.7, p97: 9.3, actual: 7.9 },
  { month: 6, p3: 7.1, p15: 7.8, p50: 8.5, p85: 9.2, p97: 9.9, actual: 8.4 },
];

const heightPercentiles = [
  { month: 0, p3: 47.5, p15: 49.0, p50: 50.5, p85: 52.0, p97: 53.5, actual: 50.0 },
  { month: 1, p3: 51.0, p15: 52.7, p50: 54.5, p85: 56.2, p97: 57.8, actual: 54.0 },
  { month: 2, p3: 54.0, p15: 55.8, p50: 57.9, p85: 59.7, p97: 61.5, actual: 57.5 },
  { month: 3, p3: 56.4, p15: 58.4, p50: 60.5, p85: 62.5, p97: 64.5, actual: 60.1 },
  { month: 4, p3: 58.4, p15: 60.5, p50: 62.7, p85: 64.8, p97: 66.9, actual: 62.3 },
  { month: 5, p3: 60.0, p15: 62.2, p50: 64.5, p85: 66.7, p97: 68.9, actual: 64.0 },
  { month: 6, p3: 61.5, p15: 63.8, p50: 66.2, p85: 68.5, p97: 70.8, actual: 65.8 },
];

const headPercentiles = [
  { month: 0, p3: 32.4, p15: 33.5, p50: 34.6, p85: 35.7, p97: 36.8, actual: 34.2 },
  { month: 1, p3: 35.0, p15: 36.0, p50: 37.0, p85: 38.0, p97: 39.0, actual: 36.8 },
  { month: 2, p3: 36.5, p15: 37.5, p50: 38.5, p85: 39.5, p97: 40.5, actual: 38.3 },
  { month: 3, p3: 37.5, p15: 38.5, p50: 39.5, p85: 40.5, p97: 41.5, actual: 39.4 },
  { month: 4, p3: 38.5, p15: 39.5, p50: 40.5, p85: 41.5, p97: 42.5, actual: 40.3 },
  { month: 5, p3: 39.0, p15: 40.0, p50: 41.0, p85: 42.0, p97: 43.0, actual: 40.9 },
  { month: 6, p3: 39.5, p15: 40.5, p50: 41.5, p85: 42.5, p97: 43.5, actual: 41.4 },
];

const ImprovedGrowthChart: React.FC = () => {
  const [chartMetric, setChartMetric] = useState<'weight' | 'height' | 'head'>('weight');
  const [expandedInfo, setExpandedInfo] = useState(false);
  const [showPercentiles, setShowPercentiles] = useState(true);
  
  const getPercentileData = () => {
    switch(chartMetric) {
      case 'weight': return weightPercentiles;
      case 'height': return heightPercentiles;
      case 'head': return headPercentiles;
    }
  };
  
  const getChartTitle = () => {
    switch(chartMetric) {
      case 'weight': return 'Weight (kg)';
      case 'height': return 'Height (cm)';
      case 'head': return 'Head Circumference (cm)';
    }
  };

  const getChartColor = () => {
    switch(chartMetric) {
      case 'weight': return '#4f46e5';
      case 'height': return '#0ea5e9';
      case 'head': return '#14b8a6';
    }
  };

  const getCurrentValue = () => {
    const data = getPercentileData();
    const current = data[data.length - 1];
    return current.actual;
  };

  const getCurrentPercentile = () => {
    const data = getPercentileData();
    const current = data[data.length - 1];
    
    if (current.actual >= current.p97) return "97th+";
    if (current.actual >= current.p85) return "85th-97th";
    if (current.actual >= current.p50) return "50th-85th";
    if (current.actual >= current.p15) return "15th-50th";
    if (current.actual >= current.p3) return "3rd-15th";
    return "Below 3rd";
  };

  const getTrend = () => {
    const data = getPercentileData();
    if (data.length < 2) return 'stable';
    
    const prevValue = data[data.length - 2].actual;
    const currValue = data[data.length - 1].actual;
    
    const diff = currValue - prevValue;
    
    if (diff > 0.5) return 'increasing';
    if (diff < -0.1) return 'decreasing';
    return 'stable';
  };

  const renderChart = () => {
    const data = getPercentileData();
    const color = getChartColor();
    
    return (
      <ResponsiveContainer width="100%" height={300}>
        {showPercentiles ? (
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              label={{ value: 'Age (months)', position: 'insideBottomRight', offset: -10 }} 
            />
            <YAxis />
            <Tooltip formatter={(value, name) => {
              if (name === 'p3') return ['3rd percentile', value];
              if (name === 'p15') return ['15th percentile', value];
              if (name === 'p50') return ['50th percentile', value];
              if (name === 'p85') return ['85th percentile', value];
              if (name === 'p97') return ['97th percentile', value];
              if (name === 'actual') return ['Your baby', value];
              return [name, value];
            }} />
            <Area type="monotone" dataKey="p3" stackId="1" fill="#f1f5f9" stroke="#cbd5e1" fillOpacity={0.3} />
            <Area type="monotone" dataKey="p15" stackId="1" fill="#e0f2fe" stroke="#bae6fd" fillOpacity={0.3} />
            <Area type="monotone" dataKey="p50" stackId="1" fill="#dbeafe" stroke="#93c5fd" fillOpacity={0.3} />
            <Area type="monotone" dataKey="p85" stackId="1" fill="#e0f2fe" stroke="#bae6fd" fillOpacity={0.3} />
            <Area type="monotone" dataKey="p97" stackId="1" fill="#f1f5f9" stroke="#cbd5e1" fillOpacity={0.3} />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke={color}
              strokeWidth={3}
              dot={{ r: 4, fill: color }}
              activeDot={{ r: 6 }}
            />
            <ReferenceLine y={data[data.length - 1].p50} stroke="#94a3b8" strokeDasharray="3 3" />
          </AreaChart>
        ) : (
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              label={{ value: 'Age (months)', position: 'insideBottomRight', offset: -10 }} 
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="actual" 
              name="Your Baby" 
              stroke={color}
              strokeWidth={3}
              dot={{ r: 4, fill: color }}
              activeDot={{ r: 6 }}
            />
            <Line type="monotone" dataKey="p50" name="50th Percentile" stroke="#94a3b8" strokeDasharray="3 3" />
          </LineChart>
        )}
      </ResponsiveContainer>
    );
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Baby className="h-5 w-5 text-health-blue mr-2" />
          Enhanced Growth Chart
        </CardTitle>
        <CardDescription>
          Track your baby's growth compared to WHO standards
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="weight" value={chartMetric} onValueChange={(v) => setChartMetric(v as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="weight">Weight</TabsTrigger>
            <TabsTrigger value="height">Height</TabsTrigger>
            <TabsTrigger value="head">Head</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weight" className="space-y-4">
            <div className="grid grid-cols-3 gap-3 pt-2">
              <Card className="shadow-none border border-gray-100">
                <CardContent className="p-3">
                  <p className="text-xs text-gray-500">Current</p>
                  <p className="text-xl font-semibold">{getCurrentValue()} kg</p>
                  <p className="text-xs text-gray-500">Age: 6 months</p>
                </CardContent>
              </Card>
              <Card className="shadow-none border border-gray-100">
                <CardContent className="p-3">
                  <p className="text-xs text-gray-500">Percentile</p>
                  <p className="text-xl font-semibold">{getCurrentPercentile()}</p>
                  <p className="text-xs text-gray-500">WHO standard</p>
                </CardContent>
              </Card>
              <Card className="shadow-none border border-gray-100">
                <CardContent className="p-3">
                  <p className="text-xs text-gray-500">Trend</p>
                  <p className="text-xl font-semibold flex items-center">
                    {getTrend() === 'increasing' && (
                      <>
                        <span className="text-green-600">↑</span>
                        <span className="text-green-600 ml-1">Growing</span>
                      </>
                    )}
                    {getTrend() === 'stable' && (
                      <>
                        <span className="text-blue-600">→</span>
                        <span className="text-blue-600 ml-1">Stable</span>
                      </>
                    )}
                    {getTrend() === 'decreasing' && (
                      <>
                        <span className="text-red-600">↓</span>
                        <span className="text-red-600 ml-1">Down</span>
                      </>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">Last month</p>
                </CardContent>
              </Card>
            </div>
            
            {renderChart()}
          </TabsContent>
          
          <TabsContent value="height" className="space-y-4">
            <div className="grid grid-cols-3 gap-3 pt-2">
              <Card className="shadow-none border border-gray-100">
                <CardContent className="p-3">
                  <p className="text-xs text-gray-500">Current</p>
                  <p className="text-xl font-semibold">{getCurrentValue()} cm</p>
                  <p className="text-xs text-gray-500">Age: 6 months</p>
                </CardContent>
              </Card>
              <Card className="shadow-none border border-gray-100">
                <CardContent className="p-3">
                  <p className="text-xs text-gray-500">Percentile</p>
                  <p className="text-xl font-semibold">{getCurrentPercentile()}</p>
                  <p className="text-xs text-gray-500">WHO standard</p>
                </CardContent>
              </Card>
              <Card className="shadow-none border border-gray-100">
                <CardContent className="p-3">
                  <p className="text-xs text-gray-500">Trend</p>
                  <p className="text-xl font-semibold flex items-center">
                    {getTrend() === 'increasing' && (
                      <>
                        <span className="text-green-600">↑</span>
                        <span className="text-green-600 ml-1">Growing</span>
                      </>
                    )}
                    {getTrend() === 'stable' && (
                      <>
                        <span className="text-blue-600">→</span>
                        <span className="text-blue-600 ml-1">Stable</span>
                      </>
                    )}
                    {getTrend() === 'decreasing' && (
                      <>
                        <span className="text-red-600">↓</span>
                        <span className="text-red-600 ml-1">Down</span>
                      </>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">Last month</p>
                </CardContent>
              </Card>
            </div>
            
            {renderChart()}
          </TabsContent>
          
          <TabsContent value="head" className="space-y-4">
            <div className="grid grid-cols-3 gap-3 pt-2">
              <Card className="shadow-none border border-gray-100">
                <CardContent className="p-3">
                  <p className="text-xs text-gray-500">Current</p>
                  <p className="text-xl font-semibold">{getCurrentValue()} cm</p>
                  <p className="text-xs text-gray-500">Age: 6 months</p>
                </CardContent>
              </Card>
              <Card className="shadow-none border border-gray-100">
                <CardContent className="p-3">
                  <p className="text-xs text-gray-500">Percentile</p>
                  <p className="text-xl font-semibold">{getCurrentPercentile()}</p>
                  <p className="text-xs text-gray-500">WHO standard</p>
                </CardContent>
              </Card>
              <Card className="shadow-none border border-gray-100">
                <CardContent className="p-3">
                  <p className="text-xs text-gray-500">Trend</p>
                  <p className="text-xl font-semibold flex items-center">
                    {getTrend() === 'increasing' && (
                      <>
                        <span className="text-green-600">↑</span>
                        <span className="text-green-600 ml-1">Growing</span>
                      </>
                    )}
                    {getTrend() === 'stable' && (
                      <>
                        <span className="text-blue-600">→</span>
                        <span className="text-blue-600 ml-1">Stable</span>
                      </>
                    )}
                    {getTrend() === 'decreasing' && (
                      <>
                        <span className="text-red-600">↓</span>
                        <span className="text-red-600 ml-1">Down</span>
                      </>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">Last month</p>
                </CardContent>
              </Card>
            </div>
            
            {renderChart()}
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between items-center flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => setShowPercentiles(!showPercentiles)}
          >
            {showPercentiles ? 'Hide Percentiles' : 'Show Percentiles'}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-xs flex items-center"
            onClick={() => setExpandedInfo(!expandedInfo)}
          >
            <Info className="h-3 w-3 mr-1" />
            {expandedInfo ? 'Hide Information' : 'About Growth Charts'}
            {expandedInfo ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
          </Button>
        </div>
        
        {expandedInfo && (
          <div className="bg-gray-50 p-3 rounded-lg text-sm">
            <h4 className="font-medium mb-1">Understanding Growth Charts</h4>
            <p className="text-gray-600 text-xs mb-2">
              Growth charts show how your baby's measurements compare with other children of the same age and sex.
            </p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• <strong>Percentile</strong>: Shows where your baby's measurements fall in relation to other children.</li>
              <li>• <strong>50th percentile</strong>: Means that 50% of children are above and 50% are below this measurement.</li>
              <li>• <strong>Trend</strong>: More important than any single measurement. Your pediatrician will monitor how your baby grows over time.</li>
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" className="text-xs">
          <Calendar className="h-3 w-3 mr-1" />
          View Historical Data
        </Button>
        
        <Button size="sm" className="text-xs bg-health-blue">
          Add New Measurement
          <ArrowRight className="h-3 w-3 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ImprovedGrowthChart;

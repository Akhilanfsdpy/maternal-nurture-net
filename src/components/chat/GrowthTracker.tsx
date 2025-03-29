
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Baby, ArrowUp } from 'lucide-react';

interface GrowthData {
  months: number[];
  weights: number[];
  heights: number[];
  percentile: number;
}

interface GrowthTrackerProps {
  data: GrowthData;
}

const GrowthTracker: React.FC<GrowthTrackerProps> = ({ data }) => {
  // Format data for chart
  const chartData = data.months.map((month, index) => ({
    month: `${month}m`,
    weight: data.weights[index],
    height: data.heights[index]
  }));

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-sm flex items-center gap-2">
          <Baby className="h-4 w-4 text-health-blue" />
          Growth Trajectory
        </h4>
        <div className="flex items-center text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
          <ArrowUp className="h-3 w-3 mr-1" />
          <span>{data.percentile}th percentile</span>
        </div>
      </div>
      
      <div className="h-40 mb-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} />
            <YAxis yAxisId="left" tick={{ fontSize: 10 }} />
            <Tooltip />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="weight"
              stroke="#4f46e5"
              activeDot={{ r: 8 }}
              name="Weight (kg)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-2">
        <div>From {data.months[0]} to {data.months[data.months.length - 1]} months</div>
        <div>Weight: {data.weights[0]} kg → {data.weights[data.weights.length - 1]} kg</div>
      </div>
    </div>
  );
};

export default GrowthTracker;

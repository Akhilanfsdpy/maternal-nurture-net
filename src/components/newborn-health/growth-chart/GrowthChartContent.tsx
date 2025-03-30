
import React from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useGrowthData } from './useGrowthData';
import GrowthChartLines from './GrowthChartLines';
import GrowthChartTooltip from './GrowthChartTooltip';

const GrowthChartContent: React.FC = () => {
  const { growthData } = useGrowthData();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={growthData}
        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="age" tick={{ fontSize: 10 }} />
        <YAxis tick={{ fontSize: 10 }} />
        <Tooltip 
          content={<GrowthChartTooltip />}
        />
        <GrowthChartLines />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GrowthChartContent;

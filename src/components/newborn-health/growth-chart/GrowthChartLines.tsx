
import React from 'react';
import { Line } from 'recharts';

const GrowthChartLines: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default GrowthChartLines;

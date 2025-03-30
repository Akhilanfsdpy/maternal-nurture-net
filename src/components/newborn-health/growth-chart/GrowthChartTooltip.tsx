
import React from 'react';

interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const GrowthChartTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-white p-2 border border-gray-200 rounded shadow-md text-xs">
      <p className="font-medium mb-1">{`Age: ${label}`}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center justify-between gap-2">
          <span style={{ color: entry.color }}>{entry.name}:</span>
          <span className="font-medium">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default GrowthChartTooltip;

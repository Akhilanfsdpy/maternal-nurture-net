
import React from 'react';
import { cn } from '@/lib/utils';

interface HealthMetricProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  status?: 'normal' | 'warning' | 'critical';
  className?: string;
}

const HealthMetric: React.FC<HealthMetricProps> = ({
  title,
  value,
  unit,
  icon,
  trend,
  trendValue,
  status = 'normal',
  className,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-700';
      case 'critical':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'normal':
      default:
        return 'bg-white border-gray-100';
    }
  };

  const getTrendColor = () => {
    if (!trend) return '';
    
    switch (trend) {
      case 'up':
        return 'text-emerald-600 bg-emerald-50';
      case 'down':
        return 'text-red-600 bg-red-50';
      case 'stable':
      default:
        return 'text-blue-600 bg-blue-50';
    }
  };

  return (
    <div
      className={cn(
        'rounded-xl p-4 shadow-sm transition-all duration-300 hover:shadow border',
        getStatusColor(),
        className
      )}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className="text-primary/80">{icon}</div>
      </div>
      
      <div className="flex items-end">
        <span className="text-2xl font-semibold mr-1">{value}</span>
        {unit && <span className="text-sm text-gray-500 mb-0.5">{unit}</span>}
      </div>
      
      {trend && trendValue && (
        <div className="mt-2 flex items-center">
          <span className={cn('text-xs px-2 py-0.5 rounded-full', getTrendColor())}>
            {trendValue}
          </span>
        </div>
      )}
    </div>
  );
};

export default HealthMetric;

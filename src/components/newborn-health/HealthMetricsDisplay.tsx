
import React from 'react';
import { Scale, Thermometer, Clock, Activity } from 'lucide-react';
import HealthMetric from '@/components/HealthMetric';

const HealthMetricsDisplay: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <HealthMetric
        title="Weight"
        value={4.7}
        unit="kg"
        icon={<Scale className="h-5 w-5" />}
        trend="up"
        trendValue="+0.3 kg this week"
        className="animate-fade-in"
      />
      <HealthMetric
        title="Temperature"
        value={36.8}
        unit="°C"
        icon={<Thermometer className="h-5 w-5" />}
        trend="stable"
        trendValue="Normal range"
        className="animate-fade-in"
      />
      <HealthMetric
        title="Feeding Frequency"
        value={6}
        unit="per day"
        icon={<Clock className="h-5 w-5" />}
        trend="down"
        trendValue="-1 from last week"
        className="animate-fade-in"
      />
      <HealthMetric
        title="Active Hours"
        value={4.5}
        unit="hours"
        icon={<Activity className="h-5 w-5" />}
        trend="up"
        trendValue="+0.5 from yesterday"
        className="animate-fade-in"
      />
    </div>
  );
};

export default HealthMetricsDisplay;

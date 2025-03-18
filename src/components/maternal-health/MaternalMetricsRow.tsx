
import React from 'react';
import { Heart, Activity, Clock, Droplets } from 'lucide-react';
import HealthMetric from '@/components/HealthMetric';

const MaternalMetricsRow: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <HealthMetric
        title="Heart Rate"
        value={79}
        unit="bpm"
        icon={<Heart className="h-5 w-5" />}
        trend="stable"
        trendValue="Normal range"
        className="animate-fade-in"
      />
      <HealthMetric
        title="Blood Pressure"
        value="118/76"
        unit="mmHg"
        icon={<Activity className="h-5 w-5" />}
        trend="up"
        trendValue="+3 from yesterday"
        className="animate-fade-in"
      />
      <HealthMetric
        title="Sleep Quality"
        value={6.7}
        unit="hours"
        icon={<Clock className="h-5 w-5" />}
        trend="down"
        trendValue="-0.3 from average"
        status="warning"
        className="animate-fade-in"
      />
      <HealthMetric
        title="Hydration"
        value={2.1}
        unit="liters"
        icon={<Droplets className="h-5 w-5" />}
        trend="stable"
        trendValue="Good level"
        className="animate-fade-in"
      />
    </div>
  );
};

export default MaternalMetricsRow;

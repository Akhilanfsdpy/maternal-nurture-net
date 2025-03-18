
import React from 'react';
import MedicationsList from './MedicationsList';
import SymptomsList from './SymptomsList';
import AppointmentsList from './AppointmentsList';
import NutritionCard from './NutritionCard';
import ActivityRecommendations from './ActivityRecommendations';

const OverviewTabContent: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MedicationsList />
        <SymptomsList />
        <AppointmentsList />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NutritionCard />
        <ActivityRecommendations />
      </div>
    </>
  );
};

export default OverviewTabContent;

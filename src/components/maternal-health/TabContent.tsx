
import React from 'react';
import OverviewTabContent from './OverviewTabContent';
import SymptomsTabContent from './SymptomsTabContent';
import NutritionTabContent from './NutritionTabContent';
import AppointmentsTabContent from './AppointmentsTabContent';
import ReusableTabContent, { TabItem } from '../shared/ReusableTabContent';

interface TabContentProps {
  activeTab: string;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
  const maternalHealthTabs: TabItem[] = [
    {
      value: 'overview',
      content: <OverviewTabContent />
    },
    {
      value: 'symptoms',
      content: <SymptomsTabContent />
    },
    {
      value: 'nutrition',
      content: <NutritionTabContent />
    },
    {
      value: 'appointments',
      content: <AppointmentsTabContent />
    }
  ];
  
  return <ReusableTabContent tabs={maternalHealthTabs} activeTab={activeTab} />;
};

export default TabContent;

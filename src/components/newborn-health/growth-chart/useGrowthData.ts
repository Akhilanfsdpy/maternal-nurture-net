
import { useState, useEffect } from 'react';

export interface GrowthDataPoint {
  age: string;
  weight: number;
  height: number;
  headCircumference: number;
}

export const useGrowthData = () => {
  // Sample growth data - in a real app this would come from API/database
  const growthData: GrowthDataPoint[] = [
    { age: '0m', weight: 3.5, height: 50, headCircumference: 35 },
    { age: '1m', weight: 4.3, height: 54, headCircumference: 37 },
    { age: '2m', weight: 5.4, height: 58, headCircumference: 38.5 },
    { age: '3m', weight: 6.2, height: 61, headCircumference: 40 },
    { age: '4m', weight: 6.7, height: 63, headCircumference: 41 },
    { age: '5m', weight: 7.1, height: 65, headCircumference: 42 }
  ];

  return { growthData };
};

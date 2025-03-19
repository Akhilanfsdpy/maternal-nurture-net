
import { GrowthData, FeedingData, Milestone, Vaccination } from '../types/newbornHealth';

// Sample growth data
export const growthData: GrowthData = {
  weight: { current: 4.7, percentile: 65, lastRecorded: '3 days ago' },
  height: { current: 56, percentile: 70, lastRecorded: '1 week ago' },
  headCircumference: { current: 38.5, percentile: 60, lastRecorded: '1 week ago' },
};

// Sample feeding data
export const feedingData: FeedingData[] = [
  { time: '7:30 AM', duration: '20 min', type: 'Breast', notes: 'Good latch, both sides' },
  { time: '10:15 AM', duration: '15 min', type: 'Breast', notes: 'Fussy, only left side' },
  { time: '1:00 PM', duration: '25 min', type: 'Breast', notes: 'Good feeding, both sides' },
  { time: '4:30 PM', duration: '18 min', type: 'Breast', notes: 'Sleepy but fed well' },
];

// Sample milestones data
export const milestones: Milestone[] = [
  { 
    id: 1, 
    name: 'Social Smile', 
    description: 'Baby smiles in response to your smile or voice',
    expectedAge: '1-2 months',
    completed: true,
    completedDate: '6 weeks'
  },
  { 
    id: 2, 
    name: 'Head Control', 
    description: 'Baby can hold head steady without support',
    expectedAge: '2-4 months',
    completed: true,
    completedDate: '10 weeks'
  },
  { 
    id: 3, 
    name: 'Rolling Over', 
    description: 'Baby can roll from tummy to back',
    expectedAge: '3-5 months',
    completed: false,
    completedDate: null
  },
  { 
    id: 4, 
    name: 'Sitting Up', 
    description: 'Baby can sit without support',
    expectedAge: '4-7 months',
    completed: false,
    completedDate: null
  },
];

// Sample vaccinations data
export const vaccinations: Vaccination[] = [
  { 
    id: 1, 
    name: 'Hepatitis B', 
    doses: '3',
    received: '2',
    nextDose: 'Due at 6 months',
    lastDate: '4 months'
  },
  { 
    id: 2, 
    name: 'DTaP', 
    doses: '5',
    received: '2',
    nextDose: 'Due at 6 months',
    lastDate: '4 months'
  },
  { 
    id: 3, 
    name: 'Hib', 
    doses: '4',
    received: '2',
    nextDose: 'Due at 6 months',
    lastDate: '4 months'
  },
  { 
    id: 4, 
    name: 'Polio (IPV)', 
    doses: '4',
    received: '2',
    nextDose: 'Due at 6 months',
    lastDate: '4 months'
  },
];

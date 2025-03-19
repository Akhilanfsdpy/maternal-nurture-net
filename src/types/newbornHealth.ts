
export interface GrowthData {
  weight: { current: number; percentile: number; lastRecorded: string };
  height: { current: number; percentile: number; lastRecorded: string };
  headCircumference: { current: number; percentile: number; lastRecorded: string };
}

export interface FeedingData {
  time: string;
  duration: string;
  type: string;
  notes: string;
}

export interface Milestone {
  id: number;
  name: string;
  description: string;
  expectedAge: string;
  completed: boolean;
  completedDate: string | null;
}

export interface Vaccination {
  id: number;
  name: string;
  doses: string;
  received: string;
  nextDose: string;
  lastDate: string;
}

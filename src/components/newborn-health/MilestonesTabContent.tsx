
import React from 'react';
import { Check, PlusCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Milestone {
  id: number;
  name: string;
  description: string;
  expectedAge: string;
  completed: boolean;
  completedDate: string | null;
}

interface MilestonesTabContentProps {
  milestones: Milestone[];
}

const MilestonesTabContent: React.FC<MilestonesTabContentProps> = ({ milestones }) => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Development Milestones</CardTitle>
        <CardDescription>Track your baby's developmental progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Completed Milestones</h3>
            <ul className="space-y-4">
              {milestones.filter(m => m.completed).map((milestone) => (
                <li key={milestone.id} className="p-4 rounded-lg bg-health-mint/10 border border-health-mint/20">
                  <div className="flex items-start">
                    <div className="mt-1 mr-3 h-6 w-6 rounded-full bg-health-mint/20 flex items-center justify-center">
                      <Check className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{milestone.name}</p>
                      <p className="text-sm text-gray-600 mb-1">{milestone.description}</p>
                      <div className="flex items-center">
                        <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          Achieved at {milestone.completedDate}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                          (Expected: {milestone.expectedAge})
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Upcoming Milestones</h3>
            <ul className="space-y-4">
              {milestones.filter(m => !m.completed).map((milestone) => (
                <li key={milestone.id} className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="flex items-start">
                    <div className="mt-1 mr-3 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{milestone.name}</p>
                      <p className="text-sm text-gray-600 mb-1">{milestone.description}</p>
                      <p className="text-xs text-gray-500">Expected around {milestone.expectedAge}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-gradient-to-r from-health-pink to-health-light-pink">
          <PlusCircle className="mr-2 h-4 w-4" />
          Record New Milestone
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MilestonesTabContent;
